// nuxt.config.ts
export default defineNuxtConfig({
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
  },

  css: ['~/assets/css/main.css'],

  compatibilityDate: '2025-04-22'
})