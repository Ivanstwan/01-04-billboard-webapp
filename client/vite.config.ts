import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [TanStackRouterVite(), react()],
  server: {
    port: 3000,
  },
  preview: {
    port: 3000,
  },
});
