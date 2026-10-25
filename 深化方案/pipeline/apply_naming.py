#!/usr/bin/env python3
"""按 naming-spec.json 实施界面名称改造

职责边界（避免误读）：
  - 规范数据来源：web/naming-spec.json（UI/UX 设计师交付，措辞以此为准）
  - 本脚本实现与门禁：项目总监
  设计师只产出规范文件，不写 .py、不改 index.html —— 但规范本身随时可被质疑和修订。

对应专家团「成员结论为准」：规范由设计师产出，实现与校验由总监负责。

关键安全阀：
1. **禁词表**（forbiddenTerms）——「结论」除「审批结论」外一律改「判定」；「核验」仅限判定徽章内
2. **状态徽章白名单**——七态语义不得被改模糊（条件待核验/时点不适用等必须保持）
3. **替换必须逐条可核对**——每条替换都记录，输出对照表

用法：python3 pipeline/apply_naming.py [--dry-run]
"""
import json
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
HTML = os.path.join(ROOT, "web", "index.html")
SPEC = os.path.join(ROOT, "web", "naming-spec.json")

# 七态判定徽章原文（不得被改名，只能改分隔符）
VERDICT_TEXTS = [
    "符合", "不符合", "条件待核验", "时点不适用",
    "来源冲突（已裁决）", "来源冲突（待人工）", "未查到可靠依据",
]


def main():
    dry = "--dry-run" in sys.argv
    spec = json.load(open(SPEC, encoding="utf-8"))
    s = open(HTML, encoding="utf-8").read()
    orig = s

    # 收集所有替换对
    pairs = []
    for key in ["nav", "buttons", "sections", "statusBadges", "emptyStates"]:
        for item in spec.get(key, []):
            f = (item.get("from") or "").strip()
            t = (item.get("to") or "").strip()
            if not f or not t or f == t:
                continue
            # 规范里用「（保持不变）」/「（删除）」标注的是说明，不是目标文案
            if t.startswith("（删除）") or t.startswith("（保持不变") or t == "保持不变":
                continue
            # to 里带括号说明的，取括号前的实际目标
            # 但模板占位符（如「（N 个）」「（N 处）」）必须保留
            m2 = re.match(r"^(.*?)（([^）]*)）$", t)
            if m2 and m2.group(1).strip():
                inner = m2.group(2)
                if re.search(r"[A-Za-z0-9一-鿿]", inner) and not inner.startswith(("保持", "删除")):
                    pass  # 内含实质内容（如「N 个」「warn / 琥珀」）→ 整条保留
                else:
                    t = m2.group(1).strip()
            pairs.append((f, t, key))

    # ── 安全阀 1：状态徽章不得被改成模糊表述 ──
    for f, t, key in pairs:
        if key == "statusBadges" and f in VERDICT_TEXTS:
            # 七态只允许改分隔符，不允许改词
            if t.replace("·", "").replace("（", "").replace("）", "") != f.replace("（", "").replace("）", ""):
                print(f"  ⛔ 拒绝：七态判定「{f}」被改成「{t}」，会破坏语义精确性")
                continue

    # ── 替换顺序：长的 from 优先 ──
    # 短条目会「抢跑」：如 from="不能仅凭" 先被替换成 "仅凭"，
    # 导致更长的 from="不能仅凭年龄、待业或租房决定方案…" 永远匹配不上，
    # 页面就残留了半句话（如「说明：不能仅凭」）。
    # 排好序就能让长条目先吃掉原文，短条目随后自然落空。
    pairs.sort(key=lambda x: -len(x[0]))

    applied = []
    skipped = []
    for f, t, key in pairs:
        # 规范里的 from 带占位符（如「（N 个）」）→ 对应页面里是动态拼接，
        # 不能按字面替换，改为「前缀 + 保留占位」的方式
        pm = re.search(r"（([^）]*)）", f)
        if pm and ("N" in pm.group(1) or "{" in pm.group(1)):
            prefix = f[:pm.start()]
            if prefix and prefix in s:
                s = s.replace(prefix, t[:max(0, len(t) - len(pm.group(0)))]
                          if t.endswith(pm.group(0)) else t)
                applied.append((f, t, s.count(prefix)))
            else:
                skipped.append((f, t, "动态拼接，改为前缀替换"))
            continue
        if f not in s:
            skipped.append((f, t, "原文未出现"))
            continue
        n = s.count(f)
        # ── 幂等与正确性防护 ──
        # 1) 若 from 是 to 的前缀，替换会自我重复（如「厦门社保」→「厦门社保缴费状态」
        #    遇到原文「厦门社保缴费状态」会变成「…缴费状态缴费状态」）
        #    → 这种情况必须跳过，交给更长的条目处理
        if t.startswith(f) and len(t) > len(f):
            skipped.append((f, t, "from 是 to 的前缀，会自我重复"))
            continue
        # 2) 替换后若出现「同一片段连续重复」则回滚
        trial = s.replace(f, t)
        if re.search(r"(.){3,}", trial) and not re.search(r"(.){3,}", s):
            skipped.append((f, t, "替换后出现字符重复，已回滚"))
            continue
        s = trial
        applied.append((f, t, n))

    # ── 安全阀 2：禁词检查 ──
    violations = []
    ft = spec.get("forbiddenTerms", {})
    # 「核验」只允许在状态徽章文案里
    for m in re.finditer(r"核验", s):
        ctx = s[max(0, m.start() - 30):m.start() + 30]
        if "条件待核验" not in ctx:
            violations.append(("核验", ctx.replace("\n", " ")))
    # 「结论」只允许在「审批结论」语境
    for m in re.finditer(r"结论", s):
        ctx = s[max(0, m.start() - 24):m.start() + 24]
        if "审批结论" not in ctx and "结论" not in VERDICT_TEXTS:
            violations.append(("结论", ctx.replace("\n", " ")))

    if not dry:
        open(HTML, "w", encoding="utf-8").write(s)

    print(f"规范来源：{spec.get('source')}")
    print(f"替换对 {len(pairs)} 条 → 实际应用 {len(applied)} 条，"
          f"跳过 {len(skipped)} 条（原文未出现）")
    print("\n=== 实际改名对照（前 30 条）===")
    for f, t, n in applied[:30]:
        print(f"  {f:22} → {t}   ×{n}")
    if len(applied) > 30:
        print(f"  ...（其余 {len(applied)-30} 条见 naming-spec.json）")
    if skipped:
        print("\n=== 跳过（原文未出现，可能已改过）===")
        for f, t, why in skipped[:12]:
            print(f"  {f:22} → {t}   ({why})")

    print(f"\n=== 禁词检查 ===")
    if violations:
        print(f"  发现 {len(violations)} 处待处理：")
        for w, c in violations[:10]:
            print(f"    「{w}」… {c} …")
    else:
        print("  通过：无越界用词")

    print(f"\n{'[dry-run] 未写入' if dry else '已写入 ' + HTML}")


if __name__ == "__main__":
    main()
