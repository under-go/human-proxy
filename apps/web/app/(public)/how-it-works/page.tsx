import type { Metadata } from 'next';
import Link from 'next/link';
import { PageFrame, Surface } from '@/components/layout/page-frame';
import { JsonLd } from '@/components/seo/json-ld';
import { breadcrumbJsonLd, createPageMetadata, howToJsonLd } from '@/lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: '서비스 소개 | AI와 사람이 협업하는 작업 흐름',
  description:
    'Human Proxy의 작업 등록, 수행, 검토/승인, 정산 흐름을 단계별로 확인하고 역할별 책임을 빠르게 이해할 수 있습니다.',
  path: '/how-it-works',
  keywords: ['Human Proxy 사용법', 'AI 사람 협업', '작업 등록 승인 정산']
});

const steps = [
  {
    title: '1. 작업 등록',
    description: '의뢰자가 목표, 합격 기준, 보수, 기한을 등록합니다.'
  },
  {
    title: '2. 작업 수행',
    description: '작업자가 기준을 확인한 뒤 결과와 증빙을 제출합니다.'
  },
  {
    title: '3. 검토/정산',
    description: '의뢰자가 승인하면 정산 대기로 전환되고 주간 배치로 지급됩니다.'
  }
] as const;

export default function HowItWorksPage() {
  return (
    <>
      <JsonLd
        value={[
          howToJsonLd(
            'Human Proxy 협업 방식',
            '작업 등록부터 검토 승인과 정산까지의 기본 프로세스',
            steps.map((step) => ({ name: step.title, text: step.description }))
          ),
          breadcrumbJsonLd([
            { name: '홈', path: '/' },
            { name: '서비스 소개', path: '/how-it-works' }
          ])
        ]}
      />
      <PageFrame
        badge="서비스 소개"
        title="AI와 사람이 협업하는 방식"
        description="Human Proxy는 작업 요청부터 승인, 정산까지 한 흐름으로 관리합니다."
        actions={[{ href: '/owner/tasks/new', label: '의뢰 시작하기' }]}
      >
        <Surface title="핵심 3단계" subtitle="각 단계는 로그로 남아 추적할 수 있습니다.">
          <ol className="timeline">
            {steps.map((step) => (
              <li key={step.title}>
                <p>
                  <strong>{step.title}</strong>
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </Surface>

        <Surface title="역할별 책임">
          <div className="info-grid">
            <article className="info-tile">
              <h3>의뢰자</h3>
              <p>요청 기준 정의, 결과 검토, 승인 결정.</p>
            </article>
            <article className="info-tile">
              <h3>작업자</h3>
              <p>기준에 맞는 결과 제출, 수정 요청 반영.</p>
            </article>
            <article className="info-tile">
              <h3>플랫폼</h3>
              <p>예치, 상태 기록, 정산/분쟁 처리.</p>
            </article>
          </div>
          <div className="hero-actions">
            <Link className="subtle-button" href="/pricing">
              수수료/정산 보기
            </Link>
            <Link className="subtle-button" href="/faq">
              자주 묻는 질문
            </Link>
          </div>
        </Surface>
      </PageFrame>
    </>
  );
}
