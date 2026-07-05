import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// Обязательно должен быть export default!
export default defineConfig({
  plugins: [vue()],
});