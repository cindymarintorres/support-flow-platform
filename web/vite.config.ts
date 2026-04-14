import path from "path"
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  // Carga las variables de entorno basadas en el modo (dev, prod, etc.)
  // El tercer parámetro '' carga todas las variables sin importar el prefijo VITE_
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "@support-flow/shared": path.resolve(__dirname, "../shared/src/index.ts")
      },
    },
    server: {
      host: '0.0.0.0',
      port: 5173,
      proxy: {
        '/api': {
          // Usamos la variable cargada o el fallback
          target: env.VITE_PROXY_TARGET || 'http://localhost:3000',
          changeOrigin: true,
          // REVISA ESTO: NestJS suele tener el prefijo /api en sus rutas.
          // Si tu backend ya espera /api/tickets, NO uses el rewrite.
          // rewrite: (path) => path.replace(/^\/api/, ''), 
        }
      },
      watch: {
        usePolling: true, // Excelente para Docker en Windows/Mac
      },
    },
  }
})