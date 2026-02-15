import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    svgr()
  ],
  base: '/',
  server: {
    proxy: {
      '/media': {
        target: 'https://jiujitsuunicamp.com.br',
        changeOrigin: true,
      }
    }
  }
})
