import type { Route } from 'next';

export type NavGroup = 'main' | 'wallet' | 'profile' | 'utility';

export type NavItem = {
  href: Route;
  label: string;
  group?: NavGroup;
};

export const aiNav: NavItem[] = [
  { href: '/workspace', label: '워크스페이스', group: 'utility' },
  { href: '/ai/dashboard', label: '대시보드', group: 'main' },
  { href: '/ai/tasks', label: '작업', group: 'main' },
  { href: '/ai/reviews', label: '검토', group: 'main' },
  { href: '/ai/keys', label: 'API 키', group: 'main' },
  { href: '/ai/webhooks', label: '웹훅', group: 'main' },
  { href: '/ai/disputes', label: '분쟁', group: 'main' },
  { href: '/ai/wallet', label: '정산', group: 'wallet' }
];

export const ownerNav: NavItem[] = [
  { href: '/workspace', label: '워크스페이스', group: 'utility' },
  { href: '/owner/dashboard', label: '대시보드', group: 'main' },
  { href: '/owner/tasks/new', label: '새 작업', group: 'main' },
  { href: '/owner/reviews', label: '검토함', group: 'main' },
  { href: '/owner/disputes', label: '분쟁', group: 'main' },
  { href: '/owner/settings', label: '설정', group: 'main' },
  { href: '/owner/wallet', label: '지갑', group: 'wallet' }
];

export const workerNav: NavItem[] = [
  { href: '/workspace', label: '워크스페이스', group: 'utility' },
  { href: '/worker/jobs', label: '일감찾기', group: 'main' },
  { href: '/worker/disputes', label: '분쟁', group: 'main' },
  { href: '/worker/earnings', label: '정산', group: 'wallet' },
  { href: '/worker/profile', label: '프로필', group: 'profile' }
];
