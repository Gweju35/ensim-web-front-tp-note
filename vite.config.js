import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        liste: 'index.html',
        details: 'details.html',
        ajout: 'ajout.html',
      },
    },
  },
});
