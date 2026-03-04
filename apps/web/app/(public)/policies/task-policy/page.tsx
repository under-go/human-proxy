import type { Metadata } from 'next';
import { PageFrame, Checklist, Surface } from '@/components/layout/page-frame';
import { JsonLd } from '@/components/seo/json-ld';
import { breadcrumbJsonLd, createPageMetadata } from '@/lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: '작업 허용/금지 정책',
  description: 'KR v1 화이트리스트 카테고리와 금지 작업 기준을 안내하는 Human Proxy 작업 정책입니다.',
  path: '/policies/task-policy',
  keywords: ['작업 정책', '화이트리스트 카테고리', '금지 작업']
});

export default function TaskPolicyPage() {
  return (
    <>
      <JsonLd
        value={breadcrumbJsonLd([
          { name: '홈', path: '/' },
          { name: '정책', path: '/policy' },
          { name: '작업 허용/금지 정책', path: '/policies/task-policy' }
        ])}
      />
      <PageFrame
        badge="정책"
        title="작업 허용/금지 정책"
        description="KR v1은 화이트리스트 카테고리만 허용하며, 고위험 작업은 등록 단계에서 차단됩니다."
      >
        <Surface title="핵심 조항" subtitle="허용 카테고리 외 요청은 등록 단계에서 제한됩니다.">
          <article className="policy-section">
            <h2>허용 카테고리(예시)</h2>
            <Checklist
              items={[
                '현장 확인형 리서치(공개 정보 범위)',
                '이미지/텍스트 라벨링',
                '문서 검수/요약 보조',
                '반복형 디지털 태스크'
              ]}
            />
          </article>
          <article className="policy-section">
            <h2>금지 작업(예시)</h2>
            <Checklist
              items={[
                '불법 행위 유도, 개인정보 침해, 사기성 요청',
                '금융/의료/법률의 무자격 확정 판정 요구',
                '위험 물리작업 및 신체 위해 가능 업무'
              ]}
            />
          </article>
        </Surface>
      </PageFrame>
    </>
  );
}
