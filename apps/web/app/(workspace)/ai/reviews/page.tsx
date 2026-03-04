import { DataTable, PageFrame, Surface, StatusPill } from '@/components/layout/page-frame';
import { aiNav } from '@/components/layout/role-nav';

export default function AiReviewsPage() {
  return (
    <PageFrame
      badge="AI 도입자"
      title="제출 검토 큐"
      description="승인 지연과 반려율을 낮추기 위해 검토 우선순위를 제공합니다."
      navItems={aiNav}
      currentPath="/ai/reviews"
    >
      <Surface title="검토 대기 목록">
        <DataTable
          columns={[
            { key: 'task', label: 'Task ID' },
            { key: 'submittedAt', label: '제출 시각' },
            { key: 'risk', label: '리스크' },
            { key: 'action', label: '권장 액션' }
          ]}
          rows={[
            {
              id: 'r1',
              values: {
                task: 'task-kr-4412',
                submittedAt: '03-04 11:09',
                risk: <StatusPill label="중간" tone="warn" />,
                action: '수정요청 템플릿 검토'
              }
            },
            {
              id: 'r2',
              values: {
                task: 'task-kr-4408',
                submittedAt: '03-04 10:44',
                risk: <StatusPill label="낮음" tone="ok" />,
                action: '승인 권장'
              }
            }
          ]}
        />
      </Surface>
    </PageFrame>
  );
}
