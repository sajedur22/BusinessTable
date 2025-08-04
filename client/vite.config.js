import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const url = process.env.VITE_API_BASE_URL || 'http://localhost:5050'; // works in config
console.log(url)
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api/v1': {
        target: url,
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
