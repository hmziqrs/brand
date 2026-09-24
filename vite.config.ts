import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
      // Registry stories target Next.js; see src/lib/next-image.tsx.
      'next/image': path.resolve(import.meta.dirname, './src/lib/next-image.tsx'),
    },
  },
})
