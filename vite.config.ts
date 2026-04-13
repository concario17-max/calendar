/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  resolve: {
    preserveSymlinks: true,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }

          if (id.includes('/src/data/guaData.ts')) {
            return 'gua-texts';
          }

          if (id.includes('/src/data/yaoData.ts')) {
            return 'yao-texts';
          }

          if (id.includes('/src/data/soulData.ts')) {
            return 'soul-texts';
          }

          return undefined;
        },
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    pool: 'threads',
    setupFiles: ['./src/test/setup.ts'],
  },
});
