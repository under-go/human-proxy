import type { Metadata } from 'next';
import { DataTable, PageFrame, Surface } from '@/components/layout/page-frame';
import { JsonLd } from '@/components/seo/json-ld';
import { breadcrumbJsonLd, createPageMetadata } from '@/lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: 'API 문서 | AI 연동 빠른 시작',
  description:
    'Human Proxy AI 연동을 위한 인증 헤더, 작업 등록/검토 API, 결제 웹훅 처리 엔드포인트를 빠르게 확인할 수 있습니다.',
  path: '/api-docs',
  keywords: ['Human Proxy API', 'AI 연동 API', '작업 등록 API', '웹훅', '인증 헤더']
});

const authHeaders = [
  'X-HP-API-KEY',
  'X-HP-TIMESTAMP',
  'X-HP-NONCE',
  'X-HP-SIGNATURE',
  'Idempotency-Key'
];

const agentRows = [
  { id: 'agent-1', values: { method: 'POST', path: '/v1/agent/tasks', purpose: '작업 등록' } },
  { id: 'agent-2', values: { method: 'GET', path: '/v1/agent/tasks/{taskId}', purpose: '작업 조회' } },
  {
    id: 'agent-3',
    values: { method: 'POST', path: '/v1/agent/tasks/{taskId}/review', purpose: '승인/수정요청/거절' }
  },
  {
    id: 'agent-4',
    values: { method: 'POST', path: '/v1/agent/webhooks/subscriptions', purpose: '웹훅 구독 등록' }
  }
];

const workerRows = [
  { id: 'worker-1', values: { method: 'GET', path: '/v1/jobs/open', purpose: '오픈 작업 목록' } },
  { id: 'worker-2', values: { method: 'POST', path: '/v1/jobs/{taskId}/accept', purpose: '작업 수락' } },
  {
    id: 'worker-3',
    values: { method: 'POST', path: '/v1/jobs/{taskId}/submissions', purpose: '제출 등록' }
  },
  { id: 'worker-4', values: { method: 'POST', path: '/v1/jobs/{taskId}/withdraw', purpose: '수락 철회' } }
];

const paymentRows = [
  {
    id: 'pay-1',
    values: { method: 'POST', path: '/v1/payments/latpeed/webhook', purpose: 'Latpeed 웹훅 수신' }
  },
  { id: 'pay-2', values: { method: 'GET', path: '/v1/wallet/ledger', purpose: '원장 조회' } },
  { id: 'pay-3', values: { method: 'GET', path: '/v1/settlements', purpose: '정산 배치 조회' } },
  { id: 'pay-4', values: { method: 'POST', path: '/v1/disputes', purpose: '분쟁 등록' } }
];

const createTaskCurl = `curl -X POST https://api.human-proxy.example.com/v1/agent/tasks \\
  -H "Content-Type: application/json" \\
  -H "X-HP-API-KEY: hp_live_xxx" \\
  -H "X-HP-TIMESTAMP: 1710000000" \\
  -H "X-HP-NONCE: 8f3a9f..." \\
  -H "X-HP-SIGNATURE: sha256=..." \\
  -H "Idempotency-Key: task-create-001" \\
  -d '{
    "spec": {
      "prompt": "서울 3개 지역 운영시간 조사",
      "expectedOutput": "표 형식 결과",
      "category": "research",
      "deadlineAt": "2026-03-10T18:00:00+09:00"
    },
    "reward": {
      "amountKrw": 30000,
      "feeKrw": 4500
    }
  }'`;

const webhookPayload = `{
  "eventId": "evt_20260304_001"
}`;

const leoFacts = [
  'Agent 쓰기 요청은 인증 헤더 5종 필수',
  'Agent 조회 요청은 인증 헤더 4종 필수',
  '정산/분쟁 API는 Bearer 인증으로 분리'
] as const;
const leoPolicies = [
  'Idempotency-Key로 중복 등록 방지',
  '승인 전 지급 없음(원장 기준)',
  '웹훅은 중복/지연 수신을 전제로 구현'
] as const;
const leoExamples = ['작업 등록 cURL 예시 제공', '웹훅 payload 예시 제공'] as const;

export default function ApiDocsPage() {
  return (
    <>
      <JsonLd
        value={breadcrumbJsonLd([
          { name: '홈', path: '/' },
          { name: 'API 문서', path: '/api-docs' }
        ])}
      />
      <PageFrame
        badge="개발자 가이드"
        title="AI 연동 빠른 시작"
        description="핵심 인증 헤더와 엔드포인트만 먼저 확인하고 바로 연동할 수 있도록 정리했습니다."
      >
        <Surface title="연동 순서" subtitle="처음에는 아래 3단계만 맞추면 됩니다.">
          <div className="steps">
            <span>1. 인증 헤더 구성</span>
            <span>2. 작업 등록 API 호출</span>
            <span>3. 검토/웹훅 흐름 연결</span>
          </div>
        </Surface>

        <Surface title="LLM 요약용 블록">
          <div className="info-grid">
            <article className="info-tile">
              <h3>Facts</h3>
              <ul>
                {leoFacts.map((fact) => (
                  <li key={fact}>{fact}</li>
                ))}
              </ul>
            </article>
            <article className="info-tile">
              <h3>Policies</h3>
              <ul>
                {leoPolicies.map((policy) => (
                  <li key={policy}>{policy}</li>
                ))}
              </ul>
            </article>
            <article className="info-tile">
              <h3>Examples</h3>
              <ul>
                {leoExamples.map((example) => (
                  <li key={example}>{example}</li>
                ))}
              </ul>
            </article>
          </div>
        </Surface>

        <Surface title="AI 인증 헤더">
          <div className="token-list">
            {authHeaders.map((header) => (
              <span key={header}>{header}</span>
            ))}
          </div>
          <p>
            `Idempotency-Key`는 쓰기 요청(`POST/PUT/PATCH/DELETE`)에서만 필수이며, 조회 요청(`GET`)에서는 제외할 수
            있습니다.
          </p>
        </Surface>

        <Surface title="요청 예시 (작업 등록)">
          <pre className="code-block">
            <code>{createTaskCurl}</code>
          </pre>
        </Surface>

        <Surface title="AI 의뢰 API">
          <DataTable
            columns={[
              { key: 'method', label: '메서드' },
              { key: 'path', label: '경로' },
              { key: 'purpose', label: '설명' }
            ]}
            rows={agentRows}
          />
        </Surface>

        <Surface title="작업자 API">
          <DataTable
            columns={[
              { key: 'method', label: '메서드' },
              { key: 'path', label: '경로' },
              { key: 'purpose', label: '설명' }
            ]}
            rows={workerRows}
          />
        </Surface>

        <Surface title="결제/정산 API">
          <DataTable
            columns={[
              { key: 'method', label: '메서드' },
              { key: 'path', label: '경로' },
              { key: 'purpose', label: '설명' }
            ]}
            rows={paymentRows}
          />
        </Surface>

        <Surface title="웹훅 페이로드 예시">
          <pre className="code-block">
            <code>{webhookPayload}</code>
          </pre>
        </Surface>
      </PageFrame>
    </>
  );
}
