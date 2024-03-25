import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/timed-automata-analysis/',
  build: {
    outDir: 'dist/timed-automata-analysis',
  },
  server: {
    open: true,
  },
});
