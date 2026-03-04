import type { Metadata } from 'next';
import { PageFrame, Surface } from '@/components/layout/page-frame';
import { createPageMetadata } from '@/lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: '회원가입',
  description: '의뢰자, 작업자, AI 도입자 역할로 Human Proxy 계정을 생성합니다.',
  path: '/signup',
  noIndex: true
});

export default function SignupPage() {
  return (
    <PageFrame
      badge="계정"
      title="시작하기"
      description="사용자 유형을 선택하고 기본 정보를 입력하면 첫 화면이 자동 추천됩니다."
    >
      <Surface title="회원가입">
        <form className="form-grid" action="#" method="post">
          <div className="field">
            <label htmlFor="signup-email">이메일</label>
            <input id="signup-email" type="email" placeholder="you@company.com" />
          </div>
          <div className="field">
            <label htmlFor="signup-name">이름</label>
            <input id="signup-name" type="text" placeholder="홍길동" />
          </div>
          <div className="field">
            <label htmlFor="signup-role">주 사용 역할</label>
            <select id="signup-role" defaultValue="owner">
              <option value="ai">AI 도입자</option>
              <option value="owner">의뢰자</option>
              <option value="worker">작업자</option>
            </select>
          </div>
          <button className="solid-button" type="submit">
            계정 생성
          </button>
        </form>
      </Surface>
    </PageFrame>
  );
}
