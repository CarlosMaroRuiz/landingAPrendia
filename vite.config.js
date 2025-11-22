import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '')

  return {
    plugins: [react(), tailwindcss()],
    server: {
      proxy: {
        '/api/core': {
          target: env.VITE_API_CORE,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/core/, '/api')
        },
        '/api/form': {
          target: env.VITE_API_SERVICES_FORM,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/form/, '')
        }
      }
    }
  }
})
