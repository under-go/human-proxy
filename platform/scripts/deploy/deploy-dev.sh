#!/usr/bin/env bash
set -euo pipefail

script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
repo_root="$(cd "$script_dir/../../.." && pwd)"
compose_file="$repo_root/infra/compose/docker-compose.dev.yml"
env_file="${DEPLOY_ENV_FILE:-$repo_root/infra/compose/dev.env}"
nginx_template="$repo_root/infra/nginx/templates/human-proxy.conf.template"
nginx_runtime_dir="${NGINX_RUNTIME_DIR:-$repo_root/.runtime/nginx}"
nginx_conf_dir="$nginx_runtime_dir/conf.d"
nginx_acme_dir="$nginx_runtime_dir/acme"
nginx_cert_dir="$nginx_runtime_dir/certs"
nginx_letsencrypt_dir="$nginx_runtime_dir/letsencrypt"

is_ipv4() {
  [[ "$1" =~ ^([0-9]{1,3}\.){3}[0-9]{1,3}$ ]]
}

ensure_runtime_dirs() {
  mkdir -p "$nginx_conf_dir" "$nginx_acme_dir" "$nginx_cert_dir" "$nginx_letsencrypt_dir"
}

render_nginx_config() {
  if [[ ! -f "$nginx_template" ]]; then
    echo "[ERROR] nginx template not found: $nginx_template" >&2
    exit 1
  fi

  sed "s|__PUBLIC_HOST__|$PUBLIC_HOST|g" "$nginx_template" > "$nginx_conf_dir/human-proxy.conf"
}

create_self_signed_cert() {
  if [[ -f "$nginx_cert_dir/fullchain.pem" && -f "$nginx_cert_dir/privkey.pem" ]]; then
    return
  fi

  tmp_openssl_cfg="$(mktemp)"
  if is_ipv4 "$PUBLIC_HOST"; then
    san_entry="IP.1 = $PUBLIC_HOST"
  else
    san_entry="DNS.1 = $PUBLIC_HOST"
  fi

  cat > "$tmp_openssl_cfg" <<EOF
[req]
prompt = no
distinguished_name = dn
x509_extensions = v3_req

[dn]
CN = $PUBLIC_HOST

[v3_req]
subjectAltName = @alt_names

[alt_names]
$san_entry
EOF

  openssl req -x509 -nodes -newkey rsa:2048 -days "${SELF_SIGNED_DAYS:-30}" \
    -keyout "$nginx_cert_dir/privkey.pem" \
    -out "$nginx_cert_dir/fullchain.pem" \
    -config "$tmp_openssl_cfg" \
    -extensions v3_req >/dev/null 2>&1

  rm -f "$tmp_openssl_cfg"
  chmod 600 "$nginx_cert_dir/privkey.pem"
}

issue_letsencrypt_cert() {
  if [[ "${TLS_MODE:-self_signed}" != "letsencrypt" ]]; then
    return
  fi

  if is_ipv4 "$PUBLIC_HOST"; then
    echo "[WARN] PUBLIC_HOST is an IP. Let's Encrypt cannot issue certs for bare IPv4. Keep using self-signed."
    return
  fi

  if [[ -z "${LETSENCRYPT_EMAIL:-}" ]]; then
    echo "[ERROR] LETSENCRYPT_EMAIL is required when TLS_MODE=letsencrypt" >&2
    exit 1
  fi

  docker run --rm \
    -v "$nginx_acme_dir:/var/www/certbot" \
    -v "$nginx_letsencrypt_dir:/etc/letsencrypt" \
    certbot/certbot certonly \
      --webroot \
      --webroot-path /var/www/certbot \
      --non-interactive \
      --agree-tos \
      --email "$LETSENCRYPT_EMAIL" \
      --cert-name human-proxy-dev \
      -d "$PUBLIC_HOST"

  cp "$nginx_letsencrypt_dir/live/human-proxy-dev/fullchain.pem" "$nginx_cert_dir/fullchain.pem"
  cp "$nginx_letsencrypt_dir/live/human-proxy-dev/privkey.pem" "$nginx_cert_dir/privkey.pem"
  chmod 600 "$nginx_cert_dir/privkey.pem"

  docker compose --env-file "$env_file" -f "$compose_file" exec -T nginx nginx -s reload
}

if [[ ! -f "$compose_file" ]]; then
  echo "[ERROR] compose file not found: $compose_file" >&2
  exit 1
fi

if [[ ! -f "$env_file" ]]; then
  echo "[ERROR] env file not found: $env_file" >&2
  echo "Copy infra/compose/dev.env.example to infra/compose/dev.env first." >&2
  exit 1
fi

if [[ $# -gt 0 ]]; then
  export IMAGE_TAG="$1"
fi

set -a
source "$env_file"
set +a

export IMAGE_TAG="${IMAGE_TAG:-latest}"

required_vars=(
  GHCR_USERNAME
  GHCR_TOKEN
  POSTGRES_PASSWORD
  SPRING_DATASOURCE_PASSWORD
  PUBLIC_HOST
)

if [[ "${BUILD_ON_SERVER:-false}" == "true" ]]; then
  required_vars=(
    POSTGRES_PASSWORD
    SPRING_DATASOURCE_PASSWORD
    PUBLIC_HOST
  )
fi

for var_name in "${required_vars[@]}"; do
  if [[ -z "${!var_name:-}" ]]; then
    echo "[ERROR] required env var is missing: $var_name" >&2
    exit 1
  fi
done

if [[ "${BUILD_ON_SERVER:-false}" != "true" ]]; then
  echo "$GHCR_TOKEN" | docker login ghcr.io -u "$GHCR_USERNAME" --password-stdin
fi

ensure_runtime_dirs
render_nginx_config
create_self_signed_cert

if [[ "${BUILD_ON_SERVER:-false}" == "true" ]]; then
  docker compose --env-file "$env_file" -f "$compose_file" build --pull
else
  docker compose --env-file "$env_file" -f "$compose_file" pull
fi

docker compose --env-file "$env_file" -f "$compose_file" up -d --remove-orphans
docker compose --env-file "$env_file" -f "$compose_file" ps

issue_letsencrypt_cert

echo "[INFO] dev deployment completed with IMAGE_TAG=$IMAGE_TAG"
