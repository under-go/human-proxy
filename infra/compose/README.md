# Dev VM Deployment (Compose + Nginx TLS)

This directory is the single-server `dev` deployment entrypoint.

## Files
- `docker-compose.dev.yml`: web/api/postgres/nginx stack
- `dev.env.example`: required environment variables template
- `infra/nginx/templates/human-proxy.conf.template`: nginx reverse-proxy template

## Prerequisites
- Docker with Compose plugin
- Network access to `ghcr.io`
- Public host or IP with inbound `80/443` open
- For real trusted cert: domain + Let's Encrypt email

## Quick Start
1. Copy `dev.env.example` to `dev.env` and fill real secrets.
2. Choose deployment mode:
   - First bootstrap (no registry credential): `BUILD_ON_SERVER=true`
   - CI images pull mode: `BUILD_ON_SERVER=false`
3. If `BUILD_ON_SERVER=false`, login to GHCR:
   - `echo "$GHCR_TOKEN" | docker login ghcr.io -u "$GHCR_USERNAME" --password-stdin`
4. Start services:
   - `platform/scripts/deploy/deploy-dev.sh <image-tag>`
5. Check status:
   - `docker compose --env-file infra/compose/dev.env -f infra/compose/docker-compose.dev.yml ps`

## Notes
- External requests terminate on nginx at `443`.
- API routes (`/v1`, `/internal`, `/actuator`) are proxied to `api:8080`; everything else goes to `web:3000`.
- Default TLS is self-signed (`TLS_MODE=self_signed`). To use Let's Encrypt set:
  - `TLS_MODE=letsencrypt`
  - `PUBLIC_HOST=<domain>`
  - `LETSENCRYPT_EMAIL=<email>`
- Let's Encrypt renewal command:
  - `platform/scripts/deploy/renew-dev-cert.sh`
