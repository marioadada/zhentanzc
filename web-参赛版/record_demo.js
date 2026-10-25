// 三分钟参赛演示录屏：驱动 web-参赛版/index.html，分场景带字幕卡，结尾 ffmpeg 转 mp4 + 抽帧自检
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');

const OUT = path.resolve(__dirname, 'video');
fs.mkdirSync(OUT, { recursive: true });
const HTML = path.resolve(__dirname, 'index.html');
const wait = (p, ms) => p.waitForTimeout(ms);

(async () => {
  const b = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
  const ctx = await b.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
    recordVideo: { dir: OUT, size: { width: 1440, height: 900 } },
  });
  const p = await ctx.newPage();

  await p.addInitScript(() => {
    window.__cap = (t) => {
      let el = document.getElementById('__cap');
      if (!el) {
        el = document.createElement('div');
        el.id = '__cap';
        el.style.cssText = 'position:fixed;left:24px;bottom:24px;z-index:99999;'
          + 'background:rgba(10,102,255,.94);color:#fff;padding:12px 18px;border-radius:12px;'
          + 'font:600 20px/1.45 -apple-system,Segoe UI,Roboto,"PingFang SC","Microsoft YaHei",sans-serif;'
          + 'box-shadow:0 10px 34px rgba(0,0,0,.28);max-width:78vw;letter-spacing:.5px';
        document.body.appendChild(el);
      }
      el.textContent = t || '';
      el.style.display = t ? 'block' : 'none';
    };
  });

  const cap = (t) => p.evaluate((x) => window.__cap(x), t);
  async function ask(q, ms = 6000) {
    await p.fill('#q', '');
    await p.click('#q');
    await p.type('#q', q, { delay: 38 });
    await p.click('#go');
    await wait(p, ms);
  }
  const sel = async (n, l) => {
    try { await p.selectOption(`#profileForm select[name=${n}]`, { label: l }); } catch (e) {}
    await wait(p, 500);
  };

  await p.goto('file://' + HTML);
  await wait(p, 1500);

  // 片头
  await cap('厦门民生政策侦探 · 3 分钟演示');
  await wait(p, 5000);

  // ① 一个真实的问题
  await cap('① 一个真实的问题：外地户口在厦门，没单位，能自己交医保吗？');
  await ask('外地户口在厦门，没单位，能自己交医保吗？', 8000);
  await wait(p, 7000);

  // ② 不是给链接，是给判定 + 依据原文
  await cap('② 它不是给你一堆链接，而是「判定」+「依据原文」（文号 / 条款 / 原文全句）');
  const cite = await p.$('.cite-head');
  if (cite) { await cite.click(); await wait(p, 6000); }
  await p.evaluate(() => window.scrollTo(0, 650)); await wait(p, 13000);

  // ③ 时点分层
  await cap('③ 同一个问题，换个日期，答案会变');
  await ask('灵活就业人员能参加生育保险吗？', 7000);
  await wait(p, 3000);
  await p.fill('#asOf', '2026-02-28');
  await p.dispatchEvent('#asOf', 'change');
  await wait(p, 9000);
  await cap('③ 切到 2026-02-28 → 不符合（彼时灵活就业不参加生育保险）');
  await p.evaluate(() => window.scrollTo(0, 400)); await wait(p, 13000);

  // ④ 个人画像
  await cap('④ 填一份画像，结论按「你的情况」生成');
  await p.click('.nav button[data-tab=profileTab]'); await wait(p, 3000);
  await p.click('#detailProfile'); await wait(p, 2000);
  await sel('age_band', '25—34');
  await sel('employment', '待业/失业');
  await sel('edu', '本科');
  await sel('residence', '外地户籍，在厦租房');
  await sel('goal', '社保医保');
  await p.click('#profileForm button[type=submit]'); await wait(p, 11000);

  // ⑤ 计算器：算清楚每月交多少
  await cap('⑤ 算清楚：每月交多少、断缴要等多久');
  await p.click('.nav button[data-tab=questionTab]'); await wait(p, 2000);
  await ask('灵活就业医保每月要交多少钱？', 7000);
  const r = await p.$('#baseRange');
  if (r) { await r.evaluate(el => { el.value = 8000; el.dispatchEvent(new Event('input')); }); await wait(p, 2000); }
  await wait(p, 11000);

  // ⑥ 同步 / 失效文件拦截
  await cap('⑥ 数据不过期：失效文件自动拦截，结论永远指向有效原文');
  await p.click('#openLog'); await wait(p, 14000);

  // ⑦ 收尾
  await cap('政策侦探 · 让每一条结论都查得到原文。从一个城市，到一座桥。');
  await p.evaluate(() => window.scrollTo(0, 0)); await wait(p, 8000);

  await cap('');
  await ctx.close();
  await b.close();

  // 找 webm 并转 mp4
  const files = fs.readdirSync(OUT).filter(f => f.endsWith('.webm'));
  if (files.length) {
    const src = path.join(OUT, files[0]);
    const dst = path.join(OUT, 'demo-3min.mp4');
    try {
      execSync(`ffmpeg -y -i "${src}" -c:v libx264 -pix_fmt yuv420p -movflags +faststart "${dst}"`, { stdio: 'inherit' });
      // 抽 3 帧自检字幕/内容
      execSync(`ffmpeg -y -i "${dst}" -frames:v 1 -ss 00:00:06 ${path.join(OUT,'check-01.png')}`, { stdio: 'ignore' });
      execSync(`ffmpeg -y -i "${dst}" -frames:v 1 -ss 00:00:45 ${path.join(OUT,'check-02.png')}`, { stdio: 'ignore' });
      execSync(`ffmpeg -y -i "${dst}" -frames:v 1 -ss 00:01:30 ${path.join(OUT,'check-03.png')}`, { stdio: 'ignore' });
      fs.unlinkSync(src);
      console.log('MP4 ->', dst);
    } catch (e) {
      console.log('ffmpeg 失败，保留 webm:', src, e.message);
    }
  } else {
    console.log('未找到 webm 输出');
  }
  console.log('video dir ->', OUT);
})();
