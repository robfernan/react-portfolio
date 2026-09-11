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
    // No source maps in production (smaller download, less exposed internals).
    // Set to 'hidden' if you still want them locally for debugging.
    sourcemap: false,
    // We code-split the heavy AviationPro app; only warn on genuinely large chunks.
    chunkSizeWarningLimit: 600
  }
})