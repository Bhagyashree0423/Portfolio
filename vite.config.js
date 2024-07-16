import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5001', // Your backend server address
        // target: 'http://0.0.0.0:5001/'
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
    },
  },
  optimizeDeps: {
    include: ['formik', 'yup'],
  },
  build: {
    sourcemap: true,
    outDir: 'dist'
  },
});
