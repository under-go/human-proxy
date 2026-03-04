'use client';

import Link from 'next/link';
import type { Route } from 'next';
import { usePathname } from 'next/navigation';
import { aiNav, ownerNav, type NavItem, workerNav } from './role-nav';

type Section = {
  key: 'owner' | 'worker' | 'ai';
  label: string;
  href: Route;
  description: string;
  navItems: NavItem[];
  walletSummary: {
    label: string;
    amount: string;
    note: string;
  };
  profileSummary: {
    title: string;
    detail: string;
    cta: string;
    href: Route;
  };
};

const sections: Section[] = [
  {
    key: 'owner',
    label: '의뢰자',
    href: '/owner/dashboard',
    description: '작업 등록, 검토, 승인, 정산',
    navItems: ownerNav,
    walletSummary: {
      label: '예치 잔액',
      amount: '₩1,240,000',
      note: '이번 주 정산 예정 ₩286,000'
    },
    profileSummary: {
      title: '의뢰 운영 계정',
      detail: 'ops@humanproxy.kr',
      cta: '설정 열기',
      href: '/owner/settings'
    }
  },
  {
    key: 'worker',
    label: '작업자',
    href: '/worker/jobs',
    description: '일감 탐색, 수락, 제출, 수익 확인',
    navItems: workerNav,
    walletSummary: {
      label: '이번 주 수익',
      amount: '₩328,000',
      note: '정산 예정일 금요일 18:00'
    },
    profileSummary: {
      title: '작업자 프로필',
      detail: '박서연 · 신뢰도 4.9/5.0',
      cta: '프로필 보기',
      href: '/worker/profile'
    }
  },
  {
    key: 'ai',
    label: 'AI 연동',
    href: '/ai/dashboard',
    description: 'API 키, 웹훅, 자동 발주 운영',
    navItems: aiNav,
    walletSummary: {
      label: '운영 예산',
      amount: '₩4,820,000',
      note: '자동 발주 한도 오늘 23:59 갱신'
    },
    profileSummary: {
      title: '연동 앱',
      detail: 'humanproxy-agent-prod',
      cta: 'API 키 관리',
      href: '/ai/keys'
    }
  }
];

function isActive(pathname: string, href: string) {
  if (pathname === href) {
    return true;
  }
  return pathname.startsWith(href + '/');
}

function resolveSection(pathname: string) {
  if (pathname.startsWith('/owner')) {
    return sections[0];
  }
  if (pathname.startsWith('/worker')) {
    return sections[1];
  }
  if (pathname.startsWith('/ai')) {
    return sections[2];
  }
  return null;
}

function resolveTopbarTitle(pathname: string, section: Section | null) {
  if (!section) {
    return '작업공간 허브';
  }

  if (pathname.includes('/tasks/new')) {
    return `${section.label} · 새 작업`;
  }
  if (pathname.includes('/tasks/') || pathname.includes('/jobs/') || pathname.includes('/submissions/')) {
    return `${section.label} · 상세`;
  }
  if (pathname.includes('/reviews')) {
    return `${section.label} · 검토`;
  }
  if (pathname.includes('/wallet') || pathname.includes('/earnings')) {
    return `${section.label} · 정산`;
  }
  if (pathname.includes('/disputes')) {
    return `${section.label} · 분쟁`;
  }
  if (pathname.includes('/settings')) {
    return `${section.label} · 설정`;
  }
  if (pathname.includes('/keys')) {
    return `${section.label} · API 키`;
  }
  if (pathname.includes('/webhooks')) {
    return `${section.label} · 웹훅`;
  }
  return `${section.label} · 대시보드`;
}

function findSectionByKey(key: Section['key']) {
  return sections.find((section) => section.key === key) ?? null;
}

function resolveMainMenus(section: Section | null) {
  if (!section) {
    return [];
  }
  return section.navItems.filter((item) => item.group === 'main');
}

function resolveWalletMenu(section: Section | null) {
  if (!section) {
    return null;
  }
  return section.navItems.find((item) => item.group === 'wallet') ?? null;
}

export function WorkspaceShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? '/workspace';
  const activeSection = resolveSection(pathname);
  const section = activeSection ? findSectionByKey(activeSection.key) : null;
  const menuItems = resolveMainMenus(section);
  const walletMenu = resolveWalletMenu(section);
  const topbarTitle = resolveTopbarTitle(pathname, section);

  return (
    <div className="workspace-layout">
      <aside className="workspace-sidebar">
        <div className="workspace-sidebar-main">
          <Link className="workspace-brand" href="/workspace">
            <span className="workspace-brand-mark">HP</span>
            <span className="workspace-brand-copy">
              <strong>Human Proxy</strong>
              <small>Workspace</small>
            </span>
          </Link>

          <section className="workspace-context-card">
            <p className="workspace-context-label">현재 작업공간</p>
            <strong>{section ? section.label : '작업공간 허브'}</strong>
            <span>{section ? section.description : '역할을 선택해서 대시보드로 진입하세요.'}</span>
            {section ? (
              <Link className="workspace-switch-link" href="/workspace">
                역할 바꾸기
              </Link>
            ) : null}
          </section>

          <section className="workspace-side-section">
            <p>{section ? '핵심 메뉴' : '역할 바로가기'}</p>
            <nav className="workspace-menu-nav" aria-label="Workspace menu">
              {section
                ? menuItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={isActive(pathname, item.href) ? 'active' : undefined}
                    >
                      {item.label}
                    </Link>
                  ))
                : sections.map((item) => (
                    <Link key={item.key} href={item.href}>
                      {item.label} 대시보드
                    </Link>
                  ))}
            </nav>
          </section>

          {section && walletMenu ? (
            <Link
              className={`workspace-wallet-card ${isActive(pathname, walletMenu.href) ? 'active' : ''}`}
              href={walletMenu.href}
            >
              <span className="workspace-wallet-label">{section.walletSummary.label}</span>
              <strong>{section.walletSummary.amount}</strong>
              <small>{section.walletSummary.note}</small>
            </Link>
          ) : null}

          {section ? (
            <section className="workspace-profile-card">
              <p>{section.profileSummary.title}</p>
              <span>{section.profileSummary.detail}</span>
              <Link href={section.profileSummary.href}>{section.profileSummary.cta}</Link>
            </section>
          ) : null}
        </div>

        <Link className="workspace-home-link" href="/">
          ← 홈으로 이동
        </Link>
      </aside>

      <div className="workspace-main">
        <header className="workspace-topbar">
          <div className="workspace-topbar-copy">
            <strong>{topbarTitle}</strong>
            <span>{section ? section.description : '역할별 공간을 고르면 해당 대시보드로 이동합니다.'}</span>
          </div>
          {section ? <span className="workspace-role-pill">{section.label}</span> : null}
        </header>

        <div className="workspace-content">{children}</div>
      </div>
    </div>
  );
}
