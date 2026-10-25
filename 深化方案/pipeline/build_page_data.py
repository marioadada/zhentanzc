#!/usr/bin/env python3
"""生成网页端数据包 policy_data.js

把 policy_db / param_table / cases / service_layer / sync_state / status_check
打包成一个 JS 文件，页面直接 <script src> 引入。

关键设计：页面里的判定逻辑与 Python 引擎同源同语义 —— 数据从同一份库里出，
参数不硬编码在页面里。
"""
import json
import os
from datetime import datetime, timezone, timedelta

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DB = os.path.join(ROOT, "policy_db")
OUT = os.path.join(ROOT, "web", "policy_data.js")
TZ = timezone(timedelta(hours=8))

# 判定式在 Python 里的实现（engine.py）→ 页面端的等价实现
# 两者共用同一份 param_table 与 cases，因此答案必然一致。
# 差异仅在于：Python 端是命令行演示，页面端是交互。

COLLECTIONS = {
    "policies": "policy_db.json",
    "paramTable": "param_table.json",
    "cases": "cases.json",
    "serviceLayer": "service_layer.json",
    "statusCheck": "status_check.json",
    "validityMeta": "validity_meta.json",
    "syncState": "sync_state.json",
}


def main():
    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    bundle = {}
    for key, fn in COLLECTIONS.items():
        p = os.path.join(DB, fn)
        if os.path.exists(p):
            bundle[key] = json.load(open(p, encoding="utf-8"))
        else:
            bundle[key] = None

    # 同步元信息：页面顶部要显示"数据同步至 X"
    st = bundle.get("syncState") or {}
    srcs = st.get("sources") or {}
    fetched = [v.get("fetched_at") for v in srcs.values() if v.get("fetched_at")]
    last_sync = max(fetched) if fetched else st.get("last_sync")

    meta = {
        "generated_at": datetime.now(TZ).isoformat(timespec="seconds"),
        "last_sync": last_sync,
        "tracked_sources": len(srcs),
        "policy_count": len(bundle.get("policies") or {}),
        "clause_count": sum(len(p.get("clauses", []))
                           for p in (bundle.get("policies") or {}).values()),
        "param_count": len(bundle.get("paramTable") or []),
        "case_count": len(bundle.get("cases") or []),
        "source_tiers": {
            "L1": "规范性文件正文",
            "L2": "办事指南与事项",
            "L3": "官方参数表",
            "L4": "官方解释与效力状态",
        },
    }

    with open(OUT, "w", encoding="utf-8") as f:
        f.write("// 本文件由 pipeline/build_page_data.py 自动生成，请勿手改\n")
        f.write("window.POLICY_DATA = ")
        json.dump({"meta": meta, **bundle}, f, ensure_ascii=False, indent=1)
        f.write(";\n")

    size = os.path.getsize(OUT)
    print(f"-> {OUT}  ({size/1024:.1f} KB)")
    print(f"   同步至 {last_sync} · 追踪 {meta['tracked_sources']} 源 · "
          f"{meta['policy_count']} 政策 · {meta['clause_count']} 条款 · "
          f"{meta['param_count']} 参数 · {meta['case_count']} 判定式")


if __name__ == "__main__":
    main()
