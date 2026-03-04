# Human Proxy

Human Proxy는 AI가 단독으로 수행하기 어려운 작업을 사람에게 위임하고 결과를 검토/정산할 수 있게 하는 플랫폼입니다.

## Repository Layout
- `apps/web`: Next.js 프론트엔드
- `apps/api`: Spring Boot 백엔드
- `infra/terraform`: 인프라 코드
- `infra/k8s`: Helm/ArgoCD 배포 매니페스트
- `platform/scripts`: 자동화 스크립트
- `docs`: 제품/아키텍처/운영/품질 문서

## Start Here
1. [Documentation Index](./docs/index.md)
2. `docs/01_product/service-scope-mvp.md`
3. `docs/03_architecture/api-contracts.md`
4. `docs/09_agent-enablement/integration-quickstart.md`

## Agent Integration Assets
- `agent-kit/skills/human-proxy-skills.yaml`
- `agent-kit/prompts/orchestrator-system-prompt.md`
- `apps/web/public/llms.txt`
- `apps/web/public/llms-full.md`

## Current Stage
- KR v1 planning pack and delivery scaffolding initialized.

## Toolchain Baseline
- Node.js `22`
- Java `21`
- Gradle Wrapper `8.10.2` (`apps/api/gradlew`)

## Standard Test Commands
- Web unit: `cd apps/web && npm ci && npm run test -- --run`
- Web e2e smoke: `cd apps/web && npm ci && npm run e2e -- -g "@smoke"`
- API: `cd apps/api && ./gradlew test --no-daemon`

CI and local are intentionally aligned to the same command family (`npm ci`, Gradle wrapper).

## CI Failure Classification
- `build-tooling failure`: wrapper/toolchain/setup issues
- `unit regression`: unit/component test failure
- `e2e regression`: browser/user-flow failure
- `infra/network transient`: registry/network/runner flake

## Deployment Paths
- Dev VM (single-server): `infra/compose/docker-compose.dev.yml` + `platform/scripts/deploy/deploy-dev.sh`
- GitOps image build/update (dev): `.github/workflows/deploy-gitops.yml`
- Dev VM auto deploy: `.github/workflows/deploy-dev-vm.yml`
- Staging/Prod manual promotion: `.github/workflows/promote-gitops.yml`

## Dev Traffic Routing
- Nginx terminates TLS on `443`
- API paths (`/v1`, `/internal`, `/actuator`) route to API container
- Other paths route to Web container
- First bootstrap can run with `BUILD_ON_SERVER=true` (server-side image build)
- After CI image pipeline is stable, switch to `BUILD_ON_SERVER=false` (pull by SHA tag)
