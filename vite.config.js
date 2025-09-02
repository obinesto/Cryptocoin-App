import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      pwaAssets: {
        image: 'public/assets/pwa-maskable-icon-512x512.png',
        preset: 'minimal-2023'
      },
      manifest: {
        name: 'Cryptocoin App',
        short_name: 'CryptoCoin',
        description: 'Application for tracking cryptocurrency information',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        scope: '/',
        start_url: '/',
      }
    })
  ]
})