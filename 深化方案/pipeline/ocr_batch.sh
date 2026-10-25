#!/bin/bash
# 对扫描件 PDF 逐页 OCR 并合并为 .txt
# 用法: ocr_batch.sh <sourceKey>
set -e
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
KEY="$1"
PDF="$ROOT/snapshots/$KEY.pdf"
OUT="$ROOT/snapshots/$KEY.txt"
PAGES="$ROOT/snapshots/ocr_pages"
PY="/Users/dafa/.workbuddy/binaries/python/envs/default/bin/python"

mkdir -p "$PAGES"
"$PY" - "$PDF" "$PAGES" <<'PYEOF'
import pymupdf, os, sys
pdf, out = sys.argv[1], sys.argv[2]
d = pymupdf.open(pdf)
for i in range(d.page_count):
    pix = d[i].get_pixmap(dpi=200)
    pix.save(os.path.join(out, f"p{i+1:02d}.png"))
PYEOF

for img in "$PAGES"/p*.png; do
  [ -f "$img" ] || continue
  "$ROOT/pipeline/ocr" "$img" "${img%.png}.txt" >/dev/null 2>&1 || true
done
cat "$PAGES"/p*.txt > "$OUT" 2>/dev/null || true
echo "OCR done: $(wc -m < "$OUT" | tr -d ' ') chars -> $OUT"
