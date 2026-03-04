import { PageFrame, Surface, StatusPill } from '@/components/layout/page-frame';
import { ownerNav } from '@/components/layout/role-nav';

export default async function OwnerTaskDetailPage({ params }: { params: Promise<{ taskId: string }> }) {
  const { taskId } = await params;

  return (
    <PageFrame
      badge="의뢰자"
      title={`작업 상세 · ${taskId}`}
      description="제출물 기준 충족도를 확인하고 승인/수정요청/거절을 결정합니다."
      navItems={ownerNav}
      currentPath="/owner/tasks/new"
    >
      <Surface title="작업 상태 요약">
        <div className="token-list">
          <span>Status: UNDER_REVIEW</span>
          <span>예치금: ₩55,000</span>
          <span>정산 예정: 2026-W11</span>
        </div>
      </Surface>

      <Surface title="검토 액션">
        <ul className="checklist">
          <li>합격 기준 4개 중 4개 충족</li>
          <li>첨부 증빙 2건 확인</li>
          <li>금지사항 위반 없음</li>
        </ul>
        <div className="hero-actions">
          <button className="solid-button" type="button">
            승인
          </button>
          <button className="subtle-button" type="button">
            수정요청
          </button>
          <button className="subtle-button" type="button">
            거절
          </button>
        </div>
        <StatusPill label="승인 시 정산대기 생성" tone="ok" />
      </Surface>
    </PageFrame>
  );
}
