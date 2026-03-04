---
version: 0.1.0
last_updated: 2026-03-04
owner: Human Proxy Engineering
status: draft
---

# Coding Conventions

## 1. 공통
- Conventional Commits 사용
- 의미 없는 약어/단일 문자 식별자 지양
- 공개 API는 문서화 필수

## 2. Frontend
- 타입 안전 우선(TypeScript strict)
- 상태/비즈니스 로직과 UI 분리
- 접근성 속성 필수 점검

## 3. Backend
- 패키지는 도메인 우선(`domain/<domain>`)으로 구성
- 각 도메인 내부 레이어는 `controller`, `orchestrator`, `service`, `repository` 고정
- 계층 간 의존 방향 고정(`controller -> orchestrator -> service -> repository`)
- 도메인 규칙은 서비스 계층에 집중
- 트랜잭션 경계를 오케스트레이터 또는 서비스에 명시
- `repository`는 비즈니스 로직 금지, 저장/조회만 담당
- 경로(API URL) 변경은 OpenAPI/테스트/보안필터/프론트 호출부를 동일 PR에서 동기화

## 4. 테스트
- 신규 기능은 최소 1개 단위 테스트 필수
- 결제/정산 변경은 통합 테스트 필수

## 5. DB 모델링
- 테이블/컬럼은 `snake_case`로 통일
- 화폐는 `amount_krw BIGINT` 정수로 저장
- 상태값은 enum 타입 대신 `VARCHAR + CHECK`를 기본값으로 사용
- `updated_at` 컬럼 보유 테이블은 트리거로 자동 갱신
- idempotency/중복 처리 경로는 `UNIQUE` 또는 partial index로 강제
