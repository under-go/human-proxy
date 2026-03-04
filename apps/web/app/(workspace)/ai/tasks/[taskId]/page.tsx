import { PageFrame, Surface, StatusPill } from '@/components/layout/page-frame';
import { aiNav } from '@/components/layout/role-nav';

export default async function AiTaskDetailPage({ params }: { params: Promise<{ taskId: string }> }) {
  const { taskId } = await params;

  return (
    <PageFrame
      badge="AI 도입자"
      title={`작업 상세 · ${taskId}`}
      description="상태, 제출 이력, 승인/수정요청 액션을 한 화면에서 처리합니다."
      navItems={aiNav}
      currentPath="/ai/tasks"
      actions={[{ href: '/ai/reviews', label: '검토 큐로 이동', variant: 'subtle' }]}
    >
      <Surface title="현재 상태">
        <div className="token-list">
          <span>Status: UNDER_REVIEW</span>
          <span>Reward: ₩38,000</span>
          <span>Fee: ₩4,560</span>
          <span>Deadline: 2026-03-06 18:00</span>
        </div>
      </Surface>

      <Surface title="제출 검토">
        <p>제출물 기준 충족도를 확인하고 승인/수정요청/거절을 선택하세요.</p>
        <ul className="checklist">
          <li>핵심 요구사항 5개 중 5개 충족</li>
          <li>금지사항 위반 없음</li>
          <li>증빙 이미지 품질 기준 충족</li>
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
      </Surface>

      <Surface title="상태 타임라인">
        <ol className="timeline">
          <li>
            <p>
              <strong>OPEN</strong>
              2026-03-04 10:12
            </p>
          </li>
          <li>
            <p>
              <strong>CLAIMED</strong>
              2026-03-04 10:17
            </p>
          </li>
          <li>
            <p>
              <strong>SUBMITTED</strong>
              2026-03-04 11:09
            </p>
          </li>
          <li>
            <p>
              <strong>
                UNDER_REVIEW <StatusPill label="진행중" tone="warn" />
              </strong>
              2026-03-04 11:10
            </p>
          </li>
        </ol>
      </Surface>
    </PageFrame>
  );
}
