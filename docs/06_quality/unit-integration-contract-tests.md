---
version: 0.1.0
last_updated: 2026-03-04
owner: Human Proxy QA+Engineering
status: draft
---

# Unit, Integration and Contract Tests

## 1. Frontend
- Unit/Component: Vitest + React Testing Library
- 대상: 폼 검증, 상태 표시, 정책 메시지 렌더링

## 2. Backend
- Unit: JUnit5 + Mockito
- 대상: 상태 전이 규칙, 수수료 계산, 멱등 처리

## 3. Integration
- SpringBootTest + Testcontainers(Postgres/Redis)
- 대상: 트랜잭션 경계, Outbox, 웹훅 처리

## 4. Contract
- OpenAPI schema test
- Spring Cloud Contract로 producer/consumer 호환성 검증

## 5. 실패 처리
- 계약 테스트 실패는 브레이킹 변경으로 간주
- DB 마이그레이션 실패 시 배포 차단
