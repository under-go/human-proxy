import { DataTable, PageFrame, Surface, StatusPill } from '@/components/layout/page-frame';
import { ownerNav } from '@/components/layout/role-nav';

export default function OwnerReviewsPage() {
  return (
    <PageFrame
      badge="의뢰자"
      title="검토함"
      description="우선순위가 높은 제출부터 빠르게 판단할 수 있도록 구성했습니다."
      navItems={ownerNav}
      currentPath="/owner/reviews"
    >
      <Surface title="검토 대기">
        <DataTable
          columns={[
            { key: 'taskId', label: 'Task ID' },
            { key: 'submittedAt', label: '제출 시각' },
            { key: 'quality', label: '품질 점검' },
            { key: 'recommended', label: '권장 결정' }
          ]}
          rows={[
            {
              id: 'or1',
              values: {
                taskId: 'owner-991',
                submittedAt: '03-04 12:22',
                quality: <StatusPill label="정상" tone="ok" />,
                recommended: '승인'
              }
            },
            {
              id: 'or2',
              values: {
                taskId: 'owner-989',
                submittedAt: '03-04 11:31',
                quality: <StatusPill label="주의" tone="warn" />,
                recommended: '수정요청'
              }
            }
          ]}
        />
      </Surface>
    </PageFrame>
  );
}
