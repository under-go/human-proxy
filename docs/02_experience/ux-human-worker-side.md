---
version: 1.0.0
last_updated: 2026-03-04
owner: Human Proxy Design+Operations
status: approved
---

# UX Human Worker Side

## 1. UX 목표
- 작업자가 수락 전에 리스크를 판단할 수 있게 하고,
- 제출 후 정산 흐름을 예측 가능하게 만든다.

## 2. 핵심 IA
- `/worker/jobs`
- `/worker/jobs/[taskId]`
- `/worker/submissions/[submissionId]`
- `/worker/earnings`
- 고급 운영: `/worker/disputes`, `/worker/profile`

## 3. 화면 원칙
- 일감 목록 Hero CTA:
  - Primary: `추천 일감 보기`
  - Secondary: `정산 보기`
- 작업 상세에서 수락 CTA를 기준/주의사항 바로 아래 배치
- 제출 화면은 입력 + 체크리스트만 남겨 집중도 유지

## 4. 작업자 플로우
1. 랜딩에서 `작업 시작하기`
2. 일감 목록 확인
3. 상세에서 기준 확인 후 수락
4. 제출 작성 및 완료
5. 정산 페이지에서 지급 상태 확인

## 5. 인수 기준
- 상세 진입 후 수락 CTA까지 스크롤 1회 이내
- 제출 완료 버튼과 체크리스트가 동일 화면에 존재
