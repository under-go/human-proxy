#!/usr/bin/env bash
set -euo pipefail

base_ref="${GITHUB_BASE_REF:-main}"
git fetch origin "$base_ref" >/dev/null 2>&1 || true

if git rev-parse --verify "origin/$base_ref" >/dev/null 2>&1; then
  changed=$(git diff --name-only "origin/$base_ref...HEAD" || true)
elif git rev-parse --verify "HEAD~1" >/dev/null 2>&1; then
  changed=$(git diff --name-only "HEAD~1...HEAD" || true)
else
  changed=$(git diff --name-only || true)
fi

echo "Changed files:"
echo "$changed"

if echo "$changed" | grep -Eqi '(^apps/api/.*(payment|ledger|auth|security))|(^infra/)|(^\.github/workflows/)'; then
  echo "HIGH_RISK=true"
else
  echo "HIGH_RISK=false"
fi
