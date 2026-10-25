#!/usr/bin/env python3
"""网页端一键构建：数据包 + 页面验收 + 截图

对应深化提示词 §8 验收标准：每次数据更新后，页面必须重新验一遍。

用法：
    python3 pipeline/build_web.py            # 构建数据包 + 跑验收 + 出截图
    python3 pipeline/build_web.py --no-shots # 只构建 + 验收
"""
import json
import os
import subprocess
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PIPE = os.path.join(ROOT, "pipeline")
WEB = os.path.join(ROOT, "web")
NODE = "/Users/dafa/.workbuddy/binaries/node/versions/22.22.2-6/bin/node"
NODEMOD = "/Users/dafa/.workbuddy/binaries/node/workspace/node_modules"
PY = "/Users/dafa/.workbuddy/binaries/python/envs/default/bin/python"


def run(cmd, cwd=ROOT, env=None):
    return subprocess.run(cmd, cwd=cwd, env=env, capture_output=True, text=True)


def main():
    no_shots = "--no-shots" in sys.argv

    print("=== 1/4 构建检索索引 ===")
    r = run([PY, os.path.join(PIPE, "build_search_index.py")])
    print(r.stdout.strip() or r.stderr.strip()[-400:])
    if r.returncode != 0:
        return 1

    print("\n=== 2/4 生成数据包 ===")
    r = run([PY, os.path.join(PIPE, "build_page_data.py")])
    print(r.stdout.strip() or r.stderr.strip()[-400:])
    if r.returncode != 0:
        return 1

    print("\n=== 3/4 页面验收 ===")
    env = dict(os.environ, NODE_PATH=NODEMOD)
    r = run([NODE, os.path.join(WEB, "acceptance.js")], env=env)
    out = r.stdout.strip()
    print(out[-2600:] if out else r.stderr.strip()[-1200:])
    page_ok = r.returncode == 0

    if not no_shots:
        print("\n=== 4/4 生成截图 ===")
        r2 = run([NODE, os.path.join(WEB, "shoot.js")], env=env)
        print(r2.stdout.strip()[-600:] or r2.stderr.strip()[-400:])

    print("\n" + "=" * 52)
    if page_ok:
        print("网页构建通过：数据包已更新，页面验收全绿")
    else:
        print("网页验收未通过 —— 拒绝发布")
    print("=" * 52)
    return 0 if page_ok else 1


if __name__ == "__main__":
    sys.exit(main())
