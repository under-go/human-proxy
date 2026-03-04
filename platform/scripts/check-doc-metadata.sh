#!/usr/bin/env bash
set -euo pipefail

fail=0
for f in $(find docs -type f -name '*.md' ! -path 'docs/index.md'); do
  if ! head -n 6 "$f" | grep -q '^version:'; then
    echo "[ERROR] missing version header: $f"
    fail=1
  fi
  if ! head -n 6 "$f" | grep -q '^last_updated:'; then
    echo "[ERROR] missing last_updated header: $f"
    fail=1
  fi
  if ! head -n 6 "$f" | grep -q '^owner:'; then
    echo "[ERROR] missing owner header: $f"
    fail=1
  fi
done

if [ "$fail" -ne 0 ]; then
  exit 1
fi

echo "All docs metadata headers are present."
