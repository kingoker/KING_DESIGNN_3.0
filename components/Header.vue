<template>
  <header
    ref="headerRef"
    :class="[
      'fixed top-5 left-0 right-0 mx-5 md:mx-auto md:max-w-4xl z-50 rounded-full bg-[#121926]/50 backdrop-blur-md border border-[#4E5562] shadow-[0_4px_12px_rgba(0,0,0,0.25)] transition-all duration-300',
      isHeaderVisible || mobileMenuOpen ? 'translate-y-0 opacity-100 pointer-events-auto' : '-translate-y-[120%] opacity-0 pointer-events-none'
    ]"
  >
  <!-- inset-x-5 -->
    <div class="h-16 w-full flex items-center justify-between px-4 sm:px-6 lg:px-8">
      <!-- ЛОГО -->
      <NuxtLink to="/" class="flex items-center space-x-2 hover:opacity-80 z-10">
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

      <!-- НАВИГАЦИЯ -->
      <nav class="hidden md:flex flex-1 justify-center items-center gap-[30px] z-10">
        <NuxtLink
          v-for="link in links"
          :key="link.text"
          :to="link.to"
          :class="[
            'tracking-wide font-medium text-base transition-all duration-200',
            route.path === link.to
              ? 'text-primary drop-shadow-[0_0_8px_rgba(0,255,209,0.9)]'
              : 'text-white hover:text-white hover:drop-shadow-[0_0_6px_rgba(0,255,209,0.7)]'
          ]"
        >
          {{ link.text }}
        </NuxtLink>
      </nav>

      <!-- ВХОД -->
      <NuxtLink
        to="/login"
        class="hidden md:flex items-center space-x-1 text-primary hover:text-white drop-shadow-[0_0_6px_rgba(0,255,209,0.8)] transition"
      >
        <span class="text-2xl">👑</span>
        <span class="font-medium text-sm hidden lg:inline">Войти</span>
      </NuxtLink>

      <!-- МЕНЮ ДЛЯ МОБИЛКИ -->
      <button @click="mobileMenuOpen = !mobileMenuOpen" class="md:hidden z-10 ml-auto focus:outline-none">
        <svg
          v-if="!mobileMenuOpen"
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 stroke-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 stroke-white"
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
          class="md:hidden absolute top-full mt-2 rounded-3xl left-0 w-full bg-[#121926]/90 backdrop-blur-xl border-t border-[#4E5562]"
        >
          <nav class="px-4 pt-2 pb-4 space-y-1">
            <NuxtLink
              v-for="link in links"
              :key="link.text"
              :to="link.to"
              @click="mobileMenuOpen = false"
              :class="[
                'block px-3 py-2 tracking-wide font-medium transition duration-150',
                route.path === link.to
                  ? 'text-primary'
                  : 'text-white hover:drop-shadow-[0_0_6px_rgba(0,255,209,0.7)]'
              ]"
            >
              {{ link.text }}
            </NuxtLink>

            <NuxtLink
              to="/login"
              @click="mobileMenuOpen = false"
              class="block px-3 py-2 tracking-wide font-medium text-primary rounded-2xl border flex items-center space-x-2"
            >
              <span class="text-xl">👑</span>
              <span class="">Войти</span>
            </NuxtLink>
          </nav>
        </div>
      </transition>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from '#imports'

const mobileMenuOpen = ref(false)
const headerRef = ref<HTMLElement>()
const route = useRoute()

const links = [
  { text: 'Главная',   to: '/' },
  { text: 'Проекты',   to: '/portfolio' },
  { text: 'О нас',     to: '/about' },
]
watch(() => route.path, () => {
  mobileMenuOpen.value = false
})

// --- Hide on scroll logic ---
const isHeaderVisible = ref(true)
let lastScroll = 0
let ticking = false

function onScroll() {
  if (mobileMenuOpen.value) {
    isHeaderVisible.value = true
    lastScroll = window.scrollY
    return
  }
  const curr = window.scrollY
  if (curr <= 0) {
    isHeaderVisible.value = true
  } else if (curr > lastScroll) {
    isHeaderVisible.value = false
  } else if (curr < lastScroll) {
    isHeaderVisible.value = true
  }
  lastScroll = curr
}

onMounted(() => {
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        onScroll()
        ticking = false
      })
      ticking = true
    }
  })
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
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
