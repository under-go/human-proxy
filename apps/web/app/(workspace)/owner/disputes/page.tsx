import { DataTable, PageFrame, Surface, StatusPill } from '@/components/layout/page-frame';
import { ownerNav } from '@/components/layout/role-nav';

export default function OwnerDisputesPage() {
  return (
    <PageFrame
      badge="의뢰자"
      title="분쟁 센터"
      description="분쟁 등록과 증빙 제출, 판정 결과를 단계별로 확인합니다."
      navItems={ownerNav}
      currentPath="/owner/disputes"
      actions={[{ href: '/owner/disputes', label: '새 분쟁 등록' }]}
    >
      <Surface title="진행 중 분쟁">
        <DataTable
          columns={[
            { key: 'id', label: '분쟁 ID' },
            { key: 'task', label: 'Task ID' },
            { key: 'status', label: '상태' },
            { key: 'sla', label: 'SLA' }
          ]}
          rows={[
            {
              id: 'od1',
              values: {
                id: 'dp-own-42',
                task: 'owner-982',
                status: <StatusPill label="UNDER_REVIEW" tone="warn" />,
                sla: '잔여 18시간'
              }
            }
          ]}
        />
      </Surface>
    </PageFrame>
  );
}
