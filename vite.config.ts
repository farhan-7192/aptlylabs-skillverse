import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const rootDir = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(rootDir, 'src'),
      },
      {
        find: '@components',
        replacement: path.resolve(rootDir, 'src/components/common'),
      },
      {
        find: '@utils',
        replacement: path.resolve(rootDir, 'src/lib'),
      },
    ],
  },
})
