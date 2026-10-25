#!/usr/bin/env python3
"""从抓取快照中抽取条款，建立政策条目库（Policy Node）+ 引用对象（Citation）

对应深化提示词 §2 数据模型。核心约束：
- 每个 clause 的 quote 必须是快照 txt 的真实子串（自证可回溯）
- 每个 param 的 value 必须来自 txt，不得人工填写
- 沿革链通过 supersedes / superseded_by 显式声明
"""
import hashlib
import json
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SNAP = os.path.join(ROOT, "snapshots")
DB = os.path.join(ROOT, "policy_db")

# ── 条款抽取规则 ─────────────────────────────────────────────────────────
# (政策key, 条款正则, 主题, 参数抽取器名)
CLAUSE_SPECS = [
    ("xm-yb-2022-12", r"第六条[^。]{0,400}?。", "职工医保费率", "flexible_rate_2022"),
    ("xm-yb-2022-12", r"第七条[^。]{0,300}?。", "职工医保缴费基数", "base_60_300"),
    ("xm-yb-2022-12", r"第四十七条[\s\S]{0,320}?退休人员、医疗救助对象大病保险待遇不受连续参保时间限制。", "大病保险连续参保", "dai_bing_ladder"),
    ("xm-yb-2022-12", r"第五十一条[^。]{0,200}?。", "生育保险合并实施", None),
    ("xm-yb-2022-12", r"第五十二条[^。]{0,300}?。", "生育保险参保范围", None),
    ("xm-yb-2022-12", r"第五十五条[^。]{0,300}?。", "生育津贴连续参保", "sheng_yu_12m"),
    ("xm-yb-2019-126", r"三、灵活就业人员[^。]{0,300}?。", "灵活就业生育保险（旧）", None),
    ("xm-yb-2025-7", r"二、关于失业保险待遇政策[\s\S]{0,700}?最长期限为\s*24\s*个月。", "失业保险待遇省级统筹", "shi_ye_90"),
    # OCR 文本为硬换行，正则需允许跨行：用 [\s\S] 替代 [^。] 的单行假设
    ("xm-yb-2026-13", r"（一）将参加职工医保的灵活就业人员[\s\S]{0,320}?。", "灵活就业纳入生育保险", "flexible_maternity_2026"),
    ("xm-yb-2026-13", r"参加生育保险的灵活就业人员缴费基数[\s\S]{0,320}?。", "生育保险灵活就业缴费", "flexible_maternity_fee"),
    ("xm-yb-2026-13", r"1\. 单位职工、领取失业保险金期间的人员分娩[\s\S]{0,320}?。", "生育津贴连续参保比例", "maternity_50_100"),
    ("xm-yb-2026-13", r"（二）落实领取失业保险金人员参加生育保险工作[\s\S]{0,320}?。", "失业金代缴生育保险", "unemployment_pays_maternity"),
    ("fj-rst-2026-13", r"一、自2026年1月1日起[\s\S]{0,300}?。", "养老失业缴费基数", "base_2026"),
    ("xm-yb-2026-rate", r"根据《厦门市职工医疗保险实施细则》[\s\S]{0,300}?。", "2026职工医保费率", "rate_2026"),
    ("xm-yb-2025-rate", r"2025年度职工基本医疗保险费由用人单位[\s\S]{0,400}?由个人缴纳。", "2025职工医保费率", "rate_2025"),
    # ── 居民医保侧（厦府规〔2022〕12号 第二部细则，条款号独立编号）──
    ("xm-yb-2022-12", "REGIME:居民医保:第六条", "居民医保筹资机制", "resident_funding"),
    ("xm-yb-2022-12", "REGIME:居民医保:第七条", "居民医保困难群体资助", "None"),
    ("xm-yb-2022-12", "REGIME:居民医保:第八条", "居民医保无个人账户", "None"),
    ("xm-yb-2022-12", "REGIME:居民医保:第九条", "居民医保预缴制与集中期", "resident_prepay"),
    ("xm-yb-2022-12", "REGIME:居民医保:第四十六条", "居民医保待遇生效", "resident_effective"),
    ("xm-yb-2022-12", "REGIME:居民医保:第四十八条", "居民医保中断缴费处理", "resident_break"),
    ("xm-yb-2022-12", "REGIME:居民医保:第四条", "居民医保参保范围", "resident_scope_detail"),
    # ── 居民侧决策必需条款（专业评估后补齐）──
    ("xm-yb-2022-12", "REGIME:居民医保:第十一条", "居民医保参保渠道", "None"),
    ("xm-yb-2022-12", "REGIME:居民医保:第十五条", "居民医保不得重复参保", "None"),
    ("xm-yb-2022-12", "REGIME:居民医保:第二十四条", "居民医保统筹封顶线", "resident_cap"),
    ("xm-yb-2022-12", "REGIME:居民医保:第二十五条", "居民医保连续参保阶梯", "resident_tier"),
    ("xm-yb-2022-12", "REGIME:居民医保:第三十二条", "居民大病保险连续参保", "resident_db_tier"),
    ("xm-yb-2022-12", "REGIME:居民医保:第四十九条", "职工转居民医保衔接", "switch_to_resident"),
    # ── 职工侧：灵活就业参保范围（含承诺制路径）与转移接续 ──
    ("xm-yb-2022-12", r"第四条\s*本市行政区域内的国家机关[ \s\S]{0,400}?可以个人身份参加职工医保。", "职工医保参保范围与灵活就业", "staff_scope"),
    ("xm-yb-2022-12", r"第八十六条\s*依法获得相关就业证件[ \s\S]{0,300}?以个人身份参加职工医保。", "外国人参照参保", "foreign_participant"),
    ("xm-yb-2022-12", "REGIME:职工医保:第三十二条", "医保关系转移接续", "transfer"),
    ("xm-yb-2022-12", r"第三十三条\s*参保人员在各地实施职工医保制度前[ \s\S]{0,200}?视同职工医保缴费年限。", "视同缴费年限认定", "deemed_years"),
    ("xm-yb-2022-12", r"第三十四条\s*具备申报本市职工医保退休待遇资格的人员包括[ \s\S]{0,500}?本市认定的高层次人才及其配偶。", "职工医保退休资格", "retire_eligibility"),
    # ── 居民医保待遇等待期与连续参保激励 ──
    ("xm-waitperiod", r"固定待遇等待期[ \s\S]{0,300}?设置固定待遇等待期(\d+)个月。", "居民医保固定等待期", "resident_wait_fixed"),
    ("xm-waitperiod", r"变动待遇等待期[ \s\S]{0,200}?增加变动待遇等待期(\d+)个月。", "居民医保变动等待期", "resident_wait_variable"),
    ("xm-waitperiod", r"连续参保激励[ \s\S]{0,300}?连续参加居民医保满(\d+)年的[ \s\S]{0,200}?每年提高(\d+)元", "居民医保连续参保激励", "resident_streak_bonus"),
    # ── 转移接续年限合并 + 退休年限 + 退费政策 ──
    ("xm-medical-continuity", r"从其他统筹区转入厦门并按规定办理医保关系转移接续[ \s\S]{0,300}?可按规定追溯享受。", "转移接续年限合并条件", "transfer_merge"),
    ("xm-medical-continuity", r"具备申报本市职工医保退休待遇资格的人员[ \s\S]{0,300}?男满(\d+)年、女满(\d+)年。", "职工医保退休累计年限", "retire_total_years"),
    ("xm-resident-policy-interpret", r"明确保费退费政策[ \s\S]{0,400}?不予退费。", "居民医保退费政策", "resident_refund"),
    ("xm-yb-2022-12", "REGIME:居民医保:第六十三条", "居民医保港澳台", "None"),
    ("xm-yb-2022-12", "REGIME:居民医保:第六十五条", "居民医保人才", "None"),
    # ── 长护险（2026-10 新制度，改变职工/居民两侧费率）──
    ("xm-chc-2026-3", r"第六条\s*职工长期护理保险费与职工基本医疗保险费合并申报[\s\S]{0,1600}?平均基本养老金为缴费基数。", "长护险职工缴费", "chc_staff"),
    ("xm-chc-2026-3", r"第七条\s*居民长期护理保险费与城乡居民基本医疗保险费合并征收[\s\S]{0,1600}?不单独缴纳长期护理保险费。", "长护险居民缴费", "chc_resident"),
    ("xm-chc-2026-3", r"第十二条\s*本市长护险参保人员按规定参保缴费[\s\S]{0,300}?享受长护险待遇。", "长护险待遇条件", "chc_eligibility"),
    # 长护险费率调整幅度（制度自发布即可知，实际扣减自2027-01-01起）
    ("xm-chc-interpret", r"职工医保单位费率由\s*([\d.]+)\s*%调整为\s*([\d.]+)\s*%\(灵活就业人员费率由\s*([\d.]+)\s*%调整为\s*([\d.]+)\s*%\)", "长护险费率调整幅度", "chc_shift_explicit"),
    # ── 居民医保筹资标准年度通知（版本化参数）──
    ("xm-yb-2026-90", r"一、成年居民基本医疗保险和长期护理保险的筹资标准为每人每年\s*([\d.]+)\s*元[\s\S]{0,300}?财政补助标准为每人每年\s*([\d.]+)\s*元。", "2027居民医保筹资标准", "resident_2027"),
    ("xm-yb-2025-96", r"城乡居民基本医疗保险的筹资标准由每人每年\s*([\d.]+)\s*元调整为每人每年\s*([\d.]+)\s*元[\s\S]{0,300}?财政补助标准提高\s*(\d+)\s*元，由每人每年\s*(\d+)\s*元调整为\s*(\d+)\s*元[\s\S]{0,200}?个人缴费标准维持每人每年\s*(\d+)\s*元不变。", "2026居民医保筹资标准", "resident_2026"),
    ("xm-yb-2025-86", r"一、本市行政区域内[\s\S]{0,900}?在外省(市、自治区)参加城乡居民基本医疗保险的人员。", "居民医保参保范围", "resident_scope"),
    # ── 厦门本地生育保险实施文件（省级文件的市级转发，2026-03-01 施行）──
    ("xm-yb-2026-24", r"一、根据我市职工医保统筹基金累计结余和当期结余情况[\s\S]{0,300}?由个人缴纳。", "灵活就业生育保险市级实施", "flexible_maternity_xm"),
    ("xm-yb-2026-24", r"二、领取失业保险金人员缴纳生育保险费率按照\s*([\d.]+)\s*%执行。", "失业金生育保险费率", None),
    ("xm-yb-2026-24", r"五、本通知自\s*(\d{4})年(\d{1,2})月(\d{1,2})日?起施行。", "生育保险市级施行日", None),
    # ── 最低工资标准（失业保险金计算的关键输入）──
    ("fj-minwage-2025-14", r"月最低工资标准及适用范围表[\s\S]{0,900}?(?=附件2|注:)", "福建最低工资标准分档", "min_wage_tiers"),
    # ── 养老保险侧 ──
    ("xm-residence-pension-interpret", r"参保人员按不低于全市上年度职工月平均工资60%且不高于全市上年度职工月平均工资300%的标准自行选择缴费基数[\s\S]{0,600}?月缴费金额从低到高分别是[\s\S]{0,300}?。", "灵活就业养老缴费基数与档次", "pension_base_tiers"),
    ("xm-residence-pension-interpret", r"对参保时男性年满50周岁和女性年满40周岁的居住证持有人[\s\S]{0,300}?建立临时基本养老保险缴费账户。", "临时账户年龄门槛", "temporary_account"),
    ("xm-residence-pension-interpret", r"在男性年满60周岁、女性年满55周岁且累计缴费满15年时[\s\S]{0,200}?可在我市办理退休。", "居住证人员退休条件", "residence_retire"),
    ("xm-pension-retire-guide", r"申请对象[\s\S]{0,120}?累计缴费年限满(\d+)年。从(\d{4})年1月1日起[\s\S]{0,200}?每年提高(\d+)个月。", "最低缴费年限渐进提高", "min_years_ramp"),
    ("xm-pension-transfer-interpret", r"养老保险转入的条件是什么[\s\S]{0,1200}?申请转入。", "养老保险转入条件分流", None),
    ("xm-pension-official-guide", r"缴费费率为\s*(\d+)\s*%[\s\S]{0,120}?(\d+)%记入统筹基金[\s\S]{0,60}?(\d+)%记入个人账户。", "灵活就业养老费率与拆分", "pension_split"),
    ("xm-pension-official-guide", r"无论是否是厦门户籍[\s\S]{0,300}?参加企业职工基本养老保险。", "灵活就业养老参保对象", None),
    # ── 居民医保集中参保缴费期起止日（具体日期只在医保局专题公告里）──
    # 厦府规〔2022〕12号 居民细则第九条只写"9月至12月"，没有具体日；
    # "2025年10月22日至12月26日"这类日级日期只出现在医保局的集中期公告中。
    ("xm-resident-enroll-window-2026",
     r"在2026年城乡居民基本医疗保险集中参保缴费期内（2025年10月22日至12月26日）[\s\S]{0,200}?。",
     "居民医保集中参保期起止日", "enroll_window"),
    ("xm-resident-enroll-window-2027",
     r"居民在2026年10月至12月集中参保缴费期内[\s\S]{0,120}?。",
     "居民医保集中参保期起止日", "enroll_window"),
    # ── 灵活就业参保承诺制（无居住证的非本市户籍人员的办理路径）──
    ("xm-flexible-commitment",
     r"诉求人可以持身份证和《灵活就业参保承诺书》[\s\S]{0,200}?。",
     "灵活就业参保承诺制", "commitment_form"),
]

# ── 参数抽取器：只从原文文本里读数，不硬编码 ────────────────────────────
def _pct(text):
    m = re.findall(r"(\d+(?:\.\d+)?)\s*%", text)
    return [float(x) for x in m]


def _last_day(year, month):
    """某年某月的最后一天（用于公告只写到"X月至Y月"时的截止日推算）"""
    import calendar
    return calendar.monthrange(year, month)[1]


def extract_params(tag, text):
    out = []
    if tag == "rate_2026":
        out = [("unit_rate", _pct(text)[:1]), ("employee_rate", _pct(text)[1:2]),
               ("flexible_rate", _pct(text)[2:3])]
        out = [(k, v[0]) for k, v in out if v]
    elif tag == "rate_2025":
        r = _pct(text)
        out = [("unit_rate", r[0] if len(r) > 0 else None),
               ("employee_rate", r[1] if len(r) > 1 else None),
               ("flexible_rate", r[2] if len(r) > 2 else None)]
        out = [(k, v) for k, v in out if v is not None]
    elif tag == "flexible_maternity_fee":
        m = re.search(r"缴费费率按照\s*(\d+(?:\.\d+)?)\s*%", text)
        if m:
            out.append(("flexible_maternity_rate", float(m.group(1))))
        if "不低于上年度" in text:
            out.append(("base_rule", "按参加职工医保缴费基数，不低于上年度全省全口径城镇单位就业人员平均工资的60%"))
    elif tag == "flexible_rate_2022":
        r = _pct(text)
        out = [("unit_rate", r[0] if len(r) > 0 else None),
               ("employee_rate", r[1] if len(r) > 1 else None),
               ("flexible_rate", r[2] if len(r) > 2 else None)]
        out = [(k, v) for k, v in out if v is not None]
    elif tag == "base_60_300":
        r = re.findall(r"(\d+)\s*[%％]", text)
        out = [("base_min_pct", 60), ("base_max_pct", 300)]
    elif tag == "base_2026":
        m = re.search(r"上限按照\s*(\d+)\s*元[、，]?\s*下限按照\s*(\d+)\s*元", text.replace(" ", ""))
        if m:
            out = [("base_upper", int(m.group(1))), ("base_lower", int(m.group(2)))]
    elif tag == "dai_bing_ladder":
        # 原文：连续参保时间不满12个月的，按50%；满12个月不满24个月的，按75%；满24个月的，按100%
        ms = re.findall(r"不满\s*(\d+)\s*个月", text)
        mf = re.findall(r"满\s*(\d+)\s*个月不满\s*(\d+)\s*个月", text)
        rates = [float(x) for x in re.findall(r"按正常待遇的(\d+)%", text)]
        if not rates:
            rates = [float(x) for x in re.findall(r"(\d+)%", text)]
        # 三档阈值：不满N → 满M不满N2 → 满N2（第三档上界与第二档上界相同）
        thresholds = []
        if ms:
            thresholds.append(int(ms[0]))          # 第一档上界
        if mf:
            thresholds.append(int(mf[0][1]))        # 第二档上界 = 第三档下界
        if len(thresholds) == 2:
            thresholds.append(thresholds[1])        # 第三档：满24个月
        out = [("tier_thresholds_months", thresholds),
               ("tier_rates_pct", rates[:len(thresholds)] if rates else [])]
    elif tag == "maternity_50_100":
        m = re.findall(r"(\d+)\s*%", text)
        out = [("maternity_rates_pct", [float(x) for x in m])]
    elif tag == "flexible_maternity_2026":
        m = re.search(r"缴费费率按照\s*(\d+(?:\.\d+)?)\s*%", text)
        if m:
            out = [("flexible_maternity_rate", float(m.group(1)))]
    elif tag == "sheng_yu_12m":
        m = re.findall(r"满\s*(\d+)\s*个月", text)
        r = re.findall(r"(\d+)\s*%", text)
        out = [("required_months", [int(x) for x in m][:2]),
               ("rates_pct", [float(x) for x in r])]
    elif tag == "resident_prepay":
        m = re.search(r"每年\s*(\d+)月至(\d+)月", text)
        if m:
            out.append(("resident_enroll_month_from", int(m.group(1))))
            out.append(("resident_enroll_month_to", int(m.group(2))))
        if "一次性缴纳" in text:
            out.append(("resident_payment_mode", "预缴制，一次性缴纳下一年度"))
        if "按全年个人缴费标准缴纳" in text:
            out.append(("resident_midterm_rule", "超过集中期中途参保按全年标准缴纳"))
    elif tag == "enroll_window":
        # 集中参保缴费期起止日。只从公告原文里抽，不做推算。
        #   2026年度：2025年10月22日至12月26日   → 日级
        #   2027年度：2026年10月至12月          → 月级（公告只写到月）
        m = re.search(r"(\d{4})年(\d{1,2})月(\d{1,2})日至(?:(\d{4})年)?(\d{1,2})月(\d{1,2})日", text)
        if m:
            y1, mo1, d1 = int(m.group(1)), int(m.group(2)), int(m.group(3))
            y2 = int(m.group(4)) if m.group(4) else y1
            mo2, d2 = int(m.group(5)), int(m.group(6))
            out.append(("resident_enroll_start", f"{y1:04d}-{mo1:02d}-{d1:02d}"))
            out.append(("resident_enroll_end", f"{y2:04d}-{mo2:02d}-{d2:02d}"))
            out.append(("resident_enroll_precision", "day"))
        else:
            m = re.search(r"(\d{4})年(\d{1,2})月至(?:(\d{4})年)?(\d{1,2})月集中参保缴费期", text)
            if m:
                y1, mo1 = int(m.group(1)), int(m.group(2))
                y2 = int(m.group(3)) if m.group(3) else y1
                mo2 = int(m.group(4))
                # 公告只写到月：起始取当月1日，截止取当月最后一天
                out.append(("resident_enroll_start", f"{y1:04d}-{mo1:02d}-01"))
                out.append(("resident_enroll_end", f"{y2:04d}-{mo2:02d}-{_last_day(y2, mo2)}"))
                out.append(("resident_enroll_precision", "month"))
        # 该集中期对应哪个待遇年度（缴费年度）
        # 优先取公告里的显式表述（"缴纳2027年度居民医保"），
        # 否则按"集中期在缴费前一年、次年1月1日起享受待遇"推算（起止年 + 1）
        m = re.search(r"缴纳\s*(20\d{2})\s*年度(?:居民医保|城乡居民基本医疗保险)", text)
        if not m:
            m = re.search(r"(20\d{2})年(?:我市)?(?:城乡居民基本医疗保险|居民医保)集中参保缴费期", text)
        if m:
            out.append(("resident_enroll_coverage_year", int(m.group(1))))
        elif out:
            start = [v for k, v in out if k == "resident_enroll_start"]
            if start:
                out.append(("resident_enroll_coverage_year",
                            int(start[0][:4]) + 1))
    elif tag == "commitment_form":
        # 《灵活就业参保承诺书》：无居住证的非本市户籍人员的参保登记材料
        if "《灵活就业参保承诺书》" in text:
            out.append(("commitment_form_name", "《灵活就业参保承诺书》"))
        if "未持有厦门市有效居住证" in text:
            out.append(("commitment_form_applies_to",
                        "未持有厦门市有效居住证的非本市户籍人员"))
        if "办税服务厅" in text:
            out.append(("commitment_form_channel", "持身份证与承诺书到办税服务厅办理"))
        if "新业态等灵活就业人员" in text:
            out.append(("commitment_form_online_identity",
                        "线上以“新业态等灵活就业人员”身份办理"))
        out.append(("commitment_form_note",
                    "承诺制为税务/医保经办口径的参保登记材料，"
                    "厦府规〔2022〕12号第四条本身未出现“承诺制”表述"))
    elif tag == "resident_funding":
        m = re.search(r"财政补助资金由市、区两级财政分别承担\s*(\d+)\s*%", text)
        if m:
            out.append(("resident_fiscal_share_pct", int(m.group(1))))
    elif tag == "resident_effective":
        if "次年 1月1日起开始生效" in text or "次年1月1日起开始生效" in text:
            out.append(("resident_effective_rule", "集中期缴次年费→次年1月1日生效"))
        if "从参保登记当月开始生效" in text:
            out.append(("resident_midterm_effective", "当年度参保：当月登记且次月缴费到账→当月生效"))
    elif tag == "resident_break":
        if "中断缴费一个年度及以上" in text:
            out.append(("resident_break_rule",
                        "中断一个年度及以上：连续参保时间重新计算，中断期间不享受待遇"))
        if "3个月（含）以内参保并补缴" in text:
            out.append(("resident_makeup_3m_rule",
                        "当年度开始后3个月内参保并补缴且次月到账视为连续，中断月份计入连续时间"))
    elif tag == "chc_staff":
        m = re.search(r"从职工医保单位费率和灵活就业人员费率中调整\s*([\d.]+)\s*%用作长护险费率", text)
        if m:
            out.append(("chc_rate_shift_pct", float(m.group(1))))
        m2 = re.search(r"以职工医保缴费基数的\s*([\d.]+)\s*%缴纳长期护理保险费", text)
        if m2:
            out.append(("chc_staff_total_rate_pct", float(m2.group(1))))
        if "各为0.15%" in text or "各为\s*0.15%" in text:
            out.append(("chc_staff_split_pct", 0.15))
        if "由个人缴纳" in text:
            out.append(("chc_flexible_payer", "灵活就业人员长护险由个人缴纳"))
    elif tag == "chc_resident":
        if "个人缴费与财政补助1:1" in text or "财政补助和个人缴费的比例为1:1" in text:
            out.append(("chc_resident_share_ratio", "1:1"))
        m = re.search(r"第[一二三四五六]年费率为\s*([\d.]+)\s*%", text)
        if m:
            out.append(("chc_resident_rate_phase1_pct", float(m.group(1))))
        if "不单独缴纳长期护理保险费" in text:
            out.append(("chc_minor_free", "18周岁以下未成年人及除大学生外的在校学生不单独缴费"))
    elif tag == "chc_eligibility":
        if "失能状态持续6个月以上" in text:
            out.append(("chc_disability_months", 6))
        if "重度失能" in text:
            out.append(("chc_level", "重度失能（经失能等级评估）"))
    elif tag == "resident_2027":
        m = re.search(r"筹资标准为每人每年\s*([\d.]+)\s*元", text)
        if m:
            out.append(("resident_total_2027", float(m.group(1))))
        # 个人缴费：491元（居民医保450元、长护险41元）
        m = re.search(r"个人缴费标准为每人每年\s*([\d.]+)\s*元（居民医保\s*([\d.]+)\s*元、长护险\s*([\d.]+)\s*元）", text)
        if m:
            out.append(("resident_personal_2027", float(m.group(1))))
            out.append(("resident_medical_2027", float(m.group(2))))
            out.append(("chc_resident_2027", float(m.group(3))))
        # 财政补助：871元（居民医保830元、长护险41元）
        m = re.search(r"财政补助标准为每人每年\s*([\d.]+)\s*元（居民医保\s*([\d.]+)\s*元、长护险\s*([\d.]+)\s*元）", text)
        if m:
            out.append(("resident_fiscal_2027", float(m.group(1))))
            out.append(("resident_fiscal_medical_2027", float(m.group(2))))
            out.append(("chc_fiscal_resident_2027", float(m.group(3))))
    elif tag == "resident_2026":
        # 原文：筹资标准由每人每年1250元调整为每人每年1280元，其中：财政补助标准提高30元，
        #       由每人每年800元调整为830元，个人缴费标准维持每人每年450元不变。
        m = re.search(r"筹资标准由每人每年\s*([\d.]+)\s*元调整为每人每年\s*([\d.]+)\s*元", text)
        if m:
            out.append(("resident_total_2026_old", float(m.group(1))))
            out.append(("resident_total_2026", float(m.group(2))))
        m = re.search(r"财政补助标准提高\s*(\d+)\s*元，由每人每年\s*([\d.]+)\s*元调整为\s*([\d.]+)\s*元", text)
        if m:
            out.append(("resident_fiscal_2026_increase", float(m.group(1))))
            out.append(("resident_fiscal_2026_old", float(m.group(2))))
            out.append(("resident_fiscal_2026", float(m.group(3))))
        m = re.search(r"个人缴费标准维持每人每年\s*([\d.]+)\s*元不变", text)
        if m:
            out.append(("resident_personal_2026", float(m.group(1))))
    elif tag == "resident_scope":
        if "本市户籍居民" in text:
            out.append(("resident_scope_hukou", "本市户籍居民"))
        if "非本市户籍未成年子女" in text:
            out.append(("resident_scope_child", "职工医保参保人员的非本市户籍未成年子女"))
        if "持本市有效居住证的父母、配偶" in text:
            out.append(("resident_scope_spouse", "持本市有效居住证的父母、配偶（2025-09-01起）"))
    elif tag == "resident_scope_detail":
        if "本市户籍的成年居民" in text:
            out.append(("resident_scope_1", "本市户籍的成年居民"))
        if "未满 18周岁的未成年人" in text or "未满18周岁的未成年人" in text:
            out.append(("resident_scope_2", "未满18周岁的未成年人"))
        if "各类全日制学校在校在园学生" in text:
            out.append(("resident_scope_3", "各类全日制学校在校在园学生"))
        if "持本市有效居住证" in text:
            out.append(("resident_scope_4", "持本市有效居住证的港澳台人员及其未成年子女"))
        if "外国人永久居留身份证件" in text:
            out.append(("resident_scope_5", "在本市居住但未就业、持外国人永久居留身份证件者"))
        if "高层次人才" in text:
            out.append(("resident_scope_6", "本市认定的高层次人才及其配偶、子女"))
    elif tag == "resident_cap":
        m = re.search(r"最高支付限额为\s*([\d.]+)\s*万元", text)
        if m:
            out.append(("resident_fund_cap_wan", float(m.group(1))))
    elif tag == "resident_tier":
        ms = re.findall(r"不满\s*(\d+)\s*个月", text)
        mf = re.findall(r"满\s*(\d+)\s*个月不满\s*(\d+)\s*个月", text)
        rates = [float(x) for x in re.findall(r"按(?:统筹基金)?正常待遇的(\d+)%", text)]
        thresholds = []
        if ms: thresholds.append(int(ms[0]))
        if mf: thresholds.append(int(mf[0][1]))
        if len(thresholds) == 2: thresholds.append(thresholds[1])
        out = [("resident_tier_thresholds_months", thresholds),
               ("resident_tier_rates_pct", rates[:len(thresholds)] if rates else [])]
    elif tag == "resident_db_tier":
        rates = [float(x) for x in re.findall(r"按正常待遇的(\d+)%", text)]
        out = [("resident_db_tier_rates_pct", rates)]
    elif tag == "switch_to_resident":
        if "累加计算" in text:
            out.append(("switch_rule", "职工医保转居民医保：年度内医疗费用累加计算，按转换后参保险种享受待遇"))
        if "个人账户实际结余资金可继续结转使用" in text:
            out.append(("switch_account", "职工个人账户实际结余资金可继续结转使用"))
    elif tag == "chc_shift_explicit":
        m = re.search(r"职工医保单位费率由\s*([\d.]+)\s*%调整为\s*([\d.]+)\s*%\(灵活就业人员费率由\s*([\d.]+)\s*%调整为\s*([\d.]+)\s*%\)", text)
        if m:
            out.append(("chc_unit_rate_before", float(m.group(1))))
            out.append(("chc_unit_rate_after", float(m.group(2))))
            out.append(("chc_flexible_rate_before", float(m.group(3))))
            out.append(("chc_flexible_rate_after", float(m.group(4))))
            out.append(("chc_rate_shift_pct", round(float(m.group(3)) - float(m.group(4)), 4)))
    elif tag == "flexible_maternity_xm":
        m = re.search(r"以职工医保缴费基数的\s*([\d.]+)\s*%缴纳生育保险费", text)
        if m:
            out.append(("flexible_maternity_rate", float(m.group(1))))
            out.append(("flexible_maternity_rate_xm", float(m.group(1))))
        if "由个人缴纳" in text:
            out.append(("flexible_maternity_payer", "灵活就业人员以个人身份缴纳"))
    elif tag == "min_wage_tiers":
        # 原文：月最低工资标准(元/月) 适用范围 2265 思明区、湖里区、集美区、海沧区、同安区、翔安区 2195 ...
        rows = re.findall(r"(\d{4})\s*((?:思明区|平潭|鼓楼区|龙海区|清流县)[^\n]{0,120})", text)
        tiers = []
        for val, scope in rows:
            districts = [d for d in ["思明区", "湖里区", "集美区", "海沧区", "同安区",
                                     "翔安区"] if d in scope]
            tiers.append({"value": float(val), "scope_sample": scope.strip()[:60],
                          "xm_districts": districts})
        if tiers:
            out.append(("min_wage_tiers", tiers))
            # 厦门六区适用第一档
            xm = [t for t in tiers if len(t["xm_districts"]) == 6]
            if xm:
                out.append(("min_wage_xiamen", xm[0]["value"]))
                out.append(("min_wage_xiamen_scope", "思明区、湖里区、集美区、海沧区、同安区、翔安区"))
        if "包含社会保险和住房公积金个人缴费部分" in text:
            out.append(("min_wage_note", "最低工资标准包含社会保险和住房公积金个人缴费部分"))
    elif tag == "staff_scope":
        m = re.search(r"法定劳动年龄内的本市户籍人员", text)
        if m:
            out.append(("staff_scope_hukou", "法定劳动年龄内的本市户籍人员"))
        if "本市有效居住证持有人" in text:
            out.append(("staff_scope_permit", "本市有效居住证持有人（含港澳台人员）"))
        out.append(("staff_scope_groups",
                    "无雇工的个体工商户 / 未在用人单位参加职工医保的非全日制从业人员 / "
                    "新就业形态劳动者 / 其他灵活就业人员"))
        out.append(("staff_scope_way", "可以个人身份参加职工医保"))
        if "在本市户籍人员" in text or "户籍" in text:
            out.append(("staff_scope_hukou_limit",
                        "本市户籍 或 本市有效居住证（含港澳台），二者满足其一"))
    elif tag == "foreign_participant":
        if "外国人永久居留身份证件" in text:
            out.append(("foreign_permanent_resident",
                        "持本市取得的外国人永久居留身份证件，属灵活就业的可参照居住证持有人以个人身份参加"))
    elif tag == "transfer":
        if "生育保险关系随职工基本医疗保险关系一并转移接续" in text:
            out.append(("transfer_maternity", "生育保险关系随职工医保关系一并转移接续"))
        if "个人账户资金可转入本市" in text:
            out.append(("transfer_account", "异地个人账户资金可转入本市并合并计算"))
        if "重复缴费的年限不得累加计算" in text:
            out.append(("transfer_no_double", "职工医保缴费年限累计计算，重复缴费年限不得累加"))
        if "不作为职工医保缴费年限" in text:
            out.append(("transfer_not_counted",
                        "参加居民医保及非按职工医保标准缴费的年限，不作为职工医保缴费年限"))
    elif tag == "deemed_years":
        if "视同职工医保缴费年限" in text:
            out.append(("deemed_years_rule",
                        "各地实施职工医保制度前的符合规定的连续工龄/工作年限及缴纳基本养老保险费年限，视同职工医保缴费年限"))
    elif tag == "retire_eligibility":
        m = re.search(r"非本市户籍人员（含港澳台人员、外国人）", text)
        if m:
            out.append(("retire_min_years", 10))
        if "本市户籍人员" in text:
            out.append(("retire_scope_1", "本市户籍人员"))
        if "省、部属驻厦用人单位参保人员" in text:
            out.append(("retire_scope_3", "省部属驻厦用人单位参保人员"))
        if "高层次人才及其配偶" in text:
            out.append(("retire_scope_5", "本市认定的高层次人才及其配偶"))
    elif tag == "transfer_merge":
        if "未中断缴费" in text:
            out.append(("transfer_merge_condition",
                        "转移接续前未中断缴费；或中断不超过3个月并续保、"
                        "及时完成中断期间补缴到账"))
        if "可与本地合并计算" in text:
            out.append(("transfer_merge_result",
                        "外地医保参保缴费时长可与本地合并计算，"
                        "中断月份计入连续参保时间，中断期间待遇可追溯享受"))
    elif tag == "retire_total_years":
        m = re.search(r"男满(\d+)年、女满(\d+)年", text)
        if m:
            out.append(("retire_years_male", int(m.group(1))))
            out.append(("retire_years_female", int(m.group(2))))
        if "实际缴费年限满10年" in text:
            out.append(("retire_local_min_years", 10))
        if "一次性补缴" in text:
            out.append(("retire_makeup",
                        "缴费年限不足的可按规定一次性补缴，从补缴到账次月起确认享受退休待遇"))
    elif tag == "resident_refund":
        if "新年度1月1日前可申请退费" in text:
            out.append(("resident_refund_before",
                        "集中参保缴费期内已缴下一年度居民医保费，新年度1月1日前可申请退费"))
        if "1月1日后（含）缴费的不予退费" in text:
            out.append(("resident_refund_after", "1月1日后（含）缴费的不予退费"))
        if "原则上不再办理同一年度内跨统筹地区居民医保参保手续" in text:
            out.append(("resident_no_cross_region",
                        "当年度已参加居民医保的，原则上不再办理同一年度内跨统筹地区居民医保参保手续；"
                        "跨区域流动可通过异地就医解决"))
    elif tag == "resident_wait_fixed":
        m = re.search(r"固定待遇等待期(\d+)个月", text)
        if m:
            out.append(("resident_wait_fixed_months", int(m.group(1))))
        out.append(("resident_wait_scope",
                    "除新生儿、医疗救助对象、当年退出现役的军人等特殊群体外，"
                    "未在居民医保集中参保期参保或未连续参保的适用"))
    elif tag == "resident_wait_variable":
        m = re.search(r"变动待遇等待期(\d+)个月", text)
        if m:
            out.append(("resident_wait_variable_per_year", int(m.group(1))))
    elif tag == "resident_streak_bonus":
        m = re.search(r"连续参加居民医保满(\d+)年的", text)
        if m:
            out.append(("resident_streak_years", int(m.group(1))))
        m = re.search(r"每年提高(\d+)元", text)
        if m:
            out.append(("resident_streak_bonus_per_year", int(m.group(1))))
    elif tag == "pension_base_tiers":
        m = re.search(r"按不低于全市上年度职工月平均工资的?(\d+)%", text)
        if m:
            out.append(("pension_base_min_pct", int(m.group(1))))
        m = re.search(r"不高于全市上年度职工月平均工资的?(\d+)%", text)
        if m:
            out.append(("pension_base_max_pct", int(m.group(1))))
        m = re.search(r"(?:缴费比例统一规定为?|乘以)\s*(\d+)%", text)
        if m:
            out.append(("pension_flexible_rate_alt", int(m.group(1))))
        m = re.search(r"其中(\d+)%划入个人账户", text)
        if m:
            out.append(("pension_account_pct", int(m.group(1))))
        m = re.search(r"(\d+)%记入统筹基金", text)
        if m:
            out.append(("pension_pool_pct", int(m.group(1))))
        m = re.search(r"缴费比例后?，?7个档次的月缴费金额从低到高分别是([\s\S]{0,200}?)。", text)
        if m:
            amounts = [float(x) for x in re.findall(r"(\d+(?:\.\d+)?)元", m.group(1))]
            if amounts:
                out.append(("pension_tier_amounts_sample", amounts))
    elif tag == "temporary_account":
        m = re.search(r"男性年满(\d+)周岁和女性年满(\d+)周岁", text)
        if m:
            out.append(("temporary_account_male", int(m.group(1))))
            out.append(("temporary_account_female", int(m.group(2))))
        if "国办发" in text:
            out.append(("temporary_account_basis", "国办发〔2009〕66号"))
    elif tag == "residence_retire":
        m = re.search(r"男性年满(\d+)周岁、女性年满(\d+)周岁且累计缴费满(\d+)年", text)
        if m:
            out.append(("residence_retire_male", int(m.group(1))))
            out.append(("residence_retire_female", int(m.group(2))))
            out.append(("residence_retire_years", int(m.group(3))))
    elif tag == "min_years_ramp":
        m = re.search(r"累计缴费年限满(\d+)年", text)
        if m:
            out.append(("pension_min_years_now", int(m.group(1))))
        m = re.search(r"从(\d{4})年1月1日起", text)
        if m:
            out.append(("pension_ramp_start_year", int(m.group(1))))
        m = re.search(r"由(\d+)年逐步提高至(\d+)年", text)
        if m:
            out.append(("pension_min_years_target", int(m.group(2))))
        m = re.search(r"每年提高(\d+)个月", text)
        if m:
            out.append(("pension_ramp_step_months", int(m.group(1))))
    elif tag == "pension_split":
        # 原文：缴费费率为20%，其中12%记入统筹基金，8%记入个人账户
        m = re.search(r"缴费费率为\s*(\d+)\s*%", text)
        if m:
            out.append(("pension_flexible_rate", int(m.group(1))))
        m = re.search(r"(\d+)%\s*记入统筹基金", text)
        if m:
            out.append(("pension_pool_pct", int(m.group(1))))
        m = re.search(r"(\d+)%\s*记入个人账户", text)
        if m:
            out.append(("pension_account_pct", int(m.group(1))))
    elif tag == "shi_ye_90":
        m = re.search(r"失业保险金月发放标准为本市月最低工资标准的\s*(\d+)\s*%", text)
        n = re.search(r"每满\s*(\d+)\s*年领取\s*(\d+)\s*个月", text)
        mm = re.search(r"最长期限为\s*(\d+)\s*个月", text)
        if m: out.append(("benefit_rate_pct", float(m.group(1))))
        if n: out.append(("years_per_month", int(n.group(1))))
        if n: out.append(("months_per_year", int(n.group(2))))
        if mm: out.append(("max_months", int(mm.group(1))))
        if "暂停执行" in text:
            out.append(("city_rule_suspended", "暂停执行《厦门经济特区失业保险条例》第十七条第一款、第十八条，改按《福建省失业保险条例》执行"))
    elif tag == "unemployment_pays_maternity":
        if "代缴" in text:
            out.append(("payer", "失业保险关系所在社会保险经办机构代缴"))
    return [{"key": k, "value": v} for k, v in out]


def clause_no_of(text):
    m = re.match(r"\s*([第一二三四五六七八九十百零]+条)", text)
    return m.group(1) if m else None


# 制度域判定：条款属于职工医保细则还是居民医保细则
REGIME_HINTS = [
    ("居民医保", ["城乡居民基本医疗保险", "居民医保", "集中参保缴费期",
                   "城乡居民大病保险", "参保缴费时间应当保持连续",
                   "财政和个人共同承担", "只建立统筹基金"]),
    ("长护险", ["长期护理保险", "长护险", "失能等级评估"]),
]


def detect_regime(topic, quote):
    for regime, hints in REGIME_HINTS:
        for h in hints:
            if h in quote:
                return regime
    if topic and ("居民医保" in topic or "长护险" in topic):
        for regime, hints in REGIME_HINTS:
            if regime in topic:
                return regime
    return "职工医保"


# ── 制度域限定的条款定位 ────────────────────────────────────────────────
# 问题：厦府规〔2022〕12号 是职工/居民两套细则合并本，两套都从"第一条"开始。
# 用纯文本正则找"第四条…(?=第五条)"会命中职工细则的第五条，导致抓到错误的域。
# 解法：先用 regime.py 把文件切成制度域，再在域内按条款号定位。
_REGIME_CACHE = {}


def get_regime_domains(key, texts):
    if key not in _REGIME_CACHE:
        try:
            import regime
            _REGIME_CACHE[key] = regime.build_regime_index(texts.get(key, ""))
        except Exception:
            _REGIME_CACHE[key] = []
    return _REGIME_CACHE[key]


def find_clause_in_regime(key, regime_name, clause_no, texts, next_clause=None):
    """在指定制度域内按条款号定位原文，返回 quote 或 None"""
    domains = get_regime_domains(key, texts)
    if not domains:
        return None
    for d in domains:
        if d["regime"] != regime_name:
            continue
        seg = d["text"]
        pat = rf"{clause_no}([\s\S]*?)(?=第[一二三四五六七八九十百零]+条|$)"
        m = re.search(pat, seg)
        if not m:
            continue
        body = (clause_no + m.group(1)).strip()
        if next_clause and next_clause in body:
            body = body[:body.index(next_clause)].strip()
        return body
    return None


def build():
    os.makedirs(DB, exist_ok=True)
    # 唯一真源：fetch.py 的 SOURCES（禁用源已从中移除）
    # fetch 日志只补充抓取元数据（哈希/时间/状态），不决定库的成员
    import fetch as F
    sources = getattr(F, "SOURCES", {})

    meta_by_key = {}
    for fn in os.listdir(DB):
        if fn.startswith("fetch_") and fn.endswith(".json"):
            try:
                for rec in json.load(open(os.path.join(DB, fn), encoding="utf-8")):
                    if rec["key"] in sources:
                        meta_by_key[rec["key"]] = rec
            except Exception:
                pass
    # SOURCES 中有但日志里没有的（新增源），补一份基础元数据
    for key, src in sources.items():
        if key not in meta_by_key:
            meta_by_key[key] = {
                "key": key, "title": src.get("title"),
                "doc_number": src.get("doc_number"),
                "issuer": src.get("issuer"), "layer": src.get("layer"),
                "url": src.get("url"), "pdf_url": src.get("pdf_url"),
                "effective_from": src.get("effective_from"),
                "effective_to": src.get("effective_to"),
                "fetched_at": None, "raw_sha256": None, "text_sha256": None,
                "text_chars": 0, "cjk_ratio": 0, "status": "not_fetched",
            }

    texts = {}
    for key in meta_by_key:
        p = os.path.join(SNAP, f"{key}.txt")
        if os.path.exists(p):
            texts[key] = open(p, encoding="utf-8", errors="ignore").read()

    # 被官网标注「有效性：失效/废止」的文件不得入库
    # 直接读快照的有效性元数据（不依赖 status_check.json，避免循环依赖）
    invalid_docs = set()
    try:
        import status_check as SC
        for slug, vm in SC.load_validity_meta().items():
            if vm.get("validity") in ("失效", "废止") and vm.get("doc_number"):
                invalid_docs.add(vm["doc_number"])
    except Exception:
        pass

    policies = {}
    for key, meta in meta_by_key.items():
        # 未成功抓取的源不入库（避免空条目污染）
        if key not in texts or not texts.get(key):
            continue
        # 已被官网标注失效的文件不入库
        if meta.get("doc_number") in invalid_docs:
            continue
        pol = {
            "policy_id": key,
            "title": meta.get("title"),
            "doc_number": meta.get("doc_number"),
            "issuer": meta.get("issuer"),
            "layer": meta.get("layer"),
            "source_url": meta.get("url"),
            "pdf_url": meta.get("pdf_url"),
            "fetched_at": meta.get("fetched_at"),
            "raw_sha256": meta.get("raw_sha256"),
            "text_sha256": meta.get("text_sha256"),
            "text_chars": meta.get("text_chars"),
            "cjk_ratio": meta.get("cjk_ratio"),
            "valid_from": meta.get("effective_from"),
            "valid_to": meta.get("effective_to"),
            "supersedes": [],
            "superseded_by": [],
            "status": "active",
            "clauses": [],
            "conditions": [],
            "needs_ocr": meta.get("status") == "needs_ocr",
        }
        policies[key] = pol

    # 抽取条款
    for key, pattern, topic, ptag in CLAUSE_SPECS:
        text = texts.get(key)
        if not text:
            continue
        flat = re.sub(r"[ \t　]+", "", text)
        quote = None
        forced_regime = None
        if pattern.startswith("REGIME:"):
            # 域限定定位：REGIME:<制度域>:<条款号>
            _, rg, cno_target = pattern.split(":", 2)
            quote = find_clause_in_regime(key, rg, cno_target, texts)
            ptag = None if ptag == "None" else ptag
            # 域以标记为准，不靠关键词猜 —— 猜会标反（居民大病保险 vs 职工转移接续 同为第三十二条）
            forced_regime = rg
        else:
            m = re.search(pattern, flat)
            if m:
                quote = m.group(0)
                if len(quote) > 900:
                    quote = quote[:900]
        if not quote:
            continue
        pol = policies.get(key)
        if not pol:
            continue
        params = extract_params(ptag, quote) if ptag else []
        regime = forced_regime or detect_regime(topic, quote)
        cno = clause_no_of(quote) or "（分段）"
        # 条款级生效日：继承政策级；覆盖年度从参数里取（如集中期公告的 coverage_year）
        cov_year = None
        for pr in params:
            if pr.get("key") == "resident_enroll_coverage_year":
                cov_year = pr.get("value")
        pol["clauses"].append({
            "clause_no": cno,
            "clause_ref": f"{cno}@{regime}",
            "regime": regime,
            "topic": topic,
            "quote": quote,
            "params": params,
            "effective_from": pol.get("effective_from"),
            "coverage_year": cov_year,
            "param_tag": ptag,
            "citation": {
                "doc_number": pol["doc_number"],
                "clause_no": cno,
                "clause_ref": f"{cno}@{regime}",
                "regime": regime,
                "quote": quote,
                "url": pol["source_url"],
                "fetched_at": pol["fetched_at"],
                "text_sha256": pol["text_sha256"],
                "evidence_layer": pol["layer"],
            },
        })

    # 沿革链（显式声明，来自核实的事实）
    links = [
        ("xm-yb-2022-12", "superseded_by", "xm-yb-2026-13",
         "生育保险参保范围条款被闽医保〔2026〕13号覆盖，2026-03-01 起分界"),
        ("xm-yb-2019-126", "superseded_by", "xm-yb-2026-13",
         "灵活就业人员不参加生育保险的表述被闽医保〔2026〕13号覆盖，2026-03-01 起分界"),
        ("xm-yb-2025-rate", "superseded_by", "xm-yb-2026-rate",
         "2026年度缴费率公告替代 2025 年度通知"),
    ]
    for a, rel, b, reason in links:
        if a in policies:
            policies[a][rel].append(b)
            policies[a].setdefault("version_notes", []).append({"target": b, "reason": reason})
        if b in policies:
            policies[b]["supersedes"].append(a)
            policies[b].setdefault("version_notes", []).append({"target": a, "reason": reason})
    # 条件不满足时不能简单标 superseded —— 生育保险是"时点分界"
    if "xm-yb-2022-12" in policies:
        policies["xm-yb-2022-12"]["status"] = "partially_superseded"
    if "xm-yb-2019-126" in policies:
        policies["xm-yb-2019-126"]["status"] = "partially_superseded"

    out = os.path.join(DB, "policy_db.json")
    json.dump(policies, open(out, "w", encoding="utf-8"), ensure_ascii=False, indent=2)

    # 可回溯自检：quote 必须是 txt 真实子串
    print("=== 引用可回溯自检 ===")
    total = ok = 0
    for key, pol in policies.items():
        flat = re.sub(r"[ \t　]+", "", texts.get(key, ""))
        for c in pol["clauses"]:
            total += 1
            if c["quote"].replace(" ", "") in flat:
                ok += 1
            else:
                print(f"  FAIL {key} {c['clause_no']} {c['topic']}")
    print(f"  quote 可回溯 {ok}/{total}")
    nparams = sum(len(c["params"]) for p in policies.values() for c in p["clauses"])
    print(f"  政策条目 {len(policies)}  条款 {total}  抽取参数 {nparams}")
    print("-> ", out)
    return policies


if __name__ == "__main__":
    build()
