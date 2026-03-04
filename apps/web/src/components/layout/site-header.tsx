'use client';

import Link from 'next/link';
import type { Route } from 'next';
import { usePathname } from 'next/navigation';

type NavLink = { href: Route; label: string };

const serviceNav: NavLink[] = [
  { href: '/how-it-works', label: '서비스 소개' },
  { href: '/pricing', label: '요금' },
  { href: '/faq', label: 'FAQ' },
  { href: '/policy', label: '정책' }
];

function isActive(pathname: string, href: string) {
  if (pathname === href) {
    return true;
  }
  return pathname.startsWith(href + '/');
}

export function SiteHeader() {
  const pathname = usePathname() ?? '/';

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link className="brand" href="/">
          <span className="brand-mark">HP</span>
          <span className="brand-copy">
            <strong>Human Proxy</strong>
            <small>KR v1</small>
          </span>
        </Link>

        <nav className="site-nav" aria-label="Global">
          {serviceNav.map((item) => (
            <Link key={item.href} href={item.href} className={isActive(pathname, item.href) ? 'active' : undefined}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="site-actions">
          <Link className="link-button" href="/login">
            로그인
          </Link>
          <Link className="subtle-button" href="/workspace">
            작업공간
          </Link>
          <Link className="solid-button" href="/owner/tasks/new">
            의뢰 시작
          </Link>
        </div>
      </div>
    </header>
  );
}
