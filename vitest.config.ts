import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config';

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      pool: 'threads',
      globals: true,
      setupFiles: ['./src/test/setup.ts'],
      css: true,
      coverage: {
        provider: 'v8',
        reporter: ['text', 'lcov', 'html'],
        reportsDirectory: 'coverage',
        include: ['src/**/*.{ts,tsx}'],
        exclude: [
          'src/main.tsx',
          'src/App.js',
          'src/vite-env.d.ts',
          'src/test/**',
          'src/**/*.d.ts',
          'src/**/*.test.{ts,tsx}',
          // Dead code: unused by App.tsx and depends on the uninstalled
          // react-joyride package, so it can't even be parsed for coverage.
          'src/components/Tour.tsx',
          'src/hooks/useTour.ts',
        ],
      },
    },
  })
);
