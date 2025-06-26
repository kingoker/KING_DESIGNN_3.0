<template>
  <header
    ref="headerRef"
    class="fixed top-0 left-0 w-full z-50 bg-black/20 backdrop-blur-lg border-b border-[#00ffd1]/50 shadow-[0_2px_10px_rgba(0,255,209,0.5)]"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative h-16 flex items-center justify-between">
  <!-- ЛОГОТИП -->
  <NuxtLink to="/" class="flex items-center space-x-2 z-10 hover:opacity-80">
    <img
      src="https://mir-s3-cdn-cf.behance.net/user/276/31ca23120630055.6569a05a93d8a.png"
      alt="KING DESIGNN"
      class="h-8 w-auto drop-shadow-[0_0_8px_rgba(0,255,209,0.8)]"
    />
    <span
      class="font-bold text-sm leading-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-green-400 drop-shadow-[0_0_6px_rgba(0,255,209,0.8)]"
    >
      KING<br />DESIGNN
    </span>
  </NuxtLink>

  <!-- НАВИГАЦИЯ ПО ЦЕНТРУ -->
  <nav class="hidden md:flex flex-1 justify-center items-center space-x-8 z-10">
    <NuxtLink
      v-for="link in links"
      :key="link.text"
      :to="link.to"
      :class="[
        'uppercase tracking-wide font-medium transition-colors duration-200',
        route.path === link.to
          ? 'text-white drop-shadow-[0_0_8px_rgba(0,255,209,0.9)]'
          : 'text-[#00ffd1] hover:text-[#00fff1] hover:drop-shadow-[0_0_8px_rgba(0,255,209,0.7)]'
      ]"
    >
      {{ link.text }}
    </NuxtLink>
  </nav>

  <!-- КНОПКА ВХОД -->
  <NuxtLink
    to="/login"
    aria-label="Login"
    class="hidden md:flex items-center space-x-1 text-[#00ffd1] hover:text-[#00fff1] drop-shadow-[0_0_6px_rgba(0,255,209,0.8)] transition-colors duration-200"
  >
    <span class="text-2xl">👑</span>
    <span class="uppercase font-medium text-sm hidden lg:inline">Вход</span>
  </NuxtLink>

  <!-- БУРГЕР ДЛЯ МОБИЛОК -->
  <button @click="mobileMenuOpen = !mobileMenuOpen" class="md:hidden z-10 ml-auto focus:outline-none">
    <svg
      v-if="!mobileMenuOpen"
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 w-6 stroke-[#00ffd1] drop-shadow-[0_0_6px_rgba(0,255,209,0.8)]"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="2"
    >
      <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
    <svg
      v-else
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 w-6 stroke-[#00ffd1] drop-shadow-[0_0_6px_rgba(0,255,209,0.8)]"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="2"
    >
      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  </button>

  <!-- Мобильное меню -->
<transition name="fade">
  <div
    v-if="mobileMenuOpen"
    class="md:hidden absolute top-full left-0 w-full bg-black/80 backdrop-blur-xl border-t border-[#00ffd1]/50"
  >
    <nav class="px-4 pt-2 pb-4 space-y-1">
      <NuxtLink
        v-for="link in links"
        :key="link.text"
        :to="link.to"
        @click="mobileMenuOpen = false"
        :class="[
          'block px-3 py-2 uppercase tracking-wide font-medium transition-colors duration-150',
          route.path === link.to
            ? 'text-white bg-[#00ffd1]/20'
            : 'text-[#00ffd1] hover:bg-[#00ffd1]/20'
        ]"
      >
        {{ link.text }}
      </NuxtLink>

      <!-- 👑 Вход (Мобильное) -->
      <NuxtLink
        to="/login"
        @click="mobileMenuOpen = false"
        class="block px-3 py-2 tracking-wide font-medium text-[#00ffd1] hover:bg-[#00ffd1]/20 transition flex items-center space-x-2"
      >
        <span class="text-xl">👑</span>
        <span class="uppercase">Вход</span>
      </NuxtLink>
    </nav>
  </div>
</transition>

</div>

  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute } from '#imports'
import { gsap } from 'gsap'

const mobileMenuOpen = ref(false)
const headerRef = ref<HTMLElement>()
const route = useRoute()

const links = [
  { text: 'Главная',   to: '/' },
  { text: 'Портфолио', to: '/portfolio' },
  { text: 'Блог',      to: '/blog' },
  { text: 'Команда',   to: '/team' },
  { text: 'Контакты',  to: '/contacts' },
]

onMounted(() => {
  if (headerRef.value) {
    gsap.to(headerRef.value, {
      boxShadow: '0 0 20px 5px #00ffd1',
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })
  }
})

// Закрывать мобильное меню при смене маршрута
watch(() => route.path, () => {
  mobileMenuOpen.value = false
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
