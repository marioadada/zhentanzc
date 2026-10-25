#!/usr/bin/env python3
"""政策状态反查：三层证据链

对应深化提示词 §5.3「官方口径反证」。

原方案只依赖"规范性文件清理目录"，但该目录的清单表在 docx 附件里、
由 JS 注入，抓不到 —— 结果只能报 not_in_cleanup_list，等于没有反查能力。

现改为三层，逐层递进，任何一层命中即可定级：

  L-1 文件自身声明的「有效性」元数据（政府信息公开页面的标准字段）
      取值：有效 / 失效 / 废止 / 未设置
      → 权威性最高，是发布机关自己对该文件状态的声明

  L-2 规范性文件清理目录正文的「废止/失效」标记
      → 需要目录清单表，当前抓不到时诚实降级

  L-3 沿革链（supersedes / superseded_by）
      → 库内已知的替代关系

关键原则：
  - 不把「没查到」当成「有效」
  - 也不把「没抓到」当成「已废止」
  - 「未设置」是第三态，既不证明有效也不证明失效，必须显式标出
"""
import json
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DB = os.path.join(ROOT, "policy_db")
SNAP = os.path.join(ROOT, "snapshots")

VALIDITY_VALUES = ["有效", "失效", "废止", "未设置"]


def load_validity_meta():
    """从快照中抽取每个文件的「有效性」元数据

    返回 {slug: {"validity": ..., "doc_number": ..., "title": ...}}
    """
    meta = {}
    for fn in sorted(os.listdir(SNAP)):
        if not fn.endswith(".txt") or fn.startswith("xhr_"):
            continue
        slug = fn[:-4]
        path = os.path.join(SNAP, fn)
        try:
            text = open(path, encoding="utf-8", errors="ignore").read()
        except OSError:
            continue
        if len(text) < 200:
            continue
        head = text[:1200]
        m = re.search(r"有效性\s*[\t　 ]*\s*(有效|失效|废止|未设置)", head)
        if not m:
            continue
        dm = re.search(r"文\s*号\s*[\t　 ]*\s*([^\n\t　]+)", head)
        tm = re.search(r"标\s*题\s*[\t　 ]*\s*([^\n\t　]+)", head)
        meta[slug] = {
            "validity": m.group(1),
            "doc_number": (dm.group(1).strip() if dm else None),
            "title": (tm.group(1).strip() if tm else None),
            "source": fn,
        }
    return meta


CLEANUP_FILES = ["xm-hrss-cleanup", "hrss-20230621", "xm-hrss-cleanup-doc"]


def load_cleanup_records():
    """从清理目录正文抽取 {文号: 状态}（需清单表，缺失时返回空）"""
    table = {}
    for fn in CLEANUP_FILES:
        path = os.path.join(SNAP, f"{fn}.txt")
        if not os.path.exists(path):
            continue
        text = open(path, encoding="utf-8", errors="ignore").read()
        flat = re.sub(r"[ \t　]+", "", text)
        self_docs = set()
        if "规范性文件目录" in flat:
            head_end = flat.find("现将继续有效")
            if head_end < 0:
                head_end = flat.find("现将")
            body = flat[head_end:] if head_end > 0 else ""
            self_docs |= set(re.findall(r"([厦闽][^\s，,。；;]{2,24}?〔\d{4}〕\d+号)", body))
        for m in re.finditer(r"([厦闽][^\s，,。；;]{2,24}?〔\d{4}〕\d+号)", flat):
            doc = m.group(1)
            if doc in self_docs:
                continue
            before = flat[max(0, m.start() - 260):m.start()]
            if re.search(r"(废止|失效)[^\n]{0,40}$", before):
                table[doc] = "invalid"
            elif re.search(r"(继续有效)[^\n]{0,40}$", before):
                table[doc] = "valid"
    return table


def load_version_chain(db):
    chain = {}
    for key, pol in db.items():
        for target in pol.get("superseded_by") or []:
            chain.setdefault(pol.get("doc_number"), []).append(
                {"superseded_by": target, "reason": "库内沿革链声明"})
    return chain


def check(db):
    validity = load_validity_meta()
    cleanup = load_cleanup_records()
    chain = load_version_chain(db)

    by_doc = {}
    for slug, v in validity.items():
        if v.get("doc_number"):
            by_doc.setdefault(v["doc_number"], v)

    results = []
    for key, pol in db.items():
        doc = pol.get("doc_number")
        verdict = None
        layer = None
        note = ""
        evidence = {}

        vm = by_doc.get(doc)
        if vm:
            evidence["L1_validity_field"] = vm
            if vm["validity"] == "有效":
                verdict, layer = "valid", "L-1 文件有效性元数据"
                note = "该文件页面「有效性」字段标注为「有效」，为发布机关自身声明。"
            elif vm["validity"] in ("失效", "废止"):
                verdict, layer = "invalid", "L-1 文件有效性元数据"
                note = f"该文件页面「有效性」字段标注为「{vm['validity']}」，必须降级。"
            else:
                verdict, layer = "validity_unset", "L-1 文件有效性元数据"
                note = ("该文件页面「有效性」字段为「未设置」——既不证明有效也不证明失效。"
                        "需人工核对清理目录清单表。")

        if verdict in (None, "validity_unset"):
            if doc in cleanup:
                evidence["L2_cleanup_list"] = cleanup[doc]
                if cleanup[doc] == "invalid":
                    verdict, layer = "invalid", "L-2 规范性文件清理目录"
                    note = "该文号出现在废止/失效清单中。引用它的结论必须降级。"
                else:
                    verdict, layer = "valid", "L-2 规范性文件清理目录"
                    note = "该文号出现在继续有效清单中。"

        if doc in chain:
            evidence["L3_version_chain"] = chain[doc]
            if verdict is None:
                verdict, layer = "superseded", "L-3 库内沿革链"
                note = "该文件已被库内沿革链标记为被替代。"
            elif verdict == "valid":
                verdict, layer = "superseded", "L-3 库内沿革链"
                note = ("文件自身标注「有效」，但库内沿革链显示其已被替代"
                        "（可能是部分条款被覆盖，需按条款核对）。")

        if verdict is None:
            verdict = "unknown"
            layer = "无反查证据"
            note = ("未找到任何状态反查证据（既无有效性元数据，也未进清理目录，"
                    "库内也无沿革链）。不得据此认为文件有效。")

        results.append({
            "policy_id": key,
            "doc_number": doc,
            "current_status": pol.get("status"),
            "status_verdict": verdict,
            "evidence_layer": layer,
            "note": note,
            "evidence": evidence,
            "should_downgrade": verdict == "invalid",
        })
    return results, validity, cleanup


def main():
    db = json.load(open(os.path.join(DB, "policy_db.json"), encoding="utf-8"))
    results, validity, cleanup = check(db)
    json.dump(results, open(os.path.join(DB, "status_check.json"), "w",
                            encoding="utf-8"), ensure_ascii=False, indent=2)
    json.dump(validity, open(os.path.join(DB, "validity_meta.json"), "w",
                             encoding="utf-8"), ensure_ascii=False, indent=2)

    print(f"L-1 有效性元数据载入 {len(validity)} 份文件")
    print(f"L-2 清理目录反查表 {len(cleanup)} 条文号")
    print("\n=== 三层状态反查结果 ===")
    stats = {}
    for r in results:
        stats[r["status_verdict"]] = stats.get(r["status_verdict"], 0) + 1
        flag = " ↓需降级" if r["should_downgrade"] else ""
        print(f"  [{r['status_verdict']:15}] {str(r['doc_number'])[:30]:32} {r['evidence_layer']}{flag}")
    print(f"\n统计：{stats}")
    print("-> ", os.path.join(DB, "status_check.json"))
    return 0


if __name__ == "__main__":
    sys.exit(main())
