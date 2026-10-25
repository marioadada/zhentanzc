// 页面端验收测试：把关键行为跑一遍，输出断言结果
const { chromium } = require('playwright');
const path = require('path');

const results = [];
function check(name, ok, detail) {
  results.push({ name, ok: !!ok, detail: detail || '' });
  console.log(`  [${ok ? 'PASS' : 'FAIL'}] ${name}${ok || !detail ? '' : '  — ' + detail}`);
}

(async () => {
  const b = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
  const p = await b.newPage({ viewport: { width: 1440, height: 1000 } });
  const errs = [];
  p.on('pageerror', (e) => errs.push(e.message));
  p.on('console', (m) => { if (m.type() === 'error') errs.push(m.text()); });

  await p.goto('file://' + path.resolve(__dirname, 'index.html'));
  await p.waitForTimeout(1000);

  console.log('\n=== A 组：加载与基础 ===');
  check('A1 页面无 JS 错误', errs.length === 0, errs.slice(0, 3).join(' | '));
  const syncTxt = (await p.textContent('#syncText')).trim();
  check('A2 同步状态条显示同步时间', /同步至/.test(syncTxt), syncTxt);
  check('A3 同步状态显示本地今天', (await p.inputValue('#asOf')) === '2026-10-25',
    await p.inputValue('#asOf'));
  const srcCount = (await p.$$('#srcList .src-item')).length;
  check('A4 侧栏列出全部收录文件', srcCount >= 20, String(srcCount));
  const tierOff = (await p.$$('.tier.off')).length;
  check('A5 来源层级按实际覆盖启用', tierOff < 4, `${tierOff} 个被禁用`);

  console.log('\n=== B 组：时点分层（核心能力）===');
  await p.fill('#q', '灵活就业人员能参加生育保险吗？');
  await p.click('#go');
  await p.waitForTimeout(600);
  let jc = await p.$$('.judge');
  const v2026 = (await jc[0].$eval('.badge-v', (e) => e.textContent)).trim();
  check('B1 2026-10-24 生育保险 = 符合', v2026 === '符合', v2026);
  const tp = await jc[0].$('.tp');
  check('B2 展示其他时点结论', !!tp, tp ? '' : '无 .tp 块');
  const tpTxt = tp ? (await tp.innerText()).replace(/\n/g, ' ') : '';
  check('B3 其他时点含 2026-03-01 分界', tpTxt.includes('2026-03-01') || tpTxt.includes('2026-02-28'),
    tpTxt.slice(0, 90));

  await p.fill('#asOf', '2026-02-28');
  await p.dispatchEvent('#asOf', 'change');
  await p.waitForTimeout(600);
  jc = await p.$$('.judge');
  const vOld = (await jc[0].$eval('.badge-v', (e) => e.textContent)).trim();
  check('B4 2026-02-28 生育保险 = 不符合', vOld === '不符合', vOld);
  const basisOld = (await jc[0].$eval('.judge-basis', (e) => e.textContent)).trim();
  check('B5 旧时点依据引厦府规〔2022〕12号', basisOld.includes('厦府规〔2022〕12号'),
    basisOld.slice(0, 80));
  check('B6 旧时点不再引用已失效的 2019 号文件',
    !(await jc[0].innerText()).includes('厦医保〔2019〕126号'));

  console.log('\n=== C 组：参数与计算器 ===');
  await p.fill('#asOf', '2026-10-25');
  await p.dispatchEvent('#asOf', 'change');
  await p.fill('#q', '长护险落地后我的医保费率变了吗？');
  await p.click('#go');
  await p.waitForTimeout(600);
  jc = await p.$$('.judge');
  const calc26 = await jc[0].$('.calc');
  const c26 = calc26 ? (await calc26.innerText()).replace(/\n/g, ' ') : '';
  check('C1 2026 年灵活就业费率 = 9.5%', c26.includes('9.5%'), c26.slice(0, 90));

  await p.fill('#asOf', '2027-06-01');
  await p.dispatchEvent('#asOf', 'change');
  await p.waitForTimeout(600);
  jc = await p.$$('.judge');
  const calc27 = await jc[0].$('.calc');
  const c27 = calc27 ? (await calc27.innerText()).replace(/\n/g, ' ') : '';
  check('C2 2027 年费率 = 9.35%（长护险划转）', c27.includes('9.35%'), c27.slice(0, 90));
  check('C3 推导值明确标注来源与性质',
    c27.includes('推导') || c27.includes('厦医保规〔2026〕3号'), c27.slice(0, 130));

  console.log('\n=== D 组：居民医保年度标准 ===');
  await p.fill('#q', '居民医保一年交多少钱？什么时候交？');
  await p.click('#go');
  await p.waitForTimeout(600);
  jc = await p.$$('.judge');
  const c26txt = (await jc[0].innerText()).replace(/\n/g, ' ');
  check('D1 2026 年度显示 450 元', c26txt.includes('450'), c26txt.slice(0, 120));
  await p.fill('#asOf', '2027-06-01');
  await p.dispatchEvent('#asOf', 'change');
  await p.waitForTimeout(600);
  jc = await p.$$('.judge');
  const c27txt = (await jc[0].innerText()).replace(/\n/g, ' ');
  check('D2 2027 年度显示 491 元（含长护险 41）',
    c27txt.includes('491') && c27txt.includes('41'), c27txt.slice(0, 130));

  console.log('\n=== E 组：失业保险金计算 ===');
  await p.fill('#asOf', '2026-10-25');
  await p.dispatchEvent('#asOf', 'change');
  await p.fill('#q', '失业保险金能领多少钱？领多久？');
  await p.click('#go');
  await p.waitForTimeout(600);
  jc = await p.$$('.judge');
  const utxt = (await jc[0].innerText()).replace(/\n/g, ' ');
  check('E1 最低工资 2265 自动取到', utxt.includes('2265'), utxt.slice(0, 140));
  check('E2 计算式 = 2265 × 90%', utxt.includes('2265 × 90%'), utxt.slice(0, 140));
  check('E3 月标准 = 2038.5 元', utxt.includes('2038.5'), utxt.slice(0, 150));

  console.log('\n=== F 组：越权防护（界面层）===');
  await p.fill('#q', '我能领多少失业保险金？');
  await p.click('#go');
  await p.waitForTimeout(600);
  jc = await p.$$('.judge');
  const first = (await jc[0].innerText());
  check('F1 缺条件时不给审批式断言',
    !/你符合|你可以领到|已通过/.test(first), first.slice(0, 100));
  check('F2 缺条件时列出需确认项',
    (await jc[0].$$('.missing-list li')).length > 0);

  console.log('\n=== G 组：引用可回溯 ===');
  await p.fill('#q', '灵活就业人员能参加生育保险吗？');
  await p.click('#go');
  await p.waitForTimeout(600);
  jc = await p.$$('.judge');
  const cite = await jc[0].$('.cite');
  if (cite) {
    await cite.$eval('.cite-head', (e) => e.click());
    await p.waitForTimeout(300);
    const ct = (await cite.innerText()).replace(/\n/g, ' ');
    check('G1 引用展开含原文全句', ct.includes('生育保险') || ct.includes('纳入'), ct.slice(0, 110));
    check('G2 引用含文号', /〔\d{4}〕\d+号/.test(ct), ct.slice(0, 110));
    check('G3 引用含抓取时间', /抓取于/.test(ct), '');
    check('G4 引用含快照哈希', /sha256:/.test(ct), '');
    const hasLink = /<a\b/.test(await cite.innerHTML());
    const hasIcon = /<svg/.test(await cite.innerHTML());
    check('G5 引用含原文链接（SVG 图标，非字符）', hasLink && hasIcon, '');
  } else {
    check('G1 引用块存在', false, '未找到 .cite');
  }

  console.log('\n=== H 组：制度对比表 ===');
  await p.click('.nav button[data-tab=cmpTab]');
  await p.waitForTimeout(500);
  const rows = await p.$$('#cmpTable table.cmp tr');
  check('H1 对比表有 10 行以上', rows.length >= 10, String(rows.length));
  const all = String(await (await p.$('#cmpTable')).innerText());
  check('H2 含职工/居民两列', all.includes('灵活就业职工方案') && all.includes('城乡居民方案'));
  check('H3 标注了条款引用', /〔\d{4}〕/.test(all), '');
  check('H4 提示不得重复参保', all.includes('重复参保'), '');

  console.log('\n=== I 组：交互 ===');
  await p.click('.nav button[data-tab=questionTab]');
  await p.waitForTimeout(300);
  await p.fill('#q', '灵活就业医保每月要交多少钱？');
  await p.click('#go');
  await p.waitForTimeout(600);
  jc = await p.$$('.judge');
  const range = await jc[0].$('#baseRange');
  check('I1 缴费基数滑块存在', !!range);
  if (range) {
    const before = (await jc[0].$eval('#calcAmt', (e) => e.textContent)).trim();
    await range.evaluate((el) => { el.value = 10000; el.dispatchEvent(new Event('input')); });
    await p.waitForTimeout(300);
    const after = (await jc[0].$eval('#calcAmt', (e) => e.textContent)).trim();
    check('I2 拖动滑块后金额变化', before !== after, `${before} → ${after}`);
    check('I3 金额 = 基数 × 9.5%', Math.abs(parseFloat(after) - 10000 * 0.095) < 0.02, after);
  }

  console.log('\n=== J 组：画像 ===');
  await p.click('.nav button[data-tab=profileTab]');
  await p.waitForTimeout(300);
  await p.click('#detailProfile');
  await p.waitForTimeout(400);
  const sels = await p.$$('#profileForm select');
  check('J1 完整画像字段 ≥ 12 个', sels.length >= 12, String(sels.length));
  // 提交（选几个必填）
  const pick = async (name, label) => {
    const sel = `#profileForm select[name=${name}]`;
    const ok = await p.$(sel);
    if (!ok) { check('J0 字段存在 ' + name, false); return; }
    await p.selectOption(sel, { label: label });
  };
  await pick('age_band', '25—34');
  await pick('employment', '待业/失业');
  await pick('edu', '本科');
  await pick('residence', '外地户籍，在厦租房');
  await pick('goal', '社保医保');
  const filled = await p.$$eval('#profileForm select', els => els.filter(e=>e.value).length);
  check('J0 必填项已填', filled >= 5, String(filled));
  const stillInvalid = await p.$eval('#profileForm', f => !f.checkValidity());
  check('J0b 表单校验通过', !stillInvalid, '仍有必填项为空');
  await p.click('#profileForm button[type=submit]');
  await p.waitForTimeout(600);
  const pr = await p.$('#profileResult');
  const prt = pr ? (await pr.innerText()).replace(/\n/g, ' ') : '';
  check('J2 画像产出判定卡', (await p.$$('#profileResult .judge')).length > 0);
  check('J3 画像结论含缺失条件', prt.includes('还需确认') || prt.includes('还需你确认'), prt.slice(0, 110));

  console.log('\n=== K 组：同步日志抽屉 ===');
  await p.click('#openLog');
  await p.waitForTimeout(400);
  const logItems = (await p.$$('#logList .log-item')).length;
  check('K1 同步日志可打开且有内容', logItems > 5, String(logItems));
  const logTxt = (await p.textContent('#logModal')).replace(/\n/g, ' ');
  check('K2 日志说明无 ETag 的事实', logTxt.includes('ETag'), '');
  await p.click('#closeLog');
  await p.waitForTimeout(300);
  check('K3 日志可关闭', !(await p.$eval('#logModal', e => e.classList.contains('open'))));

  console.log('\n=== L 组：移动端 375px ===');
  await p.setViewportSize({ width: 375, height: 780 });
  await p.click('.nav button[data-tab=questionTab]');
  await p.waitForTimeout(400);
  const overflow = await p.evaluate(() =>
    document.documentElement.scrollWidth - document.documentElement.clientWidth);
  check('L1 375px 无横向溢出', overflow <= 2, `溢出 ${overflow}px`);
  const fontOk = await p.evaluate(() => {
    const el = document.querySelector('.cite-body blockquote') || document.body;
    return parseFloat(getComputedStyle(el).fontSize) >= 12;
  });
  check('L2 正文最小字号 ≥ 12px', fontOk);

  console.log('\n=== M 组：检索可用性（页面端）===');
  const idxInfo = await p.evaluate(() => {
    const SI = window.SEARCH_INDEX;
    return { n: SI ? SI.N : 0, hasDL: !!(SI && SI.doc_len), hasW: !!(SI && SI.weight) };
  });
  check('M1 检索索引已加载（≥200 条条款）', idxInfo.n >= 200, String(idxInfo.n));
  check('M2 索引含 BM25 必需字段', idxInfo.hasDL && idxInfo.hasW,
    `doc_len=${idxInfo.hasDL} weight=${idxInfo.hasW}`);

  // 真实用户问法：必须都能检索到条款
  const freeQs = [
    '我在厦门没有户口能参保吗', '非全日制从业人员能参保吗', '异地医保转入厦门',
    '社保断了多久能补', '外地户籍没居住证能参保吗', '医保卡丢了怎么办',
    '我要在厦门考个证能领补贴吗', '社保转移回厦门怎么算年限',
  ];
  const freeRes = await p.evaluate((qs) => {
    const E = window.PolicyEngine;
    return qs.map((q) => {
      const cs = E.route(q);
      const nHits = cs.reduce((a, c) => a + (c._searchHits ? c._searchHits.length : 0), 0);
      return { q, nCase: cs.length, nHit: nHits };
    });
  }, freeQs);
  const noHit = freeRes.filter((x) => !x.nHit);
  check('M3 自由问法全部能检索到条款（0 漏召）', noHit.length === 0,
    noHit.map((x) => x.q).join(', '));
  check('M4 每个问法至少命中 3 条条款',
    freeRes.every((x) => x.nHit >= 3),
    freeRes.filter((x) => x.nHit < 3).map((x) => `${x.q}:${x.nHit}`).join(', '));

  // 检索命中的条款必须能展开、且带来源信息
  await p.fill('#q', '异地医保转入厦门');
  await p.click('#go');
  await p.waitForTimeout(700);
  const cites = await p.$$('.judge .cite');
  check('M5 判定卡展示检索命中的原文条款', cites.length > 0, String(cites.length));
  if (cites.length) {
    await cites[0].$eval('.cite-head', (e) => e.click());
    await p.waitForTimeout(300);
    const ct = (await cites[0].innerText()).replace(/\n/g, ' ');
    const mHtml = await cites[0].innerHTML();
    check('M6 检索条款含原文与来源（SVG 图标，非字符）',
      ct.includes('来源') && /<a\b/.test(mHtml) && /<svg/.test(mHtml), ct.slice(0, 100));
  }

  console.log('\n=== N 组：Vercel Geist 设计规范合规 ===');
  const theme = await p.evaluate(() => {
    const html = document.documentElement.innerHTML;
    const style = document.querySelector('style') ? document.querySelector('style').textContent : '';
    // 排除 :root 内的 Token 定义本身
    const rootM = style.match(/:root\{([^}]*)\}/);
    const body = style.replace(/:root\{[^}]*\}/, '');
    const hexes = (body.match(/#[0-9a-fA-F]{3,6}\b/g) || [])
      .filter((h) => !['#fff', '#000'].includes(h.toLowerCase()));
    const tokens = (rootM ? (rootM[1].match(/--geist-[a-z0-9-]+/g) || []) : []).length;
    const grads = body.match(/linear-gradient\([^)]*\)/g) || [];
    const badGrad = grads.filter((g) => /7C3AED|A855F7|EC4899|6366F1|4F46E5/i.test(g));
    // emoji 检测（P0-1）
    const emoji = html.match(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{FE00}-\u{FE0F}\u{1F000}-\u{1F02F}\u{1F0A0}-\u{1F0FF}\u{1F100}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{200D}\u{20E3}\u{E0020}-\u{E007F}]/gu) || [];
    // 弹性缓动（P0-3）
    const bouncy = body.match(/cubic-bezier\([^)]*\)/g) || [];
    const bouncyBad = bouncy.filter((b) => /0\.68|-0\.55|0\.265|1\.55/.test(b));
    return { hexCount: hexes.length, hexSample: hexes.slice(0, 4), tokens: tokens,
             gradCount: grads.length, badGrad: badGrad.length,
             emoji: emoji.slice(0, 3), emojiCount: emoji.length,
             bouncyBad: bouncyBad.length };
  });
  check('N1 无硬编码色值（仅 #fff/#000 白名单）', theme.hexCount === 0,
    `${theme.hexCount} 处: ${theme.hexSample.join(', ')}`);
  check('N2 Geist Token 数量 ≥ 40', theme.tokens >= 40, String(theme.tokens));
  check('N3 无紫粉渐变（P0-2）', theme.badGrad === 0, String(theme.badGrad));
  check('N4 无 emoji 作功能图标（P0-1）', theme.emojiCount === 0,
    `${theme.emojiCount} 个: ${theme.emoji.join(' ')}`);
  check('N5 无弹跳弹性缓动（P0-3）', theme.bouncyBad === 0, String(theme.bouncyBad));

  // 页面文案不得含空洞占位
  const allText = await p.evaluate(() => document.body.innerText);
  const placeholders = ['Lorem ipsum', '欢迎使用', '敬请期待', '了解更多', 'Coming soon', 'TODO'];
  const hitPh = placeholders.filter((x) => allText.includes(x));
  check('N6 无空洞占位文案（P0-3）', hitPh.length === 0, hitPh.join(', '));

  console.log('\n=== O 组：BM25 区分度（回归防护）===');
  const bm = await p.evaluate(() => {
    const E = window.PolicyEngine;
    const N = (window.SEARCH_INDEX && window.SEARCH_INDEX.N) || 0;
    const q1 = E.bm25('异地医保转入厦门').length;
    const q2 = E.bm25('灵活就业医保每月要交多少钱').length;
    const q3 = E.bm25('今天天气怎么样').length;
    return { N, q1, q2, q3 };
  });
  check('O1 索引条数 ≥ 200', bm.N >= 200, String(bm.N));
  // 若不降权，命中数会等于全部条款（249/249）——排序彻底失效
  check('O2 短查询命中数 < 语料 30%（高频词已降权）',
    bm.q1 < bm.N * 0.3, `${bm.q1}/${bm.N}`);
  check('O3 长查询命中数 < 语料 20%',
    bm.q2 < bm.N * 0.2, `${bm.q2}/${bm.N}`);
  check('O4 不相关查询命中数 ≤ 6',
    bm.q3 <= 6, `${bm.q3}（"今天天气"不该命中政策条款）`);

  // 路由行为：无关问题必须归零（走建议词），真实问题必须命中
  const routeBeh = await p.evaluate(() => {
    const E = window.PolicyEngine;
    const g = (q) => E.route(q).length;
    return {
      weather: g('今天天气怎么样'),
      broken: g('社保断了多久能补'),
      noHouse: g('我在厦门没有户口能参保吗'),
      transfer: g('异地医保转入厦门'),
      premium: g('灵活就业医保每月要交多少钱'),
    };
  });
  check('O5 无关问题归零（触发建议词而非硬答）',
    routeBeh.weather === 0, String(routeBeh.weather));
  check('O6 用词不标准但明确的问题仍能命中',
    routeBeh.broken >= 1, '「社保断了多久能补」应命中');
  check('O7 核心问题全部命中',
    routeBeh.noHouse >= 1 && routeBeh.transfer >= 1 && routeBeh.premium >= 1,
    JSON.stringify(routeBeh));
  // 两端口径一致性由 Python 端断言核对

  console.log('\n' + '='.repeat(52));
  const passed = results.filter((r) => r.ok).length;
  console.log(`页面验收：${passed}/${results.length} 通过`);
  if (passed !== results.length) {
    console.log('\n未通过：');
    results.filter((r) => !r.ok).forEach((r) => console.log(`  FAIL ${r.name}  ${r.detail}`));
  }
  console.log('='.repeat(52));
  await b.close();
  process.exit(passed === results.length ? 0 : 1);
})();
