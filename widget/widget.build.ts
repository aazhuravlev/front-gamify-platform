import { resolve } from 'path';

import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import { libInjectCss } from 'vite-plugin-lib-inject-css';

export default defineConfig({
  plugins: [vue(), libInjectCss()],
  build: {
    lib: {
      entry: resolve(__dirname, 'entry.ts'),
      name: 'widget',
      fileName: () => 'widget.js',
      formats: ['umd'],
    },
    outDir: resolve(__dirname, '../public'),
    emptyOutDir: false,
    rollupOptions: {
      external: [],
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "${resolve(__dirname, '../app/assets/styles/injectable.scss')}" as *;`,
      },
    },
  },
  define: {
    'process.env': {},
  },
});
