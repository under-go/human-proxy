---
version: 0.1.0
last_updated: 2026-03-04
owner: Human Proxy Backend+Data
status: draft
---

# Data Model and Storage

## 1. 저장소 역할
- PostgreSQL: 트랜잭션/원장/핵심 도메인
- Redis: 캐시, 락, 레이트리밋, 큐 보조
- Object Storage: 제출 이미지/증빙 파일
- OpenSearch: 작업 검색/필터/운영 탐색

## 2. 데이터 정합성 원칙
- 금액 관련 데이터는 단일 트랜잭션 경계에서 처리
- 원장 항목은 append-only
- 정산 상태와 외부 지급 상태를 분리 저장
- 동일 idempotency key는 동일 결과를 보장

## 3. 물리 스키마 위치
- PostgreSQL 기준 베이스라인 SQL:
  - `apps/api/src/main/resources/db/migration/V1__baseline_schema.sql`
- 기준 단위는 KRW 정수(`BIGINT`)이며 소수점 화폐 단위는 사용하지 않음.

## 4. 주요 테이블(초기)
- 계정/권한
  - `accounts`, `account_roles`, `api_credentials`
- 작업 루프
  - `tasks`, `task_assignments`, `submissions`, `reviews`
- 정산/원장
  - `escrow_holds`, `wallet_accounts`, `ledger_entries`
  - `settlement_batches`, `settlement_items`
- 분쟁/이벤트/감사
  - `disputes`, `webhook_subscriptions`, `inbound_webhook_events`
  - `outbox_events`, `audit_logs`

## 5. 상태 컬럼 표준
- `tasks.status`: `OPEN -> CLAIMED -> IN_PROGRESS -> SUBMITTED -> UNDER_REVIEW -> APPROVED|REVISION_REQUESTED|REJECTED -> SETTLED|CLOSED`
- `task_assignments.assignment_status`: `CLAIMED|WITHDRAWN|EXPIRED|COMPLETED`
- `submissions.submission_status`: `SUBMITTED|UNDER_REVIEW|REVISION_REQUESTED|APPROVED|REJECTED`
- `escrow_holds.hold_status`: `HELD|RELEASED|REFUNDED|SETTLED`
- `settlement_batches.batch_status`: `PENDING|RUNNING|COMPLETED|FAILED|PARTIAL`
- `settlement_items.payout_status`: `QUEUED|PROCESSING|PAID|FAILED|CANCELED|ON_HOLD`
- `disputes.dispute_status`: `OPEN|UNDER_REVIEW|RESOLVED_OWNER|RESOLVED_WORKER|CLOSED`

## 6. 핵심 인덱스/제약
- 작업 생성 멱등성: `tasks(owner_account_id, idempotency_key) UNIQUE`
- 활성 작업 수락 1건: `task_assignments(task_id)` partial unique (`assignment_status='CLAIMED'`)
- 활성 분쟁 1건: `disputes(task_id)` partial unique (`OPEN|UNDER_REVIEW`)
- 웹훅 중복 방지: `inbound_webhook_events(provider, provider_event_id) UNIQUE`
- 원장 멱등성: `ledger_entries(account_id, entry_type, idempotency_key)` partial unique

## 7. 마이그레이션 전략
- Flyway 버전 마이그레이션
- 역호환 가능한 단계적 배포
- 실패 시 배포 중단 및 롤백 절차 실행
