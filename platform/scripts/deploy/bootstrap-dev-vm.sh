#!/usr/bin/env bash
set -euo pipefail

if ! command -v docker >/dev/null 2>&1; then
  curl -fsSL https://get.docker.com | sh
fi

if command -v systemctl >/dev/null 2>&1; then
  sudo systemctl enable docker
  sudo systemctl start docker
fi

if ! docker compose version >/dev/null 2>&1; then
  echo "[ERROR] docker compose plugin is missing. Install Docker Compose plugin first." >&2
  exit 1
fi

if ! groups "$USER" | grep -q '\bdocker\b'; then
  sudo usermod -aG docker "$USER"
  echo "[INFO] Added $USER to docker group. Re-login is required for group membership."
fi

echo "[INFO] bootstrap completed"
