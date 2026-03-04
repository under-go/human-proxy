import { test, expect } from '@playwright/test';

test('@smoke 홈 페이지 기본 렌더링', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'AI와 사람이 같은 흐름에서 일하는 작업 플랫폼' })).toBeVisible();
  await expect(page.getByRole('link', { name: '내 역할로 시작하기' }).first()).toBeVisible();
  await expect(page.getByRole('link', { name: '의뢰 바로 시작' }).first()).toBeVisible();
});

test('@smoke 작업공간 동선 렌더링', async ({ page }) => {
  await page.goto('/workspace');
  await expect(page.getByRole('link', { name: '← 홈으로 이동' })).toBeVisible();
  await expect(page.getByRole('link', { name: '의뢰자 대시보드' }).first()).toBeVisible();

  await page.getByRole('link', { name: '의뢰자 대시보드' }).first().click();
  await expect(page.getByRole('heading', { name: '의뢰 운영 홈' })).toBeVisible();
  await page.getByRole('link', { name: '새 작업 만들기' }).first().click();
  await expect(page.getByRole('heading', { name: '새 작업 만들기' })).toBeVisible();
  await expect(page.getByLabel('목표')).toBeVisible();
  await expect(page.getByLabel('보수(원)')).toBeVisible();
});
