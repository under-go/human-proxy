import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    include: ['src/**/*.{test,spec}.{ts,tsx}', 'app/**/*.{test,spec}.{ts,tsx}'],
    exclude: ['tests/**', 'node_modules/**', 'dist/**']
  }
});
