import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: false, // We'll rely on the manual meta tags for now but let the Service Worker handle cache update
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,jsx}']
      }
    })
  ],
})
