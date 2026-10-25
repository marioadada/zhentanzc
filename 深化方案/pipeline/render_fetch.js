// 抓取动态渲染页面：监听 XHR/fetch 响应，落盘所有正文候选
// 用法: node render_fetch.js <url> <outPrefix> [waitMs]
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

(async () => {
  const [url, outPrefix, waitMsArg] = process.argv.slice(2);
  const waitMs = parseInt(waitMsArg || '12000', 10);
  const outDir = path.resolve(__dirname, '..', 'snapshots');
  fs.mkdirSync(outDir, { recursive: true });

  const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
  const ctx = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    viewport: { width: 1440, height: 2400 },
  });
  const page = await ctx.newPage();

  const hits = [];
  page.on('response', async (res) => {
    try {
      const u = res.url();
      const ct = (res.headers()['content-type'] || '');
      if (!/json|text|html/.test(ct)) return;
      const len = parseInt(res.headers()['content-length'] || '0', 10);
      if (len > 4_000_000) return;
      const body = await res.text().catch(() => '');
      if (!body || body.length < 200) return;
      const cjk = (body.match(/[\u4e00-\u9fff]/g) || []).length;
      if (cjk / body.length < 0.05) return;
      hits.push({ url: u, ct, len: body.length, cjk: (cjk / body.length).toFixed(3), body });
    } catch (e) { /* ignore */ }
  });

  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
  } catch (e) {
    console.error('goto:', e.message);
  }
  await page.waitForTimeout(waitMs);

  const html = await page.content();
  fs.writeFileSync(path.join(outDir, `${outPrefix}.rendered.html`), html);
  const text = await page.evaluate(() => document.body ? document.body.innerText : '');
  fs.writeFileSync(path.join(outDir, `${outPrefix}.rendered.txt`), text);

  const idx = [];
  hits.forEach((h, i) => {
    const safe = `xhr_${outPrefix}_${i}`;
    fs.writeFileSync(path.join(outDir, `${safe}.txt`), h.body);
    idx.push({ i, url: h.url, ct: h.ct, len: h.len, cjk: h.cjk, file: `${safe}.txt` });
  });
  fs.writeFileSync(path.join(outDir, `${outPrefix}.xhr_index.json`), JSON.stringify(idx, null, 2));

  console.log(`rendered_text_chars=${text.length}  xhr_candidates=${hits.length}`);
  idx.forEach(x => console.log(`  [${x.cjk}] ${String(x.len).padStart(7)} ${x.url.slice(0, 96)}`));
  await browser.close();
})();
