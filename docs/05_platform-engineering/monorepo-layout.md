---
version: 0.1.0
last_updated: 2026-03-04
owner: Human Proxy Platform
status: draft
---

# Monorepo Layout

## 1. 폴더 구조
- `apps/web`: Next.js 앱
- `apps/api`: Spring Boot 앱
- `infra/terraform`: IaC
- `infra/k8s`: Helm/ArgoCD 매니페스트
- `platform/scripts`: 운영 자동화 스크립트
- `docs`: 제품/기술/운영 문서

## 2. 소유권
- Web팀: `apps/web`
- Backend팀: `apps/api`
- Platform팀: `infra/*`, `.github/workflows`
- 공통: `docs/*`

## 3. 변경 규칙
- 결제/원장/보안 영역은 CODEOWNERS 리뷰 필수
- 크로스 모듈 변경 시 ADR 링크 필수
