import Link from 'next/link';
import type { Route } from 'next';
import { ReactNode } from 'react';
import type { NavItem } from './role-nav';

type ActionLink = {
  href: Route;
  label: string;
  variant?: 'solid' | 'subtle';
};

type PageFrameProps = {
  badge?: string;
  title: string;
  description: string;
  actions?: ActionLink[];
  navItems?: NavItem[];
  currentPath?: string;
  children: ReactNode;
};

type Metric = {
  label: string;
  value: string;
  tone?: 'neutral' | 'ok' | 'warn' | 'danger';
};

type TableColumn = {
  key: string;
  label: string;
};

type TableRow = {
  id: string;
  values: Record<string, ReactNode>;
};

function isActive(itemHref: string, currentPath?: string) {
  if (!currentPath) {
    return false;
  }

  if (itemHref === currentPath) {
    return true;
  }

  return currentPath.startsWith(itemHref + '/');
}

function resolveWorkspaceLabel(path: string) {
  if (path.startsWith('/ai')) {
    return 'AI';
  }
  if (path.startsWith('/owner')) {
    return '의뢰자';
  }
  if (path.startsWith('/worker')) {
    return '작업자';
  }
  if (path.startsWith('/workspace')) {
    return '워크스페이스';
  }
  return '안내';
}

function resolveCurrentLabel(currentPath: string, navItems?: NavItem[]) {
  if (currentPath.includes('/dashboard')) {
    return '대시보드';
  }
  if (currentPath.includes('/reviews')) {
    return '검토';
  }
  if (currentPath.includes('/wallet') || currentPath.includes('/earnings')) {
    return '정산';
  }
  if (currentPath.includes('/tasks/new')) {
    return '새 작업';
  }
  if (currentPath.includes('/tasks/') || currentPath.includes('/jobs/')) {
    return '상세';
  }
  if (currentPath.includes('/tasks')) {
    return '작업';
  }
  if (currentPath.includes('/jobs')) {
    return '일감';
  }
  if (currentPath.includes('/keys')) {
    return 'API 키';
  }
  if (currentPath.includes('/webhooks')) {
    return '웹훅';
  }
  if (currentPath.includes('/disputes')) {
    return '분쟁';
  }
  if (currentPath.includes('/settings')) {
    return '설정';
  }
  if (currentPath.includes('/profile')) {
    return '프로필';
  }
  if (currentPath.includes('/submissions/')) {
    return '제출';
  }

  const active = navItems
    ?.slice()
    .sort((a, b) => b.href.length - a.href.length)
    .find((item) => isActive(item.href, currentPath));

  if (active) {
    return active.label;
  }

  if (currentPath.startsWith('/workspace')) {
    return '역할 선택';
  }
  return '화면';
}

function isWorkspacePath(path: string) {
  return (
    path.startsWith('/workspace') || path.startsWith('/owner') || path.startsWith('/worker') || path.startsWith('/ai')
  );
}

export function PageFrame({
  badge,
  title,
  description,
  actions,
  navItems,
  currentPath,
  children
}: PageFrameProps) {
  const workspaceMode = currentPath ? isWorkspacePath(currentPath) : false;
  const locationTrail = currentPath
    ? `현재 위치: ${resolveWorkspaceLabel(currentPath)} / ${resolveCurrentLabel(currentPath, navItems)}`
    : null;
  const shouldRenderLocationTrail = locationTrail && !workspaceMode;
  const shouldRenderRoleNav = navItems && navItems.length > 0 && !workspaceMode;

  return (
    <main className="page-shell">
      {shouldRenderLocationTrail ? <p className="location-trail">{locationTrail}</p> : null}
      {shouldRenderRoleNav ? (
        <nav className="role-nav" aria-label="Role">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={isActive(item.href, currentPath) ? 'active' : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      ) : null}

      <section className="hero-panel reveal">
        {badge ? <p className="eyebrow">{badge}</p> : null}
        <h1>{title}</h1>
        <p>{description}</p>

        {actions && actions.length > 0 ? (
          <div className="hero-actions">
            {actions.map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className={action.variant === 'subtle' ? 'subtle-button' : 'solid-button'}
              >
                {action.label}
              </Link>
            ))}
          </div>
        ) : null}
      </section>

      <div className="stack">{children}</div>
    </main>
  );
}

export function Surface({
  title,
  subtitle,
  children
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <section className="surface reveal">
      <header className="surface-head">
        <h2>{title}</h2>
        {subtitle ? <p>{subtitle}</p> : null}
      </header>
      {children}
    </section>
  );
}

export function MetricStrip({ metrics }: { metrics: Metric[] }) {
  return (
    <section className="metric-strip reveal" aria-label="KPI">
      {metrics.map((metric) => (
        <article key={metric.label} className="metric-card" data-tone={metric.tone ?? 'neutral'}>
          <span>{metric.label}</span>
          <strong>{metric.value}</strong>
        </article>
      ))}
    </section>
  );
}

export function DataTable({ columns, rows }: { columns: TableColumn[]; rows: TableRow[] }) {
  return (
    <div className="table-wrap">
      <table className="hp-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>{column.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              {columns.map((column) => (
                <td key={column.key}>{row.values[column.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Checklist({ items }: { items: string[] }) {
  return (
    <ul className="checklist">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export function TwoColumn({ left, right }: { left: ReactNode; right: ReactNode }) {
  return (
    <section className="two-col reveal">
      <div>{left}</div>
      <div>{right}</div>
    </section>
  );
}

export function InlineNote({ children }: { children: ReactNode }) {
  return <p className="inline-note">{children}</p>;
}

export function StatusPill({ label, tone = 'neutral' }: { label: string; tone?: 'neutral' | 'ok' | 'warn' | 'danger' }) {
  return (
    <span className="status-pill" data-tone={tone}>
      {label}
    </span>
  );
}
