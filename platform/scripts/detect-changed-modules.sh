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

for m in apps/web apps/api infra docs; do
  key="${m//\//_}"
  if echo "$changed" | grep -q "^$m/"; then
    echo "$key=true"
  else
    echo "$key=false"
  fi
done
