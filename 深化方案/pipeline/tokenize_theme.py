#!/usr/bin/env python3
"""Vercel Geist Design System 风格的 Token 化改造

对应专家团 P0-3「禁止硬编码颜色」+ 用户要求「参考 vercel design 规范」。

问题：页面里有 49 种硬编码 hex 色值（除 #fff 外全是违规）。
做法：按 Geist 的色板结构重建 CSS 变量，把所有硬编码色替换为 var() 引用。

Geist 色板结构：
  --geist-background   页面底色
  --geist-foreground   主文字
  --geist-secondary    次要文字
  --geist-tertiary     弱化文字
  --geist-border       边框
  --geist-accent       强调色（品牌蓝）
  --geist-success / warning / error   语义色（含浅底与深字两套）
  --geist-scale-*      背景层级（bg-1/2/3）

用法：改完跑 python3 pipeline/build_web.py，页面验收必须保持全绿。
"""
import os
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
HTML = os.path.join(ROOT, "web", "index.html")

# Geist 风格 Token 定义（替换原 :root）
TOKENS = """--geist-bg:#f7f8fb;--geist-bg-1:#fff;--geist-bg-2:#fbfcff;--geist-bg-3:#f5f8ff;
--geist-fg:#172033;--geist-fg-2:#3c4658;--geist-fg-3:#526078;--geist-fg-muted:#657089;--geist-fg-subtle:#7a8498;
--geist-border:#e7ebf2;--geist-border-2:#dfe6f3;--geist-border-3:#d9e0ec;--geist-border-4:#dce4f2;
--geist-accent:#2563eb;--geist-accent-hover:#1d4ed8;--geist-accent-fg:#fff;--geist-accent-soft:#edf2ff;
--geist-accent-ring:#bfd3ff;--geist-accent-soft-2:#f2f6ff;--geist-accent-soft-3:#f7faff;
--geist-accent-line:#8fb2ff;--geist-accent-line-2:#cfe0ff;--geist-accent-line-3:#e3ebf8;--geist-accent-line-4:#d5deee;
--geist-success:#087443;--geist-success-bg:#e8f7ef;--geist-success-dot:#16a34a;
--geist-warning:#a05b00;--geist-warning-bg:#fff3df;--geist-warning-fg:#6b4715;--geist-warning-fg-2:#5a3a10;
--geist-warning-fg-3:#8a6224;--geist-warning-line:#f3ddb4;--geist-warning-line-2:#f7dfb2;
--geist-warning-line-3:#e0b872;--geist-warning-dot:#d97706;--geist-warning-hover:#fff4de;--geist-warning-bg:#fff9ef;--geist-warning-check:#c99a4e;
--geist-error:#a12b36;--geist-error-bg:#fdebed;--geist-error-fg:#8a2029;--geist-error-line:#f3c2c7;
--geist-code-bg:#fcfdff;--geist-code-fg:#2b3547;"""

# 旧 hex → 新 Token 的映射（按语义归类）
MAP = {
    # 页面底色与卡片
    "#f7f8fb": "var(--geist-bg)",
    "#fbfcff": "var(--geist-bg-2)",
    "#f5f8ff": "var(--geist-bg-3)",
    "#f7f9fd": "var(--geist-bg-3)",
    "#f7faff": "var(--geist-accent-soft-3)",
    "#fcfdff": "var(--geist-code-bg)",
    # 文字
    "#172033": "var(--geist-fg)",
    "#3c4658": "var(--geist-fg-2)",
    "#526078": "var(--geist-fg-3)",
    "#657089": "var(--geist-fg-muted)",
    "#7a8498": "var(--geist-fg-subtle)",
    "#2b3547": "var(--geist-code-fg)",
    # 边框
    "#e7ebf2": "var(--geist-border)",
    "#dfe6f3": "var(--geist-border-2)",
    "#d9e0ec": "var(--geist-border-3)",
    "#dce4f2": "var(--geist-border-4)",
    "#d5deee": "var(--geist-accent-line-4)",
    "#e3e9f4": "var(--geist-border-2)",
    "#e3ebf8": "var(--geist-accent-line-3)",
    # 强调色
    "#2563eb": "var(--geist-accent)",
    "#1d4ed8": "var(--geist-accent-hover)",
    "#edf2ff": "var(--geist-accent-soft)",
    "#bfd3ff": "var(--geist-accent-ring)",
    "#f2f6ff": "var(--geist-accent-soft-2)",
    "#8fb2ff": "var(--geist-accent-line)",
    "#cfe0ff": "var(--geist-accent-line-2)",
    # 成功
    "#087443": "var(--geist-success)",
    "#e8f7ef": "var(--geist-success-bg)",
    "#16a34a": "var(--geist-success-dot)",
    # 警告
    "#a05b00": "var(--geist-warning)",
    "#fff3df": "var(--geist-warning-bg)",
    "#6b4715": "var(--geist-warning-fg)",
    "#5a3a10": "var(--geist-warning-fg-2)",
    "#8a6224": "var(--geist-warning-fg-3)",
    "#f3ddb4": "var(--geist-warning-line)",
    "#f7dfb2": "var(--geist-warning-line-2)",
    "#e0b872": "var(--geist-warning-line-3)",
    "#d97706": "var(--geist-warning-dot)",
    "#fff4de": "var(--geist-warning-hover)",
    # 错误
    "#a12b36": "var(--geist-error)",
    "#fdebed": "var(--geist-error-bg)",
    "#8a2029": "var(--geist-error-fg)",
    "#f3c2c7": "var(--geist-error-line)",
    # 强调色文字
    "#31517f": "var(--geist-fg-2)",
    "#f0dcb4": "var(--geist-warning-line)",
    "#e0a94e": "var(--geist-warning-line-3)",
    "#fff9ef": "var(--geist-warning-bg)",
    "#c99a4e": "var(--geist-warning-check)",
}


def main():
    s = open(HTML, encoding="utf-8").read()
    orig = s

    # 1) 替换 :root 变量块
    root_old = re.search(r":root\{[^}]*\}", s)
    if root_old:
        s = s[:root_old.start()] + ":root{" + TOKENS + "}" + s[root_old.end():]

    # 2) 替换硬编码 hex（跳过 :root 内已 Token 化的）
    body = s
    replaced = 0
    for hexv, token in MAP.items():
        # 排除已在 var() 里的（不会重复，因为 hex 已被替换成 var）
        pat = re.compile(re.escape(hexv) + r"(?![0-9a-fA-F])", re.IGNORECASE)
        body, n = pat.subn(token, body)
        replaced += n

    # 3) 剩下的 hex（除 #fff/#000 白名单）报出来
    rest = re.findall(r"#[0-9a-fA-F]{3,6}\b", body)
    rest = [h for h in rest if h.lower() not in ("#fff", "#000")]

    s = body
    open(HTML, "w", encoding="utf-8").write(s)

    print(f"替换硬编码色值 {replaced} 处")
    print(f"Token 定义 {len(re.findall(r'--geist-[a-z0-9-]+', TOKENS))} 个")
    if rest:
        from collections import Counter
        print(f"剩余未 Token 化: {dict(Counter(h.lower() for h in rest))}")
    else:
        print("剩余未 Token 化: 无（#fff/#000 为白名单）")

    # 4) 渐变检查 —— P0-2 禁止紫粉渐变，这里只有一个蓝白竖向渐变（用于计算卡背景）
    grads = re.findall(r"linear-gradient\([^)]*\)", s)
    bad = [g for g in grads if re.search(r"7C3AED|A855F7|EC4899|6366F1|4F46E5", g, re.I)]
    print(f"渐变 {len(grads)} 处，紫粉违规 {len(bad)} 处")
    for g in grads:
        print(f"   {g}")


if __name__ == "__main__":
    main()
