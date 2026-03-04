import { DataTable, PageFrame, Surface, StatusPill } from '@/components/layout/page-frame';
import { aiNav } from '@/components/layout/role-nav';

export default function AiDisputesPage() {
  return (
    <PageFrame
      badge="AI 도입자"
      title="분쟁 관리"
      description="분쟁 상태, 판정 진행, 정산 보류 영향을 추적합니다."
      navItems={aiNav}
      currentPath="/ai/disputes"
    >
      <Surface title="진행 중 분쟁">
        <DataTable
          columns={[
            { key: 'disputeId', label: '분쟁 ID' },
            { key: 'taskId', label: 'Task ID' },
            { key: 'status', label: '상태' },
            { key: 'impact', label: '정산 영향' }
          ]}
          rows={[
            {
              id: 'd1',
              values: {
                disputeId: 'dp-kr-811',
                taskId: 'task-kr-4388',
                status: <StatusPill label="UNDER_REVIEW" tone="warn" />,
                impact: '지급 보류'
              }
            }
          ]}
        />
      </Surface>
    </PageFrame>
  );
}
