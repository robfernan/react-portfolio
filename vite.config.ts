import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
    proxy: {
      // AviationPro weather tools call the NOAA aviationweather.gov API.
      // Proxy it in dev to avoid CORS (the app requests /aviationweather/*).
      '/aviationweather': {
        target: 'https://aviationweather.gov',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/aviationweather/, ''),
      },
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
})