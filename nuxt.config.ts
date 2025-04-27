// nuxt.config.ts
export default defineNuxtConfig({
  head: {
    script: [
      {
        src: 'https://www.googletagmanager.com/gtag/js?id=G-L6XV805N79',
        async: true,
      },
      {
        hid: 'gtag-init',
        innerHTML: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-L6XV805N79');
        `,
        type: 'text/javascript',
        charset: 'utf-8',
      },
    ],
    __dangerouslyDisableSanitizersByTagID: {
      'gtag-init': ['innerHTML'],
    },
  },

  // SSR по умолчанию
  ssr: true,

  modules: [
    '@nuxtjs/tailwindcss'
  ],

  build: {
    transpile: ['gsap']
  },

  plugins: [
    // Supabase-клиент (client-only)
    { src: '~/plugins/supabase.client.ts', mode: 'client' },
    // GSAP (client-only)
    { src: '~/plugins/gsap.client.ts', mode: 'client' },
  ],

  runtimeConfig: {
    public: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_KEY
    },
    telegramBotToken: process.env.TELEGRAM_BOT_TOKEN,
    telegramChatId: process.env.TELEGRAM_CHAT_ID,
  },

  app: {
    head: {
      title: 'KING DESIGNN', // Измените на нужный title
      link: [
        { rel: 'icon', type: 'image/x-icon', href: 'https://mir-s3-cdn-cf.behance.net/user/276/31ca23120630055.6569a05a93d8a.png' } // Укажите путь к вашему favicon
      ]
    }
  },

  devServer: {
    host: '0.0.0.0',
    port: 4000,
    https: false,        // ВАЖНО: отключаем HTTPS
  },

  css: ['~/assets/css/main.css'],

  compatibilityDate: '2025-04-22'
})