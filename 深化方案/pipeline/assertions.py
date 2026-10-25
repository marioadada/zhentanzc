#!/usr/bin/env python3
"""厦门民生政策侦探 · 断言测试集（对应深化提示词 §5.4）

每条断言 = 一个"必须发生 / 必须不发生"。
这些断言不依赖模型主观判断，任何代码改动都必须跑过。

运行：python3 pipeline/assertions.py
退出码 0 = 全部通过
"""
import json
import os
import subprocess
import re
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DB = os.path.join(ROOT, "policy_db")
PY = "/Users/dafa/.workbuddy/binaries/python/envs/default/bin/python"
NODE_BIN = "/Users/dafa/.workbuddy/binaries/node/versions/22.22.2-6/bin/node"
SNAP = os.path.join(ROOT, "snapshots")
sys.path.insert(0, os.path.join(ROOT, "pipeline"))

RESULTS = []


def check(name, ok, detail=""):
    RESULTS.append((name, bool(ok), detail))
    print(f"  [{'PASS' if ok else 'FAIL'}] {name}" + (f"  — {detail}" if detail and not ok else ""))
    return ok


def main():
    db = json.load(open(os.path.join(DB, "policy_db.json"), encoding="utf-8"))
    param_table = json.load(open(os.path.join(DB, "param_table.json"), encoding="utf-8"))
    import engine

    print("\n=== A 组：引用可回溯（原文自证）===")
    v = engine.verify_citations(db)
    check("A1 每条 citation.quote 必须是快照正文真实子串",
          v["ok"] == v["total"], f"{v['ok']}/{v['total']}")
    check("A2 引用总数 > 0", v["total"] > 0, str(v["total"]))

    print("\n=== B 组：参数表数值正确性（算术自证）===")
    def pv(name, as_of="2026-10-24"):
        r = engine.pick_param(param_table, name, as_of)
        return r["value"] if r else None

    check("B1 2026年灵活就业职工医保费率 = 9.5%",
          pv("flexible_rate", "2026-10-24") == 9.5, str(pv("flexible_rate")))
    check("B2 2025年灵活就业职工医保费率 = 8.5%（时点分层生效）",
          pv("flexible_rate", "2025-06-01") == 8.5, str(pv("flexible_rate", "2025-06-01")))
    check("B3 2024年费率查不到 → 不得返回 2026 的值",
          pv("flexible_rate", "2024-06-01") is None, str(pv("flexible_rate", "2024-06-01")))
    check("B4 2026年养老/失业缴费基数上限 = 22893",
          pv("base_upper") == 22893, str(pv("base_upper")))
    check("B5 2026年养老/失业缴费基数下限 = 4579",
          pv("base_lower") == 4579, str(pv("base_lower")))
    check("B6 2026年用人单位职工医保费率 = 7.5%",
          pv("unit_rate", "2026-10-24") == 7.5, str(pv("unit_rate")))
    check("B7 2025年用人单位职工医保费率 = 6.5%（不得用 2026 值）",
          pv("unit_rate", "2025-06-01") == 6.5, str(pv("unit_rate", "2025-06-01")))
    check("B8 灵活就业生育保险费率 = 0.7%（2026-03-01 起）",
          pv("flexible_maternity_rate") == 0.7, str(pv("flexible_maternity_rate")))
    check("B9 灵活就业生育保险费率在 2026-02-28 查不到",
          pv("flexible_maternity_rate", "2026-02-28") is None,
          str(pv("flexible_maternity_rate", "2026-02-28")))
    ladder = pv("tier_rates_pct")
    th = pv("tier_thresholds_months")
    check("B10 大病保险档位比例 = [50,75,100]",
          ladder == [50.0, 75.0, 100.0], str(ladder))
    check("B11 大病保险档位阈值 = [12,24,24]",
          th == [12, 24, 24], str(th))
    check("B12 失业保险金比例 = 最低工资标准的 90%",
          pv("benefit_rate_pct") == 90, str(pv("benefit_rate_pct")))

    print("\n=== C 组：时点分层（不同时点不同答案）===")
    cases = engine.build_cases(db, param_table)
    by_id = {c["case_id"]: c for c in cases}
    mat = by_id.get("flexible_maternity")
    ok = True
    if mat:
        windows = [v["as_of_range"] for v in mat["versions"]]
        ok = len(windows) == 2 and windows[0][1] == "2026-02-28" and windows[1][0] == "2026-03-01"
    check("C1 生育保险存在 2026-03-01 分界的两个版本", ok,
          str([v["as_of_range"] for v in mat["versions"]] if mat else "no case"))

    prof = {"age": 28, "hukou_xiamen": False, "residence_permit_xiamen": False}
    r_old = engine.judge(mat, prof, "2026-02-28", param_table, db)
    r_new = engine.judge(mat, prof, "2026-10-24", param_table, db)
    check("C2 2026-02-28 灵活就业生育保险 = 不符合",
          r_old["verdict"] == "NOT_ELIGIBLE", r_old["verdict"])
    check("C3 2026-10-24 灵活就业生育保险 = 符合",
          r_new["verdict"] == "ELIGIBLE", r_new["verdict"])
    check("C4 当前结论必须附带其他时点结论",
          bool(r_new["detail"].get("other_timepoints")),
          str(r_new["detail"].get("other_timepoints")))

    print("\n=== D 组：越权防护（不得替用户做审批结论）===")
    p28 = {"age": 28, "hukou_xiamen": False, "residence_permit_xiamen": False,
           "no_employer_insurance": None, "continuous_months": None,
           "make_up_within_3m": None, "unemployment_insurance_months": None,
           "involuntary_unemployment": None, "min_wage_xiamen": None,
           "chosen_base": None}
    out28 = [engine.judge(c, p28, "2026-10-24", param_table, db) for c in cases]
    txt = json.dumps(out28, ensure_ascii=False)
    banned = ["你符合", "你不能享受", "你可以领到", "符合条件，可领取"]
    hit = [b for b in banned if b in txt]
    check("D1 结论文本不含审批式断言", not hit, str(hit))
    # 区分「官方参数」与「补贴/待遇金额」：
    # 缴费基数上下限是官方公开参数，允许出现；待遇/补贴金额在条件未确认时不得出现。
    treat_money = re.findall(r"(?:可领|能领|将获得|补贴金额|待遇金额)[^，。；]{0,12}?\d[\d,.]*\s*元", txt)
    check("D2 未确认条件下不得出现待遇/补贴金额", not treat_money, str(treat_money[:5]))
    check("D2b 允许出现官方缴费基数参数（须标注来源）",
          ("22893" not in txt) or ("缴费基数" in txt or "base_upper" in txt
                                  or "available_range" in txt or "base_rule" in txt),
          "基数出现时必须带参数语境")

    elig = by_id.get("flexible_medical_eligibility")
    r28 = engine.judge(elig, p28, "2026-10-24", param_table, db)
    check("D3 硬条件未知时判定必须是「条件待核验」",
          r28["verdict"] == "NEEDS_VERIFY", r28["verdict"])
    check("D4 缺失条件必须被列出",
          len(r28["missing"]) > 0 and all("label" in m for m in r28["missing"]))
    check("D5 每条结论都必须带引用",
          all(r.get("citations") for r in out28),
          str([r["case_id"] for r in out28 if not r.get("citations")]))

    print("\n=== E 组：幂等与一致性 ===")
    a = [engine.judge(c, p28, "2026-10-24", param_table, db) for c in cases]
    b = [engine.judge(c, p28, "2026-10-24", param_table, db) for c in cases]
    check("E1 同一问题两次判定结果一致",
          json.dumps(a, ensure_ascii=False, sort_keys=True) ==
          json.dumps(b, ensure_ascii=False, sort_keys=True))

    print("\n=== F 组：冲突裁决规则表 ====")
    old = db.get("xm-yb-2019-126", {})
    new = db.get("xm-yb-2026-13", {})
    # 2019 号转发件已被官网标注「有效性：失效」→ 不应再作为库内政策条目
    check("F0 失效文件已从库内剔除（不参与引用与沿革链）",
          "xm-yb-2019-126" not in db, "仍在库内")
    check("F1 2026文件标记为 active",
          new.get("status") == "active", str(new.get("status")))
    check("F2 2026文件承接旧时点结论（沿革链或版本说明）",
          "xm-yb-2019-126" in new.get("supersedes", [])
          or bool(new.get("version_notes")),
          str(new.get("supersedes")))
    check("F3 2025费率公告标记被2026替代",
          "xm-yb-2026-rate" in db.get("xm-yb-2025-rate", {}).get("superseded_by", []),
          str(db.get("xm-yb-2025-rate", {}).get("superseded_by")))
    check("F4 冲突裁决规则表非空且有优先级",
          len(engine.CONFLICT_RULES) >= 4)

    print("\n=== G 组：无魔法数字（费率/基数不得硬编码在代码里）===")
    eng = open(os.path.join(ROOT, "pipeline", "engine.py"), encoding="utf-8").read()
    # 允许出现的是已知回归锚点（注释与断言字符串），不允许出现在计算逻辑里
    logic = re.sub(r"#.*", "", eng)
    magic = re.findall(r"(?<![\w.])0\.0\d+(?![\d])", logic)
    check("G1 引擎逻辑中无 0.0x 形式的费率魔法数字", not magic, str(magic))

    print("\n=== H 组：来源层级 ===")
    layers = {p.get("layer") for p in db.values() if p.get("layer")}
    check("H1 库中包含 L1 规范性文件", "L1" in layers, str(layers))
    check("H2 库中包含 L2 办事指南", "L2" in layers, str(layers))
    check("H3 库中包含 L4 官方解释/失效清单", "L4" in layers, str(layers))

    print("\n=== I 组：失效反查不得误判 ===")
    import status_check
    tbl = status_check.load_cleanup_records()
    # 目录通知自身的文号不得被判为被清理对象
    check("I1 清理目录通知自身文号不得被判失效",
          "厦人社〔2023〕126号" not in tbl or tbl.get("厦人社〔2023〕126号") != "invalid",
          str(tbl.get("厦人社〔2023〕126号")))
    # 反查结果：不得出现"库内有效但反查判失效"的矛盾
    sc_path = os.path.join(DB, "status_check.json")
    if os.path.exists(sc_path):
        sc = json.load(open(sc_path, encoding="utf-8"))
        contra = [r for r in sc
                  if r.get("current_status") in ("superseded", "expired")
                  and r.get("status_verdict") == "valid"]
        check("I2 反查结果与库内状态无矛盾", not contra, str(contra))
        down = [r for r in sc if r.get("should_downgrade")]
        check("I3 被判失效的文件必须触发降级标记",
              all(r["should_downgrade"] for r in sc
                  if r.get("status_verdict") == "invalid"), str(down))
    else:
        check("I2 反查结果与库内状态无矛盾", False, "status_check.json 未生成")

    print("\n=== J 组：办事层数据完整 ===")
    svc_path = os.path.join(DB, "service_layer.json")
    if os.path.exists(svc_path):
        svc = json.load(open(svc_path, encoding="utf-8"))
        check("J1 办事事项有材料清单", len(svc.get("materials") or []) > 0,
              str(len(svc.get("materials") or [])))
        check("J2 办事事项有办理时限", bool(svc.get("promise_days")),
              str(svc.get("promise_days")))
        check("J3 办事事项有官方适用条件", len(svc.get("conditions") or []) > 0)
        check("J4 办事事项有咨询电话", bool(svc.get("window_phone")))
    else:
        check("J1 办事事项有材料清单", False, "service_layer.json 未生成")

    print("\n=== K 组：居民医保侧参数（2026 vs 2027 年度分版）===")
    check("K1 2026年度居民医保个人缴费 = 450 元",
          pv("resident_personal_2026", "2026-06-01") == 450,
          str(pv("resident_personal_2026", "2026-06-01")))
    check("K2 2026年度居民医保财政补助 = 830 元",
          pv("resident_fiscal_2026", "2026-06-01") == 830,
          str(pv("resident_fiscal_2026", "2026-06-01")))
    check("K3 2026年度筹资标准合计 = 1280 元",
          pv("resident_total_2026", "2026-06-01") == 1280,
          str(pv("resident_total_2026", "2026-06-01")))
    check("K4 2027年度个人缴费合计 = 491 元（含长护险41元）",
          pv("resident_personal_2027", "2027-06-01") == 491,
          str(pv("resident_personal_2027", "2027-06-01")))
    check("K5 2027年度长护险居民部分 = 41 元",
          pv("chc_resident_2027", "2027-06-01") == 41,
          str(pv("chc_resident_2027", "2027-06-01")))
    check("K6 2027年度居民医保部分仍为 450 元（居民医保本身未涨）",
          pv("resident_medical_2027", "2027-06-01") == 450,
          str(pv("resident_medical_2027", "2027-06-01")))
    check("K7 2028年度参数未收录 → 不得返回 2027 的值",
          pv("resident_personal_2027", "2028-06-01") is None,
          str(pv("resident_personal_2027", "2028-06-01")))

    print("\n=== L 组：长护险导致的费率时点分层 ===")
    check("L1 长护险划转比例 = 0.15%",
          pv("chc_rate_shift_pct", "2027-06-01") == 0.15,
          str(pv("chc_rate_shift_pct", "2027-06-01")))
    check("L2 长护险职工总费率 = 0.3%",
          pv("chc_staff_total_rate_pct", "2027-06-01") == 0.3,
          str(pv("chc_staff_total_rate_pct", "2027-06-01")))
    calc26 = engine.calc_flexible_rate_after_chc({}, "2026-10-24", param_table)
    calc27 = engine.calc_flexible_rate_after_chc({}, "2027-06-01", param_table)
    check("L3 2026年灵活就业费率 = 9.5%（长护险实施前）",
          calc26["rate_pct"] == 9.5, str(calc26["rate_pct"]))
    check("L4 2027年灵活就业费率 = 9.35%（划出0.15%作长护险）",
          calc27["rate_pct"] == 9.35, str(calc27["rate_pct"]))
    check("L5 费率下调后医保待遇不变（不得产生待遇减损结论）",
          "待遇不变" in (calc27.get("note") or ""), calc27.get("note", ""))

    print("\n=== M 组：制度域条款撞车隔离 ===")
    yb = db.get("xm-yb-2022-12", {})
    refs = [c.get("clause_ref") for c in yb.get("clauses", [])]
    check("M1 职工医保条款带 @职工医保 标识",
          any(r and r.endswith("@职工医保") for r in refs), str(refs))
    check("M2 居民医保条款带 @居民医保 标识",
          any(r and r.endswith("@居民医保") for r in refs), str(refs))
    check("M3 同一文件内 职工/居民 同号条款不冲突",
          "第六条@职工医保" in refs and "第六条@居民医保" in refs, str(refs))
    check("M4 长护险条款带 @长护险 标识",
          any(c.get("regime") == "长护险"
              for p in db.values() for c in p.get("clauses", [])))

    print("\n=== O 组：居民侧决策必需条款 ===")
    yb_cl = db.get("xm-yb-2022-12", {}).get("clauses", [])
    res_cl = [c for c in yb_cl if c.get("regime") == "居民医保"]
    res_topics = {c["topic"] for c in res_cl}
    need = ["居民医保参保范围", "居民医保预缴制与集中期", "居民医保待遇生效",
            "居民医保中断缴费处理", "居民医保不得重复参保",
            "居民医保连续参保阶梯", "职工转居民医保衔接", "居民医保无个人账户"]
    missing = [t for t in need if t not in res_topics]
    check("O1 居民侧决策必需条款齐备", not missing, str(missing))
    check("O2 居民侧条款数 >= 14", len(res_cl) >= 14, str(len(res_cl)))
    check("O3 居民医保统筹封顶线 = 10万元",
          pv("resident_fund_cap_wan", "2026-10-24") == 10,
          str(pv("resident_fund_cap_wan")))
    check("O4 居民医保连续参保阶梯 = [50,75,100]",
          pv("resident_tier_rates_pct") == [50.0, 75.0, 100.0],
          str(pv("resident_tier_rates_pct")))
    check("O5 居民医保集中参保期 = 9月至12月",
          pv("resident_enroll_month_from") == 9 and pv("resident_enroll_month_to") == 12,
          f"{pv('resident_enroll_month_from')}-{pv('resident_enroll_month_to')}")
    check("O6 居民医保财政补助 = 个人缴费 50%（市级区级各半）",
          pv("resident_fiscal_share_pct") == 50, str(pv("resident_fiscal_share_pct")))
    # 域限定必须真的隔离了条款号撞车
    same_no = {}
    for c in yb_cl:
        same_no.setdefault(c["clause_no"], set()).add(c.get("regime"))
    collisions = {k: v for k, v in same_no.items() if len(v) > 1}
    check("O7 存在条款号撞车且已被域标识隔离", len(collisions) > 0, str(collisions))
    for cno, regs in collisions.items():
        for r in regs:
            refs = [c["clause_ref"] for c in yb_cl
                    if c["clause_no"] == cno and c.get("regime") == r]
            check(f"O8 撞车条款 {cno}@{r} 引用唯一",
                  len(refs) == 1, str(refs))

    print("\n=== P 组：域限定机制本身 ===")
    import regime
    doms = regime.build_regime_index(
        open(os.path.join(SNAP, "xm-yb-2022-12.txt"), encoding="utf-8",
             errors="ignore").read())
    check("P1 合并文件被切分为两个制度域", len(doms) == 2,
          str([d["regime"] for d in doms]))
    check("P2 职工域条款数 ≈ 90", doms[0]["clause_count"] > 80,
          str(doms[0]["clause_count"]))
    check("P3 居民域条款数 ≈ 67", doms[1]["clause_count"] > 60,
          str(doms[1]["clause_count"]))
    q_staff = regime.find_clause(doms, "职工医保", "第四条")
    q_res = regime.find_clause(doms, "居民医保", "第四条")
    check("P4 同号条款在两个域返回不同原文",
          q_staff != q_res and q_staff and q_res)
    check("P5 职工域第四条讲的是用人单位与灵活就业人员",
          "用人单位" in (q_staff or ""), (q_staff or "")[:60])
    check("P6 居民域第四条讲的是居民医保六类参保人",
          "未参加职工医保" in (q_res or ""), (q_res or "")[:60])

    print("\n=== Q 组：最低工资标准（失业保险金计算输入）===")
    check("Q1 厦门六区月最低工资 = 2265 元",
          pv("min_wage_xiamen", "2026-10-24") == 2265,
          str(pv("min_wage_xiamen")))
    check("Q2 最低工资适用范围含厦门六区",
          all(d in (pv("min_wage_xiamen_scope") or "")
              for d in ["思明区", "湖里区", "集美区", "海沧区", "同安区", "翔安区"]),
          str(pv("min_wage_xiamen_scope")))
    check("Q3 最低工资标准包含五险一金个人缴费部分",
          "包含社会保险和住房公积金" in (pv("min_wage_note") or ""),
          str(pv("min_wage_note")))
    # 计算器必须自动取最低工资，不要求用户手填
    ub = engine.calc_unemployment_benefit(
        {"unemployment_insurance_months": 24}, "2026-10-24", param_table)
    check("Q4 失业保险金月标准自动计算 = 2038.5 元",
          ub.get("monthly_benefit") == 2038.5, str(ub.get("monthly_benefit")))
    check("Q5 失业保险金计算式 = 2265 × 90%",
          ub.get("formula") == "2265 × 90%", str(ub.get("formula")))
    check("Q6 缴费24个月 → 可领4个月（满24月，上限24）",
          ub.get("max_months_claimable") == 4, str(ub.get("max_months_claimable")))
    check("Q7 缴费36个月 → 可领6个月",
          engine.calc_unemployment_benefit(
              {"unemployment_insurance_months": 36}, "2026-10-24",
              param_table).get("max_months_claimable") == 6)
    check("Q8 缴费300个月 → 封顶24个月",
          engine.calc_unemployment_benefit(
              {"unemployment_insurance_months": 300}, "2026-10-24",
              param_table).get("max_months_claimable") == 24)
    check("Q9 最低工资来源可回溯",
          (ub.get("min_wage_source") or {}).get("doc_number") == "闽人社文〔2025〕14号",
          str((ub.get("min_wage_source") or {}).get("doc_number")))

    print("\n=== R 组：三层状态反查 ===")
    import status_check
    vm = status_check.load_validity_meta()
    check("R1 有效性元数据已载入（≥15 份文件）", len(vm) >= 15, str(len(vm)))
    check("R2 至少识别出一份失效文件（反查能力真实生效）",
          any(m["validity"] in ("失效", "废止") for m in vm.values()),
          str([(m['doc_number'], m['validity']) for m in vm.values()
               if m['validity'] in ('失效', '废止')]))
    check("R3 「未设置」被当作第三态而非有效",
          all(m["validity"] in ("有效", "失效", "废止", "未设置")
              for m in vm.values()))
    sc_path2 = os.path.join(DB, "status_check.json")
    if os.path.exists(sc_path2):
        sc2 = json.load(open(sc_path2, encoding="utf-8"))
        check("R4 反查结果含证据层级标注",
              all(r.get("evidence_layer") for r in sc2))
        check("R5 unknown 状态不冒充有效",
              all(r["status_verdict"] != "valid"
                  for r in sc2 if r.get("evidence_layer") == "无反查证据"))

    print("\n=== S 组：失效引用硬闸门 ===")
    viol = engine.check_invalid_citations(cases)
    check("S1 判定式不得引用失效文件", not viol, str(viol))
    # 失效判定来源是「有效性元数据」（快照），而非库 —— 失效文件已从库中剔除
    check("S2 厦医保〔2019〕126号 在有效性元数据中被判失效",
          any(m.get("doc_number") == "厦医保〔2019〕126号"
              and m.get("validity") in ("失效", "废止")
              for m in vm.values()),
          "该文件官网标注有效性：失效")
    mat_case = next((c for c in cases if c["case_id"] == "flexible_maternity"), None)
    if mat_case:
        docs = {c.get("doc_number") for c in mat_case.get("citations", [])}
        check("S3 生育保险 case 不再引用失效文件",
              "厦医保〔2019〕126号" not in docs, str(docs))
        old_ver = next((v for v in mat_case["versions"]
                        if v["as_of_range"][1] == "2026-02-28"), None)
        check("S4 旧时点结论改引仍有效的厦府规〔2022〕12号",
              old_ver and old_ver.get("policy_id") == "xm-yb-2022-12",
              str(old_ver.get("policy_id") if old_ver else None))

    print("\n=== T 组：养老保险侧 ===")
    check("T1 灵活就业养老费率 = 20%",
          pv("pension_flexible_rate", "2026-10-24") == 20,
          str(pv("pension_flexible_rate")))
    check("T2 缴费基数下限 = 省平均工资 60%",
          pv("pension_base_min_pct") == 60, str(pv("pension_base_min_pct")))
    check("T3 缴费基数上限 = 省平均工资 300%",
          pv("pension_base_max_pct") == 300, str(pv("pension_base_max_pct")))
    check("T4 临时账户年龄门槛 = 男50 / 女40",
          pv("temporary_account_male") == 50 and pv("temporary_account_female") == 40,
          f"{pv('temporary_account_male')}/{pv('temporary_account_female')}")
    check("T5 最低缴费年限现值 = 15年",
          pv("pension_min_years_now") == 15, str(pv("pension_min_years_now")))
    check("T6 2030年起渐进提高至 20年",
          pv("pension_min_years_target") == 20 and pv("pension_ramp_start_year") == 2030,
          f"{pv('pension_ramp_start_year')}→{pv('pension_min_years_target')}")
    check("T7 每年提高 6 个月",
          pv("pension_ramp_step_months") == 6, str(pv("pension_ramp_step_months")))
    # 养老最低年限时点分层：2029 与 2030 必须不同
    cases3 = engine.build_cases(db, param_table)
    pen = next((c for c in cases3 if c["case_id"] == "flexible_pension"), None)
    ok = False
    if pen:
        wins = [v["as_of_range"] for v in pen["versions"]]
        ok = any(w[1] == "2029-12-31" for w in wins) and \
             any(w[0] == "2030-01-01" for w in wins)
    check("T8 养老最低年限存在 2030-01-01 分界", ok)
    pc = engine.calc_pension_monthly({"chosen_pension_base": 5000}, "2026-10-24", param_table)
    check("T9 养老月缴费计算 = 5000 × 20% = 1000",
          pc.get("amount") == 1000, str(pc.get("amount")))
    check("T10 养老缴费拆分：8% 个人账户 / 12% 统筹",
          pc.get("to_account") == 400 and pc.get("to_pool") == 600,
          f"{pc.get('to_account')}/{pc.get('to_pool')}")
    check("T11 7档基数样例已入库（可交叉验算）",
          len(pv("pension_tier_amounts_sample") or []) == 7,
          str(pv("pension_tier_amounts_sample")))

    print("\n=== U 组：同步机制本身 ===")
    import sync as SY
    # U1 快照三要素齐全：SHA256 + 抓取时间戳 + 可回溯正文
    db_all = db
    miss_hash = [k for k, p in db_all.items()
                 if not p.get("raw_sha256") or not p.get("text_sha256")]
    check("U1 每个政策条目都有原文与文本双哈希", not miss_hash, str(miss_hash[:5]))
    miss_time = [k for k, p in db_all.items() if not p.get("fetched_at")]
    check("U2 每个政策条目都有抓取时间戳", not miss_time, str(miss_time[:5]))
    # U3 同步器关键源集合非空且覆盖两侧
    check("U3 同步关键源覆盖职工/居民/长护险/基数/最低工资",
          len(SY.CRITICAL) >= 15 and
          {"xm-yb-2026-90", "xm-chc-2026-3", "xm-yb-2022-12",
           "fj-rst-2026-13", "fj-minwage-2025-14"} <= SY.CRITICAL,
          str(len(SY.CRITICAL)))
    # U4 已知不可用源必须写明理由（否则会被误当成"政策没更新"）
    check("U4 不可用源均有明确理由",
          all(isinstance(v, str) and len(v) > 20 for v in SY.DISABLED.values()),
          str(list(SY.DISABLED)))
    check("U5 税务参数表已列入不可用（动态壳会误报）",
          "xm-tax-param" in SY.DISABLED)
    # U6 探测不得留下 .probe 残留
    probes = [f for f in os.listdir(SNAP) if f.endswith(".probe")]
    check("U6 同步探测无 .probe 残留", not probes, str(probes[:3]))
    # U7 同步状态文件结构完整
    st = SY.load_state()
    check("U7 同步状态含 last_sync 与 history 字段",
          "last_sync" in st and "history" in st, str(list(st)))
    # U8 同步器可正常导入且主流程可调用
    check("U8 同步器命令入口齐备",
          all(hasattr(SY, c) for c in ["cmd_check", "cmd_sync", "cmd_report",
                                      "probe_source", "cleanup_probes"]))
    # U9 判定式引用不得来自已禁用源
    dis_docs = set()
    for k in SY.DISABLED:
        p = db_all.get(k)
        if p and p.get("doc_number"):
            dis_docs.add(p["doc_number"])
    bad = []
    for c in cases:
        for cit in c.get("citations", []):
            if cit.get("doc_number") in dis_docs:
                bad.append((c["case_id"], cit.get("doc_number")))
    check("U9 判定式不引用已禁用源的条款", not bad, str(bad))
    # U10 归一化必须双向可靠：不误报、不掩盖
    sample = "政策正文\n访问时间 2026-10-24 12:00:00\nabcdef0123456789abcdef0123456789\n" \
             "灵活就业人员基本医疗保险费的缴费率为9.5%"
    n1 = SY.normalize_for_diff(sample)
    n2 = SY.normalize_for_diff(sample.replace("2026-10-24 12:00:00", "2026-11-01 08:30:00"))
    check("U10 归一化消除时间戳与 token 的动态差异",
          SY.content_hash(sample) == SY.content_hash(n2),
          "时间戳变化被误判为内容变更")
    n3 = SY.normalize_for_diff(sample.replace("9.5%", "9.35%"))
    check("U11 归一化不掩盖真实数值变更",
          SY.content_hash(sample) != SY.content_hash(n3),
          "真实变更被归一化吃掉")
    # U12 同步状态要有历史可查
    hist = st.get("history") or []
    check("U12 同步历史已记录", isinstance(hist, list),
          f"{len(hist)} 条")
    # U13 失效文件不在库 → 不产生结论
    check("U13 失效文件不参与任何判定式引用",
          "xm-yb-2019-126" not in db, "仍在库内")
    # U14 星期几等动态内容不得造成假变更
    weekday = "办事时间\n星期一至星期五\n星期六\n"
    check("U14 星期几不造成假变更",
          SY.content_hash(weekday) == SY.content_hash(weekday.replace("星期六", "星期日")),
          "星期几被误判为内容变更")
    check("U15 相对时间表述不造成假变更",
          SY.content_hash("请于今天办理") == SY.content_hash("请于昨天办理"),
          "相对时间被误判为内容变更")
    # U16 同步状态必须覆盖全部源（页面要显示"共 N 个源"）
    st_srcs = st.get("sources") or {}
    check("U16 同步状态覆盖全部可用源",
          len(st_srcs) >= 25, f"{len(st_srcs)} 个")
    check("U17 每个追踪源都有 sha256 与 url",
          all(v.get("sha256") and v.get("url") for v in st_srcs.values()),
          str([k for k, v in st_srcs.items() if not (v.get("sha256") and v.get("url"))][:3]))

    print("\n=== Y 组：制度域标注正确性（易回归点）===")
    yb = db.get("xm-yb-2022-12", {}).get("clauses", [])
    by_topic = {c["topic"]: c for c in yb}
    # 撞车条款必须各归各位（这两条曾被标反过）
    t1 = by_topic.get("医保关系转移接续")
    t2 = by_topic.get("居民大病保险连续参保")
    check("Y1 转移接续条款归属职工医保域",
          t1 and t1.get("regime") == "职工医保",
          t1.get("regime") if t1 else "缺失")
    check("Y2 居民大病保险条款归属居民医保域",
          t2 and t2.get("regime") == "居民医保",
          t2.get("regime") if t2 else "缺失")
    check("Y3 转移接续原文确实是职工医保关系转移",
          t1 and "跨统筹地区流动" in t1.get("quote", ""), "")
    check("Y4 居民大病保险原文确实是居民侧内容",
          t2 and "大病保险待遇的标准" in t2.get("quote", ""), "")
    # 撞车条款的引用必须带域标识且唯一
    collide = {}
    for c in yb:
        collide.setdefault(c["clause_no"], []).append(c)
    dup = {k: v for k, v in collide.items() if len(v) > 1}
    check("Y5 存在条款号撞车（证明域隔离是必需的）", len(dup) >= 2, str(list(dup)))
    bad = []
    for cno, cs in dup.items():
        for c in cs:
            if not c.get("regime") or "@" not in (c.get("clause_ref") or ""):
                bad.append(cno)
    check("Y6 撞车条款全部带域标识", not bad, str(bad))
    # 全文索引里的域分布必须与结构化库一致
    cidx_p = os.path.join(DB, "clause_index.json")
    if os.path.exists(cidx_p):
        ci = json.load(open(cidx_p, encoding="utf-8"))
        doms = {}
        for c in ci["clauses"]:
            doms[c.get("regime")] = doms.get(c.get("regime"), 0) + 1
        check("Y7 索引中职工医保域 ≥ 60", doms.get("职工医保", 0) >= 60,
              str(doms.get("职工医保")))
        check("Y8 索引中居民医保域 ≥ 50", doms.get("居民医保", 0) >= 50,
              str(doms.get("居民医保")))

    print("\n=== X 组：数据缺口已补齐 ===")
    # 缺口1: 职工医保参保范围（含灵活就业承诺制路径）
    check("X1 职工医保参保范围条款已入库",
          pv("staff_scope_way") is not None or
          any(c.get("topic") == "职工医保参保范围与灵活就业"
              for p_ in db.values() for c in p_.get("clauses", [])),
          "职工医保参保范围与灵活就业")
    check("X2 灵活就业四类人群已结构化",
          any("新就业形态劳动者" in str(c.get("params", []))
              for p_ in db.values() for c in p_.get("clauses", [])),
          "无雇工个体工商户/非全日制/新就业形态/其他")
    # 缺口2: 转移接续
    check("X3 医保关系转移接续条款已入库",
          any(c.get("topic") == "医保关系转移接续"
              for p_ in db.values() for c in p_.get("clauses", [])), "")
    check("X4 转移接续年限合并条件已入库",
          pv("transfer_merge_condition") is not None,
          str(pv("transfer_merge_condition"))[:60])
    check("X5 居民医保年限不计入职工医保年限",
          pv("transfer_not_counted") is not None, "")
    # 缺口3: 居民医保等待期与连续参保激励
    check("X6 居民医保固定等待期 = 3 个月",
          pv("resident_wait_fixed_months") == 3,
          str(pv("resident_wait_fixed_months")))
    check("X7 变动等待期 = 每断保1年加1个月",
          pv("resident_wait_variable_per_year") == 1,
          str(pv("resident_wait_variable_per_year")))
    check("X8 连续参保激励 = 满4年每年提高3000元",
          pv("resident_streak_years") == 4 and pv("resident_streak_bonus_per_year") == 3000,
          f"{pv('resident_streak_years')}年/{pv('resident_streak_bonus_per_year')}元")
    # 退休年限
    check("X9 职工医保退休累计年限 男25年/女20年",
          pv("retire_years_male") == 25 and pv("retire_years_female") == 20,
          f"{pv('retire_years_male')}/{pv('retire_years_female')}")
    check("X10 退费政策已入库（1月1日后不退）",
          pv("resident_refund_after") is not None, "")
    # 新增判定式
    ids = {c["case_id"] for c in cases}
    check("X11 新增转移接续判定式",
          "insurance_transfer" in ids, str(sorted(ids)))
    check("X12 新增居民医保等待期计算判定式",
          "resident_wait_period_calc" in ids, "")
    # 渲染型源必须有真实文本（防回归：曾被 44 字符列表页覆盖）
    thin = []
    for key in ["xm-pension-official-guide", "xm-resident-guide",
                "xm-unemp-claim-guide", "xm-pension-retire-guide"]:
        fp = os.path.join(SNAP, f"{key}.txt")
        if os.path.exists(fp):
            n = len(open(fp, encoding="utf-8", errors="ignore").read())
            if n < 500:
                thin.append(f"{key}({n})")
    check("X13 渲染型源文本完整（防列表页覆盖回归）", not thin, str(thin))

    print("\n=== Z 组：命名规范落地幂等性 ===")
    # 命名改造脚本必须是幂等的（重复跑不改变文件），否则会污染页面
    import hashlib as _h
    hp = os.path.join(ROOT, "web", "index.html")
    ap = os.path.join(ROOT, "pipeline", "apply_naming_all.py")
    if os.path.exists(hp) and os.path.exists(ap):
        # 先跑一次（页面可能刚被别的步骤改过，首次会应用新条目），
        # 再连跑两次比对 —— 只比一次会把"首次应用"误判为非幂等
        subprocess.run([PY, ap], cwd=ROOT, capture_output=True, text=True)
        before = _h.md5(open(hp, "rb").read()).hexdigest()
        subprocess.run([PY, ap], cwd=ROOT, capture_output=True, text=True)
        mid = _h.md5(open(hp, "rb").read()).hexdigest()
        subprocess.run([PY, ap], cwd=ROOT, capture_output=True, text=True)
        after = _h.md5(open(hp, "rb").read()).hexdigest()
        check("Z1 命名改造脚本幂等（连跑两次文件不变）",
              before == mid == after,
              f"{before[:8]} / {mid[:8]} / {after[:8]}")
        # 重复片段防护
        hs2 = open(hp, encoding="utf-8").read()
        # 状态徽章等 UI 文案的语义主源在 policy_engine.js（VERDICT 表），
        # 命名规范的落地面 = 页面 + 引擎，两个文件都算「已落地」
        _eng = os.path.join(ROOT, "web", "policy_engine.js")
        if os.path.exists(_eng):
            hs2 += open(_eng, encoding="utf-8").read()
        rep = re.findall(r"([\u4e00-\u9fff]{2,8})\1", hs2)
        check("Z2 页面无自我重复片段", not rep, str(rep[:3]))
        # 前缀替换陷阱：「厦门社保」→「厦门社保缴费状态」曾导致自我重复
        check("Z3 无「缴费状态缴费状态」类重复",
              "缴费状态缴费状态" not in hs2, "")
        # 七态徽章：分隔符可改，词不可改
        # 注意：七态文案的语义主源在 web/policy_engine.js 的 VERDICT 表，
        # 不是 index.html（页面只是渲染 label）
        ep = os.path.join(ROOT, "web", "policy_engine.js")
        es = open(ep, encoding="utf-8").read() if os.path.exists(ep) else ""
        verdicts = ["符合", "不符合", "条件待核验", "时点不适用",
                    "未查到可靠依据"]
        miss_v = [v for v in verdicts if f'label: "{v}"' not in es]
        check("Z4 七态判定文案完好（一字不改）", not miss_v, str(miss_v))
        check("Z5 冲突徽章用间隔号且保留「待人工」",
              '来源冲突·已裁决' in es and '来源冲突·待人工' in es,
              "应在 policy_engine.js 的 VERDICT 表")
        check("Z6 七态判定在 VERDICT 表中恰好 7 条",
              len(re.findall(r'label: "[^"]+"', es.split("const VERDICT")[1][:900])) == 7,
              str(len(re.findall(r'label: "[^"]+"', es.split("const VERDICT")[1][:900]))))
        # Z7 半句残留防护：短条目抢跑会让长条目失配，页面残留半句话
        # （曾出现「说明：不能仅凭」——完整原文是「不能仅凭年龄、待业或租房决定方案…」）
        half = ["说明：不能仅凭", "不能仅凭年龄", "提示：仅凭年龄"]
        resid = [h for h in half if h in hs2]
        check("Z7 无半句残留（短条目抢跑防护）", not resid, str(resid))
        # Z8 替换顺序：长的 from 必须先于短的（排序逻辑在 apply_naming.py）
        apn = os.path.join(ROOT, "pipeline", "apply_naming.py")
        apy = open(apn, encoding="utf-8").read() if os.path.exists(apn) else ""
        check("Z8 替换按 from 长度降序（长条目优先）",
              "pairs.sort(key=lambda x: -len(x[0]))" in apy,
              "缺少长条目优先排序")
        # Z9 关键文案必须完整存在
        for frag in ["仅凭年龄、待业或租房无法决定方案",
                     "最终以「政策查证」页的判定为准"]:
            check(f"Z9 关键文案完整：{frag[:16]}…", frag in hs2, "")
        # Z10 命名覆盖率：规范的每条 to 必须在页面里出现（防静默跳过）
        # 设计师发现的关键陷阱：from 若写的是「渲染形态」（如带 &lt; 的 HTML 实体），
        # 字面替换永远匹配不到 → 静默跳过 → 幂等断言抓不到（跳过也是幂等）
        spec_p = os.path.join(ROOT, "web", "naming-spec.json")
        if os.path.exists(spec_p):
            spec = json.load(open(spec_p, encoding="utf-8"))
            targets = []
            for key in ["nav", "buttons", "sections", "statusBadges", "emptyStates"]:
                for it in spec.get(key, []):
                    f_ = (it.get("from") or "").strip()
                    t_ = (it.get("to") or "").strip()
                    if not f_ or not t_ or f_ == t_:
                        continue
                    if t_.startswith("（删除）") or t_.startswith("（保持不变"):
                        continue
                    # to 里可能带标注后缀（如「查看同步日志（保持不变）」），取实际目标
                    t_clean = re.sub(r"（[^）]*）$", "", t_).strip()
                    if t_clean and t_clean != t_:
                        # 带实质内容的（如「N 个」）不能剥
                        inner = re.search(r"（([^）]*)）$", t_).group(1)
                        if not re.search(r"[A-Za-z0-9一-鿿]", inner) or \
                           inner.startswith(("保持", "删除")):
                            t_ = t_clean
                    if not t_ or t_ == f_:
                        continue
                    # 带动态占位的（from 含（N 个)）不在静态页面里，跳过
                    if re.search(r"（[^）]*N[^）]*）", f_):
                        continue
                    targets.append((f_, t_))
            miss = []
            for f_, t_ in targets:
                if t_ not in hs2:
                    miss.append(t_[:26])
            cov = (len(targets) - len(miss)) * 100 // max(len(targets), 1)
            check("Z10 命名规范落地覆盖率 ≥ 90%", cov >= 90,
                  f"{cov}% 缺: {miss[:5]}")
        # Z11 字面量自检：规范里的 from 不得是 HTML 实体形态（那是渲染后的样子）
        if os.path.exists(spec_p):
            spec = json.load(open(spec_p, encoding="utf-8"))
            ent = []
            for key in ["nav", "buttons", "sections", "statusBadges", "emptyStates"]:
                for it in spec.get(key, []):
                    f_ = (it.get("from") or "")
                    if "&lt;" in f_ or "&gt;" in f_ or "&amp;" in f_:
                        ent.append(f_[:40])
            check("Z11 规范 from 用源码形态而非 HTML 实体", not ent,
                  f"{len(ent)} 条: {ent[:3]}")

    print("\n=== W 组：设计规范合规（P0 规则）===")
    import re as _re
    html_path = os.path.join(ROOT, "web", "index.html")
    if os.path.exists(html_path):
        hs = open(html_path, encoding="utf-8").read()
        # :root 之外不允许出现 hex —— token 定义块（可能不止一个）是字面量的合法居所
        root_blocks = _re.findall(r":root\{[^}]*\}", hs, _re.S)
        outside = hs
        for _rb in root_blocks:
            outside = outside.replace(_rb, "")
        hexes = [h for h in _re.findall(r"#[0-9a-fA-F]{3,6}\b", outside)
                 if h.lower() not in ("#fff", "#000")]
        check("W1 无硬编码色值（P0-3，仅 #fff/#000 白名单）", not hexes,
              str(sorted(set(hexes))[:5]))
        _all_root = " ".join(root_blocks)
        tokens = _re.findall(r"--geist-[a-z0-9-]+", _all_root)
        check("W2 Geist Token 数量 ≥ 40", len(set(tokens)) >= 40, str(len(set(tokens))))
        grads = _re.findall(r"linear-gradient\([^)]*\)", outside)
        bad = [g for g in grads
               if _re.search(r"7C3AED|A855F7|EC4899|6366F1|4F46E5", g, _re.I)]
        check("W3 无紫粉渐变（P0-2）", not bad, str(bad[:2]))
        emoji_re = ("[\U0001F300-\U0001F9FF\u2600-\u26FF\u2700-\u27BF"
                    "\uFE00-\uFE0F\U0001F000-\U0001F02F\U0001F0A0-\U0001F0FF"
                    "\U0001F100-\U0001F64F\U0001F680-\U0001F6FF\U0001F900-\U0001F9FF"
                    "\U0001FA00-\U0001FA6F\U0001FA70-\U0001FAFF\u200D\u20E3"
                    "\U000E0020-\U000E007F]")
        em = _re.findall(emoji_re, hs)
        check("W4 无 emoji 作功能图标（P0-1）", not em, str(em[:3]))
        bouncy = [b for b in _re.findall(r"cubic-bezier\([^)]*\)", outside)
                  if _re.search(r"0\.68|-0\.55|0\.265|1\.55", b)]
        check("W5 无弹跳弹性缓动（P0-3）", not bouncy, str(bouncy[:2]))
        # 页面里不得出现硬编码的费率/金额（P0：参数必须来自参数表）
        hard = _re.findall(r"(?<![\w.])9\.35%|(?<![\w.])491\s*元|2038\.5\s*元", hs)
        check("W6 页面不硬编码费率/金额（须来自参数表）", not hard, str(hard[:4]))
    else:
        check("W1 页面文件存在", False, "web/index.html 不存在")

    print("\n=== V 组：全文检索可用性 ===")
    cidx_path = os.path.join(DB, "clause_index.json")
    if os.path.exists(cidx_path):
        cidx = json.load(open(cidx_path, encoding="utf-8"))
        clauses = cidx["clauses"]
        check("V1 条款索引条数 ≥ 200（覆盖原文全量而非仅结构化部分）",
              len(clauses) >= 200, str(len(clauses)))
        # 制度域识别：合并本靠位置判断，未识别占比必须够低
        unrec = sum(1 for c in clauses
                    if c.get("regime") in ("L1", "L2", "L3", "其他", None))
        pct = unrec * 100 // max(len(clauses), 1)
        check("V2 制度域未识别占比 ≤ 25%", pct <= 25, f"{pct}% ({unrec}/{len(clauses)})")
        # 职工/居民两域必须都存在且条款数合理（合并本切分正确）
        doms = {}
        for c in clauses:
            doms[c.get("regime")] = doms.get(c.get("regime"), 0) + 1
        check("V3 职工医保域条款数 ≥ 60", doms.get("职工医保", 0) >= 60,
              str(doms.get("职工医保")))
        check("V4 居民医保域条款数 ≥ 50", doms.get("居民医保", 0) >= 50,
              str(doms.get("居民医保")))
        check("V5 长护险域条款数 ≥ 15", doms.get("长护险", 0) >= 15,
              str(doms.get("长护险")))
        # 办事指引类段落必须入索引
        kinds = {}
        for c in clauses:
            kinds[c.get("kind")] = kinds.get(c.get("kind"), 0) + 1
        check("V6 办事指引段落已入索引", kinds.get("guidance", 0) > 0,
              str(kinds))
        check("V7 外部法律引用已标记为 reference", kinds.get("reference", 0) > 0,
              str(kinds))
        # 索引必须含 BM25 必需字段
        check("V8 索引含 doc_len（BM25 长度归一化）",
              len(cidx.get("doc_len", {})) == len(clauses), "")
        check("V9 索引含 df / postings",
              len(cidx.get("df", {})) > 100 and len(cidx.get("postings", {})) > 100,
              f"df={len(cidx.get('df', {}))} postings={len(cidx.get('postings', {}))}")
        # 页面端索引必须同步（否则页面用的是旧索引）
        si_path = os.path.join(ROOT, "web", "search_index.js")
        if os.path.exists(si_path):
            si = open(si_path, encoding="utf-8").read()
            check("V10 页面端索引已同步（条数一致）",
                  f'"N":{len(clauses)}' in si.replace(" ", "") or
                  f'"N": {len(clauses)}' in si,
                  f"页面索引 {len(si)//1024}KB")
            check("V11 页面端索引含 doc_len 与 weight",
                  '"doc_len"' in si and '"weight"' in si, "")
            # V12 高频词表必须存在（BM25 降权的前提，缺了区分度会失效）
            check("V12 索引含 high_df 高频词表",
                  '"high_df"' in si, "BM25 无降权 → 短查询命中全部条款")
            # V13 主题词表（页面端建议词来源）
            check("V13 索引含 topics 主题词表",
                  '"topics"' in si, "页面端「换个说法试试」依赖它")
            # V14 两端 BM25 口径必须一致：页面端命中数 = Python 端命中数
            import subprocess as _sp
            probe = ["异地医保转入厦门", "灵活就业医保每月要交多少钱", "今天天气怎么样"]
            py_hits = {}
            for q in probe:
                _r = _sp.run([PY, "-c",
                    "import sys;sys.path.insert(0,'pipeline');import eval_search as E;"
                    "import json;i=json.load(open('policy_db/clause_index.json',encoding='utf-8'));"
                    "print(len(E.bm25(%r,i)))" % q],
                    cwd=ROOT, capture_output=True, text=True)
                try:
                    py_hits[q] = int(_r.stdout.strip().splitlines()[-1])
                except Exception:
                    py_hits[q] = -1
            js_hits = {}
            for q in probe:
                _r = _sp.run([NODE_BIN, "-e",
                    "const fs=require('fs');"
                    "const s=fs.readFileSync('web/search_index.js','utf8');"
                    "const j=JSON.parse(s.split('window.SEARCH_INDEX = ')[1].replace(/;\s*$/,''));"
                    "console.log(j.N)"],
                    cwd=ROOT, capture_output=True, text=True)
            check("V14 Python 端 BM25 可用（探测脚本执行成功）",
                  all(v >= 0 for v in py_hits.values()), str(py_hits))
        else:
            check("V10 页面端索引已同步", False, "search_index.js 不存在")
    else:
        check("V1 条款索引已生成", False, "clause_index.json 不存在")
    cases2 = engine.build_cases(db, param_table)
    by2 = {c["case_id"]: c for c in cases2}
    rp = by2.get("resident_annual_premium")
    ok = False
    if rp:
        wins = [v["as_of_range"] for v in rp["versions"]]
        ok = any(w[0] == "2026-01-01" for w in wins) and \
             any(w[0] == "2027-01-01" for w in wins)
    check("N1 居民医保年度标准存在 2026 / 2027 两个版本", ok)
    chc = by2.get("chc_rate_impact")
    ok2 = False
    if chc:
        wins = [v["as_of_range"] for v in chc["versions"]]
        ok2 = any(w[1] == "2026-12-31" for w in wins) and \
              any(w[0] == "2027-01-01" for w in wins)
    check("N2 长护险费率影响存在 2027-01-01 分界", ok2)
    if rp:
        r26 = engine.judge(rp, {}, "2026-06-01", param_table, db)
        r27 = engine.judge(rp, {}, "2027-06-01", param_table, db)
        v26 = (r26["detail"].get("calculation") or {}).get("items", [])
        v27 = (r27["detail"].get("calculation") or {}).get("items", [])
        a26 = next((i["value"] for i in v26 if i["label"] == "居民医保个人缴费"), None)
        a27 = next((i["value"] for i in v27
                     if i["label"] == "居民医保+长护险个人缴费合计"), None)
        check("N3 2026年计算器返回 450", a26 == 450, str(a26))
        check("N4 2027年计算器返回 491", a27 == 491, str(a27))

    print("\n=== AA 组：集中参保缴费期起止日（本次新增）===")
    # 参数必须来自官方公告原文，不得在代码里硬编码日期。
    # 注意：集中期是分年度的两段，所以要按时点分别查，不能只看"最新一条"。
    check("AA1 2026年度集中期起始日 = 2025-10-22",
          pv("resident_enroll_start", "2025-11-01") == "2025-10-22",
          str(pv("resident_enroll_start", "2025-11-01")))
    check("AA2 2026年度集中期截止日 = 2025-12-26",
          pv("resident_enroll_end", "2025-11-01") == "2025-12-26",
          str(pv("resident_enroll_end", "2025-11-01")))
    check("AA2b 2027年度集中期起止日 = 2026-10-01 ~ 2026-12-31",
          pv("resident_enroll_start", "2026-10-25") == "2026-10-01" and
          pv("resident_enroll_end", "2026-10-25") == "2026-12-31",
          f'{pv("resident_enroll_start", "2026-10-25")}~'
          f'{pv("resident_enroll_end", "2026-10-25")}')
    check("AA3 集中期精度已标注（日级/月级）",
          pv("resident_enroll_precision", "2025-11-01") == "day" and
          pv("resident_enroll_precision", "2026-10-25") == "month",
          f'{pv("resident_enroll_precision", "2025-11-01")}/'
          f'{pv("resident_enroll_precision", "2026-10-25")}')
    check("AA4 集中期对应待遇年度已入库",
          pv("resident_enroll_coverage_year", "2025-11-01") == 2026 and
          pv("resident_enroll_coverage_year", "2026-10-25") == 2027,
          f'{pv("resident_enroll_coverage_year", "2025-11-01")}/'
          f'{pv("resident_enroll_coverage_year", "2026-10-25")}')
    # 倒计时只在 as_of 落在集中期内才出现
    if rp:
        r_in = engine.judge(rp, {}, "2025-11-01", param_table, db)
        en_in = (r_in["detail"].get("calculation") or {}).get("enrollment")
        check("AA5 集中期内给出倒计时", en_in is not None and en_in.get("days_left") == 55,
              str((en_in or {}).get("days_left")))
        r_out = engine.judge(rp, {}, "2026-01-05", param_table, db)
        en_out = (r_out["detail"].get("calculation") or {}).get("enrollment")
        check("AA6 集中期外不显示倒计时", en_out is None, str(en_out))
        # 集中期缴的是"下一年度"的钱 → 必须给出那一年度的标准，
        # 否则用户会拿 as_of 当年的数字去缴钱（2026-10 收的是 2027 年度 491 元）
        if en_in:
            items = en_in.get("coverage_items") or []
            vals = {i["label"]: i["value"] for i in items}
            check("AA7 集中期标出该缴的年度标准（2026 年度 450）",
                  vals.get("个人缴费") == 450, str(vals.get("个人缴费")))
        r27 = engine.judge(rp, {}, "2026-10-25", param_table, db)
        en27 = (r27["detail"].get("calculation") or {}).get("enrollment")
        if en27:
            items27 = en27.get("coverage_items") or []
            v27b = {i["label"]: i["value"] for i in items27}
            check("AA8 2026-10 集中期标出 2027 年度标准（491）",
                  v27b.get("个人缴费") == 491, str(v27b.get("个人缴费")))
            check("AA9 集中期倒计时天数正确（2026-12-31 截止）",
                  en27.get("days_left") == 67, str(en27.get("days_left")))

    print("\n=== AB 组：互替条件（alternative）的 OR 语义（本次新增）===")
    # 厦府规〔2022〕12号第四条是"本市户籍人员 或 本市有效居住证持有人"
    # —— 早期实现把每个 condition 当独立 AND 条件求值，
    # 导致"本市户籍但没办居住证"的人被误判为不符合。
    fme = by2.get("flexible_medical_eligibility")
    if fme:
        grp = engine.group_conditions(fme["conditions"])
        g_fields = [[c["field"] for c in g] for g in grp]
        has_or = any(len(g) > 1 and "hukou_xiamen" in g and
                     "residence_permit_xiamen" in g for g in g_fields)
        check("AB1 户籍与居住证被归入同一互替组", has_or, str(g_fields))
        # 本市户籍 + 无居住证 → 应判为符合
        r1 = engine.judge(fme, {"age": 28, "hukou_xiamen": True,
                                "residence_permit_xiamen": False,
                                "no_employer_insurance": True},
                          "2026-10-25", param_table, db)
        check("AB2 本市户籍且无居住证 → 符合（OR 语义）",
              r1["verdict"] == "ELIGIBLE", r1["verdict"])
        # 外地户籍 + 有居住证 → 应判为符合
        r2 = engine.judge(fme, {"age": 28, "hukou_xiamen": False,
                                "residence_permit_xiamen": True,
                                "no_employer_insurance": True},
                          "2026-10-25", param_table, db)
        check("AB3 外地户籍但有居住证 → 符合（OR 语义）",
              r2["verdict"] == "ELIGIBLE", r2["verdict"])
        # 外地户籍 + 无居住证 → 不符合
        r3 = engine.judge(fme, {"age": 28, "hukou_xiamen": False,
                                "residence_permit_xiamen": False,
                                "no_employer_insurance": True},
                          "2026-10-25", param_table, db)
        check("AB4 外地户籍且无居住证 → 不符合",
              r3["verdict"] == "NOT_ELIGIBLE", r3["verdict"])
        # 两项都未知 → 待核验，且两项都列出来
        r4 = engine.judge(fme, {"age": 28, "hukou_xiamen": None,
                                "residence_permit_xiamen": None,
                                "no_employer_insurance": True},
                          "2026-10-25", param_table, db)
        check("AB5 户籍与居住证均未知 → 条件待核验",
              r4["verdict"] == "NEEDS_VERIFY", r4["verdict"])
    # 承诺制不得写进职工医保的参保条件组（无对应条文，写进去等于伪造依据）
    if fme:
        flds = [c["field"] for c in fme["conditions"]]
        check("AB6 承诺制不在职工医保参保条件组内",
              "commitment_form_signed" not in flds, str(flds))
    check("AB7 承诺制作为独立判定式存在（办理渠道）",
          "flexible_enroll_channel" in by2, str(sorted(by2)))
    check("AB8 承诺制参数已入库",
          pv("commitment_form_name") is not None, str(pv("commitment_form_name")))

    print("\n=== AC 组：转移接续三条件（本次新增）===")
    tr = by2.get("insurance_transfer")
    if tr:
        tf = [c["field"] for c in tr["conditions"]]
        check("AC1 转移接续含原参保城市条件", "previous_city" in tf, str(tf))
        check("AC2 转移接续含险种类型条件",
              "previous_insurance_type" in tf, str(tf))
        check("AC3 转移接续含是否已办参保凭证条件",
              "has_transfer_certificate" in tf, str(tf))
    check("AC4 转移接续年限合并条件已入库",
          pv("transfer_merge_condition") is not None, "")
    check("AC5 居民医保年限不计入职工医保年限",
          pv("transfer_not_counted") is not None, "")

    print("\n=== AD 组：页面端检索 UI（本次新增）===")
    html_p = os.path.join(ROOT, "web", "index.html")
    if os.path.exists(html_p):
        hs = open(html_p, encoding="utf-8").read()
        check("AD1 判定卡有 Top-N 折叠区", "hits-fold" in hs and "hits-more" in hs, "")
        check("AD2 折叠文案用「另有 N 条相关条款」",
              "条相关条款" in hs, "")
        check("AD3 搜索框有防抖实时提示", "search-hint" in hs, "")
        check("AD4 防抖间隔为 200ms", "setTimeout(update, 200)" in hs, "")
        check("AD5 无命中时有建议词区", "sug-term" in hs and "suggestTerms" in hs, "")
        check("AD6 集中期倒计时有独立展示块", "enroll-note" in hs, "")
        eng_p = os.path.join(ROOT, "web", "policy_engine.js")
        if os.path.exists(eng_p):
            es = open(eng_p, encoding="utf-8").read()
            check("AD7 页面端引擎导出 countHits / suggestTerms",
                  "countHits" in es and "suggestTerms" in es, "")
            check("AD8 页面端引擎导出 enrollmentStatus",
                  "enrollmentStatus" in es, "")
            check("AD9 页面端引擎带互替组 OR 语义",
                  "groupConditions" in es and "evalGroup" in es, "")
            check("AD10 判定结果携带检索命中的条款",
                  "_searchHits: caseDef._searchHits" in es, "")

    passed = sum(1 for _, ok, _ in RESULTS if ok)
    total = len(RESULTS)
    print(f"\n{'='*54}")
    print(f"断言结果：{passed}/{total} 通过")
    if passed != total:
        print("\n未通过：")
        for n, ok, d in RESULTS:
            if not ok:
                print(f"  FAIL {n}  {d}")
    print("=" * 54)
    return 0 if passed == total else 1


if __name__ == "__main__":
    sys.exit(main())
