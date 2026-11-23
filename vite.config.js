import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Served from https://pbarick.github.io/Jackrabbit-react/
export default defineConfig({
  base: '/Jackrabbit-react/',
  plugins: [react()],
})
