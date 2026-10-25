#!/usr/bin/env python3
"""政策库同步器 —— 让网页能持续跟上政策更新

对应深化提示词 §5.1 与「参赛作品可持续性」要求。

背景（实测结论）：
  厦门各官方站**不返回 ETag / Last-Modified**（实测 xm.gov.cn、hrss.xm.gov.cn、
  ylbz.xm.gov.cn 均无），因此 HTTP 条件请求（304）不可用。
  → 增量同步的唯一可靠路径是：**重新下载 + SHA256 比对**。

三条同步通路：
  A 构建期同步（主力）：定时任务跑本脚本 → 重抓 → 比对 → 重建库 → 跑断言 → 部署
  B 访问期检查（轻量）：只对「时效性关键源」做头部指纹探测，不在用户等待路径上抓全文
  C 人工复核：一键触发，产出变更报告

用法：
  python3 sync.py check              # 只探测，不重抓（快，用于 CI 心跳）
  python3 sync.py sync               # 全量重抓 + 比对 + 重建 + 断言
  python3 sync.py sync --changed-only  # 只重抓哈希已变的源（先全量探测）
  python3 sync.py report             # 打印与上次同步的差异报告
"""
import hashlib
import json
import os
import re
import subprocess
import shutil
import sys
import time
from datetime import datetime, timezone, timedelta

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SNAP = os.path.join(ROOT, "snapshots")
DB = os.path.join(ROOT, "policy_db")
PIPE = os.path.join(ROOT, "pipeline")
TZ = timezone(timedelta(hours=8))
UA = ("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36")

# 时效性关键源：政策会变的文件，同步时优先重抓
CRITICAL = {
    "xm-yb-2026-rate",      # 职工医保年度费率
    "xm-yb-2025-rate",
    "xm-yb-2026-90",        # 居民医保年度筹资标准
    "xm-yb-2025-96",
    "xm-yb-2026-13",        # 生育保险省级新规
    "xm-yb-2026-24",        # 生育保险市级转发
    "xm-chc-2026-3",        # 长护险细则
    "xm-chc-interpret",
    "xm-yb-2022-12",        # 职工/居民医保细则（合并本）
    "xm-yb-2025-86",        # 居民医保参保政策
    "xm-yb-2025-7",         # 失业保险省级统筹
    "fj-rst-2026-13",       # 缴费基数
    "fj-minwage-2025-14",   # 最低工资
    "xm-waitperiod",
    "xm-hrss-policy",       # 人社局政策库列表（新增文件的发现入口）
    "xm-hrss-cleanup",      # 清理目录
}

# 已知不可用源：抓不到或内容不稳定，不参与同步判定
# 理由必须写清楚 —— 否则会被误当成"政策没更新"
DISABLED = {
    "xm-tax-param": "厦门税务费种费率表：表格在图片中，页面为动态壳，每次抓取内容都不同"
                   "（SHA256 必然变化）→ 误报。已改用闽人社文〔2026〕13号 + 闽人社文〔2025〕14号取数",
    "xm-pension-guide": "同安区企业职工办事指南：HTTP 000 不可达（页面已下线或改版）"
                        "→ 已改用思明区退休指南 + 厦门市人社局养老保险处官方指引替代",
    "xm-yb-interpret": "医保局访谈实录：正确 URL 为 gzcy/zxft/cbzc/wzsl/，本键为旧地址",
    "xm-pension-guide": "同安区企业职工办事指南：HTTP 000 不可达（页面已下线或改版）"
                        "→ 已改用思明区退休指南 + 厦门市人社局养老保险处官方指引替代",
}

# 需要 OCR 的源：文本经 OCR 得出，SHA256 比对仍有意义，但抽取需重跑
OCR_SOURCES = {"xm-yb-2026-13"}


def now_iso():
    return datetime.now(TZ).isoformat(timespec="seconds")


def sha256_file(path):
    h = hashlib.sha256()
    with open(path, "rb") as f:
        for chunk in iter(lambda: f.read(1 << 16), b""):
            h.update(chunk)
    return h.hexdigest()


def load_state():
    p = os.path.join(DB, "sync_state.json")
    if os.path.exists(p):
        return json.load(open(p, encoding="utf-8"))
    return {"sources": {}, "last_sync": None, "history": []}


def save_state(state):
    json.dump(state, open(os.path.join(DB, "sync_state.json"), "w", encoding="utf-8"),
              ensure_ascii=False, indent=2)


def source_list():
    """从 fetch.py 读取源清单（避免两处维护）"""
    sys.path.insert(0, PIPE)
    import fetch as F
    return F.SOURCES


def probe_source(key, meta):
    """轻量探测：下载到临时文件，比对 SHA256，返回状态

    不覆盖已有快照 —— 只有调用 commit 才替换。
    kind == "render" 的源走 Playwright 渲染后比对正文哈希。
    """
    raw_path = os.path.join(SNAP, f"{key}.{'pdf' if meta['kind'] == 'pdf' else 'html'}")
    tmp_path = raw_path + ".probe"

    if meta.get("kind") == "render":
        # 渲染型：用 Playwright 取渲染后正文，落盘到临时 txt
        txt_path = raw_path.replace(".html", ".render.txt")
        r = subprocess.run(
            [sys.executable, os.path.join(PIPE, "render.py"), "text",
             meta["url"], key + "__probe"],
            cwd=ROOT, capture_output=True, text=True)
        probe_txt = os.path.join(SNAP, f"{key}__probe.render.txt")
        if not (os.path.exists(probe_txt) and os.path.getsize(probe_txt) > 100):
            return {"status": "unreachable", "http": "render_failed", "changed": None}
        content = open(probe_txt, encoding="utf-8", errors="ignore").read()
        new_hash = content_hash(content)
        old_hash = None
        if os.path.exists(txt_path):
            old_hash = content_hash(
                open(txt_path, encoding="utf-8", errors="ignore").read())
        _rm(probe_txt)
        return {"status": "ok", "http": "200", "changed": old_hash != new_hash,
                "old_sha256": old_hash, "new_sha256": new_hash,
                "probe_path": None, "render": True}

    cmd = ["curl", "-sL", "-A", UA, "--max-time", "60",
           "-o", tmp_path, "-w", "%{http_code}", meta["url"]]
    code = subprocess.run(cmd, capture_output=True, text=True).stdout.strip()
    if code != "200" or not os.path.exists(tmp_path) or os.path.getsize(tmp_path) == 0:
        try:
            os.remove(tmp_path)
        except OSError:
            pass
        return {"status": "unreachable", "http": code, "changed": None}
    new_hash = sha256_file(tmp_path)
    old_hash = sha256_file(raw_path) if os.path.exists(raw_path) else None
    # 文本类源用归一化哈希比对（消除动态内容假变更）；二进制/PDF 用原始哈希
    if meta.get("kind") in ("html", "render"):
        new_hash = content_hash(open(tmp_path, encoding="utf-8", errors="ignore").read())
        old_hash = content_hash(open(raw_path, encoding="utf-8", errors="ignore").read()) \
            if os.path.exists(raw_path) else None
    changed = (old_hash != new_hash)
    return {"status": "ok", "http": code, "changed": changed,
            "old_sha256": old_hash, "new_sha256": new_hash,
            "probe_path": tmp_path, "bytes": os.path.getsize(tmp_path)}


def normalize_for_diff(text):
    """归一化正文，消除动态内容导致的假变更

    政府站页面常含：访问时间戳、随机 token、动态计数器、相对日期。
    这些每次抓取都不同，但不代表政策变了。
    归一化后比对才可靠。
    """
    if not text:
        return ""
    lines = []
    for ln in text.split("\n"):
        ln = ln.strip()
        if not ln:
            continue
        # 纯时间戳/日期行
        if re.fullmatch(r"[-/\d:.年月日时分秒\s]{6,}", ln):
            continue
        # 行内时间戳（2026-10-24 12:00:00 之类）
        ln = re.sub(r"\d{4}[-/年]\d{1,2}[-/月]\d{1,2}日?([ T]\d{1,2}:\d{2}(:\d{2})?)?", "<DATE>", ln)
        # 纯数字行（计数器）
        if re.fullmatch(r"[\d\s]{1,12}", ln):
            continue
        # 长的十六进制/base64 token
        if re.fullmatch(r"[A-Za-z0-9+/=_-]{32,}", ln):
            continue
        # 星期几（页面会渲染当天星期，跨零点抓取就变）
        if re.fullmatch(r"(?:星期|周)[一二三四五六日天]", ln):
            continue
        # 相对时间表述（今天/昨天/刚刚 等）—— 行内替换而非整行丢弃
        ln = re.sub(r"(今天|昨天|前天|刚刚|刚才|稍后|即将|日前)", "<REL>", ln)
        lines.append(ln)
    return "\n".join(lines)


def content_hash(text):
    """归一化后的内容哈希（用于变更判定）"""
    return hashlib.sha256(normalize_for_diff(text).encode("utf-8")).hexdigest()


def _rm(path):
    """安全删除（可能是 None）"""
    if not path:
        return
    try:
        os.remove(path)
    except OSError:
        pass


def cleanup_probes():
    """清理残留的 .probe 文件（同步中断时可能留下）"""
    n = 0
    for fn in os.listdir(SNAP):
        if fn.endswith(".probe") or "__probe" in fn:
            try:
                os.remove(os.path.join(SNAP, fn))
                n += 1
            except OSError:
                pass
    return n


def commit_probe(key, meta, probe):
    """把探测到的变更正式落盘"""
    if not probe.get("changed"):
        _rm(probe.get("probe_path"))
        return False
    ext = "pdf" if meta.get("kind") == "pdf" else "html"
    raw_path = os.path.join(SNAP, f"{key}.{ext}")
    probe_path = probe.get("probe_path")
    if probe.get("render"):
        # 渲染型：探测产物是 .render.txt，替换它并同步 .txt
        render_target = os.path.join(SNAP, f"{key}.render.txt")
        txt_target = os.path.join(SNAP, f"{key}.txt")
        if not probe_path or not os.path.exists(probe_path):
            return False
        if os.path.exists(render_target):
            bak = render_target + f".bak-{datetime.now(TZ).strftime('%Y%m%d%H%M%S')}"
            os.replace(render_target, bak)
        os.replace(probe_path, render_target)
        shutil.copyfile(render_target, txt_target)
        return True
    if not probe_path or not os.path.exists(probe_path):
        return False
    # 备份旧快照，保留变更痕迹
    if os.path.exists(raw_path):
        bak = raw_path + f".bak-{datetime.now(TZ).strftime('%Y%m%d%H%M%S')}"
        os.replace(raw_path, bak)
    os.replace(probe_path, raw_path)
    return True


def reextract(key, meta):
    """重新抽取文本（PDF 走 Swift，HTML 走 BeautifulSoup）"""
    ext = "pdf" if meta["kind"] == "pdf" else "html"
    raw_path = os.path.join(SNAP, f"{key}.{ext}")
    txt_path = os.path.join(SNAP, f"{key}.txt")
    if ext == "pdf":
        exe = os.path.join(PIPE, "pdftext")
        if os.path.exists(exe):
            subprocess.run([exe, raw_path, txt_path], capture_output=True)
    else:
        sys.path.insert(0, PIPE)
        from fetch import clean_html
        raw = open(raw_path, "rb").read().decode("utf-8", errors="ignore")
        txt = clean_html(raw)
        open(txt_path, "w", encoding="utf-8").write(txt)
    # OCR 源需要重新 OCR
    if os.path.exists(txt_path):
        t = open(txt_path, encoding="utf-8", errors="ignore").read()
        cjk = sum(1 for c in t if "一" <= c <= "鿿")
        if len(t) < 200 or (len(t) and cjk / len(t) < 0.25):
            ocr_dir = os.path.join(SNAP, "ocr_pages")
            if os.path.exists(ocr_dir):
                subprocess.run([os.path.join(PIPE, "ocr_batch.sh"), key],
                               cwd=ROOT, capture_output=True)
    return os.path.exists(txt_path)


def run_pipeline():
    """重建库 + 跑断言 + 重建网页 + 页面验收。返回 (ok, 输出)

    页面验收是发布闸门的一部分：数据变了，页面必须跟着重验，
    否则会出现"库里是新数据、页面上还是旧结论"的不一致。
    """
    py = "/Users/dafa/.workbuddy/binaries/python/envs/default/bin/python"
    steps = []
    for script in ["build_db.py", "engine.py", "status_check.py",
                   "build_search_index.py", "assertions.py"]:
        r = subprocess.run([py, os.path.join(PIPE, script)],
                           cwd=ROOT, capture_output=True, text=True)
        steps.append({"script": script, "code": r.returncode,
                      "tail": (r.stdout or "")[-1200:]})
        if r.returncode != 0:
            return False, steps
    # 网页构建 + 页面验收
    r = subprocess.run([py, os.path.join(PIPE, "build_web.py"), "--no-shots"],
                       cwd=ROOT, capture_output=True, text=True)
    steps.append({"script": "build_web.py", "code": r.returncode,
                  "tail": (r.stdout or "")[-1200:]})
    if r.returncode != 0:
        return False, steps
    return True, steps


def cmd_check(state, sources):
    """通路 B：轻量探测，只报告不落盘"""
    changed, unreachable, same = [], [], 0
    for key in sorted((CRITICAL & set(sources)) - set(DISABLED)):
        meta = sources[key]
        p = probe_source(key, meta)
        if p["status"] == "unreachable":
            unreachable.append({"key": key, "http": p.get("http")})
            continue
        if p["changed"]:
            changed.append({"key": key, "doc_number": meta.get("doc_number"),
                            "title": meta.get("title"),
                            "old": (p.get("old_sha256") or "")[:12],
                            "new": (p.get("new_sha256") or "")[:12]})
            _rm(p.get("probe_path"))
        else:
            same += 1
            _rm(p.get("probe_path"))
    return {"checked": len(CRITICAL & set(sources)), "same": same,
            "changed": changed, "unreachable": unreachable,
            "probed_at": now_iso()}


def cmd_sync(state, sources, changed_only=False):
    """通路 A：全量重抓 → 比对 → 落盘 → 重建 → 断言"""
    report = {"started_at": now_iso(), "changed": [], "unchanged": [],
              "unreachable": [], "committed": []}

    all_targets = sorted(sources) if not changed_only else sorted(CRITICAL & set(sources))
    targets = [k for k in all_targets if k not in DISABLED]
    report["skipped"] = [{"key": k, "reason": DISABLED[k]} for k in all_targets
                          if k in DISABLED]
    for i, key in enumerate(targets, 1):
        meta = sources[key]
        p = probe_source(key, meta)
        if p["status"] == "unreachable":
            report["unreachable"].append({"key": key, "http": p.get("http")})
            print(f"  [{i}/{len(targets)}] {key:26} UNREACHABLE({p.get('http')})")
            continue
        if p["changed"]:
            report["changed"].append({
                "key": key, "doc_number": meta.get("doc_number"),
                "title": meta.get("title"), "url": meta.get("url"),
                "old_sha256": p.get("old_sha256"), "new_sha256": p.get("new_sha256"),
                "effective_from": meta.get("effective_from"),
                "critical": key in CRITICAL,
            })
            print(f"  [{i}/{len(targets)}] {key:26} CHANGED  {meta.get('doc_number','')}")
            if commit_probe(key, meta, p):
                reextract(key, meta)
                report["committed"].append(key)
                state["sources"][key] = {
                    "sha256": p.get("new_sha256"),
                    "fetched_at": now_iso(),
                    "doc_number": meta.get("doc_number"),
                    "url": meta.get("url"),
                }
        else:
            report["unchanged"].append(key)
            _rm(p.get("probe_path"))
            # 未变也要记录追踪状态（页面要显示"同步至 X，共 N 个源"）
            state["sources"][key] = {
                "sha256": p.get("new_sha256"),
                "fetched_at": now_iso(),
                "doc_number": meta.get("doc_number"),
                "url": meta.get("url"),
                "unchanged_since": state.get("sources", {}).get(key, {}).get(
                    "fetched_at", now_iso()),
            }
            print(f"  [{i}/{len(targets)}] {key:26} same")
        time.sleep(0.4)

    if report["committed"]:
        print("\n=== 重建政策库并跑断言 ===")
        ok, steps = run_pipeline()
        report["pipeline_ok"] = ok
        report["pipeline_steps"] = steps
        if ok:
            print("  重建通过，断言全绿")
        else:
            print("  !! 重建失败 —— 拒绝发布")
            for s in steps:
                if s["code"] != 0:
                    print(f"  {s['script']} 失败：")
                    print("   ", s["tail"][-600:].replace("\n", "\n    "))
    else:
        report["pipeline_ok"] = True
        print("\n无变更，无需重建")

    cleaned = cleanup_probes()
    if cleaned:
        report["cleaned_probes"] = cleaned
    report["finished_at"] = now_iso()
    state["last_sync"] = report["finished_at"]
    state.setdefault("history", []).append({
        "at": report["finished_at"],
        "changed": len(report["changed"]),
        "committed": len(report["committed"]),
        "unreachable": len(report["unreachable"]),
    })
    state["history"] = state["history"][-30:]
    save_state(state)
    return report


def cmd_report(state):
    last = state.get("history") or []
    print("=== 同步历史（最近 10 次）===")
    for h in last[-10:]:
        print(f"  {h['at']}  变更 {h['changed']}  落盘 {h['committed']}  "
              f"不可达 {h['unreachable']}")
    if not last:
        print("  （尚无同步记录）")
    print(f"\n当前快照追踪的源：{len(state.get('sources', {}))} 个")
    print(f"上次同步：{state.get('last_sync')}")


def main():
    cmd = sys.argv[1] if len(sys.argv) > 1 else "check"
    changed_only = "--changed-only" in sys.argv
    cleanup_probes()
    state = load_state()
    sources = source_list()

    if cmd == "check":
        r = cmd_check(state, sources)
        print(f"=== 轻量探测（{r['checked']} 个时效性关键源）===")
        print(f"  未变化: {r['same']}")
        print(f"  有变化: {len(r['changed'])}")
        for c in r["changed"]:
            print(f"    ⚠ {c['key']}  {c['doc_number']}  {c['title'][:36]}")
        if r["unreachable"]:
            print(f"  不可达: {len(r['unreachable'])}")
            for u in r["unreachable"]:
                print(f"    ✗ {u['key']} (HTTP {u['http']})")
        json.dump(r, open(os.path.join(DB, "sync_probe.json"), "w", encoding="utf-8"),
                  ensure_ascii=False, indent=2)
        return 0

    if cmd == "sync":
        print(f"=== 开始同步（{len(sources)} 个源）===")
        r = cmd_sync(state, sources, changed_only)
        print(f"\n=== 同步结果 ===")
        print(f"  变更 {len(r['changed'])} / 未变 {len(r['unchanged'])} / "
              f"不可达 {len(r['unreachable'])}")
        for c in r["changed"]:
            print(f"  ⚠ {c['doc_number']}  {c['title'][:44]}")
            print(f"    {c['url']}")
        json.dump(r, open(os.path.join(DB, "sync_report.json"), "w", encoding="utf-8"),
                  ensure_ascii=False, indent=2)
        print(f"  报告 → policy_db/sync_report.json")
        return 0 if r.get("pipeline_ok") else 1

    if cmd == "report":
        cmd_report(state)
        return 0

    print("用法: python3 sync.py [check|sync|report] [--changed-only]")
    return 1


if __name__ == "__main__":
    sys.exit(main())
