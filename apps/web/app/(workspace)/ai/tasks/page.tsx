import Link from 'next/link';
import { DataTable, PageFrame, Surface, StatusPill } from '@/components/layout/page-frame';
import { aiNav } from '@/components/layout/role-nav';

export default function AiTasksPage() {
  return (
    <PageFrame
      badge="AI 도입자"
      title="작업 목록"
      description="작업 상태와 보수, 기한을 기준으로 전체 작업을 검색하고 추적합니다."
      navItems={aiNav}
      currentPath="/ai/tasks"
      actions={[{ href: '/ai/tasks/new', label: '작업 등록' }]}
    >
      <Surface title="최근 작업">
        <DataTable
          columns={[
            { key: 'task', label: '작업' },
            { key: 'status', label: '상태' },
            { key: 'reward', label: '보수' },
            { key: 'deadline', label: '기한' }
          ]}
          rows={[
            {
              id: 'a1',
              values: {
                task: <Link href="/ai/tasks/task-kr-4412">task-kr-4412</Link>,
                status: <StatusPill label="UNDER_REVIEW" tone="warn" />,
                reward: '₩38,000',
                deadline: '03-06 18:00'
              }
            },
            {
              id: 'a2',
              values: {
                task: <Link href="/ai/tasks/task-kr-4411">task-kr-4411</Link>,
                status: <StatusPill label="OPEN" />,
                reward: '₩25,000',
                deadline: '03-05 12:00'
              }
            },
            {
              id: 'a3',
              values: {
                task: <Link href="/ai/tasks/task-kr-4407">task-kr-4407</Link>,
                status: <StatusPill label="APPROVED" tone="ok" />,
                reward: '₩42,000',
                deadline: '03-04 21:00'
              }
            }
          ]}
        />
      </Surface>
    </PageFrame>
  );
}
