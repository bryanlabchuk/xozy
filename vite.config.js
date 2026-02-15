import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  base: './', // Relative paths - works reliably on GitHub Pages (username.github.io/xozy/)
  plugins: [react()],
})
