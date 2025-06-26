<!-- pages/portfolio.vue -->
<template>
  <section ref="root" class="relative overflow-hidden min-h-screen bg-black text-white py-20 px-4">
    <!-- Canvas-фон -->
    <canvas ref="canvas" class="absolute inset-0 w-full h-full"></canvas>

    <div class="relative z-10">
      <!-- Заголовок -->
      <h1 class="text-5xl font-extrabold text-center mb-12">
        <span class="text-cyan-400 drop-shadow-[0_0_20px_rgba(0,255,209,0.8)]">🖼️</span>
        <span
          class="inline-block ml-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-green-400
                 drop-shadow-[0_0_20px_rgba(0,255,209,0.8)]"
        >
          Портфолио проектов
        </span>
      </h1>

      <!-- Загрузка / пусто -->
      <div v-if="loading" class="text-center italic">Загрузка…</div>
      <div v-else-if="!projects.length" class="text-center text-gray-400">
        Здесь пока нет проектов.
      </div>

      <!-- Сетка карточек -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <NuxtLink
          v-for="p in projects"
          :key="p.id"
          :to="`/portfolio/${p.slug}`"
          class="
            relative block overflow-hidden rounded-2xl border-4 border-transparent
            bg-black/50 backdrop-blur-lg
            before:absolute before:inset-0 before:rounded-2xl
            before:border before:border-[rgba(0,255,209,0.6)]
            before:-z-10 before:animate-border-shift
            transition-transform transform hover:scale-105
          "
        >
          <!-- Изображение -->
          <img
            :src="p.image_url"
            alt=""
            class="relative z-10 w-full h-100 object-cover group-hover:brightness-110"
          />

          <!-- Информация -->
          <div class="relative z-10 p-4">
            <h2 class="text-xl font-semibold mb-2 text-cyan-300 transition">
              {{ p.title }}
            </h2>
            <p class="text-gray-300 mb-4 line-clamp-3">
              {{ p.short_description }}
            </p>
            <span
              class="
                inline-block px-3 py-1 rounded-full text-sm uppercase font-bold
                bg-gradient-to-r from-cyan-400 to-green-400 text-black
              "
            >
              {{ p.status === 'live' ? 'LIVE' : 'COMING SOON' }}
            </span>
          </div>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useProjects } from '~/composables/useProjects'
import gsap from 'gsap'

const { projects, loading, loadProjects } = useProjects()
onMounted(loadProjects)

// Canvas refs
const root   = ref<HTMLElement|null>(null)
const canvas = ref<HTMLCanvasElement|null>(null)
let ctx: CanvasRenderingContext2D|null = null

interface Star { x: number; y: number; vx: number; vy: number; size: number; alpha: number }
let stars: Star[] = []

// Подгоняем размер и пересоздаём звёзды
function resize() {
  if (!root.value || !canvas.value) return
  const w = root.value.clientWidth
  const h = root.value.clientHeight
  canvas.value.width  = w * (window.devicePixelRatio||1)
  canvas.value.height = h * (window.devicePixelRatio||1)
  canvas.value.style.width  = w + 'px'
  canvas.value.style.height = h + 'px'
  ctx = canvas.value.getContext('2d')
  if (ctx) ctx.scale(window.devicePixelRatio||1, window.devicePixelRatio||1)

  // создаём количество звёзд ~ плотность 1 на 15000px²
  const count = Math.floor((w*h)/15000)
  stars = []
  for (let i=0; i<count; i++) {
    stars.push({
      x: Math.random()*w,
      y: Math.random()*h,
      vx: (Math.random()-0.5)*0.3,
      vy: (Math.random()-0.5)*0.3,
      size: Math.random()*1.5+0.5,
      alpha: Math.random()
    })
    // мерцание
    gsap.to(stars[i], {
      alpha: Math.random(),
      duration: 1+Math.random()*1,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: Math.random()
    })
  }
}

// Рисуем кадр
function draw() {
  if (!ctx || !root.value) return
  const w = root.value.clientWidth
  const h = root.value.clientHeight
  ctx.clearRect(0, 0, w, h)
  ctx.fillStyle = 'rgba(0,255,209,1)'
  stars.forEach(s => {
    ctx.globalAlpha = s.alpha
    ctx.beginPath()
    ctx.arc(s.x, s.y, s.size, 0, Math.PI*2)
    ctx.fill()
    s.x += s.vx
    s.y += s.vy
    if (s.x<0||s.x>w)  s.vx*=-1
    if (s.y<0||s.y>h)  s.vy*=-1
  })
}

onMounted(() => {
  window.addEventListener('resize', resize)
  resize()
  gsap.ticker.add(draw)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', resize)
  gsap.ticker.remove(draw)
})
</script>

<style scoped>
@keyframes border-shift {
  0%,100% { border-color: rgba(0,255,209,0.6) }
  50%     { border-color: rgba(0,200,100,0.6) }
}
.before\:animate-border-shift:before {
  animation: border-shift 3s infinite ease-in-out;
}

/* Canvas на заднем плане */
canvas {
  position: absolute;
  inset: 0;
  z-index: 0;
}
</style>
