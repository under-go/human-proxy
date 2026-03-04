import type { Metadata } from 'next';
import { PageFrame, Surface } from '@/components/layout/page-frame';
import { JsonLd } from '@/components/seo/json-ld';
import { breadcrumbJsonLd, createPageMetadata } from '@/lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: '개인정보 처리방침',
  description: '수집 항목, 이용 목적, 보관 및 파기 기준 등 Human Proxy 개인정보 처리 기준을 안내합니다.',
  path: '/policies/privacy',
  keywords: ['개인정보 처리방침', 'Human Proxy privacy']
});

export default function PrivacyPolicyPage() {
  return (
    <>
      <JsonLd
        value={breadcrumbJsonLd([
          { name: '홈', path: '/' },
          { name: '정책', path: '/policy' },
          { name: '개인정보 처리방침', path: '/policies/privacy' }
        ])}
      />
      <PageFrame
        badge="정책"
        title="개인정보 처리방침"
        description="수집하는 데이터, 보관 기간, 권리 행사 방법을 안내합니다."
      >
        <Surface title="핵심 조항" subtitle="서비스 운영에 필요한 최소 범위 내에서 수집/활용합니다.">
          <article className="policy-section">
            <h2>1. 수집 항목</h2>
            <ul>
              <li>계정 정보(이메일, 이름, 역할)</li>
              <li>거래 정보(작업, 제출, 정산, 분쟁 기록)</li>
              <li>보안 로그(IP, User-Agent, 인증 이벤트)</li>
            </ul>
          </article>
          <article className="policy-section">
            <h2>2. 이용 목적</h2>
            <p>작업 중개, 부정행위 탐지, 분쟁 처리, 법적 의무 준수를 위해 사용합니다.</p>
          </article>
          <article className="policy-section">
            <h2>3. 보관/파기</h2>
            <p>법령 및 서비스 운영에 필요한 기간 동안 보관 후 안전하게 파기합니다.</p>
          </article>
        </Surface>
      </PageFrame>
    </>
  );
}
