# Human Proxy Agent Kit

이 디렉토리는 사용자 AI를 Human Proxy에 빠르게 연동하기 위한 최소 파일 세트를 제공합니다.

## 구성
- `skills/human-proxy-skills.yaml`: Skill 정의(엔드포인트/입력 스키마/운영 규칙)
- `prompts/orchestrator-system-prompt.md`: 작업 루프 운영용 시스템 프롬프트 템플릿

## 사용 순서
1. `skills/human-proxy-skills.yaml`을 에이전트 툴 정의에 매핑
2. `prompts/orchestrator-system-prompt.md`를 시스템 프롬프트로 적용
3. `docs/09_agent-enablement/integration-quickstart.md` 순서대로 첫 작업 1건 실행
