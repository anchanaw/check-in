import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  devtools: { enabled: true },

  css: ['~/assets/css/mobile.css'],

  modules: [
    '@pinia/nuxt',
    [
      '@vite-pwa/nuxt',
      {
        registerType: 'autoUpdate',
        devOptions: {
          enabled: true,
        },
        manifest: {
          id: '/',
          name: 'CHECK-IN',
          short_name: 'CHECK-IN',
          description: 'Intern check-in system',
          start_url: '/',
          scope: '/',
          display: 'standalone',
          theme_color: '#6CBCFA',
          background_color: '#6CBCFA',
          icons: [
            {
              src: '/pwa/icon-192.png',
              sizes: '192x192',
              type: 'image/png',
            },
            {
              src: '/pwa/icon-512.png',
              sizes: '512x512',
              type: 'image/png',
            },
          ],
        },
      },
    ],
  ],

  // ✅ DEV PROXY (ทำงานเฉพาะตอน npm run dev)
  nitro: {
    devProxy: {
      '/api': {
        target: 'https://jiw-lovat.vercel.app',
        changeOrigin: true,
      },
    },
  },

  vite: {
    server: {
      allowedHosts: ['.ngrok-free.dev'],
    },
  },

  // ⚠️ เก็บไว้ได้ แต่ "ไม่ต้องใช้ในโค้ด frontend แล้ว"
  runtimeConfig: {
    public: {
      apiBase: import.meta.env.NUXT_PUBLIC_API_BASE || ''
    }
  },

  app: {
    head: {
      meta: [
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1, viewport-fit=cover',
        },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
      ],
      link: [
        {
          rel: 'manifest',
          href: '/manifest.webmanifest',
        },
      ],
    },
  },
})
