import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// For GitHub Pages: If your site is at https://username.github.io/repo-name, use '/repo-name/'
// If your site is at https://username.github.io (root), use '/'
// For Netlify: use '/' (root)
export default defineConfig({
  plugins: [react()],
  base: '/',
})

