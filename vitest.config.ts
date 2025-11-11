import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: ['__tests__/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      include: [
        'registry/default/crudkit/**/*.{ts,tsx}',
      ],
      exclude: [
        'node_modules/',
        '__tests__/',
        '**/*.config.*',
        '**/dist/**',
        '**/build/**',
        '**/*.d.ts',
        '**/public/**',
        '**/.next/**',
        '**/src/app/**',
        '**/registry/index.json',
        '**/*registry-item.json',
        '**/mock-*.ts', // Exclude mock data and schema files from coverage
        '**/task-schema.ts',
        '**/user-schema.ts',
      ],
      thresholds: {
        lines: 60,
        functions: 60,
        branches: 50,
        statements: 60,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
