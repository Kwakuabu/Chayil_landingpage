import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/fawwerty/',
  plugins: [react()],
  server: {
    port: 8000,
    proxy: {
      // Proxy API requests to the Laravel backend to avoid CORS and ensure
      // the frontend calls the backend at http://127.0.0.1:3001/api
      '/api': {
        target: 'http://127.0.0.1:3001',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '/api')
      }
    }
  },
  build: {
    rollupOptions: {
      input: './index.html'
    }
  }
})
