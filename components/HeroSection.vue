<!-- components/HeroSection.vue -->
<template>
  <section ref="root" class="bg-black relative overflow-hidden h-screen">
    <!-- Canvas для звёзд -->
    <canvas ref="canvas" class="absolute inset-0 w-full h-full"></canvas>

    <!-- Контент поверх фона -->
    <div class="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
      <h1 ref="title"
          class="uppercase font-black text-white text-6xl sm:text-7xl md:text-8xl lg:text-9xl leading-tight drop-shadow-[0_0_15px_rgba(0,255,209,0.9)]">
        KING DESIGNN<br>
        <span class="tracking-widest inline-flex items-center">
          STUDIO
          <img
            src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExdHBmbGhqY3BrcWhqZzQyeXlrcjZvOWRkOHkwcXdyeWYwdjU2ZGJ6ciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/VGVE4PeGQO0krhLh9T/giphy.gif"
            alt="Studio"
            loading="lazy"
            class="h-[1em] w-auto ml-2"
          />
        </span>
      </h1>
      <p ref="subtitle"
         class="mt-4 text-white/70 text-lg sm:text-xl md:text-2xl drop-shadow-[0_0_8px_rgba(0,255,209,0.7)]">
        Инновации. Эстетика. Ваше будущее начинается здесь.
      </p>
      <button ref="cta"
              @click="$router.push('/quiz')"
              class="mt-8 px-8 py-4 bg-gradient-to-r from-cyan-500 to-green-400
                     text-white uppercase tracking-wider font-bold rounded-lg
                     shadow-[0_0_10px_rgba(0,255,209,0.8)]
                     hover:shadow-[0_0_20px_rgba(0,255,209,1)]
                     transition-shadow duration-300">
        ✨ Рассчитать стоимость
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import gsap from 'gsap'

const root    = ref<HTMLElement|null>(null)
const canvas  = ref<HTMLCanvasElement|null>(null)
const title   = ref<HTMLElement|null>(null)
const subtitle= ref<HTMLElement|null>(null)
const cta     = ref<HTMLElement|null>(null)

let ctx: CanvasRenderingContext2D|null = null
let stars: { x: number; y: number; size: number; alpha: number }[] = []

// Настройка канваса и генерация звёзд
function resizeCanvas() {
  if (!root.value || !canvas.value) return
  const dpr = window.devicePixelRatio || 1
  const w = root.value.clientWidth
  const h = root.value.clientHeight
  canvas.value.width  = w * dpr
  canvas.value.height = h * dpr
  ctx = canvas.value.getContext('2d')
  if (ctx) ctx.scale(dpr, dpr)
  initStars(w, h)
}

// Создать массив звёзд и запустить их мерцание
function initStars(width: number, height: number) {
  stars = []
  const count = Math.floor((width * height) / 8000)
  for (let i = 0; i < count; i++) {
    const star = {
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.5 + 0.5,
      alpha: Math.random()
    }
    stars.push(star)
    // GSAP-анимация альфы (мерцание)
    gsap.to(star, {
      alpha: Math.random(),
      duration: 1 + Math.random() * 1,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: Math.random()
    })
  }
}

// Отрисовка кадра
function render() {
  if (!ctx || !root.value) return
  const w = root.value.clientWidth
  const h = root.value.clientHeight
  ctx.clearRect(0, 0, w, h)
  ctx.fillStyle = 'rgba(0,255,209,1)'
  stars.forEach(s => {
    ctx.globalAlpha = s.alpha
    ctx.beginPath()
    ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2)
    ctx.fill()
  })
}

onMounted(() => {
  // 1) GSAP-анимация текста и кнопки
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
  tl
    .from(title.value,     { y: 100, opacity: 0, duration: 1.2 })
    .from(subtitle.value,  { y:  50, opacity: 0, duration: 1   }, '-=0.8')
    .from(cta.value,       { scale: 0.6, opacity: 0, duration: 0.8 }, '-=0.6')
    .to(cta.value,         { scale: 1.05, repeat: -1, yoyo: true, duration: 1.5, ease: 'sine.inOut', delay: 1 })
  // 2) Канвас + рендер звёзд
  window.addEventListener('resize', resizeCanvas)
  resizeCanvas()
  gsap.ticker.add(render)
})

onBeforeUnmount(() => {
  gsap.ticker.remove(render)
  window.removeEventListener('resize', resizeCanvas)
})
</script>

<style scoped>
/* Canvas под контентом */
canvas {
  position: absolute;
  inset: 0;
  z-index: 0;
}
/* Сам разделитель контента */
section {
  position: relative;
}
</style>
