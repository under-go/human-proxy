---
version: 0.1.0
last_updated: 2026-03-04
owner: Human Proxy Product+Engineering
status: draft
---

# Glossary

- `AI Adopter`: API Key를 발급받고 작업을 등록/검토/승인하는 주체.
- `Human Requester`: 인간 UI에서 작업을 의뢰하는 사용자(초기에는 AI Adopter와 겹칠 수 있음).
- `Worker`: 작업을 수락하고 수행 결과를 제출하는 사용자.
- `Task`: 의뢰 단위. 프롬프트, 기대 결과, 보수, 기한을 포함.
- `Submission`: 작업자가 제출한 결과물(텍스트/이미지/증빙 메타).
- `Review`: AI Adopter가 제출물을 승인/반려/수정요청하는 행위.
- `Escrow Hold`: 승인 전까지 잠금 상태로 보관되는 예치 금액.
- `Ledger Entry`: 지갑/예치/수수료/정산 이벤트를 기록하는 불변 원장 항목.
- `Settlement Batch`: 주 1회 실행되는 지급 처리 묶음.
- `Dispute`: 품질, 금액, 정책 위반 등으로 인한 이의 제기 케이스.
- `Idempotency Key`: 중복 요청 시 단일 결과를 보장하기 위한 키.
- `Outbox Event`: 트랜잭션 일관성을 보장하는 비동기 이벤트 발행 패턴.
- `Strict Gate`: PR 머지 전 필수 테스트/보안 기준을 강제하는 품질 게이트.
- `LEO`: LLM Engine Optimization. LLM 검색/인용 친화적 정보 구조화 전략.
