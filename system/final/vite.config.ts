/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    setupFiles: './test/setup.ts',
    globals: true,
    environment:'jsdom',
    coverage: {
      provider: 'istanbul' // or 'v8'
    },
  },
})

