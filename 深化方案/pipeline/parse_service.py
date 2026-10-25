#!/usr/bin/env python3
"""解析福建网上办事大厅「一件事」配置 JSON → 结构化办事层条目

对应深化提示词 §3.6 办事层。抽取：
- 联办事项（nodeList）
- 申报材料清单（unifiedMaterialList → materiallList[].materialName）
- 办理时限（baseInfo.promiseDay 工作日）
- 咨询电话（baseInfo.windowPhone）
- 适用条件（baseInfo.condition 原文）
- 常见问题（含官方问答）

数据源接口（由 Playwright 拦截 XHR 取得）：
  https://zwfw.fujian.gov.cn:1001/uopofflineapi/hoox/uop/smp/v1/unite-config?moduleUnid=...
"""
import json
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SNAP = os.path.join(ROOT, "snapshots")
DB = os.path.join(ROOT, "policy_db")


def parse_service_file(path):
    raw = open(path, encoding="utf-8", errors="ignore").read()
    try:
        data = json.loads(raw)["data"]
    except Exception as e:
        return {"error": f"parse_failed: {e}"}
    base = data.get("baseInfo") or {}

    services = []
    for n in data.get("nodeList") or []:
        if n.get("serviceName"):
            services.append(n["serviceName"])

    materials = []
    for grp in data.get("unifiedMaterialList") or []:
        for m in grp.get("materiallList") or []:
            name = (m.get("materialName") or "").strip()
            if name and name not in materials:
                materials.append({
                    "name": name,
                    "copy_num": m.get("copyNum"),
                    "material_id": m.get("hditmDirCode"),
                })

    conditions = []
    cond_raw = (base.get("condition") or "").strip()
    for line in re.split(r"\n+", cond_raw):
        line = line.strip()
        if line:
            conditions.append(line)

    # 常见问题：接口数据里常在 extendContent 或单独字段
    faq = []
    for key in ("questionList", "commonQuestion", "faqList"):
        for q in data.get(key) or []:
            if isinstance(q, dict):
                faq.append({"q": q.get("question") or q.get("title"),
                            "a": q.get("answer") or q.get("content")})
    ec = base.get("extendContent")
    if isinstance(ec, str):
        try:
            ec = json.loads(ec)
        except Exception:
            ec = None
    if isinstance(ec, dict):
        txt = json.dumps(ec, ensure_ascii=False)
        for m in re.finditer(r'"(?:question|title)"\s*:\s*"([^"]{4,80})"', txt):
            faq.append({"q": m.group(1), "a": None})

    return {
        "module_name": base.get("moduleName"),
        "area": base.get("areaName"),
        "module_code": base.get("moduleCode"),
        "catalog_code": base.get("catalogCode"),
        "window_phone": base.get("windowPhone"),
        "promise_days": base.get("promiseDay"),
        "phase_parallel": base.get("phaseParallel"),
        "services": services,
        "materials": materials,
        "conditions": conditions,
        "condition_raw": cond_raw,
        "faq": faq,
        "source_file": os.path.basename(path),
    }


def main():
    src = sys.argv[1] if len(sys.argv) > 1 else os.path.join(SNAP, "xhr_fj-flexible_0.txt")
    out_path = sys.argv[2] if len(sys.argv) > 2 else os.path.join(DB, "service_layer.json")
    svc = parse_service_file(src)
    os.makedirs(DB, exist_ok=True)
    json.dump(svc, open(out_path, "w", encoding="utf-8"), ensure_ascii=False, indent=2)

    print(f"事项：{svc.get('module_name')}")
    print(f"办理时限：{svc.get('promise_days')} 个工作日   咨询电话：{svc.get('window_phone')}")
    print(f"联办事项（{len(svc['services'])}）：")
    for s in svc["services"]:
        print("   -", s)
    print(f"材料清单（{len(svc['materials'])}）：")
    for m in svc["materials"]:
        print("   -", m["name"], f"×{m['copy_num']}" if m.get("copy_num") else "")
    print(f"适用条件（{len(svc['conditions'])} 条）：")
    for c in svc["conditions"]:
        print("   -", c[:100])
    print("-> ", out_path)


if __name__ == "__main__":
    main()
