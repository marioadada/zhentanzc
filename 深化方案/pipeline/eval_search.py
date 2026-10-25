#!/usr/bin/env python3
"""检索质量评测：BM25 索引是否真的可用

对应深化提示词 §5.4 可证伪性 —— 检索必须能被量化验收，不能"看起来能搜"。

评测维度：
  1. 召回率：真实问题集里，有多少能命中相关条款
  2. 排序质量：Top-1 命中是否正确主题
  3. 覆盖盲区：哪些主题搜不到
  4. 制度域归类准确率
"""
import json
import os
import re
import sys
from collections import Counter

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DB = os.path.join(ROOT, "policy_db")
WEB = os.path.join(ROOT, "web")

# 真实问题集：模拟评委与用户会怎么问
# 每条标注期望命中的主题关键词（用于判定 Top-N 是否相关）
TEST_SET = [
    # 灵活就业参保资格
    ("灵活就业人员怎么参加职工医保", ["灵活就业", "个人身份参加职工医保"]),
    ("我在厦门没有户口能参保吗", ["户籍", "居住证"]),
    ("外地户籍没居住证能参保吗", ["户籍", "居住证", "灵活就业"]),
    ("非全日制从业人员能参保吗", ["非全日制", "灵活就业"]),
    ("新就业形态劳动者能参加职工医保吗", ["新就业形态", "灵活就业"]),
    # 缴费
    ("灵活就业医保每月要交多少钱", ["缴费基数", "缴费率", "灵活就业"]),
    ("厦门社保缴费基数是多少", ["缴费基数", "省平均工资"]),
    ("养老保险要交多少钱", ["缴费基数", "缴费比例", "养老保险"]),
    ("失业保险个人交多少", ["缴费", "失业保险"]),
    # 待遇
    ("生育津贴能领多少钱", ["生育保险", "生育津贴"]),
    ("灵活就业人员能参加生育保险吗", ["生育保险", "灵活就业"]),
    ("失业金能领多少钱领多久", ["失业保险金", "最低工资"]),
    ("退休了养老金怎么算", ["基本养老金", "缴费年限"]),
    ("达到法定退休年龄能领养老金吗", ["退休", "基本养老金"]),
    # 断缴
    ("社保断缴后待遇会怎么变", ["连续参保", "中断缴费"]),
    ("断了多久能补缴", ["补缴", "中断缴费"]),
    ("断保后重新参保要等多久", ["等待期", "重新参保"]),
    ("大病保险报销比例是多少", ["大病保险", "支付"]),
    # 转移接续
    ("异地医保转入厦门", ["转移接续", "跨统筹地区"]),
    ("社保转移回厦门怎么算年限", ["转移接续", "缴费年限"]),
    ("外地的养老年限能累积吗", ["转移接续", "缴费年限", "视同缴费"]),
    # 居民医保
    ("居民医保一年交多少钱", ["居民", "个人缴费", "筹资标准"]),
    ("居民医保什么时候交", ["集中参保缴费期", "预缴制"]),
    ("居民医保能门诊报销吗", ["门诊", "统筹基金"]),
    ("居民医保和大病保险怎么报", ["大病保险", "商业保险"]),
    # 长护险
    ("长护险是什么", ["长期护理保险", "长护险"]),
    ("长护险费率是多少", ["长护险费率", "0.3", "0.15"]),
    ("长护险待遇怎么享受", ["重度失能", "失能等级评估"]),
    # 办事
    ("失业保险金怎么领", ["失业保险金", "申领"]),
    ("参保登记要带什么材料", ["申请表", "身份证"]),
    ("社保卡怎么申领", ["社会保障卡"]),
    # 其他
    ("厦门最低工资多少钱", ["最低工资"]),
    ("异地医保备案怎么办", ["异地就医", "备案"]),
    ("灵活就业人员退休条件是什么", ["退休", "累计缴费"]),
]


sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from build_search_index import DOMAIN_LEXICON


def tokenize(text):
    t = re.sub(r"[^\u4e00-\u9fffA-Za-z0-9%．.．\s]", " ", text)
    toks = []
    for seg in t.split():
        if not seg:
            continue
        for w in DOMAIN_LEXICON:
            if w in seg:
                toks.append(w)
        for ch in seg:
            if re.match(r"[\u4e00-\u9fff]", ch):
                toks.append(ch)
        for i in range(len(seg) - 1):
            bg = seg[i:i + 2]
            if len(bg) == 2 and not re.match(r"[0-9%．.]", bg[0]) and not re.match(r"[0-9%．.]", bg[1]):
                toks.append(bg)
        if re.match(r"^[A-Za-z0-9.]+$", seg) and len(seg) > 1:
            toks.append(seg.lower())
    return toks


def bm25(query, index, k1=1.4, b=0.72):
    """BM25 检索

    关键修正：**高频词必须降权**。
    「厦门」出现在 97% 的条款里、「医」出现在 82% 里 —— 它们的 IDF 虽低，
    但只要有任意 token 命中就产生分数，于是短查询会把全部 249 条都拉进得分范围，
    排序彻底失效（实测「异地医保转入厦门」249/249 全得分，「今天天气怎么样」也能命中）。
    修法：df 超过半数的高频词权重压到 0.15，并且只保留达到阈值的文档。
    """
    N = index["N"]
    avg = index["avg_len"] or 1
    high_df = set(index.get("high_df") or [])
    scores = Counter()
    toks = set(tokenize(query))
    for t in toks:
        post = index["postings"].get(t)
        if not post:
            continue
        df = index["df"].get(t, len(post))
        idf = __import__("math").log(1 + (N - df + 0.5) / (df + 0.5))
        # 高频词降权：几乎出现在所有文档里的词不携带区分信息
        w = 0.15 if t in high_df else 1.0
        for i in post:
            dl = index["doc_len"].get(str(i), avg)
            denom = 1 + k1 * (1 - b + b * dl / avg)
            scores[i] += idf * (w * (k1 + 1)) / denom
    # 关键词加权
    for i, hits in index["kw_hits"].items():
        i = int(i)
        if i not in scores:
            continue
        for k in hits:
            if k in query:
                scores[i] += 3.0
    # 得分阈值：低于最高分 30% 的文档直接剔除，避免弱匹配混进结果
    # 12% 太松 —— 实测「今天天气怎么样」仍能命中 5 条；
    # 30% 后完全不相关的查询会归零，从而正确触发"未匹配 + 建议词"分支
    if scores:
        top = max(scores.values())
        cutoff = top * 0.30
        scores = Counter({k: v for k, v in scores.items() if v >= cutoff})
    return scores


def main():
    idx = json.load(open(os.path.join(DB, "clause_index.json"), encoding="utf-8"))
    docs = idx["clauses"]

    print(f"索引：{idx['N']} 条条款 / {len(idx['postings'])} 个词项\n")

    top1_hit = 0
    top3_hit = 0
    miss = []
    weak = []

    for q, expect in TEST_SET:
        scores = bm25(q, idx)
        ranked = [i for i, _ in scores.most_common(10)]
        got = [docs[i]["text"] for i in ranked[:3]]
        blob3 = " ".join(got)
        # Top-3 是否包含期望关键词
        hit3 = any(all(k in blob3 for k in [e]) or e in blob3 for e in expect)
        # Top-1 是否相关
        hit1 = any(e in got[0] if got else False for e in expect)
        if hit3:
            top3_hit += 1
        else:
            miss.append((q, expect, got[:1]))
        if hit1:
            top1_hit += 1
        else:
            weak.append((q, got[0][:70] if got else "(无)"))

    n = len(TEST_SET)
    print(f"Top-3 召回率：{top3_hit}/{n} = {top3_hit*100//n}%")
    print(f"Top-1 精确率：{top1_hit}/{n} = {top1_hit*100//n}%")

    if miss:
        print(f"\n=== 未召回（{len(miss)} 条）===")
        for q, e, g in miss:
            print(f"  ✗ {q}")
            print(f"     期望关键词 {e}，实际首条：{g[:80]}")
    if weak:
        print(f"\n=== Top-1 不够准（{len(weak)} 条，靠 Top-3 兜住）===")
        for q, g in weak[:8]:
            print(f"  ~ {q} → {g}")

    # 制度域分布
    print("\n=== 制度域分布 ===")
    dom = Counter(c["regime"] for c in docs)
    other = dom.get("L1", 0) + dom.get("其他", 0)
    for k, v in dom.most_common():
        print(f"  {k:12} {v:4}  {v*100//len(docs)}%")
    print(f"  未识别合计 {other} = {other*100//len(docs)}%")

    ok = top3_hit >= n * 0.9
    print("\n" + "=" * 52)
    print(f"检索验收：{'通过' if ok else '未通过'}（Top-3 召回门槛 90%）")
    print("=" * 52)
    return 0 if ok else 1


if __name__ == "__main__":
    sys.exit(main())
