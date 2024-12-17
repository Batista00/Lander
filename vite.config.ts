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
      '@radix-ui/react-tooltip'
    ],
    force: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    chunkSizeWarningLimit: 1600,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('firebase')) {
              return 'firebase';
            }
            if (id.includes('@mui')) {
              return 'mui';
            }
            if (id.includes('@radix-ui')) {
              return 'ui';
            }
            if (id.includes('date-fns')) {
              return 'date-fns';
            }
            return 'vendor';
          }
        }
      }
    }
  },
  server: {
    port: 5173,
    strictPort: true,
    hmr: {
      timeout: 5000
    }
  }
});