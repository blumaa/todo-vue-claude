/// <reference types="vitest" />
import { defineConfig } from 'vite';

import vue from '@vitejs/plugin-vue';
import UnoCSS from 'unocss/vite';

export default defineConfig({
  plugins: [UnoCSS(), vue()],
  resolve: {
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],

    alias: {
      '@': '/src',
    },
  },
  test: {
    retry: 3,
    globals: true,
    environment: 'jsdom',
    include: [
      '**/__tests__/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
      '**/__tests__/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
    ],
    alias: {
      '@': '/src',
    },
  },
});
