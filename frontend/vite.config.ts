import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    // Force IPv4 — Cursor Simple Browser / many previews use 127.0.0.1.
    // host:true alone can still confuse clients that only try one stack.
    host: '127.0.0.1',
    port: 5173,
    strictPort: true,
    open: 'http://127.0.0.1:5173/',
    hmr: {
      host: '127.0.0.1',
      port: 5173,
      protocol: 'ws',
    },
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:5000',
        changeOrigin: true,
      },
    },
  },
  preview: {
    host: '127.0.0.1',
    port: 4173,
  },
});
