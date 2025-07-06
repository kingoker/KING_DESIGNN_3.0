<template>
  <footer class="bg-zinc-950 text-white pt-12 pb-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:justify-between gap-8">
      <!-- Логотип и копирайт -->
      <div class="flex flex-col items-center md:items-start space-y-4">
        <NuxtLink to="/" class="flex items-center space-x-2">
          <img
            src="https://mir-s3-cdn-cf.behance.net/user/276/31ca23120630055.6569a05a93d8a.png"
            alt="KING DESIGNN"
            class="h-8 w-auto drop-shadow-[0_0_6px_rgba(0,255,209,0.7)]"
          />
          <span
            class="font-bold text-sm leading-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-green-400"
          >
            KING<br />DESIGNN
          </span>
        </NuxtLink>
        <p class="text-sm text-gray-400 text-center md:text-left">
          © {{ new Date().getFullYear() }} KING DESIGNN. Все права защищены.
        </p>
      </div>

      <!-- Навигация -->
      <nav class="flex flex-wrap justify-center md:justify-center gap-4 text-sm uppercase tracking-wide">
        <NuxtLink
          v-for="link in links"
          :key="link.text"
          :to="link.to"
          class="text-[#00ffd1] hover:text-[#00fff1] hover:drop-shadow-[0_0_6px_rgba(0,255,209,0.7)] transition-colors duration-200"
        >
          {{ link.text }}
        </NuxtLink>
      </nav>

      <!-- Соцсети и контакты -->
      <div class="flex flex-col items-center md:items-end space-y-4">
        <h3 class="text-cyan-400 uppercase text-sm font-semibold tracking-wide drop-shadow-[0_0_6px_rgba(0,255,209,0.7)]">
          Контакты
        </h3>
        <p class="text-sm">
          <a href="mailto:info@kingdesignn.ru" class="hover:underline">info@kingdesignn.ru 📧</a>
        </p>
        <p class="text-sm">
          <a href="mailto:zolotojznak@gmail.com" class="hover:underline">zolotojznak@gmail.com 📧</a>
        </p>
        <p class="text-sm">
          <a href="tel:+19297373991" class="hover:underline">+1 929 737 39 91 📞</a>
        </p>

        <div class="flex space-x-4 pt-2">
          <a href="https://www.instagram.com/king_designn/" aria-label="Instagram">
            <Instagram class="h-6 w-6 text-[#00ffd1] hover:text-[#00fff1] transition-colors duration-200" />
          </a>
          <a href="#" aria-label="YouTube">
            <Youtube class="h-6 w-6 text-[#00ffd1] hover:text-[#00fff1] transition-colors duration-200" />
          </a>
          <a
            href="https://t.me/king_designn"
            aria-label="Telegram"
            class="inline-block"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Telegram_2019_Logo.svg/800px-Telegram_2019_Logo.svg.png"
              alt="Telegram"
              class="h-6 w-6 object-contain drop-shadow-[0_0_6px_rgba(0,255,209,0.7)] hover:opacity-80 transition-opacity duration-200"
            />
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { Instagram, Youtube } from 'lucide-vue-next'

const links = [
  { text: 'Главная', to: '/' },
  { text: 'Портфолио', to: '/portfolio' },
  { text: 'Интересное', to: '/blog' },
  { text: 'Команда', to: '/team' },
  { text: 'Контакты', to: '/contacts' },
]
</script>

<style scoped>
footer {
  backdrop-filter: blur(8px);
}
</style>
