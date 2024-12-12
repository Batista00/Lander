import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    dedupe: ['react', 'react-dom'],
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    commonjsOptions: {
      include: [/node_modules/],
      transformMixedEsModules: true
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: [
            'react',
            'react-dom',
            'react-router-dom',
            'react-beautiful-dnd',
            'react-hot-toast',
            'framer-motion',
            'i18next',
            'react-i18next',
            'firebase',
            'clsx',
            'zustand'
          ]
        }
      }
    }
  },
  optimizeDeps: {
    include: [
      'react-beautiful-dnd',
      'react-hot-toast',
      'framer-motion',
      'i18next',
      'react-i18next',
      'firebase',
      'clsx',
      'zustand'
    ]
  },
  server: {
    port: 5173,
  }
});