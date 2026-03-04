---
version: 0.1.0
last_updated: 2026-03-04
owner: Human Proxy Finance Engineering
status: draft
---

# Escrow Ledger and Settlement

## 1. 원장 원칙
- 원장은 append-only로 기록한다.
- 모든 금액 이동은 `ledger_entries` 2중 분개 규칙을 따른다.

## 2. 계정 체계(예시)
- User Wallet
- Platform Escrow
- Platform Fee Revenue
- Worker Payable
- External Clearing

## 3. 작업 단위 흐름
1. 작업 생성 시 예치 잠금(`EscrowHold`)
2. 승인 시 수수료 계산
3. `Worker Payable`로 지급 대상 전환
4. 주간 배치에서 외부 출금 요청
5. 성공 시 정산 완료(`SETTLED`)

## 4. 정산 배치 정책
- 주기: 주 1회
- 선행 조건: 분쟁 없음, 보류 기간 만료
- 실패 처리: 재시도 큐 + 운영자 검토

## 5. 정합성 체크
- 일 마감: 원장 합계 검증
- 주 마감: 외부 지급 내역 대사
- 불일치 발견 시 즉시 지급 중단 플래그
