/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    setupFiles: './test/setup.ts',
    globals: true,
    environment:'jsdom',
    coverage: {
      provider: 'istanbul' // or 'v8'
    },
  },
})
