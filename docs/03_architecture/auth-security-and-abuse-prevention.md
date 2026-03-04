---
version: 0.1.0
last_updated: 2026-03-04
owner: Human Proxy Security+Engineering
status: draft
---

# Auth, Security and Abuse Prevention

## 1. 인증/권한
- API Key는 해시 저장, 원문 재조회 불가
- HMAC 서명 검증 + 시각 오차 허용 범위 제한
- Owner/Worker/Admin 역할 기반 접근 제어
- 인증 채널 분리:
  - Agent API: 서명 헤더 + 멱등 키
  - Owner/Worker API: Bearer 토큰
  - Latpeed webhook: 전용 서명 헤더

## 2. 남용 방지
- IP/Key 단위 Rate Limit
- 비정상 요청 패턴 탐지(반복 실패, nonce 재사용)
- 작업 카테고리 정책 필터링

## 3. 파일 보안
- 업로드 파일 형식/용량 제한
- 악성 파일 스캔 후 공개 링크 발급
- 만료 URL 사용

## 4. 감사/추적
- 모든 금액/권한/상태변경 이벤트는 감사로그 기록
- `traceId`로 API-이벤트-정산 로그 연결

## 5. 보안 기준
- 고위험 취약점 0건이 머지 조건
- 분기별 보안 점검 및 키 회전 훈련
