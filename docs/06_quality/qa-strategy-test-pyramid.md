---
version: 0.1.0
last_updated: 2026-03-04
owner: Human Proxy QA
status: draft
---

# QA Strategy and Test Pyramid

## 1. 목표
핵심 비즈니스 루프의 회귀를 조기에 차단하고 결제/정산 정합성을 보장한다.

## 2. 테스트 피라미드
- Unit: 70%
- Integration: 20%
- E2E/Contract: 10%

## 3. 품질 게이트
- PR 머지 전 필수 테스트 통과
- 라인 커버리지 하한선: 전체 70%, 결제/원장 모듈 85%
- 고위험 보안 취약점 0건
- flaky 테스트 비율 2% 초과 시 릴리즈 게이트 차단

## 4. 우선순위
- 1순위: 결제/원장/정산
- 2순위: 작업 상태머신
- 3순위: UX 품질 및 i18n
