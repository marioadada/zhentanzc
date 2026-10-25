// 本文件由 pipeline/build_page_data.py 自动生成，请勿手改
window.POLICY_DATA = {
 "meta": {
  "generated_at": "2026-10-25T12:22:11+08:00",
  "last_sync": "2026-10-25T00:13:16+08:00",
  "tracked_sources": 27,
  "policy_count": 31,
  "clause_count": 56,
  "param_count": 121,
  "case_count": 13,
  "source_tiers": {
   "L1": "规范性文件正文",
   "L2": "办事指南与事项",
   "L3": "官方参数表",
   "L4": "官方解释与效力状态"
  }
 },
 "policies": {
  "xm-yb-2022-12": {
   "policy_id": "xm-yb-2022-12",
   "title": "厦门市职工医疗保险实施细则和厦门市城乡居民医疗保险实施细则",
   "doc_number": "厦府规〔2022〕12号",
   "issuer": "厦门市人民政府",
   "layer": "L1",
   "source_url": "https://www.xm.gov.cn/zfgb/99833450",
   "pdf_url": "https://www.xm.gov.cn/zfgb/pdf/upload/20221214095516952415.pdf",
   "fetched_at": "2026-10-24T23:08:00+08:00",
   "raw_sha256": "1cccf301efb37dc6070737dc19bc156baf075230536d09b8f965ee3c58f600b8",
   "text_sha256": "e76be654ab7df9ef5fda099c2aec9016c6fdbdd18f8527a648afc361cd0bbd8f",
   "text_chars": 23183,
   "cjk_ratio": 0.8622,
   "valid_from": "2022-07-01",
   "valid_to": null,
   "supersedes": [],
   "superseded_by": [
    "xm-yb-2026-13"
   ],
   "status": "partially_superseded",
   "clauses": [
    {
     "clause_no": "第六条",
     "clause_ref": "第六条@职工医保",
     "regime": "职工医保",
     "topic": "职工医保费率",
     "quote": "第六条\n职工基本医疗保险费由用人单位和职工分别按其缴费基数的\n7.5%和2%按月共同缴纳。",
     "params": [
      {
       "key": "unit_rate",
       "value": 7.5
      },
      {
       "key": "employee_rate",
       "value": 2.0
      }
     ],
     "effective_from": null,
     "coverage_year": null,
     "param_tag": "flexible_rate_2022",
     "citation": {
      "doc_number": "厦府规〔2022〕12号",
      "clause_no": "第六条",
      "clause_ref": "第六条@职工医保",
      "regime": "职工医保",
      "quote": "第六条\n职工基本医疗保险费由用人单位和职工分别按其缴费基数的\n7.5%和2%按月共同缴纳。",
      "url": "https://www.xm.gov.cn/zfgb/99833450",
      "fetched_at": "2026-10-24T23:08:00+08:00",
      "text_sha256": "e76be654ab7df9ef5fda099c2aec9016c6fdbdd18f8527a648afc361cd0bbd8f",
      "evidence_layer": "L1"
     }
    },
    {
     "clause_no": "第七条",
     "clause_ref": "第七条@职工医保",
     "regime": "职工医保",
     "topic": "职工医保缴费基数",
     "quote": "第七条\n职工基本医疗保险费用人单位缴费基数为职工工资总额，工资总额按其在职职工缴费基数之和确定。",
     "params": [
      {
       "key": "base_min_pct",
       "value": 60
      },
      {
       "key": "base_max_pct",
       "value": 300
      }
     ],
     "effective_from": null,
     "coverage_year": null,
     "param_tag": "base_60_300",
     "citation": {
      "doc_number": "厦府规〔2022〕12号",
      "clause_no": "第七条",
      "clause_ref": "第七条@职工医保",
      "regime": "职工医保",
      "quote": "第七条\n职工基本医疗保险费用人单位缴费基数为职工工资总额，工资总额按其在职职工缴费基数之和确定。",
      "url": "https://www.xm.gov.cn/zfgb/99833450",
      "fetched_at": "2026-10-24T23:08:00+08:00",
      "text_sha256": "e76be654ab7df9ef5fda099c2aec9016c6fdbdd18f8527a648afc361cd0bbd8f",
      "evidence_layer": "L1"
     }
    },
    {
     "clause_no": "第四十七条",
     "clause_ref": "第四十七条@职工医保",
     "regime": "职工医保",
     "topic": "大病保险连续参保",
     "quote": "第四十七条\n参保人员享受大病保险待遇的标准，根据其医疗费用发生时连续参加基本医疗保险的时间确定：\n（一）连续参保时间不满\n12个月的，按正常待遇的50%支付;\n（二）连续参保时间满\n12个月不满24个月的，按正常待遇的75%支付;\n（三）连续参保时间满\n24个月的，按正常待遇的100%支付。\n退休人员、医疗救助对象大病保险待遇不受连续参保时间限制。",
     "params": [
      {
       "key": "tier_thresholds_months",
       "value": [
        12,
        24,
        24
       ]
      },
      {
       "key": "tier_rates_pct",
       "value": [
        50.0,
        75.0,
        100.0
       ]
      }
     ],
     "effective_from": null,
     "coverage_year": null,
     "param_tag": "dai_bing_ladder",
     "citation": {
      "doc_number": "厦府规〔2022〕12号",
      "clause_no": "第四十七条",
      "clause_ref": "第四十七条@职工医保",
      "regime": "职工医保",
      "quote": "第四十七条\n参保人员享受大病保险待遇的标准，根据其医疗费用发生时连续参加基本医疗保险的时间确定：\n（一）连续参保时间不满\n12个月的，按正常待遇的50%支付;\n（二）连续参保时间满\n12个月不满24个月的，按正常待遇的75%支付;\n（三）连续参保时间满\n24个月的，按正常待遇的100%支付。\n退休人员、医疗救助对象大病保险待遇不受连续参保时间限制。",
      "url": "https://www.xm.gov.cn/zfgb/99833450",
      "fetched_at": "2026-10-24T23:08:00+08:00",
      "text_sha256": "e76be654ab7df9ef5fda099c2aec9016c6fdbdd18f8527a648afc361cd0bbd8f",
      "evidence_layer": "L1"
     }
    },
    {
     "clause_no": "第五十一条",
     "clause_ref": "第五十一条@职工医保",
     "regime": "职工医保",
     "topic": "生育保险合并实施",
     "quote": "第五十一条\n生育保险与职工基本医疗保险合并实施，统一缴费基数，参加职工基本医疗保险的用人单位在职职工同步参加生育保险。",
     "params": [],
     "effective_from": null,
     "coverage_year": null,
     "param_tag": null,
     "citation": {
      "doc_number": "厦府规〔2022〕12号",
      "clause_no": "第五十一条",
      "clause_ref": "第五十一条@职工医保",
      "regime": "职工医保",
      "quote": "第五十一条\n生育保险与职工基本医疗保险合并实施，统一缴费基数，参加职工基本医疗保险的用人单位在职职工同步参加生育保险。",
      "url": "https://www.xm.gov.cn/zfgb/99833450",
      "fetched_at": "2026-10-24T23:08:00+08:00",
      "text_sha256": "e76be654ab7df9ef5fda099c2aec9016c6fdbdd18f8527a648afc361cd0bbd8f",
      "evidence_layer": "L1"
     }
    },
    {
     "clause_no": "第五十二条",
     "clause_ref": "第五十二条@职工医保",
     "regime": "职工医保",
     "topic": "生育保险参保范围",
     "quote": "第五十二条\n用人单位应按规定参加生育保险，为本单位在职职工及时办理参保登记并按月足额缴纳生育保险费，职工个人不缴费。",
     "params": [],
     "effective_from": null,
     "coverage_year": null,
     "param_tag": null,
     "citation": {
      "doc_number": "厦府规〔2022〕12号",
      "clause_no": "第五十二条",
      "clause_ref": "第五十二条@职工医保",
      "regime": "职工医保",
      "quote": "第五十二条\n用人单位应按规定参加生育保险，为本单位在职职工及时办理参保登记并按月足额缴纳生育保险费，职工个人不缴费。",
      "url": "https://www.xm.gov.cn/zfgb/99833450",
      "fetched_at": "2026-10-24T23:08:00+08:00",
      "text_sha256": "e76be654ab7df9ef5fda099c2aec9016c6fdbdd18f8527a648afc361cd0bbd8f",
      "evidence_layer": "L1"
     }
    },
    {
     "clause_no": "第五十五条",
     "clause_ref": "第五十五条@职工医保",
     "regime": "职工医保",
     "topic": "生育津贴连续参保",
     "quote": "第五十五条\n职工在分娩、妊娠终止、实施计划生育手术前连续缴费满\n12个月（含当月）的，按规定享受生育津贴；当月正常参保缴费但连续缴费不满12个月的，生育津贴按正常待遇的50%支付。",
     "params": [
      {
       "key": "required_months",
       "value": [
        12,
        12
       ]
      },
      {
       "key": "rates_pct",
       "value": [
        50.0
       ]
      }
     ],
     "effective_from": null,
     "coverage_year": null,
     "param_tag": "sheng_yu_12m",
     "citation": {
      "doc_number": "厦府规〔2022〕12号",
      "clause_no": "第五十五条",
      "clause_ref": "第五十五条@职工医保",
      "regime": "职工医保",
      "quote": "第五十五条\n职工在分娩、妊娠终止、实施计划生育手术前连续缴费满\n12个月（含当月）的，按规定享受生育津贴；当月正常参保缴费但连续缴费不满12个月的，生育津贴按正常待遇的50%支付。",
      "url": "https://www.xm.gov.cn/zfgb/99833450",
      "fetched_at": "2026-10-24T23:08:00+08:00",
      "text_sha256": "e76be654ab7df9ef5fda099c2aec9016c6fdbdd18f8527a648afc361cd0bbd8f",
      "evidence_layer": "L1"
     }
    },
    {
     "clause_no": "第六条",
     "clause_ref": "第六条@居民医保",
     "regime": "居民医保",
     "topic": "居民医保筹资机制",
     "quote": "第六条\n城乡居民基本医疗保险费由财政和个人共同承担。建立与经济社会发展水平、财政负担能力和基本医疗消费需求相适应的动态调整筹资机制。具体筹资标准由市医疗保障、财政和税务部门共同研究，经市人民政府同意后公布执行。其中，财政补助资金由市、区两级财政分别承担\n50%。",
     "params": [
      {
       "key": "resident_fiscal_share_pct",
       "value": 50
      }
     ],
     "effective_from": null,
     "coverage_year": null,
     "param_tag": "resident_funding",
     "citation": {
      "doc_number": "厦府规〔2022〕12号",
      "clause_no": "第六条",
      "clause_ref": "第六条@居民医保",
      "regime": "居民医保",
      "quote": "第六条\n城乡居民基本医疗保险费由财政和个人共同承担。建立与经济社会发展水平、财政负担能力和基本医疗消费需求相适应的动态调整筹资机制。具体筹资标准由市医疗保障、财政和税务部门共同研究，经市人民政府同意后公布执行。其中，财政补助资金由市、区两级财政分别承担\n50%。",
      "url": "https://www.xm.gov.cn/zfgb/99833450",
      "fetched_at": "2026-10-24T23:08:00+08:00",
      "text_sha256": "e76be654ab7df9ef5fda099c2aec9016c6fdbdd18f8527a648afc361cd0bbd8f",
      "evidence_layer": "L1"
     }
    },
    {
     "clause_no": "第七条",
     "clause_ref": "第七条@居民医保",
     "regime": "居民医保",
     "topic": "居民医保困难群体资助",
     "quote": "第七条\n符合资助参保政策的医疗救助对象及家庭经济困难大学生，参加居民医保所需个人缴费部分，由政府按规定给予资助。",
     "params": [],
     "effective_from": null,
     "coverage_year": null,
     "param_tag": null,
     "citation": {
      "doc_number": "厦府规〔2022〕12号",
      "clause_no": "第七条",
      "clause_ref": "第七条@居民医保",
      "regime": "居民医保",
      "quote": "第七条\n符合资助参保政策的医疗救助对象及家庭经济困难大学生，参加居民医保所需个人缴费部分，由政府按规定给予资助。",
      "url": "https://www.xm.gov.cn/zfgb/99833450",
      "fetched_at": "2026-10-24T23:08:00+08:00",
      "text_sha256": "e76be654ab7df9ef5fda099c2aec9016c6fdbdd18f8527a648afc361cd0bbd8f",
      "evidence_layer": "L1"
     }
    },
    {
     "clause_no": "第八条",
     "clause_ref": "第八条@居民医保",
     "regime": "居民医保",
     "topic": "居民医保无个人账户",
     "quote": "第八条\n城乡居民基本医疗保险基金只建立统筹基金，不设立个人账户。",
     "params": [],
     "effective_from": null,
     "coverage_year": null,
     "param_tag": null,
     "citation": {
      "doc_number": "厦府规〔2022〕12号",
      "clause_no": "第八条",
      "clause_ref": "第八条@居民医保",
      "regime": "居民医保",
      "quote": "第八条\n城乡居民基本医疗保险基金只建立统筹基金，不设立个人账户。",
      "url": "https://www.xm.gov.cn/zfgb/99833450",
      "fetched_at": "2026-10-24T23:08:00+08:00",
      "text_sha256": "e76be654ab7df9ef5fda099c2aec9016c6fdbdd18f8527a648afc361cd0bbd8f",
      "evidence_layer": "L1"
     }
    },
    {
     "clause_no": "第九条",
     "clause_ref": "第九条@居民医保",
     "regime": "居民医保",
     "topic": "居民医保预缴制与集中期",
     "quote": "第九条\n城乡居民基本医疗保险费实行预缴制，每年\n9月至12月为次年居民医保的集中参保缴费期。城乡居民应当在集中参保缴费期内按规定办理参保登记手续，并按个人缴费标准一次性缴纳下一年度的基本医疗保险费。\n超过集中参保缴费期，符合参保条件的城乡居民可以中途参保，中途参保人员按全年个人缴费标准缴纳基本医疗保险费。",
     "params": [
      {
       "key": "resident_enroll_month_from",
       "value": 9
      },
      {
       "key": "resident_enroll_month_to",
       "value": 12
      },
      {
       "key": "resident_payment_mode",
       "value": "预缴制，一次性缴纳下一年度"
      },
      {
       "key": "resident_midterm_rule",
       "value": "超过集中期中途参保按全年标准缴纳"
      }
     ],
     "effective_from": null,
     "coverage_year": null,
     "param_tag": "resident_prepay",
     "citation": {
      "doc_number": "厦府规〔2022〕12号",
      "clause_no": "第九条",
      "clause_ref": "第九条@居民医保",
      "regime": "居民医保",
      "quote": "第九条\n城乡居民基本医疗保险费实行预缴制，每年\n9月至12月为次年居民医保的集中参保缴费期。城乡居民应当在集中参保缴费期内按规定办理参保登记手续，并按个人缴费标准一次性缴纳下一年度的基本医疗保险费。\n超过集中参保缴费期，符合参保条件的城乡居民可以中途参保，中途参保人员按全年个人缴费标准缴纳基本医疗保险费。",
      "url": "https://www.xm.gov.cn/zfgb/99833450",
      "fetched_at": "2026-10-24T23:08:00+08:00",
      "text_sha256": "e76be654ab7df9ef5fda099c2aec9016c6fdbdd18f8527a648afc361cd0bbd8f",
      "evidence_layer": "L1"
     }
    },
    {
     "clause_no": "第四十六条",
     "clause_ref": "第四十六条@居民医保",
     "regime": "居民医保",
     "topic": "居民医保待遇生效",
     "quote": "第四十六条\n参加本市居民医保的人员，在集中参保缴费期内按规定缴纳下一年度的基本医疗保险费，医疗保险关系从次年\n1月1日起开始生效。\n在当年度开始后参保缴费的城乡居民，当月办理参保登记并次月缴费到账的，医疗保险关系从参保登记当月开始生效；参保登记次月缴费未到账的，医疗保险关系从实际缴费到账当月开始生效。",
     "params": [
      {
       "key": "resident_midterm_effective",
       "value": "当年度参保：当月登记且次月缴费到账→当月生效"
      }
     ],
     "effective_from": null,
     "coverage_year": null,
     "param_tag": "resident_effective",
     "citation": {
      "doc_number": "厦府规〔2022〕12号",
      "clause_no": "第四十六条",
      "clause_ref": "第四十六条@居民医保",
      "regime": "居民医保",
      "quote": "第四十六条\n参加本市居民医保的人员，在集中参保缴费期内按规定缴纳下一年度的基本医疗保险费，医疗保险关系从次年\n1月1日起开始生效。\n在当年度开始后参保缴费的城乡居民，当月办理参保登记并次月缴费到账的，医疗保险关系从参保登记当月开始生效；参保登记次月缴费未到账的，医疗保险关系从实际缴费到账当月开始生效。",
      "url": "https://www.xm.gov.cn/zfgb/99833450",
      "fetched_at": "2026-10-24T23:08:00+08:00",
      "text_sha256": "e76be654ab7df9ef5fda099c2aec9016c6fdbdd18f8527a648afc361cd0bbd8f",
      "evidence_layer": "L1"
     }
    },
    {
     "clause_no": "第四十八条",
     "clause_ref": "第四十八条@居民医保",
     "regime": "居民医保",
     "topic": "居民医保中断缴费处理",
     "quote": "第四十八条\n参保缴费时间应当保持连续，不得随意中断。未按规定及时足额缴纳基本医疗保险费的，认定为中断缴费，并按下列规定处理：\n（一）中断缴费一个年度及以上的，再次参保后连续参保时间重新计算，中断期间不享受医疗保障待遇；\n（二）在当年度开始后\n3个月（含）以内参保并补缴基本医疗保险费且次月缴费到账的，视为连续，中断月份计入连续参保时间，中断期间的待遇可按规定追溯享受；\n（三）在当年度开始\n3个月后（即每年3月后）参保缴费，缴费之前不享受医疗保障待遇，缴费之前发生的医疗费用由个人负担，且不计入个人自付费用计算范围。参保次月缴费到账的，从参保当月起开始重新计算连续参保时间；参保次月缴费未到账的，从实际缴费到账当月起开始重新计算连续参保时间；\n（四）从其他统筹区转入本市并按规定办理基本医疗保险关系转移接续的参保人员，在转移接续前未中断缴费，或中断缴费\n3个月（含）以内续保并补缴基本医疗保险费且次月缴费到账的，在其他统筹区正常参保缴费时间可与本市参保缴费时间合并计算，中断月份计入连续参保时间。",
     "params": [
      {
       "key": "resident_break_rule",
       "value": "中断一个年度及以上：连续参保时间重新计算，中断期间不享受待遇"
      },
      {
       "key": "resident_makeup_3m_rule",
       "value": "当年度开始后3个月内参保并补缴且次月到账视为连续，中断月份计入连续时间"
      }
     ],
     "effective_from": null,
     "coverage_year": null,
     "param_tag": "resident_break",
     "citation": {
      "doc_number": "厦府规〔2022〕12号",
      "clause_no": "第四十八条",
      "clause_ref": "第四十八条@居民医保",
      "regime": "居民医保",
      "quote": "第四十八条\n参保缴费时间应当保持连续，不得随意中断。未按规定及时足额缴纳基本医疗保险费的，认定为中断缴费，并按下列规定处理：\n（一）中断缴费一个年度及以上的，再次参保后连续参保时间重新计算，中断期间不享受医疗保障待遇；\n（二）在当年度开始后\n3个月（含）以内参保并补缴基本医疗保险费且次月缴费到账的，视为连续，中断月份计入连续参保时间，中断期间的待遇可按规定追溯享受；\n（三）在当年度开始\n3个月后（即每年3月后）参保缴费，缴费之前不享受医疗保障待遇，缴费之前发生的医疗费用由个人负担，且不计入个人自付费用计算范围。参保次月缴费到账的，从参保当月起开始重新计算连续参保时间；参保次月缴费未到账的，从实际缴费到账当月起开始重新计算连续参保时间；\n（四）从其他统筹区转入本市并按规定办理基本医疗保险关系转移接续的参保人员，在转移接续前未中断缴费，或中断缴费\n3个月（含）以内续保并补缴基本医疗保险费且次月缴费到账的，在其他统筹区正常参保缴费时间可与本市参保缴费时间合并计算，中断月份计入连续参保时间。",
      "url": "https://www.xm.gov.cn/zfgb/99833450",
      "fetched_at": "2026-10-24T23:08:00+08:00",
      "text_sha256": "e76be654ab7df9ef5fda099c2aec9016c6fdbdd18f8527a648afc361cd0bbd8f",
      "evidence_layer": "L1"
     }
    },
    {
     "clause_no": "第四条",
     "clause_ref": "第四条@居民医保",
     "regime": "居民医保",
     "topic": "居民医保参保范围",
     "quote": "第四条\n本市行政区域内，未参加职工医保或未按照规定享有其他医疗保障的下列城乡居民依法参加居民医保：\n（一）本市户籍的成年居民\n（二）未满\n18周岁的未成年人\n1.本市户籍的未成年人；\n2.父亲或母亲持本市有效居住证且参加本市职工医保的非本市户籍未成年人。\n（三）本市经政府有关部门批准设立的各类全日制学校在校在园学生（以下简称\n“在校学生”）\n各类全日制普通高等院校（包括民办高校、独立学院、成人高等院校全日制普通班）、科研院所（以下统称\n“高校”）中接受普通高等学历教育的全日制本专科生、全日制研究生（以下统称“大学生”）；中等职业学校（含中专、技校、职高）、特殊教育学校、中小学（含小学、初中、高中）中实行学籍管理的全日制学生；幼儿园、托儿所等幼托机构的在册儿童。\n在校学生包括侨、港、澳、台籍学生，不包括以上高校中接受成人高等教育（含脱产、业余、函授形式学习）以及进修、网络、广播电视等学校的学生。",
     "params": [
      {
       "key": "resident_scope_1",
       "value": "本市户籍的成年居民"
      },
      {
       "key": "resident_scope_3",
       "value": "各类全日制学校在校在园学生"
      },
      {
       "key": "resident_scope_4",
       "value": "持本市有效居住证的港澳台人员及其未成年子女"
      }
     ],
     "effective_from": null,
     "coverage_year": null,
     "param_tag": "resident_scope_detail",
     "citation": {
      "doc_number": "厦府规〔2022〕12号",
      "clause_no": "第四条",
      "clause_ref": "第四条@居民医保",
      "regime": "居民医保",
      "quote": "第四条\n本市行政区域内，未参加职工医保或未按照规定享有其他医疗保障的下列城乡居民依法参加居民医保：\n（一）本市户籍的成年居民\n（二）未满\n18周岁的未成年人\n1.本市户籍的未成年人；\n2.父亲或母亲持本市有效居住证且参加本市职工医保的非本市户籍未成年人。\n（三）本市经政府有关部门批准设立的各类全日制学校在校在园学生（以下简称\n“在校学生”）\n各类全日制普通高等院校（包括民办高校、独立学院、成人高等院校全日制普通班）、科研院所（以下统称\n“高校”）中接受普通高等学历教育的全日制本专科生、全日制研究生（以下统称“大学生”）；中等职业学校（含中专、技校、职高）、特殊教育学校、中小学（含小学、初中、高中）中实行学籍管理的全日制学生；幼儿园、托儿所等幼托机构的在册儿童。\n在校学生包括侨、港、澳、台籍学生，不包括以上高校中接受成人高等教育（含脱产、业余、函授形式学习）以及进修、网络、广播电视等学校的学生。",
      "url": "https://www.xm.gov.cn/zfgb/99833450",
      "fetched_at": "2026-10-24T23:08:00+08:00",
      "text_sha256": "e76be654ab7df9ef5fda099c2aec9016c6fdbdd18f8527a648afc361cd0bbd8f",
      "evidence_layer": "L1"
     }
    },
    {
     "clause_no": "第十一条",
     "clause_ref": "第十一条@居民医保",
     "regime": "居民医保",
     "topic": "居民医保参保渠道",
     "quote": "第十一条\n在校学生通过所在学校办理居民医保参保申请，其他城乡居民向户籍所在地或居住地村（居）委会办理参保申请。学校或村（居）委会接到城乡居民申请、进行参保信息采集后，统一向税务部门办理参保登记手续。\n已参加本市居民医保的参保人员，参保信息发生变化或下一医保年度中止参保的，应当及时办理变更或停保手续。参保信息未发生变化且须继续参保的参保人员，在新年度无需重新办理参保登记，按规定及时足额缴纳基本医疗保险费后，医疗保险关系自动延续。",
     "params": [],
     "effective_from": null,
     "coverage_year": null,
     "param_tag": null,
     "citation": {
      "doc_number": "厦府规〔2022〕12号",
      "clause_no": "第十一条",
      "clause_ref": "第十一条@居民医保",
      "regime": "居民医保",
      "quote": "第十一条\n在校学生通过所在学校办理居民医保参保申请，其他城乡居民向户籍所在地或居住地村（居）委会办理参保申请。学校或村（居）委会接到城乡居民申请、进行参保信息采集后，统一向税务部门办理参保登记手续。\n已参加本市居民医保的参保人员，参保信息发生变化或下一医保年度中止参保的，应当及时办理变更或停保手续。参保信息未发生变化且须继续参保的参保人员，在新年度无需重新办理参保登记，按规定及时足额缴纳基本医疗保险费后，医疗保险关系自动延续。",
      "url": "https://www.xm.gov.cn/zfgb/99833450",
      "fetched_at": "2026-10-24T23:08:00+08:00",
      "text_sha256": "e76be654ab7df9ef5fda099c2aec9016c6fdbdd18f8527a648afc361cd0bbd8f",
      "evidence_layer": "L1"
     }
    },
    {
     "clause_no": "第十五条",
     "clause_ref": "第十五条@居民医保",
     "regime": "居民医保",
     "topic": "居民医保不得重复参保",
     "quote": "第十五条\n参保人员不得重复参保、重复享受待遇。发现重复参保的，按下列原则予以清理：\n（一）重复参加居民医保的，原则上保留常住地参保关系；\n（二）学生重复参保的，原则上保留学籍地参保关系；\n（三）跨制度重复参保且连续参加职工医保一年以上（含一年）的，原则上保留职工医保参保关系。\n重复参保缴纳的职工基本医疗保险费不予退回，城乡居民基本医疗保险费在待遇享受期开始前可申请退费。\n本实施细则所称重复参保，是指同一参保人员重复参加同一基本医疗保险制度或重复参加不同基本医疗保险制度，具体表现为同一时间段内同一参保人员有两条及以上参保缴费状态正常的参保信息记录。\n第二节\n基本医疗保险待遇",
     "params": [],
     "effective_from": null,
     "coverage_year": null,
     "param_tag": null,
     "citation": {
      "doc_number": "厦府规〔2022〕12号",
      "clause_no": "第十五条",
      "clause_ref": "第十五条@居民医保",
      "regime": "居民医保",
      "quote": "第十五条\n参保人员不得重复参保、重复享受待遇。发现重复参保的，按下列原则予以清理：\n（一）重复参加居民医保的，原则上保留常住地参保关系；\n（二）学生重复参保的，原则上保留学籍地参保关系；\n（三）跨制度重复参保且连续参加职工医保一年以上（含一年）的，原则上保留职工医保参保关系。\n重复参保缴纳的职工基本医疗保险费不予退回，城乡居民基本医疗保险费在待遇享受期开始前可申请退费。\n本实施细则所称重复参保，是指同一参保人员重复参加同一基本医疗保险制度或重复参加不同基本医疗保险制度，具体表现为同一时间段内同一参保人员有两条及以上参保缴费状态正常的参保信息记录。\n第二节\n基本医疗保险待遇",
      "url": "https://www.xm.gov.cn/zfgb/99833450",
      "fetched_at": "2026-10-24T23:08:00+08:00",
      "text_sha256": "e76be654ab7df9ef5fda099c2aec9016c6fdbdd18f8527a648afc361cd0bbd8f",
      "evidence_layer": "L1"
     }
    },
    {
     "clause_no": "第二十四条",
     "clause_ref": "第二十四条@居民医保",
     "regime": "居民医保",
     "topic": "居民医保统筹封顶线",
     "quote": "第二十四条\n参保人员发生的符合基金支付范围的医疗费用，在一个医保年度内基本医疗保险统筹基金累计的最高支付限额为\n10万元。",
     "params": [
      {
       "key": "resident_fund_cap_wan",
       "value": 10.0
      }
     ],
     "effective_from": null,
     "coverage_year": null,
     "param_tag": "resident_cap",
     "citation": {
      "doc_number": "厦府规〔2022〕12号",
      "clause_no": "第二十四条",
      "clause_ref": "第二十四条@居民医保",
      "regime": "居民医保",
      "quote": "第二十四条\n参保人员发生的符合基金支付范围的医疗费用，在一个医保年度内基本医疗保险统筹基金累计的最高支付限额为\n10万元。",
      "url": "https://www.xm.gov.cn/zfgb/99833450",
      "fetched_at": "2026-10-24T23:08:00+08:00",
      "text_sha256": "e76be654ab7df9ef5fda099c2aec9016c6fdbdd18f8527a648afc361cd0bbd8f",
      "evidence_layer": "L1"
     }
    },
    {
     "clause_no": "第二十五条",
     "clause_ref": "第二十五条@居民医保",
     "regime": "居民医保",
     "topic": "居民医保连续参保阶梯",
     "quote": "第二十五条\n参保人员享受统筹基金支付待遇的标准，根据其医疗费用发生时连续参加基本医疗保险的时间确定：\n（一）连续参保时间不满\n12个月的，按统筹基金正常待遇的50%支付;\n（二）连续参保时间满\n12个月不满24个月的，按统筹基金正常待遇的75%支付;\n（三）连续参保时间满\n24个月的，按统筹基金正常待遇的100%支付。\n未成年人、在校学生、医疗救助对象统筹基金支付待遇不受连续参保时间限制。",
     "params": [
      {
       "key": "resident_tier_thresholds_months",
       "value": [
        12,
        24,
        24
       ]
      },
      {
       "key": "resident_tier_rates_pct",
       "value": [
        50.0,
        75.0,
        100.0
       ]
      }
     ],
     "effective_from": null,
     "coverage_year": null,
     "param_tag": "resident_tier",
     "citation": {
      "doc_number": "厦府规〔2022〕12号",
      "clause_no": "第二十五条",
      "clause_ref": "第二十五条@居民医保",
      "regime": "居民医保",
      "quote": "第二十五条\n参保人员享受统筹基金支付待遇的标准，根据其医疗费用发生时连续参加基本医疗保险的时间确定：\n（一）连续参保时间不满\n12个月的，按统筹基金正常待遇的50%支付;\n（二）连续参保时间满\n12个月不满24个月的，按统筹基金正常待遇的75%支付;\n（三）连续参保时间满\n24个月的，按统筹基金正常待遇的100%支付。\n未成年人、在校学生、医疗救助对象统筹基金支付待遇不受连续参保时间限制。",
      "url": "https://www.xm.gov.cn/zfgb/99833450",
      "fetched_at": "2026-10-24T23:08:00+08:00",
      "text_sha256": "e76be654ab7df9ef5fda099c2aec9016c6fdbdd18f8527a648afc361cd0bbd8f",
      "evidence_layer": "L1"
     }
    },
    {
     "clause_no": "第三十二条",
     "clause_ref": "第三十二条@居民医保",
     "regime": "居民医保",
     "topic": "居民大病保险连续参保",
     "quote": "第三十二条\n参保人员享受大病保险待遇的标准，根据其医疗费用发生时连续参加基本医疗保险的时间确定：\n（一）连续参保时间不满\n12个月的，按正常待遇的50%支付;\n（二）连续参保时间满\n12个月不满24个月的，按正常待遇的75%支付;\n（三）连续参保时间满\n24个月的，按正常待遇的100%支付。\n未成年人、在校学生、医疗救助对象大病保险待遇不受连续参保时间限制。",
     "params": [
      {
       "key": "resident_db_tier_rates_pct",
       "value": [
        50.0,
        75.0,
        100.0
       ]
      }
     ],
     "effective_from": null,
     "coverage_year": null,
     "param_tag": "resident_db_tier",
     "citation": {
      "doc_number": "厦府规〔2022〕12号",
      "clause_no": "第三十二条",
      "clause_ref": "第三十二条@居民医保",
      "regime": "居民医保",
      "quote": "第三十二条\n参保人员享受大病保险待遇的标准，根据其医疗费用发生时连续参加基本医疗保险的时间确定：\n（一）连续参保时间不满\n12个月的，按正常待遇的50%支付;\n（二）连续参保时间满\n12个月不满24个月的，按正常待遇的75%支付;\n（三）连续参保时间满\n24个月的，按正常待遇的100%支付。\n未成年人、在校学生、医疗救助对象大病保险待遇不受连续参保时间限制。",
      "url": "https://www.xm.gov.cn/zfgb/99833450",
      "fetched_at": "2026-10-24T23:08:00+08:00",
      "text_sha256": "e76be654ab7df9ef5fda099c2aec9016c6fdbdd18f8527a648afc361cd0bbd8f",
      "evidence_layer": "L1"
     }
    },
    {
     "clause_no": "第四十九条",
     "clause_ref": "第四十九条@居民医保",
     "regime": "居民医保",
     "topic": "职工转居民医保衔接",
     "quote": "第四十九条\n职工医保转换为居民医保的参保人员，其年度内发生的医疗费用累加计算，按转换后的参保险种享受基本医疗保险待遇，职工个人账户实际结余资金可继续结转使用。\n在参保身份转换期间未中断缴费，或中断缴费\n3个月（含）以内续保并补缴中断期间基本医疗保险费且次月缴费到账的，视为连续；其参保身份转换前后的正常缴费时间合并计算，转换中断月份计入连续参保时间，中断期间的待遇可按规定追溯享受。",
     "params": [
      {
       "key": "switch_rule",
       "value": "职工医保转居民医保：年度内医疗费用累加计算，按转换后参保险种享受待遇"
      },
      {
       "key": "switch_account",
       "value": "职工个人账户实际结余资金可继续结转使用"
      }
     ],
     "effective_from": null,
     "coverage_year": null,
     "param_tag": "switch_to_resident",
     "citation": {
      "doc_number": "厦府规〔2022〕12号",
      "clause_no": "第四十九条",
      "clause_ref": "第四十九条@居民医保",
      "regime": "居民医保",
      "quote": "第四十九条\n职工医保转换为居民医保的参保人员，其年度内发生的医疗费用累加计算，按转换后的参保险种享受基本医疗保险待遇，职工个人账户实际结余资金可继续结转使用。\n在参保身份转换期间未中断缴费，或中断缴费\n3个月（含）以内续保并补缴中断期间基本医疗保险费且次月缴费到账的，视为连续；其参保身份转换前后的正常缴费时间合并计算，转换中断月份计入连续参保时间，中断期间的待遇可按规定追溯享受。",
      "url": "https://www.xm.gov.cn/zfgb/99833450",
      "fetched_at": "2026-10-24T23:08:00+08:00",
      "text_sha256": "e76be654ab7df9ef5fda099c2aec9016c6fdbdd18f8527a648afc361cd0bbd8f",
      "evidence_layer": "L1"
     }
    },
    {
     "clause_no": "第四条",
     "clause_ref": "第四条@职工医保",
     "regime": "职工医保",
     "topic": "职工医保参保范围与灵活就业",
     "quote": "第四条\n本市行政区域内的国家机关、企业、事业单位、社会组织、有雇工的个体工商户等用人单位（以下统称\n“用人单位”）及其职工应当参加职工医保。\n法定劳动年龄内的本市户籍人员、本市有效居住证持有人（含港澳台人员），属于无雇工的个体工商户、未在用人单位参加职工医保的非全日制从业人员、新就业形态劳动者以及其他灵活就业人员的（以下统称\n“灵活就业人员”），可以个人身份参加职工医保。",
     "params": [
      {
       "key": "staff_scope_hukou",
       "value": "法定劳动年龄内的本市户籍人员"
      },
      {
       "key": "staff_scope_permit",
       "value": "本市有效居住证持有人（含港澳台人员）"
      },
      {
       "key": "staff_scope_groups",
       "value": "无雇工的个体工商户 / 未在用人单位参加职工医保的非全日制从业人员 / 新就业形态劳动者 / 其他灵活就业人员"
      },
      {
       "key": "staff_scope_way",
       "value": "可以个人身份参加职工医保"
      },
      {
       "key": "staff_scope_hukou_limit",
       "value": "本市户籍 或 本市有效居住证（含港澳台），二者满足其一"
      }
     ],
     "effective_from": null,
     "coverage_year": null,
     "param_tag": "staff_scope",
     "citation": {
      "doc_number": "厦府规〔2022〕12号",
      "clause_no": "第四条",
      "clause_ref": "第四条@职工医保",
      "regime": "职工医保",
      "quote": "第四条\n本市行政区域内的国家机关、企业、事业单位、社会组织、有雇工的个体工商户等用人单位（以下统称\n“用人单位”）及其职工应当参加职工医保。\n法定劳动年龄内的本市户籍人员、本市有效居住证持有人（含港澳台人员），属于无雇工的个体工商户、未在用人单位参加职工医保的非全日制从业人员、新就业形态劳动者以及其他灵活就业人员的（以下统称\n“灵活就业人员”），可以个人身份参加职工医保。",
      "url": "https://www.xm.gov.cn/zfgb/99833450",
      "fetched_at": "2026-10-24T23:08:00+08:00",
      "text_sha256": "e76be654ab7df9ef5fda099c2aec9016c6fdbdd18f8527a648afc361cd0bbd8f",
      "evidence_layer": "L1"
     }
    },
    {
     "clause_no": "第八十六条",
     "clause_ref": "第八十六条@职工医保",
     "regime": "职工医保",
     "topic": "外国人参照参保",
     "quote": "第八十六条\n依法获得相关就业证件和外国人居留证件并在本市合法就业的外国人，与用人单位建立劳动关系的，可按规定参加职工医保。\n持本市取得的外国人永久居留身份证件的人员，属于灵活就业的，可参照本市有效居住证持有人以个人身份参加职工医保。",
     "params": [
      {
       "key": "foreign_permanent_resident",
       "value": "持本市取得的外国人永久居留身份证件，属灵活就业的可参照居住证持有人以个人身份参加"
      }
     ],
     "effective_from": null,
     "coverage_year": null,
     "param_tag": "foreign_participant",
     "citation": {
      "doc_number": "厦府规〔2022〕12号",
      "clause_no": "第八十六条",
      "clause_ref": "第八十六条@职工医保",
      "regime": "职工医保",
      "quote": "第八十六条\n依法获得相关就业证件和外国人居留证件并在本市合法就业的外国人，与用人单位建立劳动关系的，可按规定参加职工医保。\n持本市取得的外国人永久居留身份证件的人员，属于灵活就业的，可参照本市有效居住证持有人以个人身份参加职工医保。",
      "url": "https://www.xm.gov.cn/zfgb/99833450",
      "fetched_at": "2026-10-24T23:08:00+08:00",
      "text_sha256": "e76be654ab7df9ef5fda099c2aec9016c6fdbdd18f8527a648afc361cd0bbd8f",
      "evidence_layer": "L1"
     }
    },
    {
     "clause_no": "第三十二条",
     "clause_ref": "第三十二条@职工医保",
     "regime": "职工医保",
     "topic": "医保关系转移接续",
     "quote": "第三十二条\n参保人员跨统筹地区流动，按规定办理基本医疗保险关系转移接续；生育保险关系随职工基本医疗保险关系一并转移接续。已享受职工医保退休待遇的，不再转移基本医疗保险关系。\n办理转移接续手续后，其在异地的个人账户资金可转入本市，与本市个人账户资金合并计算；职工医保缴费年限累计计算，但重复缴费的年限不得累加计算。\n参加居民医保以及非按职工医保标准缴费的年限，不作为职工医保缴费年限。",
     "params": [
      {
       "key": "transfer_maternity",
       "value": "生育保险关系随职工医保关系一并转移接续"
      },
      {
       "key": "transfer_account",
       "value": "异地个人账户资金可转入本市并合并计算"
      },
      {
       "key": "transfer_no_double",
       "value": "职工医保缴费年限累计计算，重复缴费年限不得累加"
      },
      {
       "key": "transfer_not_counted",
       "value": "参加居民医保及非按职工医保标准缴费的年限，不作为职工医保缴费年限"
      }
     ],
     "effective_from": null,
     "coverage_year": null,
     "param_tag": "transfer",
     "citation": {
      "doc_number": "厦府规〔2022〕12号",
      "clause_no": "第三十二条",
      "clause_ref": "第三十二条@职工医保",
      "regime": "职工医保",
      "quote": "第三十二条\n参保人员跨统筹地区流动，按规定办理基本医疗保险关系转移接续；生育保险关系随职工基本医疗保险关系一并转移接续。已享受职工医保退休待遇的，不再转移基本医疗保险关系。\n办理转移接续手续后，其在异地的个人账户资金可转入本市，与本市个人账户资金合并计算；职工医保缴费年限累计计算，但重复缴费的年限不得累加计算。\n参加居民医保以及非按职工医保标准缴费的年限，不作为职工医保缴费年限。",
      "url": "https://www.xm.gov.cn/zfgb/99833450",
      "fetched_at": "2026-10-24T23:08:00+08:00",
      "text_sha256": "e76be654ab7df9ef5fda099c2aec9016c6fdbdd18f8527a648afc361cd0bbd8f",
      "evidence_layer": "L1"
     }
    },
    {
     "clause_no": "第三十三条",
     "clause_ref": "第三十三条@职工医保",
     "regime": "职工医保",
     "topic": "视同缴费年限认定",
     "quote": "第三十三条\n参保人员在各地实施职工医保制度前，符合国家、省规定的连续工龄或工作年限以及缴纳基本养老保险费的年限，视同职工医保缴费年限。",
     "params": [
      {
       "key": "deemed_years_rule",
       "value": "各地实施职工医保制度前的符合规定的连续工龄/工作年限及缴纳基本养老保险费年限，视同职工医保缴费年限"
      }
     ],
     "effective_from": null,
     "coverage_year": null,
     "param_tag": "deemed_years",
     "citation": {
      "doc_number": "厦府规〔2022〕12号",
      "clause_no": "第三十三条",
      "clause_ref": "第三十三条@职工医保",
      "regime": "职工医保",
      "quote": "第三十三条\n参保人员在各地实施职工医保制度前，符合国家、省规定的连续工龄或工作年限以及缴纳基本养老保险费的年限，视同职工医保缴费年限。",
      "url": "https://www.xm.gov.cn/zfgb/99833450",
      "fetched_at": "2026-10-24T23:08:00+08:00",
      "text_sha256": "e76be654ab7df9ef5fda099c2aec9016c6fdbdd18f8527a648afc361cd0bbd8f",
      "evidence_layer": "L1"
     }
    },
    {
     "clause_no": "第三十四条",
     "clause_ref": "第三十四条@职工医保",
     "regime": "职工医保",
     "topic": "职工医保退休资格",
     "quote": "第三十四条\n具备申报本市职工医保退休待遇资格的人员包括：\n（一）本市户籍人员\n;\n（二）在达到法定退休年龄时已实际缴纳本市职工基本医疗保险费满\n10年的非本市户籍人员（含港澳台人员、外国人）;\n（三）在达到法定退休年龄时，按国家、省规定参加福建省基本养老保险行业统筹或福建省本级机关事业单位养老保险，按照属地原则参加本市职工医保的省、部属驻厦用人单位参保人员；\n（四）本市机关、事业单位编制人员及备案员额人员；\n（五）本市认定的高层次人才及其配偶。",
     "params": [
      {
       "key": "retire_min_years",
       "value": 10
      },
      {
       "key": "retire_scope_1",
       "value": "本市户籍人员"
      },
      {
       "key": "retire_scope_3",
       "value": "省部属驻厦用人单位参保人员"
      },
      {
       "key": "retire_scope_5",
       "value": "本市认定的高层次人才及其配偶"
      }
     ],
     "effective_from": null,
     "coverage_year": null,
     "param_tag": "retire_eligibility",
     "citation": {
      "doc_number": "厦府规〔2022〕12号",
      "clause_no": "第三十四条",
      "clause_ref": "第三十四条@职工医保",
      "regime": "职工医保",
      "quote": "第三十四条\n具备申报本市职工医保退休待遇资格的人员包括：\n（一）本市户籍人员\n;\n（二）在达到法定退休年龄时已实际缴纳本市职工基本医疗保险费满\n10年的非本市户籍人员（含港澳台人员、外国人）;\n（三）在达到法定退休年龄时，按国家、省规定参加福建省基本养老保险行业统筹或福建省本级机关事业单位养老保险，按照属地原则参加本市职工医保的省、部属驻厦用人单位参保人员；\n（四）本市机关、事业单位编制人员及备案员额人员；\n（五）本市认定的高层次人才及其配偶。",
      "url": "https://www.xm.gov.cn/zfgb/99833450",
      "fetched_at": "2026-10-24T23:08:00+08:00",
      "text_sha256": "e76be654ab7df9ef5fda099c2aec9016c6fdbdd18f8527a648afc361cd0bbd8f",
      "evidence_layer": "L1"
     }
    },
    {
     "clause_no": "第六十三条",
     "clause_ref": "第六十三条@居民医保",
     "regime": "居民医保",
     "topic": "居民医保港澳台",
     "quote": "第六十三条\n持本市有效居住证的港、澳、台人员，以及父亲或母亲持本市有效居住证的港、澳、台未成年人，可按规定参加居民医保。",
     "params": [],
     "effective_from": null,
     "coverage_year": null,
     "param_tag": null,
     "citation": {
      "doc_number": "厦府规〔2022〕12号",
      "clause_no": "第六十三条",
      "clause_ref": "第六十三条@居民医保",
      "regime": "居民医保",
      "quote": "第六十三条\n持本市有效居住证的港、澳、台人员，以及父亲或母亲持本市有效居住证的港、澳、台未成年人，可按规定参加居民医保。",
      "url": "https://www.xm.gov.cn/zfgb/99833450",
      "fetched_at": "2026-10-24T23:08:00+08:00",
      "text_sha256": "e76be654ab7df9ef5fda099c2aec9016c6fdbdd18f8527a648afc361cd0bbd8f",
      "evidence_layer": "L1"
     }
    },
    {
     "clause_no": "第六十五条",
     "clause_ref": "第六十五条@居民医保",
     "regime": "居民医保",
     "topic": "居民医保人才",
     "quote": "第六十五条\n本市认定的高层次人才及其配偶、子女可不受国籍、户籍限制，按规定参加居民医保。\n第八章\n附\n则",
     "params": [],
     "effective_from": null,
     "coverage_year": null,
     "param_tag": null,
     "citation": {
      "doc_number": "厦府规〔2022〕12号",
      "clause_no": "第六十五条",
      "clause_ref": "第六十五条@居民医保",
      "regime": "居民医保",
      "quote": "第六十五条\n本市认定的高层次人才及其配偶、子女可不受国籍、户籍限制，按规定参加居民医保。\n第八章\n附\n则",
      "url": "https://www.xm.gov.cn/zfgb/99833450",
      "fetched_at": "2026-10-24T23:08:00+08:00",
      "text_sha256": "e76be654ab7df9ef5fda099c2aec9016c6fdbdd18f8527a648afc361cd0bbd8f",
      "evidence_layer": "L1"
     }
    }
   ],
   "conditions": [],
   "needs_ocr": false,
   "version_notes": [
    {
     "target": "xm-yb-2026-13",
     "reason": "生育保险参保范围条款被闽医保〔2026〕13号覆盖，2026-03-01 起分界"
    }
   ]
  },
  "xm-yb-2026-13": {
   "policy_id": "xm-yb-2026-13",
   "title": "关于完善生育保险参保缴费和待遇享受等有关问题的通知",
   "doc_number": "闽医保〔2026〕13号",
   "issuer": "福建省医疗保障局 福建省财政厅 国家税务总局福建省税务局",
   "layer": "L1",
   "source_url": "https://ylbz.xm.gov.cn/zwgk/zfxxgk/ml/zcwj/qtwj/202603/P020260313526925372654.pdf",
   "pdf_url": null,
   "fetched_at": "2026-10-24T23:08:00+08:00",
   "raw_sha256": "86ec32d96af7c36f6f7db13e1f8f7a16b03febd333f5e476d584c89309e6b991",
   "text_sha256": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
   "text_chars": 0,
   "cjk_ratio": 0.0,
   "valid_from": "2026-03-01",
   "valid_to": null,
   "supersedes": [
    "xm-yb-2022-12",
    "xm-yb-2019-126"
   ],
   "superseded_by": [],
   "status": "active",
   "clauses": [
    {
     "clause_no": "（分段）",
     "clause_ref": "（分段）@职工医保",
     "regime": "职工医保",
     "topic": "灵活就业纳入生育保险",
     "quote": "（一）将参加职工医保的灵活就业人员、农民工、新就业形\n态人员（以下统称灵活就业人员）纳入生育保险覆盖范围。",
     "params": [],
     "effective_from": null,
     "coverage_year": null,
     "param_tag": "flexible_maternity_2026",
     "citation": {
      "doc_number": "闽医保〔2026〕13号",
      "clause_no": "（分段）",
      "clause_ref": "（分段）@职工医保",
      "regime": "职工医保",
      "quote": "（一）将参加职工医保的灵活就业人员、农民工、新就业形\n态人员（以下统称灵活就业人员）纳入生育保险覆盖范围。",
      "url": "https://ylbz.xm.gov.cn/zwgk/zfxxgk/ml/zcwj/qtwj/202603/P020260313526925372654.pdf",
      "fetched_at": "2026-10-24T23:08:00+08:00",
      "text_sha256": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
      "evidence_layer": "L1"
     }
    },
    {
     "clause_no": "（分段）",
     "clause_ref": "（分段）@职工医保",
     "regime": "职工医保",
     "topic": "生育保险灵活就业缴费",
     "quote": "参加生育保险的灵活就业人员缴费基数按照参\n加职工医保缴费基数（即不低于上年度全省全口径城镇单位就业\n人员平均工资的60%）、缴费费率按照0.7%，由个人在缴纳职工\n医保费时同步缴纳生育保险费。",
     "params": [
      {
       "key": "flexible_maternity_rate",
       "value": 0.7
      },
      {
       "key": "base_rule",
       "value": "按参加职工医保缴费基数，不低于上年度全省全口径城镇单位就业人员平均工资的60%"
      }
     ],
     "effective_from": null,
     "coverage_year": null,
     "param_tag": "flexible_maternity_fee",
     "citation": {
      "doc_number": "闽医保〔2026〕13号",
      "clause_no": "（分段）",
      "clause_ref": "（分段）@职工医保",
      "regime": "职工医保",
      "quote": "参加生育保险的灵活就业人员缴费基数按照参\n加职工医保缴费基数（即不低于上年度全省全口径城镇单位就业\n人员平均工资的60%）、缴费费率按照0.7%，由个人在缴纳职工\n医保费时同步缴纳生育保险费。",
      "url": "https://ylbz.xm.gov.cn/zwgk/zfxxgk/ml/zcwj/qtwj/202603/P020260313526925372654.pdf",
      "fetched_at": "2026-10-24T23:08:00+08:00",
      "text_sha256": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
      "evidence_layer": "L1"
     }
    },
    {
     "clause_no": "（分段）",
     "clause_ref": "（分段）@职工医保",
     "regime": "职工医保",
     "topic": "失业金代缴生育保险",
     "quote": "（二）落实领取失业保险金人员参加生育保险工作。",
     "params": [],
     "effective_from": null,
     "coverage_year": null,
     "param_tag": "unemployment_pays_maternity",
     "citation": {
      "doc_number": "闽医保〔2026〕13号",
      "clause_no": "（分段）",
      "clause_ref": "（分段）@职工医保",
      "regime": "职工医保",
      "quote": "（二）落实领取失业保险金人员参加生育保险工作。",
      "url": "https://ylbz.xm.gov.cn/zwgk/zfxxgk/ml/zcwj/qtwj/202603/P020260313526925372654.pdf",
      "fetched_at": "2026-10-24T23:08:00+08:00",
      "text_sha256": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
      "evidence_layer": "L1"
     }
    }
   ],
   "conditions": [],
   "needs_ocr": true,
   "version_notes": [
    {
     "target": "xm-yb-2022-12",
     "reason": "生育保险参保范围条款被闽医保〔2026〕13号覆盖，2026-03-01 起分界"
    },
    {
     "target": "xm-yb-2019-126",
     "reason": "灵活就业人员不参加生育保险的表述被闽医保〔2026〕13号覆盖，2026-03-01 起分界"
    }
   ]
  },
  "xm-yb-2026-rate": {
   "policy_id": "xm-yb-2026-rate",
   "title": "关于明确2026年职工基本医疗保险缴费率的公告",
   "doc_number": "厦医保公告 2026年度职工基本医疗保险缴费率",
   "issuer": "厦门市医疗保障局 厦门市财政局 国家税务总局厦门市税务局",
   "layer": "L1",
   "source_url": "https://ylbz.xm.gov.cn/zwgk/tzgg/202512/t20251231_2975001.htm",
   "pdf_url": null,
   "fetched_at": "2026-10-24T23:08:00+08:00",
   "raw_sha256": "c1fbe5f08bf7745b7d6d6bdfc47d49591d91e1a715f8148b44288214c24a977e",
   "text_sha256": "ee874db42bec1411037de51bb9a4a4e3d18e67a35cb1bfc941b2ae47f7a0e282",
   "text_chars": 1257,
   "cjk_ratio": 0.7677,
   "valid_from": "2026-01-01",
   "valid_to": "2026-12-31",
   "supersedes": [
    "xm-yb-2025-rate"
   ],
   "superseded_by": [],
   "status": "active",
   "clauses": [
    {
     "clause_no": "（分段）",
     "clause_ref": "（分段）@职工医保",
     "regime": "职工医保",
     "topic": "2026职工医保费率",
     "quote": "根据《厦门市职工医疗保险实施细则》（厦府规〔2022〕12号）规定，2026年职工基本医疗保险费由用人单位和职工分别按其缴费基数的7.5%和2%按月共同缴纳；灵活就业人员基本医疗保险费的缴费率为9.5%，由个人缴纳。",
     "params": [
      {
       "key": "unit_rate",
       "value": 7.5
      },
      {
       "key": "employee_rate",
       "value": 2.0
      },
      {
       "key": "flexible_rate",
       "value": 9.5
      }
     ],
     "effective_from": null,
     "coverage_year": null,
     "param_tag": "rate_2026",
     "citation": {
      "doc_number": "厦医保公告 2026年度职工基本医疗保险缴费率",
      "clause_no": "（分段）",
      "clause_ref": "（分段）@职工医保",
      "regime": "职工医保",
      "quote": "根据《厦门市职工医疗保险实施细则》（厦府规〔2022〕12号）规定，2026年职工基本医疗保险费由用人单位和职工分别按其缴费基数的7.5%和2%按月共同缴纳；灵活就业人员基本医疗保险费的缴费率为9.5%，由个人缴纳。",
      "url": "https://ylbz.xm.gov.cn/zwgk/tzgg/202512/t20251231_2975001.htm",
      "fetched_at": "2026-10-24T23:08:00+08:00",
      "text_sha256": "ee874db42bec1411037de51bb9a4a4e3d18e67a35cb1bfc941b2ae47f7a0e282",
      "evidence_layer": "L1"
     }
    }
   ],
   "conditions": [],
   "needs_ocr": false,
   "version_notes": [
    {
     "target": "xm-yb-2025-rate",
     "reason": "2026年度缴费率公告替代 2025 年度通知"
    }
   ]
  },
  "xm-yb-2025-rate": {
   "policy_id": "xm-yb-2025-rate",
   "title": "关于公布2025年度职工基本医疗保险缴费率的通知",
   "doc_number": "厦医保 2025年度职工基本医疗保险缴费率",
   "issuer": "厦门市医疗保障局 厦门市财政局 国家税务总局厦门市税务局",
   "layer": "L1",
   "source_url": "https://ylbz.xm.gov.cn/zwgk/zfxxgk/zc/ybzcfg/202501/t20250127_2915362.htm",
   "pdf_url": null,
   "fetched_at": "2026-10-24T23:08:00+08:00",
   "raw_sha256": "2f4e8dfe68020ae5bec52b59b7590472f6571de24f01ab6c6a59425aca072d42",
   "text_sha256": "bf913c52f6ce99ea6b08c2643f1f193e7c2421168b2a23e456a4d0356492e1c4",
   "text_chars": 1338,
   "cjk_ratio": 0.7825,
   "valid_from": "2025-01-01",
   "valid_to": "2025-12-31",
   "supersedes": [],
   "superseded_by": [
    "xm-yb-2026-rate"
   ],
   "status": "active",
   "clauses": [
    {
     "clause_no": "（分段）",
     "clause_ref": "（分段）@职工医保",
     "regime": "职工医保",
     "topic": "2025职工医保费率",
     "quote": "2025年度职工基本医疗保险费由用人单位和职工分别按其缴费基数的6.5%和2%按月共同缴纳。灵活就业人员基本医疗保险费的缴费率为8.5%，由个人缴纳。",
     "params": [
      {
       "key": "unit_rate",
       "value": 6.5
      },
      {
       "key": "employee_rate",
       "value": 2.0
      },
      {
       "key": "flexible_rate",
       "value": 8.5
      }
     ],
     "effective_from": null,
     "coverage_year": null,
     "param_tag": "rate_2025",
     "citation": {
      "doc_number": "厦医保 2025年度职工基本医疗保险缴费率",
      "clause_no": "（分段）",
      "clause_ref": "（分段）@职工医保",
      "regime": "职工医保",
      "quote": "2025年度职工基本医疗保险费由用人单位和职工分别按其缴费基数的6.5%和2%按月共同缴纳。灵活就业人员基本医疗保险费的缴费率为8.5%，由个人缴纳。",
      "url": "https://ylbz.xm.gov.cn/zwgk/zfxxgk/zc/ybzcfg/202501/t20250127_2915362.htm",
      "fetched_at": "2026-10-24T23:08:00+08:00",
      "text_sha256": "bf913c52f6ce99ea6b08c2643f1f193e7c2421168b2a23e456a4d0356492e1c4",
      "evidence_layer": "L1"
     }
    }
   ],
   "conditions": [],
   "needs_ocr": false,
   "version_notes": [
    {
     "target": "xm-yb-2026-rate",
     "reason": "2026年度缴费率公告替代 2025 年度通知"
    }
   ]
  },
  "xm-yb-2025-7": {
   "policy_id": "xm-yb-2025-7",
   "title": "厦门市人民政府关于失业保险纳入省级统筹相关政策调整的通知",
   "doc_number": "厦府规〔2025〕7号",
   "issuer": "厦门市人民政府",
   "layer": "L1",
   "source_url": "https://www.xm.gov.cn/zfgb/99833863",
   "pdf_url": null,
   "fetched_at": "2026-10-24T23:08:00+08:00",
   "raw_sha256": "ef2494d4b7b9b8fab84f328e1ef466c80f0b653eec734aaabab5b20d621ba10c",
   "text_sha256": "1b15834fb11bc054d93821721d13584019859372a0d9f30865fc1f2d6c539f6e",
   "text_chars": 1463,
   "cjk_ratio": 0.7293,
   "valid_from": "2025-01-01",
   "valid_to": "2027-12-31",
   "supersedes": [],
   "superseded_by": [],
   "status": "active",
   "clauses": [
    {
     "clause_no": "（分段）",
     "clause_ref": "（分段）@职工医保",
     "regime": "职工医保",
     "topic": "失业保险待遇省级统筹",
     "quote": "二、关于失业保险待遇政策\n（一）暂停执行“市条例”第十七条第一款、第十八条，原本市城镇户口失业人员的失业保险待遇按“省条例”和“省统筹方案”规定的城镇职工失业保险金标准执行，即失业保险金月发放标准为本市月最低工资标准的90%；领取失业保险金的期限，根据其失业前累计缴费的时间计算，每满1年领取2个月失业保险金，最长期限为24个月。",
     "params": [
      {
       "key": "benefit_rate_pct",
       "value": 90.0
      },
      {
       "key": "years_per_month",
       "value": 1
      },
      {
       "key": "months_per_year",
       "value": 2
      },
      {
       "key": "max_months",
       "value": 24
      },
      {
       "key": "city_rule_suspended",
       "value": "暂停执行《厦门经济特区失业保险条例》第十七条第一款、第十八条，改按《福建省失业保险条例》执行"
      }
     ],
     "effective_from": null,
     "coverage_year": null,
     "param_tag": "shi_ye_90",
     "citation": {
      "doc_number": "厦府规〔2025〕7号",
      "clause_no": "（分段）",
      "clause_ref": "（分段）@职工医保",
      "regime": "职工医保",
      "quote": "二、关于失业保险待遇政策\n（一）暂停执行“市条例”第十七条第一款、第十八条，原本市城镇户口失业人员的失业保险待遇按“省条例”和“省统筹方案”规定的城镇职工失业保险金标准执行，即失业保险金月发放标准为本市月最低工资标准的90%；领取失业保险金的期限，根据其失业前累计缴费的时间计算，每满1年领取2个月失业保险金，最长期限为24个月。",
      "url": "https://www.xm.gov.cn/zfgb/99833863",
      "fetched_at": "2026-10-24T23:08:00+08:00",
      "text_sha256": "1b15834fb11bc054d93821721d13584019859372a0d9f30865fc1f2d6c539f6e",
      "evidence_layer": "L1"
     }
    }
   ],
   "conditions": [],
   "needs_ocr": false
  },
  "fj-rst-2026-13": {
   "policy_id": "fj-rst-2026-13",
   "title": "关于调整2026年职工基本养老保险和失业保险缴费基数的通知",
   "doc_number": "闽人社文〔2026〕13号",
   "issuer": "福建省人力资源和社会保障厅 福建省财政厅 国家税务总局福建省税务局",
   "layer": "L1",
   "source_url": "https://hrss.xm.gov.cn/xxgk/sjwj/202610/t20261009_3020482.htm",
   "pdf_url": null,
   "fetched_at": "2026-10-24T23:08:00+08:00",
   "raw_sha256": "525832879ae44493cbc5d70518e5e77dee97b2d577d5cd40da808bc1394dcb26",
   "text_sha256": "72d36d4e3953478d03410abeb5c5984bfcf29f8d1df6f7d5dc7a190f458c6bd6",
   "text_chars": 951,
   "cjk_ratio": 0.7108,
   "valid_from": "2026-01-01",
   "valid_to": null,
   "supersedes": [],
   "superseded_by": [],
   "status": "active",
   "clauses": [
    {
     "clause_no": "（分段）",
     "clause_ref": "（分段）@职工医保",
     "regime": "职工医保",
     "topic": "养老失业缴费基数",
     "quote": "一、自2026年1月1日起，全省企业职工基本养老保险、机关事业单位养老保险月缴费基数上限按照22893元、下限按照4579元执行。",
     "params": [
      {
       "key": "base_upper",
       "value": 22893
      },
      {
       "key": "base_lower",
       "value": 4579
      }
     ],
     "effective_from": null,
     "coverage_year": null,
     "param_tag": "base_2026",
     "citation": {
      "doc_number": "闽人社文〔2026〕13号",
      "clause_no": "（分段）",
      "clause_ref": "（分段）@职工医保",
      "regime": "职工医保",
      "quote": "一、自2026年1月1日起，全省企业职工基本养老保险、机关事业单位养老保险月缴费基数上限按照22893元、下限按照4579元执行。",
      "url": "https://hrss.xm.gov.cn/xxgk/sjwj/202610/t20261009_3020482.htm",
      "fetched_at": "2026-10-24T23:08:00+08:00",
      "text_sha256": "72d36d4e3953478d03410abeb5c5984bfcf29f8d1df6f7d5dc7a190f458c6bd6",
      "evidence_layer": "L1"
     }
    }
   ],
   "conditions": [],
   "needs_ocr": false
  },
  "xm-gb-2025-2": {
   "policy_id": "xm-gb-2025-2",
   "title": "厦门市退休人员社会化管理服务办法",
   "doc_number": "厦府规〔2025〕2号",
   "issuer": "厦门市人民政府",
   "layer": "L1",
   "source_url": "https://www.xm.gov.cn/zwgk/flfg/sfwj/202503/P020250301753539408346.pdf",
   "pdf_url": null,
   "fetched_at": "2026-10-24T23:08:00+08:00",
   "raw_sha256": "2bdd616e06190624ba2164c9db9944768ce37a32bd9e4035fc5d88ad81c8493c",
   "text_sha256": "fd65e4fe38f4c8d30eb0f6946f1bf6f356752891be40f5310d7e515b9773771b",
   "text_chars": 3250,
   "cjk_ratio": 0.8043,
   "valid_from": "2025-03-01",
   "valid_to": null,
   "supersedes": [],
   "superseded_by": [],
   "status": "active",
   "clauses": [],
   "conditions": [],
   "needs_ocr": false
  },
  "xm-tax-param": {
   "policy_id": "xm-tax-param",
   "title": "社保费费种费率表（历年社平工资参数、最低工资标准等）",
   "doc_number": "厦门税务 社保费费种费率表",
   "issuer": "国家税务总局厦门市税务局",
   "layer": "L3",
   "source_url": "https://xiamen.chinatax.gov.cn/xmswcms/mobile/content/N3333.html",
   "pdf_url": null,
   "fetched_at": "2026-10-24T22:35:12+08:00",
   "raw_sha256": "6104e7a64ed162ea9973375020eba06908257c94137cfa0f8432b1a29a8145b4",
   "text_sha256": "c3180b68021207ca457afc112c4cd441da54362ff00da62179d79b726dea62fe",
   "text_chars": 2918,
   "cjk_ratio": 0.6847,
   "valid_from": null,
   "valid_to": null,
   "supersedes": [],
   "superseded_by": [],
   "status": "active",
   "clauses": [],
   "conditions": [],
   "needs_ocr": false
  },
  "xm-yb-interpret": {
   "policy_id": "xm-yb-interpret",
   "title": "灵活就业人员参加职工医保政策解读",
   "doc_number": "厦门市医保局 在线访谈文字实录",
   "issuer": "厦门市医疗保障局",
   "layer": "L4",
   "source_url": "https://www.xm.gov.cn/ftzb/sybjjdlhjyry/wzsl/",
   "pdf_url": null,
   "fetched_at": "2026-10-24T22:35:16+08:00",
   "raw_sha256": "2b2439610eca97b297638b44ceaa77edab1d6340a560abd8efa57a7b4919d229",
   "text_sha256": "60f0f6afd8a6ff85e94aadc34d4509559a55d75bac85107cf12146a6ea0513a1",
   "text_chars": 890,
   "cjk_ratio": 0.0169,
   "valid_from": null,
   "valid_to": null,
   "supersedes": [],
   "superseded_by": [],
   "status": "active",
   "clauses": [],
   "conditions": [],
   "needs_ocr": true
  },
  "xm-chc-interpret": {
   "policy_id": "xm-chc-interpret",
   "title": "《厦门市长期护理保险实施细则》政策解读",
   "doc_number": "厦医保规〔2026〕3号 政策解读",
   "issuer": "厦门市医疗保障局",
   "layer": "L4",
   "source_url": "https://ylbz.xm.gov.cn/zwgk/zfxxgk/ml/zcwj/zcjd/202610/t20261010_3020657.htm",
   "pdf_url": null,
   "fetched_at": "2026-10-25T10:24:07+08:00",
   "raw_sha256": "6e9eaff292493ca67a1d647a0bf06f928346a2b1cd1913d1be266392ff2186e3",
   "text_sha256": "33c4af7133b5a47490cbecfc616c06ea0da3a5f281abf23bd298a6add496c2c3",
   "text_chars": 2508,
   "cjk_ratio": 0.8098,
   "valid_from": "2026-10-10",
   "valid_to": null,
   "supersedes": [],
   "superseded_by": [],
   "status": "active",
   "clauses": [],
   "conditions": [],
   "needs_ocr": false
  },
  "xm-waitperiod": {
   "policy_id": "xm-waitperiod",
   "title": "全民参保缴费集中宣传月 待遇等待期 两大激励 答疑解惑",
   "doc_number": "待遇等待期与两大激励 官方答疑",
   "issuer": "厦门市医疗保障局",
   "layer": "L4",
   "source_url": "https://ylbz.xm.gov.cn/zwgk/ybdt/202512/t20251201_2969555.htm",
   "pdf_url": null,
   "fetched_at": "2026-10-25T10:24:07+08:00",
   "raw_sha256": "418dbf12e5b589fffd938ac0a3d0fac0a77723871afe0fe2a9b6e3f8e54f8999",
   "text_sha256": "31699e7035a9f6fbf4d1e044ec070f9332ae2e35a8334584392a76724186a0e2",
   "text_chars": 2489,
   "cjk_ratio": 0.7545,
   "valid_from": "2025-01-01",
   "valid_to": null,
   "supersedes": [],
   "superseded_by": [],
   "status": "active",
   "clauses": [
    {
     "clause_no": "（分段）",
     "clause_ref": "（分段）@居民医保",
     "regime": "居民医保",
     "topic": "居民医保固定等待期",
     "quote": "固定待遇等待期：\n除新生儿、医疗救助对象、当年退出现役的军人等特殊群体外，未在居民医保集中参保期参保或未连续参保的，参保后设置固定待遇等待期3个月。",
     "params": [
      {
       "key": "resident_wait_fixed_months",
       "value": 3
      },
      {
       "key": "resident_wait_scope",
       "value": "除新生儿、医疗救助对象、当年退出现役的军人等特殊群体外，未在居民医保集中参保期参保或未连续参保的适用"
      }
     ],
     "effective_from": null,
     "coverage_year": null,
     "param_tag": "resident_wait_fixed",
     "citation": {
      "doc_number": "待遇等待期与两大激励 官方答疑",
      "clause_no": "（分段）",
      "clause_ref": "（分段）@居民医保",
      "regime": "居民医保",
      "quote": "固定待遇等待期：\n除新生儿、医疗救助对象、当年退出现役的军人等特殊群体外，未在居民医保集中参保期参保或未连续参保的，参保后设置固定待遇等待期3个月。",
      "url": "https://ylbz.xm.gov.cn/zwgk/ybdt/202512/t20251201_2969555.htm",
      "fetched_at": "2026-10-25T10:24:07+08:00",
      "text_sha256": "31699e7035a9f6fbf4d1e044ec070f9332ae2e35a8334584392a76724186a0e2",
      "evidence_layer": "L4"
     }
    },
    {
     "clause_no": "（分段）",
     "clause_ref": "（分段）@居民医保",
     "regime": "居民医保",
     "topic": "居民医保变动等待期",
     "quote": "变动待遇等待期：\n每多断保一年，在固定待遇等待期基础上增加变动待遇等待期1个月。",
     "params": [
      {
       "key": "resident_wait_variable_per_year",
       "value": 1
      }
     ],
     "effective_from": null,
     "coverage_year": null,
     "param_tag": "resident_wait_variable",
     "citation": {
      "doc_number": "待遇等待期与两大激励 官方答疑",
      "clause_no": "（分段）",
      "clause_ref": "（分段）@居民医保",
      "regime": "居民医保",
      "quote": "变动待遇等待期：\n每多断保一年，在固定待遇等待期基础上增加变动待遇等待期1个月。",
      "url": "https://ylbz.xm.gov.cn/zwgk/ybdt/202512/t20251201_2969555.htm",
      "fetched_at": "2026-10-25T10:24:07+08:00",
      "text_sha256": "31699e7035a9f6fbf4d1e044ec070f9332ae2e35a8334584392a76724186a0e2",
      "evidence_layer": "L4"
     }
    },
    {
     "clause_no": "（分段）",
     "clause_ref": "（分段）@居民医保",
     "regime": "居民医保",
     "topic": "居民医保连续参保激励",
     "quote": "连续参保激励和零报销激励\n以我市为例\n↓↓↓\n连续参保激励：\n连续参加居民医保满4年的，之后每连续参保1年，大病保险最高支付限额每年提高3000元",
     "params": [
      {
       "key": "resident_streak_years",
       "value": 4
      },
      {
       "key": "resident_streak_bonus_per_year",
       "value": 3000
      }
     ],
     "effective_from": null,
     "coverage_year": null,
     "param_tag": "resident_streak_bonus",
     "citation": {
      "doc_number": "待遇等待期与两大激励 官方答疑",
      "clause_no": "（分段）",
      "clause_ref": "（分段）@居民医保",
      "regime": "居民医保",
      "quote": "连续参保激励和零报销激励\n以我市为例\n↓↓↓\n连续参保激励：\n连续参加居民医保满4年的，之后每连续参保1年，大病保险最高支付限额每年提高3000元",
      "url": "https://ylbz.xm.gov.cn/zwgk/ybdt/202512/t20251201_2969555.htm",
      "fetched_at": "2026-10-25T10:24:07+08:00",
      "text_sha256": "31699e7035a9f6fbf4d1e044ec070f9332ae2e35a8334584392a76724186a0e2",
      "evidence_layer": "L4"
     }
    }
   ],
   "conditions": [],
   "needs_ocr": false
  },
  "xm-pension-transfer-interpret": {
   "policy_id": "xm-pension-transfer-interpret",
   "title": "海沧区社保中心 在线访谈文字实录",
   "doc_number": "养老保险转移、退保、继承政策解读",
   "issuer": "厦门市海沧区人民政府",
   "layer": "L4",
   "source_url": "https://www.haicang.gov.cn/hdjl/zxft/202512/t20251205_1129768.htm",
   "pdf_url": null,
   "fetched_at": "2026-10-25T10:24:11+08:00",
   "raw_sha256": "4d5af19216159433ec7abc70da3c9a381d8a9aa58db0a0d3e24badf0ccc7db8b",
   "text_sha256": "835636cf95c738d90d6d728b7e05975363c13edb4a777a27b258095436a4f03a",
   "text_chars": 709,
   "cjk_ratio": 0.6911,
   "valid_from": null,
   "valid_to": null,
   "supersedes": [],
   "superseded_by": [],
   "status": "active",
   "clauses": [],
   "conditions": [],
   "needs_ocr": false
  },
  "xm-residence-pension-interpret": {
   "policy_id": "xm-residence-pension-interpret",
   "title": "解读《关于持有厦门市居住证人员参加企业职工基本养老保险有关意见的通知》",
   "doc_number": "居住证人员参加企业职工基本养老保险 解读",
   "issuer": "厦门市人力资源和社会保障局",
   "layer": "L4",
   "source_url": "https://hrss.xm.gov.cn/gzcy/zxft/jdcxmjzzkcb",
   "pdf_url": null,
   "fetched_at": "2026-10-25T10:24:11+08:00",
   "raw_sha256": "33b3e4d9e3961ecfba05a4ed5017bb5d592fd795b8269d714207ca7671ae453b",
   "text_sha256": "84023b2d5af7aa69518df8f4b71fbe3fcf99189cd524916b9381f7c136aae153",
   "text_chars": 3741,
   "cjk_ratio": 0.7586,
   "valid_from": null,
   "valid_to": null,
   "supersedes": [],
   "superseded_by": [],
   "status": "active",
   "clauses": [
    {
     "clause_no": "（分段）",
     "clause_ref": "（分段）@职工医保",
     "regime": "职工医保",
     "topic": "灵活就业养老缴费基数与档次",
     "quote": "参保人员按不低于全市上年度职工月平均工资60%且不高于全市上年度职工月平均工资300%的标准自行选择缴费基数（共7个档次），今年的7个档次缴费基数分别是3772.80元（全市上年度职工月平均工资的60%）、4401.60元（全市上年度职工月平均工资的70%）、5030.40元（全市上年度职工月平均工资的80%）、5659.20元（全市上年度职工月平均工资的90%）、6288.00元（全市上年度职工月平均工资的100%）、12576.00元（全市上年度职工月平均工资的200%）、18864.00元（全市上年度职工月平均工资的300%）。\n上述缴费基数乘以20%的缴费比例后，7个档次的月缴费金额从低到高分别是754.56元、880.32元、1006.08元、1131.84元、1257.60元、2515.20元、3772.80元。",
     "params": [
      {
       "key": "pension_base_min_pct",
       "value": 60
      },
      {
       "key": "pension_base_max_pct",
       "value": 300
      },
      {
       "key": "pension_flexible_rate_alt",
       "value": 20
      },
      {
       "key": "pension_tier_amounts_sample",
       "value": [
        754.56,
        880.32,
        1006.08,
        1131.84,
        1257.6,
        2515.2,
        3772.8
       ]
      }
     ],
     "effective_from": null,
     "coverage_year": null,
     "param_tag": "pension_base_tiers",
     "citation": {
      "doc_number": "居住证人员参加企业职工基本养老保险 解读",
      "clause_no": "（分段）",
      "clause_ref": "（分段）@职工医保",
      "regime": "职工医保",
      "quote": "参保人员按不低于全市上年度职工月平均工资60%且不高于全市上年度职工月平均工资300%的标准自行选择缴费基数（共7个档次），今年的7个档次缴费基数分别是3772.80元（全市上年度职工月平均工资的60%）、4401.60元（全市上年度职工月平均工资的70%）、5030.40元（全市上年度职工月平均工资的80%）、5659.20元（全市上年度职工月平均工资的90%）、6288.00元（全市上年度职工月平均工资的100%）、12576.00元（全市上年度职工月平均工资的200%）、18864.00元（全市上年度职工月平均工资的300%）。\n上述缴费基数乘以20%的缴费比例后，7个档次的月缴费金额从低到高分别是754.56元、880.32元、1006.08元、1131.84元、1257.60元、2515.20元、3772.80元。",
      "url": "https://hrss.xm.gov.cn/gzcy/zxft/jdcxmjzzkcb",
      "fetched_at": "2026-10-25T10:24:11+08:00",
      "text_sha256": "84023b2d5af7aa69518df8f4b71fbe3fcf99189cd524916b9381f7c136aae153",
      "evidence_layer": "L4"
     }
    },
    {
     "clause_no": "（分段）",
     "clause_ref": "（分段）@职工医保",
     "regime": "职工医保",
     "topic": "临时账户年龄门槛",
     "quote": "对参保时男性年满50周岁和女性年满40周岁的居住证持有人，建立临时基本养老保险缴费账户。",
     "params": [
      {
       "key": "temporary_account_male",
       "value": 50
      },
      {
       "key": "temporary_account_female",
       "value": 40
      }
     ],
     "effective_from": null,
     "coverage_year": null,
     "param_tag": "temporary_account",
     "citation": {
      "doc_number": "居住证人员参加企业职工基本养老保险 解读",
      "clause_no": "（分段）",
      "clause_ref": "（分段）@职工医保",
      "regime": "职工医保",
      "quote": "对参保时男性年满50周岁和女性年满40周岁的居住证持有人，建立临时基本养老保险缴费账户。",
      "url": "https://hrss.xm.gov.cn/gzcy/zxft/jdcxmjzzkcb",
      "fetched_at": "2026-10-25T10:24:11+08:00",
      "text_sha256": "84023b2d5af7aa69518df8f4b71fbe3fcf99189cd524916b9381f7c136aae153",
      "evidence_layer": "L4"
     }
    },
    {
     "clause_no": "（分段）",
     "clause_ref": "（分段）@职工医保",
     "regime": "职工医保",
     "topic": "居住证人员退休条件",
     "quote": "在男性年满60周岁、女性年满55周岁且累计缴费满15年时，可在我市办理退休。",
     "params": [
      {
       "key": "residence_retire_male",
       "value": 60
      },
      {
       "key": "residence_retire_female",
       "value": 55
      },
      {
       "key": "residence_retire_years",
       "value": 15
      }
     ],
     "effective_from": null,
     "coverage_year": null,
     "param_tag": "residence_retire",
     "citation": {
      "doc_number": "居住证人员参加企业职工基本养老保险 解读",
      "clause_no": "（分段）",
      "clause_ref": "（分段）@职工医保",
      "regime": "职工医保",
      "quote": "在男性年满60周岁、女性年满55周岁且累计缴费满15年时，可在我市办理退休。",
      "url": "https://hrss.xm.gov.cn/gzcy/zxft/jdcxmjzzkcb",
      "fetched_at": "2026-10-25T10:24:11+08:00",
      "text_sha256": "84023b2d5af7aa69518df8f4b71fbe3fcf99189cd524916b9381f7c136aae153",
      "evidence_layer": "L4"
     }
    }
   ],
   "conditions": [],
   "needs_ocr": false
  },
  "xm-pension-official-guide": {
   "policy_id": "xm-pension-official-guide",
   "title": "@灵活就业人员，养老保险参保指引来啦！",
   "doc_number": "灵活就业人员 养老保险参保指引",
   "issuer": "厦门市人力资源和社会保障局 养老保险处",
   "layer": "L4",
   "source_url": "https://cloud.xm.gov.cn/165/service/2810450.xhtml",
   "pdf_url": null,
   "fetched_at": "2026-10-25T10:24:11+08:00",
   "raw_sha256": "0f363e09f3e22e8b948102c526c7c0a20a217872908716758023648aa40167d2",
   "text_sha256": "41e1c6d2ca8b1e057c5758f8c58b78c7b4a5d4f10eeb482d069606f2049c369c",
   "text_chars": 44,
   "cjk_ratio": 0.4545,
   "valid_from": null,
   "valid_to": null,
   "supersedes": [],
   "superseded_by": [],
   "status": "active",
   "clauses": [
    {
     "clause_no": "（分段）",
     "clause_ref": "（分段）@职工医保",
     "regime": "职工医保",
     "topic": "灵活就业养老费率与拆分",
     "quote": "缴费费率为20%，其中12%记入统筹基金，8%记入个人账户。",
     "params": [
      {
       "key": "pension_flexible_rate",
       "value": 20
      },
      {
       "key": "pension_pool_pct",
       "value": 12
      },
      {
       "key": "pension_account_pct",
       "value": 8
      }
     ],
     "effective_from": null,
     "coverage_year": null,
     "param_tag": "pension_split",
     "citation": {
      "doc_number": "灵活就业人员 养老保险参保指引",
      "clause_no": "（分段）",
      "clause_ref": "（分段）@职工医保",
      "regime": "职工医保",
      "quote": "缴费费率为20%，其中12%记入统筹基金，8%记入个人账户。",
      "url": "https://cloud.xm.gov.cn/165/service/2810450.xhtml",
      "fetched_at": "2026-10-25T10:24:11+08:00",
      "text_sha256": "41e1c6d2ca8b1e057c5758f8c58b78c7b4a5d4f10eeb482d069606f2049c369c",
      "evidence_layer": "L4"
     }
    },
    {
     "clause_no": "（分段）",
     "clause_ref": "（分段）@职工医保",
     "regime": "职工医保",
     "topic": "灵活就业养老参保对象",
     "quote": "无论是否是厦门户籍，未在用人单位参保的非全日制从业人员、无雇工的个体工商户、新就业形态劳动者以及其他灵活就业人员，都可按灵活就业人员身份参加企业职工基本养老保险。",
     "params": [],
     "effective_from": null,
     "coverage_year": null,
     "param_tag": null,
     "citation": {
      "doc_number": "灵活就业人员 养老保险参保指引",
      "clause_no": "（分段）",
      "clause_ref": "（分段）@职工医保",
      "regime": "职工医保",
      "quote": "无论是否是厦门户籍，未在用人单位参保的非全日制从业人员、无雇工的个体工商户、新就业形态劳动者以及其他灵活就业人员，都可按灵活就业人员身份参加企业职工基本养老保险。",
      "url": "https://cloud.xm.gov.cn/165/service/2810450.xhtml",
      "fetched_at": "2026-10-25T10:24:11+08:00",
      "text_sha256": "41e1c6d2ca8b1e057c5758f8c58b78c7b4a5d4f10eeb482d069606f2049c369c",
      "evidence_layer": "L4"
     }
    }
   ],
   "conditions": [],
   "needs_ocr": true
  },
  "xm-participate-guide": {
   "policy_id": "xm-participate-guide",
   "title": "不同人群如何参保",
   "doc_number": "厦门市民专属参保指南",
   "issuer": "厦门市人民政府",
   "layer": "L2",
   "source_url": "https://cloud.xm.gov.cn/165/service/2776639.xhtml",
   "pdf_url": null,
   "fetched_at": "2026-10-24T22:35:12+08:00",
   "raw_sha256": "b7866b9af439b773e5e624d67e5bf39634a6fd1d8078a20b6ce6ed4591db7a4d",
   "text_sha256": "626ab83c2007342eea0f4ad007a3d2826b67ddbf0c5dfdbfe9a96e27e916cca6",
   "text_chars": 1691,
   "cjk_ratio": 0.7788,
   "valid_from": null,
   "valid_to": null,
   "supersedes": [],
   "superseded_by": [],
   "status": "active",
   "clauses": [],
   "conditions": [],
   "needs_ocr": false
  },
  "xm-hrss-cleanup": {
   "policy_id": "xm-hrss-cleanup",
   "title": "关于公布继续有效、废止和失效的规范性文件目录的通知",
   "doc_number": "规范性文件清理目录",
   "issuer": "厦门市人力资源和社会保障局",
   "layer": "L4",
   "source_url": "https://hrss.xm.gov.cn/xxgk/zfxxgkzl/zfxxgkml/zcfg/qtwj/",
   "pdf_url": null,
   "fetched_at": "2026-10-24T22:35:12+08:00",
   "raw_sha256": "0b8c35e7523c76fcb1e0f6e3ea88abe6d77792fbdd7bdc1c345dbe3eace455f8",
   "text_sha256": "f973dfdd8f2ea6e8d22fc6cdb05c4aa89cb9af7e9b1e115ae86ad750288fcf70",
   "text_chars": 2769,
   "cjk_ratio": 0.598,
   "valid_from": null,
   "valid_to": null,
   "supersedes": [],
   "superseded_by": [],
   "status": "active",
   "clauses": [],
   "conditions": [],
   "needs_ocr": false
  },
  "xm-resident-guide": {
   "policy_id": "xm-resident-guide",
   "title": "城乡居民医疗保险参保(缴费) 办事指南",
   "doc_number": "6.1.6 城乡居民医疗保险参保(缴费)",
   "issuer": "厦门市人民政府",
   "layer": "L2",
   "source_url": "https://cloud.xm.gov.cn/165/service/2776119.xhtml",
   "pdf_url": null,
   "fetched_at": "2026-10-24T23:32:45+08:00",
   "raw_sha256": "99140fe5bacc82606aa584bd595d026090d4c01d95aa7303063a3422142d097e",
   "text_sha256": "4f4c321af31f82477bc209f13a58cc58457eba9fa9e2d66f53cc612f7ae77a38",
   "text_chars": 42,
   "cjk_ratio": 0.4286,
   "valid_from": null,
   "valid_to": null,
   "supersedes": [],
   "superseded_by": [],
   "status": "active",
   "clauses": [],
   "conditions": [],
   "needs_ocr": true
  },
  "xm-resident-enroll-2026": {
   "policy_id": "xm-resident-enroll-2026",
   "title": "家庭共济代缴超方便！2026年居民医保缴费，先抢先了解",
   "doc_number": "2026年居民医保集中参保缴费期 缴费指引",
   "issuer": "厦门市医疗保障局",
   "layer": "L4",
   "source_url": "https://ylbz.xm.gov.cn/zwgk/tpxw/202510/t20251014_2960088.htm",
   "pdf_url": null,
   "fetched_at": "2026-10-25T10:24:07+08:00",
   "raw_sha256": "623ada4125d5a9504072cdffb4d53d196425fa57d8388caa4d60423a34d9ffd5",
   "text_sha256": "794de48c16c57b46d4cc489e8daa804f2d338f0951a358e45b5703d0cc38fe89",
   "text_chars": 1981,
   "cjk_ratio": 0.7966,
   "valid_from": "2025-10-14",
   "valid_to": null,
   "supersedes": [],
   "superseded_by": [],
   "status": "active",
   "clauses": [],
   "conditions": [],
   "needs_ocr": false
  },
  "xm-resident-policy-interpret": {
   "policy_id": "xm-resident-policy-interpret",
   "title": "《关于调整居民医保参保政策的通知》政策解读",
   "doc_number": "厦医保〔2025〕86号 政策解读",
   "issuer": "厦门市医疗保障局",
   "layer": "L4",
   "source_url": "https://ylbz.xm.gov.cn/zwgk/zfxxgk/ml/zcwj/zcjd/202508/t20250818_2950855.htm",
   "pdf_url": null,
   "fetched_at": "2026-10-25T10:24:08+08:00",
   "raw_sha256": "bf0ad55eafa91adf7e1fb7f0923f286f1969a51ca03b9e4a6854a062bfce226e",
   "text_sha256": "b51c3de1f16eb2d8712f288b8e7814956f233bbdd2711d418c06fd0644eee245",
   "text_chars": 1067,
   "cjk_ratio": 0.7863,
   "valid_from": "2025-09-01",
   "valid_to": null,
   "supersedes": [],
   "superseded_by": [],
   "status": "active",
   "clauses": [
    {
     "clause_no": "（分段）",
     "clause_ref": "（分段）@居民医保",
     "regime": "居民医保",
     "topic": "居民医保退费政策",
     "quote": "明确保费退费政策\n根据国家和省文件要求，《通知》明确居民医保年度即居民医保待遇享受期（含待遇等待期）为当年1月1日至12月31日，个人待遇享受开始时间根据国家和省参保长效机制确定。在集中参保缴费期内已缴纳下一年度居民医保费的，在新年度1月1日前可申请退费；1月1日后（含）缴费的不予退费。",
     "params": [
      {
       "key": "resident_refund_before",
       "value": "集中参保缴费期内已缴下一年度居民医保费，新年度1月1日前可申请退费"
      },
      {
       "key": "resident_refund_after",
       "value": "1月1日后（含）缴费的不予退费"
      }
     ],
     "effective_from": null,
     "coverage_year": null,
     "param_tag": "resident_refund",
     "citation": {
      "doc_number": "厦医保〔2025〕86号 政策解读",
      "clause_no": "（分段）",
      "clause_ref": "（分段）@居民医保",
      "regime": "居民医保",
      "quote": "明确保费退费政策\n根据国家和省文件要求，《通知》明确居民医保年度即居民医保待遇享受期（含待遇等待期）为当年1月1日至12月31日，个人待遇享受开始时间根据国家和省参保长效机制确定。在集中参保缴费期内已缴纳下一年度居民医保费的，在新年度1月1日前可申请退费；1月1日后（含）缴费的不予退费。",
      "url": "https://ylbz.xm.gov.cn/zwgk/zfxxgk/ml/zcwj/zcjd/202508/t20250818_2950855.htm",
      "fetched_at": "2026-10-25T10:24:08+08:00",
      "text_sha256": "b51c3de1f16eb2d8712f288b8e7814956f233bbdd2711d418c06fd0644eee245",
      "evidence_layer": "L4"
     }
    }
   ],
   "conditions": [],
   "needs_ocr": false
  },
  "xm-medical-continuity": {
   "policy_id": "xm-medical-continuity",
   "title": "搬家、换工作……医保记得连续缴费",
   "doc_number": "医保连续缴费与转移接续 官方提示",
   "issuer": "厦门市医疗保障局",
   "layer": "L4",
   "source_url": "https://ylbz.xm.gov.cn/zwgk/tpxw/202605/t20260529_2998199.htm",
   "pdf_url": null,
   "fetched_at": "2026-10-25T10:24:09+08:00",
   "raw_sha256": "70f932ee1851892fbbe8643df175f27eb7f1fbc3df2e0f00f2a9f7c07e3230b1",
   "text_sha256": "a542d7f9ee8c9a52777c6c64224a004c5bed55b6476cbee16507048a7b9675a5",
   "text_chars": 1810,
   "cjk_ratio": 0.7867,
   "valid_from": "2026-05-29",
   "valid_to": null,
   "supersedes": [],
   "superseded_by": [],
   "status": "active",
   "clauses": [
    {
     "clause_no": "（分段）",
     "clause_ref": "（分段）@职工医保",
     "regime": "职工医保",
     "topic": "转移接续年限合并条件",
     "quote": "从其他统筹区转入厦门并按规定办理医保关系转移接续，在转移接续前未中断缴费，或中断缴费不超过3个月续保并及时完成中断期间补缴到账的，之前在外地的医保参保缴费时长可与本地合并计算，中断月份计入连续参保时间，中断期间的待遇可按规定追溯享受。",
     "params": [
      {
       "key": "transfer_merge_condition",
       "value": "转移接续前未中断缴费；或中断不超过3个月并续保、及时完成中断期间补缴到账"
      },
      {
       "key": "transfer_merge_result",
       "value": "外地医保参保缴费时长可与本地合并计算，中断月份计入连续参保时间，中断期间待遇可追溯享受"
      }
     ],
     "effective_from": null,
     "coverage_year": null,
     "param_tag": "transfer_merge",
     "citation": {
      "doc_number": "医保连续缴费与转移接续 官方提示",
      "clause_no": "（分段）",
      "clause_ref": "（分段）@职工医保",
      "regime": "职工医保",
      "quote": "从其他统筹区转入厦门并按规定办理医保关系转移接续，在转移接续前未中断缴费，或中断缴费不超过3个月续保并及时完成中断期间补缴到账的，之前在外地的医保参保缴费时长可与本地合并计算，中断月份计入连续参保时间，中断期间的待遇可按规定追溯享受。",
      "url": "https://ylbz.xm.gov.cn/zwgk/tpxw/202605/t20260529_2998199.htm",
      "fetched_at": "2026-10-25T10:24:09+08:00",
      "text_sha256": "a542d7f9ee8c9a52777c6c64224a004c5bed55b6476cbee16507048a7b9675a5",
      "evidence_layer": "L4"
     }
    },
    {
     "clause_no": "（分段）",
     "clause_ref": "（分段）@职工医保",
     "regime": "职工医保",
     "topic": "职工医保退休累计年限",
     "quote": "具备申报本市职工医保退休待遇资格的人员，达到法定退休年龄时，需同时满足两个条件：\n厦门本市职工医保实际缴费年限满10年；\n职工医保累计缴费年限（含实际缴费和视同缴费）男满25年、女满20年。",
     "params": [
      {
       "key": "retire_years_male",
       "value": 25
      },
      {
       "key": "retire_years_female",
       "value": 20
      },
      {
       "key": "retire_local_min_years",
       "value": 10
      }
     ],
     "effective_from": null,
     "coverage_year": null,
     "param_tag": "retire_total_years",
     "citation": {
      "doc_number": "医保连续缴费与转移接续 官方提示",
      "clause_no": "（分段）",
      "clause_ref": "（分段）@职工医保",
      "regime": "职工医保",
      "quote": "具备申报本市职工医保退休待遇资格的人员，达到法定退休年龄时，需同时满足两个条件：\n厦门本市职工医保实际缴费年限满10年；\n职工医保累计缴费年限（含实际缴费和视同缴费）男满25年、女满20年。",
      "url": "https://ylbz.xm.gov.cn/zwgk/tpxw/202605/t20260529_2998199.htm",
      "fetched_at": "2026-10-25T10:24:09+08:00",
      "text_sha256": "a542d7f9ee8c9a52777c6c64224a004c5bed55b6476cbee16507048a7b9675a5",
      "evidence_layer": "L4"
     }
    }
   ],
   "conditions": [],
   "needs_ocr": false
  },
  "xm-flexible-commitment": {
   "policy_id": "xm-flexible-commitment",
   "title": "外省失业人员如何在厦门以灵活就业身份参保",
   "doc_number": "灵活就业参保承诺制 12345热线官方答复",
   "issuer": "厦门市医疗保障局",
   "layer": "L4",
   "source_url": "https://ylbz.xm.gov.cn/gzcy/zxzx/index_20992.htm?id=XM25052003182",
   "pdf_url": null,
   "fetched_at": "2026-10-25T11:28:03+08:00",
   "raw_sha256": "9a3a95f4abbcac78c7a07474a7d863540ee1a5a8cd2de5b10697ceaf28d9c5fc",
   "text_sha256": "8573210670289e14a3fe1482bd1c0243d742ad633d6ba87e450806546eecbe00",
   "text_chars": 1057,
   "cjk_ratio": 0.7692,
   "valid_from": "2025-05-20",
   "valid_to": "2027-05-20",
   "supersedes": [],
   "superseded_by": [],
   "status": "active",
   "clauses": [
    {
     "clause_no": "（分段）",
     "clause_ref": "（分段）@职工医保",
     "regime": "职工医保",
     "topic": "灵活就业参保承诺制",
     "quote": "诉求人可以持身份证和《灵活就业参保承诺书》到办税服务厅参加职工基本养老保险，还可以通过线上（电子税务局APP、i厦门APP或闽政通APP）以“新业态等灵活就业人员”身份办理。",
     "params": [
      {
       "key": "commitment_form_name",
       "value": "《灵活就业参保承诺书》"
      },
      {
       "key": "commitment_form_channel",
       "value": "持身份证与承诺书到办税服务厅办理"
      },
      {
       "key": "commitment_form_online_identity",
       "value": "线上以“新业态等灵活就业人员”身份办理"
      },
      {
       "key": "commitment_form_note",
       "value": "承诺制为税务/医保经办口径的参保登记材料，厦府规〔2022〕12号第四条本身未出现“承诺制”表述"
      }
     ],
     "effective_from": null,
     "coverage_year": null,
     "param_tag": "commitment_form",
     "citation": {
      "doc_number": "灵活就业参保承诺制 12345热线官方答复",
      "clause_no": "（分段）",
      "clause_ref": "（分段）@职工医保",
      "regime": "职工医保",
      "quote": "诉求人可以持身份证和《灵活就业参保承诺书》到办税服务厅参加职工基本养老保险，还可以通过线上（电子税务局APP、i厦门APP或闽政通APP）以“新业态等灵活就业人员”身份办理。",
      "url": "https://ylbz.xm.gov.cn/gzcy/zxzx/index_20992.htm?id=XM25052003182",
      "fetched_at": "2026-10-25T11:28:03+08:00",
      "text_sha256": "8573210670289e14a3fe1482bd1c0243d742ad633d6ba87e450806546eecbe00",
      "evidence_layer": "L4"
     }
    }
   ],
   "conditions": [],
   "needs_ocr": false
  },
  "fj-minwage-2025-14": {
   "policy_id": "fj-minwage-2025-14",
   "title": "福建省人力资源和社会保障厅关于公布我省最低工资标准的通知",
   "doc_number": "闽人社文〔2025〕14号",
   "issuer": "福建省人力资源和社会保障厅",
   "layer": "L1",
   "source_url": "https://www.xiangan.gov.cn/zwgk/jycy/zcwj/202502/t20250212_1089240.htm",
   "pdf_url": null,
   "fetched_at": "2026-10-24T23:26:22+08:00",
   "raw_sha256": "0e695437bd22d88f0600ab624fe268dcaa5b3d980221a42c3552d9b6ae18e405",
   "text_sha256": "9b731be80b16b0654c0e08b243a28423f37d96863b75dd02cc870935d9a9b56f",
   "text_chars": 1635,
   "cjk_ratio": 0.718,
   "valid_from": "2025-04-01",
   "valid_to": null,
   "supersedes": [],
   "superseded_by": [],
   "status": "active",
   "clauses": [
    {
     "clause_no": "（分段）",
     "clause_ref": "（分段）@职工医保",
     "regime": "职工医保",
     "topic": "福建最低工资标准分档",
     "quote": "月最低工资标准及适用范围表\n2.福建省非全日制用工小时最低工资标准及适用范围表\n福建省人力资源和社会保障厅\n2025年1月26日\n（此件主动公开）\n附件1\n福建省月最低工资标准及适用范围表\n月最低工资标准（元/月）\n适用范围\n2265\n思明区、湖里区、集美区、海沧区、同安区、翔安区\n2195\n平潭综合实验区、鼓楼区、台江区、仓山区、晋安区、马尾区、长乐区、福清市、闽侯县、连江县、闽清县、罗源县、永泰县、芗城区、龙文区、鲤城区、丰泽区、洛江区、泉港区、石狮市、晋江市、南安市、惠安县、新罗区\n2045\n龙海区、漳浦县、云霄县、东山县、诏安县、平和县、南靖县、长泰区、华安县、安溪县、永春县、德化县、三元区、永安市、沙县区、荔城区、城厢区、涵江区、秀屿区、仙游县、延平区、建阳区、邵武市、武夷山市、建瓯市、永定区、漳平市、上杭县、蕉城区、福安市、福鼎市\n1895\n清流县、宁化县、建宁县、泰宁县、明溪县、将乐县、尤溪县、大田县、顺昌县、浦城县、光泽县、松溪县、政和县、武平县、长汀县、连城县、霞浦县、寿宁县、周宁县、柘荣县、古田县、屏南县\n注：上述最低工资标准包含社会保险和住房公积金个人缴费部分。\n",
     "params": [
      {
       "key": "min_wage_tiers",
       "value": [
        {
         "value": 2265.0,
         "scope_sample": "思明区、湖里区、集美区、海沧区、同安区、翔安区",
         "xm_districts": [
          "思明区",
          "湖里区",
          "集美区",
          "海沧区",
          "同安区",
          "翔安区"
         ]
        },
        {
         "value": 2195.0,
         "scope_sample": "平潭综合实验区、鼓楼区、台江区、仓山区、晋安区、马尾区、长乐区、福清市、闽侯县、连江县、闽清县、罗源县、永泰县、芗城区、",
         "xm_districts": []
        },
        {
         "value": 2045.0,
         "scope_sample": "龙海区、漳浦县、云霄县、东山县、诏安县、平和县、南靖县、长泰区、华安县、安溪县、永春县、德化县、三元区、永安市、沙县区、",
         "xm_districts": []
        },
        {
         "value": 1895.0,
         "scope_sample": "清流县、宁化县、建宁县、泰宁县、明溪县、将乐县、尤溪县、大田县、顺昌县、浦城县、光泽县、松溪县、政和县、武平县、长汀县、",
         "xm_districts": []
        }
       ]
      },
      {
       "key": "min_wage_xiamen",
       "value": 2265.0
      },
      {
       "key": "min_wage_xiamen_scope",
       "value": "思明区、湖里区、集美区、海沧区、同安区、翔安区"
      },
      {
       "key": "min_wage_note",
       "value": "最低工资标准包含社会保险和住房公积金个人缴费部分"
      }
     ],
     "effective_from": null,
     "coverage_year": null,
     "param_tag": "min_wage_tiers",
     "citation": {
      "doc_number": "闽人社文〔2025〕14号",
      "clause_no": "（分段）",
      "clause_ref": "（分段）@职工医保",
      "regime": "职工医保",
      "quote": "月最低工资标准及适用范围表\n2.福建省非全日制用工小时最低工资标准及适用范围表\n福建省人力资源和社会保障厅\n2025年1月26日\n（此件主动公开）\n附件1\n福建省月最低工资标准及适用范围表\n月最低工资标准（元/月）\n适用范围\n2265\n思明区、湖里区、集美区、海沧区、同安区、翔安区\n2195\n平潭综合实验区、鼓楼区、台江区、仓山区、晋安区、马尾区、长乐区、福清市、闽侯县、连江县、闽清县、罗源县、永泰县、芗城区、龙文区、鲤城区、丰泽区、洛江区、泉港区、石狮市、晋江市、南安市、惠安县、新罗区\n2045\n龙海区、漳浦县、云霄县、东山县、诏安县、平和县、南靖县、长泰区、华安县、安溪县、永春县、德化县、三元区、永安市、沙县区、荔城区、城厢区、涵江区、秀屿区、仙游县、延平区、建阳区、邵武市、武夷山市、建瓯市、永定区、漳平市、上杭县、蕉城区、福安市、福鼎市\n1895\n清流县、宁化县、建宁县、泰宁县、明溪县、将乐县、尤溪县、大田县、顺昌县、浦城县、光泽县、松溪县、政和县、武平县、长汀县、连城县、霞浦县、寿宁县、周宁县、柘荣县、古田县、屏南县\n注：上述最低工资标准包含社会保险和住房公积金个人缴费部分。\n",
      "url": "https://www.xiangan.gov.cn/zwgk/jycy/zcwj/202502/t20250212_1089240.htm",
      "fetched_at": "2026-10-24T23:26:22+08:00",
      "text_sha256": "9b731be80b16b0654c0e08b243a28423f37d96863b75dd02cc870935d9a9b56f",
      "evidence_layer": "L1"
     }
    }
   ],
   "conditions": [],
   "needs_ocr": false
  },
  "xm-yb-2026-90": {
   "policy_id": "xm-yb-2026-90",
   "title": "关于确定2027年度城乡居民基本医疗保险和长期护理保险筹资标准的通知",
   "doc_number": "厦医保〔2026〕90号",
   "issuer": "厦门市医疗保障局 厦门市财政局 国家税务总局厦门市税务局",
   "layer": "L1",
   "source_url": "https://ylbz.xm.gov.cn/zwgk/zfxxgk/ml/zcwj/qtwj/202610/t20261013_3021006.htm",
   "pdf_url": null,
   "fetched_at": "2026-10-24T23:08:00+08:00",
   "raw_sha256": "bb2650d6a4c293d8857c043a9e7bfc87adea3b6f745788a490c94f59aa4467fc",
   "text_sha256": "d775daef731f1ebaeadd93b95e372134d9a830f84cf833784102fe0edde45651",
   "text_chars": 951,
   "cjk_ratio": 0.7298,
   "valid_from": "2027-01-01",
   "valid_to": null,
   "supersedes": [],
   "superseded_by": [],
   "status": "active",
   "clauses": [
    {
     "clause_no": "（分段）",
     "clause_ref": "（分段）@居民医保",
     "regime": "居民医保",
     "topic": "2027居民医保筹资标准",
     "quote": "一、成年居民基本医疗保险和长期护理保险的筹资标准为每人每年1362元，其中：个人缴费标准为每人每年491元（居民医保450元、长护险41元），财政补助标准为每人每年871元（居民医保830元、长护险41元）。\n二、大学生基本医疗保险和长期护理保险的筹资标准为每人每年1362元，其中：个人缴费标准为每人每年470.5元（居民医保450元、长护险20.5元），财政补助标准为每人每年891.5元（居民医保830元、长护险61.5元）。\n三、18周岁以下未成年人及除大学生外的在校学生基本医疗保险筹资标准为每人每年1280元，不单独缴纳长期护理保险费，按规定享受居民长护险待遇。其中：个人缴费标准为每人每年450元，财政补助标准为每人每年830元。",
     "params": [
      {
       "key": "resident_total_2027",
       "value": 1362.0
      },
      {
       "key": "resident_personal_2027",
       "value": 491.0
      },
      {
       "key": "resident_medical_2027",
       "value": 450.0
      },
      {
       "key": "chc_resident_2027",
       "value": 41.0
      },
      {
       "key": "resident_fiscal_2027",
       "value": 871.0
      },
      {
       "key": "resident_fiscal_medical_2027",
       "value": 830.0
      },
      {
       "key": "chc_fiscal_resident_2027",
       "value": 41.0
      }
     ],
     "effective_from": null,
     "coverage_year": null,
     "param_tag": "resident_2027",
     "citation": {
      "doc_number": "厦医保〔2026〕90号",
      "clause_no": "（分段）",
      "clause_ref": "（分段）@居民医保",
      "regime": "居民医保",
      "quote": "一、成年居民基本医疗保险和长期护理保险的筹资标准为每人每年1362元，其中：个人缴费标准为每人每年491元（居民医保450元、长护险41元），财政补助标准为每人每年871元（居民医保830元、长护险41元）。\n二、大学生基本医疗保险和长期护理保险的筹资标准为每人每年1362元，其中：个人缴费标准为每人每年470.5元（居民医保450元、长护险20.5元），财政补助标准为每人每年891.5元（居民医保830元、长护险61.5元）。\n三、18周岁以下未成年人及除大学生外的在校学生基本医疗保险筹资标准为每人每年1280元，不单独缴纳长期护理保险费，按规定享受居民长护险待遇。其中：个人缴费标准为每人每年450元，财政补助标准为每人每年830元。",
      "url": "https://ylbz.xm.gov.cn/zwgk/zfxxgk/ml/zcwj/qtwj/202610/t20261013_3021006.htm",
      "fetched_at": "2026-10-24T23:08:00+08:00",
      "text_sha256": "d775daef731f1ebaeadd93b95e372134d9a830f84cf833784102fe0edde45651",
      "evidence_layer": "L1"
     }
    }
   ],
   "conditions": [],
   "needs_ocr": false
  },
  "xm-chc-2026-3": {
   "policy_id": "xm-chc-2026-3",
   "title": "厦门市长期护理保险实施细则",
   "doc_number": "厦医保规〔2026〕3号",
   "issuer": "厦门市医疗保障局 厦门市财政局 国家税务总局厦门市税务局 厦门市人力资源和社会保障局",
   "layer": "L1",
   "source_url": "https://ylbz.xm.gov.cn/zwgk/zfxxgk/zc/ybzcfg/202610/t20261010_3020656.htm",
   "pdf_url": null,
   "fetched_at": "2026-10-24T23:08:01+08:00",
   "raw_sha256": "6150aabeb32ae8bbd9eb0e496fd780cfc0cb2d89e271725b9c4f6520955c204e",
   "text_sha256": "0b533f5df410e6160fc08ebf2402101da6b04e10933583dcb3dccd6383bb9fce",
   "text_chars": 7403,
   "cjk_ratio": 0.8622,
   "valid_from": "2027-01-01",
   "valid_to": null,
   "supersedes": [],
   "superseded_by": [],
   "status": "active",
   "clauses": [
    {
     "clause_no": "第六条",
     "clause_ref": "第六条@长护险",
     "regime": "长护险",
     "topic": "长护险职工缴费",
     "quote": "第六条\n职工长期护理保险费与职工基本医疗保险费合并申报，按月缴费。从职工医保单位费率和灵活就业人员费率中调整0.15%用作长护险费率,应由个人缴纳的0.15%部分由医保部门从其职工医保个人账户划转。\n（一）在职职工。用人单位及其在职职工应当参加长护险，共同缴费。以职工医保缴费基数的0.3%缴纳长期护理保险费，用人单位和个人按同比例分担，各为0.15%。\n（二）灵活就业人员。参加职工医保的灵活就业人员以其职工医保缴费基数的0.3%缴纳长期护理保险费，由个人缴纳。\n（三）退休人员（指享受本市职工医保退休待遇的人员）。以本人上年度末基本养老金为缴费基数，按0.15%费率缴纳长期护理保险费（个位向下取整），由个人缴纳，原用人单位不缴费。\n退休人员应当每年按规定申报本人上年度末基本养老金。当年退休人员的缴费基数为领取职工退休待遇首月的基本养老金。未领取城镇职工基本养老金、个人未及时按规定申报本人基本养老金，以及其他无法确定基本养老金金额的退休人员，以本市上年度末缴纳长期护理保险费退休人员的平均基本养老金为缴费基数。",
     "params": [
      {
       "key": "chc_rate_shift_pct",
       "value": 0.15
      },
      {
       "key": "chc_staff_total_rate_pct",
       "value": 0.3
      },
      {
       "key": "chc_staff_split_pct",
       "value": 0.15
      },
      {
       "key": "chc_flexible_payer",
       "value": "灵活就业人员长护险由个人缴纳"
      }
     ],
     "effective_from": null,
     "coverage_year": null,
     "param_tag": "chc_staff",
     "citation": {
      "doc_number": "厦医保规〔2026〕3号",
      "clause_no": "第六条",
      "clause_ref": "第六条@长护险",
      "regime": "长护险",
      "quote": "第六条\n职工长期护理保险费与职工基本医疗保险费合并申报，按月缴费。从职工医保单位费率和灵活就业人员费率中调整0.15%用作长护险费率,应由个人缴纳的0.15%部分由医保部门从其职工医保个人账户划转。\n（一）在职职工。用人单位及其在职职工应当参加长护险，共同缴费。以职工医保缴费基数的0.3%缴纳长期护理保险费，用人单位和个人按同比例分担，各为0.15%。\n（二）灵活就业人员。参加职工医保的灵活就业人员以其职工医保缴费基数的0.3%缴纳长期护理保险费，由个人缴纳。\n（三）退休人员（指享受本市职工医保退休待遇的人员）。以本人上年度末基本养老金为缴费基数，按0.15%费率缴纳长期护理保险费（个位向下取整），由个人缴纳，原用人单位不缴费。\n退休人员应当每年按规定申报本人上年度末基本养老金。当年退休人员的缴费基数为领取职工退休待遇首月的基本养老金。未领取城镇职工基本养老金、个人未及时按规定申报本人基本养老金，以及其他无法确定基本养老金金额的退休人员，以本市上年度末缴纳长期护理保险费退休人员的平均基本养老金为缴费基数。",
      "url": "https://ylbz.xm.gov.cn/zwgk/zfxxgk/zc/ybzcfg/202610/t20261010_3020656.htm",
      "fetched_at": "2026-10-24T23:08:01+08:00",
      "text_sha256": "0b533f5df410e6160fc08ebf2402101da6b04e10933583dcb3dccd6383bb9fce",
      "evidence_layer": "L1"
     }
    },
    {
     "clause_no": "第十二条",
     "clause_ref": "第十二条@长护险",
     "regime": "长护险",
     "topic": "长护险待遇条件",
     "quote": "第十二条\n本市长护险参保人员按规定参保缴费，失能状态持续6个月以上，经失能等级评估认定为符合重度失能标准的，在评估结论书送达并与定点长护服务机构签订服务合同生效之日起，可按规定享受长护险待遇。",
     "params": [
      {
       "key": "chc_disability_months",
       "value": 6
      },
      {
       "key": "chc_level",
       "value": "重度失能（经失能等级评估）"
      }
     ],
     "effective_from": null,
     "coverage_year": null,
     "param_tag": "chc_eligibility",
     "citation": {
      "doc_number": "厦医保规〔2026〕3号",
      "clause_no": "第十二条",
      "clause_ref": "第十二条@长护险",
      "regime": "长护险",
      "quote": "第十二条\n本市长护险参保人员按规定参保缴费，失能状态持续6个月以上，经失能等级评估认定为符合重度失能标准的，在评估结论书送达并与定点长护服务机构签订服务合同生效之日起，可按规定享受长护险待遇。",
      "url": "https://ylbz.xm.gov.cn/zwgk/zfxxgk/zc/ybzcfg/202610/t20261010_3020656.htm",
      "fetched_at": "2026-10-24T23:08:01+08:00",
      "text_sha256": "0b533f5df410e6160fc08ebf2402101da6b04e10933583dcb3dccd6383bb9fce",
      "evidence_layer": "L1"
     }
    }
   ],
   "conditions": [],
   "needs_ocr": false
  },
  "xm-yb-2025-86": {
   "policy_id": "xm-yb-2025-86",
   "title": "关于调整居民医保参保政策的通知",
   "doc_number": "厦医保〔2025〕86号",
   "issuer": "厦门市医疗保障局 厦门市财政局 国家税务总局厦门市税务局",
   "layer": "L1",
   "source_url": "https://ylbz.xm.gov.cn/zwgk/zfxxgk/ml/zcwj/zcfg/202508/t20250814_2950409.htm",
   "pdf_url": null,
   "fetched_at": "2026-10-24T23:08:02+08:00",
   "raw_sha256": "e8610efb0141b4242f03c87b4fa81f78b5dc8906514813fae1a4d244f31f5c7d",
   "text_sha256": "b03b369dae730afd1623bd66b8c10ce1dda1a4cde4247f537d83b4eff1be6ede",
   "text_chars": 1118,
   "cjk_ratio": 0.78,
   "valid_from": "2025-09-01",
   "valid_to": "2030-08-31",
   "supersedes": [],
   "superseded_by": [],
   "status": "active",
   "clauses": [],
   "conditions": [],
   "needs_ocr": false
  },
  "xm-yb-2026-24": {
   "policy_id": "xm-yb-2026-24",
   "title": "关于转发福建省医疗保障局等三部门关于完善生育保险参保缴费和待遇享受等有关问题的通知",
   "doc_number": "厦医保〔2026〕24号",
   "issuer": "厦门市医疗保障局 厦门市财政局 国家税务总局厦门市税务局",
   "layer": "L1",
   "source_url": "https://ylbz.xm.gov.cn/zwgk/zfxxgk/ml/zcwj/qtwj/202603/t20260313_2985345.htm",
   "pdf_url": null,
   "fetched_at": "2026-10-24T23:14:24+08:00",
   "raw_sha256": "9a634081e0101ae08a2c6ba40afb13392627ef01b6ade630830d12bb7d8f21ee",
   "text_sha256": "abcf640142a973eeda9adc470beda7bfa04532ed1ef351c998c92366c4c80e2f",
   "text_chars": 1013,
   "cjk_ratio": 0.7878,
   "valid_from": "2026-03-01",
   "valid_to": null,
   "supersedes": [],
   "superseded_by": [],
   "status": "active",
   "clauses": [
    {
     "clause_no": "（分段）",
     "clause_ref": "（分段）@职工医保",
     "regime": "职工医保",
     "topic": "灵活就业生育保险市级实施",
     "quote": "一、根据我市职工医保统筹基金累计结余和当期结余情况，我市符合省上规定条件，参加职工医保的灵活就业人员可同步以职工医保缴费基数的0.7%缴纳生育保险费，由个人缴纳。",
     "params": [
      {
       "key": "flexible_maternity_rate",
       "value": 0.7
      },
      {
       "key": "flexible_maternity_rate_xm",
       "value": 0.7
      },
      {
       "key": "flexible_maternity_payer",
       "value": "灵活就业人员以个人身份缴纳"
      }
     ],
     "effective_from": null,
     "coverage_year": null,
     "param_tag": "flexible_maternity_xm",
     "citation": {
      "doc_number": "厦医保〔2026〕24号",
      "clause_no": "（分段）",
      "clause_ref": "（分段）@职工医保",
      "regime": "职工医保",
      "quote": "一、根据我市职工医保统筹基金累计结余和当期结余情况，我市符合省上规定条件，参加职工医保的灵活就业人员可同步以职工医保缴费基数的0.7%缴纳生育保险费，由个人缴纳。",
      "url": "https://ylbz.xm.gov.cn/zwgk/zfxxgk/ml/zcwj/qtwj/202603/t20260313_2985345.htm",
      "fetched_at": "2026-10-24T23:14:24+08:00",
      "text_sha256": "abcf640142a973eeda9adc470beda7bfa04532ed1ef351c998c92366c4c80e2f",
      "evidence_layer": "L1"
     }
    },
    {
     "clause_no": "（分段）",
     "clause_ref": "（分段）@职工医保",
     "regime": "职工医保",
     "topic": "失业金生育保险费率",
     "quote": "二、领取失业保险金人员缴纳生育保险费率按照0.7%执行。",
     "params": [],
     "effective_from": null,
     "coverage_year": null,
     "param_tag": null,
     "citation": {
      "doc_number": "厦医保〔2026〕24号",
      "clause_no": "（分段）",
      "clause_ref": "（分段）@职工医保",
      "regime": "职工医保",
      "quote": "二、领取失业保险金人员缴纳生育保险费率按照0.7%执行。",
      "url": "https://ylbz.xm.gov.cn/zwgk/zfxxgk/ml/zcwj/qtwj/202603/t20260313_2985345.htm",
      "fetched_at": "2026-10-24T23:14:24+08:00",
      "text_sha256": "abcf640142a973eeda9adc470beda7bfa04532ed1ef351c998c92366c4c80e2f",
      "evidence_layer": "L1"
     }
    },
    {
     "clause_no": "（分段）",
     "clause_ref": "（分段）@职工医保",
     "regime": "职工医保",
     "topic": "生育保险市级施行日",
     "quote": "五、本通知自2026年3月1日起施行。",
     "params": [],
     "effective_from": null,
     "coverage_year": null,
     "param_tag": null,
     "citation": {
      "doc_number": "厦医保〔2026〕24号",
      "clause_no": "（分段）",
      "clause_ref": "（分段）@职工医保",
      "regime": "职工医保",
      "quote": "五、本通知自2026年3月1日起施行。",
      "url": "https://ylbz.xm.gov.cn/zwgk/zfxxgk/ml/zcwj/qtwj/202603/t20260313_2985345.htm",
      "fetched_at": "2026-10-24T23:14:24+08:00",
      "text_sha256": "abcf640142a973eeda9adc470beda7bfa04532ed1ef351c998c92366c4c80e2f",
      "evidence_layer": "L1"
     }
    }
   ],
   "conditions": [],
   "needs_ocr": false
  },
  "xm-yb-2025-96": {
   "policy_id": "xm-yb-2025-96",
   "title": "关于调整城乡居民基本医疗保险筹资标准的通知",
   "doc_number": "厦医保〔2025〕96号",
   "issuer": "厦门市医疗保障局 厦门市财政局 国家税务总局厦门市税务局",
   "layer": "L1",
   "source_url": "https://ylbz.xm.gov.cn/zwgk/tpxw/202510/t20251023_2962144.htm",
   "pdf_url": null,
   "fetched_at": "2026-10-24T23:08:03+08:00",
   "raw_sha256": "1ee46c6be314f90a6f57058317a328059e0221123b2d53079bfc2dcefc076b5c",
   "text_sha256": "2d9ea57751bf9efa0efadcf79d25be28b9faec15b04ab7f51bfb1e8414041c46",
   "text_chars": 1888,
   "cjk_ratio": 0.7542,
   "valid_from": "2026-01-01",
   "valid_to": "2026-12-31",
   "supersedes": [],
   "superseded_by": [],
   "status": "active",
   "clauses": [
    {
     "clause_no": "（分段）",
     "clause_ref": "（分段）@居民医保",
     "regime": "居民医保",
     "topic": "2026居民医保筹资标准",
     "quote": "城乡居民基本医疗保险的筹资标准由每人每年1250元调整为每人每年1280元，其中：财政补助标准提高30元，由每人每年800元调整为830元，个人缴费标准维持每人每年450元不变。",
     "params": [
      {
       "key": "resident_total_2026_old",
       "value": 1250.0
      },
      {
       "key": "resident_total_2026",
       "value": 1280.0
      },
      {
       "key": "resident_fiscal_2026_increase",
       "value": 30.0
      },
      {
       "key": "resident_fiscal_2026_old",
       "value": 800.0
      },
      {
       "key": "resident_fiscal_2026",
       "value": 830.0
      },
      {
       "key": "resident_personal_2026",
       "value": 450.0
      }
     ],
     "effective_from": null,
     "coverage_year": null,
     "param_tag": "resident_2026",
     "citation": {
      "doc_number": "厦医保〔2025〕96号",
      "clause_no": "（分段）",
      "clause_ref": "（分段）@居民医保",
      "regime": "居民医保",
      "quote": "城乡居民基本医疗保险的筹资标准由每人每年1250元调整为每人每年1280元，其中：财政补助标准提高30元，由每人每年800元调整为830元，个人缴费标准维持每人每年450元不变。",
      "url": "https://ylbz.xm.gov.cn/zwgk/tpxw/202510/t20251023_2962144.htm",
      "fetched_at": "2026-10-24T23:08:03+08:00",
      "text_sha256": "2d9ea57751bf9efa0efadcf79d25be28b9faec15b04ab7f51bfb1e8414041c46",
      "evidence_layer": "L1"
     }
    }
   ],
   "conditions": [],
   "needs_ocr": false
  },
  "xm-unemp-claim-guide": {
   "policy_id": "xm-unemp-claim-guide",
   "title": "失业保险金申领 办事指南",
   "doc_number": "失业保险金申领 办事指南（思明区）",
   "issuer": "厦门市思明区人民政府",
   "layer": "L2",
   "source_url": "https://www.siming.gov.cn/wsbs/ztfw/sb/nrrh/202309/t20230913_930369.htm",
   "pdf_url": null,
   "fetched_at": "2026-10-24T23:32:45+08:00",
   "raw_sha256": "e065504e797f00da2b384a6112a841db20a79a92af2c7bb45c504381889c766b",
   "text_sha256": "e4e109115cb637b33ebbb59d4d036cf6892401f99b389256b75953529531c792",
   "text_chars": 4171,
   "cjk_ratio": 0.7634,
   "valid_from": null,
   "valid_to": null,
   "supersedes": [],
   "superseded_by": [],
   "status": "active",
   "clauses": [],
   "conditions": [],
   "needs_ocr": false
  },
  "xm-pension-retire-guide": {
   "policy_id": "xm-pension-retire-guide",
   "title": "企业职工退休 养老保险待遇申领 办事指南",
   "doc_number": "企业职工退休—养老保险待遇申领 办事指南",
   "issuer": "厦门市思明区人民政府",
   "layer": "L2",
   "source_url": "https://siming.gov.cn/wsbs/ztfw/sb/nrrh/202411/t20241119_1078974.htm?PROTID=6713",
   "pdf_url": null,
   "fetched_at": "2026-10-24T23:32:46+08:00",
   "raw_sha256": "c832631f24ba9264420947778f946c9eb5fcc4469a0ace4b2edcf55533389ea1",
   "text_sha256": "6ae581a1da3496ff733c35fb7cddd0c2658171c8ceff35e23f4b4618329e9b51",
   "text_chars": 3236,
   "cjk_ratio": 0.742,
   "valid_from": null,
   "valid_to": null,
   "supersedes": [],
   "superseded_by": [],
   "status": "active",
   "clauses": [
    {
     "clause_no": "（分段）",
     "clause_ref": "（分段）@职工医保",
     "regime": "职工医保",
     "topic": "最低缴费年限渐进提高",
     "quote": "申请对象\n\n    满足企业职工养老保险正常退休手续办理条件的参保人员：1.达到法定退休年龄；2.累计缴费年限满15年。从2030年1月1日起，职工按月领取基本养老金最低缴费年限由15年逐步提高至20年，每年提高6个月。",
     "params": [
      {
       "key": "pension_min_years_now",
       "value": 15
      },
      {
       "key": "pension_ramp_start_year",
       "value": 2030
      },
      {
       "key": "pension_min_years_target",
       "value": 20
      },
      {
       "key": "pension_ramp_step_months",
       "value": 6
      }
     ],
     "effective_from": null,
     "coverage_year": null,
     "param_tag": "min_years_ramp",
     "citation": {
      "doc_number": "企业职工退休—养老保险待遇申领 办事指南",
      "clause_no": "（分段）",
      "clause_ref": "（分段）@职工医保",
      "regime": "职工医保",
      "quote": "申请对象\n\n    满足企业职工养老保险正常退休手续办理条件的参保人员：1.达到法定退休年龄；2.累计缴费年限满15年。从2030年1月1日起，职工按月领取基本养老金最低缴费年限由15年逐步提高至20年，每年提高6个月。",
      "url": "https://siming.gov.cn/wsbs/ztfw/sb/nrrh/202411/t20241119_1078974.htm?PROTID=6713",
      "fetched_at": "2026-10-24T23:32:46+08:00",
      "text_sha256": "6ae581a1da3496ff733c35fb7cddd0c2658171c8ceff35e23f4b4618329e9b51",
      "evidence_layer": "L2"
     }
    }
   ],
   "conditions": [],
   "needs_ocr": false
  },
  "xm-resident-enroll-window-2026": {
   "policy_id": "xm-resident-enroll-window-2026",
   "title": "2026年居民医保集中参保缴费期即将截止",
   "doc_number": "2026年居民医保集中参保缴费期公告",
   "issuer": "厦门市医疗保障局",
   "layer": "L1",
   "source_url": "https://ylbz.xm.gov.cn/zwgk/tpxw/202512/t20251224_2973554.htm",
   "pdf_url": null,
   "fetched_at": "2026-10-25T11:27:50+08:00",
   "raw_sha256": "396c54fe29e16307d070fdc2b46611d3c6c29da3354b6c1b108c3a3a67aaf336",
   "text_sha256": "83016ccc933c72ba4b9734495bdb6141ddecd716566ae6db1e65f5698057c0e8",
   "text_chars": 2172,
   "cjk_ratio": 0.7878,
   "valid_from": "2025-10-22",
   "valid_to": "2025-12-26",
   "supersedes": [],
   "superseded_by": [],
   "status": "active",
   "clauses": [
    {
     "clause_no": "（分段）",
     "clause_ref": "（分段）@居民医保",
     "regime": "居民医保",
     "topic": "居民医保集中参保期起止日",
     "quote": "在2026年城乡居民基本医疗保险集中参保缴费期内（2025年10月22日至12月26日）缴费且连续参保的人员，可自2026年1月1日起享受我市居民医保待遇，未及时参保缴费的将无法享受连续参保相关激励，还可能因中断参保，而面临待遇等待期，等待期内发生的医疗费用，医保将不予报销。",
     "params": [
      {
       "key": "resident_enroll_start",
       "value": "2025-10-22"
      },
      {
       "key": "resident_enroll_end",
       "value": "2025-12-26"
      },
      {
       "key": "resident_enroll_precision",
       "value": "day"
      },
      {
       "key": "resident_enroll_coverage_year",
       "value": 2026
      }
     ],
     "effective_from": null,
     "coverage_year": 2026,
     "param_tag": "enroll_window",
     "citation": {
      "doc_number": "2026年居民医保集中参保缴费期公告",
      "clause_no": "（分段）",
      "clause_ref": "（分段）@居民医保",
      "regime": "居民医保",
      "quote": "在2026年城乡居民基本医疗保险集中参保缴费期内（2025年10月22日至12月26日）缴费且连续参保的人员，可自2026年1月1日起享受我市居民医保待遇，未及时参保缴费的将无法享受连续参保相关激励，还可能因中断参保，而面临待遇等待期，等待期内发生的医疗费用，医保将不予报销。",
      "url": "https://ylbz.xm.gov.cn/zwgk/tpxw/202512/t20251224_2973554.htm",
      "fetched_at": "2026-10-25T11:27:50+08:00",
      "text_sha256": "83016ccc933c72ba4b9734495bdb6141ddecd716566ae6db1e65f5698057c0e8",
      "evidence_layer": "L1"
     }
    }
   ],
   "conditions": [],
   "needs_ocr": false
  },
  "xm-resident-enroll-window-2027": {
   "policy_id": "xm-resident-enroll-window-2027",
   "title": "厦门正式落地长期护理保险制度",
   "doc_number": "2027年度居民医保及长护险集中参保缴费期公告",
   "issuer": "厦门市医疗保障局",
   "layer": "L1",
   "source_url": "https://ylbz.xm.gov.cn/zwgk/tpxw/202610/t20261012_3020838.htm",
   "pdf_url": null,
   "fetched_at": "2026-10-25T11:27:52+08:00",
   "raw_sha256": "c921fb03d0eaaeea54159aca0726c8916df07bdda605b7a48d32fc81520a23d4",
   "text_sha256": "471f6596fdc78d87251f39cea1b070d36bd571ab1f37bda504cb3f81ce2aa225",
   "text_chars": 3316,
   "cjk_ratio": 0.8082,
   "valid_from": "2026-10-01",
   "valid_to": "2026-12-31",
   "supersedes": [],
   "superseded_by": [],
   "status": "active",
   "clauses": [
    {
     "clause_no": "（分段）",
     "clause_ref": "（分段）@居民医保",
     "regime": "居民医保",
     "topic": "居民医保集中参保期起止日",
     "quote": "居民在2026年10月至12月集中参保缴费期内，同步缴纳2027年度居民医保和长护险保费，职工从2027年1月开始按月同步参保缴纳职工医保和长护险保费。",
     "params": [
      {
       "key": "resident_enroll_start",
       "value": "2026-10-01"
      },
      {
       "key": "resident_enroll_end",
       "value": "2026-12-31"
      },
      {
       "key": "resident_enroll_precision",
       "value": "month"
      },
      {
       "key": "resident_enroll_coverage_year",
       "value": 2027
      }
     ],
     "effective_from": null,
     "coverage_year": 2027,
     "param_tag": "enroll_window",
     "citation": {
      "doc_number": "2027年度居民医保及长护险集中参保缴费期公告",
      "clause_no": "（分段）",
      "clause_ref": "（分段）@居民医保",
      "regime": "居民医保",
      "quote": "居民在2026年10月至12月集中参保缴费期内，同步缴纳2027年度居民医保和长护险保费，职工从2027年1月开始按月同步参保缴纳职工医保和长护险保费。",
      "url": "https://ylbz.xm.gov.cn/zwgk/tpxw/202610/t20261012_3020838.htm",
      "fetched_at": "2026-10-25T11:27:52+08:00",
      "text_sha256": "471f6596fdc78d87251f39cea1b070d36bd571ab1f37bda504cb3f81ce2aa225",
      "evidence_layer": "L1"
     }
    }
   ],
   "conditions": [],
   "needs_ocr": false
  }
 },
 "paramTable": [
  {
   "param": "base_lower",
   "value": 4579,
   "valid_from": "2026-01-01",
   "valid_to": null,
   "doc_number": "闽人社文〔2026〕13号",
   "policy_id": "fj-rst-2026-13",
   "clause_no": "（分段）",
   "citation": {
    "doc_number": "闽人社文〔2026〕13号",
    "clause_no": "（分段）",
    "clause_ref": "（分段）@职工医保",
    "regime": "职工医保",
    "quote": "一、自2026年1月1日起，全省企业职工基本养老保险、机关事业单位养老保险月缴费基数上限按照22893元、下限按照4579元执行。",
    "url": "https://hrss.xm.gov.cn/xxgk/sjwj/202610/t20261009_3020482.htm",
    "fetched_at": "2026-10-24T23:08:00+08:00",
    "text_sha256": "72d36d4e3953478d03410abeb5c5984bfcf29f8d1df6f7d5dc7a190f458c6bd6",
    "evidence_layer": "L1"
   }
  },
  {
   "param": "base_max_pct",
   "value": 300,
   "valid_from": "2022-07-01",
   "valid_to": null,
   "doc_number": "厦府规〔2022〕12号",
   "policy_id": "xm-yb-2022-12",
   "clause_no": "第七条",
   "citation": {
    "doc_number": "厦府规〔2022〕12号",
    "clause_no": "第七条",
    "clause_ref": "第七条@职工医保",
    "regime": "职工医保",
    "quote": "第七条\n职工基本医疗保险费用人单位缴费基数为职工工资总额，工资总额按其在职职工缴费基数之和确定。",
    "url": "https://www.xm.gov.cn/zfgb/99833450",
    "fetched_at": "2026-10-24T23:08:00+08:00",
    "text_sha256": "e76be654ab7df9ef5fda099c2aec9016c6fdbdd18f8527a648afc361cd0bbd8f",
    "evidence_layer": "L1"
   }
  },
  {
   "param": "base_min_pct",
   "value": 60,
   "valid_from": "2022-07-01",
   "valid_to": null,
   "doc_number": "厦府规〔2022〕12号",
   "policy_id": "xm-yb-2022-12",
   "clause_no": "第七条",
   "citation": {
    "doc_number": "厦府规〔2022〕12号",
    "clause_no": "第七条",
    "clause_ref": "第七条@职工医保",
    "regime": "职工医保",
    "quote": "第七条\n职工基本医疗保险费用人单位缴费基数为职工工资总额，工资总额按其在职职工缴费基数之和确定。",
    "url": "https://www.xm.gov.cn/zfgb/99833450",
    "fetched_at": "2026-10-24T23:08:00+08:00",
    "text_sha256": "e76be654ab7df9ef5fda099c2aec9016c6fdbdd18f8527a648afc361cd0bbd8f",
    "evidence_layer": "L1"
   }
  },
  {
   "param": "base_rule",
   "value": "按参加职工医保缴费基数，不低于上年度全省全口径城镇单位就业人员平均工资的60%",
   "valid_from": "2026-03-01",
   "valid_to": null,
   "doc_number": "闽医保〔2026〕13号",
   "policy_id": "xm-yb-2026-13",
   "clause_no": "（分段）",
   "citation": {
    "doc_number": "闽医保〔2026〕13号",
    "clause_no": "（分段）",
    "clause_ref": "（分段）@职工医保",
    "regime": "职工医保",
    "quote": "参加生育保险的灵活就业人员缴费基数按照参\n加职工医保缴费基数（即不低于上年度全省全口径城镇单位就业\n人员平均工资的60%）、缴费费率按照0.7%，由个人在缴纳职工\n医保费时同步缴纳生育保险费。",
    "url": "https://ylbz.xm.gov.cn/zwgk/zfxxgk/ml/zcwj/qtwj/202603/P020260313526925372654.pdf",
    "fetched_at": "2026-10-24T23:08:00+08:00",
    "text_sha256": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "evidence_layer": "L1"
   }
  },
  {
   "param": "base_upper",
   "value": 22893,
   "valid_from": "2026-01-01",
   "valid_to": null,
   "doc_number": "闽人社文〔2026〕13号",
   "policy_id": "fj-rst-2026-13",
   "clause_no": "（分段）",
   "citation": {
    "doc_number": "闽人社文〔2026〕13号",
    "clause_no": "（分段）",
    "clause_ref": "（分段）@职工医保",
    "regime": "职工医保",
    "quote": "一、自2026年1月1日起，全省企业职工基本养老保险、机关事业单位养老保险月缴费基数上限按照22893元、下限按照4579元执行。",
    "url": "https://hrss.xm.gov.cn/xxgk/sjwj/202610/t20261009_3020482.htm",
    "fetched_at": "2026-10-24T23:08:00+08:00",
    "text_sha256": "72d36d4e3953478d03410abeb5c5984bfcf29f8d1df6f7d5dc7a190f458c6bd6",
    "evidence_layer": "L1"
   }
  },
  {
   "param": "benefit_rate_pct",
   "value": 90.0,
   "valid_from": "2025-01-01",
   "valid_to": "2027-12-31",
   "doc_number": "厦府规〔2025〕7号",
   "policy_id": "xm-yb-2025-7",
   "clause_no": "（分段）",
   "citation": {
    "doc_number": "厦府规〔2025〕7号",
    "clause_no": "（分段）",
    "clause_ref": "（分段）@职工医保",
    "regime": "职工医保",
    "quote": "二、关于失业保险待遇政策\n（一）暂停执行“市条例”第十七条第一款、第十八条，原本市城镇户口失业人员的失业保险待遇按“省条例”和“省统筹方案”规定的城镇职工失业保险金标准执行，即失业保险金月发放标准为本市月最低工资标准的90%；领取失业保险金的期限，根据其失业前累计缴费的时间计算，每满1年领取2个月失业保险金，最长期限为24个月。",
    "url": "https://www.xm.gov.cn/zfgb/99833863",
    "fetched_at": "2026-10-24T23:08:00+08:00",
    "text_sha256": "1b15834fb11bc054d93821721d13584019859372a0d9f30865fc1f2d6c539f6e",
    "evidence_layer": "L1"
   }
  },
  {
   "param": "chc_disability_months",
   "value": 6,
   "valid_from": "2027-01-01",
   "valid_to": null,
   "doc_number": "厦医保规〔2026〕3号",
   "policy_id": "xm-chc-2026-3",
   "clause_no": "第十二条",
   "citation": {
    "doc_number": "厦医保规〔2026〕3号",
    "clause_no": "第十二条",
    "clause_ref": "第十二条@长护险",
    "regime": "长护险",
    "quote": "第十二条\n本市长护险参保人员按规定参保缴费，失能状态持续6个月以上，经失能等级评估认定为符合重度失能标准的，在评估结论书送达并与定点长护服务机构签订服务合同生效之日起，可按规定享受长护险待遇。",
    "url": "https://ylbz.xm.gov.cn/zwgk/zfxxgk/zc/ybzcfg/202610/t20261010_3020656.htm",
    "fetched_at": "2026-10-24T23:08:01+08:00",
    "text_sha256": "0b533f5df410e6160fc08ebf2402101da6b04e10933583dcb3dccd6383bb9fce",
    "evidence_layer": "L1"
   }
  },
  {
   "param": "chc_fiscal_resident_2027",
   "value": 41.0,
   "valid_from": "2027-01-01",
   "valid_to": null,
   "doc_number": "厦医保〔2026〕90号",
   "policy_id": "xm-yb-2026-90",
   "clause_no": "（分段）",
   "citation": {
    "doc_number": "厦医保〔2026〕90号",
    "clause_no": "（分段）",
    "clause_ref": "（分段）@居民医保",
    "regime": "居民医保",
    "quote": "一、成年居民基本医疗保险和长期护理保险的筹资标准为每人每年1362元，其中：个人缴费标准为每人每年491元（居民医保450元、长护险41元），财政补助标准为每人每年871元（居民医保830元、长护险41元）。\n二、大学生基本医疗保险和长期护理保险的筹资标准为每人每年1362元，其中：个人缴费标准为每人每年470.5元（居民医保450元、长护险20.5元），财政补助标准为每人每年891.5元（居民医保830元、长护险61.5元）。\n三、18周岁以下未成年人及除大学生外的在校学生基本医疗保险筹资标准为每人每年1280元，不单独缴纳长期护理保险费，按规定享受居民长护险待遇。其中：个人缴费标准为每人每年450元，财政补助标准为每人每年830元。",
    "url": "https://ylbz.xm.gov.cn/zwgk/zfxxgk/ml/zcwj/qtwj/202610/t20261013_3021006.htm",
    "fetched_at": "2026-10-24T23:08:00+08:00",
    "text_sha256": "d775daef731f1ebaeadd93b95e372134d9a830f84cf833784102fe0edde45651",
    "evidence_layer": "L1"
   }
  },
  {
   "param": "chc_flexible_payer",
   "value": "灵活就业人员长护险由个人缴纳",
   "valid_from": "2027-01-01",
   "valid_to": null,
   "doc_number": "厦医保规〔2026〕3号",
   "policy_id": "xm-chc-2026-3",
   "clause_no": "第六条",
   "citation": {
    "doc_number": "厦医保规〔2026〕3号",
    "clause_no": "第六条",
    "clause_ref": "第六条@长护险",
    "regime": "长护险",
    "quote": "第六条\n职工长期护理保险费与职工基本医疗保险费合并申报，按月缴费。从职工医保单位费率和灵活就业人员费率中调整0.15%用作长护险费率,应由个人缴纳的0.15%部分由医保部门从其职工医保个人账户划转。\n（一）在职职工。用人单位及其在职职工应当参加长护险，共同缴费。以职工医保缴费基数的0.3%缴纳长期护理保险费，用人单位和个人按同比例分担，各为0.15%。\n（二）灵活就业人员。参加职工医保的灵活就业人员以其职工医保缴费基数的0.3%缴纳长期护理保险费，由个人缴纳。\n（三）退休人员（指享受本市职工医保退休待遇的人员）。以本人上年度末基本养老金为缴费基数，按0.15%费率缴纳长期护理保险费（个位向下取整），由个人缴纳，原用人单位不缴费。\n退休人员应当每年按规定申报本人上年度末基本养老金。当年退休人员的缴费基数为领取职工退休待遇首月的基本养老金。未领取城镇职工基本养老金、个人未及时按规定申报本人基本养老金，以及其他无法确定基本养老金金额的退休人员，以本市上年度末缴纳长期护理保险费退休人员的平均基本养老金为缴费基数。",
    "url": "https://ylbz.xm.gov.cn/zwgk/zfxxgk/zc/ybzcfg/202610/t20261010_3020656.htm",
    "fetched_at": "2026-10-24T23:08:01+08:00",
    "text_sha256": "0b533f5df410e6160fc08ebf2402101da6b04e10933583dcb3dccd6383bb9fce",
    "evidence_layer": "L1"
   }
  },
  {
   "param": "chc_level",
   "value": "重度失能（经失能等级评估）",
   "valid_from": "2027-01-01",
   "valid_to": null,
   "doc_number": "厦医保规〔2026〕3号",
   "policy_id": "xm-chc-2026-3",
   "clause_no": "第十二条",
   "citation": {
    "doc_number": "厦医保规〔2026〕3号",
    "clause_no": "第十二条",
    "clause_ref": "第十二条@长护险",
    "regime": "长护险",
    "quote": "第十二条\n本市长护险参保人员按规定参保缴费，失能状态持续6个月以上，经失能等级评估认定为符合重度失能标准的，在评估结论书送达并与定点长护服务机构签订服务合同生效之日起，可按规定享受长护险待遇。",
    "url": "https://ylbz.xm.gov.cn/zwgk/zfxxgk/zc/ybzcfg/202610/t20261010_3020656.htm",
    "fetched_at": "2026-10-24T23:08:01+08:00",
    "text_sha256": "0b533f5df410e6160fc08ebf2402101da6b04e10933583dcb3dccd6383bb9fce",
    "evidence_layer": "L1"
   }
  },
  {
   "param": "chc_rate_shift_pct",
   "value": 0.15,
   "valid_from": "2027-01-01",
   "valid_to": null,
   "doc_number": "厦医保规〔2026〕3号",
   "policy_id": "xm-chc-2026-3",
   "clause_no": "第六条",
   "citation": {
    "doc_number": "厦医保规〔2026〕3号",
    "clause_no": "第六条",
    "clause_ref": "第六条@长护险",
    "regime": "长护险",
    "quote": "第六条\n职工长期护理保险费与职工基本医疗保险费合并申报，按月缴费。从职工医保单位费率和灵活就业人员费率中调整0.15%用作长护险费率,应由个人缴纳的0.15%部分由医保部门从其职工医保个人账户划转。\n（一）在职职工。用人单位及其在职职工应当参加长护险，共同缴费。以职工医保缴费基数的0.3%缴纳长期护理保险费，用人单位和个人按同比例分担，各为0.15%。\n（二）灵活就业人员。参加职工医保的灵活就业人员以其职工医保缴费基数的0.3%缴纳长期护理保险费，由个人缴纳。\n（三）退休人员（指享受本市职工医保退休待遇的人员）。以本人上年度末基本养老金为缴费基数，按0.15%费率缴纳长期护理保险费（个位向下取整），由个人缴纳，原用人单位不缴费。\n退休人员应当每年按规定申报本人上年度末基本养老金。当年退休人员的缴费基数为领取职工退休待遇首月的基本养老金。未领取城镇职工基本养老金、个人未及时按规定申报本人基本养老金，以及其他无法确定基本养老金金额的退休人员，以本市上年度末缴纳长期护理保险费退休人员的平均基本养老金为缴费基数。",
    "url": "https://ylbz.xm.gov.cn/zwgk/zfxxgk/zc/ybzcfg/202610/t20261010_3020656.htm",
    "fetched_at": "2026-10-24T23:08:01+08:00",
    "text_sha256": "0b533f5df410e6160fc08ebf2402101da6b04e10933583dcb3dccd6383bb9fce",
    "evidence_layer": "L1"
   }
  },
  {
   "param": "chc_resident_2027",
   "value": 41.0,
   "valid_from": "2027-01-01",
   "valid_to": null,
   "doc_number": "厦医保〔2026〕90号",
   "policy_id": "xm-yb-2026-90",
   "clause_no": "（分段）",
   "citation": {
    "doc_number": "厦医保〔2026〕90号",
    "clause_no": "（分段）",
    "clause_ref": "（分段）@居民医保",
    "regime": "居民医保",
    "quote": "一、成年居民基本医疗保险和长期护理保险的筹资标准为每人每年1362元，其中：个人缴费标准为每人每年491元（居民医保450元、长护险41元），财政补助标准为每人每年871元（居民医保830元、长护险41元）。\n二、大学生基本医疗保险和长期护理保险的筹资标准为每人每年1362元，其中：个人缴费标准为每人每年470.5元（居民医保450元、长护险20.5元），财政补助标准为每人每年891.5元（居民医保830元、长护险61.5元）。\n三、18周岁以下未成年人及除大学生外的在校学生基本医疗保险筹资标准为每人每年1280元，不单独缴纳长期护理保险费，按规定享受居民长护险待遇。其中：个人缴费标准为每人每年450元，财政补助标准为每人每年830元。",
    "url": "https://ylbz.xm.gov.cn/zwgk/zfxxgk/ml/zcwj/qtwj/202610/t20261013_3021006.htm",
    "fetched_at": "2026-10-24T23:08:00+08:00",
    "text_sha256": "d775daef731f1ebaeadd93b95e372134d9a830f84cf833784102fe0edde45651",
    "evidence_layer": "L1"
   }
  },
  {
   "param": "chc_staff_split_pct",
   "value": 0.15,
   "valid_from": "2027-01-01",
   "valid_to": null,
   "doc_number": "厦医保规〔2026〕3号",
   "policy_id": "xm-chc-2026-3",
   "clause_no": "第六条",
   "citation": {
    "doc_number": "厦医保规〔2026〕3号",
    "clause_no": "第六条",
    "clause_ref": "第六条@长护险",
    "regime": "长护险",
    "quote": "第六条\n职工长期护理保险费与职工基本医疗保险费合并申报，按月缴费。从职工医保单位费率和灵活就业人员费率中调整0.15%用作长护险费率,应由个人缴纳的0.15%部分由医保部门从其职工医保个人账户划转。\n（一）在职职工。用人单位及其在职职工应当参加长护险，共同缴费。以职工医保缴费基数的0.3%缴纳长期护理保险费，用人单位和个人按同比例分担，各为0.15%。\n（二）灵活就业人员。参加职工医保的灵活就业人员以其职工医保缴费基数的0.3%缴纳长期护理保险费，由个人缴纳。\n（三）退休人员（指享受本市职工医保退休待遇的人员）。以本人上年度末基本养老金为缴费基数，按0.15%费率缴纳长期护理保险费（个位向下取整），由个人缴纳，原用人单位不缴费。\n退休人员应当每年按规定申报本人上年度末基本养老金。当年退休人员的缴费基数为领取职工退休待遇首月的基本养老金。未领取城镇职工基本养老金、个人未及时按规定申报本人基本养老金，以及其他无法确定基本养老金金额的退休人员，以本市上年度末缴纳长期护理保险费退休人员的平均基本养老金为缴费基数。",
    "url": "https://ylbz.xm.gov.cn/zwgk/zfxxgk/zc/ybzcfg/202610/t20261010_3020656.htm",
    "fetched_at": "2026-10-24T23:08:01+08:00",
    "text_sha256": "0b533f5df410e6160fc08ebf2402101da6b04e10933583dcb3dccd6383bb9fce",
    "evidence_layer": "L1"
   }
  },
  {
   "param": "chc_staff_total_rate_pct",
   "value": 0.3,
   "valid_from": "2027-01-01",
   "valid_to": null,
   "doc_number": "厦医保规〔2026〕3号",
   "policy_id": "xm-chc-2026-3",
   "clause_no": "第六条",
   "citation": {
    "doc_number": "厦医保规〔2026〕3号",
    "clause_no": "第六条",
    "clause_ref": "第六条@长护险",
    "regime": "长护险",
    "quote": "第六条\n职工长期护理保险费与职工基本医疗保险费合并申报，按月缴费。从职工医保单位费率和灵活就业人员费率中调整0.15%用作长护险费率,应由个人缴纳的0.15%部分由医保部门从其职工医保个人账户划转。\n（一）在职职工。用人单位及其在职职工应当参加长护险，共同缴费。以职工医保缴费基数的0.3%缴纳长期护理保险费，用人单位和个人按同比例分担，各为0.15%。\n（二）灵活就业人员。参加职工医保的灵活就业人员以其职工医保缴费基数的0.3%缴纳长期护理保险费，由个人缴纳。\n（三）退休人员（指享受本市职工医保退休待遇的人员）。以本人上年度末基本养老金为缴费基数，按0.15%费率缴纳长期护理保险费（个位向下取整），由个人缴纳，原用人单位不缴费。\n退休人员应当每年按规定申报本人上年度末基本养老金。当年退休人员的缴费基数为领取职工退休待遇首月的基本养老金。未领取城镇职工基本养老金、个人未及时按规定申报本人基本养老金，以及其他无法确定基本养老金金额的退休人员，以本市上年度末缴纳长期护理保险费退休人员的平均基本养老金为缴费基数。",
    "url": "https://ylbz.xm.gov.cn/zwgk/zfxxgk/zc/ybzcfg/202610/t20261010_3020656.htm",
    "fetched_at": "2026-10-24T23:08:01+08:00",
    "text_sha256": "0b533f5df410e6160fc08ebf2402101da6b04e10933583dcb3dccd6383bb9fce",
    "evidence_layer": "L1"
   }
  },
  {
   "param": "city_rule_suspended",
   "value": "暂停执行《厦门经济特区失业保险条例》第十七条第一款、第十八条，改按《福建省失业保险条例》执行",
   "valid_from": "2025-01-01",
   "valid_to": "2027-12-31",
   "doc_number": "厦府规〔2025〕7号",
   "policy_id": "xm-yb-2025-7",
   "clause_no": "（分段）",
   "citation": {
    "doc_number": "厦府规〔2025〕7号",
    "clause_no": "（分段）",
    "clause_ref": "（分段）@职工医保",
    "regime": "职工医保",
    "quote": "二、关于失业保险待遇政策\n（一）暂停执行“市条例”第十七条第一款、第十八条，原本市城镇户口失业人员的失业保险待遇按“省条例”和“省统筹方案”规定的城镇职工失业保险金标准执行，即失业保险金月发放标准为本市月最低工资标准的90%；领取失业保险金的期限，根据其失业前累计缴费的时间计算，每满1年领取2个月失业保险金，最长期限为24个月。",
    "url": "https://www.xm.gov.cn/zfgb/99833863",
    "fetched_at": "2026-10-24T23:08:00+08:00",
    "text_sha256": "1b15834fb11bc054d93821721d13584019859372a0d9f30865fc1f2d6c539f6e",
    "evidence_layer": "L1"
   }
  },
  {
   "param": "commitment_form_channel",
   "value": "持身份证与承诺书到办税服务厅办理",
   "valid_from": "2025-05-20",
   "valid_to": "2027-05-20",
   "doc_number": "灵活就业参保承诺制 12345热线官方答复",
   "policy_id": "xm-flexible-commitment",
   "clause_no": "（分段）",
   "citation": {
    "doc_number": "灵活就业参保承诺制 12345热线官方答复",
    "clause_no": "（分段）",
    "clause_ref": "（分段）@职工医保",
    "regime": "职工医保",
    "quote": "诉求人可以持身份证和《灵活就业参保承诺书》到办税服务厅参加职工基本养老保险，还可以通过线上（电子税务局APP、i厦门APP或闽政通APP）以“新业态等灵活就业人员”身份办理。",
    "url": "https://ylbz.xm.gov.cn/gzcy/zxzx/index_20992.htm?id=XM25052003182",
    "fetched_at": "2026-10-25T11:28:03+08:00",
    "text_sha256": "8573210670289e14a3fe1482bd1c0243d742ad633d6ba87e450806546eecbe00",
    "evidence_layer": "L4"
   }
  },
  {
   "param": "commitment_form_name",
   "value": "《灵活就业参保承诺书》",
   "valid_from": "2025-05-20",
   "valid_to": "2027-05-20",
   "doc_number": "灵活就业参保承诺制 12345热线官方答复",
   "policy_id": "xm-flexible-commitment",
   "clause_no": "（分段）",
   "citation": {
    "doc_number": "灵活就业参保承诺制 12345热线官方答复",
    "clause_no": "（分段）",
    "clause_ref": "（分段）@职工医保",
    "regime": "职工医保",
    "quote": "诉求人可以持身份证和《灵活就业参保承诺书》到办税服务厅参加职工基本养老保险，还可以通过线上（电子税务局APP、i厦门APP或闽政通APP）以“新业态等灵活就业人员”身份办理。",
    "url": "https://ylbz.xm.gov.cn/gzcy/zxzx/index_20992.htm?id=XM25052003182",
    "fetched_at": "2026-10-25T11:28:03+08:00",
    "text_sha256": "8573210670289e14a3fe1482bd1c0243d742ad633d6ba87e450806546eecbe00",
    "evidence_layer": "L4"
   }
  },
  {
   "param": "commitment_form_note",
   "value": "承诺制为税务/医保经办口径的参保登记材料，厦府规〔2022〕12号第四条本身未出现“承诺制”表述",
   "valid_from": "2025-05-20",
   "valid_to": "2027-05-20",
   "doc_number": "灵活就业参保承诺制 12345热线官方答复",
   "policy_id": "xm-flexible-commitment",
   "clause_no": "（分段）",
   "citation": {
    "doc_number": "灵活就业参保承诺制 12345热线官方答复",
    "clause_no": "（分段）",
    "clause_ref": "（分段）@职工医保",
    "regime": "职工医保",
    "quote": "诉求人可以持身份证和《灵活就业参保承诺书》到办税服务厅参加职工基本养老保险，还可以通过线上（电子税务局APP、i厦门APP或闽政通APP）以“新业态等灵活就业人员”身份办理。",
    "url": "https://ylbz.xm.gov.cn/gzcy/zxzx/index_20992.htm?id=XM25052003182",
    "fetched_at": "2026-10-25T11:28:03+08:00",
    "text_sha256": "8573210670289e14a3fe1482bd1c0243d742ad633d6ba87e450806546eecbe00",
    "evidence_layer": "L4"
   }
  },
  {
   "param": "commitment_form_online_identity",
   "value": "线上以“新业态等灵活就业人员”身份办理",
   "valid_from": "2025-05-20",
   "valid_to": "2027-05-20",
   "doc_number": "灵活就业参保承诺制 12345热线官方答复",
   "policy_id": "xm-flexible-commitment",
   "clause_no": "（分段）",
   "citation": {
    "doc_number": "灵活就业参保承诺制 12345热线官方答复",
    "clause_no": "（分段）",
    "clause_ref": "（分段）@职工医保",
    "regime": "职工医保",
    "quote": "诉求人可以持身份证和《灵活就业参保承诺书》到办税服务厅参加职工基本养老保险，还可以通过线上（电子税务局APP、i厦门APP或闽政通APP）以“新业态等灵活就业人员”身份办理。",
    "url": "https://ylbz.xm.gov.cn/gzcy/zxzx/index_20992.htm?id=XM25052003182",
    "fetched_at": "2026-10-25T11:28:03+08:00",
    "text_sha256": "8573210670289e14a3fe1482bd1c0243d742ad633d6ba87e450806546eecbe00",
    "evidence_layer": "L4"
   }
  },
  {
   "param": "deemed_years_rule",
   "value": "各地实施职工医保制度前的符合规定的连续工龄/工作年限及缴纳基本养老保险费年限，视同职工医保缴费年限",
   "valid_from": "2022-07-01",
   "valid_to": null,
   "doc_number": "厦府规〔2022〕12号",
   "policy_id": "xm-yb-2022-12",
   "clause_no": "第三十三条",
   "citation": {
    "doc_number": "厦府规〔2022〕12号",
    "clause_no": "第三十三条",
    "clause_ref": "第三十三条@职工医保",
    "regime": "职工医保",
    "quote": "第三十三条\n参保人员在各地实施职工医保制度前，符合国家、省规定的连续工龄或工作年限以及缴纳基本养老保险费的年限，视同职工医保缴费年限。",
    "url": "https://www.xm.gov.cn/zfgb/99833450",
    "fetched_at": "2026-10-24T23:08:00+08:00",
    "text_sha256": "e76be654ab7df9ef5fda099c2aec9016c6fdbdd18f8527a648afc361cd0bbd8f",
    "evidence_layer": "L1"
   }
  },
  {
   "param": "employee_rate",
   "value": 2.0,
   "valid_from": "2022-07-01",
   "valid_to": null,
   "doc_number": "厦府规〔2022〕12号",
   "policy_id": "xm-yb-2022-12",
   "clause_no": "第六条",
   "citation": {
    "doc_number": "厦府规〔2022〕12号",
    "clause_no": "第六条",
    "clause_ref": "第六条@职工医保",
    "regime": "职工医保",
    "quote": "第六条\n职工基本医疗保险费由用人单位和职工分别按其缴费基数的\n7.5%和2%按月共同缴纳。",
    "url": "https://www.xm.gov.cn/zfgb/99833450",
    "fetched_at": "2026-10-24T23:08:00+08:00",
    "text_sha256": "e76be654ab7df9ef5fda099c2aec9016c6fdbdd18f8527a648afc361cd0bbd8f",
    "evidence_layer": "L1"
   }
  },
  {
   "param": "employee_rate",
   "value": 2.0,
   "valid_from": "2025-01-01",
   "valid_to": "2025-12-31",
   "doc_number": "厦医保 2025年度职工基本医疗保险缴费率",
   "policy_id": "xm-yb-2025-rate",
   "clause_no": "（分段）",
   "citation": {
    "doc_number": "厦医保 2025年度职工基本医疗保险缴费率",
    "clause_no": "（分段）",
    "clause_ref": "（分段）@职工医保",
    "regime": "职工医保",
    "quote": "2025年度职工基本医疗保险费由用人单位和职工分别按其缴费基数的6.5%和2%按月共同缴纳。灵活就业人员基本医疗保险费的缴费率为8.5%，由个人缴纳。",
    "url": "https://ylbz.xm.gov.cn/zwgk/zfxxgk/zc/ybzcfg/202501/t20250127_2915362.htm",
    "fetched_at": "2026-10-24T23:08:00+08:00",
    "text_sha256": "bf913c52f6ce99ea6b08c2643f1f193e7c2421168b2a23e456a4d0356492e1c4",
    "evidence_layer": "L1"
   }
  },
  {
   "param": "employee_rate",
   "value": 2.0,
   "valid_from": "2026-01-01",
   "valid_to": "2026-12-31",
   "doc_number": "厦医保公告 2026年度职工基本医疗保险缴费率",
   "policy_id": "xm-yb-2026-rate",
   "clause_no": "（分段）",
   "citation": {
    "doc_number": "厦医保公告 2026年度职工基本医疗保险缴费率",
    "clause_no": "（分段）",
    "clause_ref": "（分段）@职工医保",
    "regime": "职工医保",
    "quote": "根据《厦门市职工医疗保险实施细则》（厦府规〔2022〕12号）规定，2026年职工基本医疗保险费由用人单位和职工分别按其缴费基数的7.5%和2%按月共同缴纳；灵活就业人员基本医疗保险费的缴费率为9.5%，由个人缴纳。",
    "url": "https://ylbz.xm.gov.cn/zwgk/tzgg/202512/t20251231_2975001.htm",
    "fetched_at": "2026-10-24T23:08:00+08:00",
    "text_sha256": "ee874db42bec1411037de51bb9a4a4e3d18e67a35cb1bfc941b2ae47f7a0e282",
    "evidence_layer": "L1"
   }
  },
  {
   "param": "flexible_maternity_payer",
   "value": "灵活就业人员以个人身份缴纳",
   "valid_from": "2026-03-01",
   "valid_to": null,
   "doc_number": "厦医保〔2026〕24号",
   "policy_id": "xm-yb-2026-24",
   "clause_no": "（分段）",
   "citation": {
    "doc_number": "厦医保〔2026〕24号",
    "clause_no": "（分段）",
    "clause_ref": "（分段）@职工医保",
    "regime": "职工医保",
    "quote": "一、根据我市职工医保统筹基金累计结余和当期结余情况，我市符合省上规定条件，参加职工医保的灵活就业人员可同步以职工医保缴费基数的0.7%缴纳生育保险费，由个人缴纳。",
    "url": "https://ylbz.xm.gov.cn/zwgk/zfxxgk/ml/zcwj/qtwj/202603/t20260313_2985345.htm",
    "fetched_at": "2026-10-24T23:14:24+08:00",
    "text_sha256": "abcf640142a973eeda9adc470beda7bfa04532ed1ef351c998c92366c4c80e2f",
    "evidence_layer": "L1"
   }
  },
  {
   "param": "flexible_maternity_rate",
   "value": 0.7,
   "valid_from": "2026-03-01",
   "valid_to": null,
   "doc_number": "闽医保〔2026〕13号",
   "policy_id": "xm-yb-2026-13",
   "clause_no": "（分段）",
   "citation": {
    "doc_number": "闽医保〔2026〕13号",
    "clause_no": "（分段）",
    "clause_ref": "（分段）@职工医保",
    "regime": "职工医保",
    "quote": "参加生育保险的灵活就业人员缴费基数按照参\n加职工医保缴费基数（即不低于上年度全省全口径城镇单位就业\n人员平均工资的60%）、缴费费率按照0.7%，由个人在缴纳职工\n医保费时同步缴纳生育保险费。",
    "url": "https://ylbz.xm.gov.cn/zwgk/zfxxgk/ml/zcwj/qtwj/202603/P020260313526925372654.pdf",
    "fetched_at": "2026-10-24T23:08:00+08:00",
    "text_sha256": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "evidence_layer": "L1"
   }
  },
  {
   "param": "flexible_maternity_rate",
   "value": 0.7,
   "valid_from": "2026-03-01",
   "valid_to": null,
   "doc_number": "厦医保〔2026〕24号",
   "policy_id": "xm-yb-2026-24",
   "clause_no": "（分段）",
   "citation": {
    "doc_number": "厦医保〔2026〕24号",
    "clause_no": "（分段）",
    "clause_ref": "（分段）@职工医保",
    "regime": "职工医保",
    "quote": "一、根据我市职工医保统筹基金累计结余和当期结余情况，我市符合省上规定条件，参加职工医保的灵活就业人员可同步以职工医保缴费基数的0.7%缴纳生育保险费，由个人缴纳。",
    "url": "https://ylbz.xm.gov.cn/zwgk/zfxxgk/ml/zcwj/qtwj/202603/t20260313_2985345.htm",
    "fetched_at": "2026-10-24T23:14:24+08:00",
    "text_sha256": "abcf640142a973eeda9adc470beda7bfa04532ed1ef351c998c92366c4c80e2f",
    "evidence_layer": "L1"
   }
  },
  {
   "param": "flexible_maternity_rate_xm",
   "value": 0.7,
   "valid_from": "2026-03-01",
   "valid_to": null,
   "doc_number": "厦医保〔2026〕24号",
   "policy_id": "xm-yb-2026-24",
   "clause_no": "（分段）",
   "citation": {
    "doc_number": "厦医保〔2026〕24号",
    "clause_no": "（分段）",
    "clause_ref": "（分段）@职工医保",
    "regime": "职工医保",
    "quote": "一、根据我市职工医保统筹基金累计结余和当期结余情况，我市符合省上规定条件，参加职工医保的灵活就业人员可同步以职工医保缴费基数的0.7%缴纳生育保险费，由个人缴纳。",
    "url": "https://ylbz.xm.gov.cn/zwgk/zfxxgk/ml/zcwj/qtwj/202603/t20260313_2985345.htm",
    "fetched_at": "2026-10-24T23:14:24+08:00",
    "text_sha256": "abcf640142a973eeda9adc470beda7bfa04532ed1ef351c998c92366c4c80e2f",
    "evidence_layer": "L1"
   }
  },
  {
   "param": "flexible_rate",
   "value": 8.5,
   "valid_from": "2025-01-01",
   "valid_to": "2025-12-31",
   "doc_number": "厦医保 2025年度职工基本医疗保险缴费率",
   "policy_id": "xm-yb-2025-rate",
   "clause_no": "（分段）",
   "citation": {
    "doc_number": "厦医保 2025年度职工基本医疗保险缴费率",
    "clause_no": "（分段）",
    "clause_ref": "（分段）@职工医保",
    "regime": "职工医保",
    "quote": "2025年度职工基本医疗保险费由用人单位和职工分别按其缴费基数的6.5%和2%按月共同缴纳。灵活就业人员基本医疗保险费的缴费率为8.5%，由个人缴纳。",
    "url": "https://ylbz.xm.gov.cn/zwgk/zfxxgk/zc/ybzcfg/202501/t20250127_2915362.htm",
    "fetched_at": "2026-10-24T23:08:00+08:00",
    "text_sha256": "bf913c52f6ce99ea6b08c2643f1f193e7c2421168b2a23e456a4d0356492e1c4",
    "evidence_layer": "L1"
   }
  },
  {
   "param": "flexible_rate",
   "value": 9.5,
   "valid_from": "2026-01-01",
   "valid_to": "2026-12-31",
   "doc_number": "厦医保公告 2026年度职工基本医疗保险缴费率",
   "policy_id": "xm-yb-2026-rate",
   "clause_no": "（分段）",
   "citation": {
    "doc_number": "厦医保公告 2026年度职工基本医疗保险缴费率",
    "clause_no": "（分段）",
    "clause_ref": "（分段）@职工医保",
    "regime": "职工医保",
    "quote": "根据《厦门市职工医疗保险实施细则》（厦府规〔2022〕12号）规定，2026年职工基本医疗保险费由用人单位和职工分别按其缴费基数的7.5%和2%按月共同缴纳；灵活就业人员基本医疗保险费的缴费率为9.5%，由个人缴纳。",
    "url": "https://ylbz.xm.gov.cn/zwgk/tzgg/202512/t20251231_2975001.htm",
    "fetched_at": "2026-10-24T23:08:00+08:00",
    "text_sha256": "ee874db42bec1411037de51bb9a4a4e3d18e67a35cb1bfc941b2ae47f7a0e282",
    "evidence_layer": "L1"
   }
  },
  {
   "param": "foreign_permanent_resident",
   "value": "持本市取得的外国人永久居留身份证件，属灵活就业的可参照居住证持有人以个人身份参加",
   "valid_from": "2022-07-01",
   "valid_to": null,
   "doc_number": "厦府规〔2022〕12号",
   "policy_id": "xm-yb-2022-12",
   "clause_no": "第八十六条",
   "citation": {
    "doc_number": "厦府规〔2022〕12号",
    "clause_no": "第八十六条",
    "clause_ref": "第八十六条@职工医保",
    "regime": "职工医保",
    "quote": "第八十六条\n依法获得相关就业证件和外国人居留证件并在本市合法就业的外国人，与用人单位建立劳动关系的，可按规定参加职工医保。\n持本市取得的外国人永久居留身份证件的人员，属于灵活就业的，可参照本市有效居住证持有人以个人身份参加职工医保。",
    "url": "https://www.xm.gov.cn/zfgb/99833450",
    "fetched_at": "2026-10-24T23:08:00+08:00",
    "text_sha256": "e76be654ab7df9ef5fda099c2aec9016c6fdbdd18f8527a648afc361cd0bbd8f",
    "evidence_layer": "L1"
   }
  },
  {
   "param": "max_months",
   "value": 24,
   "valid_from": "2025-01-01",
   "valid_to": "2027-12-31",
   "doc_number": "厦府规〔2025〕7号",
   "policy_id": "xm-yb-2025-7",
   "clause_no": "（分段）",
   "citation": {
    "doc_number": "厦府规〔2025〕7号",
    "clause_no": "（分段）",
    "clause_ref": "（分段）@职工医保",
    "regime": "职工医保",
    "quote": "二、关于失业保险待遇政策\n（一）暂停执行“市条例”第十七条第一款、第十八条，原本市城镇户口失业人员的失业保险待遇按“省条例”和“省统筹方案”规定的城镇职工失业保险金标准执行，即失业保险金月发放标准为本市月最低工资标准的90%；领取失业保险金的期限，根据其失业前累计缴费的时间计算，每满1年领取2个月失业保险金，最长期限为24个月。",
    "url": "https://www.xm.gov.cn/zfgb/99833863",
    "fetched_at": "2026-10-24T23:08:00+08:00",
    "text_sha256": "1b15834fb11bc054d93821721d13584019859372a0d9f30865fc1f2d6c539f6e",
    "evidence_layer": "L1"
   }
  },
  {
   "param": "min_wage_note",
   "value": "最低工资标准包含社会保险和住房公积金个人缴费部分",
   "valid_from": "2025-04-01",
   "valid_to": null,
   "doc_number": "闽人社文〔2025〕14号",
   "policy_id": "fj-minwage-2025-14",
   "clause_no": "（分段）",
   "citation": {
    "doc_number": "闽人社文〔2025〕14号",
    "clause_no": "（分段）",
    "clause_ref": "（分段）@职工医保",
    "regime": "职工医保",
    "quote": "月最低工资标准及适用范围表\n2.福建省非全日制用工小时最低工资标准及适用范围表\n福建省人力资源和社会保障厅\n2025年1月26日\n（此件主动公开）\n附件1\n福建省月最低工资标准及适用范围表\n月最低工资标准（元/月）\n适用范围\n2265\n思明区、湖里区、集美区、海沧区、同安区、翔安区\n2195\n平潭综合实验区、鼓楼区、台江区、仓山区、晋安区、马尾区、长乐区、福清市、闽侯县、连江县、闽清县、罗源县、永泰县、芗城区、龙文区、鲤城区、丰泽区、洛江区、泉港区、石狮市、晋江市、南安市、惠安县、新罗区\n2045\n龙海区、漳浦县、云霄县、东山县、诏安县、平和县、南靖县、长泰区、华安县、安溪县、永春县、德化县、三元区、永安市、沙县区、荔城区、城厢区、涵江区、秀屿区、仙游县、延平区、建阳区、邵武市、武夷山市、建瓯市、永定区、漳平市、上杭县、蕉城区、福安市、福鼎市\n1895\n清流县、宁化县、建宁县、泰宁县、明溪县、将乐县、尤溪县、大田县、顺昌县、浦城县、光泽县、松溪县、政和县、武平县、长汀县、连城县、霞浦县、寿宁县、周宁县、柘荣县、古田县、屏南县\n注：上述最低工资标准包含社会保险和住房公积金个人缴费部分。\n",
    "url": "https://www.xiangan.gov.cn/zwgk/jycy/zcwj/202502/t20250212_1089240.htm",
    "fetched_at": "2026-10-24T23:26:22+08:00",
    "text_sha256": "9b731be80b16b0654c0e08b243a28423f37d96863b75dd02cc870935d9a9b56f",
    "evidence_layer": "L1"
   }
  },
  {
   "param": "min_wage_tiers",
   "value": [
    {
     "value": 2265.0,
     "scope_sample": "思明区、湖里区、集美区、海沧区、同安区、翔安区",
     "xm_districts": [
      "思明区",
      "湖里区",
      "集美区",
      "海沧区",
      "同安区",
      "翔安区"
     ]
    },
    {
     "value": 2195.0,
     "scope_sample": "平潭综合实验区、鼓楼区、台江区、仓山区、晋安区、马尾区、长乐区、福清市、闽侯县、连江县、闽清县、罗源县、永泰县、芗城区、",
     "xm_districts": []
    },
    {
     "value": 2045.0,
     "scope_sample": "龙海区、漳浦县、云霄县、东山县、诏安县、平和县、南靖县、长泰区、华安县、安溪县、永春县、德化县、三元区、永安市、沙县区、",
     "xm_districts": []
    },
    {
     "value": 1895.0,
     "scope_sample": "清流县、宁化县、建宁县、泰宁县、明溪县、将乐县、尤溪县、大田县、顺昌县、浦城县、光泽县、松溪县、政和县、武平县、长汀县、",
     "xm_districts": []
    }
   ],
   "valid_from": "2025-04-01",
   "valid_to": null,
   "doc_number": "闽人社文〔2025〕14号",
   "policy_id": "fj-minwage-2025-14",
   "clause_no": "（分段）",
   "citation": {
    "doc_number": "闽人社文〔2025〕14号",
    "clause_no": "（分段）",
    "clause_ref": "（分段）@职工医保",
    "regime": "职工医保",
    "quote": "月最低工资标准及适用范围表\n2.福建省非全日制用工小时最低工资标准及适用范围表\n福建省人力资源和社会保障厅\n2025年1月26日\n（此件主动公开）\n附件1\n福建省月最低工资标准及适用范围表\n月最低工资标准（元/月）\n适用范围\n2265\n思明区、湖里区、集美区、海沧区、同安区、翔安区\n2195\n平潭综合实验区、鼓楼区、台江区、仓山区、晋安区、马尾区、长乐区、福清市、闽侯县、连江县、闽清县、罗源县、永泰县、芗城区、龙文区、鲤城区、丰泽区、洛江区、泉港区、石狮市、晋江市、南安市、惠安县、新罗区\n2045\n龙海区、漳浦县、云霄县、东山县、诏安县、平和县、南靖县、长泰区、华安县、安溪县、永春县、德化县、三元区、永安市、沙县区、荔城区、城厢区、涵江区、秀屿区、仙游县、延平区、建阳区、邵武市、武夷山市、建瓯市、永定区、漳平市、上杭县、蕉城区、福安市、福鼎市\n1895\n清流县、宁化县、建宁县、泰宁县、明溪县、将乐县、尤溪县、大田县、顺昌县、浦城县、光泽县、松溪县、政和县、武平县、长汀县、连城县、霞浦县、寿宁县、周宁县、柘荣县、古田县、屏南县\n注：上述最低工资标准包含社会保险和住房公积金个人缴费部分。\n",
    "url": "https://www.xiangan.gov.cn/zwgk/jycy/zcwj/202502/t20250212_1089240.htm",
    "fetched_at": "2026-10-24T23:26:22+08:00",
    "text_sha256": "9b731be80b16b0654c0e08b243a28423f37d96863b75dd02cc870935d9a9b56f",
    "evidence_layer": "L1"
   }
  },
  {
   "param": "min_wage_xiamen",
   "value": 2265.0,
   "valid_from": "2025-04-01",
   "valid_to": null,
   "doc_number": "闽人社文〔2025〕14号",
   "policy_id": "fj-minwage-2025-14",
   "clause_no": "（分段）",
   "citation": {
    "doc_number": "闽人社文〔2025〕14号",
    "clause_no": "（分段）",
    "clause_ref": "（分段）@职工医保",
    "regime": "职工医保",
    "quote": "月最低工资标准及适用范围表\n2.福建省非全日制用工小时最低工资标准及适用范围表\n福建省人力资源和社会保障厅\n2025年1月26日\n（此件主动公开）\n附件1\n福建省月最低工资标准及适用范围表\n月最低工资标准（元/月）\n适用范围\n2265\n思明区、湖里区、集美区、海沧区、同安区、翔安区\n2195\n平潭综合实验区、鼓楼区、台江区、仓山区、晋安区、马尾区、长乐区、福清市、闽侯县、连江县、闽清县、罗源县、永泰县、芗城区、龙文区、鲤城区、丰泽区、洛江区、泉港区、石狮市、晋江市、南安市、惠安县、新罗区\n2045\n龙海区、漳浦县、云霄县、东山县、诏安县、平和县、南靖县、长泰区、华安县、安溪县、永春县、德化县、三元区、永安市、沙县区、荔城区、城厢区、涵江区、秀屿区、仙游县、延平区、建阳区、邵武市、武夷山市、建瓯市、永定区、漳平市、上杭县、蕉城区、福安市、福鼎市\n1895\n清流县、宁化县、建宁县、泰宁县、明溪县、将乐县、尤溪县、大田县、顺昌县、浦城县、光泽县、松溪县、政和县、武平县、长汀县、连城县、霞浦县、寿宁县、周宁县、柘荣县、古田县、屏南县\n注：上述最低工资标准包含社会保险和住房公积金个人缴费部分。\n",
    "url": "https://www.xiangan.gov.cn/zwgk/jycy/zcwj/202502/t20250212_1089240.htm",
    "fetched_at": "2026-10-24T23:26:22+08:00",
    "text_sha256": "9b731be80b16b0654c0e08b243a28423f37d96863b75dd02cc870935d9a9b56f",
    "evidence_layer": "L1"
   }
  },
  {
   "param": "min_wage_xiamen_scope",
   "value": "思明区、湖里区、集美区、海沧区、同安区、翔安区",
   "valid_from": "2025-04-01",
   "valid_to": null,
   "doc_number": "闽人社文〔2025〕14号",
   "policy_id": "fj-minwage-2025-14",
   "clause_no": "（分段）",
   "citation": {
    "doc_number": "闽人社文〔2025〕14号",
    "clause_no": "（分段）",
    "clause_ref": "（分段）@职工医保",
    "regime": "职工医保",
    "quote": "月最低工资标准及适用范围表\n2.福建省非全日制用工小时最低工资标准及适用范围表\n福建省人力资源和社会保障厅\n2025年1月26日\n（此件主动公开）\n附件1\n福建省月最低工资标准及适用范围表\n月最低工资标准（元/月）\n适用范围\n2265\n思明区、湖里区、集美区、海沧区、同安区、翔安区\n2195\n平潭综合实验区、鼓楼区、台江区、仓山区、晋安区、马尾区、长乐区、福清市、闽侯县、连江县、闽清县、罗源县、永泰县、芗城区、龙文区、鲤城区、丰泽区、洛江区、泉港区、石狮市、晋江市、南安市、惠安县、新罗区\n2045\n龙海区、漳浦县、云霄县、东山县、诏安县、平和县、南靖县、长泰区、华安县、安溪县、永春县、德化县、三元区、永安市、沙县区、荔城区、城厢区、涵江区、秀屿区、仙游县、延平区、建阳区、邵武市、武夷山市、建瓯市、永定区、漳平市、上杭县、蕉城区、福安市、福鼎市\n1895\n清流县、宁化县、建宁县、泰宁县、明溪县、将乐县、尤溪县、大田县、顺昌县、浦城县、光泽县、松溪县、政和县、武平县、长汀县、连城县、霞浦县、寿宁县、周宁县、柘荣县、古田县、屏南县\n注：上述最低工资标准包含社会保险和住房公积金个人缴费部分。\n",
    "url": "https://www.xiangan.gov.cn/zwgk/jycy/zcwj/202502/t20250212_1089240.htm",
    "fetched_at": "2026-10-24T23:26:22+08:00",
    "text_sha256": "9b731be80b16b0654c0e08b243a28423f37d96863b75dd02cc870935d9a9b56f",
    "evidence_layer": "L1"
   }
  },
  {
   "param": "months_per_year",
   "value": 2,
   "valid_from": "2025-01-01",
   "valid_to": "2027-12-31",
   "doc_number": "厦府规〔2025〕7号",
   "policy_id": "xm-yb-2025-7",
   "clause_no": "（分段）",
   "citation": {
    "doc_number": "厦府规〔2025〕7号",
    "clause_no": "（分段）",
    "clause_ref": "（分段）@职工医保",
    "regime": "职工医保",
    "quote": "二、关于失业保险待遇政策\n（一）暂停执行“市条例”第十七条第一款、第十八条，原本市城镇户口失业人员的失业保险待遇按“省条例”和“省统筹方案”规定的城镇职工失业保险金标准执行，即失业保险金月发放标准为本市月最低工资标准的90%；领取失业保险金的期限，根据其失业前累计缴费的时间计算，每满1年领取2个月失业保险金，最长期限为24个月。",
    "url": "https://www.xm.gov.cn/zfgb/99833863",
    "fetched_at": "2026-10-24T23:08:00+08:00",
    "text_sha256": "1b15834fb11bc054d93821721d13584019859372a0d9f30865fc1f2d6c539f6e",
    "evidence_layer": "L1"
   }
  },
  {
   "param": "pension_account_pct",
   "value": 8,
   "valid_from": null,
   "valid_to": null,
   "doc_number": "灵活就业人员 养老保险参保指引",
   "policy_id": "xm-pension-official-guide",
   "clause_no": "（分段）",
   "citation": {
    "doc_number": "灵活就业人员 养老保险参保指引",
    "clause_no": "（分段）",
    "clause_ref": "（分段）@职工医保",
    "regime": "职工医保",
    "quote": "缴费费率为20%，其中12%记入统筹基金，8%记入个人账户。",
    "url": "https://cloud.xm.gov.cn/165/service/2810450.xhtml",
    "fetched_at": "2026-10-25T10:24:11+08:00",
    "text_sha256": "41e1c6d2ca8b1e057c5758f8c58b78c7b4a5d4f10eeb482d069606f2049c369c",
    "evidence_layer": "L4"
   }
  },
  {
   "param": "pension_base_max_pct",
   "value": 300,
   "valid_from": null,
   "valid_to": null,
   "doc_number": "居住证人员参加企业职工基本养老保险 解读",
   "policy_id": "xm-residence-pension-interpret",
   "clause_no": "（分段）",
   "citation": {
    "doc_number": "居住证人员参加企业职工基本养老保险 解读",
    "clause_no": "（分段）",
    "clause_ref": "（分段）@职工医保",
    "regime": "职工医保",
    "quote": "参保人员按不低于全市上年度职工月平均工资60%且不高于全市上年度职工月平均工资300%的标准自行选择缴费基数（共7个档次），今年的7个档次缴费基数分别是3772.80元（全市上年度职工月平均工资的60%）、4401.60元（全市上年度职工月平均工资的70%）、5030.40元（全市上年度职工月平均工资的80%）、5659.20元（全市上年度职工月平均工资的90%）、6288.00元（全市上年度职工月平均工资的100%）、12576.00元（全市上年度职工月平均工资的200%）、18864.00元（全市上年度职工月平均工资的300%）。\n上述缴费基数乘以20%的缴费比例后，7个档次的月缴费金额从低到高分别是754.56元、880.32元、1006.08元、1131.84元、1257.60元、2515.20元、3772.80元。",
    "url": "https://hrss.xm.gov.cn/gzcy/zxft/jdcxmjzzkcb",
    "fetched_at": "2026-10-25T10:24:11+08:00",
    "text_sha256": "84023b2d5af7aa69518df8f4b71fbe3fcf99189cd524916b9381f7c136aae153",
    "evidence_layer": "L4"
   }
  },
  {
   "param": "pension_base_min_pct",
   "value": 60,
   "valid_from": null,
   "valid_to": null,
   "doc_number": "居住证人员参加企业职工基本养老保险 解读",
   "policy_id": "xm-residence-pension-interpret",
   "clause_no": "（分段）",
   "citation": {
    "doc_number": "居住证人员参加企业职工基本养老保险 解读",
    "clause_no": "（分段）",
    "clause_ref": "（分段）@职工医保",
    "regime": "职工医保",
    "quote": "参保人员按不低于全市上年度职工月平均工资60%且不高于全市上年度职工月平均工资300%的标准自行选择缴费基数（共7个档次），今年的7个档次缴费基数分别是3772.80元（全市上年度职工月平均工资的60%）、4401.60元（全市上年度职工月平均工资的70%）、5030.40元（全市上年度职工月平均工资的80%）、5659.20元（全市上年度职工月平均工资的90%）、6288.00元（全市上年度职工月平均工资的100%）、12576.00元（全市上年度职工月平均工资的200%）、18864.00元（全市上年度职工月平均工资的300%）。\n上述缴费基数乘以20%的缴费比例后，7个档次的月缴费金额从低到高分别是754.56元、880.32元、1006.08元、1131.84元、1257.60元、2515.20元、3772.80元。",
    "url": "https://hrss.xm.gov.cn/gzcy/zxft/jdcxmjzzkcb",
    "fetched_at": "2026-10-25T10:24:11+08:00",
    "text_sha256": "84023b2d5af7aa69518df8f4b71fbe3fcf99189cd524916b9381f7c136aae153",
    "evidence_layer": "L4"
   }
  },
  {
   "param": "pension_flexible_rate",
   "value": 20,
   "valid_from": null,
   "valid_to": null,
   "doc_number": "灵活就业人员 养老保险参保指引",
   "policy_id": "xm-pension-official-guide",
   "clause_no": "（分段）",
   "citation": {
    "doc_number": "灵活就业人员 养老保险参保指引",
    "clause_no": "（分段）",
    "clause_ref": "（分段）@职工医保",
    "regime": "职工医保",
    "quote": "缴费费率为20%，其中12%记入统筹基金，8%记入个人账户。",
    "url": "https://cloud.xm.gov.cn/165/service/2810450.xhtml",
    "fetched_at": "2026-10-25T10:24:11+08:00",
    "text_sha256": "41e1c6d2ca8b1e057c5758f8c58b78c7b4a5d4f10eeb482d069606f2049c369c",
    "evidence_layer": "L4"
   }
  },
  {
   "param": "pension_flexible_rate_alt",
   "value": 20,
   "valid_from": null,
   "valid_to": null,
   "doc_number": "居住证人员参加企业职工基本养老保险 解读",
   "policy_id": "xm-residence-pension-interpret",
   "clause_no": "（分段）",
   "citation": {
    "doc_number": "居住证人员参加企业职工基本养老保险 解读",
    "clause_no": "（分段）",
    "clause_ref": "（分段）@职工医保",
    "regime": "职工医保",
    "quote": "参保人员按不低于全市上年度职工月平均工资60%且不高于全市上年度职工月平均工资300%的标准自行选择缴费基数（共7个档次），今年的7个档次缴费基数分别是3772.80元（全市上年度职工月平均工资的60%）、4401.60元（全市上年度职工月平均工资的70%）、5030.40元（全市上年度职工月平均工资的80%）、5659.20元（全市上年度职工月平均工资的90%）、6288.00元（全市上年度职工月平均工资的100%）、12576.00元（全市上年度职工月平均工资的200%）、18864.00元（全市上年度职工月平均工资的300%）。\n上述缴费基数乘以20%的缴费比例后，7个档次的月缴费金额从低到高分别是754.56元、880.32元、1006.08元、1131.84元、1257.60元、2515.20元、3772.80元。",
    "url": "https://hrss.xm.gov.cn/gzcy/zxft/jdcxmjzzkcb",
    "fetched_at": "2026-10-25T10:24:11+08:00",
    "text_sha256": "84023b2d5af7aa69518df8f4b71fbe3fcf99189cd524916b9381f7c136aae153",
    "evidence_layer": "L4"
   }
  },
  {
   "param": "pension_min_years_now",
   "value": 15,
   "valid_from": null,
   "valid_to": null,
   "doc_number": "企业职工退休—养老保险待遇申领 办事指南",
   "policy_id": "xm-pension-retire-guide",
   "clause_no": "（分段）",
   "citation": {
    "doc_number": "企业职工退休—养老保险待遇申领 办事指南",
    "clause_no": "（分段）",
    "clause_ref": "（分段）@职工医保",
    "regime": "职工医保",
    "quote": "申请对象\n\n    满足企业职工养老保险正常退休手续办理条件的参保人员：1.达到法定退休年龄；2.累计缴费年限满15年。从2030年1月1日起，职工按月领取基本养老金最低缴费年限由15年逐步提高至20年，每年提高6个月。",
    "url": "https://siming.gov.cn/wsbs/ztfw/sb/nrrh/202411/t20241119_1078974.htm?PROTID=6713",
    "fetched_at": "2026-10-24T23:32:46+08:00",
    "text_sha256": "6ae581a1da3496ff733c35fb7cddd0c2658171c8ceff35e23f4b4618329e9b51",
    "evidence_layer": "L2"
   }
  },
  {
   "param": "pension_min_years_target",
   "value": 20,
   "valid_from": null,
   "valid_to": null,
   "doc_number": "企业职工退休—养老保险待遇申领 办事指南",
   "policy_id": "xm-pension-retire-guide",
   "clause_no": "（分段）",
   "citation": {
    "doc_number": "企业职工退休—养老保险待遇申领 办事指南",
    "clause_no": "（分段）",
    "clause_ref": "（分段）@职工医保",
    "regime": "职工医保",
    "quote": "申请对象\n\n    满足企业职工养老保险正常退休手续办理条件的参保人员：1.达到法定退休年龄；2.累计缴费年限满15年。从2030年1月1日起，职工按月领取基本养老金最低缴费年限由15年逐步提高至20年，每年提高6个月。",
    "url": "https://siming.gov.cn/wsbs/ztfw/sb/nrrh/202411/t20241119_1078974.htm?PROTID=6713",
    "fetched_at": "2026-10-24T23:32:46+08:00",
    "text_sha256": "6ae581a1da3496ff733c35fb7cddd0c2658171c8ceff35e23f4b4618329e9b51",
    "evidence_layer": "L2"
   }
  },
  {
   "param": "pension_pool_pct",
   "value": 12,
   "valid_from": null,
   "valid_to": null,
   "doc_number": "灵活就业人员 养老保险参保指引",
   "policy_id": "xm-pension-official-guide",
   "clause_no": "（分段）",
   "citation": {
    "doc_number": "灵活就业人员 养老保险参保指引",
    "clause_no": "（分段）",
    "clause_ref": "（分段）@职工医保",
    "regime": "职工医保",
    "quote": "缴费费率为20%，其中12%记入统筹基金，8%记入个人账户。",
    "url": "https://cloud.xm.gov.cn/165/service/2810450.xhtml",
    "fetched_at": "2026-10-25T10:24:11+08:00",
    "text_sha256": "41e1c6d2ca8b1e057c5758f8c58b78c7b4a5d4f10eeb482d069606f2049c369c",
    "evidence_layer": "L4"
   }
  },
  {
   "param": "pension_ramp_start_year",
   "value": 2030,
   "valid_from": null,
   "valid_to": null,
   "doc_number": "企业职工退休—养老保险待遇申领 办事指南",
   "policy_id": "xm-pension-retire-guide",
   "clause_no": "（分段）",
   "citation": {
    "doc_number": "企业职工退休—养老保险待遇申领 办事指南",
    "clause_no": "（分段）",
    "clause_ref": "（分段）@职工医保",
    "regime": "职工医保",
    "quote": "申请对象\n\n    满足企业职工养老保险正常退休手续办理条件的参保人员：1.达到法定退休年龄；2.累计缴费年限满15年。从2030年1月1日起，职工按月领取基本养老金最低缴费年限由15年逐步提高至20年，每年提高6个月。",
    "url": "https://siming.gov.cn/wsbs/ztfw/sb/nrrh/202411/t20241119_1078974.htm?PROTID=6713",
    "fetched_at": "2026-10-24T23:32:46+08:00",
    "text_sha256": "6ae581a1da3496ff733c35fb7cddd0c2658171c8ceff35e23f4b4618329e9b51",
    "evidence_layer": "L2"
   }
  },
  {
   "param": "pension_ramp_step_months",
   "value": 6,
   "valid_from": null,
   "valid_to": null,
   "doc_number": "企业职工退休—养老保险待遇申领 办事指南",
   "policy_id": "xm-pension-retire-guide",
   "clause_no": "（分段）",
   "citation": {
    "doc_number": "企业职工退休—养老保险待遇申领 办事指南",
    "clause_no": "（分段）",
    "clause_ref": "（分段）@职工医保",
    "regime": "职工医保",
    "quote": "申请对象\n\n    满足企业职工养老保险正常退休手续办理条件的参保人员：1.达到法定退休年龄；2.累计缴费年限满15年。从2030年1月1日起，职工按月领取基本养老金最低缴费年限由15年逐步提高至20年，每年提高6个月。",
    "url": "https://siming.gov.cn/wsbs/ztfw/sb/nrrh/202411/t20241119_1078974.htm?PROTID=6713",
    "fetched_at": "2026-10-24T23:32:46+08:00",
    "text_sha256": "6ae581a1da3496ff733c35fb7cddd0c2658171c8ceff35e23f4b4618329e9b51",
    "evidence_layer": "L2"
   }
  },
  {
   "param": "pension_tier_amounts_sample",
   "value": [
    754.56,
    880.32,
    1006.08,
    1131.84,
    1257.6,
    2515.2,
    3772.8
   ],
   "valid_from": null,
   "valid_to": null,
   "doc_number": "居住证人员参加企业职工基本养老保险 解读",
   "policy_id": "xm-residence-pension-interpret",
   "clause_no": "（分段）",
   "citation": {
    "doc_number": "居住证人员参加企业职工基本养老保险 解读",
    "clause_no": "（分段）",
    "clause_ref": "（分段）@职工医保",
    "regime": "职工医保",
    "quote": "参保人员按不低于全市上年度职工月平均工资60%且不高于全市上年度职工月平均工资300%的标准自行选择缴费基数（共7个档次），今年的7个档次缴费基数分别是3772.80元（全市上年度职工月平均工资的60%）、4401.60元（全市上年度职工月平均工资的70%）、5030.40元（全市上年度职工月平均工资的80%）、5659.20元（全市上年度职工月平均工资的90%）、6288.00元（全市上年度职工月平均工资的100%）、12576.00元（全市上年度职工月平均工资的200%）、18864.00元（全市上年度职工月平均工资的300%）。\n上述缴费基数乘以20%的缴费比例后，7个档次的月缴费金额从低到高分别是754.56元、880.32元、1006.08元、1131.84元、1257.60元、2515.20元、3772.80元。",
    "url": "https://hrss.xm.gov.cn/gzcy/zxft/jdcxmjzzkcb",
    "fetched_at": "2026-10-25T10:24:11+08:00",
    "text_sha256": "84023b2d5af7aa69518df8f4b71fbe3fcf99189cd524916b9381f7c136aae153",
    "evidence_layer": "L4"
   }
  },
  {
   "param": "rates_pct",
   "value": [
    50.0
   ],
   "valid_from": "2022-07-01",
   "valid_to": null,
   "doc_number": "厦府规〔2022〕12号",
   "policy_id": "xm-yb-2022-12",
   "clause_no": "第五十五条",
   "citation": {
    "doc_number": "厦府规〔2022〕12号",
    "clause_no": "第五十五条",
    "clause_ref": "第五十五条@职工医保",
    "regime": "职工医保",
    "quote": "第五十五条\n职工在分娩、妊娠终止、实施计划生育手术前连续缴费满\n12个月（含当月）的，按规定享受生育津贴；当月正常参保缴费但连续缴费不满12个月的，生育津贴按正常待遇的50%支付。",
    "url": "https://www.xm.gov.cn/zfgb/99833450",
    "fetched_at": "2026-10-24T23:08:00+08:00",
    "text_sha256": "e76be654ab7df9ef5fda099c2aec9016c6fdbdd18f8527a648afc361cd0bbd8f",
    "evidence_layer": "L1"
   }
  },
  {
   "param": "required_months",
   "value": [
    12,
    12
   ],
   "valid_from": "2022-07-01",
   "valid_to": null,
   "doc_number": "厦府规〔2022〕12号",
   "policy_id": "xm-yb-2022-12",
   "clause_no": "第五十五条",
   "citation": {
    "doc_number": "厦府规〔2022〕12号",
    "clause_no": "第五十五条",
    "clause_ref": "第五十五条@职工医保",
    "regime": "职工医保",
    "quote": "第五十五条\n职工在分娩、妊娠终止、实施计划生育手术前连续缴费满\n12个月（含当月）的，按规定享受生育津贴；当月正常参保缴费但连续缴费不满12个月的，生育津贴按正常待遇的50%支付。",
    "url": "https://www.xm.gov.cn/zfgb/99833450",
    "fetched_at": "2026-10-24T23:08:00+08:00",
    "text_sha256": "e76be654ab7df9ef5fda099c2aec9016c6fdbdd18f8527a648afc361cd0bbd8f",
    "evidence_layer": "L1"
   }
  },
  {
   "param": "residence_retire_female",
   "value": 55,
   "valid_from": null,
   "valid_to": null,
   "doc_number": "居住证人员参加企业职工基本养老保险 解读",
   "policy_id": "xm-residence-pension-interpret",
   "clause_no": "（分段）",
   "citation": {
    "doc_number": "居住证人员参加企业职工基本养老保险 解读",
    "clause_no": "（分段）",
    "clause_ref": "（分段）@职工医保",
    "regime": "职工医保",
    "quote": "在男性年满60周岁、女性年满55周岁且累计缴费满15年时，可在我市办理退休。",
    "url": "https://hrss.xm.gov.cn/gzcy/zxft/jdcxmjzzkcb",
    "fetched_at": "2026-10-25T10:24:11+08:00",
    "text_sha256": "84023b2d5af7aa69518df8f4b71fbe3fcf99189cd524916b9381f7c136aae153",
    "evidence_layer": "L4"
   }
  },
  {
   "param": "residence_retire_male",
   "value": 60,
   "valid_from": null,
   "valid_to": null,
   "doc_number": "居住证人员参加企业职工基本养老保险 解读",
   "policy_id": "xm-residence-pension-interpret",
   "clause_no": "（分段）",
   "citation": {
    "doc_number": "居住证人员参加企业职工基本养老保险 解读",
    "clause_no": "（分段）",
    "clause_ref": "（分段）@职工医保",
    "regime": "职工医保",
    "quote": "在男性年满60周岁、女性年满55周岁且累计缴费满15年时，可在我市办理退休。",
    "url": "https://hrss.xm.gov.cn/gzcy/zxft/jdcxmjzzkcb",
    "fetched_at": "2026-10-25T10:24:11+08:00",
    "text_sha256": "84023b2d5af7aa69518df8f4b71fbe3fcf99189cd524916b9381f7c136aae153",
    "evidence_layer": "L4"
   }
  },
  {
   "param": "residence_retire_years",
   "value": 15,
   "valid_from": null,
   "valid_to": null,
   "doc_number": "居住证人员参加企业职工基本养老保险 解读",
   "policy_id": "xm-residence-pension-interpret",
   "clause_no": "（分段）",
   "citation": {
    "doc_number": "居住证人员参加企业职工基本养老保险 解读",
    "clause_no": "（分段）",
    "clause_ref": "（分段）@职工医保",
    "regime": "职工医保",
    "quote": "在男性年满60周岁、女性年满55周岁且累计缴费满15年时，可在我市办理退休。",
    "url": "https://hrss.xm.gov.cn/gzcy/zxft/jdcxmjzzkcb",
    "fetched_at": "2026-10-25T10:24:11+08:00",
    "text_sha256": "84023b2d5af7aa69518df8f4b71fbe3fcf99189cd524916b9381f7c136aae153",
    "evidence_layer": "L4"
   }
  },
  {
   "param": "resident_break_rule",
   "value": "中断一个年度及以上：连续参保时间重新计算，中断期间不享受待遇",
   "valid_from": "2022-07-01",
   "valid_to": null,
   "doc_number": "厦府规〔2022〕12号",
   "policy_id": "xm-yb-2022-12",
   "clause_no": "第四十八条",
   "citation": {
    "doc_number": "厦府规〔2022〕12号",
    "clause_no": "第四十八条",
    "clause_ref": "第四十八条@居民医保",
    "regime": "居民医保",
    "quote": "第四十八条\n参保缴费时间应当保持连续，不得随意中断。未按规定及时足额缴纳基本医疗保险费的，认定为中断缴费，并按下列规定处理：\n（一）中断缴费一个年度及以上的，再次参保后连续参保时间重新计算，中断期间不享受医疗保障待遇；\n（二）在当年度开始后\n3个月（含）以内参保并补缴基本医疗保险费且次月缴费到账的，视为连续，中断月份计入连续参保时间，中断期间的待遇可按规定追溯享受；\n（三）在当年度开始\n3个月后（即每年3月后）参保缴费，缴费之前不享受医疗保障待遇，缴费之前发生的医疗费用由个人负担，且不计入个人自付费用计算范围。参保次月缴费到账的，从参保当月起开始重新计算连续参保时间；参保次月缴费未到账的，从实际缴费到账当月起开始重新计算连续参保时间；\n（四）从其他统筹区转入本市并按规定办理基本医疗保险关系转移接续的参保人员，在转移接续前未中断缴费，或中断缴费\n3个月（含）以内续保并补缴基本医疗保险费且次月缴费到账的，在其他统筹区正常参保缴费时间可与本市参保缴费时间合并计算，中断月份计入连续参保时间。",
    "url": "https://www.xm.gov.cn/zfgb/99833450",
    "fetched_at": "2026-10-24T23:08:00+08:00",
    "text_sha256": "e76be654ab7df9ef5fda099c2aec9016c6fdbdd18f8527a648afc361cd0bbd8f",
    "evidence_layer": "L1"
   }
  },
  {
   "param": "resident_db_tier_rates_pct",
   "value": [
    50.0,
    75.0,
    100.0
   ],
   "valid_from": "2022-07-01",
   "valid_to": null,
   "doc_number": "厦府规〔2022〕12号",
   "policy_id": "xm-yb-2022-12",
   "clause_no": "第三十二条",
   "citation": {
    "doc_number": "厦府规〔2022〕12号",
    "clause_no": "第三十二条",
    "clause_ref": "第三十二条@居民医保",
    "regime": "居民医保",
    "quote": "第三十二条\n参保人员享受大病保险待遇的标准，根据其医疗费用发生时连续参加基本医疗保险的时间确定：\n（一）连续参保时间不满\n12个月的，按正常待遇的50%支付;\n（二）连续参保时间满\n12个月不满24个月的，按正常待遇的75%支付;\n（三）连续参保时间满\n24个月的，按正常待遇的100%支付。\n未成年人、在校学生、医疗救助对象大病保险待遇不受连续参保时间限制。",
    "url": "https://www.xm.gov.cn/zfgb/99833450",
    "fetched_at": "2026-10-24T23:08:00+08:00",
    "text_sha256": "e76be654ab7df9ef5fda099c2aec9016c6fdbdd18f8527a648afc361cd0bbd8f",
    "evidence_layer": "L1"
   }
  },
  {
   "param": "resident_enroll_coverage_year",
   "value": 2026,
   "valid_from": "2025-10-22",
   "valid_to": "2025-12-26",
   "doc_number": "2026年居民医保集中参保缴费期公告",
   "policy_id": "xm-resident-enroll-window-2026",
   "clause_no": "（分段）",
   "citation": {
    "doc_number": "2026年居民医保集中参保缴费期公告",
    "clause_no": "（分段）",
    "clause_ref": "（分段）@居民医保",
    "regime": "居民医保",
    "quote": "在2026年城乡居民基本医疗保险集中参保缴费期内（2025年10月22日至12月26日）缴费且连续参保的人员，可自2026年1月1日起享受我市居民医保待遇，未及时参保缴费的将无法享受连续参保相关激励，还可能因中断参保，而面临待遇等待期，等待期内发生的医疗费用，医保将不予报销。",
    "url": "https://ylbz.xm.gov.cn/zwgk/tpxw/202512/t20251224_2973554.htm",
    "fetched_at": "2026-10-25T11:27:50+08:00",
    "text_sha256": "83016ccc933c72ba4b9734495bdb6141ddecd716566ae6db1e65f5698057c0e8",
    "evidence_layer": "L1"
   }
  },
  {
   "param": "resident_enroll_coverage_year",
   "value": 2027,
   "valid_from": "2026-10-01",
   "valid_to": "2026-12-31",
   "doc_number": "2027年度居民医保及长护险集中参保缴费期公告",
   "policy_id": "xm-resident-enroll-window-2027",
   "clause_no": "（分段）",
   "citation": {
    "doc_number": "2027年度居民医保及长护险集中参保缴费期公告",
    "clause_no": "（分段）",
    "clause_ref": "（分段）@居民医保",
    "regime": "居民医保",
    "quote": "居民在2026年10月至12月集中参保缴费期内，同步缴纳2027年度居民医保和长护险保费，职工从2027年1月开始按月同步参保缴纳职工医保和长护险保费。",
    "url": "https://ylbz.xm.gov.cn/zwgk/tpxw/202610/t20261012_3020838.htm",
    "fetched_at": "2026-10-25T11:27:52+08:00",
    "text_sha256": "471f6596fdc78d87251f39cea1b070d36bd571ab1f37bda504cb3f81ce2aa225",
    "evidence_layer": "L1"
   }
  },
  {
   "param": "resident_enroll_end",
   "value": "2025-12-26",
   "valid_from": "2025-10-22",
   "valid_to": "2025-12-26",
   "doc_number": "2026年居民医保集中参保缴费期公告",
   "policy_id": "xm-resident-enroll-window-2026",
   "clause_no": "（分段）",
   "citation": {
    "doc_number": "2026年居民医保集中参保缴费期公告",
    "clause_no": "（分段）",
    "clause_ref": "（分段）@居民医保",
    "regime": "居民医保",
    "quote": "在2026年城乡居民基本医疗保险集中参保缴费期内（2025年10月22日至12月26日）缴费且连续参保的人员，可自2026年1月1日起享受我市居民医保待遇，未及时参保缴费的将无法享受连续参保相关激励，还可能因中断参保，而面临待遇等待期，等待期内发生的医疗费用，医保将不予报销。",
    "url": "https://ylbz.xm.gov.cn/zwgk/tpxw/202512/t20251224_2973554.htm",
    "fetched_at": "2026-10-25T11:27:50+08:00",
    "text_sha256": "83016ccc933c72ba4b9734495bdb6141ddecd716566ae6db1e65f5698057c0e8",
    "evidence_layer": "L1"
   }
  },
  {
   "param": "resident_enroll_end",
   "value": "2026-12-31",
   "valid_from": "2026-10-01",
   "valid_to": "2026-12-31",
   "doc_number": "2027年度居民医保及长护险集中参保缴费期公告",
   "policy_id": "xm-resident-enroll-window-2027",
   "clause_no": "（分段）",
   "citation": {
    "doc_number": "2027年度居民医保及长护险集中参保缴费期公告",
    "clause_no": "（分段）",
    "clause_ref": "（分段）@居民医保",
    "regime": "居民医保",
    "quote": "居民在2026年10月至12月集中参保缴费期内，同步缴纳2027年度居民医保和长护险保费，职工从2027年1月开始按月同步参保缴纳职工医保和长护险保费。",
    "url": "https://ylbz.xm.gov.cn/zwgk/tpxw/202610/t20261012_3020838.htm",
    "fetched_at": "2026-10-25T11:27:52+08:00",
    "text_sha256": "471f6596fdc78d87251f39cea1b070d36bd571ab1f37bda504cb3f81ce2aa225",
    "evidence_layer": "L1"
   }
  },
  {
   "param": "resident_enroll_month_from",
   "value": 9,
   "valid_from": "2022-07-01",
   "valid_to": null,
   "doc_number": "厦府规〔2022〕12号",
   "policy_id": "xm-yb-2022-12",
   "clause_no": "第九条",
   "citation": {
    "doc_number": "厦府规〔2022〕12号",
    "clause_no": "第九条",
    "clause_ref": "第九条@居民医保",
    "regime": "居民医保",
    "quote": "第九条\n城乡居民基本医疗保险费实行预缴制，每年\n9月至12月为次年居民医保的集中参保缴费期。城乡居民应当在集中参保缴费期内按规定办理参保登记手续，并按个人缴费标准一次性缴纳下一年度的基本医疗保险费。\n超过集中参保缴费期，符合参保条件的城乡居民可以中途参保，中途参保人员按全年个人缴费标准缴纳基本医疗保险费。",
    "url": "https://www.xm.gov.cn/zfgb/99833450",
    "fetched_at": "2026-10-24T23:08:00+08:00",
    "text_sha256": "e76be654ab7df9ef5fda099c2aec9016c6fdbdd18f8527a648afc361cd0bbd8f",
    "evidence_layer": "L1"
   }
  },
  {
   "param": "resident_enroll_month_to",
   "value": 12,
   "valid_from": "2022-07-01",
   "valid_to": null,
   "doc_number": "厦府规〔2022〕12号",
   "policy_id": "xm-yb-2022-12",
   "clause_no": "第九条",
   "citation": {
    "doc_number": "厦府规〔2022〕12号",
    "clause_no": "第九条",
    "clause_ref": "第九条@居民医保",
    "regime": "居民医保",
    "quote": "第九条\n城乡居民基本医疗保险费实行预缴制，每年\n9月至12月为次年居民医保的集中参保缴费期。城乡居民应当在集中参保缴费期内按规定办理参保登记手续，并按个人缴费标准一次性缴纳下一年度的基本医疗保险费。\n超过集中参保缴费期，符合参保条件的城乡居民可以中途参保，中途参保人员按全年个人缴费标准缴纳基本医疗保险费。",
    "url": "https://www.xm.gov.cn/zfgb/99833450",
    "fetched_at": "2026-10-24T23:08:00+08:00",
    "text_sha256": "e76be654ab7df9ef5fda099c2aec9016c6fdbdd18f8527a648afc361cd0bbd8f",
    "evidence_layer": "L1"
   }
  },
  {
   "param": "resident_enroll_precision",
   "value": "day",
   "valid_from": "2025-10-22",
   "valid_to": "2025-12-26",
   "doc_number": "2026年居民医保集中参保缴费期公告",
   "policy_id": "xm-resident-enroll-window-2026",
   "clause_no": "（分段）",
   "citation": {
    "doc_number": "2026年居民医保集中参保缴费期公告",
    "clause_no": "（分段）",
    "clause_ref": "（分段）@居民医保",
    "regime": "居民医保",
    "quote": "在2026年城乡居民基本医疗保险集中参保缴费期内（2025年10月22日至12月26日）缴费且连续参保的人员，可自2026年1月1日起享受我市居民医保待遇，未及时参保缴费的将无法享受连续参保相关激励，还可能因中断参保，而面临待遇等待期，等待期内发生的医疗费用，医保将不予报销。",
    "url": "https://ylbz.xm.gov.cn/zwgk/tpxw/202512/t20251224_2973554.htm",
    "fetched_at": "2026-10-25T11:27:50+08:00",
    "text_sha256": "83016ccc933c72ba4b9734495bdb6141ddecd716566ae6db1e65f5698057c0e8",
    "evidence_layer": "L1"
   }
  },
  {
   "param": "resident_enroll_precision",
   "value": "month",
   "valid_from": "2026-10-01",
   "valid_to": "2026-12-31",
   "doc_number": "2027年度居民医保及长护险集中参保缴费期公告",
   "policy_id": "xm-resident-enroll-window-2027",
   "clause_no": "（分段）",
   "citation": {
    "doc_number": "2027年度居民医保及长护险集中参保缴费期公告",
    "clause_no": "（分段）",
    "clause_ref": "（分段）@居民医保",
    "regime": "居民医保",
    "quote": "居民在2026年10月至12月集中参保缴费期内，同步缴纳2027年度居民医保和长护险保费，职工从2027年1月开始按月同步参保缴纳职工医保和长护险保费。",
    "url": "https://ylbz.xm.gov.cn/zwgk/tpxw/202610/t20261012_3020838.htm",
    "fetched_at": "2026-10-25T11:27:52+08:00",
    "text_sha256": "471f6596fdc78d87251f39cea1b070d36bd571ab1f37bda504cb3f81ce2aa225",
    "evidence_layer": "L1"
   }
  },
  {
   "param": "resident_enroll_start",
   "value": "2025-10-22",
   "valid_from": "2025-10-22",
   "valid_to": "2025-12-26",
   "doc_number": "2026年居民医保集中参保缴费期公告",
   "policy_id": "xm-resident-enroll-window-2026",
   "clause_no": "（分段）",
   "citation": {
    "doc_number": "2026年居民医保集中参保缴费期公告",
    "clause_no": "（分段）",
    "clause_ref": "（分段）@居民医保",
    "regime": "居民医保",
    "quote": "在2026年城乡居民基本医疗保险集中参保缴费期内（2025年10月22日至12月26日）缴费且连续参保的人员，可自2026年1月1日起享受我市居民医保待遇，未及时参保缴费的将无法享受连续参保相关激励，还可能因中断参保，而面临待遇等待期，等待期内发生的医疗费用，医保将不予报销。",
    "url": "https://ylbz.xm.gov.cn/zwgk/tpxw/202512/t20251224_2973554.htm",
    "fetched_at": "2026-10-25T11:27:50+08:00",
    "text_sha256": "83016ccc933c72ba4b9734495bdb6141ddecd716566ae6db1e65f5698057c0e8",
    "evidence_layer": "L1"
   }
  },
  {
   "param": "resident_enroll_start",
   "value": "2026-10-01",
   "valid_from": "2026-10-01",
   "valid_to": "2026-12-31",
   "doc_number": "2027年度居民医保及长护险集中参保缴费期公告",
   "policy_id": "xm-resident-enroll-window-2027",
   "clause_no": "（分段）",
   "citation": {
    "doc_number": "2027年度居民医保及长护险集中参保缴费期公告",
    "clause_no": "（分段）",
    "clause_ref": "（分段）@居民医保",
    "regime": "居民医保",
    "quote": "居民在2026年10月至12月集中参保缴费期内，同步缴纳2027年度居民医保和长护险保费，职工从2027年1月开始按月同步参保缴纳职工医保和长护险保费。",
    "url": "https://ylbz.xm.gov.cn/zwgk/tpxw/202610/t20261012_3020838.htm",
    "fetched_at": "2026-10-25T11:27:52+08:00",
    "text_sha256": "471f6596fdc78d87251f39cea1b070d36bd571ab1f37bda504cb3f81ce2aa225",
    "evidence_layer": "L1"
   }
  },
  {
   "param": "resident_fiscal_2026",
   "value": 830.0,
   "valid_from": "2026-01-01",
   "valid_to": "2026-12-31",
   "doc_number": "厦医保〔2025〕96号",
   "policy_id": "xm-yb-2025-96",
   "clause_no": "（分段）",
   "citation": {
    "doc_number": "厦医保〔2025〕96号",
    "clause_no": "（分段）",
    "clause_ref": "（分段）@居民医保",
    "regime": "居民医保",
    "quote": "城乡居民基本医疗保险的筹资标准由每人每年1250元调整为每人每年1280元，其中：财政补助标准提高30元，由每人每年800元调整为830元，个人缴费标准维持每人每年450元不变。",
    "url": "https://ylbz.xm.gov.cn/zwgk/tpxw/202510/t20251023_2962144.htm",
    "fetched_at": "2026-10-24T23:08:03+08:00",
    "text_sha256": "2d9ea57751bf9efa0efadcf79d25be28b9faec15b04ab7f51bfb1e8414041c46",
    "evidence_layer": "L1"
   }
  },
  {
   "param": "resident_fiscal_2026_increase",
   "value": 30.0,
   "valid_from": "2026-01-01",
   "valid_to": "2026-12-31",
   "doc_number": "厦医保〔2025〕96号",
   "policy_id": "xm-yb-2025-96",
   "clause_no": "（分段）",
   "citation": {
    "doc_number": "厦医保〔2025〕96号",
    "clause_no": "（分段）",
    "clause_ref": "（分段）@居民医保",
    "regime": "居民医保",
    "quote": "城乡居民基本医疗保险的筹资标准由每人每年1250元调整为每人每年1280元，其中：财政补助标准提高30元，由每人每年800元调整为830元，个人缴费标准维持每人每年450元不变。",
    "url": "https://ylbz.xm.gov.cn/zwgk/tpxw/202510/t20251023_2962144.htm",
    "fetched_at": "2026-10-24T23:08:03+08:00",
    "text_sha256": "2d9ea57751bf9efa0efadcf79d25be28b9faec15b04ab7f51bfb1e8414041c46",
    "evidence_layer": "L1"
   }
  },
  {
   "param": "resident_fiscal_2026_old",
   "value": 800.0,
   "valid_from": "2026-01-01",
   "valid_to": "2026-12-31",
   "doc_number": "厦医保〔2025〕96号",
   "policy_id": "xm-yb-2025-96",
   "clause_no": "（分段）",
   "citation": {
    "doc_number": "厦医保〔2025〕96号",
    "clause_no": "（分段）",
    "clause_ref": "（分段）@居民医保",
    "regime": "居民医保",
    "quote": "城乡居民基本医疗保险的筹资标准由每人每年1250元调整为每人每年1280元，其中：财政补助标准提高30元，由每人每年800元调整为830元，个人缴费标准维持每人每年450元不变。",
    "url": "https://ylbz.xm.gov.cn/zwgk/tpxw/202510/t20251023_2962144.htm",
    "fetched_at": "2026-10-24T23:08:03+08:00",
    "text_sha256": "2d9ea57751bf9efa0efadcf79d25be28b9faec15b04ab7f51bfb1e8414041c46",
    "evidence_layer": "L1"
   }
  },
  {
   "param": "resident_fiscal_2027",
   "value": 871.0,
   "valid_from": "2027-01-01",
   "valid_to": null,
   "doc_number": "厦医保〔2026〕90号",
   "policy_id": "xm-yb-2026-90",
   "clause_no": "（分段）",
   "citation": {
    "doc_number": "厦医保〔2026〕90号",
    "clause_no": "（分段）",
    "clause_ref": "（分段）@居民医保",
    "regime": "居民医保",
    "quote": "一、成年居民基本医疗保险和长期护理保险的筹资标准为每人每年1362元，其中：个人缴费标准为每人每年491元（居民医保450元、长护险41元），财政补助标准为每人每年871元（居民医保830元、长护险41元）。\n二、大学生基本医疗保险和长期护理保险的筹资标准为每人每年1362元，其中：个人缴费标准为每人每年470.5元（居民医保450元、长护险20.5元），财政补助标准为每人每年891.5元（居民医保830元、长护险61.5元）。\n三、18周岁以下未成年人及除大学生外的在校学生基本医疗保险筹资标准为每人每年1280元，不单独缴纳长期护理保险费，按规定享受居民长护险待遇。其中：个人缴费标准为每人每年450元，财政补助标准为每人每年830元。",
    "url": "https://ylbz.xm.gov.cn/zwgk/zfxxgk/ml/zcwj/qtwj/202610/t20261013_3021006.htm",
    "fetched_at": "2026-10-24T23:08:00+08:00",
    "text_sha256": "d775daef731f1ebaeadd93b95e372134d9a830f84cf833784102fe0edde45651",
    "evidence_layer": "L1"
   }
  },
  {
   "param": "resident_fiscal_medical_2027",
   "value": 830.0,
   "valid_from": "2027-01-01",
   "valid_to": null,
   "doc_number": "厦医保〔2026〕90号",
   "policy_id": "xm-yb-2026-90",
   "clause_no": "（分段）",
   "citation": {
    "doc_number": "厦医保〔2026〕90号",
    "clause_no": "（分段）",
    "clause_ref": "（分段）@居民医保",
    "regime": "居民医保",
    "quote": "一、成年居民基本医疗保险和长期护理保险的筹资标准为每人每年1362元，其中：个人缴费标准为每人每年491元（居民医保450元、长护险41元），财政补助标准为每人每年871元（居民医保830元、长护险41元）。\n二、大学生基本医疗保险和长期护理保险的筹资标准为每人每年1362元，其中：个人缴费标准为每人每年470.5元（居民医保450元、长护险20.5元），财政补助标准为每人每年891.5元（居民医保830元、长护险61.5元）。\n三、18周岁以下未成年人及除大学生外的在校学生基本医疗保险筹资标准为每人每年1280元，不单独缴纳长期护理保险费，按规定享受居民长护险待遇。其中：个人缴费标准为每人每年450元，财政补助标准为每人每年830元。",
    "url": "https://ylbz.xm.gov.cn/zwgk/zfxxgk/ml/zcwj/qtwj/202610/t20261013_3021006.htm",
    "fetched_at": "2026-10-24T23:08:00+08:00",
    "text_sha256": "d775daef731f1ebaeadd93b95e372134d9a830f84cf833784102fe0edde45651",
    "evidence_layer": "L1"
   }
  },
  {
   "param": "resident_fiscal_share_pct",
   "value": 50,
   "valid_from": "2022-07-01",
   "valid_to": null,
   "doc_number": "厦府规〔2022〕12号",
   "policy_id": "xm-yb-2022-12",
   "clause_no": "第六条",
   "citation": {
    "doc_number": "厦府规〔2022〕12号",
    "clause_no": "第六条",
    "clause_ref": "第六条@居民医保",
    "regime": "居民医保",
    "quote": "第六条\n城乡居民基本医疗保险费由财政和个人共同承担。建立与经济社会发展水平、财政负担能力和基本医疗消费需求相适应的动态调整筹资机制。具体筹资标准由市医疗保障、财政和税务部门共同研究，经市人民政府同意后公布执行。其中，财政补助资金由市、区两级财政分别承担\n50%。",
    "url": "https://www.xm.gov.cn/zfgb/99833450",
    "fetched_at": "2026-10-24T23:08:00+08:00",
    "text_sha256": "e76be654ab7df9ef5fda099c2aec9016c6fdbdd18f8527a648afc361cd0bbd8f",
    "evidence_layer": "L1"
   }
  },
  {
   "param": "resident_fund_cap_wan",
   "value": 10.0,
   "valid_from": "2022-07-01",
   "valid_to": null,
   "doc_number": "厦府规〔2022〕12号",
   "policy_id": "xm-yb-2022-12",
   "clause_no": "第二十四条",
   "citation": {
    "doc_number": "厦府规〔2022〕12号",
    "clause_no": "第二十四条",
    "clause_ref": "第二十四条@居民医保",
    "regime": "居民医保",
    "quote": "第二十四条\n参保人员发生的符合基金支付范围的医疗费用，在一个医保年度内基本医疗保险统筹基金累计的最高支付限额为\n10万元。",
    "url": "https://www.xm.gov.cn/zfgb/99833450",
    "fetched_at": "2026-10-24T23:08:00+08:00",
    "text_sha256": "e76be654ab7df9ef5fda099c2aec9016c6fdbdd18f8527a648afc361cd0bbd8f",
    "evidence_layer": "L1"
   }
  },
  {
   "param": "resident_makeup_3m_rule",
   "value": "当年度开始后3个月内参保并补缴且次月到账视为连续，中断月份计入连续时间",
   "valid_from": "2022-07-01",
   "valid_to": null,
   "doc_number": "厦府规〔2022〕12号",
   "policy_id": "xm-yb-2022-12",
   "clause_no": "第四十八条",
   "citation": {
    "doc_number": "厦府规〔2022〕12号",
    "clause_no": "第四十八条",
    "clause_ref": "第四十八条@居民医保",
    "regime": "居民医保",
    "quote": "第四十八条\n参保缴费时间应当保持连续，不得随意中断。未按规定及时足额缴纳基本医疗保险费的，认定为中断缴费，并按下列规定处理：\n（一）中断缴费一个年度及以上的，再次参保后连续参保时间重新计算，中断期间不享受医疗保障待遇；\n（二）在当年度开始后\n3个月（含）以内参保并补缴基本医疗保险费且次月缴费到账的，视为连续，中断月份计入连续参保时间，中断期间的待遇可按规定追溯享受；\n（三）在当年度开始\n3个月后（即每年3月后）参保缴费，缴费之前不享受医疗保障待遇，缴费之前发生的医疗费用由个人负担，且不计入个人自付费用计算范围。参保次月缴费到账的，从参保当月起开始重新计算连续参保时间；参保次月缴费未到账的，从实际缴费到账当月起开始重新计算连续参保时间；\n（四）从其他统筹区转入本市并按规定办理基本医疗保险关系转移接续的参保人员，在转移接续前未中断缴费，或中断缴费\n3个月（含）以内续保并补缴基本医疗保险费且次月缴费到账的，在其他统筹区正常参保缴费时间可与本市参保缴费时间合并计算，中断月份计入连续参保时间。",
    "url": "https://www.xm.gov.cn/zfgb/99833450",
    "fetched_at": "2026-10-24T23:08:00+08:00",
    "text_sha256": "e76be654ab7df9ef5fda099c2aec9016c6fdbdd18f8527a648afc361cd0bbd8f",
    "evidence_layer": "L1"
   }
  },
  {
   "param": "resident_medical_2027",
   "value": 450.0,
   "valid_from": "2027-01-01",
   "valid_to": null,
   "doc_number": "厦医保〔2026〕90号",
   "policy_id": "xm-yb-2026-90",
   "clause_no": "（分段）",
   "citation": {
    "doc_number": "厦医保〔2026〕90号",
    "clause_no": "（分段）",
    "clause_ref": "（分段）@居民医保",
    "regime": "居民医保",
    "quote": "一、成年居民基本医疗保险和长期护理保险的筹资标准为每人每年1362元，其中：个人缴费标准为每人每年491元（居民医保450元、长护险41元），财政补助标准为每人每年871元（居民医保830元、长护险41元）。\n二、大学生基本医疗保险和长期护理保险的筹资标准为每人每年1362元，其中：个人缴费标准为每人每年470.5元（居民医保450元、长护险20.5元），财政补助标准为每人每年891.5元（居民医保830元、长护险61.5元）。\n三、18周岁以下未成年人及除大学生外的在校学生基本医疗保险筹资标准为每人每年1280元，不单独缴纳长期护理保险费，按规定享受居民长护险待遇。其中：个人缴费标准为每人每年450元，财政补助标准为每人每年830元。",
    "url": "https://ylbz.xm.gov.cn/zwgk/zfxxgk/ml/zcwj/qtwj/202610/t20261013_3021006.htm",
    "fetched_at": "2026-10-24T23:08:00+08:00",
    "text_sha256": "d775daef731f1ebaeadd93b95e372134d9a830f84cf833784102fe0edde45651",
    "evidence_layer": "L1"
   }
  },
  {
   "param": "resident_midterm_effective",
   "value": "当年度参保：当月登记且次月缴费到账→当月生效",
   "valid_from": "2022-07-01",
   "valid_to": null,
   "doc_number": "厦府规〔2022〕12号",
   "policy_id": "xm-yb-2022-12",
   "clause_no": "第四十六条",
   "citation": {
    "doc_number": "厦府规〔2022〕12号",
    "clause_no": "第四十六条",
    "clause_ref": "第四十六条@居民医保",
    "regime": "居民医保",
    "quote": "第四十六条\n参加本市居民医保的人员，在集中参保缴费期内按规定缴纳下一年度的基本医疗保险费，医疗保险关系从次年\n1月1日起开始生效。\n在当年度开始后参保缴费的城乡居民，当月办理参保登记并次月缴费到账的，医疗保险关系从参保登记当月开始生效；参保登记次月缴费未到账的，医疗保险关系从实际缴费到账当月开始生效。",
    "url": "https://www.xm.gov.cn/zfgb/99833450",
    "fetched_at": "2026-10-24T23:08:00+08:00",
    "text_sha256": "e76be654ab7df9ef5fda099c2aec9016c6fdbdd18f8527a648afc361cd0bbd8f",
    "evidence_layer": "L1"
   }
  },
  {
   "param": "resident_midterm_rule",
   "value": "超过集中期中途参保按全年标准缴纳",
   "valid_from": "2022-07-01",
   "valid_to": null,
   "doc_number": "厦府规〔2022〕12号",
   "policy_id": "xm-yb-2022-12",
   "clause_no": "第九条",
   "citation": {
    "doc_number": "厦府规〔2022〕12号",
    "clause_no": "第九条",
    "clause_ref": "第九条@居民医保",
    "regime": "居民医保",
    "quote": "第九条\n城乡居民基本医疗保险费实行预缴制，每年\n9月至12月为次年居民医保的集中参保缴费期。城乡居民应当在集中参保缴费期内按规定办理参保登记手续，并按个人缴费标准一次性缴纳下一年度的基本医疗保险费。\n超过集中参保缴费期，符合参保条件的城乡居民可以中途参保，中途参保人员按全年个人缴费标准缴纳基本医疗保险费。",
    "url": "https://www.xm.gov.cn/zfgb/99833450",
    "fetched_at": "2026-10-24T23:08:00+08:00",
    "text_sha256": "e76be654ab7df9ef5fda099c2aec9016c6fdbdd18f8527a648afc361cd0bbd8f",
    "evidence_layer": "L1"
   }
  },
  {
   "param": "resident_payment_mode",
   "value": "预缴制，一次性缴纳下一年度",
   "valid_from": "2022-07-01",
   "valid_to": null,
   "doc_number": "厦府规〔2022〕12号",
   "policy_id": "xm-yb-2022-12",
   "clause_no": "第九条",
   "citation": {
    "doc_number": "厦府规〔2022〕12号",
    "clause_no": "第九条",
    "clause_ref": "第九条@居民医保",
    "regime": "居民医保",
    "quote": "第九条\n城乡居民基本医疗保险费实行预缴制，每年\n9月至12月为次年居民医保的集中参保缴费期。城乡居民应当在集中参保缴费期内按规定办理参保登记手续，并按个人缴费标准一次性缴纳下一年度的基本医疗保险费。\n超过集中参保缴费期，符合参保条件的城乡居民可以中途参保，中途参保人员按全年个人缴费标准缴纳基本医疗保险费。",
    "url": "https://www.xm.gov.cn/zfgb/99833450",
    "fetched_at": "2026-10-24T23:08:00+08:00",
    "text_sha256": "e76be654ab7df9ef5fda099c2aec9016c6fdbdd18f8527a648afc361cd0bbd8f",
    "evidence_layer": "L1"
   }
  },
  {
   "param": "resident_personal_2026",
   "value": 450.0,
   "valid_from": "2026-01-01",
   "valid_to": "2026-12-31",
   "doc_number": "厦医保〔2025〕96号",
   "policy_id": "xm-yb-2025-96",
   "clause_no": "（分段）",
   "citation": {
    "doc_number": "厦医保〔2025〕96号",
    "clause_no": "（分段）",
    "clause_ref": "（分段）@居民医保",
    "regime": "居民医保",
    "quote": "城乡居民基本医疗保险的筹资标准由每人每年1250元调整为每人每年1280元，其中：财政补助标准提高30元，由每人每年800元调整为830元，个人缴费标准维持每人每年450元不变。",
    "url": "https://ylbz.xm.gov.cn/zwgk/tpxw/202510/t20251023_2962144.htm",
    "fetched_at": "2026-10-24T23:08:03+08:00",
    "text_sha256": "2d9ea57751bf9efa0efadcf79d25be28b9faec15b04ab7f51bfb1e8414041c46",
    "evidence_layer": "L1"
   }
  },
  {
   "param": "resident_personal_2027",
   "value": 491.0,
   "valid_from": "2027-01-01",
   "valid_to": null,
   "doc_number": "厦医保〔2026〕90号",
   "policy_id": "xm-yb-2026-90",
   "clause_no": "（分段）",
   "citation": {
    "doc_number": "厦医保〔2026〕90号",
    "clause_no": "（分段）",
    "clause_ref": "（分段）@居民医保",
    "regime": "居民医保",
    "quote": "一、成年居民基本医疗保险和长期护理保险的筹资标准为每人每年1362元，其中：个人缴费标准为每人每年491元（居民医保450元、长护险41元），财政补助标准为每人每年871元（居民医保830元、长护险41元）。\n二、大学生基本医疗保险和长期护理保险的筹资标准为每人每年1362元，其中：个人缴费标准为每人每年470.5元（居民医保450元、长护险20.5元），财政补助标准为每人每年891.5元（居民医保830元、长护险61.5元）。\n三、18周岁以下未成年人及除大学生外的在校学生基本医疗保险筹资标准为每人每年1280元，不单独缴纳长期护理保险费，按规定享受居民长护险待遇。其中：个人缴费标准为每人每年450元，财政补助标准为每人每年830元。",
    "url": "https://ylbz.xm.gov.cn/zwgk/zfxxgk/ml/zcwj/qtwj/202610/t20261013_3021006.htm",
    "fetched_at": "2026-10-24T23:08:00+08:00",
    "text_sha256": "d775daef731f1ebaeadd93b95e372134d9a830f84cf833784102fe0edde45651",
    "evidence_layer": "L1"
   }
  },
  {
   "param": "resident_refund_after",
   "value": "1月1日后（含）缴费的不予退费",
   "valid_from": "2025-09-01",
   "valid_to": null,
   "doc_number": "厦医保〔2025〕86号 政策解读",
   "policy_id": "xm-resident-policy-interpret",
   "clause_no": "（分段）",
   "citation": {
    "doc_number": "厦医保〔2025〕86号 政策解读",
    "clause_no": "（分段）",
    "clause_ref": "（分段）@居民医保",
    "regime": "居民医保",
    "quote": "明确保费退费政策\n根据国家和省文件要求，《通知》明确居民医保年度即居民医保待遇享受期（含待遇等待期）为当年1月1日至12月31日，个人待遇享受开始时间根据国家和省参保长效机制确定。在集中参保缴费期内已缴纳下一年度居民医保费的，在新年度1月1日前可申请退费；1月1日后（含）缴费的不予退费。",
    "url": "https://ylbz.xm.gov.cn/zwgk/zfxxgk/ml/zcwj/zcjd/202508/t20250818_2950855.htm",
    "fetched_at": "2026-10-25T10:24:08+08:00",
    "text_sha256": "b51c3de1f16eb2d8712f288b8e7814956f233bbdd2711d418c06fd0644eee245",
    "evidence_layer": "L4"
   }
  },
  {
   "param": "resident_refund_before",
   "value": "集中参保缴费期内已缴下一年度居民医保费，新年度1月1日前可申请退费",
   "valid_from": "2025-09-01",
   "valid_to": null,
   "doc_number": "厦医保〔2025〕86号 政策解读",
   "policy_id": "xm-resident-policy-interpret",
   "clause_no": "（分段）",
   "citation": {
    "doc_number": "厦医保〔2025〕86号 政策解读",
    "clause_no": "（分段）",
    "clause_ref": "（分段）@居民医保",
    "regime": "居民医保",
    "quote": "明确保费退费政策\n根据国家和省文件要求，《通知》明确居民医保年度即居民医保待遇享受期（含待遇等待期）为当年1月1日至12月31日，个人待遇享受开始时间根据国家和省参保长效机制确定。在集中参保缴费期内已缴纳下一年度居民医保费的，在新年度1月1日前可申请退费；1月1日后（含）缴费的不予退费。",
    "url": "https://ylbz.xm.gov.cn/zwgk/zfxxgk/ml/zcwj/zcjd/202508/t20250818_2950855.htm",
    "fetched_at": "2026-10-25T10:24:08+08:00",
    "text_sha256": "b51c3de1f16eb2d8712f288b8e7814956f233bbdd2711d418c06fd0644eee245",
    "evidence_layer": "L4"
   }
  },
  {
   "param": "resident_scope_1",
   "value": "本市户籍的成年居民",
   "valid_from": "2022-07-01",
   "valid_to": null,
   "doc_number": "厦府规〔2022〕12号",
   "policy_id": "xm-yb-2022-12",
   "clause_no": "第四条",
   "citation": {
    "doc_number": "厦府规〔2022〕12号",
    "clause_no": "第四条",
    "clause_ref": "第四条@居民医保",
    "regime": "居民医保",
    "quote": "第四条\n本市行政区域内，未参加职工医保或未按照规定享有其他医疗保障的下列城乡居民依法参加居民医保：\n（一）本市户籍的成年居民\n（二）未满\n18周岁的未成年人\n1.本市户籍的未成年人；\n2.父亲或母亲持本市有效居住证且参加本市职工医保的非本市户籍未成年人。\n（三）本市经政府有关部门批准设立的各类全日制学校在校在园学生（以下简称\n“在校学生”）\n各类全日制普通高等院校（包括民办高校、独立学院、成人高等院校全日制普通班）、科研院所（以下统称\n“高校”）中接受普通高等学历教育的全日制本专科生、全日制研究生（以下统称“大学生”）；中等职业学校（含中专、技校、职高）、特殊教育学校、中小学（含小学、初中、高中）中实行学籍管理的全日制学生；幼儿园、托儿所等幼托机构的在册儿童。\n在校学生包括侨、港、澳、台籍学生，不包括以上高校中接受成人高等教育（含脱产、业余、函授形式学习）以及进修、网络、广播电视等学校的学生。",
    "url": "https://www.xm.gov.cn/zfgb/99833450",
    "fetched_at": "2026-10-24T23:08:00+08:00",
    "text_sha256": "e76be654ab7df9ef5fda099c2aec9016c6fdbdd18f8527a648afc361cd0bbd8f",
    "evidence_layer": "L1"
   }
  },
  {
   "param": "resident_scope_3",
   "value": "各类全日制学校在校在园学生",
   "valid_from": "2022-07-01",
   "valid_to": null,
   "doc_number": "厦府规〔2022〕12号",
   "policy_id": "xm-yb-2022-12",
   "clause_no": "第四条",
   "citation": {
    "doc_number": "厦府规〔2022〕12号",
    "clause_no": "第四条",
    "clause_ref": "第四条@居民医保",
    "regime": "居民医保",
    "quote": "第四条\n本市行政区域内，未参加职工医保或未按照规定享有其他医疗保障的下列城乡居民依法参加居民医保：\n（一）本市户籍的成年居民\n（二）未满\n18周岁的未成年人\n1.本市户籍的未成年人；\n2.父亲或母亲持本市有效居住证且参加本市职工医保的非本市户籍未成年人。\n（三）本市经政府有关部门批准设立的各类全日制学校在校在园学生（以下简称\n“在校学生”）\n各类全日制普通高等院校（包括民办高校、独立学院、成人高等院校全日制普通班）、科研院所（以下统称\n“高校”）中接受普通高等学历教育的全日制本专科生、全日制研究生（以下统称“大学生”）；中等职业学校（含中专、技校、职高）、特殊教育学校、中小学（含小学、初中、高中）中实行学籍管理的全日制学生；幼儿园、托儿所等幼托机构的在册儿童。\n在校学生包括侨、港、澳、台籍学生，不包括以上高校中接受成人高等教育（含脱产、业余、函授形式学习）以及进修、网络、广播电视等学校的学生。",
    "url": "https://www.xm.gov.cn/zfgb/99833450",
    "fetched_at": "2026-10-24T23:08:00+08:00",
    "text_sha256": "e76be654ab7df9ef5fda099c2aec9016c6fdbdd18f8527a648afc361cd0bbd8f",
    "evidence_layer": "L1"
   }
  },
  {
   "param": "resident_scope_4",
   "value": "持本市有效居住证的港澳台人员及其未成年子女",
   "valid_from": "2022-07-01",
   "valid_to": null,
   "doc_number": "厦府规〔2022〕12号",
   "policy_id": "xm-yb-2022-12",
   "clause_no": "第四条",
   "citation": {
    "doc_number": "厦府规〔2022〕12号",
    "clause_no": "第四条",
    "clause_ref": "第四条@居民医保",
    "regime": "居民医保",
    "quote": "第四条\n本市行政区域内，未参加职工医保或未按照规定享有其他医疗保障的下列城乡居民依法参加居民医保：\n（一）本市户籍的成年居民\n（二）未满\n18周岁的未成年人\n1.本市户籍的未成年人；\n2.父亲或母亲持本市有效居住证且参加本市职工医保的非本市户籍未成年人。\n（三）本市经政府有关部门批准设立的各类全日制学校在校在园学生（以下简称\n“在校学生”）\n各类全日制普通高等院校（包括民办高校、独立学院、成人高等院校全日制普通班）、科研院所（以下统称\n“高校”）中接受普通高等学历教育的全日制本专科生、全日制研究生（以下统称“大学生”）；中等职业学校（含中专、技校、职高）、特殊教育学校、中小学（含小学、初中、高中）中实行学籍管理的全日制学生；幼儿园、托儿所等幼托机构的在册儿童。\n在校学生包括侨、港、澳、台籍学生，不包括以上高校中接受成人高等教育（含脱产、业余、函授形式学习）以及进修、网络、广播电视等学校的学生。",
    "url": "https://www.xm.gov.cn/zfgb/99833450",
    "fetched_at": "2026-10-24T23:08:00+08:00",
    "text_sha256": "e76be654ab7df9ef5fda099c2aec9016c6fdbdd18f8527a648afc361cd0bbd8f",
    "evidence_layer": "L1"
   }
  },
  {
   "param": "resident_streak_bonus_per_year",
   "value": 3000,
   "valid_from": "2025-01-01",
   "valid_to": null,
   "doc_number": "待遇等待期与两大激励 官方答疑",
   "policy_id": "xm-waitperiod",
   "clause_no": "（分段）",
   "citation": {
    "doc_number": "待遇等待期与两大激励 官方答疑",
    "clause_no": "（分段）",
    "clause_ref": "（分段）@居民医保",
    "regime": "居民医保",
    "quote": "连续参保激励和零报销激励\n以我市为例\n↓↓↓\n连续参保激励：\n连续参加居民医保满4年的，之后每连续参保1年，大病保险最高支付限额每年提高3000元",
    "url": "https://ylbz.xm.gov.cn/zwgk/ybdt/202512/t20251201_2969555.htm",
    "fetched_at": "2026-10-25T10:24:07+08:00",
    "text_sha256": "31699e7035a9f6fbf4d1e044ec070f9332ae2e35a8334584392a76724186a0e2",
    "evidence_layer": "L4"
   }
  },
  {
   "param": "resident_streak_years",
   "value": 4,
   "valid_from": "2025-01-01",
   "valid_to": null,
   "doc_number": "待遇等待期与两大激励 官方答疑",
   "policy_id": "xm-waitperiod",
   "clause_no": "（分段）",
   "citation": {
    "doc_number": "待遇等待期与两大激励 官方答疑",
    "clause_no": "（分段）",
    "clause_ref": "（分段）@居民医保",
    "regime": "居民医保",
    "quote": "连续参保激励和零报销激励\n以我市为例\n↓↓↓\n连续参保激励：\n连续参加居民医保满4年的，之后每连续参保1年，大病保险最高支付限额每年提高3000元",
    "url": "https://ylbz.xm.gov.cn/zwgk/ybdt/202512/t20251201_2969555.htm",
    "fetched_at": "2026-10-25T10:24:07+08:00",
    "text_sha256": "31699e7035a9f6fbf4d1e044ec070f9332ae2e35a8334584392a76724186a0e2",
    "evidence_layer": "L4"
   }
  },
  {
   "param": "resident_tier_rates_pct",
   "value": [
    50.0,
    75.0,
    100.0
   ],
   "valid_from": "2022-07-01",
   "valid_to": null,
   "doc_number": "厦府规〔2022〕12号",
   "policy_id": "xm-yb-2022-12",
   "clause_no": "第二十五条",
   "citation": {
    "doc_number": "厦府规〔2022〕12号",
    "clause_no": "第二十五条",
    "clause_ref": "第二十五条@居民医保",
    "regime": "居民医保",
    "quote": "第二十五条\n参保人员享受统筹基金支付待遇的标准，根据其医疗费用发生时连续参加基本医疗保险的时间确定：\n（一）连续参保时间不满\n12个月的，按统筹基金正常待遇的50%支付;\n（二）连续参保时间满\n12个月不满24个月的，按统筹基金正常待遇的75%支付;\n（三）连续参保时间满\n24个月的，按统筹基金正常待遇的100%支付。\n未成年人、在校学生、医疗救助对象统筹基金支付待遇不受连续参保时间限制。",
    "url": "https://www.xm.gov.cn/zfgb/99833450",
    "fetched_at": "2026-10-24T23:08:00+08:00",
    "text_sha256": "e76be654ab7df9ef5fda099c2aec9016c6fdbdd18f8527a648afc361cd0bbd8f",
    "evidence_layer": "L1"
   }
  },
  {
   "param": "resident_tier_thresholds_months",
   "value": [
    12,
    24,
    24
   ],
   "valid_from": "2022-07-01",
   "valid_to": null,
   "doc_number": "厦府规〔2022〕12号",
   "policy_id": "xm-yb-2022-12",
   "clause_no": "第二十五条",
   "citation": {
    "doc_number": "厦府规〔2022〕12号",
    "clause_no": "第二十五条",
    "clause_ref": "第二十五条@居民医保",
    "regime": "居民医保",
    "quote": "第二十五条\n参保人员享受统筹基金支付待遇的标准，根据其医疗费用发生时连续参加基本医疗保险的时间确定：\n（一）连续参保时间不满\n12个月的，按统筹基金正常待遇的50%支付;\n（二）连续参保时间满\n12个月不满24个月的，按统筹基金正常待遇的75%支付;\n（三）连续参保时间满\n24个月的，按统筹基金正常待遇的100%支付。\n未成年人、在校学生、医疗救助对象统筹基金支付待遇不受连续参保时间限制。",
    "url": "https://www.xm.gov.cn/zfgb/99833450",
    "fetched_at": "2026-10-24T23:08:00+08:00",
    "text_sha256": "e76be654ab7df9ef5fda099c2aec9016c6fdbdd18f8527a648afc361cd0bbd8f",
    "evidence_layer": "L1"
   }
  },
  {
   "param": "resident_total_2026",
   "value": 1280.0,
   "valid_from": "2026-01-01",
   "valid_to": "2026-12-31",
   "doc_number": "厦医保〔2025〕96号",
   "policy_id": "xm-yb-2025-96",
   "clause_no": "（分段）",
   "citation": {
    "doc_number": "厦医保〔2025〕96号",
    "clause_no": "（分段）",
    "clause_ref": "（分段）@居民医保",
    "regime": "居民医保",
    "quote": "城乡居民基本医疗保险的筹资标准由每人每年1250元调整为每人每年1280元，其中：财政补助标准提高30元，由每人每年800元调整为830元，个人缴费标准维持每人每年450元不变。",
    "url": "https://ylbz.xm.gov.cn/zwgk/tpxw/202510/t20251023_2962144.htm",
    "fetched_at": "2026-10-24T23:08:03+08:00",
    "text_sha256": "2d9ea57751bf9efa0efadcf79d25be28b9faec15b04ab7f51bfb1e8414041c46",
    "evidence_layer": "L1"
   }
  },
  {
   "param": "resident_total_2026_old",
   "value": 1250.0,
   "valid_from": "2026-01-01",
   "valid_to": "2026-12-31",
   "doc_number": "厦医保〔2025〕96号",
   "policy_id": "xm-yb-2025-96",
   "clause_no": "（分段）",
   "citation": {
    "doc_number": "厦医保〔2025〕96号",
    "clause_no": "（分段）",
    "clause_ref": "（分段）@居民医保",
    "regime": "居民医保",
    "quote": "城乡居民基本医疗保险的筹资标准由每人每年1250元调整为每人每年1280元，其中：财政补助标准提高30元，由每人每年800元调整为830元，个人缴费标准维持每人每年450元不变。",
    "url": "https://ylbz.xm.gov.cn/zwgk/tpxw/202510/t20251023_2962144.htm",
    "fetched_at": "2026-10-24T23:08:03+08:00",
    "text_sha256": "2d9ea57751bf9efa0efadcf79d25be28b9faec15b04ab7f51bfb1e8414041c46",
    "evidence_layer": "L1"
   }
  },
  {
   "param": "resident_total_2027",
   "value": 1362.0,
   "valid_from": "2027-01-01",
   "valid_to": null,
   "doc_number": "厦医保〔2026〕90号",
   "policy_id": "xm-yb-2026-90",
   "clause_no": "（分段）",
   "citation": {
    "doc_number": "厦医保〔2026〕90号",
    "clause_no": "（分段）",
    "clause_ref": "（分段）@居民医保",
    "regime": "居民医保",
    "quote": "一、成年居民基本医疗保险和长期护理保险的筹资标准为每人每年1362元，其中：个人缴费标准为每人每年491元（居民医保450元、长护险41元），财政补助标准为每人每年871元（居民医保830元、长护险41元）。\n二、大学生基本医疗保险和长期护理保险的筹资标准为每人每年1362元，其中：个人缴费标准为每人每年470.5元（居民医保450元、长护险20.5元），财政补助标准为每人每年891.5元（居民医保830元、长护险61.5元）。\n三、18周岁以下未成年人及除大学生外的在校学生基本医疗保险筹资标准为每人每年1280元，不单独缴纳长期护理保险费，按规定享受居民长护险待遇。其中：个人缴费标准为每人每年450元，财政补助标准为每人每年830元。",
    "url": "https://ylbz.xm.gov.cn/zwgk/zfxxgk/ml/zcwj/qtwj/202610/t20261013_3021006.htm",
    "fetched_at": "2026-10-24T23:08:00+08:00",
    "text_sha256": "d775daef731f1ebaeadd93b95e372134d9a830f84cf833784102fe0edde45651",
    "evidence_layer": "L1"
   }
  },
  {
   "param": "resident_wait_fixed_months",
   "value": 3,
   "valid_from": "2025-01-01",
   "valid_to": null,
   "doc_number": "待遇等待期与两大激励 官方答疑",
   "policy_id": "xm-waitperiod",
   "clause_no": "（分段）",
   "citation": {
    "doc_number": "待遇等待期与两大激励 官方答疑",
    "clause_no": "（分段）",
    "clause_ref": "（分段）@居民医保",
    "regime": "居民医保",
    "quote": "固定待遇等待期：\n除新生儿、医疗救助对象、当年退出现役的军人等特殊群体外，未在居民医保集中参保期参保或未连续参保的，参保后设置固定待遇等待期3个月。",
    "url": "https://ylbz.xm.gov.cn/zwgk/ybdt/202512/t20251201_2969555.htm",
    "fetched_at": "2026-10-25T10:24:07+08:00",
    "text_sha256": "31699e7035a9f6fbf4d1e044ec070f9332ae2e35a8334584392a76724186a0e2",
    "evidence_layer": "L4"
   }
  },
  {
   "param": "resident_wait_scope",
   "value": "除新生儿、医疗救助对象、当年退出现役的军人等特殊群体外，未在居民医保集中参保期参保或未连续参保的适用",
   "valid_from": "2025-01-01",
   "valid_to": null,
   "doc_number": "待遇等待期与两大激励 官方答疑",
   "policy_id": "xm-waitperiod",
   "clause_no": "（分段）",
   "citation": {
    "doc_number": "待遇等待期与两大激励 官方答疑",
    "clause_no": "（分段）",
    "clause_ref": "（分段）@居民医保",
    "regime": "居民医保",
    "quote": "固定待遇等待期：\n除新生儿、医疗救助对象、当年退出现役的军人等特殊群体外，未在居民医保集中参保期参保或未连续参保的，参保后设置固定待遇等待期3个月。",
    "url": "https://ylbz.xm.gov.cn/zwgk/ybdt/202512/t20251201_2969555.htm",
    "fetched_at": "2026-10-25T10:24:07+08:00",
    "text_sha256": "31699e7035a9f6fbf4d1e044ec070f9332ae2e35a8334584392a76724186a0e2",
    "evidence_layer": "L4"
   }
  },
  {
   "param": "resident_wait_variable_per_year",
   "value": 1,
   "valid_from": "2025-01-01",
   "valid_to": null,
   "doc_number": "待遇等待期与两大激励 官方答疑",
   "policy_id": "xm-waitperiod",
   "clause_no": "（分段）",
   "citation": {
    "doc_number": "待遇等待期与两大激励 官方答疑",
    "clause_no": "（分段）",
    "clause_ref": "（分段）@居民医保",
    "regime": "居民医保",
    "quote": "变动待遇等待期：\n每多断保一年，在固定待遇等待期基础上增加变动待遇等待期1个月。",
    "url": "https://ylbz.xm.gov.cn/zwgk/ybdt/202512/t20251201_2969555.htm",
    "fetched_at": "2026-10-25T10:24:07+08:00",
    "text_sha256": "31699e7035a9f6fbf4d1e044ec070f9332ae2e35a8334584392a76724186a0e2",
    "evidence_layer": "L4"
   }
  },
  {
   "param": "retire_local_min_years",
   "value": 10,
   "valid_from": "2026-05-29",
   "valid_to": null,
   "doc_number": "医保连续缴费与转移接续 官方提示",
   "policy_id": "xm-medical-continuity",
   "clause_no": "（分段）",
   "citation": {
    "doc_number": "医保连续缴费与转移接续 官方提示",
    "clause_no": "（分段）",
    "clause_ref": "（分段）@职工医保",
    "regime": "职工医保",
    "quote": "具备申报本市职工医保退休待遇资格的人员，达到法定退休年龄时，需同时满足两个条件：\n厦门本市职工医保实际缴费年限满10年；\n职工医保累计缴费年限（含实际缴费和视同缴费）男满25年、女满20年。",
    "url": "https://ylbz.xm.gov.cn/zwgk/tpxw/202605/t20260529_2998199.htm",
    "fetched_at": "2026-10-25T10:24:09+08:00",
    "text_sha256": "a542d7f9ee8c9a52777c6c64224a004c5bed55b6476cbee16507048a7b9675a5",
    "evidence_layer": "L4"
   }
  },
  {
   "param": "retire_min_years",
   "value": 10,
   "valid_from": "2022-07-01",
   "valid_to": null,
   "doc_number": "厦府规〔2022〕12号",
   "policy_id": "xm-yb-2022-12",
   "clause_no": "第三十四条",
   "citation": {
    "doc_number": "厦府规〔2022〕12号",
    "clause_no": "第三十四条",
    "clause_ref": "第三十四条@职工医保",
    "regime": "职工医保",
    "quote": "第三十四条\n具备申报本市职工医保退休待遇资格的人员包括：\n（一）本市户籍人员\n;\n（二）在达到法定退休年龄时已实际缴纳本市职工基本医疗保险费满\n10年的非本市户籍人员（含港澳台人员、外国人）;\n（三）在达到法定退休年龄时，按国家、省规定参加福建省基本养老保险行业统筹或福建省本级机关事业单位养老保险，按照属地原则参加本市职工医保的省、部属驻厦用人单位参保人员；\n（四）本市机关、事业单位编制人员及备案员额人员；\n（五）本市认定的高层次人才及其配偶。",
    "url": "https://www.xm.gov.cn/zfgb/99833450",
    "fetched_at": "2026-10-24T23:08:00+08:00",
    "text_sha256": "e76be654ab7df9ef5fda099c2aec9016c6fdbdd18f8527a648afc361cd0bbd8f",
    "evidence_layer": "L1"
   }
  },
  {
   "param": "retire_scope_1",
   "value": "本市户籍人员",
   "valid_from": "2022-07-01",
   "valid_to": null,
   "doc_number": "厦府规〔2022〕12号",
   "policy_id": "xm-yb-2022-12",
   "clause_no": "第三十四条",
   "citation": {
    "doc_number": "厦府规〔2022〕12号",
    "clause_no": "第三十四条",
    "clause_ref": "第三十四条@职工医保",
    "regime": "职工医保",
    "quote": "第三十四条\n具备申报本市职工医保退休待遇资格的人员包括：\n（一）本市户籍人员\n;\n（二）在达到法定退休年龄时已实际缴纳本市职工基本医疗保险费满\n10年的非本市户籍人员（含港澳台人员、外国人）;\n（三）在达到法定退休年龄时，按国家、省规定参加福建省基本养老保险行业统筹或福建省本级机关事业单位养老保险，按照属地原则参加本市职工医保的省、部属驻厦用人单位参保人员；\n（四）本市机关、事业单位编制人员及备案员额人员；\n（五）本市认定的高层次人才及其配偶。",
    "url": "https://www.xm.gov.cn/zfgb/99833450",
    "fetched_at": "2026-10-24T23:08:00+08:00",
    "text_sha256": "e76be654ab7df9ef5fda099c2aec9016c6fdbdd18f8527a648afc361cd0bbd8f",
    "evidence_layer": "L1"
   }
  },
  {
   "param": "retire_scope_3",
   "value": "省部属驻厦用人单位参保人员",
   "valid_from": "2022-07-01",
   "valid_to": null,
   "doc_number": "厦府规〔2022〕12号",
   "policy_id": "xm-yb-2022-12",
   "clause_no": "第三十四条",
   "citation": {
    "doc_number": "厦府规〔2022〕12号",
    "clause_no": "第三十四条",
    "clause_ref": "第三十四条@职工医保",
    "regime": "职工医保",
    "quote": "第三十四条\n具备申报本市职工医保退休待遇资格的人员包括：\n（一）本市户籍人员\n;\n（二）在达到法定退休年龄时已实际缴纳本市职工基本医疗保险费满\n10年的非本市户籍人员（含港澳台人员、外国人）;\n（三）在达到法定退休年龄时，按国家、省规定参加福建省基本养老保险行业统筹或福建省本级机关事业单位养老保险，按照属地原则参加本市职工医保的省、部属驻厦用人单位参保人员；\n（四）本市机关、事业单位编制人员及备案员额人员；\n（五）本市认定的高层次人才及其配偶。",
    "url": "https://www.xm.gov.cn/zfgb/99833450",
    "fetched_at": "2026-10-24T23:08:00+08:00",
    "text_sha256": "e76be654ab7df9ef5fda099c2aec9016c6fdbdd18f8527a648afc361cd0bbd8f",
    "evidence_layer": "L1"
   }
  },
  {
   "param": "retire_scope_5",
   "value": "本市认定的高层次人才及其配偶",
   "valid_from": "2022-07-01",
   "valid_to": null,
   "doc_number": "厦府规〔2022〕12号",
   "policy_id": "xm-yb-2022-12",
   "clause_no": "第三十四条",
   "citation": {
    "doc_number": "厦府规〔2022〕12号",
    "clause_no": "第三十四条",
    "clause_ref": "第三十四条@职工医保",
    "regime": "职工医保",
    "quote": "第三十四条\n具备申报本市职工医保退休待遇资格的人员包括：\n（一）本市户籍人员\n;\n（二）在达到法定退休年龄时已实际缴纳本市职工基本医疗保险费满\n10年的非本市户籍人员（含港澳台人员、外国人）;\n（三）在达到法定退休年龄时，按国家、省规定参加福建省基本养老保险行业统筹或福建省本级机关事业单位养老保险，按照属地原则参加本市职工医保的省、部属驻厦用人单位参保人员；\n（四）本市机关、事业单位编制人员及备案员额人员；\n（五）本市认定的高层次人才及其配偶。",
    "url": "https://www.xm.gov.cn/zfgb/99833450",
    "fetched_at": "2026-10-24T23:08:00+08:00",
    "text_sha256": "e76be654ab7df9ef5fda099c2aec9016c6fdbdd18f8527a648afc361cd0bbd8f",
    "evidence_layer": "L1"
   }
  },
  {
   "param": "retire_years_female",
   "value": 20,
   "valid_from": "2026-05-29",
   "valid_to": null,
   "doc_number": "医保连续缴费与转移接续 官方提示",
   "policy_id": "xm-medical-continuity",
   "clause_no": "（分段）",
   "citation": {
    "doc_number": "医保连续缴费与转移接续 官方提示",
    "clause_no": "（分段）",
    "clause_ref": "（分段）@职工医保",
    "regime": "职工医保",
    "quote": "具备申报本市职工医保退休待遇资格的人员，达到法定退休年龄时，需同时满足两个条件：\n厦门本市职工医保实际缴费年限满10年；\n职工医保累计缴费年限（含实际缴费和视同缴费）男满25年、女满20年。",
    "url": "https://ylbz.xm.gov.cn/zwgk/tpxw/202605/t20260529_2998199.htm",
    "fetched_at": "2026-10-25T10:24:09+08:00",
    "text_sha256": "a542d7f9ee8c9a52777c6c64224a004c5bed55b6476cbee16507048a7b9675a5",
    "evidence_layer": "L4"
   }
  },
  {
   "param": "retire_years_male",
   "value": 25,
   "valid_from": "2026-05-29",
   "valid_to": null,
   "doc_number": "医保连续缴费与转移接续 官方提示",
   "policy_id": "xm-medical-continuity",
   "clause_no": "（分段）",
   "citation": {
    "doc_number": "医保连续缴费与转移接续 官方提示",
    "clause_no": "（分段）",
    "clause_ref": "（分段）@职工医保",
    "regime": "职工医保",
    "quote": "具备申报本市职工医保退休待遇资格的人员，达到法定退休年龄时，需同时满足两个条件：\n厦门本市职工医保实际缴费年限满10年；\n职工医保累计缴费年限（含实际缴费和视同缴费）男满25年、女满20年。",
    "url": "https://ylbz.xm.gov.cn/zwgk/tpxw/202605/t20260529_2998199.htm",
    "fetched_at": "2026-10-25T10:24:09+08:00",
    "text_sha256": "a542d7f9ee8c9a52777c6c64224a004c5bed55b6476cbee16507048a7b9675a5",
    "evidence_layer": "L4"
   }
  },
  {
   "param": "staff_scope_groups",
   "value": "无雇工的个体工商户 / 未在用人单位参加职工医保的非全日制从业人员 / 新就业形态劳动者 / 其他灵活就业人员",
   "valid_from": "2022-07-01",
   "valid_to": null,
   "doc_number": "厦府规〔2022〕12号",
   "policy_id": "xm-yb-2022-12",
   "clause_no": "第四条",
   "citation": {
    "doc_number": "厦府规〔2022〕12号",
    "clause_no": "第四条",
    "clause_ref": "第四条@职工医保",
    "regime": "职工医保",
    "quote": "第四条\n本市行政区域内的国家机关、企业、事业单位、社会组织、有雇工的个体工商户等用人单位（以下统称\n“用人单位”）及其职工应当参加职工医保。\n法定劳动年龄内的本市户籍人员、本市有效居住证持有人（含港澳台人员），属于无雇工的个体工商户、未在用人单位参加职工医保的非全日制从业人员、新就业形态劳动者以及其他灵活就业人员的（以下统称\n“灵活就业人员”），可以个人身份参加职工医保。",
    "url": "https://www.xm.gov.cn/zfgb/99833450",
    "fetched_at": "2026-10-24T23:08:00+08:00",
    "text_sha256": "e76be654ab7df9ef5fda099c2aec9016c6fdbdd18f8527a648afc361cd0bbd8f",
    "evidence_layer": "L1"
   }
  },
  {
   "param": "staff_scope_hukou",
   "value": "法定劳动年龄内的本市户籍人员",
   "valid_from": "2022-07-01",
   "valid_to": null,
   "doc_number": "厦府规〔2022〕12号",
   "policy_id": "xm-yb-2022-12",
   "clause_no": "第四条",
   "citation": {
    "doc_number": "厦府规〔2022〕12号",
    "clause_no": "第四条",
    "clause_ref": "第四条@职工医保",
    "regime": "职工医保",
    "quote": "第四条\n本市行政区域内的国家机关、企业、事业单位、社会组织、有雇工的个体工商户等用人单位（以下统称\n“用人单位”）及其职工应当参加职工医保。\n法定劳动年龄内的本市户籍人员、本市有效居住证持有人（含港澳台人员），属于无雇工的个体工商户、未在用人单位参加职工医保的非全日制从业人员、新就业形态劳动者以及其他灵活就业人员的（以下统称\n“灵活就业人员”），可以个人身份参加职工医保。",
    "url": "https://www.xm.gov.cn/zfgb/99833450",
    "fetched_at": "2026-10-24T23:08:00+08:00",
    "text_sha256": "e76be654ab7df9ef5fda099c2aec9016c6fdbdd18f8527a648afc361cd0bbd8f",
    "evidence_layer": "L1"
   }
  },
  {
   "param": "staff_scope_hukou_limit",
   "value": "本市户籍 或 本市有效居住证（含港澳台），二者满足其一",
   "valid_from": "2022-07-01",
   "valid_to": null,
   "doc_number": "厦府规〔2022〕12号",
   "policy_id": "xm-yb-2022-12",
   "clause_no": "第四条",
   "citation": {
    "doc_number": "厦府规〔2022〕12号",
    "clause_no": "第四条",
    "clause_ref": "第四条@职工医保",
    "regime": "职工医保",
    "quote": "第四条\n本市行政区域内的国家机关、企业、事业单位、社会组织、有雇工的个体工商户等用人单位（以下统称\n“用人单位”）及其职工应当参加职工医保。\n法定劳动年龄内的本市户籍人员、本市有效居住证持有人（含港澳台人员），属于无雇工的个体工商户、未在用人单位参加职工医保的非全日制从业人员、新就业形态劳动者以及其他灵活就业人员的（以下统称\n“灵活就业人员”），可以个人身份参加职工医保。",
    "url": "https://www.xm.gov.cn/zfgb/99833450",
    "fetched_at": "2026-10-24T23:08:00+08:00",
    "text_sha256": "e76be654ab7df9ef5fda099c2aec9016c6fdbdd18f8527a648afc361cd0bbd8f",
    "evidence_layer": "L1"
   }
  },
  {
   "param": "staff_scope_permit",
   "value": "本市有效居住证持有人（含港澳台人员）",
   "valid_from": "2022-07-01",
   "valid_to": null,
   "doc_number": "厦府规〔2022〕12号",
   "policy_id": "xm-yb-2022-12",
   "clause_no": "第四条",
   "citation": {
    "doc_number": "厦府规〔2022〕12号",
    "clause_no": "第四条",
    "clause_ref": "第四条@职工医保",
    "regime": "职工医保",
    "quote": "第四条\n本市行政区域内的国家机关、企业、事业单位、社会组织、有雇工的个体工商户等用人单位（以下统称\n“用人单位”）及其职工应当参加职工医保。\n法定劳动年龄内的本市户籍人员、本市有效居住证持有人（含港澳台人员），属于无雇工的个体工商户、未在用人单位参加职工医保的非全日制从业人员、新就业形态劳动者以及其他灵活就业人员的（以下统称\n“灵活就业人员”），可以个人身份参加职工医保。",
    "url": "https://www.xm.gov.cn/zfgb/99833450",
    "fetched_at": "2026-10-24T23:08:00+08:00",
    "text_sha256": "e76be654ab7df9ef5fda099c2aec9016c6fdbdd18f8527a648afc361cd0bbd8f",
    "evidence_layer": "L1"
   }
  },
  {
   "param": "staff_scope_way",
   "value": "可以个人身份参加职工医保",
   "valid_from": "2022-07-01",
   "valid_to": null,
   "doc_number": "厦府规〔2022〕12号",
   "policy_id": "xm-yb-2022-12",
   "clause_no": "第四条",
   "citation": {
    "doc_number": "厦府规〔2022〕12号",
    "clause_no": "第四条",
    "clause_ref": "第四条@职工医保",
    "regime": "职工医保",
    "quote": "第四条\n本市行政区域内的国家机关、企业、事业单位、社会组织、有雇工的个体工商户等用人单位（以下统称\n“用人单位”）及其职工应当参加职工医保。\n法定劳动年龄内的本市户籍人员、本市有效居住证持有人（含港澳台人员），属于无雇工的个体工商户、未在用人单位参加职工医保的非全日制从业人员、新就业形态劳动者以及其他灵活就业人员的（以下统称\n“灵活就业人员”），可以个人身份参加职工医保。",
    "url": "https://www.xm.gov.cn/zfgb/99833450",
    "fetched_at": "2026-10-24T23:08:00+08:00",
    "text_sha256": "e76be654ab7df9ef5fda099c2aec9016c6fdbdd18f8527a648afc361cd0bbd8f",
    "evidence_layer": "L1"
   }
  },
  {
   "param": "switch_account",
   "value": "职工个人账户实际结余资金可继续结转使用",
   "valid_from": "2022-07-01",
   "valid_to": null,
   "doc_number": "厦府规〔2022〕12号",
   "policy_id": "xm-yb-2022-12",
   "clause_no": "第四十九条",
   "citation": {
    "doc_number": "厦府规〔2022〕12号",
    "clause_no": "第四十九条",
    "clause_ref": "第四十九条@居民医保",
    "regime": "居民医保",
    "quote": "第四十九条\n职工医保转换为居民医保的参保人员，其年度内发生的医疗费用累加计算，按转换后的参保险种享受基本医疗保险待遇，职工个人账户实际结余资金可继续结转使用。\n在参保身份转换期间未中断缴费，或中断缴费\n3个月（含）以内续保并补缴中断期间基本医疗保险费且次月缴费到账的，视为连续；其参保身份转换前后的正常缴费时间合并计算，转换中断月份计入连续参保时间，中断期间的待遇可按规定追溯享受。",
    "url": "https://www.xm.gov.cn/zfgb/99833450",
    "fetched_at": "2026-10-24T23:08:00+08:00",
    "text_sha256": "e76be654ab7df9ef5fda099c2aec9016c6fdbdd18f8527a648afc361cd0bbd8f",
    "evidence_layer": "L1"
   }
  },
  {
   "param": "switch_rule",
   "value": "职工医保转居民医保：年度内医疗费用累加计算，按转换后参保险种享受待遇",
   "valid_from": "2022-07-01",
   "valid_to": null,
   "doc_number": "厦府规〔2022〕12号",
   "policy_id": "xm-yb-2022-12",
   "clause_no": "第四十九条",
   "citation": {
    "doc_number": "厦府规〔2022〕12号",
    "clause_no": "第四十九条",
    "clause_ref": "第四十九条@居民医保",
    "regime": "居民医保",
    "quote": "第四十九条\n职工医保转换为居民医保的参保人员，其年度内发生的医疗费用累加计算，按转换后的参保险种享受基本医疗保险待遇，职工个人账户实际结余资金可继续结转使用。\n在参保身份转换期间未中断缴费，或中断缴费\n3个月（含）以内续保并补缴中断期间基本医疗保险费且次月缴费到账的，视为连续；其参保身份转换前后的正常缴费时间合并计算，转换中断月份计入连续参保时间，中断期间的待遇可按规定追溯享受。",
    "url": "https://www.xm.gov.cn/zfgb/99833450",
    "fetched_at": "2026-10-24T23:08:00+08:00",
    "text_sha256": "e76be654ab7df9ef5fda099c2aec9016c6fdbdd18f8527a648afc361cd0bbd8f",
    "evidence_layer": "L1"
   }
  },
  {
   "param": "temporary_account_female",
   "value": 40,
   "valid_from": null,
   "valid_to": null,
   "doc_number": "居住证人员参加企业职工基本养老保险 解读",
   "policy_id": "xm-residence-pension-interpret",
   "clause_no": "（分段）",
   "citation": {
    "doc_number": "居住证人员参加企业职工基本养老保险 解读",
    "clause_no": "（分段）",
    "clause_ref": "（分段）@职工医保",
    "regime": "职工医保",
    "quote": "对参保时男性年满50周岁和女性年满40周岁的居住证持有人，建立临时基本养老保险缴费账户。",
    "url": "https://hrss.xm.gov.cn/gzcy/zxft/jdcxmjzzkcb",
    "fetched_at": "2026-10-25T10:24:11+08:00",
    "text_sha256": "84023b2d5af7aa69518df8f4b71fbe3fcf99189cd524916b9381f7c136aae153",
    "evidence_layer": "L4"
   }
  },
  {
   "param": "temporary_account_male",
   "value": 50,
   "valid_from": null,
   "valid_to": null,
   "doc_number": "居住证人员参加企业职工基本养老保险 解读",
   "policy_id": "xm-residence-pension-interpret",
   "clause_no": "（分段）",
   "citation": {
    "doc_number": "居住证人员参加企业职工基本养老保险 解读",
    "clause_no": "（分段）",
    "clause_ref": "（分段）@职工医保",
    "regime": "职工医保",
    "quote": "对参保时男性年满50周岁和女性年满40周岁的居住证持有人，建立临时基本养老保险缴费账户。",
    "url": "https://hrss.xm.gov.cn/gzcy/zxft/jdcxmjzzkcb",
    "fetched_at": "2026-10-25T10:24:11+08:00",
    "text_sha256": "84023b2d5af7aa69518df8f4b71fbe3fcf99189cd524916b9381f7c136aae153",
    "evidence_layer": "L4"
   }
  },
  {
   "param": "tier_rates_pct",
   "value": [
    50.0,
    75.0,
    100.0
   ],
   "valid_from": "2022-07-01",
   "valid_to": null,
   "doc_number": "厦府规〔2022〕12号",
   "policy_id": "xm-yb-2022-12",
   "clause_no": "第四十七条",
   "citation": {
    "doc_number": "厦府规〔2022〕12号",
    "clause_no": "第四十七条",
    "clause_ref": "第四十七条@职工医保",
    "regime": "职工医保",
    "quote": "第四十七条\n参保人员享受大病保险待遇的标准，根据其医疗费用发生时连续参加基本医疗保险的时间确定：\n（一）连续参保时间不满\n12个月的，按正常待遇的50%支付;\n（二）连续参保时间满\n12个月不满24个月的，按正常待遇的75%支付;\n（三）连续参保时间满\n24个月的，按正常待遇的100%支付。\n退休人员、医疗救助对象大病保险待遇不受连续参保时间限制。",
    "url": "https://www.xm.gov.cn/zfgb/99833450",
    "fetched_at": "2026-10-24T23:08:00+08:00",
    "text_sha256": "e76be654ab7df9ef5fda099c2aec9016c6fdbdd18f8527a648afc361cd0bbd8f",
    "evidence_layer": "L1"
   }
  },
  {
   "param": "tier_thresholds_months",
   "value": [
    12,
    24,
    24
   ],
   "valid_from": "2022-07-01",
   "valid_to": null,
   "doc_number": "厦府规〔2022〕12号",
   "policy_id": "xm-yb-2022-12",
   "clause_no": "第四十七条",
   "citation": {
    "doc_number": "厦府规〔2022〕12号",
    "clause_no": "第四十七条",
    "clause_ref": "第四十七条@职工医保",
    "regime": "职工医保",
    "quote": "第四十七条\n参保人员享受大病保险待遇的标准，根据其医疗费用发生时连续参加基本医疗保险的时间确定：\n（一）连续参保时间不满\n12个月的，按正常待遇的50%支付;\n（二）连续参保时间满\n12个月不满24个月的，按正常待遇的75%支付;\n（三）连续参保时间满\n24个月的，按正常待遇的100%支付。\n退休人员、医疗救助对象大病保险待遇不受连续参保时间限制。",
    "url": "https://www.xm.gov.cn/zfgb/99833450",
    "fetched_at": "2026-10-24T23:08:00+08:00",
    "text_sha256": "e76be654ab7df9ef5fda099c2aec9016c6fdbdd18f8527a648afc361cd0bbd8f",
    "evidence_layer": "L1"
   }
  },
  {
   "param": "transfer_account",
   "value": "异地个人账户资金可转入本市并合并计算",
   "valid_from": "2022-07-01",
   "valid_to": null,
   "doc_number": "厦府规〔2022〕12号",
   "policy_id": "xm-yb-2022-12",
   "clause_no": "第三十二条",
   "citation": {
    "doc_number": "厦府规〔2022〕12号",
    "clause_no": "第三十二条",
    "clause_ref": "第三十二条@职工医保",
    "regime": "职工医保",
    "quote": "第三十二条\n参保人员跨统筹地区流动，按规定办理基本医疗保险关系转移接续；生育保险关系随职工基本医疗保险关系一并转移接续。已享受职工医保退休待遇的，不再转移基本医疗保险关系。\n办理转移接续手续后，其在异地的个人账户资金可转入本市，与本市个人账户资金合并计算；职工医保缴费年限累计计算，但重复缴费的年限不得累加计算。\n参加居民医保以及非按职工医保标准缴费的年限，不作为职工医保缴费年限。",
    "url": "https://www.xm.gov.cn/zfgb/99833450",
    "fetched_at": "2026-10-24T23:08:00+08:00",
    "text_sha256": "e76be654ab7df9ef5fda099c2aec9016c6fdbdd18f8527a648afc361cd0bbd8f",
    "evidence_layer": "L1"
   }
  },
  {
   "param": "transfer_maternity",
   "value": "生育保险关系随职工医保关系一并转移接续",
   "valid_from": "2022-07-01",
   "valid_to": null,
   "doc_number": "厦府规〔2022〕12号",
   "policy_id": "xm-yb-2022-12",
   "clause_no": "第三十二条",
   "citation": {
    "doc_number": "厦府规〔2022〕12号",
    "clause_no": "第三十二条",
    "clause_ref": "第三十二条@职工医保",
    "regime": "职工医保",
    "quote": "第三十二条\n参保人员跨统筹地区流动，按规定办理基本医疗保险关系转移接续；生育保险关系随职工基本医疗保险关系一并转移接续。已享受职工医保退休待遇的，不再转移基本医疗保险关系。\n办理转移接续手续后，其在异地的个人账户资金可转入本市，与本市个人账户资金合并计算；职工医保缴费年限累计计算，但重复缴费的年限不得累加计算。\n参加居民医保以及非按职工医保标准缴费的年限，不作为职工医保缴费年限。",
    "url": "https://www.xm.gov.cn/zfgb/99833450",
    "fetched_at": "2026-10-24T23:08:00+08:00",
    "text_sha256": "e76be654ab7df9ef5fda099c2aec9016c6fdbdd18f8527a648afc361cd0bbd8f",
    "evidence_layer": "L1"
   }
  },
  {
   "param": "transfer_merge_condition",
   "value": "转移接续前未中断缴费；或中断不超过3个月并续保、及时完成中断期间补缴到账",
   "valid_from": "2026-05-29",
   "valid_to": null,
   "doc_number": "医保连续缴费与转移接续 官方提示",
   "policy_id": "xm-medical-continuity",
   "clause_no": "（分段）",
   "citation": {
    "doc_number": "医保连续缴费与转移接续 官方提示",
    "clause_no": "（分段）",
    "clause_ref": "（分段）@职工医保",
    "regime": "职工医保",
    "quote": "从其他统筹区转入厦门并按规定办理医保关系转移接续，在转移接续前未中断缴费，或中断缴费不超过3个月续保并及时完成中断期间补缴到账的，之前在外地的医保参保缴费时长可与本地合并计算，中断月份计入连续参保时间，中断期间的待遇可按规定追溯享受。",
    "url": "https://ylbz.xm.gov.cn/zwgk/tpxw/202605/t20260529_2998199.htm",
    "fetched_at": "2026-10-25T10:24:09+08:00",
    "text_sha256": "a542d7f9ee8c9a52777c6c64224a004c5bed55b6476cbee16507048a7b9675a5",
    "evidence_layer": "L4"
   }
  },
  {
   "param": "transfer_merge_result",
   "value": "外地医保参保缴费时长可与本地合并计算，中断月份计入连续参保时间，中断期间待遇可追溯享受",
   "valid_from": "2026-05-29",
   "valid_to": null,
   "doc_number": "医保连续缴费与转移接续 官方提示",
   "policy_id": "xm-medical-continuity",
   "clause_no": "（分段）",
   "citation": {
    "doc_number": "医保连续缴费与转移接续 官方提示",
    "clause_no": "（分段）",
    "clause_ref": "（分段）@职工医保",
    "regime": "职工医保",
    "quote": "从其他统筹区转入厦门并按规定办理医保关系转移接续，在转移接续前未中断缴费，或中断缴费不超过3个月续保并及时完成中断期间补缴到账的，之前在外地的医保参保缴费时长可与本地合并计算，中断月份计入连续参保时间，中断期间的待遇可按规定追溯享受。",
    "url": "https://ylbz.xm.gov.cn/zwgk/tpxw/202605/t20260529_2998199.htm",
    "fetched_at": "2026-10-25T10:24:09+08:00",
    "text_sha256": "a542d7f9ee8c9a52777c6c64224a004c5bed55b6476cbee16507048a7b9675a5",
    "evidence_layer": "L4"
   }
  },
  {
   "param": "transfer_no_double",
   "value": "职工医保缴费年限累计计算，重复缴费年限不得累加",
   "valid_from": "2022-07-01",
   "valid_to": null,
   "doc_number": "厦府规〔2022〕12号",
   "policy_id": "xm-yb-2022-12",
   "clause_no": "第三十二条",
   "citation": {
    "doc_number": "厦府规〔2022〕12号",
    "clause_no": "第三十二条",
    "clause_ref": "第三十二条@职工医保",
    "regime": "职工医保",
    "quote": "第三十二条\n参保人员跨统筹地区流动，按规定办理基本医疗保险关系转移接续；生育保险关系随职工基本医疗保险关系一并转移接续。已享受职工医保退休待遇的，不再转移基本医疗保险关系。\n办理转移接续手续后，其在异地的个人账户资金可转入本市，与本市个人账户资金合并计算；职工医保缴费年限累计计算，但重复缴费的年限不得累加计算。\n参加居民医保以及非按职工医保标准缴费的年限，不作为职工医保缴费年限。",
    "url": "https://www.xm.gov.cn/zfgb/99833450",
    "fetched_at": "2026-10-24T23:08:00+08:00",
    "text_sha256": "e76be654ab7df9ef5fda099c2aec9016c6fdbdd18f8527a648afc361cd0bbd8f",
    "evidence_layer": "L1"
   }
  },
  {
   "param": "transfer_not_counted",
   "value": "参加居民医保及非按职工医保标准缴费的年限，不作为职工医保缴费年限",
   "valid_from": "2022-07-01",
   "valid_to": null,
   "doc_number": "厦府规〔2022〕12号",
   "policy_id": "xm-yb-2022-12",
   "clause_no": "第三十二条",
   "citation": {
    "doc_number": "厦府规〔2022〕12号",
    "clause_no": "第三十二条",
    "clause_ref": "第三十二条@职工医保",
    "regime": "职工医保",
    "quote": "第三十二条\n参保人员跨统筹地区流动，按规定办理基本医疗保险关系转移接续；生育保险关系随职工基本医疗保险关系一并转移接续。已享受职工医保退休待遇的，不再转移基本医疗保险关系。\n办理转移接续手续后，其在异地的个人账户资金可转入本市，与本市个人账户资金合并计算；职工医保缴费年限累计计算，但重复缴费的年限不得累加计算。\n参加居民医保以及非按职工医保标准缴费的年限，不作为职工医保缴费年限。",
    "url": "https://www.xm.gov.cn/zfgb/99833450",
    "fetched_at": "2026-10-24T23:08:00+08:00",
    "text_sha256": "e76be654ab7df9ef5fda099c2aec9016c6fdbdd18f8527a648afc361cd0bbd8f",
    "evidence_layer": "L1"
   }
  },
  {
   "param": "unit_rate",
   "value": 7.5,
   "valid_from": "2022-07-01",
   "valid_to": null,
   "doc_number": "厦府规〔2022〕12号",
   "policy_id": "xm-yb-2022-12",
   "clause_no": "第六条",
   "citation": {
    "doc_number": "厦府规〔2022〕12号",
    "clause_no": "第六条",
    "clause_ref": "第六条@职工医保",
    "regime": "职工医保",
    "quote": "第六条\n职工基本医疗保险费由用人单位和职工分别按其缴费基数的\n7.5%和2%按月共同缴纳。",
    "url": "https://www.xm.gov.cn/zfgb/99833450",
    "fetched_at": "2026-10-24T23:08:00+08:00",
    "text_sha256": "e76be654ab7df9ef5fda099c2aec9016c6fdbdd18f8527a648afc361cd0bbd8f",
    "evidence_layer": "L1"
   }
  },
  {
   "param": "unit_rate",
   "value": 6.5,
   "valid_from": "2025-01-01",
   "valid_to": "2025-12-31",
   "doc_number": "厦医保 2025年度职工基本医疗保险缴费率",
   "policy_id": "xm-yb-2025-rate",
   "clause_no": "（分段）",
   "citation": {
    "doc_number": "厦医保 2025年度职工基本医疗保险缴费率",
    "clause_no": "（分段）",
    "clause_ref": "（分段）@职工医保",
    "regime": "职工医保",
    "quote": "2025年度职工基本医疗保险费由用人单位和职工分别按其缴费基数的6.5%和2%按月共同缴纳。灵活就业人员基本医疗保险费的缴费率为8.5%，由个人缴纳。",
    "url": "https://ylbz.xm.gov.cn/zwgk/zfxxgk/zc/ybzcfg/202501/t20250127_2915362.htm",
    "fetched_at": "2026-10-24T23:08:00+08:00",
    "text_sha256": "bf913c52f6ce99ea6b08c2643f1f193e7c2421168b2a23e456a4d0356492e1c4",
    "evidence_layer": "L1"
   }
  },
  {
   "param": "unit_rate",
   "value": 7.5,
   "valid_from": "2026-01-01",
   "valid_to": "2026-12-31",
   "doc_number": "厦医保公告 2026年度职工基本医疗保险缴费率",
   "policy_id": "xm-yb-2026-rate",
   "clause_no": "（分段）",
   "citation": {
    "doc_number": "厦医保公告 2026年度职工基本医疗保险缴费率",
    "clause_no": "（分段）",
    "clause_ref": "（分段）@职工医保",
    "regime": "职工医保",
    "quote": "根据《厦门市职工医疗保险实施细则》（厦府规〔2022〕12号）规定，2026年职工基本医疗保险费由用人单位和职工分别按其缴费基数的7.5%和2%按月共同缴纳；灵活就业人员基本医疗保险费的缴费率为9.5%，由个人缴纳。",
    "url": "https://ylbz.xm.gov.cn/zwgk/tzgg/202512/t20251231_2975001.htm",
    "fetched_at": "2026-10-24T23:08:00+08:00",
    "text_sha256": "ee874db42bec1411037de51bb9a4a4e3d18e67a35cb1bfc941b2ae47f7a0e282",
    "evidence_layer": "L1"
   }
  },
  {
   "param": "years_per_month",
   "value": 1,
   "valid_from": "2025-01-01",
   "valid_to": "2027-12-31",
   "doc_number": "厦府规〔2025〕7号",
   "policy_id": "xm-yb-2025-7",
   "clause_no": "（分段）",
   "citation": {
    "doc_number": "厦府规〔2025〕7号",
    "clause_no": "（分段）",
    "clause_ref": "（分段）@职工医保",
    "regime": "职工医保",
    "quote": "二、关于失业保险待遇政策\n（一）暂停执行“市条例”第十七条第一款、第十八条，原本市城镇户口失业人员的失业保险待遇按“省条例”和“省统筹方案”规定的城镇职工失业保险金标准执行，即失业保险金月发放标准为本市月最低工资标准的90%；领取失业保险金的期限，根据其失业前累计缴费的时间计算，每满1年领取2个月失业保险金，最长期限为24个月。",
    "url": "https://www.xm.gov.cn/zfgb/99833863",
    "fetched_at": "2026-10-24T23:08:00+08:00",
    "text_sha256": "1b15834fb11bc054d93821721d13584019859372a0d9f30865fc1f2d6c539f6e",
    "evidence_layer": "L1"
   }
  }
 ],
 "cases": [
  {
   "case_id": "flexible_medical_eligibility",
   "question": "我能以灵活就业人员身份参加厦门职工医保吗？",
   "topic": "职工医保灵活就业参保资格",
   "conditions": [
    {
     "field": "age",
     "op": "lte",
     "value": 60,
     "label": "处于法定劳动年龄内",
     "why": "灵活就业参保以法定劳动年龄内为前提"
    },
    {
     "field": "hukou_xiamen",
     "op": "eq",
     "value": true,
     "label": "本市户籍",
     "why": "或持本市有效居住证（含港澳台）",
     "alternative": "residence_permit_xiamen"
    },
    {
     "field": "residence_permit_xiamen",
     "op": "eq",
     "value": true,
     "label": "持本市有效居住证",
     "why": "户籍限制自2023-01-01起已全面放开",
     "alternative": "hukou_xiamen"
    },
    {
     "field": "no_employer_insurance",
     "op": "eq",
     "value": true,
     "label": "未在用人单位参加职工医保",
     "why": "含无雇工个体工商户、非全日制从业人员、新就业形态劳动者等"
    }
   ],
   "citations": [
    {
     "doc_number": "厦府规〔2022〕12号",
     "clause_no": "第六条",
     "clause_ref": "第六条@职工医保",
     "regime": "职工医保",
     "quote": "第六条\n职工基本医疗保险费由用人单位和职工分别按其缴费基数的\n7.5%和2%按月共同缴纳。",
     "url": "https://www.xm.gov.cn/zfgb/99833450",
     "fetched_at": "2026-10-24T23:08:00+08:00",
     "text_sha256": "e76be654ab7df9ef5fda099c2aec9016c6fdbdd18f8527a648afc361cd0bbd8f",
     "evidence_layer": "L1"
    },
    {
     "doc_number": "厦府规〔2022〕12号",
     "clause_no": "第七条",
     "clause_ref": "第七条@职工医保",
     "regime": "职工医保",
     "quote": "第七条\n职工基本医疗保险费用人单位缴费基数为职工工资总额，工资总额按其在职职工缴费基数之和确定。",
     "url": "https://www.xm.gov.cn/zfgb/99833450",
     "fetched_at": "2026-10-24T23:08:00+08:00",
     "text_sha256": "e76be654ab7df9ef5fda099c2aec9016c6fdbdd18f8527a648afc361cd0bbd8f",
     "evidence_layer": "L1"
    },
    {
     "doc_number": "厦府规〔2022〕12号",
     "clause_no": "第四条",
     "clause_ref": "第四条@职工医保",
     "regime": "职工医保",
     "quote": "第四条\n本市行政区域内的国家机关、企业、事业单位、社会组织、有雇工的个体工商户等用人单位（以下统称\n“用人单位”）及其职工应当参加职工医保。\n法定劳动年龄内的本市户籍人员、本市有效居住证持有人（含港澳台人员），属于无雇工的个体工商户、未在用人单位参加职工医保的非全日制从业人员、新就业形态劳动者以及其他灵活就业人员的（以下统称\n“灵活就业人员”），可以个人身份参加职工医保。",
     "url": "https://www.xm.gov.cn/zfgb/99833450",
     "fetched_at": "2026-10-24T23:08:00+08:00",
     "text_sha256": "e76be654ab7df9ef5fda099c2aec9016c6fdbdd18f8527a648afc361cd0bbd8f",
     "evidence_layer": "L1"
    }
   ]
  },
  {
   "case_id": "flexible_maternity",
   "question": "灵活就业人员能参加生育保险、享受生育津贴吗？",
   "topic": "灵活就业生育保险",
   "time_sensitive": true,
   "conditions": [],
   "versions": [
    {
     "as_of_range": [
      "0000-01-01",
      "2026-02-28"
     ],
     "verdict": "NOT_ELIGIBLE",
     "basis": "厦府规〔2022〕12号《厦门市职工医疗保险实施细则》第五十二条：灵活就业人员不参加生育保险，不享受生育津贴",
     "policy_id": "xm-yb-2022-12"
    },
    {
     "as_of_range": [
      "2026-03-01",
      "9999-12-31"
     ],
     "verdict": "ELIGIBLE",
     "basis": "闽医保〔2026〕13号（省级）与厦医保〔2026〕24号（厦门市级转发）将参加职工医保的灵活就业人员纳入生育保险覆盖范围；厦门自2026-03-01起施行",
     "policy_id": "xm-yb-2026-13",
     "extra": [
      "生育保险费率按职工医保缴费基数另行缴纳 0.7%",
      "连续不间断参保满6个月未满12个月的，生育津贴按50%计发；满12个月的按100%",
      "领取失业保险金期间的人员，由失业保险关系所在社会保险经办机构代缴"
     ]
    }
   ],
   "citations": [
    {
     "doc_number": "闽医保〔2026〕13号",
     "clause_no": "（分段）",
     "clause_ref": "（分段）@职工医保",
     "regime": "职工医保",
     "quote": "（一）将参加职工医保的灵活就业人员、农民工、新就业形\n态人员（以下统称灵活就业人员）纳入生育保险覆盖范围。",
     "url": "https://ylbz.xm.gov.cn/zwgk/zfxxgk/ml/zcwj/qtwj/202603/P020260313526925372654.pdf",
     "fetched_at": "2026-10-24T23:08:00+08:00",
     "text_sha256": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
     "evidence_layer": "L1"
    },
    {
     "doc_number": "闽医保〔2026〕13号",
     "clause_no": "（分段）",
     "clause_ref": "（分段）@职工医保",
     "regime": "职工医保",
     "quote": "（二）落实领取失业保险金人员参加生育保险工作。",
     "url": "https://ylbz.xm.gov.cn/zwgk/zfxxgk/ml/zcwj/qtwj/202603/P020260313526925372654.pdf",
     "fetched_at": "2026-10-24T23:08:00+08:00",
     "text_sha256": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
     "evidence_layer": "L1"
    },
    {
     "doc_number": "厦医保〔2026〕24号",
     "clause_no": "（分段）",
     "clause_ref": "（分段）@职工医保",
     "regime": "职工医保",
     "quote": "一、根据我市职工医保统筹基金累计结余和当期结余情况，我市符合省上规定条件，参加职工医保的灵活就业人员可同步以职工医保缴费基数的0.7%缴纳生育保险费，由个人缴纳。",
     "url": "https://ylbz.xm.gov.cn/zwgk/zfxxgk/ml/zcwj/qtwj/202603/t20260313_2985345.htm",
     "fetched_at": "2026-10-24T23:14:24+08:00",
     "text_sha256": "abcf640142a973eeda9adc470beda7bfa04532ed1ef351c998c92366c4c80e2f",
     "evidence_layer": "L1"
    },
    {
     "doc_number": "厦府规〔2022〕12号",
     "clause_no": "第五十二条",
     "clause_ref": "第五十二条@职工医保",
     "regime": "职工医保",
     "quote": "第五十二条\n用人单位应按规定参加生育保险，为本单位在职职工及时办理参保登记并按月足额缴纳生育保险费，职工个人不缴费。",
     "url": "https://www.xm.gov.cn/zfgb/99833450",
     "fetched_at": "2026-10-24T23:08:00+08:00",
     "text_sha256": "e76be654ab7df9ef5fda099c2aec9016c6fdbdd18f8527a648afc361cd0bbd8f",
     "evidence_layer": "L1"
    }
   ]
  },
  {
   "case_id": "flexible_medical_amount",
   "question": "我灵活就业参加职工医保，每月要交多少钱？",
   "topic": "职工医保缴费计算",
   "calculator": "flexible_medical_monthly",
   "conditions": [],
   "citations": [
    {
     "doc_number": "厦医保公告 2026年度职工基本医疗保险缴费率",
     "clause_no": "（分段）",
     "clause_ref": "（分段）@职工医保",
     "regime": "职工医保",
     "quote": "根据《厦门市职工医疗保险实施细则》（厦府规〔2022〕12号）规定，2026年职工基本医疗保险费由用人单位和职工分别按其缴费基数的7.5%和2%按月共同缴纳；灵活就业人员基本医疗保险费的缴费率为9.5%，由个人缴纳。",
     "url": "https://ylbz.xm.gov.cn/zwgk/tzgg/202512/t20251231_2975001.htm",
     "fetched_at": "2026-10-24T23:08:00+08:00",
     "text_sha256": "ee874db42bec1411037de51bb9a4a4e3d18e67a35cb1bfc941b2ae47f7a0e282",
     "evidence_layer": "L1"
    },
    {
     "doc_number": "厦医保 2025年度职工基本医疗保险缴费率",
     "clause_no": "（分段）",
     "clause_ref": "（分段）@职工医保",
     "regime": "职工医保",
     "quote": "2025年度职工基本医疗保险费由用人单位和职工分别按其缴费基数的6.5%和2%按月共同缴纳。灵活就业人员基本医疗保险费的缴费率为8.5%，由个人缴纳。",
     "url": "https://ylbz.xm.gov.cn/zwgk/zfxxgk/zc/ybzcfg/202501/t20250127_2915362.htm",
     "fetched_at": "2026-10-24T23:08:00+08:00",
     "text_sha256": "bf913c52f6ce99ea6b08c2643f1f193e7c2421168b2a23e456a4d0356492e1c4",
     "evidence_layer": "L1"
    },
    {
     "doc_number": "闽人社文〔2026〕13号",
     "clause_no": "（分段）",
     "clause_ref": "（分段）@职工医保",
     "regime": "职工医保",
     "quote": "一、自2026年1月1日起，全省企业职工基本养老保险、机关事业单位养老保险月缴费基数上限按照22893元、下限按照4579元执行。",
     "url": "https://hrss.xm.gov.cn/xxgk/sjwj/202610/t20261009_3020482.htm",
     "fetched_at": "2026-10-24T23:08:00+08:00",
     "text_sha256": "72d36d4e3953478d03410abeb5c5984bfcf29f8d1df6f7d5dc7a190f458c6bd6",
     "evidence_layer": "L1"
    },
    {
     "doc_number": "厦府规〔2022〕12号",
     "clause_no": "第七条",
     "clause_ref": "第七条@职工医保",
     "regime": "职工医保",
     "quote": "第七条\n职工基本医疗保险费用人单位缴费基数为职工工资总额，工资总额按其在职职工缴费基数之和确定。",
     "url": "https://www.xm.gov.cn/zfgb/99833450",
     "fetched_at": "2026-10-24T23:08:00+08:00",
     "text_sha256": "e76be654ab7df9ef5fda099c2aec9016c6fdbdd18f8527a648afc361cd0bbd8f",
     "evidence_layer": "L1"
    }
   ]
  },
  {
   "case_id": "continuity_ladder",
   "question": "断缴后我的医保待遇会怎么变？",
   "topic": "大病保险连续参保",
   "calculator": "continuity_tier",
   "conditions": [
    {
     "field": "continuous_months",
     "op": "gte",
     "value": 0,
     "label": "连续参保月数",
     "why": "需按医保费用发生时的连续参保时间计算"
    },
    {
     "field": "make_up_within_3m",
     "op": "eq",
     "value": true,
     "label": "中断后是否在3个月内补缴",
     "why": "未在3个月内补缴的，连续参保时间重新计算"
    }
   ],
   "citations": [
    {
     "doc_number": "厦府规〔2022〕12号",
     "clause_no": "第六条",
     "clause_ref": "第六条@职工医保",
     "regime": "职工医保",
     "quote": "第六条\n职工基本医疗保险费由用人单位和职工分别按其缴费基数的\n7.5%和2%按月共同缴纳。",
     "url": "https://www.xm.gov.cn/zfgb/99833450",
     "fetched_at": "2026-10-24T23:08:00+08:00",
     "text_sha256": "e76be654ab7df9ef5fda099c2aec9016c6fdbdd18f8527a648afc361cd0bbd8f",
     "evidence_layer": "L1"
    },
    {
     "doc_number": "厦府规〔2022〕12号",
     "clause_no": "第四十七条",
     "clause_ref": "第四十七条@职工医保",
     "regime": "职工医保",
     "quote": "第四十七条\n参保人员享受大病保险待遇的标准，根据其医疗费用发生时连续参加基本医疗保险的时间确定：\n（一）连续参保时间不满\n12个月的，按正常待遇的50%支付;\n（二）连续参保时间满\n12个月不满24个月的，按正常待遇的75%支付;\n（三）连续参保时间满\n24个月的，按正常待遇的100%支付。\n退休人员、医疗救助对象大病保险待遇不受连续参保时间限制。",
     "url": "https://www.xm.gov.cn/zfgb/99833450",
     "fetched_at": "2026-10-24T23:08:00+08:00",
     "text_sha256": "e76be654ab7df9ef5fda099c2aec9016c6fdbdd18f8527a648afc361cd0bbd8f",
     "evidence_layer": "L1"
    }
   ]
  },
  {
   "case_id": "unemployment_benefit",
   "question": "我能领多少失业保险金、能领多久？",
   "topic": "失业保险待遇",
   "calculator": "unemployment_benefit",
   "conditions": [
    {
     "field": "unemployment_insurance_months",
     "op": "gte",
     "value": 1,
     "label": "失业前累计缴费月数",
     "why": "领取期限按累计缴费时间计算"
    },
    {
     "field": "involuntary_unemployment",
     "op": "eq",
     "value": true,
     "label": "是否非因本人意愿中断就业",
     "why": "影响失业保险金申领条件"
    }
   ],
   "citations": [
    {
     "doc_number": "厦府规〔2025〕7号",
     "clause_no": "（分段）",
     "clause_ref": "（分段）@职工医保",
     "regime": "职工医保",
     "quote": "二、关于失业保险待遇政策\n（一）暂停执行“市条例”第十七条第一款、第十八条，原本市城镇户口失业人员的失业保险待遇按“省条例”和“省统筹方案”规定的城镇职工失业保险金标准执行，即失业保险金月发放标准为本市月最低工资标准的90%；领取失业保险金的期限，根据其失业前累计缴费的时间计算，每满1年领取2个月失业保险金，最长期限为24个月。",
     "url": "https://www.xm.gov.cn/zfgb/99833863",
     "fetched_at": "2026-10-24T23:08:00+08:00",
     "text_sha256": "1b15834fb11bc054d93821721d13584019859372a0d9f30865fc1f2d6c539f6e",
     "evidence_layer": "L1"
    }
   ]
  },
  {
   "case_id": "resident_eligibility",
   "question": "我能参加厦门居民医保吗？什么时候办？",
   "topic": "居民医保参保资格",
   "conditions": [
    {
     "field": "no_employee_insurance",
     "op": "eq",
     "value": true,
     "label": "未参加职工医保且未享有其他医疗保障",
     "why": "居民医保覆盖未参加职工医保或未按其他规定享有医疗保障的人员"
    }
   ],
   "citations": [
    {
     "doc_number": "厦府规〔2022〕12号",
     "clause_no": "第六条",
     "clause_ref": "第六条@居民医保",
     "regime": "居民医保",
     "quote": "第六条\n城乡居民基本医疗保险费由财政和个人共同承担。建立与经济社会发展水平、财政负担能力和基本医疗消费需求相适应的动态调整筹资机制。具体筹资标准由市医疗保障、财政和税务部门共同研究，经市人民政府同意后公布执行。其中，财政补助资金由市、区两级财政分别承担\n50%。",
     "url": "https://www.xm.gov.cn/zfgb/99833450",
     "fetched_at": "2026-10-24T23:08:00+08:00",
     "text_sha256": "e76be654ab7df9ef5fda099c2aec9016c6fdbdd18f8527a648afc361cd0bbd8f",
     "evidence_layer": "L1"
    },
    {
     "doc_number": "厦府规〔2022〕12号",
     "clause_no": "第八条",
     "clause_ref": "第八条@居民医保",
     "regime": "居民医保",
     "quote": "第八条\n城乡居民基本医疗保险基金只建立统筹基金，不设立个人账户。",
     "url": "https://www.xm.gov.cn/zfgb/99833450",
     "fetched_at": "2026-10-24T23:08:00+08:00",
     "text_sha256": "e76be654ab7df9ef5fda099c2aec9016c6fdbdd18f8527a648afc361cd0bbd8f",
     "evidence_layer": "L1"
    },
    {
     "doc_number": "厦府规〔2022〕12号",
     "clause_no": "第九条",
     "clause_ref": "第九条@居民医保",
     "regime": "居民医保",
     "quote": "第九条\n城乡居民基本医疗保险费实行预缴制，每年\n9月至12月为次年居民医保的集中参保缴费期。城乡居民应当在集中参保缴费期内按规定办理参保登记手续，并按个人缴费标准一次性缴纳下一年度的基本医疗保险费。\n超过集中参保缴费期，符合参保条件的城乡居民可以中途参保，中途参保人员按全年个人缴费标准缴纳基本医疗保险费。",
     "url": "https://www.xm.gov.cn/zfgb/99833450",
     "fetched_at": "2026-10-24T23:08:00+08:00",
     "text_sha256": "e76be654ab7df9ef5fda099c2aec9016c6fdbdd18f8527a648afc361cd0bbd8f",
     "evidence_layer": "L1"
    }
   ]
  },
  {
   "case_id": "resident_annual_premium",
   "question": "居民医保一年交多少钱？什么时候交？",
   "topic": "居民医保年度筹资标准",
   "time_sensitive": true,
   "calculator": "resident_annual_premium",
   "versions": [
    {
     "as_of_range": [
      "2026-01-01",
      "2026-12-31"
     ],
     "verdict": "ELIGIBLE",
     "basis": "厦医保〔2025〕96号：2026年度居民医保筹资标准 1280元/年，其中财政补助 830元、个人缴费 450元",
     "policy_id": "xm-yb-2025-96",
     "extra": [
      "居民医保实行预缴制，每年9月至12月为次年集中参保缴费期",
      "城乡居民医保基金只建立统筹基金，不设立个人账户",
      "中断缴费一个年度及以上的，再次参保后连续参保时间重新计算，中断期间不享受待遇"
     ]
    },
    {
     "as_of_range": [
      "2027-01-01",
      "9999-12-31"
     ],
     "verdict": "ELIGIBLE",
     "basis": "厦医保〔2026〕90号：2027年度成年居民筹资标准 1362元/年，其中个人缴费 491元（居民医保450元 + 长护险41元）、财政补助 871元",
     "policy_id": "xm-yb-2026-90",
     "extra": [
      "自2027年起长护险与基本医保统一参保登记、一并申报缴费",
      "居民长护险建制首年费率为0.15%，个人缴费与财政补助1:1分担",
      "18周岁以下未成年人及除大学生外的在校学生不单独缴纳长护险费"
     ]
    }
   ],
   "citations": [
    {
     "doc_number": "厦医保〔2025〕96号",
     "clause_no": "（分段）",
     "clause_ref": "（分段）@居民医保",
     "regime": "居民医保",
     "quote": "城乡居民基本医疗保险的筹资标准由每人每年1250元调整为每人每年1280元，其中：财政补助标准提高30元，由每人每年800元调整为830元，个人缴费标准维持每人每年450元不变。",
     "url": "https://ylbz.xm.gov.cn/zwgk/tpxw/202510/t20251023_2962144.htm",
     "fetched_at": "2026-10-24T23:08:03+08:00",
     "text_sha256": "2d9ea57751bf9efa0efadcf79d25be28b9faec15b04ab7f51bfb1e8414041c46",
     "evidence_layer": "L1"
    },
    {
     "doc_number": "厦医保〔2026〕90号",
     "clause_no": "（分段）",
     "clause_ref": "（分段）@居民医保",
     "regime": "居民医保",
     "quote": "一、成年居民基本医疗保险和长期护理保险的筹资标准为每人每年1362元，其中：个人缴费标准为每人每年491元（居民医保450元、长护险41元），财政补助标准为每人每年871元（居民医保830元、长护险41元）。\n二、大学生基本医疗保险和长期护理保险的筹资标准为每人每年1362元，其中：个人缴费标准为每人每年470.5元（居民医保450元、长护险20.5元），财政补助标准为每人每年891.5元（居民医保830元、长护险61.5元）。\n三、18周岁以下未成年人及除大学生外的在校学生基本医疗保险筹资标准为每人每年1280元，不单独缴纳长期护理保险费，按规定享受居民长护险待遇。其中：个人缴费标准为每人每年450元，财政补助标准为每人每年830元。",
     "url": "https://ylbz.xm.gov.cn/zwgk/zfxxgk/ml/zcwj/qtwj/202610/t20261013_3021006.htm",
     "fetched_at": "2026-10-24T23:08:00+08:00",
     "text_sha256": "d775daef731f1ebaeadd93b95e372134d9a830f84cf833784102fe0edde45651",
     "evidence_layer": "L1"
    },
    {
     "doc_number": "厦府规〔2022〕12号",
     "clause_no": "第八条",
     "clause_ref": "第八条@居民医保",
     "regime": "居民医保",
     "quote": "第八条\n城乡居民基本医疗保险基金只建立统筹基金，不设立个人账户。",
     "url": "https://www.xm.gov.cn/zfgb/99833450",
     "fetched_at": "2026-10-24T23:08:00+08:00",
     "text_sha256": "e76be654ab7df9ef5fda099c2aec9016c6fdbdd18f8527a648afc361cd0bbd8f",
     "evidence_layer": "L1"
    },
    {
     "doc_number": "厦府规〔2022〕12号",
     "clause_no": "第九条",
     "clause_ref": "第九条@居民医保",
     "regime": "居民医保",
     "quote": "第九条\n城乡居民基本医疗保险费实行预缴制，每年\n9月至12月为次年居民医保的集中参保缴费期。城乡居民应当在集中参保缴费期内按规定办理参保登记手续，并按个人缴费标准一次性缴纳下一年度的基本医疗保险费。\n超过集中参保缴费期，符合参保条件的城乡居民可以中途参保，中途参保人员按全年个人缴费标准缴纳基本医疗保险费。",
     "url": "https://www.xm.gov.cn/zfgb/99833450",
     "fetched_at": "2026-10-24T23:08:00+08:00",
     "text_sha256": "e76be654ab7df9ef5fda099c2aec9016c6fdbdd18f8527a648afc361cd0bbd8f",
     "evidence_layer": "L1"
    },
    {
     "doc_number": "厦府规〔2022〕12号",
     "clause_no": "第四十八条",
     "clause_ref": "第四十八条@居民医保",
     "regime": "居民医保",
     "quote": "第四十八条\n参保缴费时间应当保持连续，不得随意中断。未按规定及时足额缴纳基本医疗保险费的，认定为中断缴费，并按下列规定处理：\n（一）中断缴费一个年度及以上的，再次参保后连续参保时间重新计算，中断期间不享受医疗保障待遇；\n（二）在当年度开始后\n3个月（含）以内参保并补缴基本医疗保险费且次月缴费到账的，视为连续，中断月份计入连续参保时间，中断期间的待遇可按规定追溯享受；\n（三）在当年度开始\n3个月后（即每年3月后）参保缴费，缴费之前不享受医疗保障待遇，缴费之前发生的医疗费用由个人负担，且不计入个人自付费用计算范围。参保次月缴费到账的，从参保当月起开始重新计算连续参保时间；参保次月缴费未到账的，从实际缴费到账当月起开始重新计算连续参保时间；\n（四）从其他统筹区转入本市并按规定办理基本医疗保险关系转移接续的参保人员，在转移接续前未中断缴费，或中断缴费\n3个月（含）以内续保并补缴基本医疗保险费且次月缴费到账的，在其他统筹区正常参保缴费时间可与本市参保缴费时间合并计算，中断月份计入连续参保时间。",
     "url": "https://www.xm.gov.cn/zfgb/99833450",
     "fetched_at": "2026-10-24T23:08:00+08:00",
     "text_sha256": "e76be654ab7df9ef5fda099c2aec9016c6fdbdd18f8527a648afc361cd0bbd8f",
     "evidence_layer": "L1"
    },
    {
     "doc_number": "厦医保规〔2026〕3号",
     "clause_no": "第六条",
     "clause_ref": "第六条@长护险",
     "regime": "长护险",
     "quote": "第六条\n职工长期护理保险费与职工基本医疗保险费合并申报，按月缴费。从职工医保单位费率和灵活就业人员费率中调整0.15%用作长护险费率,应由个人缴纳的0.15%部分由医保部门从其职工医保个人账户划转。\n（一）在职职工。用人单位及其在职职工应当参加长护险，共同缴费。以职工医保缴费基数的0.3%缴纳长期护理保险费，用人单位和个人按同比例分担，各为0.15%。\n（二）灵活就业人员。参加职工医保的灵活就业人员以其职工医保缴费基数的0.3%缴纳长期护理保险费，由个人缴纳。\n（三）退休人员（指享受本市职工医保退休待遇的人员）。以本人上年度末基本养老金为缴费基数，按0.15%费率缴纳长期护理保险费（个位向下取整），由个人缴纳，原用人单位不缴费。\n退休人员应当每年按规定申报本人上年度末基本养老金。当年退休人员的缴费基数为领取职工退休待遇首月的基本养老金。未领取城镇职工基本养老金、个人未及时按规定申报本人基本养老金，以及其他无法确定基本养老金金额的退休人员，以本市上年度末缴纳长期护理保险费退休人员的平均基本养老金为缴费基数。",
     "url": "https://ylbz.xm.gov.cn/zwgk/zfxxgk/zc/ybzcfg/202610/t20261010_3020656.htm",
     "fetched_at": "2026-10-24T23:08:01+08:00",
     "text_sha256": "0b533f5df410e6160fc08ebf2402101da6b04e10933583dcb3dccd6383bb9fce",
     "evidence_layer": "L1"
    }
   ]
  },
  {
   "case_id": "chc_rate_impact",
   "question": "长护险落地后我的职工医保费率变了吗？",
   "topic": "长护险费率影响",
   "time_sensitive": true,
   "calculator": "flexible_rate_after_chc",
   "versions": [
    {
     "as_of_range": [
      "0000-01-01",
      "2026-12-31"
     ],
     "verdict": "ELIGIBLE",
     "basis": "2026年度职工基本医疗保险缴费率公告：用人单位7.5%、职工2%、灵活就业人员9.5%（长护险制度实施前）",
     "policy_id": "xm-yb-2026-rate",
     "extra": [
      "此阶段长护险制度尚未建立，职工医保费率为原标准"
     ]
    },
    {
     "as_of_range": [
      "2027-01-01",
      "9999-12-31"
     ],
     "verdict": "ELIGIBLE",
     "basis": "厦医保规〔2026〕3号 第六条：职工医保单位费率和灵活就业人员费率各调整出0.15%用作长护险费率",
     "policy_id": "xm-chc-2026-3",
     "extra": [
      "单位费率由7.5%调整为7.35%，灵活就业人员费率由9.5%调整为9.35%",
      "职工个人应缴的0.15%由医保部门从其职工医保个人账户划转",
      "职工自2027年1月起按月参保缴费；居民在2026年集中参保缴费期缴纳2027年度保费",
      "医保待遇不变"
     ]
    }
   ],
   "citations": [
    {
     "doc_number": "厦医保规〔2026〕3号",
     "clause_no": "第六条",
     "clause_ref": "第六条@长护险",
     "regime": "长护险",
     "quote": "第六条\n职工长期护理保险费与职工基本医疗保险费合并申报，按月缴费。从职工医保单位费率和灵活就业人员费率中调整0.15%用作长护险费率,应由个人缴纳的0.15%部分由医保部门从其职工医保个人账户划转。\n（一）在职职工。用人单位及其在职职工应当参加长护险，共同缴费。以职工医保缴费基数的0.3%缴纳长期护理保险费，用人单位和个人按同比例分担，各为0.15%。\n（二）灵活就业人员。参加职工医保的灵活就业人员以其职工医保缴费基数的0.3%缴纳长期护理保险费，由个人缴纳。\n（三）退休人员（指享受本市职工医保退休待遇的人员）。以本人上年度末基本养老金为缴费基数，按0.15%费率缴纳长期护理保险费（个位向下取整），由个人缴纳，原用人单位不缴费。\n退休人员应当每年按规定申报本人上年度末基本养老金。当年退休人员的缴费基数为领取职工退休待遇首月的基本养老金。未领取城镇职工基本养老金、个人未及时按规定申报本人基本养老金，以及其他无法确定基本养老金金额的退休人员，以本市上年度末缴纳长期护理保险费退休人员的平均基本养老金为缴费基数。",
     "url": "https://ylbz.xm.gov.cn/zwgk/zfxxgk/zc/ybzcfg/202610/t20261010_3020656.htm",
     "fetched_at": "2026-10-24T23:08:01+08:00",
     "text_sha256": "0b533f5df410e6160fc08ebf2402101da6b04e10933583dcb3dccd6383bb9fce",
     "evidence_layer": "L1"
    },
    {
     "doc_number": "厦医保公告 2026年度职工基本医疗保险缴费率",
     "clause_no": "（分段）",
     "clause_ref": "（分段）@职工医保",
     "regime": "职工医保",
     "quote": "根据《厦门市职工医疗保险实施细则》（厦府规〔2022〕12号）规定，2026年职工基本医疗保险费由用人单位和职工分别按其缴费基数的7.5%和2%按月共同缴纳；灵活就业人员基本医疗保险费的缴费率为9.5%，由个人缴纳。",
     "url": "https://ylbz.xm.gov.cn/zwgk/tzgg/202512/t20251231_2975001.htm",
     "fetched_at": "2026-10-24T23:08:00+08:00",
     "text_sha256": "ee874db42bec1411037de51bb9a4a4e3d18e67a35cb1bfc941b2ae47f7a0e282",
     "evidence_layer": "L1"
    }
   ]
  },
  {
   "case_id": "resident_waiting_period",
   "question": "我断保后再参保要等多久才能报销？",
   "topic": "居民医保待遇等待期",
   "conditions": [
    {
     "field": "ever_enrolled_resident",
     "op": "eq",
     "value": true,
     "label": "是否曾参加居民医保",
     "why": "首次参保与断保再参保的等待期规则不同"
    },
    {
     "field": "break_years",
     "op": "gte",
     "value": 0,
     "label": "断保年数",
     "why": "每多断保1年，变动待遇等待期增加1个月"
    }
   ],
   "citations": [
    {
     "doc_number": "厦府规〔2022〕12号",
     "clause_no": "第四十八条",
     "clause_ref": "第四十八条@居民医保",
     "regime": "居民医保",
     "quote": "第四十八条\n参保缴费时间应当保持连续，不得随意中断。未按规定及时足额缴纳基本医疗保险费的，认定为中断缴费，并按下列规定处理：\n（一）中断缴费一个年度及以上的，再次参保后连续参保时间重新计算，中断期间不享受医疗保障待遇；\n（二）在当年度开始后\n3个月（含）以内参保并补缴基本医疗保险费且次月缴费到账的，视为连续，中断月份计入连续参保时间，中断期间的待遇可按规定追溯享受；\n（三）在当年度开始\n3个月后（即每年3月后）参保缴费，缴费之前不享受医疗保障待遇，缴费之前发生的医疗费用由个人负担，且不计入个人自付费用计算范围。参保次月缴费到账的，从参保当月起开始重新计算连续参保时间；参保次月缴费未到账的，从实际缴费到账当月起开始重新计算连续参保时间；\n（四）从其他统筹区转入本市并按规定办理基本医疗保险关系转移接续的参保人员，在转移接续前未中断缴费，或中断缴费\n3个月（含）以内续保并补缴基本医疗保险费且次月缴费到账的，在其他统筹区正常参保缴费时间可与本市参保缴费时间合并计算，中断月份计入连续参保时间。",
     "url": "https://www.xm.gov.cn/zfgb/99833450",
     "fetched_at": "2026-10-24T23:08:00+08:00",
     "text_sha256": "e76be654ab7df9ef5fda099c2aec9016c6fdbdd18f8527a648afc361cd0bbd8f",
     "evidence_layer": "L1"
    },
    {
     "doc_number": "待遇等待期与两大激励 官方答疑",
     "clause_no": "（分段）",
     "clause_ref": "（分段）@居民医保",
     "regime": "居民医保",
     "quote": "固定待遇等待期：\n除新生儿、医疗救助对象、当年退出现役的军人等特殊群体外，未在居民医保集中参保期参保或未连续参保的，参保后设置固定待遇等待期3个月。",
     "url": "https://ylbz.xm.gov.cn/zwgk/ybdt/202512/t20251201_2969555.htm",
     "fetched_at": "2026-10-25T10:24:07+08:00",
     "text_sha256": "31699e7035a9f6fbf4d1e044ec070f9332ae2e35a8334584392a76724186a0e2",
     "evidence_layer": "L4"
    },
    {
     "doc_number": "待遇等待期与两大激励 官方答疑",
     "clause_no": "（分段）",
     "clause_ref": "（分段）@居民医保",
     "regime": "居民医保",
     "quote": "变动待遇等待期：\n每多断保一年，在固定待遇等待期基础上增加变动待遇等待期1个月。",
     "url": "https://ylbz.xm.gov.cn/zwgk/ybdt/202512/t20251201_2969555.htm",
     "fetched_at": "2026-10-25T10:24:07+08:00",
     "text_sha256": "31699e7035a9f6fbf4d1e044ec070f9332ae2e35a8334584392a76724186a0e2",
     "evidence_layer": "L4"
    },
    {
     "doc_number": "待遇等待期与两大激励 官方答疑",
     "clause_no": "（分段）",
     "clause_ref": "（分段）@居民医保",
     "regime": "居民医保",
     "quote": "连续参保激励和零报销激励\n以我市为例\n↓↓↓\n连续参保激励：\n连续参加居民医保满4年的，之后每连续参保1年，大病保险最高支付限额每年提高3000元",
     "url": "https://ylbz.xm.gov.cn/zwgk/ybdt/202512/t20251201_2969555.htm",
     "fetched_at": "2026-10-25T10:24:07+08:00",
     "text_sha256": "31699e7035a9f6fbf4d1e044ec070f9332ae2e35a8334584392a76724186a0e2",
     "evidence_layer": "L4"
    }
   ]
  },
  {
   "case_id": "flexible_pension",
   "question": "我以灵活就业身份参加厦门养老保险要交多少？将来能领养老金吗？",
   "topic": "灵活就业养老保险",
   "time_sensitive": true,
   "calculator": "pension_monthly",
   "conditions": [
    {
     "field": "age",
     "op": "lte",
     "value": 60,
     "label": "年龄",
     "why": "男性50周岁以上、女性40周岁以上参保将建立临时账户，会影响未来待遇领取地判定"
    }
   ],
   "versions": [
    {
     "as_of_range": [
      "0000-01-01",
      "2029-12-31"
     ],
     "verdict": "ELIGIBLE",
     "basis": "按月领取基本养老金最低缴费年限为累计满15年",
     "policy_id": "xm-pension-retire-guide",
     "extra": [
      "灵活就业人员缴费比例 20%，其中 8% 记入个人账户、12% 记入统筹基金",
      "缴费基数在省平均工资 60%—300% 范围内自主选择，共 7 档"
     ]
    },
    {
     "as_of_range": [
      "2030-01-01",
      "9999-12-31"
     ],
     "verdict": "ELIGIBLE",
     "basis": "自2030年1月1日起，职工按月领取基本养老金最低缴费年限由15年逐步提高至20年，每年提高6个月",
     "policy_id": "xm-pension-retire-guide",
     "extra": [
      "最低缴费年限逐年递增：2030年起每年提高6个月，直至20年",
      "灵活就业人员缴费比例 20%（8% 个人账户 / 12% 统筹基金）"
     ]
    }
   ],
   "citations": [
    {
     "doc_number": "居住证人员参加企业职工基本养老保险 解读",
     "clause_no": "（分段）",
     "clause_ref": "（分段）@职工医保",
     "regime": "职工医保",
     "quote": "参保人员按不低于全市上年度职工月平均工资60%且不高于全市上年度职工月平均工资300%的标准自行选择缴费基数（共7个档次），今年的7个档次缴费基数分别是3772.80元（全市上年度职工月平均工资的60%）、4401.60元（全市上年度职工月平均工资的70%）、5030.40元（全市上年度职工月平均工资的80%）、5659.20元（全市上年度职工月平均工资的90%）、6288.00元（全市上年度职工月平均工资的100%）、12576.00元（全市上年度职工月平均工资的200%）、18864.00元（全市上年度职工月平均工资的300%）。\n上述缴费基数乘以20%的缴费比例后，7个档次的月缴费金额从低到高分别是754.56元、880.32元、1006.08元、1131.84元、1257.60元、2515.20元、3772.80元。",
     "url": "https://hrss.xm.gov.cn/gzcy/zxft/jdcxmjzzkcb",
     "fetched_at": "2026-10-25T10:24:11+08:00",
     "text_sha256": "84023b2d5af7aa69518df8f4b71fbe3fcf99189cd524916b9381f7c136aae153",
     "evidence_layer": "L4"
    },
    {
     "doc_number": "居住证人员参加企业职工基本养老保险 解读",
     "clause_no": "（分段）",
     "clause_ref": "（分段）@职工医保",
     "regime": "职工医保",
     "quote": "对参保时男性年满50周岁和女性年满40周岁的居住证持有人，建立临时基本养老保险缴费账户。",
     "url": "https://hrss.xm.gov.cn/gzcy/zxft/jdcxmjzzkcb",
     "fetched_at": "2026-10-25T10:24:11+08:00",
     "text_sha256": "84023b2d5af7aa69518df8f4b71fbe3fcf99189cd524916b9381f7c136aae153",
     "evidence_layer": "L4"
    },
    {
     "doc_number": "居住证人员参加企业职工基本养老保险 解读",
     "clause_no": "（分段）",
     "clause_ref": "（分段）@职工医保",
     "regime": "职工医保",
     "quote": "在男性年满60周岁、女性年满55周岁且累计缴费满15年时，可在我市办理退休。",
     "url": "https://hrss.xm.gov.cn/gzcy/zxft/jdcxmjzzkcb",
     "fetched_at": "2026-10-25T10:24:11+08:00",
     "text_sha256": "84023b2d5af7aa69518df8f4b71fbe3fcf99189cd524916b9381f7c136aae153",
     "evidence_layer": "L4"
    },
    {
     "doc_number": "企业职工退休—养老保险待遇申领 办事指南",
     "clause_no": "（分段）",
     "clause_ref": "（分段）@职工医保",
     "regime": "职工医保",
     "quote": "申请对象\n\n    满足企业职工养老保险正常退休手续办理条件的参保人员：1.达到法定退休年龄；2.累计缴费年限满15年。从2030年1月1日起，职工按月领取基本养老金最低缴费年限由15年逐步提高至20年，每年提高6个月。",
     "url": "https://siming.gov.cn/wsbs/ztfw/sb/nrrh/202411/t20241119_1078974.htm?PROTID=6713",
     "fetched_at": "2026-10-24T23:32:46+08:00",
     "text_sha256": "6ae581a1da3496ff733c35fb7cddd0c2658171c8ceff35e23f4b4618329e9b51",
     "evidence_layer": "L2"
    },
    {
     "doc_number": "灵活就业参保承诺制 12345热线官方答复",
     "clause_no": "（分段）",
     "clause_ref": "（分段）@职工医保",
     "regime": "职工医保",
     "quote": "诉求人可以持身份证和《灵活就业参保承诺书》到办税服务厅参加职工基本养老保险，还可以通过线上（电子税务局APP、i厦门APP或闽政通APP）以“新业态等灵活就业人员”身份办理。",
     "url": "https://ylbz.xm.gov.cn/gzcy/zxzx/index_20992.htm?id=XM25052003182",
     "fetched_at": "2026-10-25T11:28:03+08:00",
     "text_sha256": "8573210670289e14a3fe1482bd1c0243d742ad633d6ba87e450806546eecbe00",
     "evidence_layer": "L4"
    }
   ]
  },
  {
   "case_id": "flexible_enroll_channel",
   "question": "我没有厦门居住证，能参保吗？手续怎么办？",
   "topic": "灵活就业参保办理渠道",
   "conditions": [
    {
     "field": "residence_permit_xiamen",
     "op": "eq",
     "value": false,
     "label": "未持厦门有效居住证",
     "why": "未持居住证的非本市户籍人员，参保登记需另走承诺制渠道"
    },
    {
     "field": "commitment_form_signed",
     "op": "eq",
     "value": true,
     "label": "承诺制办理渠道",
     "why": "按税务口径办理，不属于职工医保参保条件"
    }
   ],
   "citations": [
    {
     "doc_number": "灵活就业参保承诺制 12345热线官方答复",
     "clause_no": "（分段）",
     "clause_ref": "（分段）@职工医保",
     "regime": "职工医保",
     "quote": "诉求人可以持身份证和《灵活就业参保承诺书》到办税服务厅参加职工基本养老保险，还可以通过线上（电子税务局APP、i厦门APP或闽政通APP）以“新业态等灵活就业人员”身份办理。",
     "url": "https://ylbz.xm.gov.cn/gzcy/zxzx/index_20992.htm?id=XM25052003182",
     "fetched_at": "2026-10-25T11:28:03+08:00",
     "text_sha256": "8573210670289e14a3fe1482bd1c0243d742ad633d6ba87e450806546eecbe00",
     "evidence_layer": "L4"
    }
   ]
  },
  {
   "case_id": "insurance_transfer",
   "question": "我在外地交过社保，回厦门怎么接续？年限怎么算？",
   "topic": "职工医保关系转移接续",
   "conditions": [
    {
     "field": "previous_insurance_type",
     "op": "eq",
     "value": "职工医保",
     "label": "外地参加的是职工医保",
     "why": "居民医保年限不作为职工医保缴费年限，需先确认原参保险种"
    },
    {
     "field": "previous_city",
     "op": "ne",
     "value": "",
     "label": "原参保城市",
     "why": "跨统筹地区流动需办理转移接续"
    },
    {
     "field": "has_transfer_certificate",
     "op": "eq",
     "value": true,
     "label": "是否已办参保凭证",
     "why": "办理转移接续手续后，异地个人账户资金可转入本市合并计算，职工医保缴费年限累计计算（重复缴费年限不得累加）"
    }
   ],
   "citations": [
    {
     "doc_number": "厦府规〔2022〕12号",
     "clause_no": "第四条",
     "clause_ref": "第四条@职工医保",
     "regime": "职工医保",
     "quote": "第四条\n本市行政区域内的国家机关、企业、事业单位、社会组织、有雇工的个体工商户等用人单位（以下统称\n“用人单位”）及其职工应当参加职工医保。\n法定劳动年龄内的本市户籍人员、本市有效居住证持有人（含港澳台人员），属于无雇工的个体工商户、未在用人单位参加职工医保的非全日制从业人员、新就业形态劳动者以及其他灵活就业人员的（以下统称\n“灵活就业人员”），可以个人身份参加职工医保。",
     "url": "https://www.xm.gov.cn/zfgb/99833450",
     "fetched_at": "2026-10-24T23:08:00+08:00",
     "text_sha256": "e76be654ab7df9ef5fda099c2aec9016c6fdbdd18f8527a648afc361cd0bbd8f",
     "evidence_layer": "L1"
    },
    {
     "doc_number": "厦府规〔2022〕12号",
     "clause_no": "第三十二条",
     "clause_ref": "第三十二条@职工医保",
     "regime": "职工医保",
     "quote": "第三十二条\n参保人员跨统筹地区流动，按规定办理基本医疗保险关系转移接续；生育保险关系随职工基本医疗保险关系一并转移接续。已享受职工医保退休待遇的，不再转移基本医疗保险关系。\n办理转移接续手续后，其在异地的个人账户资金可转入本市，与本市个人账户资金合并计算；职工医保缴费年限累计计算，但重复缴费的年限不得累加计算。\n参加居民医保以及非按职工医保标准缴费的年限，不作为职工医保缴费年限。",
     "url": "https://www.xm.gov.cn/zfgb/99833450",
     "fetched_at": "2026-10-24T23:08:00+08:00",
     "text_sha256": "e76be654ab7df9ef5fda099c2aec9016c6fdbdd18f8527a648afc361cd0bbd8f",
     "evidence_layer": "L1"
    },
    {
     "doc_number": "厦府规〔2022〕12号",
     "clause_no": "第三十三条",
     "clause_ref": "第三十三条@职工医保",
     "regime": "职工医保",
     "quote": "第三十三条\n参保人员在各地实施职工医保制度前，符合国家、省规定的连续工龄或工作年限以及缴纳基本养老保险费的年限，视同职工医保缴费年限。",
     "url": "https://www.xm.gov.cn/zfgb/99833450",
     "fetched_at": "2026-10-24T23:08:00+08:00",
     "text_sha256": "e76be654ab7df9ef5fda099c2aec9016c6fdbdd18f8527a648afc361cd0bbd8f",
     "evidence_layer": "L1"
    },
    {
     "doc_number": "厦府规〔2022〕12号",
     "clause_no": "第三十四条",
     "clause_ref": "第三十四条@职工医保",
     "regime": "职工医保",
     "quote": "第三十四条\n具备申报本市职工医保退休待遇资格的人员包括：\n（一）本市户籍人员\n;\n（二）在达到法定退休年龄时已实际缴纳本市职工基本医疗保险费满\n10年的非本市户籍人员（含港澳台人员、外国人）;\n（三）在达到法定退休年龄时，按国家、省规定参加福建省基本养老保险行业统筹或福建省本级机关事业单位养老保险，按照属地原则参加本市职工医保的省、部属驻厦用人单位参保人员；\n（四）本市机关、事业单位编制人员及备案员额人员；\n（五）本市认定的高层次人才及其配偶。",
     "url": "https://www.xm.gov.cn/zfgb/99833450",
     "fetched_at": "2026-10-24T23:08:00+08:00",
     "text_sha256": "e76be654ab7df9ef5fda099c2aec9016c6fdbdd18f8527a648afc361cd0bbd8f",
     "evidence_layer": "L1"
    },
    {
     "doc_number": "医保连续缴费与转移接续 官方提示",
     "clause_no": "（分段）",
     "clause_ref": "（分段）@职工医保",
     "regime": "职工医保",
     "quote": "从其他统筹区转入厦门并按规定办理医保关系转移接续，在转移接续前未中断缴费，或中断缴费不超过3个月续保并及时完成中断期间补缴到账的，之前在外地的医保参保缴费时长可与本地合并计算，中断月份计入连续参保时间，中断期间的待遇可按规定追溯享受。",
     "url": "https://ylbz.xm.gov.cn/zwgk/tpxw/202605/t20260529_2998199.htm",
     "fetched_at": "2026-10-25T10:24:09+08:00",
     "text_sha256": "a542d7f9ee8c9a52777c6c64224a004c5bed55b6476cbee16507048a7b9675a5",
     "evidence_layer": "L4"
    },
    {
     "doc_number": "医保连续缴费与转移接续 官方提示",
     "clause_no": "（分段）",
     "clause_ref": "（分段）@职工医保",
     "regime": "职工医保",
     "quote": "具备申报本市职工医保退休待遇资格的人员，达到法定退休年龄时，需同时满足两个条件：\n厦门本市职工医保实际缴费年限满10年；\n职工医保累计缴费年限（含实际缴费和视同缴费）男满25年、女满20年。",
     "url": "https://ylbz.xm.gov.cn/zwgk/tpxw/202605/t20260529_2998199.htm",
     "fetched_at": "2026-10-25T10:24:09+08:00",
     "text_sha256": "a542d7f9ee8c9a52777c6c64224a004c5bed55b6476cbee16507048a7b9675a5",
     "evidence_layer": "L4"
    }
   ]
  },
  {
   "case_id": "resident_wait_period_calc",
   "question": "我居民医保断保后重新参保，要等多久才能报销？",
   "topic": "居民医保待遇等待期",
   "calculator": "resident_wait_calc",
   "conditions": [
    {
     "field": "ever_enrolled_resident",
     "op": "eq",
     "value": true,
     "label": "是否曾参加居民医保",
     "why": "首次参保与断保再参保的等待期规则不同"
    },
    {
     "field": "break_years",
     "op": "gte",
     "value": 0,
     "label": "断保年数",
     "why": "每多断保1年，变动等待期增加1个月"
    }
   ],
   "citations": [
    {
     "doc_number": "待遇等待期与两大激励 官方答疑",
     "clause_no": "（分段）",
     "clause_ref": "（分段）@居民医保",
     "regime": "居民医保",
     "quote": "固定待遇等待期：\n除新生儿、医疗救助对象、当年退出现役的军人等特殊群体外，未在居民医保集中参保期参保或未连续参保的，参保后设置固定待遇等待期3个月。",
     "url": "https://ylbz.xm.gov.cn/zwgk/ybdt/202512/t20251201_2969555.htm",
     "fetched_at": "2026-10-25T10:24:07+08:00",
     "text_sha256": "31699e7035a9f6fbf4d1e044ec070f9332ae2e35a8334584392a76724186a0e2",
     "evidence_layer": "L4"
    },
    {
     "doc_number": "待遇等待期与两大激励 官方答疑",
     "clause_no": "（分段）",
     "clause_ref": "（分段）@居民医保",
     "regime": "居民医保",
     "quote": "变动待遇等待期：\n每多断保一年，在固定待遇等待期基础上增加变动待遇等待期1个月。",
     "url": "https://ylbz.xm.gov.cn/zwgk/ybdt/202512/t20251201_2969555.htm",
     "fetched_at": "2026-10-25T10:24:07+08:00",
     "text_sha256": "31699e7035a9f6fbf4d1e044ec070f9332ae2e35a8334584392a76724186a0e2",
     "evidence_layer": "L4"
    },
    {
     "doc_number": "待遇等待期与两大激励 官方答疑",
     "clause_no": "（分段）",
     "clause_ref": "（分段）@居民医保",
     "regime": "居民医保",
     "quote": "连续参保激励和零报销激励\n以我市为例\n↓↓↓\n连续参保激励：\n连续参加居民医保满4年的，之后每连续参保1年，大病保险最高支付限额每年提高3000元",
     "url": "https://ylbz.xm.gov.cn/zwgk/ybdt/202512/t20251201_2969555.htm",
     "fetched_at": "2026-10-25T10:24:07+08:00",
     "text_sha256": "31699e7035a9f6fbf4d1e044ec070f9332ae2e35a8334584392a76724186a0e2",
     "evidence_layer": "L4"
    },
    {
     "doc_number": "厦府规〔2022〕12号",
     "clause_no": "第四十八条",
     "clause_ref": "第四十八条@居民医保",
     "regime": "居民医保",
     "quote": "第四十八条\n参保缴费时间应当保持连续，不得随意中断。未按规定及时足额缴纳基本医疗保险费的，认定为中断缴费，并按下列规定处理：\n（一）中断缴费一个年度及以上的，再次参保后连续参保时间重新计算，中断期间不享受医疗保障待遇；\n（二）在当年度开始后\n3个月（含）以内参保并补缴基本医疗保险费且次月缴费到账的，视为连续，中断月份计入连续参保时间，中断期间的待遇可按规定追溯享受；\n（三）在当年度开始\n3个月后（即每年3月后）参保缴费，缴费之前不享受医疗保障待遇，缴费之前发生的医疗费用由个人负担，且不计入个人自付费用计算范围。参保次月缴费到账的，从参保当月起开始重新计算连续参保时间；参保次月缴费未到账的，从实际缴费到账当月起开始重新计算连续参保时间；\n（四）从其他统筹区转入本市并按规定办理基本医疗保险关系转移接续的参保人员，在转移接续前未中断缴费，或中断缴费\n3个月（含）以内续保并补缴基本医疗保险费且次月缴费到账的，在其他统筹区正常参保缴费时间可与本市参保缴费时间合并计算，中断月份计入连续参保时间。",
     "url": "https://www.xm.gov.cn/zfgb/99833450",
     "fetched_at": "2026-10-24T23:08:00+08:00",
     "text_sha256": "e76be654ab7df9ef5fda099c2aec9016c6fdbdd18f8527a648afc361cd0bbd8f",
     "evidence_layer": "L1"
    }
   ]
  }
 ],
 "serviceLayer": {
  "module_name": "灵活就业参保“一件事”",
  "area": "福建省",
  "module_code": "113501020036093803435L100001001",
  "catalog_code": "113501020036093803435L10000100Y",
  "window_phone": "0595-9501872",
  "promise_days": 38,
  "phase_parallel": "N",
  "services": [
   "就业登记（灵活就业登记）",
   "流动人员人事档案接收",
   "流动人员人事档案转递",
   "社会保险登记",
   "基本医疗保险参保登记",
   "社会保障卡(含电子社保卡)申领",
   "灵活就业人员社会保险费申报"
  ],
  "materials": [
   {
    "name": "居民户口簿",
    "copy_num": null,
    "material_id": "XK00020672"
   },
   {
    "name": "户口簿",
    "copy_num": null,
    "material_id": "XK00020671"
   },
   {
    "name": "居住证",
    "copy_num": null,
    "material_id": "XK00020672"
   },
   {
    "name": "居住证",
    "copy_num": null,
    "material_id": "XK00020671"
   },
   {
    "name": "参保人员有效身份证件",
    "copy_num": null,
    "material_id": "XK00020672"
   },
   {
    "name": "居民身份证",
    "copy_num": null,
    "material_id": "XK00020671"
   },
   {
    "name": "居民身份证",
    "copy_num": null,
    "material_id": "XK00020670"
   },
   {
    "name": "居民身份证",
    "copy_num": null,
    "material_id": "XK00020669"
   },
   {
    "name": "身份证正反面",
    "copy_num": null,
    "material_id": "GF00000367"
   },
   {
    "name": "身份证",
    "copy_num": null,
    "material_id": "GF00000277"
   }
  ],
  "conditions": [
   "1.从事灵活就业、有相对稳定收入的劳动者，可于实现就业后60日内到就业地或户籍地经办机构办理“灵活就业登记”；",
   "2.确定未在用人单位参加社会保险的非全日制从业人员以及其他灵活就业人员可自愿参加户籍地或居住证登记地社会保险和职工医疗保险，其中与福建省内参保单位解除劳动关系后自愿参加职工医保的人员可向最近一段职工基本医疗保险医保经办机构申请办理灵活就业续保登记；",
   "3.档案接收时，应为符合户籍所在地或工作单位所在地在拟接收档案管理服务机构所在地（福建省）的流动人员；",
   "4.社会保险费申报要求办理灵活就业人员基本养老保险和职工基本医疗保险参保登记，且申报的费款属期须在有效参保登记期内。"
  ],
  "condition_raw": "1.从事灵活就业、有相对稳定收入的劳动者，可于实现就业后60日内到就业地或户籍地经办机构办理“灵活就业登记”；\n2.确定未在用人单位参加社会保险的非全日制从业人员以及其他灵活就业人员可自愿参加户籍地或居住证登记地社会保险和职工医疗保险，其中与福建省内参保单位解除劳动关系后自愿参加职工医保的人员可向最近一段职工基本医疗保险医保经办机构申请办理灵活就业续保登记；\n3.档案接收时，应为符合户籍所在地或工作单位所在地在拟接收档案管理服务机构所在地（福建省）的流动人员；\n4.社会保险费申报要求办理灵活就业人员基本养老保险和职工基本医疗保险参保登记，且申报的费款属期须在有效参保登记期内。",
  "faq": [
   {
    "q": "办理灵活就业登记需要满足什么条件",
    "a": null
   },
   {
    "q": "灵活就业人员能不能参加生育保险并享受生育待遇",
    "a": null
   },
   {
    "q": "灵活就业人员办理医保退休需要满足什么条件",
    "a": null
   },
   {
    "q": "能否在就业地参加单位职工医保的情况下，又在户籍地同时以灵活就业身份参加职工医保",
    "a": null
   },
   {
    "q": "已经以灵活就业身份办理职工医疗保险并已正常缴费，如何在医院享受医保待遇",
    "a": null
   },
   {
    "q": "流动人员人事档案应该存放在哪",
    "a": null
   },
   {
    "q": "流动人员人事档案如何转递",
    "a": null
   },
   {
    "q": "什么是流动人员人事档案",
    "a": null
   }
  ],
  "source_file": "xhr_fj-flexible_0.txt"
 },
 "statusCheck": [
  {
   "policy_id": "xm-yb-2022-12",
   "doc_number": "厦府规〔2022〕12号",
   "current_status": "partially_superseded",
   "status_verdict": "superseded",
   "evidence_layer": "L-3 库内沿革链",
   "note": "该文件已被库内沿革链标记为被替代。",
   "evidence": {
    "L3_version_chain": [
     {
      "superseded_by": "xm-yb-2026-13",
      "reason": "库内沿革链声明"
     }
    ]
   },
   "should_downgrade": false
  },
  {
   "policy_id": "xm-yb-2026-13",
   "doc_number": "闽医保〔2026〕13号",
   "current_status": "active",
   "status_verdict": "unknown",
   "evidence_layer": "无反查证据",
   "note": "未找到任何状态反查证据（既无有效性元数据，也未进清理目录，库内也无沿革链）。不得据此认为文件有效。",
   "evidence": {},
   "should_downgrade": false
  },
  {
   "policy_id": "xm-yb-2026-rate",
   "doc_number": "厦医保公告 2026年度职工基本医疗保险缴费率",
   "current_status": "active",
   "status_verdict": "unknown",
   "evidence_layer": "无反查证据",
   "note": "未找到任何状态反查证据（既无有效性元数据，也未进清理目录，库内也无沿革链）。不得据此认为文件有效。",
   "evidence": {},
   "should_downgrade": false
  },
  {
   "policy_id": "xm-yb-2025-rate",
   "doc_number": "厦医保 2025年度职工基本医疗保险缴费率",
   "current_status": "active",
   "status_verdict": "superseded",
   "evidence_layer": "L-3 库内沿革链",
   "note": "该文件已被库内沿革链标记为被替代。",
   "evidence": {
    "L3_version_chain": [
     {
      "superseded_by": "xm-yb-2026-rate",
      "reason": "库内沿革链声明"
     }
    ]
   },
   "should_downgrade": false
  },
  {
   "policy_id": "xm-yb-2025-7",
   "doc_number": "厦府规〔2025〕7号",
   "current_status": "active",
   "status_verdict": "unknown",
   "evidence_layer": "无反查证据",
   "note": "未找到任何状态反查证据（既无有效性元数据，也未进清理目录，库内也无沿革链）。不得据此认为文件有效。",
   "evidence": {},
   "should_downgrade": false
  },
  {
   "policy_id": "fj-rst-2026-13",
   "doc_number": "闽人社文〔2026〕13号",
   "current_status": "active",
   "status_verdict": "unknown",
   "evidence_layer": "无反查证据",
   "note": "未找到任何状态反查证据（既无有效性元数据，也未进清理目录，库内也无沿革链）。不得据此认为文件有效。",
   "evidence": {},
   "should_downgrade": false
  },
  {
   "policy_id": "xm-gb-2025-2",
   "doc_number": "厦府规〔2025〕2号",
   "current_status": "active",
   "status_verdict": "validity_unset",
   "evidence_layer": "L-1 文件有效性元数据",
   "note": "该文件页面「有效性」字段为「未设置」——既不证明有效也不证明失效。需人工核对清理目录清单表。",
   "evidence": {
    "L1_validity_field": {
     "validity": "未设置",
     "doc_number": "厦府规〔2025〕2号",
     "title": "厦门市人民政府关于印发退休人员社会化管理服务办法的通知",
     "source": "hrss-20250328.txt"
    }
   },
   "should_downgrade": false
  },
  {
   "policy_id": "xm-tax-param",
   "doc_number": "厦门税务 社保费费种费率表",
   "current_status": "active",
   "status_verdict": "unknown",
   "evidence_layer": "无反查证据",
   "note": "未找到任何状态反查证据（既无有效性元数据，也未进清理目录，库内也无沿革链）。不得据此认为文件有效。",
   "evidence": {},
   "should_downgrade": false
  },
  {
   "policy_id": "xm-yb-interpret",
   "doc_number": "厦门市医保局 在线访谈文字实录",
   "current_status": "active",
   "status_verdict": "unknown",
   "evidence_layer": "无反查证据",
   "note": "未找到任何状态反查证据（既无有效性元数据，也未进清理目录，库内也无沿革链）。不得据此认为文件有效。",
   "evidence": {},
   "should_downgrade": false
  },
  {
   "policy_id": "xm-chc-interpret",
   "doc_number": "厦医保规〔2026〕3号 政策解读",
   "current_status": "active",
   "status_verdict": "unknown",
   "evidence_layer": "无反查证据",
   "note": "未找到任何状态反查证据（既无有效性元数据，也未进清理目录，库内也无沿革链）。不得据此认为文件有效。",
   "evidence": {},
   "should_downgrade": false
  },
  {
   "policy_id": "xm-waitperiod",
   "doc_number": "待遇等待期与两大激励 官方答疑",
   "current_status": "active",
   "status_verdict": "unknown",
   "evidence_layer": "无反查证据",
   "note": "未找到任何状态反查证据（既无有效性元数据，也未进清理目录，库内也无沿革链）。不得据此认为文件有效。",
   "evidence": {},
   "should_downgrade": false
  },
  {
   "policy_id": "xm-pension-transfer-interpret",
   "doc_number": "养老保险转移、退保、继承政策解读",
   "current_status": "active",
   "status_verdict": "unknown",
   "evidence_layer": "无反查证据",
   "note": "未找到任何状态反查证据（既无有效性元数据，也未进清理目录，库内也无沿革链）。不得据此认为文件有效。",
   "evidence": {},
   "should_downgrade": false
  },
  {
   "policy_id": "xm-residence-pension-interpret",
   "doc_number": "居住证人员参加企业职工基本养老保险 解读",
   "current_status": "active",
   "status_verdict": "unknown",
   "evidence_layer": "无反查证据",
   "note": "未找到任何状态反查证据（既无有效性元数据，也未进清理目录，库内也无沿革链）。不得据此认为文件有效。",
   "evidence": {},
   "should_downgrade": false
  },
  {
   "policy_id": "xm-pension-official-guide",
   "doc_number": "灵活就业人员 养老保险参保指引",
   "current_status": "active",
   "status_verdict": "unknown",
   "evidence_layer": "无反查证据",
   "note": "未找到任何状态反查证据（既无有效性元数据，也未进清理目录，库内也无沿革链）。不得据此认为文件有效。",
   "evidence": {},
   "should_downgrade": false
  },
  {
   "policy_id": "xm-participate-guide",
   "doc_number": "厦门市民专属参保指南",
   "current_status": "active",
   "status_verdict": "unknown",
   "evidence_layer": "无反查证据",
   "note": "未找到任何状态反查证据（既无有效性元数据，也未进清理目录，库内也无沿革链）。不得据此认为文件有效。",
   "evidence": {},
   "should_downgrade": false
  },
  {
   "policy_id": "xm-hrss-cleanup",
   "doc_number": "规范性文件清理目录",
   "current_status": "active",
   "status_verdict": "unknown",
   "evidence_layer": "无反查证据",
   "note": "未找到任何状态反查证据（既无有效性元数据，也未进清理目录，库内也无沿革链）。不得据此认为文件有效。",
   "evidence": {},
   "should_downgrade": false
  },
  {
   "policy_id": "xm-resident-guide",
   "doc_number": "6.1.6 城乡居民医疗保险参保(缴费)",
   "current_status": "active",
   "status_verdict": "unknown",
   "evidence_layer": "无反查证据",
   "note": "未找到任何状态反查证据（既无有效性元数据，也未进清理目录，库内也无沿革链）。不得据此认为文件有效。",
   "evidence": {},
   "should_downgrade": false
  },
  {
   "policy_id": "xm-resident-enroll-2026",
   "doc_number": "2026年居民医保集中参保缴费期 缴费指引",
   "current_status": "active",
   "status_verdict": "unknown",
   "evidence_layer": "无反查证据",
   "note": "未找到任何状态反查证据（既无有效性元数据，也未进清理目录，库内也无沿革链）。不得据此认为文件有效。",
   "evidence": {},
   "should_downgrade": false
  },
  {
   "policy_id": "xm-resident-policy-interpret",
   "doc_number": "厦医保〔2025〕86号 政策解读",
   "current_status": "active",
   "status_verdict": "unknown",
   "evidence_layer": "无反查证据",
   "note": "未找到任何状态反查证据（既无有效性元数据，也未进清理目录，库内也无沿革链）。不得据此认为文件有效。",
   "evidence": {},
   "should_downgrade": false
  },
  {
   "policy_id": "xm-medical-continuity",
   "doc_number": "医保连续缴费与转移接续 官方提示",
   "current_status": "active",
   "status_verdict": "unknown",
   "evidence_layer": "无反查证据",
   "note": "未找到任何状态反查证据（既无有效性元数据，也未进清理目录，库内也无沿革链）。不得据此认为文件有效。",
   "evidence": {},
   "should_downgrade": false
  },
  {
   "policy_id": "xm-flexible-commitment",
   "doc_number": "灵活就业参保承诺制 12345热线官方答复",
   "current_status": "active",
   "status_verdict": "unknown",
   "evidence_layer": "无反查证据",
   "note": "未找到任何状态反查证据（既无有效性元数据，也未进清理目录，库内也无沿革链）。不得据此认为文件有效。",
   "evidence": {},
   "should_downgrade": false
  },
  {
   "policy_id": "fj-minwage-2025-14",
   "doc_number": "闽人社文〔2025〕14号",
   "current_status": "active",
   "status_verdict": "unknown",
   "evidence_layer": "无反查证据",
   "note": "未找到任何状态反查证据（既无有效性元数据，也未进清理目录，库内也无沿革链）。不得据此认为文件有效。",
   "evidence": {},
   "should_downgrade": false
  },
  {
   "policy_id": "xm-yb-2026-90",
   "doc_number": "厦医保〔2026〕90号",
   "current_status": "active",
   "status_verdict": "unknown",
   "evidence_layer": "无反查证据",
   "note": "未找到任何状态反查证据（既无有效性元数据，也未进清理目录，库内也无沿革链）。不得据此认为文件有效。",
   "evidence": {},
   "should_downgrade": false
  },
  {
   "policy_id": "xm-chc-2026-3",
   "doc_number": "厦医保规〔2026〕3号",
   "current_status": "active",
   "status_verdict": "unknown",
   "evidence_layer": "无反查证据",
   "note": "未找到任何状态反查证据（既无有效性元数据，也未进清理目录，库内也无沿革链）。不得据此认为文件有效。",
   "evidence": {},
   "should_downgrade": false
  },
  {
   "policy_id": "xm-yb-2025-86",
   "doc_number": "厦医保〔2025〕86号",
   "current_status": "active",
   "status_verdict": "valid",
   "evidence_layer": "L-1 文件有效性元数据",
   "note": "该文件页面「有效性」字段标注为「有效」，为发布机关自身声明。",
   "evidence": {
    "L1_validity_field": {
     "validity": "有效",
     "doc_number": "厦医保〔2025〕86号",
     "title": "厦门市医疗保障局 厦门市财政局 国家税务总局厦门市税务局关于调整居民医保参保政策的通知",
     "source": "xm-yb-2025-86.txt"
    }
   },
   "should_downgrade": false
  },
  {
   "policy_id": "xm-yb-2026-24",
   "doc_number": "厦医保〔2026〕24号",
   "current_status": "active",
   "status_verdict": "valid",
   "evidence_layer": "L-1 文件有效性元数据",
   "note": "该文件页面「有效性」字段标注为「有效」，为发布机关自身声明。",
   "evidence": {
    "L1_validity_field": {
     "validity": "有效",
     "doc_number": "厦医保〔2026〕24号",
     "title": "厦门市医疗保障局 厦门市财政局 国家税务总局厦门市税务局转发福建省医疗保障局等三部门关于完善生育保险参保缴费和待遇享受等有关问题的通知",
     "source": "xm-yb-2026-24.txt"
    }
   },
   "should_downgrade": false
  },
  {
   "policy_id": "xm-yb-2025-96",
   "doc_number": "厦医保〔2025〕96号",
   "current_status": "active",
   "status_verdict": "unknown",
   "evidence_layer": "无反查证据",
   "note": "未找到任何状态反查证据（既无有效性元数据，也未进清理目录，库内也无沿革链）。不得据此认为文件有效。",
   "evidence": {},
   "should_downgrade": false
  },
  {
   "policy_id": "xm-unemp-claim-guide",
   "doc_number": "失业保险金申领 办事指南（思明区）",
   "current_status": "active",
   "status_verdict": "unknown",
   "evidence_layer": "无反查证据",
   "note": "未找到任何状态反查证据（既无有效性元数据，也未进清理目录，库内也无沿革链）。不得据此认为文件有效。",
   "evidence": {},
   "should_downgrade": false
  },
  {
   "policy_id": "xm-pension-retire-guide",
   "doc_number": "企业职工退休—养老保险待遇申领 办事指南",
   "current_status": "active",
   "status_verdict": "unknown",
   "evidence_layer": "无反查证据",
   "note": "未找到任何状态反查证据（既无有效性元数据，也未进清理目录，库内也无沿革链）。不得据此认为文件有效。",
   "evidence": {},
   "should_downgrade": false
  },
  {
   "policy_id": "xm-resident-enroll-window-2026",
   "doc_number": "2026年居民医保集中参保缴费期公告",
   "current_status": "active",
   "status_verdict": "unknown",
   "evidence_layer": "无反查证据",
   "note": "未找到任何状态反查证据（既无有效性元数据，也未进清理目录，库内也无沿革链）。不得据此认为文件有效。",
   "evidence": {},
   "should_downgrade": false
  },
  {
   "policy_id": "xm-resident-enroll-window-2027",
   "doc_number": "2027年度居民医保及长护险集中参保缴费期公告",
   "current_status": "active",
   "status_verdict": "unknown",
   "evidence_layer": "无反查证据",
   "note": "未找到任何状态反查证据（既无有效性元数据，也未进清理目录，库内也无沿革链）。不得据此认为文件有效。",
   "evidence": {},
   "should_downgrade": false
  }
 ],
 "validityMeta": {
  "hrss-20200226": {
   "validity": "有效",
   "doc_number": "生成日期",
   "title": "福建省人口与计划生育条例（2022年）",
   "source": "hrss-20200226.txt"
  },
  "hrss-20220424": {
   "validity": "有效",
   "doc_number": "厦人社〔2022〕84号",
   "title": "厦门市人力资源和社会保障局关于公布继续有效、废止和失效的规范性文件目录的通知（截至2021年12月31日）",
   "source": "hrss-20220424.txt"
  },
  "hrss-20220601": {
   "validity": "有效",
   "doc_number": "厦人社〔2022〕134号",
   "title": "厦门市人力资源和社会保障局关于援企业稳就业防失业工作的通知",
   "source": "hrss-20220601.txt"
  },
  "hrss-20221227": {
   "validity": "有效",
   "doc_number": "厦府规〔2022〕15号",
   "title": "厦门市人民政府关于进一步做好被征地人员参加基本养老保险有关工作的通知",
   "source": "hrss-20221227.txt"
  },
  "hrss-20230105": {
   "validity": "未设置",
   "doc_number": "厦人社〔2022〕291号",
   "title": "厦门市人力资源和社会保障局 国家税务总局厦门市税务局关于进一步做好被征地人员参加基本养老保险工作有关经办事项的通知",
   "source": "hrss-20230105.txt"
  },
  "hrss-20230110": {
   "validity": "有效",
   "doc_number": "厦府规〔2022〕16号",
   "title": "厦门市人民政府关于进一步规范企业职工基本养老金计发办法等事项的通知",
   "source": "hrss-20230110.txt"
  },
  "hrss-20230621": {
   "validity": "未设置",
   "doc_number": "厦人社〔2023〕126号",
   "title": "厦门市人力资源和社会保障局关于公布继续有效、废止和失效的规范性文件目录的通知（截至2021年12月31日）",
   "source": "hrss-20230621.txt"
  },
  "hrss-20240126": {
   "validity": "未设置",
   "doc_number": "厦委人才〔2024〕1号",
   "title": "中共厦门市委人才工作领导小组关于印发《关于加强新时代高技能人才队伍建设的实施方案》的通知",
   "source": "hrss-20240126.txt"
  },
  "hrss-20250328": {
   "validity": "未设置",
   "doc_number": "厦府规〔2025〕2号",
   "title": "厦门市人民政府关于印发退休人员社会化管理服务办法的通知",
   "source": "hrss-20250328.txt"
  },
  "hrss-20250709": {
   "validity": "未设置",
   "doc_number": "厦人社〔2025〕100号",
   "title": "厦门市人力资源和社会保障局关于公布2025年厦门市职业技能培训需求（含急需紧缺工种）指导目录的通知",
   "source": "hrss-20250709.txt"
  },
  "hrss-20251016": {
   "validity": "有效",
   "doc_number": "厦府办规〔2025〕11号",
   "title": "厦门市人民政府办公厅关于印发高层次留学人员生活津贴发放办法的通知",
   "source": "hrss-20251016.txt"
  },
  "hrss-20260331": {
   "validity": "有效",
   "doc_number": "厦人社规〔2025〕3号",
   "title": "厦门市人力资源和社会保障局关于修改《厦门市职业能力建设领域民办学校事中事后监管办法》部分条款的通知",
   "source": "hrss-20260331.txt"
  },
  "hrss-20260818": {
   "validity": "未设置",
   "doc_number": "生成日期",
   "title": "关于支持青年人才来厦发展的若干措施",
   "source": "hrss-20260818.txt"
  },
  "hrss-20261010": {
   "validity": "未设置",
   "doc_number": "厦府〔2026〕246号",
   "title": "厦门市人民政府关于印发《厦门市“十五五”人力资源和社会保障事业发展专项规划》的通知",
   "source": "hrss-20261010.txt"
  },
  "xm-resident-policy-interpret": {
   "validity": "有效",
   "doc_number": "生成日期",
   "title": "《厦门市医疗保障局 厦门市财政局 国家税务总局厦门市税务局关于调整居民医保参保政策的通知》政策解读",
   "source": "xm-resident-policy-interpret.txt"
  },
  "xm-yb-2019-126": {
   "validity": "失效",
   "doc_number": "厦医保〔2019〕126号",
   "title": "厦门市医疗保障局 厦门市财政局 国家税务总局厦门市税务局关于转发福建省全面推进生育保险与职工基本医疗保险合并实施工作方案的通知",
   "source": "xm-yb-2019-126.txt"
  },
  "xm-yb-2025-86": {
   "validity": "有效",
   "doc_number": "厦医保〔2025〕86号",
   "title": "厦门市医疗保障局 厦门市财政局 国家税务总局厦门市税务局关于调整居民医保参保政策的通知",
   "source": "xm-yb-2025-86.txt"
  },
  "xm-yb-2026-24": {
   "validity": "有效",
   "doc_number": "厦医保〔2026〕24号",
   "title": "厦门市医疗保障局 厦门市财政局 国家税务总局厦门市税务局转发福建省医疗保障局等三部门关于完善生育保险参保缴费和待遇享受等有关问题的通知",
   "source": "xm-yb-2026-24.txt"
  }
 },
 "syncState": {
  "sources": {
   "xm-yb-2026-rate": {
    "sha256": "488a1c66f07c2a2d6e613c156443364bc83e9063028babe11819f006c2e02891",
    "fetched_at": "2026-10-25T00:13:16+08:00",
    "doc_number": "厦医保公告 2026年度职工基本医疗保险缴费率",
    "url": "https://ylbz.xm.gov.cn/zwgk/tzgg/202512/t20251231_2975001.htm",
    "unchanged_since": "2026-10-25T00:12:00+08:00"
   },
   "fj-minwage-2025-14": {
    "sha256": "a73dda11ae25b7736e557c7fa48b390a5bd06666bf181de590224a8edc772418",
    "fetched_at": "2026-10-25T00:12:01+08:00",
    "doc_number": "闽人社文〔2025〕14号",
    "url": "https://www.xiangan.gov.cn/zwgk/jycy/zcwj/202502/t20250212_1089240.htm",
    "unchanged_since": "2026-10-25T00:10:45+08:00"
   },
   "fj-one-flexible": {
    "sha256": "04e71673c83bd1b9f0ad77b0007494253480bcd0152e322e887d32879b188743",
    "fetched_at": "2026-10-25T00:12:01+08:00",
    "doc_number": "福建省网上办事大厅 灵活就业一件事",
    "url": "https://zwfw.fujian.gov.cn:1001/OnebusinessCate/efficiently-thing/flexible-employment/",
    "unchanged_since": "2026-10-25T00:10:46+08:00"
   },
   "fj-one-list": {
    "sha256": "83b58cc907076fb231607398388b09f04b5f525795f7bf66c11e5d5943f015e7",
    "fetched_at": "2026-10-25T00:12:02+08:00",
    "doc_number": "福建省网上办事大厅 一件事目录",
    "url": "https://zwfw.fujian.gov.cn:1001/OnebusinessCate/unite-list/?cityCode=350200000000",
    "unchanged_since": "2026-10-25T00:10:46+08:00"
   },
   "fj-rst-2026-13": {
    "sha256": "9e3a23321a420f9a07c556673bef67412ec1fca77329d35d2c6b205fa55b6f81",
    "fetched_at": "2026-10-25T00:12:03+08:00",
    "doc_number": "闽人社文〔2026〕13号",
    "url": "https://hrss.xm.gov.cn/xxgk/sjwj/202610/t20261009_3020482.htm",
    "unchanged_since": "2026-10-25T00:10:47+08:00"
   },
   "xm-chc-2026-3": {
    "sha256": "bf5c3082908ab9fa3fd08b4e7c3e4e5e5fdc1fdb0a63a54d4ca6086546bb7290",
    "fetched_at": "2026-10-25T00:12:04+08:00",
    "doc_number": "厦医保规〔2026〕3号",
    "url": "https://ylbz.xm.gov.cn/zwgk/zfxxgk/zc/ybzcfg/202610/t20261010_3020656.htm",
    "unchanged_since": "2026-10-25T00:10:48+08:00"
   },
   "xm-chc-interpret": {
    "sha256": "c10371d76390864c3a494d7f44cebc16db0ff895c6d672d55dd934819b95f6a3",
    "fetched_at": "2026-10-25T00:12:04+08:00",
    "doc_number": "厦医保规〔2026〕3号 政策解读",
    "url": "https://ylbz.xm.gov.cn/zwgk/zfxxgk/ml/zcwj/zcjd/202610/t20261010_3020657.htm",
    "unchanged_since": "2026-10-25T00:10:49+08:00"
   },
   "xm-gb-2025-2": {
    "sha256": "2bdd616e06190624ba2164c9db9944768ce37a32bd9e4035fc5d88ad81c8493c",
    "fetched_at": "2026-10-25T00:12:06+08:00",
    "doc_number": "厦府规〔2025〕2号",
    "url": "https://www.xm.gov.cn/zwgk/flfg/sfwj/202503/P020250301753539408346.pdf",
    "unchanged_since": "2026-10-25T00:10:50+08:00"
   },
   "xm-hrss-cleanup": {
    "sha256": "2ef06ad98173cee9050f8f27b5920f147fc275e304bf7ca18d1feb32f3e62d05",
    "fetched_at": "2026-10-25T00:12:06+08:00",
    "doc_number": "规范性文件清理目录",
    "url": "https://hrss.xm.gov.cn/xxgk/zfxxgkzl/zfxxgkml/zcfg/qtwj/",
    "unchanged_since": "2026-10-25T00:10:51+08:00"
   },
   "xm-hrss-policy": {
    "sha256": "5ec4047e54bd46107fea7e0b90adae453fcdd2d3b2b2bbe6ac08ec6a8d62ce02",
    "fetched_at": "2026-10-25T00:12:07+08:00",
    "doc_number": "厦门市人社局政策法规库",
    "url": "https://hrss.xm.gov.cn/xxgk/zcfg/",
    "unchanged_since": "2026-10-25T00:10:51+08:00"
   },
   "xm-participate-guide": {
    "sha256": "97cc5bdd9e01e0fbf7155d7dcfc09140989a18ebba40f27d318c03eecc97fb95",
    "fetched_at": "2026-10-25T00:12:13+08:00",
    "doc_number": "厦门市民专属参保指南",
    "url": "https://cloud.xm.gov.cn/165/service/2776639.xhtml",
    "unchanged_since": "2026-10-25T00:10:58+08:00"
   },
   "xm-pension-official-guide": {
    "sha256": "a682a54052ef7104f2a330ac0c06933aa2e9c555114bbbb5ec15e0da18b0ae8a",
    "fetched_at": "2026-10-25T00:12:14+08:00",
    "doc_number": "灵活就业人员 养老保险参保指引",
    "url": "https://cloud.xm.gov.cn/165/service/2810450.xhtml",
    "unchanged_since": "2026-10-25T00:10:59+08:00"
   },
   "xm-pension-transfer-interpret": {
    "sha256": "459cee37d3a66b032a76b30a858cd24142e4b564377c8eb6be7960ec8bafe8c5",
    "fetched_at": "2026-10-25T00:12:31+08:00",
    "doc_number": "养老保险转移、退保、继承政策解读",
    "url": "https://www.haicang.gov.cn/hdjl/zxft/202512/t20251205_1129768.htm",
    "unchanged_since": "2026-10-25T00:11:15+08:00"
   },
   "xm-residence-pension-interpret": {
    "sha256": "4c8f92673b7cc2ee962446226689fb4a02b0ee0ff3b1e41e8b929aeb0f3a2f97",
    "fetched_at": "2026-10-25T00:12:32+08:00",
    "doc_number": "居住证人员参加企业职工基本养老保险 解读",
    "url": "https://hrss.xm.gov.cn/gzcy/zxft/jdcxmjzzkcb",
    "unchanged_since": "2026-10-25T00:11:16+08:00"
   },
   "xm-resident-guide": {
    "sha256": "dd5bdd21459351cd45146e9dea5ee6e49f48af58c70525437eb84dfb84425f00",
    "fetched_at": "2026-10-25T00:12:49+08:00",
    "doc_number": "6.1.6 城乡居民医疗保险参保(缴费)",
    "url": "https://cloud.xm.gov.cn/165/service/2776119.xhtml",
    "unchanged_since": "2026-10-25T00:11:34+08:00"
   },
   "xm-waitperiod": {
    "sha256": "243a186a827c04aa009a2e869a792f716813f43ca13320f53204ed19422f79d0",
    "fetched_at": "2026-10-25T00:13:05+08:00",
    "doc_number": "待遇等待期与两大激励 官方答疑",
    "url": "https://ylbz.xm.gov.cn/zwgk/ybdt/202512/t20251201_2969555.htm",
    "unchanged_since": "2026-10-25T00:11:50+08:00"
   },
   "xm-yb-2019-126": {
    "sha256": "9a156dcbc9161678fa27c7f937488ca4a348be1532e5ea878fc319a04a77c5a0",
    "fetched_at": "2026-10-25T00:13:05+08:00",
    "doc_number": "厦医保〔2019〕126号",
    "url": "https://ylbz.xm.gov.cn/zwgk/zfxxgk/ml/zcwj/zcfg/201912/t20191230_2412046.htm",
    "unchanged_since": "2026-10-25T00:11:51+08:00"
   },
   "xm-yb-2022-12": {
    "sha256": "86eb51fe0dde3f28f3bf31af97c421dad6d0df5e04b198262be3ca4a06729c7d",
    "fetched_at": "2026-10-25T00:13:07+08:00",
    "doc_number": "厦府规〔2022〕12号",
    "url": "https://www.xm.gov.cn/zfgb/99833450",
    "unchanged_since": "2026-10-25T00:11:52+08:00"
   },
   "xm-yb-2025-7": {
    "sha256": "57191a863d229c900171a03895aec6809f9c347cd29ebdf0b06dfc1bf2285d38",
    "fetched_at": "2026-10-25T00:13:08+08:00",
    "doc_number": "厦府规〔2025〕7号",
    "url": "https://www.xm.gov.cn/zfgb/99833863",
    "unchanged_since": "2026-10-25T00:11:53+08:00"
   },
   "xm-yb-2025-86": {
    "sha256": "1d22aab76fb71d4bc510290799f8cc79b4a19cf1524a2d68cf5cc27bb2283c80",
    "fetched_at": "2026-10-25T00:13:08+08:00",
    "doc_number": "厦医保〔2025〕86号",
    "url": "https://ylbz.xm.gov.cn/zwgk/zfxxgk/ml/zcwj/zcfg/202508/t20250814_2950409.htm",
    "unchanged_since": "2026-10-25T00:11:54+08:00"
   },
   "xm-yb-2025-96": {
    "sha256": "d364b739c2653860701cfff0f75b34cb7ee9ba5ab25835dc0b5749d1e7aa9592",
    "fetched_at": "2026-10-25T00:13:09+08:00",
    "doc_number": "厦医保〔2025〕96号",
    "url": "https://ylbz.xm.gov.cn/zwgk/tpxw/202510/t20251023_2962144.htm",
    "unchanged_since": "2026-10-25T00:11:55+08:00"
   },
   "xm-yb-2025-rate": {
    "sha256": "82d70cb044df5732bc537a3fa155fd38d726792da4c3412207ef8442c871f97e",
    "fetched_at": "2026-10-25T00:13:10+08:00",
    "doc_number": "厦医保 2025年度职工基本医疗保险缴费率",
    "url": "https://ylbz.xm.gov.cn/zwgk/zfxxgk/zc/ybzcfg/202501/t20250127_2915362.htm",
    "unchanged_since": "2026-10-25T00:11:55+08:00"
   },
   "xm-yb-2026-13": {
    "sha256": "86ec32d96af7c36f6f7db13e1f8f7a16b03febd333f5e476d584c89309e6b991",
    "fetched_at": "2026-10-25T00:13:13+08:00",
    "doc_number": "闽医保〔2026〕13号",
    "url": "https://ylbz.xm.gov.cn/zwgk/zfxxgk/ml/zcwj/qtwj/202603/P020260313526925372654.pdf",
    "unchanged_since": "2026-10-25T00:11:58+08:00"
   },
   "xm-yb-2026-24": {
    "sha256": "e0be60227abee8067ccdaab0e1d6cc3fabab7babc807546eb1d60a2628272e3e",
    "fetched_at": "2026-10-25T00:13:14+08:00",
    "doc_number": "厦医保〔2026〕24号",
    "url": "https://ylbz.xm.gov.cn/zwgk/zfxxgk/ml/zcwj/qtwj/202603/t20260313_2985345.htm",
    "unchanged_since": "2026-10-25T00:11:58+08:00"
   },
   "xm-yb-2026-90": {
    "sha256": "8a7252a801b78ec0679b8510eed3fe053c44ab0333465f845b450278551dfdd7",
    "fetched_at": "2026-10-25T00:13:15+08:00",
    "doc_number": "厦医保〔2026〕90号",
    "url": "https://ylbz.xm.gov.cn/zwgk/zfxxgk/ml/zcwj/qtwj/202610/t20261013_3021006.htm",
    "unchanged_since": "2026-10-25T00:11:59+08:00"
   },
   "xm-pension-retire-guide": {
    "sha256": "ff7427d3aaf4f1404e2c0a9657d305da8f57a402da440d96a9ad79fafb453be0",
    "fetched_at": "2026-10-25T00:12:30+08:00",
    "doc_number": "企业职工退休—养老保险待遇申领 办事指南",
    "url": "https://siming.gov.cn/wsbs/ztfw/sb/nrrh/202411/t20241119_1078974.htm?PROTID=6713",
    "unchanged_since": "2026-10-25T00:11:14+08:00"
   },
   "xm-unemp-claim-guide": {
    "sha256": "9d100c167929928aa9687ea39fbd7e0186da1a8e175976b0744f875f8f2b2e6d",
    "fetched_at": "2026-10-25T00:13:04+08:00",
    "doc_number": "失业保险金申领 办事指南（思明区）",
    "url": "https://www.siming.gov.cn/wsbs/ztfw/sb/nrrh/202309/t20230913_930369.htm",
    "unchanged_since": "2026-10-25T00:11:49+08:00"
   }
  },
  "last_sync": "2026-10-25T00:13:16+08:00",
  "history": [
   {
    "at": "2026-10-24T23:44:25+08:00",
    "changed": 1,
    "committed": 1,
    "unreachable": 2
   },
   {
    "at": "2026-10-24T23:57:24+08:00",
    "changed": 0,
    "committed": 0,
    "unreachable": 5
   },
   {
    "at": "2026-10-25T00:01:00+08:00",
    "changed": 3,
    "committed": 0,
    "unreachable": 1
   },
   {
    "at": "2026-10-25T00:04:43+08:00",
    "changed": 2,
    "committed": 0,
    "unreachable": 1
   },
   {
    "at": "2026-10-25T00:06:52+08:00",
    "changed": 0,
    "committed": 0,
    "unreachable": 1
   },
   {
    "at": "2026-10-25T00:09:04+08:00",
    "changed": 0,
    "committed": 0,
    "unreachable": 1
   },
   {
    "at": "2026-10-25T00:12:00+08:00",
    "changed": 0,
    "committed": 0,
    "unreachable": 1
   },
   {
    "at": "2026-10-25T00:13:16+08:00",
    "changed": 0,
    "committed": 0,
    "unreachable": 1
   }
  ]
 }
};
