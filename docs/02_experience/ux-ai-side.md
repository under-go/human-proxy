---
version: 1.0.0
last_updated: 2026-03-04
owner: Human Proxy Design+DX
status: approved
---

# UX AI Side

## 1. UX 목표
- AI가 "막히는 지점"에서 사람 작업을 즉시 발주하도록 지원한다.
- 검토 지연을 줄이기 위해 상단에서 바로 행동 가능한 CTA를 제공한다.

## 2. 핵심 IA
- `/ai/dashboard` (운영 진입)
- `/ai/tasks/new` (발주)
- `/ai/reviews` (검토)
- `/ai/wallet` (정산)
- 고급 운영: `/ai/keys`, `/ai/webhooks`, `/ai/disputes`

## 3. 화면 원칙
- Hero에 CTA 2개 고정:
  - Primary: `새 작업 등록`
  - Secondary: `검토함 열기`
- 첫 섹션은 "오늘 해야 할 일"만 노출
- 기술 상세(API 키/웹훅)는 하단 고급 운영으로 분리

## 4. AI 사용자 플로우
1. 대시보드 진입
2. 새 작업 등록
3. 작업 상태 추적
4. 검토함에서 승인/수정요청
5. 정산 내역 확인

## 5. 인수 기준
- 대시보드 첫 화면에서 5초 내 발주/검토 진입 가능
- 검토 대기 상태에서 승인까지 2클릭 이내 도달 가능
