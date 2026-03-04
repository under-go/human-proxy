---
version: 1.0.0
last_updated: 2026-03-04
owner: Human Proxy Design+Product
status: approved
---

# UX Human Owner Side

## 1. UX 목표
- 비개발 의뢰자가 "복잡한 설정" 없이 작업을 빠르게 등록하도록 한다.
- 등록 이후 가장 중요한 검토/승인으로 자연스럽게 이동시킨다.

## 2. 핵심 IA
- `/owner/dashboard`
- `/owner/tasks/new`
- `/owner/reviews`
- `/owner/wallet`
- 고급 운영: `/owner/disputes`, `/owner/settings`

## 3. 화면 원칙
- 대시보드 Hero CTA:
  - Primary: `새 작업 만들기`
  - Secondary: `검토함 열기`
- 등록 폼은 필수 입력만 노출(목표/기준/금지/보수/기한)
- 비용/정산 상세는 노트와 지갑 페이지로 분리

## 4. AI 도입 담당자 플로우
1. 랜딩에서 `의뢰 시작하기`
2. 작업 생성
3. 검토함 처리
4. 승인 후 지갑 확인
5. 필요 시 분쟁 처리

## 5. 인수 기준
- 랜딩 진입 후 작업 등록 화면까지 1클릭
- 대시보드에서 검토함 진입 CTA가 스크롤 없이 노출
