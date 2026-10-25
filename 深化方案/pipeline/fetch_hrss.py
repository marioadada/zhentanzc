#!/usr/bin/env python3
"""批量抓取人社局政策库全文（逐份落快照 + SHA256）

对应深化提示词 §5.1 原文可回溯：每个文件独立快照 + 哈希 + 抽取文本。
"""
import hashlib
import json
import os
import re
import subprocess
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SNAP = os.path.join(ROOT, "snapshots")
DB = os.path.join(ROOT, "policy_db")
NODE = "/Users/dafa/.workbuddy/binaries/node/versions/22.22.2-6/bin/node"
NODEMOD = "/Users/dafa/.workbuddy/binaries/node/workspace/node_modules"
UA = ("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36")

JS = r'''
const { chromium } = require('playwright');
const fs = require('fs');
(async () => {
  const [url, outPrefix] = process.argv.slice(2);
  const b = await chromium.launch({headless:true,args:['--no-sandbox']});
  const ctx = await b.newContext({userAgent:'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'});
  const p = await ctx.newPage();
  await p.goto(url,{waitUntil:'networkidle',timeout:40000}).catch(e=>console.error('goto',e.message));
  await p.waitForTimeout(3500);
  const text = await p.evaluate(()=>document.body?document.body.innerText:'');
  fs.writeFileSync(`snapshots/${outPrefix}.txt`, text);
  const html = await p.content();
  fs.writeFileSync(`snapshots/${outPrefix}.html`, html);
  console.log(`chars=${text.length}`);
  await b.close();
})();
'''


def slug_of(url):
    m = re.search(r"t(\d{8})_(\d+)", url)
    return f"hrss-{m.group(1)}" if m else hashlib.md5(url.encode()).hexdigest()[:10]


def main():
    links = json.load(open(os.path.join(SNAP, "xm-hrss-policy.links.json"), encoding="utf-8"))
    js = os.path.join(ROOT, "pipeline", "_tmp_batch.js")
    open(js, "w", encoding="utf-8").write(JS)
    env = dict(os.environ, NODE_PATH=NODEMOD)
    out = []
    for i, l in enumerate(links):
        slug = slug_of(l["url"])
        txt = os.path.join(SNAP, f"{slug}.txt")
        if os.path.exists(txt) and os.path.getsize(txt) > 400:
            chars = len(open(txt, encoding="utf-8", errors="ignore").read())
            status = "cached"
        else:
            r = subprocess.run([NODE, js, l["url"], slug], cwd=ROOT, env=env,
                               capture_output=True, text=True)
            chars = 0
            if os.path.exists(txt):
                chars = len(open(txt, encoding="utf-8", errors="ignore").read())
            status = r.stdout.strip() or "fail"
        title = ""
        if os.path.exists(txt):
            t = open(txt, encoding="utf-8", errors="ignore").read()
            m = re.search(r"(厦府[规〔(]?\d{4}[〕)]?\d*号|厦人社[规]?〔\d{4}〕\d+号|闽人社文〔\d{4}〕\d+号)", t)
            title = (m.group(1) if m else l["title"][:60])
        out.append({"slug": slug, "url": l["url"], "title": l["title"],
                    "doc_number": title, "chars": chars, "status": status})
        print(f"[{chars:>6}] {slug}  {title[:44]}")
    json.dump(out, open(os.path.join(DB, "hrss_policy_index.json"), "w", encoding="utf-8"),
              ensure_ascii=False, indent=2)
    try:
        os.remove(js)
    except OSError:
        pass


if __name__ == "__main__":
    main()
