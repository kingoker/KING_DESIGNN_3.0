<template>
  <section ref="root" class="bg-background min-h-screen">
    <!-- Контент -->
    <div class="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
      <h1 ref="title" class="mt-[130px] text-white font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-6xl leading-tight">
        Дизайн. Автоматизация.
      </h1>
      <p ref="subtitle" class="max-w-3xl mt-4 text-gray-300 text-base sm:text-lg md:text-2xl">
        Мы создаём WOW-дизайн, автоматизируем бизнес-процессы и выводим бренды на новый уровень с помощью технологий.
      </p>

      <!-- Кнопки -->
      <div class="mt-8 flex flex-col sm:flex-row gap-4">
        <button
          @click="$router.push('/portfolio')"
          class="px-12 py-3 text-black font-semibold text-2xl rounded-full bg-[#24F038] hover:brightness-110 transition">
          ПОСМОТРЕТЬ ПРОЕКТЫ
        </button>
        <button
          @click="$router.push('/quiz')"
          class="px-12 py-3 text-white font-semibold text-2xl rounded-full border border-white hover:bg-white/20 hover:text-primary hover:border-primary transition">
          ОБСУДИТЬ ПРОЕКТ
        </button>
      </div>

      <!-- Изображение -->
      <img
        ref="image"
        src="https://exfjkcbeouskioxzejkv.supabase.co/storage/v1/object/public/other//main%20robots.png"
        alt="Роботы"
        class="mt-[100px] mb-10 max-w-full w-[700px] sm:w-[800px] lg:w-[900px]"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import gsap from 'gsap'

const root = ref<HTMLElement | null>(null)
const canvas = ref<HTMLCanvasElement | null>(null)
const title = ref<HTMLElement | null>(null)
const subtitle = ref<HTMLElement | null>(null)
const image = ref<HTMLElement | null>(null)

let ctx: CanvasRenderingContext2D | null = null
let stars: { x: number; y: number; size: number; alpha: number }[] = []

function resizeCanvas() {
  if (!root.value || !canvas.value) return
  const dpr = window.devicePixelRatio || 1
  const w = root.value.clientWidth
  const h = root.value.clientHeight
  canvas.value.width = w * dpr
  canvas.value.height = h * dpr
  ctx = canvas.value.getContext('2d')
  if (ctx) ctx.scale(dpr, dpr)
  initStars(w, h)
}

function initStars(width: number, height: number) {
  stars = []
  const count = Math.floor((width * height) / 8000)
  for (let i = 0; i < count; i++) {
    const star = {
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.5 + 0.5,
      alpha: Math.random(),
    }
    stars.push(star)
    gsap.to(star, {
      alpha: Math.random(),
      duration: 1 + Math.random() * 1,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: Math.random(),
    })
  }
}

function render() {
  if (!ctx || !root.value) return
  const w = root.value.clientWidth
  const h = root.value.clientHeight
  ctx.clearRect(0, 0, w, h)
  ctx.fillStyle = 'rgba(0,255,209,1)'
  stars.forEach((s) => {
    ctx.globalAlpha = s.alpha
    ctx.beginPath()
    ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2)
    ctx.fill()
  })
}

onMounted(() => {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
  tl.from(title.value, { y: 80, opacity: 0, duration: 1 })
    .from(subtitle.value, { y: 40, opacity: 0, duration: 1 }, '-=0.6')
    .from(image.value, { y: 60, opacity: 0, duration: 1 }, '-=0.5')

  resizeCanvas()
  window.addEventListener('resize', resizeCanvas)
  gsap.ticker.add(render)
})

onBeforeUnmount(() => {
  gsap.ticker.remove(render)
  window.removeEventListener('resize', resizeCanvas)
})
</script>

<style scoped>
canvas {
  position: absolute;
  inset: 0;
  z-index: 0;
}
</style>
