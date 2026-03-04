import { DataTable, PageFrame, Surface, StatusPill } from '@/components/layout/page-frame';
import { aiNav } from '@/components/layout/role-nav';

export default function AiWebhooksPage() {
  return (
    <PageFrame
      badge="AI 도입자"
      title="웹훅 구독/재전송"
      description="이벤트 전달 상태를 추적하고 실패 건을 재전송합니다."
      navItems={aiNav}
      currentPath="/ai/webhooks"
    >
      <Surface title="구독 엔드포인트">
        <DataTable
          columns={[
            { key: 'url', label: 'URL' },
            { key: 'events', label: '이벤트' },
            { key: 'status', label: '상태' }
          ]}
          rows={[
            {
              id: 'w1',
              values: {
                url: 'https://agent.example.com/hp/webhook',
                events: 'task.approved, settlement.queued',
                status: <StatusPill label="ACTIVE" tone="ok" />
              }
            }
          ]}
        />
      </Surface>

      <Surface title="최근 실패 이벤트">
        <DataTable
          columns={[
            { key: 'eventId', label: 'Event ID' },
            { key: 'type', label: '타입' },
            { key: 'lastError', label: '오류' },
            { key: 'retry', label: '재시도' }
          ]}
          rows={[
            {
              id: 'f1',
              values: {
                eventId: 'evt_lat_9321',
                type: 'settlement.queued',
                lastError: 'HTTP 502',
                retry: <button className="subtle-button">재전송</button>
              }
            }
          ]}
        />
      </Surface>
    </PageFrame>
  );
}
