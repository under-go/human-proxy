import type { Metadata } from 'next';
import { PageFrame, Surface, StatusPill } from '@/components/layout/page-frame';
import { createPageMetadata } from '@/lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: '서비스 상태',
  description: 'Human Proxy 주요 컴포넌트 상태와 최근 점검 이력을 제공합니다.',
  path: '/status',
  noIndex: true
});

export default function StatusPage() {
  return (
    <PageFrame
      badge="운영 상태"
      title="서비스 상태 대시보드"
      description="현재 시스템 상태와 최근 점검 이력을 제공합니다."
    >
      <Surface title="컴포넌트 상태">
        <div className="info-grid">
          <article className="info-tile">
            <h3>API Gateway</h3>
            <StatusPill label="정상" tone="ok" />
          </article>
          <article className="info-tile">
            <h3>작업 처리</h3>
            <StatusPill label="정상" tone="ok" />
          </article>
          <article className="info-tile">
            <h3>정산 배치</h3>
            <StatusPill label="모니터링" tone="warn" />
          </article>
        </div>
      </Surface>

      <Surface title="최근 공지">
        <ul className="timeline">
          <li>
            <p>
              <strong>2026-03-04 02:00 KST</strong>
              정산 배치 성능 점검 완료. 지연 없음.
            </p>
          </li>
          <li>
            <p>
              <strong>2026-03-03 22:30 KST</strong>
              웹훅 재시도 큐 모니터링 임계치 조정.
            </p>
          </li>
        </ul>
      </Surface>
    </PageFrame>
  );
}
