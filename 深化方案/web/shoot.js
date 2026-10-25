// 页面截图：用于参赛评审材料与视觉检查
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const OUT = path.resolve(__dirname, 'shots');
fs.mkdirSync(OUT, { recursive: true });

(async () => {
  const b = await chromium.launch({ headless: true, args: ['--no-sandbox'] });

  const scenes = [
    {
      name: '01-首屏-问题查证', w: 1440, h: 1000,
      act: async (p) => { await p.click('#chips .chip:nth-child(1)'); await p.waitForTimeout(600); },
    },
    {
      name: '02-时点分界-生育保险', w: 1440, h: 1100,
      act: async (p) => {
        await p.fill('#q', '灵活就业人员能参加生育保险吗？');
        await p.click('#go'); await p.waitForTimeout(600);
      },
    },
    {
      name: '03-计算器-月缴费', w: 1440, h: 1100,
      act: async (p) => {
        await p.fill('#q', '灵活就业医保每月要交多少钱？');
        await p.click('#go'); await p.waitForTimeout(700);
        const r = await p.$('#baseRange');
        if (r) { await r.evaluate(el => { el.value = 6000; el.dispatchEvent(new Event('input')); }); await p.waitForTimeout(300); }
      },
    },
    {
      name: '04-制度对比', w: 1440, h: 1200,
      act: async (p) => { await p.click('.nav button[data-tab=cmpTab]'); await p.waitForTimeout(600); },
    },
    {
      name: '05-画像判定', w: 1440, h: 1200,
      act: async (p) => {
        await p.click('.nav button[data-tab=profileTab]');
        await p.click('#detailProfile'); await p.waitForTimeout(400);
        const sel = async (n, l) => p.selectOption(`#profileForm select[name=${n}]`, { label: l });
        await sel('age_band', '25—34'); await sel('employment', '待业/失业');
        await sel('edu', '本科'); await sel('residence', '外地户籍，在厦租房');
        await sel('goal', '社保医保');
        await p.click('#profileForm button[type=submit]'); await p.waitForTimeout(700);
      },
    },
    {
      name: '06-引用展开', w: 1440, h: 1100,
      act: async (p) => {
        await p.fill('#q', '灵活就业人员能参加生育保险吗？');
        await p.click('#go'); await p.waitForTimeout(600);
        const c = await p.$('.cite-head');
        if (c) { await c.click(); await p.waitForTimeout(400); }
      },
    },
    {
      name: '07-同步日志', w: 1440, h: 1000,
      act: async (p) => { await p.click('#openLog'); await p.waitForTimeout(500); },
    },
    {
      name: '08-移动端375', w: 375, h: 780,
      act: async (p) => { await p.click('#chips .chip:nth-child(2)'); await p.waitForTimeout(600); },
    },
  ];

  for (const s of scenes) {
    const p = await b.newPage({ viewport: { width: s.w, height: s.h }, deviceScaleFactor: 2 });
    await p.goto('file://' + path.resolve(__dirname, 'index.html'));
    await p.waitForTimeout(900);
    try { await s.act(p); } catch (e) { console.log('  scene act failed:', e.message); }
    await p.waitForTimeout(300);
    const file = path.join(OUT, s.name + '.png');
    await p.screenshot({ path: file, fullPage: s.h < 1200 ? false : true });
    console.log('  ✓', s.name, '(' + s.w + '×' + s.h + ')');
    await p.close();
  }

  await b.close();
  console.log('\n截图输出 →', OUT);
})();
