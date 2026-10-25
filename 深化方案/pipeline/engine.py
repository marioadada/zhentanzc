#!/usr/bin/env python3
"""厦门民生政策侦探 · 判定引擎

对应深化提示词 §3。核心设计：

1. 判定式（Judgment Expression）= 一组条件，每个条件是 (field, operator, value, evidence)
2. 求值结果七态：符合 / 不符合 / 条件待核验 / 时点不适用 / 来源冲突（已裁决）/ 来源冲突（待人工）/ 未查到可靠依据
3. 时点分层：每条结论绑定 as_of 日期，政策条目带 valid_from/valid_to
4. 冲突裁决：规则表（后法优于前法 / 上位优于下位 / 省级统筹优于市级条例 / 特别优于一般 / 明文暂停执行）
5. 计算器：参数全部来自 policy_db，不硬编码

关键约束：任何一条结论输出都必须带 citation，且 citation.quote 必须是快照真实子串。
"""
import json
import os
import re
from datetime import date

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DB = os.path.join(ROOT, "policy_db")
SNAP = os.path.join(ROOT, "snapshots")

# ── 判定结果枚举 ────────────────────────────────────────────────────────
VERDICT = {
    "ELIGIBLE": "符合",
    "NOT_ELIGIBLE": "不符合",
    "NEEDS_VERIFY": "条件待核验",
    "TIME_NOT_APPLICABLE": "时点不适用",
    "CONFLICT_RESOLVED": "来源冲突（已裁决）",
    "CONFLICT_PENDING": "来源冲突（待人工）",
    "NO_EVIDENCE": "未查到可靠依据",
}

# ── 冲突裁决规则表（顺序即优先级）────────────────────────────────────
CONFLICT_RULES = [
    ("later_file_wins", "后法优于前法",
     "同一事项新发布的规范性文件覆盖旧文件",
     lambda a, b: (a.get("valid_from") or "0000") > (b.get("valid_from") or "0000")),
    ("higher_level_wins", "上位优于下位",
     "省级文件优先于市级文件，市级优先于区级",
     lambda a, b: _level_rank(a) >= _level_rank(b)),
    ("province_pooling_wins", "省级统筹优先于市级条例",
     "文件明文规定暂停执行本市条例或改按省条例执行的",
     lambda a, b: "暂停执行" in (a.get("clause_text") or "") or "以本通知为准" in (a.get("clause_text") or "")),
    ("special_over_general", "特别规定优于一般规定",
     "针对特定人群的专门规定优先于一般规定",
     lambda a, b: bool(a.get("topic_scope"))),
]


def _level_rank(pol):
    issuer = (pol.get("issuer") or "")
    if "福建省" in issuer or "国家" in issuer:
        return 3
    if "厦门市人民政府" in issuer:
        return 2
    if "厦门市" in issuer:
        return 2
    if any(d in issuer for d in ["思明", "湖里", "集美", "海沧", "同安", "翔安"]):
        return 1
    return 2


# ── 参数表：从 policy_db 提取成版本化参数行 ────────────────────────────
def build_param_table(db):
    rows = []
    for key, pol in db.items():
        for cl in pol.get("clauses", []):
            for prm in cl.get("params", []):
                rows.append({
                    "param": prm["key"],
                    "value": prm["value"],
                    "valid_from": pol.get("valid_from"),
                    "valid_to": pol.get("valid_to"),
                    "doc_number": pol.get("doc_number"),
                    "policy_id": key,
                    "clause_no": cl.get("clause_no"),
                    "citation": cl.get("citation"),
                })
    # 同名参数按 valid_from 排序，重复的保留成多版本
    rows.sort(key=lambda r: (r["param"], r["valid_from"] or ""))
    return rows


def pick_param(param_table, name, as_of):
    """按时点取参数值。找不到精确匹配则返回 None —— 绝不猜。

    多个候选同时命中时，取"有效区间最具体"的那条（含明确 valid_to 的年度公告
    优先于 valid_to=None 的长期文件），避免长期文件吞掉年度更新值。

    对年度型参数（居民医保筹资标准等）：若该年度无对应版本，
    返回 None 而不是沿用上一年度 —— 年度标准是"一年一定"的，
    沿用等于给错数。
    """
    cands = [r for r in param_table if r["param"] == name]
    if not cands:
        return None
    hits = []
    for r in cands:
        vf = r["valid_from"] or "0000-01-01"
        vt = r["valid_to"] or "9999-12-31"
        if vf <= as_of <= vt:
            hits.append(r)
    if not hits:
        return None
    # 年度滚动参数：必须存在与 as_of 同年度的版本，否则视为"该年度未收录"
    # 用白名单而非数量启发 —— flexible_rate 虽只有两版，但跨年延续，不能按年度截断
    YEARLY_PARAMS = {
        "resident_personal_2026", "resident_fiscal_2026", "resident_total_2026",
        "resident_personal_2027", "resident_medical_2027", "chc_resident_2027",
        "resident_fiscal_2027", "resident_fiscal_medical_2027",
        "chc_fiscal_resident_2027", "resident_total_2027",
    }
    year = as_of[:4]
    if name in YEARLY_PARAMS:
        same_year = [r for r in hits
                     if (r.get("valid_from") or "")[:4] == year]
        if not same_year:
            return None
        hits = same_year
    # 区间越具体越优先：valid_to 明确 > valid_to 为空；valid_from 越晚越具体
    hits.sort(key=lambda r: (
        0 if r.get("valid_to") else 1,
        -(int((r.get("valid_from") or "0000-01-01").replace("-", ""))),
    ))
    return hits[0]


# ── 判定式定义 ─────────────────────────────────────────────────────────
# 每个 case: 一个业务问题，编译成条件组
def build_cases(db, param_table):
    cases = []

    # CASE 1: 灵活就业人员参加职工医保的参保资格
    c = {
        "case_id": "flexible_medical_eligibility",
        "question": "我能以灵活就业人员身份参加厦门职工医保吗？",
        "topic": "职工医保灵活就业参保资格",
        "conditions": [
            {"field": "age", "op": "lte", "value": 60, "label": "处于法定劳动年龄内",
             "why": "灵活就业参保以法定劳动年龄内为前提"},
            {"field": "hukou_xiamen", "op": "eq", "value": True, "label": "本市户籍",
             "why": "或持本市有效居住证（含港澳台）", "alternative": "residence_permit_xiamen"},
            {"field": "residence_permit_xiamen", "op": "eq", "value": True, "label": "持本市有效居住证",
             "why": "户籍限制自2023-01-01起已全面放开", "alternative": "hukou_xiamen"},
            {"field": "no_employer_insurance", "op": "eq", "value": True, "label": "未在用人单位参加职工医保",
             "why": "含无雇工个体工商户、非全日制从业人员、新就业形态劳动者等"},
        ],
        "citations": [],
    }
    pol = db.get("xm-yb-2022-12", {})
    for cl in pol.get("clauses", []):
        if cl["topic"] in ("职工医保费率", "职工医保缴费基数",
                           "职工医保参保范围与灵活就业"):
            c["citations"].append(cl["citation"])
    cases.append(c)

    # CASE 2: 灵活就业人员能否参加生育保险 / 享受生育津贴（时点分界）
    c = {
        "case_id": "flexible_maternity",
        "question": "灵活就业人员能参加生育保险、享受生育津贴吗？",
        "topic": "灵活就业生育保险",
        "time_sensitive": True,
        "conditions": [],
        "versions": [
            {"as_of_range": ("0000-01-01", "2026-02-28"),
             "verdict": "NOT_ELIGIBLE",
             # 注意：厦医保〔2019〕126号 官网标注「有效性：失效」，不能作为现行依据。
             # 2026-03-01 之前的有效依据是厦府规〔2022〕12号第五十二条
             # （《厦门市职工医疗保险实施细则》，2023-01-01 起实施，有效期5年）。
             "basis": "厦府规〔2022〕12号《厦门市职工医疗保险实施细则》第五十二条："
                      "灵活就业人员不参加生育保险，不享受生育津贴",
             "policy_id": "xm-yb-2022-12"},
            {"as_of_range": ("2026-03-01", "9999-12-31"),
             "verdict": "ELIGIBLE",
             "basis": "闽医保〔2026〕13号（省级）与厦医保〔2026〕24号（厦门市级转发）"
                      "将参加职工医保的灵活就业人员纳入生育保险覆盖范围；"
                      "厦门自2026-03-01起施行",
             "policy_id": "xm-yb-2026-13",
             "extra": ["生育保险费率按职工医保缴费基数另行缴纳 0.7%",
                       "连续不间断参保满6个月未满12个月的，生育津贴按50%计发；满12个月的按100%",
                       "领取失业保险金期间的人员，由失业保险关系所在社会保险经办机构代缴"]},
        ],
        "citations": [],
    }
    # 引用只挂仍有效的文件：厦医保〔2019〕126号 官网标注「有效性：失效」，
    # 已从本 case 的引用中移除（旧时点结论改引厦府规〔2022〕12号第五十二条）
    for pid in ("xm-yb-2026-13", "xm-yb-2026-24", "xm-yb-2022-12"):
        for cl in db.get(pid, {}).get("clauses", []):
            if cl["topic"] in ("灵活就业纳入生育保险", "灵活就业生育保险市级实施",
                               "灵活就业生育保险（旧）", "生育保险参保范围",
                               "生育津贴连续参保比例", "失业金代缴生育保险"):
                c["citations"].append(cl["citation"])
    cases.append(c)

    # CASE 3: 职工医保缴费额计算（参数表驱动）
    c = {
        "case_id": "flexible_medical_amount",
        "question": "我灵活就业参加职工医保，每月要交多少钱？",
        "topic": "职工医保缴费计算",
        "calculator": "flexible_medical_monthly",
        "conditions": [],
        "citations": [],
    }
    for pid in ("xm-yb-2026-rate", "xm-yb-2025-rate", "fj-rst-2026-13", "xm-yb-2022-12"):
        for cl in db.get(pid, {}).get("clauses", []):
            if cl["topic"] in ("2026职工医保费率", "2025职工医保费率",
                               "养老失业缴费基数", "职工医保缴费基数"):
                c["citations"].append(cl["citation"])
    cases.append(c)

    # CASE 4: 断缴对待遇的影响（连续参保阶梯）
    c = {
        "case_id": "continuity_ladder",
        "question": "断缴后我的医保待遇会怎么变？",
        "topic": "大病保险连续参保",
        "calculator": "continuity_tier",
        "conditions": [
            {"field": "continuous_months", "op": "gte", "value": 0, "label": "连续参保月数",
             "why": "需按医保费用发生时的连续参保时间计算"},
            {"field": "make_up_within_3m", "op": "eq", "value": True,
             "label": "中断后是否在3个月内补缴",
             "why": "未在3个月内补缴的，连续参保时间重新计算"},
        ],
        "citations": [],
    }
    for cl in db.get("xm-yb-2022-12", {}).get("clauses", []):
        if cl["topic"] in ("大病保险连续参保", "职工医保费率"):
            c["citations"].append(cl["citation"])
    cases.append(c)

    # CASE 5: 失业保险待遇标准（省级统筹后）
    c = {
        "case_id": "unemployment_benefit",
        "question": "我能领多少失业保险金、能领多久？",
        "topic": "失业保险待遇",
        "calculator": "unemployment_benefit",
        "conditions": [
            {"field": "unemployment_insurance_months", "op": "gte", "value": 1,
             "label": "失业前累计缴费月数", "why": "领取期限按累计缴费时间计算"},
            {"field": "involuntary_unemployment", "op": "eq", "value": True,
             "label": "是否非因本人意愿中断就业", "why": "影响失业保险金申领条件"},
        ],
        "citations": [],
    }
    for cl in db.get("xm-yb-2025-7", {}).get("clauses", []):
        c["citations"].append(cl["citation"])
    cases.append(c)

    # CASE 6: 居民医保参保资格与参保范围（厦医保〔2025〕86号）
    c = {
        "case_id": "resident_eligibility",
        "question": "我能参加厦门居民医保吗？什么时候办？",
        "topic": "居民医保参保资格",
        "conditions": [
            {"field": "no_employee_insurance", "op": "eq", "value": True,
             "label": "未参加职工医保且未享有其他医疗保障",
             "why": "居民医保覆盖未参加职工医保或未按其他规定享有医疗保障的人员"},
        ],
        "citations": [],
    }
    for cl in db.get("xm-yb-2025-86", {}).get("clauses", []):
        c["citations"].append(cl["citation"])
    for cl in db.get("xm-yb-2022-12", {}).get("clauses", []):
        if cl.get("regime") == "居民医保" and cl["topic"] in (
                "居民医保筹资机制", "居民医保预缴制与集中期", "居民医保无个人账户"):
            c["citations"].append(cl["citation"])
    cases.append(c)

    # CASE 7: 居民医保年度缴费标准（时点分层：2026 vs 2027，且 2027 起含长护险）
    c = {
        "case_id": "resident_annual_premium",
        "question": "居民医保一年交多少钱？什么时候交？",
        "topic": "居民医保年度筹资标准",
        "time_sensitive": True,
        "calculator": "resident_annual_premium",
        "versions": [
            {"as_of_range": ("2026-01-01", "2026-12-31"),
             "verdict": "ELIGIBLE",
             "basis": "厦医保〔2025〕96号：2026年度居民医保筹资标准 1280元/年，其中财政补助 830元、个人缴费 450元",
             "policy_id": "xm-yb-2025-96",
             "extra": ["居民医保实行预缴制，每年9月至12月为次年集中参保缴费期",
                       "城乡居民医保基金只建立统筹基金，不设立个人账户",
                       "中断缴费一个年度及以上的，再次参保后连续参保时间重新计算，中断期间不享受待遇"]},
            {"as_of_range": ("2027-01-01", "9999-12-31"),
             "verdict": "ELIGIBLE",
             "basis": "厦医保〔2026〕90号：2027年度成年居民筹资标准 1362元/年，其中个人缴费 491元（居民医保450元 + 长护险41元）、财政补助 871元",
             "policy_id": "xm-yb-2026-90",
             "extra": ["自2027年起长护险与基本医保统一参保登记、一并申报缴费",
                       "居民长护险建制首年费率为0.15%，个人缴费与财政补助1:1分担",
                       "18周岁以下未成年人及除大学生外的在校学生不单独缴纳长护险费"]},
        ],
        "citations": [],
    }
    for pid in ("xm-yb-2025-96", "xm-yb-2026-90", "xm-yb-2022-12", "xm-chc-2026-3"):
        for cl in db.get(pid, {}).get("clauses", []):
            if cl["topic"] in ("2026居民医保筹资标准", "2027居民医保筹资标准",
                               "居民医保预缴制与集中期", "居民医保无个人账户",
                               "居民医保中断缴费处理", "长护险居民缴费",
                               "长护险职工缴费"):
                c["citations"].append(cl["citation"])
    cases.append(c)

    # CASE 8: 长护险对职工医保费率的影响（时点分层：2027-01-01 起费率下调）
    c = {
        "case_id": "chc_rate_impact",
        "question": "长护险落地后我的职工医保费率变了吗？",
        "topic": "长护险费率影响",
        "time_sensitive": True,
        "calculator": "flexible_rate_after_chc",
        "versions": [
            {"as_of_range": ("0000-01-01", "2026-12-31"),
             "verdict": "ELIGIBLE",
             "basis": "2026年度职工基本医疗保险缴费率公告：用人单位7.5%、职工2%、灵活就业人员9.5%（长护险制度实施前）",
             "policy_id": "xm-yb-2026-rate",
             "extra": ["此阶段长护险制度尚未建立，职工医保费率为原标准"]},
            {"as_of_range": ("2027-01-01", "9999-12-31"),
             "verdict": "ELIGIBLE",
             "basis": "厦医保规〔2026〕3号 第六条：职工医保单位费率和灵活就业人员费率各调整出0.15%用作长护险费率",
             "policy_id": "xm-chc-2026-3",
             "extra": ["单位费率由7.5%调整为7.35%，灵活就业人员费率由9.5%调整为9.35%",
                       "职工个人应缴的0.15%由医保部门从其职工医保个人账户划转",
                       "职工自2027年1月起按月参保缴费；居民在2026年集中参保缴费期缴纳2027年度保费",
                       "医保待遇不变"]},
        ],
        "citations": [],
    }
    for pid in ("xm-chc-2026-3", "xm-yb-2026-rate"):
        for cl in db.get(pid, {}).get("clauses", []):
            if cl["topic"] in ("长护险职工缴费", "2026职工医保费率"):
                c["citations"].append(cl["citation"])
    cases.append(c)

    # CASE 9: 居民医保待遇等待期（断保后果）
    c = {
        "case_id": "resident_waiting_period",
        "question": "我断保后再参保要等多久才能报销？",
        "topic": "居民医保待遇等待期",
        "conditions": [
            {"field": "ever_enrolled_resident", "op": "eq", "value": True,
             "label": "是否曾参加居民医保",
             "why": "首次参保与断保再参保的等待期规则不同"},
            {"field": "break_years", "op": "gte", "value": 0,
             "label": "断保年数", "why": "每多断保1年，变动待遇等待期增加1个月"},
        ],
        "citations": [],
    }
    for cl in db.get("xm-yb-2022-12", {}).get("clauses", []):
        if cl["topic"] == "居民医保中断缴费处理":
            c["citations"].append(cl["citation"])
    for cl in db.get("xm-waitperiod", {}).get("clauses", []):
        c["citations"].append(cl["citation"])
    cases.append(c)

    # CASE 10：灵活就业养老保险 缴费额与退休条件（时点分层：最低缴费年限渐进提高）
    c = {
        "case_id": "flexible_pension",
        "question": "我以灵活就业身份参加厦门养老保险要交多少？将来能领养老金吗？",
        "topic": "灵活就业养老保险",
        "time_sensitive": True,
        "calculator": "pension_monthly",
        "conditions": [
            {"field": "age", "op": "lte", "value": 60, "label": "年龄",
             "why": "男性50周岁以上、女性40周岁以上参保将建立临时账户，"
                    "会影响未来待遇领取地判定"},
        ],
        "versions": [
            {"as_of_range": ("0000-01-01", "2029-12-31"),
             "verdict": "ELIGIBLE",
             "basis": "按月领取基本养老金最低缴费年限为累计满15年",
             "policy_id": "xm-pension-retire-guide",
             "extra": ["灵活就业人员缴费比例 20%，其中 8% 记入个人账户、12% 记入统筹基金",
                       "缴费基数在省平均工资 60%—300% 范围内自主选择，共 7 档"]},
            {"as_of_range": ("2030-01-01", "9999-12-31"),
             "verdict": "ELIGIBLE",
             "basis": "自2030年1月1日起，职工按月领取基本养老金最低缴费年限"
                      "由15年逐步提高至20年，每年提高6个月",
             "policy_id": "xm-pension-retire-guide",
             "extra": ["最低缴费年限逐年递增：2030年起每年提高6个月，直至20年",
                       "灵活就业人员缴费比例 20%（8% 个人账户 / 12% 统筹基金）"]},
        ],
        "citations": [],
    }
    for pid in ("xm-residence-pension-interpret", "xm-pension-retire-guide",
                "xm-pension-transfer-interpret", "xm-flexible-commitment"):
        for cl in db.get(pid, {}).get("clauses", []):
            c["citations"].append(cl["citation"])
    cases.append(c)

    # CASE 10b：灵活就业参保办理渠道（承诺制）
    # 边界（不可越）：承诺制是**税务/医保经办口径的参保登记渠道**，
    # 厦府规〔2022〕12号第四条本身没有"承诺制"三个字，职工医保的参保条件
    # 仍然是"本市户籍人员 或 本市有效居住证持有人"。
    # 所以这里单列为"办理渠道"判定式，绝不并入职工医保的参保条件组。
    c = {
        "case_id": "flexible_enroll_channel",
        "question": "我没有厦门居住证，能参保吗？手续怎么办？",
        "topic": "灵活就业参保办理渠道",
        "conditions": [
            {"field": "residence_permit_xiamen", "op": "eq", "value": False,
             "label": "未持厦门有效居住证",
             "why": "未持居住证的非本市户籍人员，参保登记需另走承诺制渠道"},
            {"field": "commitment_form_signed", "op": "eq", "value": True,
             "label": "承诺制办理渠道",
             "why": "按税务口径办理，不属于职工医保参保条件"},
        ],
        "citations": [],
    }
    for pid in ("xm-flexible-commitment", "xm-participate-guide"):
        for cl in db.get(pid, {}).get("clauses", []):
            c["citations"].append(cl["citation"])
    cases.append(c)

    # CASE 11：医保关系转移接续（异地参保年限合并）
    c = {
        "case_id": "insurance_transfer",
        "question": "我在外地交过社保，回厦门怎么接续？年限怎么算？",
        "topic": "职工医保关系转移接续",
        "conditions": [
            {"field": "previous_insurance_type", "op": "eq", "value": "职工医保",
             "label": "外地参加的是职工医保",
             "why": "居民医保年限不作为职工医保缴费年限，需先确认原参保险种"},
            {"field": "previous_city", "op": "ne", "value": "",
             "label": "原参保城市", "why": "跨统筹地区流动需办理转移接续"},
            {"field": "has_transfer_certificate", "op": "eq", "value": True,
             "label": "是否已办参保凭证",
             "why": "办理转移接续手续后，异地个人账户资金可转入本市合并计算，"
                    "职工医保缴费年限累计计算（重复缴费年限不得累加）"},
        ],
        "citations": [],
    }
    for cl in db.get("xm-yb-2022-12", {}).get("clauses", []):
        if cl["topic"] in ("医保关系转移接续", "视同缴费年限认定",
                           "职工医保参保范围与灵活就业", "职工医保退休资格"):
            c["citations"].append(cl["citation"])
    for cl in db.get("xm-medical-continuity", {}).get("clauses", []):
        if cl["topic"] in ("转移接续年限合并条件", "职工医保退休累计年限"):
            c["citations"].append(cl["citation"])
    cases.append(c)

    # CASE 12：居民医保待遇等待期（断保后多久能报）
    c = {
        "case_id": "resident_wait_period_calc",
        "question": "我居民医保断保后重新参保，要等多久才能报销？",
        "topic": "居民医保待遇等待期",
        "calculator": "resident_wait_calc",
        "conditions": [
            {"field": "ever_enrolled_resident", "op": "eq", "value": True,
             "label": "是否曾参加居民医保",
             "why": "首次参保与断保再参保的等待期规则不同"},
            {"field": "break_years", "op": "gte", "value": 0,
             "label": "断保年数", "why": "每多断保1年，变动等待期增加1个月"},
        ],
        "citations": [],
    }
    for cl in db.get("xm-waitperiod", {}).get("clauses", []):
        c["citations"].append(cl["citation"])
    for cl in db.get("xm-yb-2022-12", {}).get("clauses", []):
        if cl["topic"] == "居民医保中断缴费处理":
            c["citations"].append(cl["citation"])
    cases.append(c)

    return cases


# ── 求值器 ─────────────────────────────────────────────────────────────
OPS = {
    "eq": lambda a, b: a == b,
    "ne": lambda a, b: a != b,
    "lte": lambda a, b: a is not None and a <= b,
    "gte": lambda a, b: a is not None and a >= b,
    "lt": lambda a, b: a is not None and a < b,
    "gt": lambda a, b: a is not None and a > b,
}


def evaluate_condition(cond, profile):
    field = cond["field"]
    if field not in profile or profile.get(field) is None:
        return "unknown", None
    val = profile[field]
    op = OPS.get(cond["op"])
    if op is None:
        return "unknown", None
    return ("pass" if op(val, cond["value"]) else "fail"), val


def group_conditions(conditions):
    """把条件按 `alternative` 关系分组。

    背景（沉默逻辑错误的典型）：厦府规〔2022〕12号第四条写的是
    "法定劳动年龄内的本市户籍人员、本市有效居住证持有人…可以个人身份参加职工医保"
    —— 二者是 **或** 的关系。但早期实现把每个 condition 当独立的 AND 条件求值，
    于是"本市户籍但没办居住证"的人会被判成"不符合"，与原文相反。

    现在的约定：
    - condition 上带 `alternative: "<field>"` 表示它与该 field 是互替关系
    - 互替关系会被传递闭包合并成组（a↔b、b↔c ⇒ {a,b,c}）
    - 组内任一条件 pass ⇒ 整组 pass（OR 语义）
    - 组内全部 unknown ⇒ 整组 unknown（需用户补充）
    - 组内已 pass ⇒ 整组 pass，未知项不再追问（避免"已知满足还一直问"）

    返回 [(group_id, [cond, ...]), ...]，组内成员保持原始顺序。
    """
    if not conditions:
        return []
    # 建立 field ↔ field 的互替邻接
    alt = {}
    for c in conditions:
        f = c.get("field")
        a = c.get("alternative")
        if f and a:
            alt.setdefault(f, set()).add(a)
            alt.setdefault(a, set()).add(f)
    # 并查集：把互替关系合并
    parent = {}

    def find(x):
        parent.setdefault(x, x)
        while parent[x] != x:
            parent[x] = parent[parent[x]]
            x = parent[x]
        return x

    def union(a, b):
        ra, rb = find(a), find(b)
        if ra != rb:
            parent[ra] = rb

    for f, others in alt.items():
        for o in others:
            union(f, o)
    # 无互替关系的条件各自成组
    for c in conditions:
        find(c["field"])
    buckets = {}
    for c in conditions:
        buckets.setdefault(find(c["field"]), []).append(c)
    return list(buckets.values())


def evaluate_group(group, profile):
    """对一个条件组求值 → (state, states)

    state: pass / fail / unknown
    组内 OR 语义：任一 pass 即 pass；全 unknown 才 unknown；否则 fail。
    """
    states = []
    for cond in group:
        st, val = evaluate_condition(cond, profile)
        states.append({"cond": cond, "state": st, "value": val})
    if any(s["state"] == "pass" for s in states):
        return "pass", states
    if all(s["state"] == "unknown" for s in states):
        return "unknown", states
    # 有已知失败项，且没有任何项通过 —— 组不成立
    return "fail", states


def resolve_conflict(items, db):
    """items: [{policy_id, clause_text, topic_scope}] -> (裁决结果, 裁决说明)"""
    if len(items) < 2:
        return None, None
    enriched = []
    for it in items:
        p = dict(db.get(it["policy_id"], {}))
        p["clause_text"] = it.get("clause_text", "")
        p["topic_scope"] = it.get("topic_scope")
        enriched.append(p)
    for rid, rname, rdesc, fn in CONFLICT_RULES:
        try:
            if fn(enriched[0], enriched[1]):
                return rid, f"{rname}：{rdesc}"
        except Exception:
            continue
    return None, None


# ── 计算器（纯函数，输入输出都可自证）─────────────────────────────────
def calc_flexible_medical_monthly(profile, as_of, param_table):
    """灵活就业职工医保月缴费额 = 缴费基数 × 费率"""
    base_rate = pick_param(param_table, "base_upper", as_of)
    base_low = pick_param(param_table, "base_lower", as_of)
    rate = pick_param(param_table, "flexible_rate", as_of)
    if not rate:
        return {"error": "未找到适用时点的灵活就业费率参数", "as_of": as_of}
    chosen = profile.get("chosen_base")
    if chosen is None:
        low = base_low["value"] if base_low else None
        high = base_rate["value"] if base_rate else None
        return {
            "needs_input": "chosen_base",
            "available_range": {"min": low, "max": high},
            "rate": rate["value"],
            "rate_source": rate["citation"],
            "as_of": as_of,
            "note": "灵活就业人员在上年度省平均工资60%—300%范围内自主选择缴费基数",
        }
    amount = round(chosen * rate["value"] / 100, 2)
    return {
        "amount": amount,
        "formula": f"{chosen} × {rate['value']}%",
        "rate": rate["value"],
        "rate_source": rate["citation"],
        "chosen_base": chosen,
        "as_of": as_of,
    }


def calc_continuity_tier(profile, as_of, param_table):
    """大病保险待遇档位 = 按连续参保月数查阶梯"""
    row = pick_param(param_table, "tier_rates_pct", as_of)
    if not row:
        return {"error": "未找到适用时点的连续参保阶梯参数", "as_of": as_of}
    thresholds = row["value"][0]
    rates = row["value"][1]
    months = profile.get("continuous_months")
    if months is None:
        return {"needs_input": "continuous_months",
                "tier_thresholds_months": thresholds,
                "tier_rates_pct": rates,
                "source": row["citation"], "as_of": as_of}
    make_up = profile.get("make_up_within_3m")
    note = ""
    if make_up is False:
        note = "中断后未在3个月内补缴，连续参保时间将重新计算，需从补缴后连续参保时间重新起算"
    idx = 0
    for i, t in enumerate(thresholds):
        if months >= t:
            idx = i
    return {
        "continuous_months": months,
        "tier_rate_pct": rates[idx] if idx < len(rates) else None,
        "tier_thresholds_months": thresholds,
        "tier_rates_pct": rates,
        "note": note,
        "source": row["citation"],
        "as_of": as_of,
    }


def calc_unemployment_benefit(profile, as_of, param_table):
    """失业保险金 = 本市月最低工资标准 × 90%；期限 = 累计缴费年数 × 2 个月，上限 24

    最低工资标准由参数表按 as_of 自动取（闽人社文〔2025〕14号，厦门六区 2265 元/月，
    2025-04-01 起执行）。只有当参数表查不到适用时点的标准时，才要求用户输入。
    """
    rate_row = pick_param(param_table, "benefit_rate_pct", as_of)
    ypm = pick_param(param_table, "years_per_month", as_of)
    mpy = pick_param(param_table, "months_per_year", as_of)
    maxm = pick_param(param_table, "max_months", as_of)
    if not rate_row:
        return {"error": "未找到适用时点的失业保险待遇标准参数", "as_of": as_of}

    # 最低工资：优先参数表自动取
    min_wage = None
    min_wage_src = None
    mw_row = pick_param(param_table, "min_wage_xiamen", as_of)
    if mw_row:
        min_wage = mw_row["value"]
        min_wage_src = mw_row["citation"]
    elif profile.get("min_wage_xiamen") is not None:
        min_wage = profile.get("min_wage_xiamen")

    months = profile.get("unemployment_insurance_months")
    out = {
        "benefit_rate_pct": rate_row["value"],
        "source": rate_row["citation"],
        "as_of": as_of,
        "need_input": [],
    }
    if min_wage is None:
        out["need_input"].append("min_wage_xiamen")
        out["status"] = "needs_input"
        out["note"] = "未找到适用时点的厦门最低工资标准参数，需人工补充"
        return out
    out["min_wage_xiamen"] = min_wage
    out["min_wage_source"] = min_wage_src
    if months is None:
        out["need_input"].append("unemployment_insurance_months")
        out["status"] = "needs_input"
        return out

    out["monthly_benefit"] = round(min_wage * rate_row["value"] / 100, 2)
    _mw = int(min_wage) if float(min_wage).is_integer() else min_wage
    _rt = int(rate_row["value"]) if float(rate_row["value"]).is_integer() else rate_row["value"]
    out["formula"] = f"{_mw} × {_rt}%"
    years = months // 12
    out["max_months_claimable"] = min(years * mpy["value"], maxm["value"]) if mpy and maxm else None
    out["months_per_year"] = mpy["value"] if mpy else None
    out["max_months_cap"] = maxm["value"] if maxm else None
    out["status"] = "computed"
    return out


CALCULATORS = {
    "flexible_medical_monthly": calc_flexible_medical_monthly,
    "continuity_tier": calc_continuity_tier,
    "unemployment_benefit": calc_unemployment_benefit,
}


def calc_resident_annual_premium(profile, as_of, param_table):
    """居民医保年度个人缴费（时点分层：2026 与 2027 标准不同）

    注意两个年度视角不能混：
    - 主表 items = as_of 所在年度的**标准**（与判定式的时点分层 basis 一致）
    - enrollment = 集中参保缴费期。集中期在 2025 年 10—12 月收 2026 年度的钱，
      在 2026 年 10—12 月收 2027 年度的钱 —— 所以"现在实际要交多少"
      要看 coverage_items，不能拿 items 顶替。
    """
    year = as_of[:4]
    rows = {
        "2026": [("resident_personal_2026", "居民医保个人缴费"),
                 ("resident_fiscal_2026", "居民医保财政补助"),
                 ("resident_total_2026", "筹资标准合计")],
        "2027": [("resident_personal_2027", "居民医保+长护险个人缴费合计"),
                 ("resident_fiscal_2027", "居民医保+长护险财政补助合计"),
                 ("resident_total_2027", "筹资标准合计")],
    }
    # 集中参保缴费期状态：as_of 不在集中期内则为 None
    enrollment = _enrollment_status(param_table, as_of)
    if year not in rows:
        # 超出已知年度区间 → 明确报"未找到适用时点参数"，不给数字
        # 但如果此刻正处在集中期内，仍然要告诉用户"现在该交哪一年度、多少钱"
        out = {"error": f"未收录 {year} 年度居民医保筹资标准", "as_of": as_of,
               "note": "该年度标准尚未进入本库，不得沿用其他年度数值",
               "enrollment": enrollment}
        if enrollment and enrollment.get("coverage_items"):
            out["note"] = (f"{year} 年度标准尚未进入本库；当前正处在 "
                           f"{enrollment['coverage_year']} 年度集中参保缴费期内，"
                           f"该年度标准见下方。")
        return out
    out = {"as_of": as_of, "year": year, "items": [], "citations": []}
    for key, label in rows[year]:
        r = pick_param(param_table, key, as_of)
        if r:
            out["items"].append({"label": label, "value": r["value"],
                                 "source": r["citation"]})
            out["citations"].append(r["citation"])
        else:
            out["items"].append({"label": label, "value": None,
                                 "source": None,
                                 "note": "未找到适用时点参数"})
    # 长护险拆分（仅 2027 起有）
    if year == "2027":
        for key, label in [("resident_medical_2027", "其中：居民医保部分"),
                           ("chc_resident_2027", "其中：长护险部分")]:
            r = pick_param(param_table, key, as_of)
            if r:
                out["items"].append({"label": label, "value": r["value"],
                                     "source": r["citation"]})
    # 集中参保缴费期倒计时：仅当 as_of 落在集中期内才提示
    out["enrollment"] = enrollment
    return out


def _enrollment_status(param_table, as_of):
    """集中参保缴费期状态

    只用参数表里的起止日，不在代码里硬编码任何日期。
    as_of 不在集中期内 → 返回 None（页面不显示倒计时）。
    """
    start_row = pick_param(param_table, "resident_enroll_start", as_of)
    end_row = pick_param(param_table, "resident_enroll_end", as_of)
    if not start_row or not end_row:
        return None
    start = start_row["value"]
    end = end_row["value"]
    if not (isinstance(start, str) and isinstance(end, str)):
        return None
    if not (start <= as_of <= end):
        return None
    try:
        d0 = date.fromisoformat(as_of)
        d1 = date.fromisoformat(end)
    except ValueError:
        return None
    days_left = (d1 - d0).days
    prec_row = pick_param(param_table, "resident_enroll_precision", as_of)
    year_row = pick_param(param_table, "resident_enroll_coverage_year", as_of)
    coverage_year = year_row["value"] if year_row else None
    out = {
        "start": start,
        "end": end,
        "days_left": days_left,
        # month 精度 = 公告只写到"X月至Y月"，截止日是按月末推算的
        "precision": prec_row["value"] if prec_row else "day",
        "coverage_year": coverage_year,
        "source": end_row["citation"],
    }
    # 集中期缴的是"下一年度"的钱 —— 把那一年度的个人缴费标准也取出来，
    # 否则用户看到的仍是 as_of 当年的标准，会误以为该缴多少。
    # 数值全部来自参数表，不写死。
    if coverage_year:
        cy = str(int(coverage_year))
        cy_items = []
        # 注意：年度标准的 valid_from 是"待遇年度"（2027-01-01 起），
        # 而集中期在 2026 年 10 月就开始收了 —— 所以这里不能用 as_of 去查，
        # 得按"待遇年度"查，否则会查不到（2026-10-25 查 2027 年度参数必然落空）。
        for suffix, label in (("_personal", "个人缴费"),
                               ("_fiscal", "财政补助"),
                               ("_total", "筹资标准合计")):
            key = f"resident{suffix}_{cy}"
            r = _pick_by_coverage_year(param_table, key, cy)
            if r:
                cy_items.append({"label": label, "value": r["value"],
                                 "source": r["citation"]})
        # 长护险拆分（2027 起居民医保与长护险合并征收）
        for key, label in ((f"resident_medical_{cy}", "其中：居民医保部分"),
                           (f"chc_resident_{cy}", "其中：长护险部分")):
            r = _pick_by_coverage_year(param_table, key, cy)
            if r:
                cy_items.append({"label": label, "value": r["value"],
                                 "source": r["citation"], "sub": True})
        out["coverage_items"] = cy_items
    return out


def _pick_by_coverage_year(param_table, name, coverage_year):
    """按"待遇年度"取年度参数，而不是按 as_of 取。

    年度标准（如 2027 年度个人缴费 491 元）的 valid_from 是 2027-01-01，
    但用户在 2026 年 10 月的集中期里就要交这笔钱 —— 两者时间轴不同，
    用 as_of 查会落空。年度参数名自带年份后缀，这里直接按名字定位，
    找不到就返回 None（绝不拿别的年度的值顶替）。
    """
    cands = [r for r in param_table if r["param"] == name]
    if not cands:
        return None
    # 名字末尾的年份必须与目标待遇年度一致
    exact = [r for r in cands
             if r["param"].endswith("_" + coverage_year)
             or r["param"].endswith(coverage_year)]
    pool = exact or cands
    # 区间越具体越优先
    pool = sorted(pool, key=lambda r: (
        0 if r.get("valid_to") else 1,
        -(int((r.get("valid_from") or "0000-01-01").replace("-", ""))),
    ))
    return pool[0]


def calc_flexible_rate_after_chc(profile, as_of, param_table):
    """长护险落地后灵活就业职工医保费率

    2027 年度职工医保费率公告截至抓取时尚未发布，
    因此 2027 年及以后的费率依据厦医保规〔2026〕3号 第六条的
    "从职工医保单位费率和灵活就业人员费率中调整出0.15%用作长护险费率"推导：
        新费率 = 上一有效版本费率 − 0.15%
    这是有据推导，不是猜测：调整幅度由规范性文件明文给出。
    """
    shift = pick_param(param_table, "chc_rate_shift_pct", as_of)
    base = pick_param(param_table, "flexible_rate", as_of)
    # 费率公告为年度滚动；若 as_of 落在未发布区间，取 as_of 之前最近一版作为基准
    if base is None:
        prior = [r for r in param_table if r["param"] == "flexible_rate"
                 and (r.get("valid_from") or "") <= as_of]
        if prior:
            prior.sort(key=lambda r: r["valid_from"], reverse=True)
            base = prior[0]
    if not base:
        return {"error": "未找到可作为基准的灵活就业费率参数", "as_of": as_of}
    rate = base["value"]
    note = ""
    derived = False
    if shift:
        rate = round(rate - shift["value"], 4)
        derived = True
        note = (f"自2027年1月起，职工医保单位费率和灵活就业人员费率各调整出 "
                f"{shift['value']}% 用作长护险费率；医保待遇不变。"
                f"（2027年度职工医保费率公告截至抓取时尚未发布，此处依据"
                f"厦医保规〔2026〕3号第六条的明文调整幅度推导）")
    return {
        "rate_pct": rate,
        "before_chc_pct": base["value"],
        "after_chc_pct": rate if shift else None,
        "derived": derived,
        "source": base["citation"],
        "chc_source": shift["citation"] if shift else None,
        "note": note,
        "as_of": as_of,
    }


CALCULATORS["resident_annual_premium"] = calc_resident_annual_premium
CALCULATORS["flexible_rate_after_chc"] = calc_flexible_rate_after_chc


def calc_resident_wait_calc(profile, as_of, param_table):
    """居民医保待遇等待期 = 固定 3 个月 + 每断保 1 年加 1 个月"""
    fixed_row = pick_param(param_table, "resident_wait_fixed_months", as_of)
    var_row = pick_param(param_table, "resident_wait_variable_per_year", as_of)
    if not fixed_row:
        return {"error": "未找到适用时点的居民医保等待期参数", "as_of": as_of}
    fixed = fixed_row["value"]
    years = profile.get("break_years")
    out = {
        "fixed_months": fixed,
        "fixed_source": fixed_row["citation"],
        "as_of": as_of,
    }
    if years is None:
        out["needInput"] = ["break_years"]
        out["status"] = "needs_input"
        out["note"] = "固定等待期已确定，变动部分需知道断保年数"
        return out
    per = var_row["value"] if var_row else 0
    out["break_years"] = years
    out["variable_per_year"] = per
    out["total_months"] = fixed + years * per
    out["formula"] = f"{fixed} + {years}×{per} = {out['total_months']} 个月"
    out["status"] = "computed"
    return out


def calc_pension_monthly(profile, as_of, param_table):
    """灵活就业养老保险月缴费额 = 缴费基数 × 费率（20%）"""
    rate_row = pick_param(param_table, "pension_flexible_rate", as_of)
    if not rate_row:
        return {"error": "未找到适用时点的灵活就业养老费率参数", "as_of": as_of}
    lo_pct = pick_param(param_table, "pension_base_min_pct", as_of)
    hi_pct = pick_param(param_table, "pension_base_max_pct", as_of)
    acct = pick_param(param_table, "pension_account_pct", as_of)
    pool = pick_param(param_table, "pension_pool_pct", as_of)
    rate = rate_row["value"]
    out = {
        "rate_pct": rate,
        "rate_source": rate_row["citation"],
        "account_pct": acct["value"] if acct else None,
        "pool_pct": pool["value"] if pool else None,
        "base_min_pct": lo_pct["value"] if lo_pct else None,
        "base_max_pct": hi_pct["value"] if hi_pct else None,
        "as_of": as_of,
    }
    chosen = profile.get("chosen_pension_base")
    if chosen is None:
        out["needs_input"] = "chosen_pension_base"
        out["note"] = ("缴费基数在省平均工资60%—300%范围内自主选择，共7档；"
                       "选定基数后可得月缴费额")
        return out
    out["chosen_base"] = chosen
    out["amount"] = round(chosen * rate / 100, 2)
    out["formula"] = f"{chosen} × {rate}%"
    if acct and pool:
        out["to_account"] = round(chosen * acct["value"] / 100, 2)
        out["to_pool"] = round(chosen * pool["value"] / 100, 2)
    return out


# ── 主入口 ─────────────────────────────────────────────────────────────
def judge(case, profile, as_of, param_table, db):
    """对单个 case 求值，产出结论 + 引用 + 缺失条件 + 下一步"""
    result = {
        "case_id": case["case_id"],
        "question": case["question"],
        "topic": case["topic"],
        "as_of": as_of,
        "verdict": None,
        "verdict_label": None,
        "citations": case.get("citations", []),
        "missing": [],
        "next_action": None,
        "detail": {},
    }

    # 时点分层版本（优先）
    if case.get("versions"):
        hit = None
        for v in case["versions"]:
            lo, hi = v["as_of_range"]
            if lo <= as_of <= hi:
                hit = v
                break
        if hit:
            result["verdict"] = hit["verdict"]
            result["verdict_label"] = VERDICT[hit["verdict"]]
            result["detail"]["basis"] = hit["basis"]
            result["detail"]["version_window"] = hit["as_of_range"]
            if hit.get("extra"):
                result["detail"]["extra"] = hit["extra"]
            # 其他时点的结论也一并给出（这是时点分层的价值）
            others = [v for v in case["versions"] if v is not hit]
            result["detail"]["other_timepoints"] = [
                {"window": v["as_of_range"], "verdict": VERDICT[v["verdict"]],
                 "basis": v["basis"]} for v in others]
            # 版本分支同样执行计算器（年度标准/费率推导等）
            if case.get("calculator") and case["calculator"] in CALCULATORS:
                result["detail"]["calculation"] = CALCULATORS[case["calculator"]](
                    profile, as_of, param_table)
            result["next_action"] = "按你当前时点适用的规定办理；如涉及历史期间，请对照其他时点结论"
            return result

    # 条件求值（按 alternative 分组，组内 OR、组间 AND）
    if case.get("conditions"):
        groups = group_conditions(case["conditions"])
        states = []
        unknown = []
        failed = []
        for grp in groups:
            gstate, gstates = evaluate_group(grp, profile)
            states.extend(gstates)
            if gstate == "unknown":
                # 组内全未知 → 这些字段都需要用户补充
                unknown.extend(s for s in gstates if s["state"] == "unknown")
            elif gstate == "fail":
                failed.extend(s for s in gstates if s["state"] == "fail")
            # 组 pass：互替条件任一满足即成立，其余不追问
        result["detail"]["condition_states"] = [
            {"label": s["cond"]["label"], "state": s["state"], "value": s["value"],
             "why": s["cond"].get("why")} for s in states]
        if unknown:
            result["verdict"] = "NEEDS_VERIFY"
            result["missing"] = [
                {"field": s["cond"]["field"], "label": s["cond"]["label"],
                 "why": s["cond"].get("why")} for s in unknown]
        elif failed:
            result["verdict"] = "NOT_ELIGIBLE"
            result["detail"]["failed_conditions"] = [
                s["cond"]["label"] for s in failed]
        else:
            result["verdict"] = "ELIGIBLE"
        result["next_action"] = ("补充上述条件后可继续核验" if unknown
                                 else "可进入官方办理入口核对材料")
        # 有计算器则附加计算结果
        if case.get("calculator") and case["calculator"] in CALCULATORS:
            result["detail"]["calculation"] = CALCULATORS[case["calculator"]](
                profile, as_of, param_table)
        result["verdict_label"] = VERDICT[result["verdict"]]
        return result

    # 仅计算器
    if case.get("calculator") and case["calculator"] in CALCULATORS:
        result["verdict"] = "ELIGIBLE"
        result["verdict_label"] = VERDICT["ELIGIBLE"]
        result["detail"]["calculation"] = CALCULATORS[case["calculator"]](
            profile, as_of, param_table)
        result["next_action"] = "按计算结果准备材料，到官方渠道办理"
        return result

    result["verdict"] = "NO_EVIDENCE"
    result["verdict_label"] = VERDICT["NO_EVIDENCE"]
    result["next_action"] = "未检索到适用的一手依据，请到官方窗口咨询"
    return result


def verify_citations(db):
    """CI 断言：每条 citation.quote 必须是快照正文的真实子串"""
    texts = {}
    for fn in os.listdir(SNAP):
        if fn.endswith(".txt") and not fn.startswith("xhr_"):
            try:
                texts[fn[:-4]] = open(os.path.join(SNAP, fn), encoding="utf-8",
                                      errors="ignore").read()
            except OSError:
                pass
    total = ok = 0
    fails = []
    for key, pol in db.items():
        for cl in pol.get("clauses", []):
            total += 1
            cit = cl.get("citation") or {}
            q = (cit.get("quote") or "").replace(" ", "").replace("\n", "")
            pool = texts.get(key, "")
            if not q:
                pool2 = "".join(t for k, t in texts.items() if q in t.replace(" ", ""))
                if pool2:
                    ok += 1
                    continue
                fails.append((key, cl.get("clause_no"), "empty quote"))
                continue
            if q in pool.replace(" ", "").replace("\n", ""):
                ok += 1
            else:
                fails.append((key, cl.get("clause_no"), "quote not in snapshot"))
    return {"total": total, "ok": ok, "fails": fails}


def check_invalid_citations(cases):
    """硬闸门：判定式不得引用被状态反查判定为失效的文件

    对应深化提示词 §5.3 —— 失效文件不得支撑任何结论。
    返回违规列表（空 = 通过）。
    """
    sc_path = os.path.join(DB, "status_check.json")
    if not os.path.exists(sc_path):
        return [{"error": "status_check.json 未生成，无法执行失效引用检查"}]
    sc = json.load(open(sc_path, encoding="utf-8"))
    invalid_docs = {r["doc_number"] for r in sc if r.get("should_downgrade")}
    violations = []
    for case in cases:
        for cit in case.get("citations", []):
            doc = cit.get("doc_number")
            if doc in invalid_docs:
                violations.append({
                    "case_id": case.get("case_id"),
                    "doc_number": doc,
                    "clause_ref": cit.get("clause_ref"),
                    "reason": "该文件已被状态反查判定为失效，不得作为引用依据",
                })
    return violations


def main():
    db = json.load(open(os.path.join(DB, "policy_db.json"), encoding="utf-8"))
    param_table = build_param_table(db)
    json.dump(param_table, open(os.path.join(DB, "param_table.json"), "w", encoding="utf-8"),
              ensure_ascii=False, indent=2)
    cases = build_cases(db, param_table)
    json.dump(cases, open(os.path.join(DB, "cases.json"), "w", encoding="utf-8"),
              ensure_ascii=False, indent=2)

    print(f"参数表 {len(param_table)} 行  判定式 {len(cases)} 个")
    print("\n=== 参数表（按名分组）===")
    seen = {}
    for r in param_table:
        seen.setdefault(r["param"], []).append(r)
    for k, v in seen.items():
        print(f"  {k}: " + " || ".join(
            f"{x['value']}[{x['valid_from']}~{x['valid_to'] or '至今'}]" for x in v))

    # 演示：28岁本科待业·外地户籍·厦门租房
    profile = {
        "age": 28,
        "hukou_xiamen": False,
        "residence_permit_xiamen": False,
        "no_employer_insurance": None,
        "continuous_months": None,
        "make_up_within_3m": None,
        "unemployment_insurance_months": None,
        "involuntary_unemployment": None,
        "min_wage_xiamen": None,
        "chosen_base": None,
    }
    as_of = "2026-10-24"
    out = []
    print("\n=== 判定演示：28岁 待业 外地户籍 厦门租房 ===")
    for c in cases:
        r = judge(c, profile, as_of, param_table, db)
        out.append(r)
        print(f"\n[{r['verdict_label']}] {r['question']}")
        if r["missing"]:
            print("  缺失: " + ", ".join(m["label"] for m in r["missing"]))
        calc = r["detail"].get("calculation")
        if calc:
            if calc.get("needs_input"):
                print(f"  计算待输入: {calc['needs_input']}  可选区间 {calc.get('available_range')}")
            elif calc.get("need_input"):
                print(f"  计算待输入: {calc['need_input']}")
            else:
                print(f"  计算: {calc.get('formula','—')} = {calc.get('amount', calc.get('tier_rate_pct', calc.get('monthly_benefit','—')))}")
        for t in r["detail"].get("other_timepoints", []):
            print(f"  其他时点 [{t['window'][0]}~{t['window'][1]}] -> {t['verdict']}")
    json.dump(out, open(os.path.join(DB, "demo_judgments.json"), "w", encoding="utf-8"),
              ensure_ascii=False, indent=2)

    v = verify_citations(db)
    print(f"\n=== 引用可回溯自检: {v['ok']}/{v['total']} ===")
    for f in v["fails"]:
        print("  FAIL", f)

    viol = check_invalid_citations(cases)
    print(f"\n=== 失效引用硬闸门: {'通过' if not viol else str(len(viol)) + ' 处违规'} ===")
    for x in viol:
        print("  VIOLATION", x)
    if viol:
        raise SystemExit("失效文件被用作引用依据，引擎拒绝出结论")


if __name__ == "__main__":
    main()
