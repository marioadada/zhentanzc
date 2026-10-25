#!/usr/bin/env python3
"""厦门民生政策侦探 · 一手源抓取管线

设计原则（对应深化提示词 §5 可证伪性）：
1. 直连官方站，不用通用搜索引擎
2. 每个源落地两份：原始字节快照 + SHA256 + 抽取后的纯文本
3. 抽取文本必须是快照的可回溯来源，quote 必须是 txt 的真实子串
4. 扫描件（无文本层）标记 needs_ocr，进异步队列，不猜内容

用法：
    python3 fetch.py --stage core     # 核心 L1 文件
    python3 fetch.py --stage guide    # L2 办事指南
    python3 fetch.py --stage param    # L3 参数表
    python3 fetch.py --stage all
"""
import hashlib
import json
import os
import re
import subprocess
import sys
import time
from datetime import datetime, timezone, timedelta

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SNAP = os.path.join(ROOT, "snapshots")
DB = os.path.join(ROOT, "policy_db")
os.makedirs(SNAP, exist_ok=True)
os.makedirs(DB, exist_ok=True)

TZ = timezone(timedelta(hours=8))
UA = ("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36")
PDFTXT = os.path.join(ROOT, "pipeline", "pdftext")

# ── 源清单 ──────────────────────────────────────────────────────────────
# layer: L1 规范性文件正文 / L2 办事指南 / L3 官方参数表 / L4 官方解释与失效清单
# kind: html | pdf
SOURCES = {
    "xm-yb-2022-12": {
        "layer": "L1", "kind": "html",
        "doc_number": "厦府规〔2022〕12号",
        "title": "厦门市职工医疗保险实施细则和厦门市城乡居民医疗保险实施细则",
        "issuer": "厦门市人民政府",
        "url": "https://www.xm.gov.cn/zfgb/99833450",
        "pdf_url": "https://www.xm.gov.cn/zfgb/pdf/upload/20221214095516952415.pdf",
        "effective_from": "2022-07-01",
    },
    "xm-gb-2025-2": {
        "layer": "L1", "kind": "pdf",
        "doc_number": "厦府规〔2025〕2号",
        "title": "厦门市退休人员社会化管理服务办法",
        "issuer": "厦门市人民政府",
        "url": "https://www.xm.gov.cn/zwgk/flfg/sfwj/202503/P020250301753539408346.pdf",
        "effective_from": "2025-03-01",
    },
    "xm-yb-2026-13": {
        "layer": "L1", "kind": "pdf",
        "doc_number": "闽医保〔2026〕13号",
        "title": "关于完善生育保险参保缴费和待遇享受等有关问题的通知",
        "issuer": "福建省医疗保障局 福建省财政厅 国家税务总局福建省税务局",
        "url": "https://ylbz.xm.gov.cn/zwgk/zfxxgk/ml/zcwj/qtwj/202603/P020260313526925372654.pdf",
        "effective_from": "2026-03-01",
    },
    "xm-yb-2026-rate": {
        "layer": "L1", "kind": "html",
        "doc_number": "厦医保公告 2026年度职工基本医疗保险缴费率",
        "title": "关于明确2026年职工基本医疗保险缴费率的公告",
        "issuer": "厦门市医疗保障局 厦门市财政局 国家税务总局厦门市税务局",
        "url": "https://ylbz.xm.gov.cn/zwgk/tzgg/202512/t20251231_2975001.htm",
        "effective_from": "2026-01-01", "effective_to": "2026-12-31",
    },
    "xm-yb-2025-rate": {
        "layer": "L1", "kind": "html",
        "doc_number": "厦医保 2025年度职工基本医疗保险缴费率",
        "title": "关于公布2025年度职工基本医疗保险缴费率的通知",
        "issuer": "厦门市医疗保障局 厦门市财政局 国家税务总局厦门市税务局",
        "url": "https://ylbz.xm.gov.cn/zwgk/zfxxgk/zc/ybzcfg/202501/t20250127_2915362.htm",
        "effective_from": "2025-01-01", "effective_to": "2025-12-31",
    },
    "xm-yb-2019-126": {
        "layer": "L1", "kind": "html",
        "doc_number": "厦医保〔2019〕126号",
        "title": "关于转发福建省全面推进生育保险与职工基本医疗保险合并实施工作方案的通知",
        "issuer": "厦门市医疗保障局 厦门市财政局 国家税务总局厦门市税务局",
        "url": "https://ylbz.xm.gov.cn/zwgk/zfxxgk/ml/zcwj/zcfg/201912/t20191230_2412046.htm",
        "effective_from": "2020-01-01",
    },
    "xm-yb-2025-7": {
        "layer": "L1", "kind": "html",
        "doc_number": "厦府规〔2025〕7号",
        "title": "厦门市人民政府关于失业保险纳入省级统筹相关政策调整的通知",
        "issuer": "厦门市人民政府",
        "url": "https://www.xm.gov.cn/zfgb/99833863",
        "effective_from": "2025-01-01", "effective_to": "2027-12-31",
    },
    "fj-rst-2026-13": {
        "layer": "L1", "kind": "html",
        "doc_number": "闽人社文〔2026〕13号",
        "title": "关于调整2026年职工基本养老保险和失业保险缴费基数的通知",
        "issuer": "福建省人力资源和社会保障厅 福建省财政厅 国家税务总局福建省税务局",
        "url": "https://hrss.xm.gov.cn/xxgk/sjwj/202610/t20261009_3020482.htm",
        "effective_from": "2026-01-01",
    },
    "xm-hrss-policy": {
        "layer": "L1", "kind": "html",
        "doc_number": "厦门市人社局政策法规库",
        "title": "厦门市人力资源和社会保障局 政策法规",
        "issuer": "厦门市人力资源和社会保障局",
        "url": "https://hrss.xm.gov.cn/xxgk/zcfg/",
        "effective_from": None,
    },
    "xm-hrss-cleanup": {
        "layer": "L4", "kind": "html",
        "doc_number": "规范性文件清理目录",
        "title": "关于公布继续有效、废止和失效的规范性文件目录的通知",
        "issuer": "厦门市人力资源和社会保障局",
        "url": "https://hrss.xm.gov.cn/xxgk/zfxxgkzl/zfxxgkml/zcfg/qtwj/",
        "effective_from": None,
    },
    "fj-one-flexible": {
        "layer": "L2", "kind": "html",
        "doc_number": "福建省网上办事大厅 灵活就业一件事",
        "title": "灵活就业一件事 办事指南",
        "issuer": "福建省网上办事大厅",
        "url": "https://zwfw.fujian.gov.cn:1001/OnebusinessCate/efficiently-thing/flexible-employment/",
        "effective_from": None,
    },
    "fj-one-list": {
        "layer": "L2", "kind": "html",
        "doc_number": "福建省网上办事大厅 一件事目录",
        "title": "市县一件事 办事指南目录",
        "issuer": "福建省网上办事大厅",
        "url": "https://zwfw.fujian.gov.cn:1001/OnebusinessCate/unite-list/?cityCode=350200000000",
        "effective_from": None,
    },
    "xm-participate-guide": {
        "layer": "L2", "kind": "render",
        "doc_number": "厦门市民专属参保指南",
        "title": "不同人群如何参保",
        "issuer": "厦门市人民政府",
        "url": "https://cloud.xm.gov.cn/165/service/2776639.xhtml",
        "effective_from": None,
    },
    "xm-tax-param": {
        "layer": "L3", "kind": "html",
        "doc_number": "厦门税务 社保费费种费率表",
        "title": "社保费费种费率表（历年社平工资参数、最低工资标准等）",
        "issuer": "国家税务总局厦门市税务局",
        "url": "https://xiamen.chinatax.gov.cn/xmswcms/mobile/content/N3333.html",
        "effective_from": None,
    },
    "xm-yb-interpret": {
        "layer": "L4", "kind": "html",
        "doc_number": "厦门市医保局 在线访谈文字实录",
        "title": "灵活就业人员参加职工医保政策解读",
        "issuer": "厦门市医疗保障局",
        "url": "https://www.xm.gov.cn/ftzb/sybjjdlhjyry/wzsl/",
        "effective_from": None,
    },
    # ── 2026-10 新增：元宝搜索发现的参赛前最新文件 ──────────────────
    "xm-yb-2026-90": {
        "layer": "L1", "kind": "html",
        "doc_number": "厦医保〔2026〕90号",
        "title": "关于确定2027年度城乡居民基本医疗保险和长期护理保险筹资标准的通知",
        "issuer": "厦门市医疗保障局 厦门市财政局 国家税务总局厦门市税务局",
        "url": "https://ylbz.xm.gov.cn/zwgk/zfxxgk/ml/zcwj/qtwj/202610/t20261013_3021006.htm",
        "effective_from": "2027-01-01",
    },
    "xm-chc-2026-3": {
        "layer": "L1", "kind": "html",
        "doc_number": "厦医保规〔2026〕3号",
        "title": "厦门市长期护理保险实施细则",
        "issuer": "厦门市医疗保障局 厦门市财政局 国家税务总局厦门市税务局 厦门市人力资源和社会保障局",
        "url": "https://ylbz.xm.gov.cn/zwgk/zfxxgk/zc/ybzcfg/202610/t20261010_3020656.htm",
        "effective_from": "2027-01-01",
    },
    "xm-yb-2026-24": {
        "layer": "L1", "kind": "html",
        "doc_number": "厦医保〔2026〕24号",
        "title": "关于转发福建省医疗保障局等三部门关于完善生育保险参保缴费和待遇享受等有关问题的通知",
        "issuer": "厦门市医疗保障局 厦门市财政局 国家税务总局厦门市税务局",
        "url": "https://ylbz.xm.gov.cn/zwgk/zfxxgk/ml/zcwj/qtwj/202603/t20260313_2985345.htm",
        "effective_from": "2026-03-01",
    },
    "xm-yb-2025-86": {
        "layer": "L1", "kind": "html",
        "doc_number": "厦医保〔2025〕86号",
        "title": "关于调整居民医保参保政策的通知",
        "issuer": "厦门市医疗保障局 厦门市财政局 国家税务总局厦门市税务局",
        "url": "https://ylbz.xm.gov.cn/zwgk/zfxxgk/ml/zcwj/zcfg/202508/t20250814_2950409.htm",
        "effective_from": "2025-09-01", "effective_to": "2030-08-31",
    },
    "xm-yb-2025-96": {
        "layer": "L1", "kind": "html",
        "doc_number": "厦医保〔2025〕96号",
        "title": "关于调整城乡居民基本医疗保险筹资标准的通知",
        "issuer": "厦门市医疗保障局 厦门市财政局 国家税务总局厦门市税务局",
        "url": "https://ylbz.xm.gov.cn/zwgk/tpxw/202510/t20251023_2962144.htm",
        "effective_from": "2026-01-01", "effective_to": "2026-12-31",
    },
    "xm-chc-interpret": {
        "layer": "L4", "kind": "html",
        "doc_number": "厦医保规〔2026〕3号 政策解读",
        "title": "《厦门市长期护理保险实施细则》政策解读",
        "issuer": "厦门市医疗保障局",
        "url": "https://ylbz.xm.gov.cn/zwgk/zfxxgk/ml/zcwj/zcjd/202610/t20261010_3020657.htm",
        # 政策解读发布日 = 2026-10-10：费率调整幅度这一事实自发布即可知，
        # 实际扣减自 2027-01-01 起
        "effective_from": "2026-10-10",
    },
    "xm-waitperiod": {
        "layer": "L4", "kind": "html",
        "doc_number": "待遇等待期与两大激励 官方答疑",
        "title": "全民参保缴费集中宣传月 待遇等待期 两大激励 答疑解惑",
        "issuer": "厦门市医疗保障局",
        "url": "https://ylbz.xm.gov.cn/zwgk/ybdt/202512/t20251201_2969555.htm",
        "effective_from": "2025-01-01",
    },
    "xm-resident-guide": {
        "layer": "L2", "kind": "render",
        "doc_number": "6.1.6 城乡居民医疗保险参保(缴费)",
        "title": "城乡居民医疗保险参保(缴费) 办事指南",
        "issuer": "厦门市人民政府",
        "url": "https://cloud.xm.gov.cn/165/service/2776119.xhtml",
        "effective_from": None,
    },
    # ── 最低工资标准（失业保险金计算的关键输入）──
    "fj-minwage-2025-14": {
        "layer": "L1", "kind": "html",
        "doc_number": "闽人社文〔2025〕14号",
        "title": "福建省人力资源和社会保障厅关于公布我省最低工资标准的通知",
        "issuer": "福建省人力资源和社会保障厅",
        "url": "https://www.xiangan.gov.cn/zwgk/jycy/zcwj/202502/t20250212_1089240.htm",
        "effective_from": "2025-04-01",
    },
    "xm-unemp-claim-guide": {
        "layer": "L2", "kind": "render",
        "doc_number": "失业保险金申领 办事指南（思明区）",
        "title": "失业保险金申领 办事指南",
        "issuer": "厦门市思明区人民政府",
        "url": "https://www.siming.gov.cn/wsbs/ztfw/sb/nrrh/202309/t20230913_930369.htm",
        "effective_from": None,
    },
    # ── 养老保险侧（补齐社保证据的第二块）──
    "xm-pension-guide-DISABLED": {
        "layer": "L2", "kind": "html",
        "doc_number": "企业职工 办事指南（同安区）",
        "title": "企业职工基本养老保险 参保与退休办事指南",
        "issuer": "厦门市同安区人民政府",
        "url": "https://www.xmta.gov.cn/ztfw/sb/ylbx/ylbxzn/202211/t20221128_881360.htm",
        "effective_from": None,
    },
    "xm-pension-retire-guide": {
        "layer": "L2", "kind": "render",
        "doc_number": "企业职工退休—养老保险待遇申领 办事指南",
        "title": "企业职工退休 养老保险待遇申领 办事指南",
        "issuer": "厦门市思明区人民政府",
        "url": "https://siming.gov.cn/wsbs/ztfw/sb/nrrh/202411/t20241119_1078974.htm?PROTID=6713",
        "effective_from": None,
    },
    "xm-pension-transfer-interpret": {
        "layer": "L4", "kind": "html",
        "doc_number": "养老保险转移、退保、继承政策解读",
        "title": "海沧区社保中心 在线访谈文字实录",
        "issuer": "厦门市海沧区人民政府",
        "url": "https://www.haicang.gov.cn/hdjl/zxft/202512/t20251205_1129768.htm",
        "effective_from": None,
    },
    "xm-residence-pension-interpret": {
        "layer": "L4", "kind": "html",
        "doc_number": "居住证人员参加企业职工基本养老保险 解读",
        "title": "解读《关于持有厦门市居住证人员参加企业职工基本养老保险有关意见的通知》",
        "issuer": "厦门市人力资源和社会保障局",
        "url": "https://hrss.xm.gov.cn/gzcy/zxft/jdcxmjzzkcb",
        "effective_from": None,
    },
    "xm-pension-official-guide": {
        "layer": "L4", "kind": "render",
        "doc_number": "灵活就业人员 养老保险参保指引",
        "title": "@灵活就业人员，养老保险参保指引来啦！",
        "issuer": "厦门市人力资源和社会保障局 养老保险处",
        "url": "https://cloud.xm.gov.cn/165/service/2810450.xhtml",
        "effective_from": None,
    },
    # ── 2026-10 元宝搜索命中：居民医保集中期 + 待遇标准 ──
    "xm-resident-enroll-2026": {
        "layer": "L4", "kind": "html",
        "doc_number": "2026年居民医保集中参保缴费期 缴费指引",
        "title": "家庭共济代缴超方便！2026年居民医保缴费，先抢先了解",
        "issuer": "厦门市医疗保障局",
        "url": "https://ylbz.xm.gov.cn/zwgk/tpxw/202510/t20251014_2960088.htm",
        "effective_from": "2025-10-14",
    },
    "xm-resident-policy-interpret": {
        "layer": "L4", "kind": "html",
        "doc_number": "厦医保〔2025〕86号 政策解读",
        "title": "《关于调整居民医保参保政策的通知》政策解读",
        "issuer": "厦门市医疗保障局",
        "url": "https://ylbz.xm.gov.cn/zwgk/zfxxgk/ml/zcwj/zcjd/202508/t20250818_2950855.htm",
        "effective_from": "2025-09-01",
    },
    "xm-medical-continuity": {
        "layer": "L4", "kind": "html",
        "doc_number": "医保连续缴费与转移接续 官方提示",
        "title": "搬家、换工作……医保记得连续缴费",
        "issuer": "厦门市医疗保障局",
        "url": "https://ylbz.xm.gov.cn/zwgk/tpxw/202605/t20260529_2998199.htm",
        "effective_from": "2026-05-29",
    },
    # ── 集中参保缴费期起止日（一手公告，含具体日期）─────────────
    # 厦府规〔2022〕12号 居民细则第九条只写"9月至12月"，无具体日；
    # 具体起止日只存在于医保局的专题公告里，因此单列为独立源。
    "xm-resident-enroll-window-2026": {
        "layer": "L1", "kind": "html",
        "doc_number": "2026年居民医保集中参保缴费期公告",
        "title": "2026年居民医保集中参保缴费期即将截止",
        "issuer": "厦门市医疗保障局",
        "url": "https://ylbz.xm.gov.cn/zwgk/tpxw/202512/t20251224_2973554.htm",
        # 该公告适用于 2026 年度居民医保的集中参保缴费期（2025-10-22 ~ 2025-12-26）
        "effective_from": "2025-10-22",
        "effective_to": "2025-12-26",
    },
    "xm-resident-enroll-window-2027": {
        "layer": "L1", "kind": "html",
        "doc_number": "2027年度居民医保及长护险集中参保缴费期公告",
        "title": "厦门正式落地长期护理保险制度",
        "issuer": "厦门市医疗保障局",
        "url": "https://ylbz.xm.gov.cn/zwgk/tpxw/202610/t20261012_3020838.htm",
        # 居民在 2026 年 10 月至 12 月集中参保缴费期内缴纳 2027 年度保费
        "effective_from": "2026-10-01",
        "effective_to": "2026-12-31",
    },
    # ── 灵活就业参保承诺制（无居住证的非本市户籍人员办理路径）──────
    "xm-flexible-commitment": {
        "layer": "L4", "kind": "render",
        "doc_number": "灵活就业参保承诺制 12345热线官方答复",
        "title": "外省失业人员如何在厦门以灵活就业身份参保",
        "issuer": "厦门市医疗保障局",
        "url": "https://ylbz.xm.gov.cn/gzcy/zxzx/index_20992.htm?id=XM25052003182",
        "effective_from": "2025-05-20",
        "effective_to": "2027-05-20",
    },
}


def now_iso():
    return datetime.now(TZ).isoformat(timespec="seconds")


def sha256(path):
    h = hashlib.sha256()
    with open(path, "rb") as f:
        for chunk in iter(lambda: f.read(1 << 16), b""):
            h.update(chunk)
    return h.hexdigest()


def clean_html(raw):
    from bs4 import BeautifulSoup
    soup = BeautifulSoup(raw, "lxml")
    for t in soup(["script", "style", "nav", "footer", "header"]):
        t.decompose()
    txt = soup.get_text("\n")
    txt = re.sub(r"[ \t　]+", " ", txt)
    txt = re.sub(r"\n\s*\n\s*\n+", "\n\n", txt)
    return "\n".join(l.strip() for l in txt.split("\n") if l.strip())


def fetch(key):
    meta = SOURCES[key]
    slug = key
    ext = "pdf" if meta.get("kind") == "pdf" else "html"
    raw_path = os.path.join(SNAP, f"{slug}.{ext}")
    txt_path = os.path.join(SNAP, f"{slug}.txt")
    rec = dict(meta)
    rec["key"] = key
    rec["fetched_at"] = now_iso()

    # 1) 原始字节
    kind = meta.get("kind", "html")
    if kind == "render":
        # 渲染型源：Playwright 取渲染后正文
        raw_path = os.path.join(SNAP, f"{slug}.render.txt")
        if not os.path.exists(raw_path) or os.path.getsize(raw_path) < 100:
            r = subprocess.run(
                [sys.executable, os.path.join(ROOT, "pipeline", "render.py"),
                 "text", meta["url"], slug],
                cwd=ROOT, capture_output=True, text=True)
            rec["http_status"] = "rendered" if r.returncode == 0 else "render_failed"
        else:
            rec["http_status"] = "cached"
    else:
        raw_path = os.path.join(SNAP, f"{slug}.{ext}")
        if not os.path.exists(raw_path) or os.path.getsize(raw_path) == 0:
            cmd = ["curl", "-sL", "-A", UA, "--max-time", "90",
                   "-o", raw_path, "-w", "%{http_code}", meta["url"]]
            code = subprocess.run(cmd, capture_output=True, text=True).stdout.strip()
            rec["http_status"] = code
            time.sleep(0.6)
        else:
            rec["http_status"] = "cached"

    if not os.path.exists(raw_path) or os.path.getsize(raw_path) == 0:
        rec["status"] = "failed"
        rec["error"] = "empty_response"
        return rec

    rec["raw_sha256"] = sha256(raw_path)
    rec["raw_bytes"] = os.path.getsize(raw_path)

    # 2) 抽取文本
    if ext == "pdf":
        # 扫描件（无文本层）必须走 OCR；且不得用空结果覆盖已有 OCR 文本
        probe_txt = txt_path + ".probe"
        if os.path.exists(PDFTXT):
            subprocess.run([PDFTXT, raw_path, probe_txt], capture_output=True)
        probe_len = 0
        if os.path.exists(probe_txt):
            probe_len = len(open(probe_txt, encoding="utf-8", errors="ignore").read())
            if probe_len >= 200:
                os.replace(probe_txt, txt_path)
            else:
                os.remove(probe_txt)
        if probe_len < 200:
            # 需要 OCR
            ocr_script = os.path.join(ROOT, "pipeline", "ocr_batch.sh")
            if os.path.exists(ocr_script):
                subprocess.run([ocr_script, slug], cwd=ROOT, capture_output=True)
        elif not os.path.exists(txt_path):
            os.replace(probe_txt, txt_path) if os.path.exists(probe_txt) else None
    elif kind == "render":
        # 渲染型：raw_path 已是纯文本，直接复制为 txt
        with open(raw_path, encoding="utf-8", errors="ignore") as f:
            txt = f.read()
        # 渲染结果必须真正落到标准 .txt（否则建库读到的还是旧的空版本）
        with open(txt_path, "w", encoding="utf-8") as f:
            f.write(txt)
    else:
        with open(raw_path, "rb") as f:
            raw = f.read().decode("utf-8", errors="ignore")
        txt = clean_html(raw)
        # 防降级覆盖：HTML 抽取结果若明显短于既有快照（例如该页其实是 JS 渲染，
        # 静态 HTML 里没有正文），保留旧快照并标记，绝不用空壳覆盖有效数据。
        prev_len = 0
        if os.path.exists(txt_path):
            prev_len = len(open(txt_path, encoding="utf-8", errors="ignore").read())
        if prev_len > 0 and len(txt) < prev_len * 0.6:
            rec["status"] = "degraded_extract"
            rec["reason"] = (f"新抽取 {len(txt)} 字符 < 既有快照 {prev_len} 字符的 60%，"
                             f"已保留旧快照（该源可能需要渲染抓取）")
            rec["text_chars"] = prev_len
            rec["text_sha256"] = hashlib.sha256(
                open(txt_path, "rb").read()).hexdigest()
            rec["cjk_ratio"] = 0
            return rec
        with open(txt_path, "w", encoding="utf-8") as f:
            f.write(txt)

    if os.path.exists(txt_path):
        text = open(txt_path, encoding="utf-8", errors="ignore").read()
        rec["text_chars"] = len(text)
        rec["text_sha256"] = hashlib.sha256(text.encode("utf-8")).hexdigest()
        # 中文占比检测：乱码判定（PDFKit 自定义子集无 ToUnicode 时会抽出非中文乱码）
        cjk = sum(1 for c in text if "一" <= c <= "鿿")
        rec["cjk_ratio"] = round(cjk / max(len(text), 1), 4)
        if len(text) < 200:
            rec["status"] = "needs_ocr"
            rec["reason"] = "no_text_layer_or_scanned"
        elif rec["cjk_ratio"] < 0.25:
            rec["status"] = "needs_ocr"
            rec["reason"] = f"garbled_cjk_ratio={rec['cjk_ratio']}"
        else:
            rec["status"] = "ok"
    else:
        rec["status"] = "failed"
        rec["error"] = "text_extract_failed"
    return rec


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("-")]
    stage = args[0] if args else "core"
    groups = {
        "core": ["xm-yb-2022-12", "xm-yb-2026-13", "xm-yb-2026-rate",
                 "xm-yb-2025-rate", "xm-yb-2019-126", "xm-yb-2025-7",
                 "fj-rst-2026-13", "xm-gb-2025-2", "fj-minwage-2025-14",
                 "xm-yb-2026-90", "xm-chc-2026-3", "xm-yb-2025-86", "xm-yb-2026-24",
                 "xm-yb-2025-96"],
        "guide": ["fj-one-flexible", "fj-one-list", "xm-participate-guide",
                  "xm-hrss-policy", "xm-hrss-cleanup",
                  "xm-resident-guide", "xm-unemp-claim-guide",
                  "xm-pension-guide", "xm-pension-retire-guide"],
        "param": ["xm-tax-param", "xm-yb-interpret",
                  "xm-chc-interpret", "xm-waitperiod",
                  "xm-resident-enroll-2026", "xm-resident-policy-interpret",
                  "xm-medical-continuity", "xm-flexible-commitment",
                  "xm-pension-transfer-interpret", "xm-residence-pension-interpret",
                  "xm-pension-official-guide"],
        "enroll": ["xm-resident-enroll-window-2026",
                   "xm-resident-enroll-window-2027"],
    }
    keys = groups.get(stage)
    if keys is None:
        keys = sum(groups.values(), [])
    results = []
    for k in keys:
        r = fetch(k)
        results.append(r)
        print(f"[{r.get('status','?'):10}] {k:22} "
              f"{r.get('text_chars',0):>7} chars  cjk={r.get('cjk_ratio',0):.2f}  "
              f"{r.get('doc_number','')}")
    out = os.path.join(DB, f"fetch_{stage}_{datetime.now(TZ).strftime('%Y%m%d_%H%M%S')}.json")
    with open(out, "w", encoding="utf-8") as f:
        json.dump(results, f, ensure_ascii=False, indent=2)
    print("\n-> ", out)


if __name__ == "__main__":
    main()
