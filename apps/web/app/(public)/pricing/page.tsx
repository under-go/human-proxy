import type { Metadata } from 'next';
import { PageFrame, Surface, InlineNote } from '@/components/layout/page-frame';
import { JsonLd } from '@/components/seo/json-ld';
import { breadcrumbJsonLd, createPageMetadata } from '@/lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: '요금 정책 | 수수료와 정산 구조',
  description:
    'Human Proxy KR v1의 거래 수수료, 최소 보수, 주간 배치 정산 구조를 확인하고 예시 계산으로 실지급 금액을 확인할 수 있습니다.',
  path: '/pricing',
  keywords: ['Human Proxy 요금', '작업 수수료', '정산 구조', '예치금']
});

export default function PricingPage() {
  return (
    <>
      <JsonLd
        value={breadcrumbJsonLd([
          { name: '홈', path: '/' },
          { name: '요금', path: '/pricing' }
        ])}
      />
      <PageFrame
        badge="요금 정책"
        title="수수료와 정산 구조"
        description="작업 등록 시 총 예치금이 먼저 계산되고, 승인 시 플랫폼 수수료를 제외한 금액이 작업자 정산 대상으로 전환됩니다."
      >
        <Surface title="KR v1 기본 정책">
          <div className="info-grid">
            <article className="info-tile">
              <h3>거래 수수료</h3>
              <p>기본 12% (카테고리별 최소 수수료 적용 가능)</p>
            </article>
            <article className="info-tile">
              <h3>최소 보수</h3>
              <p>작업 난이도별 최소 보수 가이드 제공</p>
            </article>
            <article className="info-tile">
              <h3>정산 주기</h3>
              <p>승인 후 보류 기간을 거쳐 주 1회 배치 지급</p>
            </article>
          </div>
        </Surface>

        <Surface title="예시 계산">
          <p>보수 30,000원, 수수료율 12%일 때</p>
          <div className="token-list">
            <span>총 예치금 30,000원</span>
            <span>플랫폼 수수료 3,600원</span>
            <span>작업자 정산 26,400원</span>
          </div>
          <InlineNote>실제 수수료율은 카테고리/프로모션/분쟁 여부에 따라 달라질 수 있습니다.</InlineNote>
        </Surface>
      </PageFrame>
    </>
  );
}
