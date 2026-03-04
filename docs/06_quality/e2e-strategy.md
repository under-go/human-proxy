---
version: 0.1.0
last_updated: 2026-03-04
owner: Human Proxy QA+Design
status: draft
---

# E2E Strategy

## 1. 도구
- Playwright

## 2. 필수 시나리오
1. 작업 등록 → 수락 → 제출 → 승인 → 정산 대기 생성
2. 반려 후 재제출 → 최종 승인 시 금액 정합성
3. 웹훅 중복 수신 시 이중 정산 방지
4. 분쟁 등록 시 지급 보류 및 판정 후 상태 전이
5. 출금 실패/재시도 시 외부 상태와 내부 원장 일치
6. `ko-KR/en` 전환 시 정책/금액/일시 표기 정확성
7. SEO/LEO 메타 및 구조화 데이터 노출 검증

## 3. 실행 전략
- PR: smoke subset
- nightly: full suite
- release candidate: full suite + 결제 회귀
