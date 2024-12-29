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
    include: ['sonner', '@radix-ui/react-tooltip']
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
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('@radix-ui')) {
              return 'vendor-radix';
            }
            if (id.includes('@mui')) {
              return 'vendor-mui';
            }
            if (id.includes('firebase')) {
              return 'vendor-firebase';
            }
            if (id.includes('sonner')) {
              return 'vendor-sonner';
            }
            return 'vendor';
          }
        }
      }
    }
  }
});