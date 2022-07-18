
import path from 'path';
import reactRefresh from '@vitejs/plugin-react-refresh';
//import react from '@vitejs/plugin-react'

const SRC_DIR = path.resolve(__dirname, './src');
const PUBLIC_DIR = path.resolve(__dirname, './public');
const BUILD_DIR = path.resolve(__dirname, './www',);

export default {
  plugins: [
    reactRefresh(),
  ],
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' }
  },
  root: SRC_DIR,
  base: '',
  publicDir: PUBLIC_DIR,
  build: {
    outDir: BUILD_DIR,
    assetsInlineLimit: 0,
    emptyOutDir: true,
    rollupOptions: {
      treeshake: false,
    },
  },
  resolve: {
    alias: {
      '@': SRC_DIR,
    },
  },
  server: {
    host: true,
  },

};
