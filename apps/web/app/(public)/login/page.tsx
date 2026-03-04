import type { Metadata } from 'next';
import Link from 'next/link';
import { PageFrame, Surface } from '@/components/layout/page-frame';
import { createPageMetadata } from '@/lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: '로그인',
  description: 'Human Proxy 작업공간 접근을 위한 로그인 페이지입니다.',
  path: '/login',
  noIndex: true
});

export default function LoginPage() {
  return (
    <PageFrame
      badge="계정"
      title="로그인"
      description="역할별 대시보드에 접근하려면 로그인하세요."
      actions={[{ href: '/signup', label: '회원가입', variant: 'subtle' }]}
    >
      <Surface title="로그인 정보">
        <form className="form-grid" action="#" method="post">
          <div className="field">
            <label htmlFor="email">이메일</label>
            <input id="email" type="email" placeholder="you@company.com" />
          </div>
          <div className="field">
            <label htmlFor="password">비밀번호</label>
            <input id="password" type="password" placeholder="••••••••" />
          </div>
          <button className="solid-button" type="submit">
            로그인
          </button>
        </form>
        <p>
          계정이 없다면 <Link href="/signup">회원가입</Link>에서 시작할 수 있습니다.
        </p>
      </Surface>
    </PageFrame>
  );
}
