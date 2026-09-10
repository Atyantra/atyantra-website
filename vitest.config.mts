import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'

const rootDir = import.meta.dirname

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./test/setup.ts'],
    globals: true,
    include: ['test/**/*.test.{ts,tsx}'],
    exclude: ['node_modules', '.next', '.worktrees'],
  },
  resolve: { alias: { '@': resolve(rootDir, '.') } },
})
