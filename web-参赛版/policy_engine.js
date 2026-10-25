/* 厦门民生政策侦探 · 页面端判定引擎
 *
 * 与 pipeline/engine.py 同源同语义：共用同一份 param_table 与 cases。
 * 参数不硬编码在页面里 —— 全部来自 policy_data.js。
 */
(function () {
  "use strict";
  const D = window.POLICY_DATA;
  if (!D) { console.error("POLICY_DATA 未加载"); return; }

  const VERDICT = {
    ELIGIBLE: { label: "符合", cls: "ok" },
    NOT_ELIGIBLE: { label: "不符合", cls: "risk" },
    NEEDS_VERIFY: { label: "条件待核验", cls: "warn" },
    TIME_NOT_APPLICABLE: { label: "时点不适用", cls: "warn" },
    // 状态徽章语义主源在此表 —— 改动只许改分隔符，不许改词
    // 「待人工」必须保留：它与「条件待核验」是两类待办（等用户补条件 vs 等人工裁决）
    CONFLICT_RESOLVED: { label: "来源冲突·已裁决", cls: "warn" },
    CONFLICT_PENDING: { label: "来源冲突·待人工", cls: "risk" },
    NO_EVIDENCE: { label: "未查到可靠依据", cls: "risk" },
  };

  // 年度滚动参数：必须存在与 as_of 同年度的版本，否则视为该年度未收录
  const YEARLY = new Set([
    "resident_personal_2026", "resident_fiscal_2026", "resident_total_2026",
    "resident_personal_2027", "resident_medical_2027", "chc_resident_2027",
    "resident_fiscal_2027", "resident_fiscal_medical_2027",
    "chc_fiscal_resident_2027", "resident_total_2027",
  ]);

  function pickParam(name, asOf) {
    const all = (D.paramTable || []).filter((r) => r.param === name);
    if (!all.length) return null;
    const hits = all.filter((r) => {
      const vf = r.valid_from || "0000-01-01";
      const vt = r.valid_to || "9999-12-31";
      return asOf >= vf && asOf <= vt;
    });
    if (!hits.length) return null;
    let pool = hits;
    if (YEARLY.has(name)) {
      const year = asOf.slice(0, 4);
      const same = pool.filter((r) => (r.valid_from || "").slice(0, 4) === year);
      if (!same.length) return null;
      pool = same;
    }
    // 区间越具体越优先：valid_to 明确优先
    pool = pool.slice().sort((a, b) => {
      const ta = a.valid_to ? 0 : 1, tb = b.valid_to ? 0 : 1;
      if (ta !== tb) return ta - tb;
      return (b.valid_from || "").localeCompare(a.valid_from || "");
    });
    return pool[0];
  }

  const OPS = {
    eq: (a, b) => a === b,
    ne: (a, b) => a !== b,
    lte: (a, b) => a !== null && a !== undefined && a <= b,
    gte: (a, b) => a !== null && a !== undefined && a >= b,
    lt: (a, b) => a !== null && a !== undefined && a < b,
    gt: (a, b) => a !== null && a !== undefined && a > b,
  };

  function evalCond(cond, profile) {
    const v = profile[cond.field];
    if (v === undefined || v === null) return { state: "unknown", value: null };
    const fn = OPS[cond.op];
    if (!fn) return { state: "unknown", value: v };
    return { state: fn(v, cond.value) ? "pass" : "fail", value: v };
  }

  // 条件分组：带 alternative 的条件互为替代关系（组内 OR，组间 AND）
  // 与 pipeline/engine.py 的 group_conditions() 同语义 —— 两端必须一致，
  // 否则页面结论会和 Python 端对不上。
  function groupConditions(conditions) {
    if (!conditions || !conditions.length) return [];
    const alt = {};
    conditions.forEach((c) => {
      const f = c.field, a = c.alternative;
      if (f && a) {
        (alt[f] = alt[f] || []).push(a);
        (alt[a] = alt[a] || []).push(f);
      }
    });
    const parent = {};
    const find = (x) => {
      if (!(x in parent)) parent[x] = x;
      while (parent[x] !== x) { parent[x] = parent[parent[x]]; x = parent[x]; }
      return x;
    };
    Object.keys(alt).forEach((f) => alt[f].forEach((o) => {
      const rf = find(f), ro = find(o);
      if (rf !== ro) parent[rf] = ro;
    }));
    conditions.forEach((c) => find(c.field));
    const buckets = new Map();
    conditions.forEach((c) => {
      const r = find(c.field);
      if (!buckets.has(r)) buckets.set(r, []);
      buckets.get(r).push(c);
    });
    return Array.from(buckets.values());
  }

  // 组内 OR：任一 pass 即 pass；全 unknown 才 unknown；否则 fail
  function evalGroup(group, profile) {
    const states = group.map((c) => {
      const r = evalCond(c, profile);
      return { cond: c, state: r.state, value: r.value };
    });
    if (states.some((s) => s.state === "pass")) return { state: "pass", states };
    if (states.every((s) => s.state === "unknown")) return { state: "unknown", states };
    return { state: "fail", states };
  }

  // 集中参保缴费期倒计时：起止日全部来自参数表，代码里不写死任何日期
  // as_of 不在集中期内 → 返回 null（页面不显示提示）
  function enrollmentStatus(asOf) {
    const s = pickParam("resident_enroll_start", asOf);
    const e = pickParam("resident_enroll_end", asOf);
    if (!s || !e) return null;
    const start = s.value, end = e.value;
    if (typeof start !== "string" || typeof end !== "string") return null;
    if (asOf < start || asOf > end) return null;
    const MS = 86400000;
    const daysLeft = Math.round(
      (Date.parse(end + "T00:00:00Z") - Date.parse(asOf + "T00:00:00Z")) / MS);
    const prec = pickParam("resident_enroll_precision", asOf);
    const yr = pickParam("resident_enroll_coverage_year", asOf);
    const out = {
      start: start, end: end, daysLeft: daysLeft,
      precision: prec ? prec.value : "day",
      coverageYear: yr ? yr.value : null,
      source: e.citation,
      coverageItems: [],
    };
    // 集中期缴的是"下一年度"的钱 —— 把那一年度的标准也取出来。
    // 年度参数的 valid_from 是待遇年度（2027-01-01），而集中期 2026-10 就开始收，
    // 所以不能按 asOf 查，要按待遇年度查。找不到就留空，绝不拿别的年度顶替。
    const cy = out.coverageYear ? String(out.coverageYear) : null;
    if (cy) {
      const all = D.paramTable || [];
      const byYear = (name) => {
        const cands = all.filter((r) => r.param === name);
        if (!cands.length) return null;
        const exact = cands.filter(
          (r) => r.param.endsWith("_" + cy) || r.param.endsWith(cy));
        const pool = exact.length ? exact : cands;
        pool.sort((a, b) => {
          const ta = a.valid_to ? 0 : 1, tb = b.valid_to ? 0 : 1;
          if (ta !== tb) return ta - tb;
          return (b.valid_from || "").localeCompare(a.valid_from || "");
        });
        return pool[0];
      };
      [["resident_personal_" + cy, "个人缴费"],
       ["resident_fiscal_" + cy, "财政补助"],
       ["resident_total_" + cy, "筹资标准合计"],
       ["resident_medical_" + cy, "其中：居民医保部分"],
       ["chc_resident_" + cy, "其中：长护险部分"]].forEach(([key, label]) => {
        const r = byYear(key);
        if (r) {
          out.coverageItems.push({
            label: label, value: r.value, source: r.citation,
            sub: label.indexOf("其中") === 0,
          });
        }
      });
    }
    return out;
  }

  // ── 计算器 ─────────────────────────────────────────────
  const CALC = {
    flexible_medical_monthly(profile, asOf) {
      const rate = pickParam("flexible_rate", asOf);
      if (!rate) return { error: "未找到适用时点的灵活就业费率参数" };
      const lo = pickParam("base_lower", asOf);
      const hi = pickParam("base_upper", asOf);
      const base = profile.chosen_base;
      if (base === null || base === undefined) {
        if (!lo || !hi) {
          return { error: "查询时点 " + asOf + " 未收录缴费基数上下限（现行基数标准自 2026-01-01 执行并收录）",
                   note: "请将「查询时点」切换到 2026 年及以后，再看该计算。" };
        }
        return {
          needsInput: "chosen_base",
          range: { min: lo.value, max: hi.value },
          rate: rate.value,
          rateSource: rate.citation,
          note: "灵活就业人员在上年度省平均工资60%—300%范围内自主选择缴费基数",
        };
      }
      const amount = Math.round(base * rate.value * 100) / 100;
      return {
        amount: amount,
        formula: base + " × " + rate.value + "%",
        rate: rate.value,
        rateSource: rate.citation,
        chosenBase: base,
        note: "费率来自 " + (rate.doc_number || "") + "，2027-01-01 起因长护险调整为 " +
              (Math.round((rate.value - 0.15) * 100) / 100) + "%（医疗待遇不变）",
      };
    },

    resident_annual_premium(profile, asOf) {
      const year = asOf.slice(0, 4);
      const rows = {
        2026: [
          ["resident_personal_2026", "居民医保个人缴费"],
          ["resident_fiscal_2026", "居民医保财政补助"],
          ["resident_total_2026", "筹资标准合计"],
        ],
        2027: [
          ["resident_personal_2027", "个人缴费合计（居民医保+长护险）"],
          ["resident_fiscal_2027", "财政补助合计"],
          ["resident_total_2027", "筹资标准合计"],
        ],
      };
      // 集中期状态：as_of 不在集中期内则为 null
      const enrollment = enrollmentStatus(asOf);
      if (!rows[year]) {
        // 超出已知年度区间 → 明确报错，不给数字。
        // 但此刻若正处在集中参保缴费期内，仍要告诉用户该交哪一年度、多少钱
        const out = {
          error: "未收录 " + year + " 年度居民医保筹资标准（不得沿用其他年度数值）",
          enrollment: enrollment,
        };
        if (enrollment && enrollment.coverageItems && enrollment.coverageItems.length) {
          out.note = year + " 年度标准尚未进入本库；当前正处在 " +
            enrollment.coverageYear + " 年度集中参保缴费期内，该年度标准见下方。";
        }
        return out;
      }
      const items = [];
      rows[year].forEach(([key, label]) => {
        const r = pickParam(key, asOf);
        items.push({
          label: label,
          value: r ? r.value : null,
          source: r ? r.citation : null,
        });
      });
      if (year === "2027") {
        [["resident_medical_2027", "其中：居民医保部分"], ["chc_resident_2027", "其中：长护险部分"]]
          .forEach(([key, label]) => {
            const r = pickParam(key, asOf);
            if (r) items.push({ label: label, value: r.value, source: r.citation, sub: true });
          });
      }
      return { items: items, year: year, enrollment: enrollment };
    },

    flexible_rate_after_chc(profile, asOf) {
      const shift = pickParam("chc_rate_shift_pct", asOf);
      let base = pickParam("flexible_rate", asOf);
      if (!base) {
        const prior = (D.paramTable || [])
          .filter((r) => r.param === "flexible_rate" && (r.valid_from || "") <= asOf)
          .sort((a, b) => (b.valid_from || "").localeCompare(a.valid_from || ""));
        base = prior[0] || null;
      }
      if (!base) return { error: "未找到可作为基准的灵活就业费率参数" };
      let rate = base.value;
      let note = "";
      if (shift) {
        rate = Math.round((rate - shift.value) * 10000) / 10000;
        note = "自2027年1月起，职工医保单位费率和灵活就业人员费率各调整出 " +
              shift.value + "% 用作长护险费率；医保待遇不变。" +
              "（2027年度职工医保费率公告截至抓取时尚未发布，此处依据厦医保规〔2026〕3号第六条的明文调整幅度推导）";
      }
      return {
        rate: rate, before: base.value, derived: !!shift, note: note,
        source: base.citation, chcSource: shift ? shift.citation : null,
      };
    },

    pension_monthly(profile, asOf) {
      const rate = pickParam("pension_flexible_rate", asOf);
      if (!rate) return { error: "未找到适用时点的灵活就业养老费率参数" };
      const acct = pickParam("pension_account_pct", asOf);
      const pool = pickParam("pension_pool_pct", asOf);
      const lo = pickParam("pension_base_min_pct", asOf);
      const hi = pickParam("pension_base_max_pct", asOf);
      const base = profile.chosen_pension_base;
      if (base === null || base === undefined) {
        if (!lo || !hi) {
          return { error: "查询时点 " + asOf + " 未收录养老缴费基数档位参数",
                   note: "请将「查询时点」切换到参数已收录的年度后再试。" };
        }
        return {
          needsInput: "chosen_pension_base",
          rate: rate.value,
          baseMinPct: lo.value,
          baseMaxPct: hi.value,
          rateSource: rate.citation,
          note: "缴费基数在省平均工资60%—300%范围内自主选择，共7档",
        };
      }
      const amount = Math.round(base * rate.value) / 100;
      return {
        amount: amount,
        formula: base + " × " + rate.value + "%",
        rate: rate.value,
        rateSource: rate.citation,
        toAccount: acct ? Math.round(base * acct.value) / 100 : null,
        toPool: pool ? Math.round(base * pool.value) / 100 : null,
        accountNote: acct && pool ? (acct.value + "% 记入个人账户，" + pool.value + "% 记入统筹基金") : null,
      };
    },

    continuity_tier(profile, asOf) {
      const rRow = pickParam("tier_rates_pct", asOf);
      const tRow = pickParam("tier_thresholds_months", asOf);
      if (!rRow) return { error: "未找到适用时点的连续参保阶梯参数" };
      const thresholds = (tRow && tRow.value) || [];
      const rates = rRow.value || [];
      const months = profile.continuous_months;
      if (months === null || months === undefined) {
        return {
          needsInput: "continuous_months",
          thresholds: thresholds, rates: rates, source: rRow.citation,
        };
      }
      let idx = 0;
      thresholds.forEach((t, i) => { if (months >= t) idx = i; });
      return {
        months: months,
        rate: rates[idx],
        thresholds: thresholds, rates: rates,
        source: rRow.citation,
        note: profile.make_up_within_3m === false
          ? "中断后未在3个月内补缴，连续参保时间将重新计算" : "",
      };
    },

    resident_wait_calc(profile, asOf) {
      const fixedRow = pickParam("resident_wait_fixed_months", asOf);
      const varRow = pickParam("resident_wait_variable_per_year", asOf);
      if (!fixedRow) return { error: "未找到适用时点的居民医保等待期参数" };
      const fixed = fixedRow.value;
      const years = profile.break_years;
      const out = { fixed: fixed, fixedSource: fixedRow.citation, asOf: asOf };
      if (years === null || years === undefined) {
        out.needInput = ["break_years"];
        out.status = "needs_input";
        out.note = "固定等待期已确定，变动部分需知道断保年数";
        return out;
      }
      const per = varRow ? varRow.value : 0;
      out.years = years;
      out.perYear = per;
      out.total = fixed + years * per;
      out.formula = fixed + " + " + years + "×" + per + " = " + out.total + " 个月";
      out.status = "computed";
      return out;
    },

    unemployment_benefit(profile, asOf) {
      const rate = pickParam("benefit_rate_pct", asOf);
      if (!rate) return { error: "未找到适用时点的失业保险待遇标准参数" };
      const mw = pickParam("min_wage_xiamen", asOf);
      const ypm = pickParam("years_per_month", asOf);
      const mpy = pickParam("months_per_year", asOf);
      const maxm = pickParam("max_months", asOf);
      const minWage = mw ? mw.value : null;
      const months = profile.unemployment_insurance_months;
      const out = {
        rate: rate.value, rateSource: rate.citation,
        minWage: minWage, minWageSource: mw ? mw.citation : null,
        needInput: [],
      };
      if (minWage === null) { out.needInput.push("min_wage_xiamen"); out.status = "needs_input"; return out; }
      if (months === null || months === undefined) {
        out.needInput.push("unemployment_insurance_months");
        out.status = "needs_input";
        // 月标准与缴费月数无关 —— 先给出来
        out.amount = Math.round(minWage * rate.value) / 100;
        out.formula = minWage + " × " + rate.value + "%";
        return out;
      }
      out.amount = Math.round(minWage * rate.value) / 100;
      out.formula = (Number.isInteger(minWage) ? minWage : minWage) + " × " +
                    (Number.isInteger(rate.value) ? rate.value : rate.value) + "%";
      const years = Math.floor(months / 12);
      out.maxMonths = (mpy && maxm) ? Math.min(years * mpy.value, maxm.value) : null;
      out.monthsPerYear = mpy ? mpy.value : null;
      out.maxMonthsCap = maxm ? maxm.value : null;
      out.status = "computed";
      return out;
    },
  };

  // ── 判定主流程 ─────────────────────────────────────────
  function judge(caseDef, profile, asOf) {
    const res = {
      caseId: caseDef.case_id,
      question: caseDef.question,
      topic: caseDef.topic,
      asOf: asOf,
      verdict: null, citations: caseDef.citations || [],
      missing: [], otherTimepoints: [], calc: null, detail: {},
      // 检索命中的原文条款必须带到判定卡上（route() 挂在 caseDef 上）
      // —— 不带过去的话，判定卡里的"检索命中的原文条款"永远是空的
      _searchHits: caseDef._searchHits || [],
    };

    // 时点分层
    if (caseDef.versions && caseDef.versions.length) {
      let hit = null;
      for (const v of caseDef.versions) {
        if (asOf >= v.as_of_range[0] && asOf <= v.as_of_range[1]) { hit = v; break; }
      }
      if (hit) {
        res.verdict = hit.verdict;
        res.basis = hit.basis;
        res.extra = hit.extra || [];
        res.detail.versionWindow = hit.as_of_range;
        res.otherTimepoints = caseDef.versions
          .filter((v) => v !== hit)
          .map((v) => ({
            window: v.as_of_range, verdict: v.verdict, basis: v.basis,
          }));
        if (caseDef.calculator && CALC[caseDef.calculator]) {
          res.calc = CALC[caseDef.calculator](profile, asOf);
        }
        return res;
      }
      res.verdict = "TIME_NOT_APPLICABLE";
      res.detail.versionWindow = null;
      return res;
    }

    // 条件求值（按 alternative 分组，组内 OR、组间 AND）
    if (caseDef.conditions && caseDef.conditions.length) {
      const states = [];
      let unknown = [];
      let failed = [];
      groupConditions(caseDef.conditions).forEach((grp) => {
        const g = evalGroup(grp, profile);
        states.push.apply(states, g.states);
        if (g.state === "unknown") {
          unknown.push.apply(unknown, g.states.filter((s) => s.state === "unknown"));
        } else if (g.state === "fail") {
          failed.push.apply(failed, g.states.filter((s) => s.state === "fail"));
        }
      });
      res.detail.condStates = states.map((s) => ({
        label: s.cond.label, why: s.cond.why, state: s.state, value: s.value,
      }));
      if (unknown.length) {
        res.verdict = "NEEDS_VERIFY";
        res.missing = unknown.map((s) => ({
          field: s.cond.field, label: s.cond.label, why: s.cond.why,
        }));
      } else if (failed.length) {
        res.verdict = "NOT_ELIGIBLE";
        res.failed = failed.map((s) => s.cond.label);
      } else {
        res.verdict = "ELIGIBLE";
      }
      // 条件不全也要跑计算器：能确定的部分先给（如失业保险金最低工资标准是确定的）
      if (caseDef.calculator && CALC[caseDef.calculator]) {
        res.calc = CALC[caseDef.calculator](profile, asOf);
        if (res.calc && res.calc.status === "needs_input") {
          res.calc.partial = true;
          res.calc.partialNote = "以下数值不依赖尚未确认的条件，可直接参考";
        }
      }
      return res;
    }

    if (caseDef.calculator && CALC[caseDef.calculator]) {
      res.verdict = "ELIGIBLE";
      res.calc = CALC[caseDef.calculator](profile, asOf);
      return res;
    }

    res.verdict = "NO_EVIDENCE";
    return res;
  }


  // ── 全文检索（BM25）────────────────────────────────────────
  // 数据源：window.SEARCH_INDEX（由 pipeline/build_search_index.py 生成）
  // 覆盖原文全量条款，不是关键词表 —— 任何自然问法都能命中
  const SI = window.SEARCH_INDEX || null;
  const STOPW = new Set((SI && SI.stop) || []);
  // 高频词（出现在半数以上条款里的词）几乎不携带区分信息，必须降权。
  // 「厦门」在 97% 的条款里、「医」在 82% —— 不降权会让短查询把全部 249 条
  // 都拉进得分范围，排序彻底失效。
  const HIGH = new Set((SI && SI.high_df) || []);

  // 领域词典（与 pipeline/build_search_index.py 同源）
  const LEX = ["灵活就业人员","灵活就业","无雇工","个体工商户","非全日制从业人员",
    "新就业形态劳动者","自由职业","个体经营","户籍","本市户籍","外地户籍","居住证",
    "有效居住证","港澳台","永久居留","高层次人才","在校学生","未成年","参保登记",
    "参保条件","参保险种","重复参保","重复享受","职工基本医疗保险","职工医保",
    "城乡居民基本医疗保险","居民医保","职工基本养老保险","养老保险","失业保险",
    "工伤保险","生育保险","长期护理保险","长护险","失业保险金","生育津贴",
    "基本养老金","大病保险","门诊统筹","住院统筹","个人账户","家庭共济","统筹基金",
    "缴费基数","缴费率","缴费比例","缴费标准","筹资标准","个人缴费","财政补助",
    "省平均工资","全口径城镇单位就业人员平均工资","一次性缴纳","按月缴纳",
    "按年缴纳","预缴制","集中参保缴费期","补缴","中断缴费","断缴","连续参保",
    "连续缴费时间","视同缴费","起付标准","封顶线","最高支付限额","支付比例",
    "报销比例","待遇等待期","等待期","最低缴费年限","领取期限","失业待遇",
    "重度失能","失能等级评估","护理服务","长护险费率","转移接续","跨统筹地区",
    "异地就医","异地备案","社保关系转移","缴费年限累计","重复缴费","办事指南","申领",
    "申报材料","申请材料","办理时限","社会保障卡","灵活就业登记","失业登记",
    "参保凭证","最低工资标准","月最低工资标准","小时最低工资标准","个人账户储存额",
    "统筹基金支付"];

  function tokenize(text) {
    const t = String(text || "").replace(/[^\u4e00-\u9fffA-Za-z0-9%.．.\s]/g, " ");
    const toks = [];
    t.split(/\s+/).forEach((seg) => {
      if (!seg) return;
      for (let i = 0; i < LEX.length; i++) {
        if (seg.indexOf(LEX[i]) >= 0) toks.push(LEX[i]);
      }
      for (let i = 0; i < seg.length; i++) {
        const ch = seg[i];
        if (/[\u4e00-\u9fff]/.test(ch) && !STOPW.has(ch)) toks.push(ch);
      }
      for (let i = 0; i < seg.length - 1; i++) {
        const bg = seg.slice(i, i + 2);
        if (bg.length === 2 && !/[0-9%．.]/.test(bg[0]) && !/[0-9%．.]/.test(bg[1])) {
          if (!STOPW.has(bg)) toks.push(bg);
        }
      }
      if (/^[A-Za-z0-9.]+$/.test(seg) && seg.length > 1) toks.push(seg.toLowerCase());
    });
    return toks;
  }

  const K1 = 1.4, B = 0.72;

  function bm25(query) {
    if (!SI) return [];
    const toks = tokenize(query);
    if (!toks.length) return [];
    const N = SI.N || 1;
    const avg = SI.avg_len || 1;
    const scores = new Map();
    const seen = new Set();
    toks.forEach((t) => {
      const post = SI.postings[t];
      if (!post) return;
      const df = (SI.df[t] || post.length);
      const idf = Math.log(1 + (N - df + 0.5) / (df + 0.5));
      const hw = HIGH.has(t) ? 0.15 : 1.0;
      post.forEach((i) => {
        const dl = SI.doc_len[i] || SI.doc_len[String(i)] || avg;
        const w = (SI.weight && (SI.weight[i] || SI.weight[String(i)])) || 1;
        const tf = w * hw;
        const denom = tf + K1 * (1 - B + B * dl / avg);
        const s = idf * (tf * (K1 + 1)) / denom;
        scores.set(i, (scores.get(i) || 0) + s);
        seen.add(t);
      });
    });
    // 关键词加权：命中主题词的条款额外加分
    const kwBonus = new Map();
    for (let i = 0; i < N; i++) {
      const hits = (SI.kw_hits && (SI.kw_hits[i] || SI.kw_hits[String(i)])) || null;
      if (!hits) continue;
      const s = scores.get(i);
      if (s === undefined) continue;
      let bonus = 0;
      hits.forEach((k) => {
        if (query.includes(k)) bonus += 3.0;
      });
      if (bonus) kwBonus.set(i, bonus);
    }
    const out = [];
    scores.forEach((s, i) => {
      out.push({ i: i, score: s + (kwBonus.get(i) || 0) });
    });
    out.sort((a, b) => b.score - a.score);
    // 得分阈值：只保留最高分 30% 以上的文档
    // （12% 太松 —— 实测「今天天气怎么样」仍会命中 5 条）
    if (out.length) {
      const cut = out[0].score * 0.30;
      return out.filter((x) => x.score >= cut);
    }
    return out;
  }

  function searchClauses(query, limit) {
    const hits = bm25(query);
    const lim = limit || 8;
    return hits.slice(0, lim).map((h) => {
      const d = SI.docs[h.i];
      return {
        score: Math.round(h.score * 100) / 100,
        docNumber: d.d, title: d.t, clauseNo: d.n, regime: d.r, layer: d.l,
        url: d.u, fetchedAt: d.f, sha256: d.h, text: d.x,
      };
    });
  }

  // 命中总数（不截断）—— 用于搜索框的「正在检索 N 条官方条款」实时提示
  function countHits(query) {
    if (!SI) return 0;
    return bm25(query).length;
  }

  // ── 检索建议词 ────────────────────────────────────────────
  // 无命中时给出 3-4 个可试的说法。词表来自索引里的高频主题词，
  // 不是写死的营销文案 —— 换一份数据源，建议词会跟着变。
  function suggestTerms(query, n) {
    if (!SI || !SI.topics || !SI.topics.length) return [];
    const limit = n || 4;
    const q = String(query || "");
    const toks = new Set(tokenize(q));
    const scored = SI.topics.map((t) => {
      const term = t.t;
      let s = t.n;                       // 基础分 = 覆盖条款数
      // 与当前输入有共同字/词 → 提分（用户已经在接近这个主题）
      const tt = new Set(tokenize(term));
      let overlap = 0;
      tt.forEach((x) => { if (toks.has(x)) overlap++; });
      if (overlap) s += overlap * 40;
      // 与输入完全相同 → 排除（用户已经试过了）
      if (term === q.trim()) s = -1;
      return { term: term, score: s, count: t.n };
    }).filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score);
    return scored.slice(0, limit).map((x) => x.term);
  }


  // 条款归属推断：按制度域 + 关键词把检索命中的条款归到判定式
  const CASE_RULES = [
    { caseId: "flexible_maternity", re: /生育|津贴|产假|分娩/ },
    { caseId: "chc_rate_impact", re: /长护险|长期护理|失能|护理费/ },
    { caseId: "resident_waiting_period", re: /等待期|断保|中断缴费|重新参保/ },
    { caseId: "continuity_ladder", re: /连续参保|连续缴费时间|大病保险待遇/ },
    { caseId: "resident_annual_premium", re: /居民医保.*(缴费|标准|筹资)|集中参保缴费期|预缴制/ },
    { caseId: "unemployment_benefit", re: /失业保险金|领取期限|失业待遇/ },
    { caseId: "flexible_pension", re: /养老保险|养老金|缴费基数.*(养老|职工月平均工资)|临时账户/ },
    { caseId: "flexible_medical_amount", re: /缴费基数|缴费率|灵活就业人员.*(费率|基数|缴费)/ },
    { caseId: "resident_eligibility", re: /居民医保.*(参保|条件|范围)|未参加职工医保/ },
    { caseId: "flexible_medical_eligibility", re: /灵活就业人员|个人身份参加职工医保|户籍限制/ },
    { caseId: "insurance_transfer", re: /转移接续|转移|视同缴费年限|缴费年限累计/ },
    { caseId: "resident_wait_period_calc", re: /固定待遇等待期|变动待遇等待期|待遇等待期/ },
    { caseId: "flexible_enroll_channel", re: /灵活就业参保承诺书|承诺制|未持有厦门市有效居住证/ },
  ];

  function inferCase(hit) {
    const blob = (hit.text || "") + " " + (hit.title || "") + " " + (hit.docNumber || "");
    for (const r of CASE_RULES) {
      if (r.re.test(blob)) return r.caseId;
    }
    return null;
  }

  // ── 意图路由：问题 → 判定式 ────────────────────────────
  const ROUTES = [
    { caseId: "flexible_medical_amount", keys: ["交多少钱", "多少钱", "缴费", "月缴", "算一下", "每月交", "每月要交", "月缴"] },
    { caseId: "resident_annual_premium", keys: ["居民医保", "居民保险", "居民", "一年交"] },
    { caseId: "chc_rate_impact", keys: ["长护险", "费率变", "9.35", "9.5", "费率调整", "涨了吗"] },
    { caseId: "flexible_maternity", keys: ["生育保险", "生育津贴", "生孩子", "产假", "生育"] },
    { caseId: "resident_waiting_period", keys: ["等待期", "断保", "重新参保", "多久能报", "断了"] },
    { caseId: "continuity_ladder", keys: ["断缴", "连续参保", "待遇降", "大病保险", "断缴后"] },
    { caseId: "flexible_pension", keys: ["养老保险", "养老金", "退休", "养老交", "养老"] },
    { caseId: "unemployment_benefit", keys: ["失业保险金", "失业金", "领多少", "失业待遇", "领多久"] },
    { caseId: "insurance_transfer", keys: ["转移", "接续", "转回厦门", "外地交过", "异地医保", "年限合并", "转进来"] },
    { caseId: "resident_wait_period_calc", keys: ["等待期", "多久能报", "重新参保", "断保后", "断了几"] },
    { caseId: "resident_eligibility", keys: ["能参加吗", "参保条件", "谁能参加", "资格", "能不能参加"] },
    { caseId: "flexible_enroll_channel", keys: ["承诺书", "承诺制", "没居住证", "没有居住证", "手续怎么办", "怎么办理", "怎么办"] },
    { caseId: "flexible_medical_eligibility", keys: ["灵活就业", "职工医保", "怎么选", "选哪个", "待业", "参加", "哪种"] },
  ];

  function route(question) {
    const q = (question || "").trim();
    if (!q) return [];
    // 检索命中后归到判定式；检索是「兜底+增强」，
    // 关键词路由命中时不覆盖（否则"居民医保一年交多少钱"会被
    // 通用条款抢走，跑到 resident_eligibility 去）
    const clauseHits = searchClauses(q, 12);
    if (clauseHits.length) {
      // 把命中的条款归到对应的判定式（按条款所属文件/主题推断）
      const byCase = new Map();
      clauseHits.forEach((h) => {
        const cid = inferCase(h);
        if (!cid) return;
        if (!byCase.has(cid)) byCase.set(cid, []);
        byCase.get(cid).push(h);
      });
      // 关键词路由先算分
      const kwHits = [];
      ROUTES.forEach((r) => {
        const score = r.keys.reduce((n, k) => n + (q.includes(k) ? 1 : 0), 0);
        if (score > 0) kwHits.push({ caseId: r.caseId, score: score });
      });
      kwHits.sort((a, b) => b.score - a.score);

      // 关键词有命中时以关键词为准（检索只补条款）
      // 分数只用于排序，不作为门槛 —— 否则「社保断了多久能补」
      // 这类用词不标准但明确的问题会因 score=1 被漏掉
      if (kwHits.length) {
        const ids0 = kwHits.map((h) => h.caseId);
        const out0 = [];
        ids0.forEach((cid) => {
          const c = (D.cases || []).find((x) => x.case_id === cid);
          if (!c) return;
          // 该判定式自己归到的条款 + 全局检索命中的条款（去重）
          // 早期实现只取 byCase.get(cid)，导致关键词命中的判定式
          // 若无条款归到它就一条原文都不展示（hits=0）—— 搜索白搜了
          const mine = byCase.get(cid) || [];
          const seen = new Set(mine.map((h) => h.clauseNo + "|" + h.docNumber));
          const merged = mine.concat(clauseHits.filter((h) => {
            const k = h.clauseNo + "|" + h.docNumber;
            if (seen.has(k)) return false;
            seen.add(k);
            return true;
          }));
          out0.push(Object.assign({}, c, { _searchHits: merged }));
        });
        if (out0.length) return out0;
      }

      // 关键词没命中或置信度低 → 纯检索归类
      // 但必须过"相关度下限"：弱相关命中（如「今天天气怎么样」命中 5 条
      // 含"天""气"的条款）不应强行归类成判定，否则用户看到的是
      // 与问题无关的政策内容 —— 这比"没找到"更糟。
      if (byCase.size) {
        const topScore = clauseHits.length ? clauseHits[0].score : 0;
        // 最高分必须达到一定量级才认为"这条查询真的能回答"
        const MIN_SCORE = 12;
        if (topScore >= MIN_SCORE) {
          const out = [];
          byCase.forEach((hits2, cid) => {
            const c = (D.cases || []).find((x) => x.case_id === cid);
            if (c) out.push(Object.assign({}, c, { _searchHits: hits2 }));
          });
          if (out.length) return out;
        }
      }
      return [];
    }
    const hits = [];
    ROUTES.forEach((r) => {
      const score = r.keys.reduce((n, k) => n + (q.includes(k) ? 1 : 0), 0);
      if (score > 0) hits.push({ caseId: r.caseId, score: score });
    });
    hits.sort((a, b) => b.score - a.score);
    const ids = hits.map((h) => h.caseId);
    // 「怎么选 / 选哪个」需要同时给出两侧对比
    if (q.includes("怎么选") || q.includes("选哪个") || q.includes("对比") ||
        q.includes("还是") || q.includes("哪种") || q.includes("哪个划算") ||
        q.includes("区别")) {
      ["flexible_medical_eligibility", "flexible_medical_amount",
       "resident_annual_premium", "flexible_pension"].forEach((id) => {
        if (!ids.includes(id)) ids.push(id);
      });
    }
    const cases = D.cases || [];
    return ids.map((id) => cases.find((c) => c.case_id === id)).filter(Boolean);
  }

  window.PolicyEngine = {
    VERDICT: VERDICT,
    pickParam: pickParam,
    judge: judge,
    route: route,
    CALC: CALC,
    meta: D.meta,
    policies: D.policies || {},
    cases: D.cases || [],
    search: searchClauses,
    bm25: bm25,
    countHits: countHits,
    suggestTerms: suggestTerms,
    paramTable: D.paramTable || [],
    serviceLayer: D.serviceLayer,
    statusCheck: D.statusCheck,
    validityMeta: D.validityMeta,
  };
})();
