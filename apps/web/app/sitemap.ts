import type { MetadataRoute } from 'next';
import { absoluteUrl } from '@/lib/seo';

const publicRoutes = [
  { path: '/', changeFrequency: 'daily', priority: 1 },
  { path: '/how-it-works', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/pricing', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/faq', changeFrequency: 'weekly', priority: 0.7 },
  { path: '/policy', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/api-docs', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/trust', changeFrequency: 'weekly', priority: 0.7 },
  { path: '/policies/terms', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/policies/privacy', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/policies/refund', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/policies/task-policy', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/llms.txt', changeFrequency: 'monthly', priority: 0.5 },
  { path: '/llms-full.md', changeFrequency: 'monthly', priority: 0.5 }
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return publicRoutes.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority
  }));
}
