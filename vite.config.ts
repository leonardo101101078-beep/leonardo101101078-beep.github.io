import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/hamstock/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icon.svg', 'favicon-32.png', 'apple-touch-icon.png', 'icons/*.png'],
      manifest: {
        name: '囤囤鼠 Hamstock',
        short_name: '囤囤鼠',
        description: '家居補貨小幫手：紅綠燈提醒你該採買什麼',
        theme_color: '#FFD84D',
        background_color: '#FFF7E8',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/hamstock/',
        scope: '/hamstock/',
        lang: 'zh-Hant',
        icons: [
          {
            src: 'icons/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'icons/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'icons/maskable-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
    }),
  ],
})
