#!/usr/bin/env python3
"""名称改造一键执行（含禁词预修 + 外链图标 SVG 化）

问题背景：apply_naming.py 只做规范替换，但：
1. 禁词在部分位置是动态拼接，替换不到 → 需要预修
2. 规范落地后外链箭头要变 SVG（字符当图标违反 P0-1）
3. 重复执行会二次替换污染页面 → 必须从干净基线出发

本脚本是幂等入口：每次都从基线快照重建，再按顺序执行所有步骤。
基线：policy_db/../web/.index.baseline.html（由 --init-baseline 生成）
"""
import os
import re
import shutil
import subprocess
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
WEB = os.path.join(ROOT, "web")
HTML = os.path.join(WEB, "index.html")
BASELINE = os.path.join(WEB, ".index.baseline.html")
PY = "/Users/dafa/.workbuddy/binaries/python/envs/default/bin/python"

# 禁词预修：规范替换覆盖不到的动态拼接位置
BANNED_FIXES = [
    ('下方比较仅列出两套制度的关键差异，最终请以核验页结论为准。',
     '本表仅列出两套方案的关键差异，最终以「政策查证」页的判定为准。'),
    ("'<option>引用依据与结论不符</option><option>引用的文件已失效</option>'",
     "'<option>引用依据与判定不符</option><option>引用的文件已失效</option>'"),
    ("'<option>打开原文链接打不开</option><option>结论表述误导</option>'",
     "'<option>打开原文链接打不开</option><option>判定表述误导</option>'"),
    ("' 项因条件未知暂不能出结论，已在下方标出需补充的条件。</div>':",
     "' 项因条件未知暂不能出判定，已在下方标出需补充的条件。</div>':"),
    ('"每条结论的引用均可点开原文核对。<br>共 "',
     '"每条判定的引用均可点开原文核对。<br>共 "'),
    ('<h3>这条结论有问题？</h3>', '<h3>这条判定有问题？</h3>'),
]

ICON_EXTERNAL = (
    '<svg class="ico" viewBox="0 0 16 16" aria-hidden="true">'
    '<path d="M6.5 3.5H3.5v9h9v-3" fill="none" stroke="currentColor" '
    'stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>'
    '<path d="M9.5 3.5h3v3" fill="none" stroke="currentColor" '
    'stroke-width="1.5" stroke-linecap="round"/>'
    '<path d="M12.5 3.5 7 9" fill="none" stroke="currentColor" '
    'stroke-width="1.5" stroke-linecap="round"/></svg>'
)


def run(cmd):
    r = subprocess.run(cmd, cwd=ROOT, capture_output=True, text=True)
    return r.stdout + r.stderr


def main():
    if "--init-baseline" in sys.argv:
        shutil.copy(HTML, BASELINE)
        print(f"基线已记录 → {BASELINE}")
        return 0

    # ── 基线策略：增量应用，不覆盖 ──
    # 曾经的实现是 shutil.copy(BASELINE, HTML) 从基线整体重建，
    # 那会把其他人（如前端工程师）的改动整体回退，且无 git 可回滚。
    # 现在改为：直接在当前文件上做增量替换。
    # 文本替换天然幂等 —— 原文改掉后第二次执行就找不到，不会重复替换。
    if not os.path.exists(BASELINE):
        print("（无基线快照，仅作对照用，不影响增量应用）")
    print("① 增量应用模式（不覆盖现有改动）")

    # 2) 禁词预修（幂等：改过的原文不再出现，自然跳过）
    s = open(HTML, encoding="utf-8").read()
    n = 0
    for a, b in BANNED_FIXES:
        if a in s:
            s = s.replace(a, b)
            n += 1
    open(HTML, "w", encoding="utf-8").write(s)
    print(f"② 禁词预修 {n}/{len(BANNED_FIXES)} 处"
          + ("（已全部应用过）" if n == 0 else ""))

    # 3) 应用命名规范
    out = run([PY, os.path.join(ROOT, "pipeline", "apply_naming.py")])
    for line in out.splitlines():
        if any(k in line for k in ("替换对", "禁词检查", "通过", "发现")):
            print("   ", line.strip())
    m = re.search(r"替换对 (\d+) 条 → 实际应用 (\d+) 条", out)
    if m:
        print(f"③ 命名规范已应用 {m.group(2)}/{m.group(1)} 条")

    # 4) 外链箭头 → SVG
    s = open(HTML, encoding="utf-8").read()
    if "ICON.external" not in s:
        s = s.replace(
            "  check: '<svg class=\"ico\" viewBox=\"0 0 16 16\" aria-hidden=\"true\">"
            "<path d=\"M3 8.4 6.4 11.8 13 4.8\" fill=\"none\" stroke=\"currentColor\" "
            "stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg>',\n};",
            "  check: '<svg class=\"ico\" viewBox=\"0 0 16 16\" aria-hidden=\"true\">"
            "<path d=\"M3 8.4 6.4 11.8 13 4.8\" fill=\"none\" stroke=\"currentColor\" "
            "stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg>',\n"
            f"  external: '{ICON_EXTERNAL}',\n}};")
    cnt = s.count("↗")
    if cnt:
        # 在拼接层替换：'...↗</a>'  →  '...</a>'+ICON.external
        s = re.sub(r"(\+[^;\n]{0,120}?) ↗</a>", r"\1</a>'+ICON.external+'", s)
        s = s.replace("↗", "")
    open(HTML, "w", encoding="utf-8").write(s)
    print(f"④ 外链图标 SVG 化（清理字符箭头 {cnt} 处）")

    # 5) 页面验收
    r = subprocess.run(
        ["/Users/dafa/.workbuddy/binaries/node/versions/22.22.2-6/bin/node",
         os.path.join(WEB, "acceptance.js")],
        cwd=ROOT, capture_output=True, text=True,
        env=dict(os.environ,
                 NODE_PATH="/Users/dafa/.workbuddy/binaries/node/workspace/node_modules"))
    tail = r.stdout.strip().splitlines()[-3:]
    for l in tail:
        print("   ", l)
    return 0 if r.returncode == 0 else 1


if __name__ == "__main__":
    sys.exit(main())
