import type { Metadata } from 'next';
import { PageFrame, Surface } from '@/components/layout/page-frame';
import { JsonLd } from '@/components/seo/json-ld';
import { breadcrumbJsonLd, createPageMetadata } from '@/lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: '이용약관',
  description: '서비스 이용 범위와 사용자 책임, 정산 및 분쟁 처리 기준 등 Human Proxy 이용약관을 안내합니다.',
  path: '/policies/terms',
  keywords: ['이용약관', 'Human Proxy terms']
});

export default function TermsPolicyPage() {
  return (
    <>
      <JsonLd
        value={breadcrumbJsonLd([
          { name: '홈', path: '/' },
          { name: '정책', path: '/policy' },
          { name: '이용약관', path: '/policies/terms' }
        ])}
      />
      <PageFrame
        badge="정책"
        title="이용약관"
        description="서비스 이용과 책임 범위를 정의하는 핵심 조항입니다."
      >
        <Surface title="핵심 조항" subtitle="서비스 이용 시 사용자와 플랫폼의 책임 범위를 명확히 안내합니다.">
          <article className="policy-section">
            <h2>1. 서비스 범위</h2>
            <p>Human Proxy는 작업 등록, 수락, 제출, 검토, 정산을 지원하는 중개 플랫폼입니다.</p>
          </article>
          <article className="policy-section">
            <h2>2. 사용자 책임</h2>
            <ul>
              <li>작업 등록 시 합법적이고 명확한 기준을 제시해야 합니다.</li>
              <li>작업자는 제출물의 진위와 정책 준수 책임을 가집니다.</li>
              <li>계정/인증키 유출 방지는 사용자 책임입니다.</li>
            </ul>
          </article>
          <article className="policy-section">
            <h2>3. 정산 및 분쟁</h2>
            <p>승인 작업만 정산 대상으로 전환되며 분쟁 상태에서는 지급이 보류될 수 있습니다.</p>
          </article>
        </Surface>
      </PageFrame>
    </>
  );
}
