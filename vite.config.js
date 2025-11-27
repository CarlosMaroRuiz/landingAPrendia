import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api2': {
        target: 'https://aprendia.upchiapas.edu.mx',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api2/, '/api2')
      },
      '/api': {
        target: 'https://aprendia.upchiapas.edu.mx',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api')
      }
    }
  }
})
