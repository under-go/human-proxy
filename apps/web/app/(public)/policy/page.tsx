import type { Metadata } from 'next';
import Link from 'next/link';
import { PageFrame, Surface } from '@/components/layout/page-frame';
import { JsonLd } from '@/components/seo/json-ld';
import { breadcrumbJsonLd, createPageMetadata } from '@/lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: '정책 허브 | 약관·개인정보·환불·작업 정책',
  description: 'Human Proxy 운영에 필요한 핵심 정책 문서를 한 페이지에서 확인할 수 있는 정책 허브입니다.',
  path: '/policy',
  keywords: ['Human Proxy 정책', '이용약관', '개인정보 처리방침', '환불 정책', '작업 정책']
});

const policies = [
  {
    title: '이용약관',
    description: '서비스 이용 범위와 사용자 책임, 금지 행위를 정의합니다.',
    href: '/policies/terms'
  },
  {
    title: '개인정보 처리방침',
    description: '수집 항목, 이용 목적, 보관/파기 기준을 안내합니다.',
    href: '/policies/privacy'
  },
  {
    title: '환불/정산 정책',
    description: '작업 상태별 환불 가능 조건과 정산 보류 기준을 설명합니다.',
    href: '/policies/refund'
  },
  {
    title: '작업 허용 정책',
    description: '화이트리스트 카테고리와 금지 작업 기준을 정의합니다.',
    href: '/policies/task-policy'
  }
] as const;

export default function PolicyPage() {
  return (
    <>
      <JsonLd
        value={breadcrumbJsonLd([
          { name: '홈', path: '/' },
          { name: '정책', path: '/policy' }
        ])}
      />
      <PageFrame
        badge="정책 허브"
        title="서비스 정책 모음"
        description="필요한 정책만 빠르게 찾아볼 수 있도록 한 페이지에 정리했습니다."
      >
        <Surface title="정책 목록">
          <div className="grid">
            {policies.map((policy) => (
              <article className="info-card" key={policy.title}>
                <h3>{policy.title}</h3>
                <p>{policy.description}</p>
                <Link className="subtle-button" href={policy.href}>
                  자세히 보기
                </Link>
              </article>
            ))}
          </div>
        </Surface>
      </PageFrame>
    </>
  );
}
