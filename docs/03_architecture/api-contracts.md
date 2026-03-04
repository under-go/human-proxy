---
version: 0.1.0
last_updated: 2026-03-04
owner: Human Proxy Engineering
status: draft
---

# API Contracts

## 1. 인증 헤더
- Agent API(`POST/PUT/PATCH/DELETE`): `X-HP-API-KEY`, `X-HP-TIMESTAMP`, `X-HP-NONCE`, `X-HP-SIGNATURE`, `Idempotency-Key`
- Agent API(`GET`): `X-HP-API-KEY`, `X-HP-TIMESTAMP`, `X-HP-NONCE`, `X-HP-SIGNATURE`
- Owner/Worker API: `Authorization: Bearer <token>`
- Latpeed webhook: `X-LATPEED-TIMESTAMP`, `X-LATPEED-SIGNATURE`

## 2. AI 도입자 API
- `POST /v1/agent/tasks`
- `GET /v1/agent/tasks/{taskId}`
- `POST /v1/agent/tasks/{taskId}/review`
- `POST /v1/agent/webhooks/subscriptions`

## 3. 작업자 API
- `GET /v1/jobs/open`
- `POST /v1/jobs/{taskId}/accept`
- `POST /v1/jobs/{taskId}/submissions`
- `POST /v1/jobs/{taskId}/withdraw`

## 4. 결제/정산 API
- `POST /v1/payments/latpeed/webhook`
- `GET /v1/wallet/ledger`
- `GET /v1/settlements`
- `POST /v1/disputes`

## 5. 응답 규약
- 모든 에러는 `code`, `message`, `traceId`, `details` 구조 사용
- 상태 변경 API는 멱등성 키 요구(Agent mutating endpoints)
- 금액은 소수 오차 방지를 위해 정수 최소화폐단위 사용

## 6. 버전 관리
- URI 버전(`/v1`) + OpenAPI 스키마 버전 태깅
- 브레이킹 변경은 새 버전으로만 반영
