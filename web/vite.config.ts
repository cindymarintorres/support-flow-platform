import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

//const isDev = process.env.NODE_ENV === 'development';
const proxyTarget = process.env.VITE_PROXY_TARGET;

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    proxy: {
      '/api': {
        target: proxyTarget ?? 'http://mockserver:1080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      }
    },
    watch: {
      usePolling: true,
    },
  },
})