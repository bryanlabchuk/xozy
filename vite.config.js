import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  base: '/xozy/', // Required for GitHub Pages (username.github.io/xozy/)
  plugins: [react()],
})
