---
version: 0.1.0
last_updated: 2026-03-04
owner: Human Proxy Engineering
status: draft
---

# Domain Model and State Machine

## 1. 핵심 엔티티
- `Account`
- `ApiCredential`
- `Task`
- `TaskReward`
- `TaskAssignment`
- `Submission`
- `ReviewDecision`
- `EscrowHold`
- `LedgerEntry`
- `SettlementBatch`
- `DisputeCase`

## 2. Task 상태 전이
`OPEN -> CLAIMED -> IN_PROGRESS -> SUBMITTED -> UNDER_REVIEW -> APPROVED|REVISION_REQUESTED|REJECTED -> SETTLED|CLOSED`

## 3. 상태 전이 규칙
- `OPEN -> CLAIMED`: 자격 충족 작업자 1인 수락 시
- `SUBMITTED -> UNDER_REVIEW`: 제출 유효성 통과 시
- `UNDER_REVIEW -> APPROVED`: 검토 승인 + 예치금 잠금 해제 준비
- `APPROVED -> SETTLED`: 정산 배치 성공 시
- `REJECTED/CLOSED`: 환불/종료 정책에 따라 닫힘

## 4. 불변 조건(Invariants)
- 승인 전 지급 금지
- 원장 차변/대변 합계 일치
- 동일 Idempotency Key 요청의 결과 불변
- 분쟁 활성 상태에서 지급 진행 금지
