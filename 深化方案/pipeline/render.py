#!/usr/bin/env python3
"""渲染抓取：处理 JS 渲染的政府站列表页与正文页

用途：
1. 人社局政策法规库列表页 → 抽取全部文件真实 URL（对应 L1 政策库枚举）
2. 清理目录正文 → 抽取"继续有效/废止/失效"清单（L4 失效反查）
3. 厦门税务参数表 → 定位表格图片并 OCR（L3）

用法：
    python3 render.py list <url> <outPrefix>          # 抽链接
    python3 render.py text <url> <outPrefix>          # 抽正文
"""
import json
import os
import re
import subprocess
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SNAP = os.path.join(ROOT, "snapshots")
NODE = "/Users/dafa/.workbuddy/binaries/node/versions/22.22.2-6/bin/node"
NODEMOD = "/Users/dafa/.workbuddy/binaries/node/workspace/node_modules"

JS_LIST = r'''
const { chromium } = require('playwright');
const fs = require('fs');
(async () => {
  const [url, outPrefix] = process.argv.slice(2);
  const b = await chromium.launch({headless:true,args:['--no-sandbox']});
  const ctx = await b.newContext({userAgent:'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'});
  const p = await ctx.newPage();
  await p.goto(url,{waitUntil:'networkidle',timeout:45000}).catch(e=>console.error('goto',e.message));
  await p.waitForTimeout(5000);
  const text = await p.evaluate(()=>document.body?document.body.innerText:'');
  fs.writeFileSync(`snapshots/${outPrefix}.render.txt`, text);
  const links = await p.evaluate(()=>Array.from(document.querySelectorAll('a')).map(a=>[a.innerText.trim(),a.href]));
  const seen=new Set(); const out=[];
  for(const [t,h] of links){ if(!h||seen.has(h))continue; if(/t20\d{6}|202[3-6]\d{4}/.test(h)){ seen.add(h); out.push({title:t,url:h}); } }
  fs.writeFileSync(`snapshots/${outPrefix}.links.json`, JSON.stringify(out,null,2));
  console.log(`text_chars=${text.length} links=${out.length}`);
  await b.close();
})();
'''

JS_TEXT = r'''
const { chromium } = require('playwright');
const fs = require('fs');
(async () => {
  const [url, outPrefix] = process.argv.slice(2);
  const b = await chromium.launch({headless:true,args:['--no-sandbox']});
  const ctx = await b.newContext({userAgent:'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'});
  const p = await ctx.newPage();
  await p.goto(url,{waitUntil:'networkidle',timeout:45000}).catch(e=>console.error('goto',e.message));
  await p.waitForTimeout(4500);
  const text = await p.evaluate(()=>document.body?document.body.innerText:'');
  fs.writeFileSync(`snapshots/${outPrefix}.render.txt`, text);
  console.log(`text_chars=${text.length}`);
  await b.close();
})();
'''


def run_js(script, url, prefix, cwd):
    p = os.path.join(cwd, "pipeline", f"_tmp_{prefix}.js")
    with open(p, "w", encoding="utf-8") as f:
        f.write(script)
    env = dict(os.environ, NODE_PATH=NODEMOD)
    r = subprocess.run([NODE, p, url, prefix], cwd=cwd, env=env,
                       capture_output=True, text=True)
    print(r.stdout.strip() or r.stderr.strip()[:400])
    try:
        os.remove(p)
    except OSError:
        pass


def main():
    mode = sys.argv[1]
    url = sys.argv[2]
    prefix = sys.argv[3]
    cwd = ROOT
    if mode == "list":
        run_js(JS_LIST, url, prefix, cwd)
    elif mode == "text":
        run_js(JS_TEXT, url, prefix, cwd)


if __name__ == "__main__":
    main()
