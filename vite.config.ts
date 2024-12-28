import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    }
  },
  define: {
    'process.env': process.env,
    'global': {},
    'require': {
      'require': 'globalThis.require'
    }
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@mui/material',
      '@mui/icons-material',
      '@mui/x-date-pickers',
      'date-fns',
      'sonner',
      '@radix-ui/react-tooltip',
      '@google/generative-ai'
    ],
    force: true,
    esbuildOptions: {
      target: 'es2020',
      define: {
        global: 'globalThis',
        'process.env.NODE_ENV': '"production"',
        'require': 'globalThis.require'
      },
      supported: {
        'top-level-await': true
      }
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    chunkSizeWarningLimit: 1600,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['@mui/material', '@mui/icons-material', '@mui/x-date-pickers'],
          ai: ['@google/generative-ai'],
          firebase: ['firebase/app', 'firebase/auth', 'firebase/firestore', 'firebase/storage']
        }
      }
    }
  },
  server: {
    port: 5173,
    host: true
  }
});