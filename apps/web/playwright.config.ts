import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  webServer: {
    command: 'npm run dev',
    url: 'http://127.0.0.1:3000',
    timeout: 120_000,
    reuseExistingServer: !process.env.CI
  },
  use: {
    baseURL: 'http://127.0.0.1:3000',
    headless: true
  }
});
