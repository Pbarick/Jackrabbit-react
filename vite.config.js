import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Served from https://pbarick.github.io/jackrabbit-react/
export default defineConfig({
  base: '/jackrabbit-react/',
  plugins: [react()],
})
