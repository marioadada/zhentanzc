#!/usr/bin/env python3
"""复合文件分区解析：一份文件含多部细则时的条款定位

专业问题：厦府规〔2022〕12号 是《厦门市职工医疗保险实施细则》和
《厦门市城乡居民医疗保险实施细则》的合并本。两套细则各自独立编号，
都从"第一条"开始，因此 **条款号会撞车**：
  - 职工细则第六条 = 职工医保费率
  - 居民细则第六条 = 居民医保筹资机制
若不分区，"第六条"这个引用无法唯一定位。

本模块按"第X章"锚点把文件切成多个 part，每个 part 独立编号，
条款引用带上 part 标识 → `第六条@职工医保` / `第六条@居民医保`。
"""
import re

CN_NUM = "一二三四五六七八九十百零"


def split_parts(text, min_heading_len=8):
    """按"第X章 标题"切分为多个 part

    返回 [{part_no, part_name, start, end, text}]
    切分依据：章标题后紧跟"第一条"或"第X条"，且章标题本身含细则特征词。
    """
    flat = re.sub(r"[ \t　]+", "", text)
    # 找所有"第X章"位置
    heads = [(m.start(), m.group(0)) for m in re.finditer(rf"第[{CN_NUM}]+章", flat)]
    parts = []
    for i, (pos, head) in enumerate(heads):
        # 章标题名 = 从"第X章"到下一个"第X条"之间的文字
        m = re.match(rf"第[{CN_NUM}]+章([^\n]{{0,40}}?)(?=第[{CN_NUM}]+条)", flat[pos:pos + 400])
        name = m.group(1).strip() if m else ""
        end = heads[i + 1][0] if i + 1 < len(heads) else len(flat)
        parts.append({"part_no": len(parts), "part_name": name, "start": pos, "end": end})
    return parts


def detect_regime(text):
    """识别文本属于职工医保还是居民医保（依据总则首条的措辞）"""
    if "为规范职工医疗保障关系" in text[:2000]:
        return "职工医保"
    if "为规范城乡居民医疗保障关系" in text[:2000]:
        return "居民医保"
    return None


def build_regime_index(text):
    """把文件切成"制度域"，每个域有独立的条款编号空间

    返回 [{
      regime: "职工医保" | "居民医保" | None,
      chapters: [{part_no, part_name, start, end}],
      clause_count: N
    }]
    """
    flat = re.sub(r"[ \t　]+", "", text)
    parts = split_parts(text)
    if not parts:
        return []

    # 每个 part 继承其之前最近的 regime 标记
    regimes = []
    for p in parts:
        seg = flat[p["start"]:p["start"] + 300]
        r = detect_regime(seg)
        regimes.append(r)

    # 向前填充：第一章若未识别，用后续最近的识别结果回填
    cur = None
    filled = []
    for p, r in zip(parts, regimes):
        if r:
            cur = r
        filled.append(cur)
    for i in range(len(filled) - 2, -1, -1):
        if filled[i] is None and filled[i + 1]:
            filled[i] = filled[i + 1]

    # 合并同 regime 的连续 part
    domains = []
    for p, r in zip(parts, filled):
        if domains and domains[-1]["regime"] == r:
            domains[-1]["parts"].append(p)
            domains[-1]["end"] = p["end"]
        else:
            domains.append({"regime": r, "parts": [p], "start": p["start"], "end": p["end"]})

    for d in domains:
        seg = flat[d["start"]:d["end"]]
        d["clause_count"] = len(re.findall(rf"第[{CN_NUM}]+条", seg))
        d["text"] = seg
    return domains


def find_clause(domains, regime, clause_no, topic_hint=None):
    """在指定制度域内定位条款原文

    返回 quote 字符串或 None。绝不跨域取。
    """
    for d in domains:
        if regime and d["regime"] != regime:
            continue
        seg = d["text"]
        # 条款号后面到下一个条款号之前的全部内容
        pat = rf"({clause_no})(.*?)(?=第[{CN_NUM}]+条|第[{CN_NUM}]+章|$)"
        m = re.search(pat, seg, re.S)
        if not m:
            continue
        body = m.group(0)
        # 去掉可能带进来的下一条款前缀
        body = re.sub(rf"第[{CN_NUM}]+条.{0,30}$", "", body)
        body = body.strip()
        if topic_hint and topic_hint not in body:
            continue
        return body
    return None


def clause_ref(regime, clause_no):
    """带域标识的条款引用（解决撞车）"""
    return f"{clause_no}@{regime}" if regime else clause_no


if __name__ == "__main__":
    import json
    import os
    import sys

    ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    SNAP = os.path.join(ROOT, "snapshots")

    path = sys.argv[1] if len(sys.argv) > 1 else os.path.join(SNAP, "xm-yb-2022-12.txt")
    text = open(path, encoding="utf-8", errors="ignore").read()
    doms = build_regime_index(text)
    print(f"=== {os.path.basename(path)} 制度域切分 ===")
    for d in doms:
        names = " | ".join(p["part_name"] for p in d["parts"][:3])
        print(f"  域: {d['regime']}  条款数={d['clause_count']}  章: {names} ...")
    for regime, cn, hint in [("职工医保", "第六条", "缴费基数"),
                             ("居民医保", "第六条", "财政"),
                             ("居民医保", "第九条", "集中参保缴费期"),
                             ("居民医保", "第四十八条", "中断")]:
        q = find_clause(doms, regime, cn, hint)
        print(f"\n[{clause_ref(regime, cn)}] {hint or ''}")
        print("  ", (q[:180] if q else "NOT FOUND"))
