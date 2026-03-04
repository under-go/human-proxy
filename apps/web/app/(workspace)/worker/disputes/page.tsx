import { DataTable, PageFrame, Surface, StatusPill } from '@/components/layout/page-frame';
import { workerNav } from '@/components/layout/role-nav';

export default function WorkerDisputesPage() {
  return (
    <PageFrame
      badge="작업자"
      title="분쟁 현황"
      description="분쟁 사유와 진행 상태를 확인하고 추가 증빙을 제출할 수 있습니다."
      navItems={workerNav}
      currentPath="/worker/disputes"
    >
      <Surface title="내 분쟁 목록">
        <DataTable
          columns={[
            { key: 'id', label: '분쟁 ID' },
            { key: 'task', label: 'Task ID' },
            { key: 'status', label: '상태' },
            { key: 'note', label: '메모' }
          ]}
          rows={[
            {
              id: 'wd1',
              values: {
                id: 'dp-worker-12',
                task: 'job-114',
                status: <StatusPill label="UNDER_REVIEW" tone="warn" />,
                note: '추가 증빙 요청 대기'
              }
            }
          ]}
        />
      </Surface>
    </PageFrame>
  );
}
