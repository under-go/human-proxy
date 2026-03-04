import { DataTable, MetricStrip, PageFrame, Surface, StatusPill } from '@/components/layout/page-frame';
import { workerNav } from '@/components/layout/role-nav';

export default function WorkerEarningsPage() {
  return (
    <PageFrame
      badge="작업자"
      title="정산 대시보드"
      description="예정/실행/실패 상태를 확인하고 필요 시 재시도를 요청할 수 있습니다."
      navItems={workerNav}
      currentPath="/worker/earnings"
    >
      <MetricStrip
        metrics={[
          { label: '정산 가능', value: '₩266,800', tone: 'ok' },
          { label: '정산 대기', value: '₩104,000' },
          { label: '이번주 지급 예정', value: '2건' },
          { label: '실패 재시도 필요', value: '1건', tone: 'warn' }
        ]}
      />

      <Surface title="정산 항목">
        <DataTable
          columns={[
            { key: 'batch', label: '배치' },
            { key: 'task', label: 'Task ID' },
            { key: 'amount', label: '실수령액' },
            { key: 'status', label: '상태' }
          ]}
          rows={[
            {
              id: 'e1',
              values: {
                batch: 'weekly-2026w10',
                task: 'job-117',
                amount: '₩27,280',
                status: <StatusPill label="PAID" tone="ok" />
              }
            },
            {
              id: 'e2',
              values: {
                batch: 'weekly-2026w10',
                task: 'job-114',
                amount: '₩21,120',
                status: <StatusPill label="FAILED" tone="danger" />
              }
            }
          ]}
        />
      </Surface>
    </PageFrame>
  );
}
