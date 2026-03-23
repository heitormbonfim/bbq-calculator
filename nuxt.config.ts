export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  ssr: false,

  modules: ['@nuxt/ui', '@vite-pwa/nuxt'],

  css: ['~/assets/css/main.css'],

  app: {
    head: {
      htmlAttrs: { lang: 'pt-BR' },
      title: 'Calculadora de Churrasco',
      meta: [
        { name: 'description', content: 'Calcule a quantidade ideal de carnes, bebidas e acompanhamentos para seu churrasco' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
        { name: 'theme-color', content: '#0c0a09' }
      ],
      link: [
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' }
      ]
    }
  },

  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      id: '/',
      name: 'Calculadora de Churrasco',
      short_name: 'Churrasco',
      description: 'Calcule a quantidade ideal de carnes, bebidas e acompanhamentos para seu churrasco',
      start_url: '/',
      scope: '/',
      theme_color: '#0c0a09',
      background_color: '#0c0a09',
      display: 'standalone',
      orientation: 'portrait',
      lang: 'pt-BR',
      categories: ['utilities', 'food'],
      icons: [
        { src: '/icon-192x192.png', sizes: '192x192', type: 'image/png' },
        { src: '/icon-512x512.png', sizes: '512x512', type: 'image/png' },
        { src: '/icon-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' }
      ]
    },
    workbox: {
      navigateFallback: '/',
      globPatterns: ['**/*.{js,css,html,png,svg,ico,woff2}'],
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/.*\.(png|jpg|jpeg|svg|gif|ico)$/,
          handler: 'CacheFirst',
          options: { cacheName: 'images', expiration: { maxEntries: 50, maxAgeSeconds: 30 * 24 * 60 * 60 } }
        }
      ]
    }
  },

  devtools: { enabled: true }
})
