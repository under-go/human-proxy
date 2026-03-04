#!/usr/bin/env bash
set -euo pipefail

script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
repo_root="$(cd "$script_dir/../../.." && pwd)"
compose_file="$repo_root/infra/compose/docker-compose.dev.yml"
env_file="${DEPLOY_ENV_FILE:-$repo_root/infra/compose/dev.env}"
nginx_runtime_dir="${NGINX_RUNTIME_DIR:-$repo_root/.runtime/nginx}"

if [[ ! -f "$env_file" ]]; then
  echo "[ERROR] env file not found: $env_file" >&2
  exit 1
fi

set -a
source "$env_file"
set +a

if [[ "${TLS_MODE:-self_signed}" != "letsencrypt" ]]; then
  echo "[INFO] TLS_MODE is not letsencrypt. Skip renewal."
  exit 0
fi

if [[ -z "${PUBLIC_HOST:-}" || -z "${LETSENCRYPT_EMAIL:-}" ]]; then
  echo "[ERROR] PUBLIC_HOST and LETSENCRYPT_EMAIL are required for renewal." >&2
  exit 1
fi

docker run --rm \
  -v "$nginx_runtime_dir/acme:/var/www/certbot" \
  -v "$nginx_runtime_dir/letsencrypt:/etc/letsencrypt" \
  certbot/certbot renew --webroot --webroot-path /var/www/certbot --non-interactive

cp "$nginx_runtime_dir/letsencrypt/live/human-proxy-dev/fullchain.pem" "$nginx_runtime_dir/certs/fullchain.pem"
cp "$nginx_runtime_dir/letsencrypt/live/human-proxy-dev/privkey.pem" "$nginx_runtime_dir/certs/privkey.pem"
chmod 600 "$nginx_runtime_dir/certs/privkey.pem"

docker compose --env-file "$env_file" -f "$compose_file" exec -T nginx nginx -t
docker compose --env-file "$env_file" -f "$compose_file" exec -T nginx nginx -s reload

echo "[INFO] certificate renewed and nginx reloaded"
