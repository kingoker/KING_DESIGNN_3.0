<template>
  <section ref="root" class="bg-background min-h-screen flex items-center justify-center">
    <!-- Контент -->
    <div class="relative z-10 flex flex-col items-center justify-center w-full max-w-5xl mx-auto text-center px-4">
      <h1 ref="title" class="text-white font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-6xl leading-tight">
        Дизайн. Автоматизация.
      </h1>
      <p ref="subtitle" class="max-w-3xl mt-4 text-gray-300 text-base sm:text-lg md:text-2xl">
        Мы создаём WOW-дизайн, автоматизируем бизнес-процессы и выводим бренды на новый уровень с помощью технологий.
      </p>

      <!-- Кнопки -->
      <div class="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
        <button
          @click="$router.push('/portfolio')"
          class="main-gradient-btn">
          ПОСМОТРЕТЬ ПРОЕКТЫ
        </button>
        <button
          @click="$router.push('/quiz')"
          class="px-12 py-3 text-white font-semibold text-2xl rounded-full border border-white hover:bg-white/20 hover:text-primary hover:border-primary transition">
          ОБСУДИТЬ ПРОЕКТ
        </button>
      </div>

      <!-- 3D-tilt картинка -->
      <div
        ref="tiltWrap"
        class="relative mt-6 mb-0 max-w-full w-[320px] sm:w-[500px] md:w-[700px] lg:w-[900px] tilt-wrap"
        @mousemove="onTiltMove"
        @mouseleave="onTiltLeave"
      >
        <img
          ref="image"
          src="https://exfjkcbeouskioxzejkv.supabase.co/storage/v1/object/public/other//main%20robots.png"
          alt="Роботы"
          class="block w-full rounded-2xl tilt-img"
          :style="tiltStyle"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import gsap from 'gsap'

const root = ref<HTMLElement | null>(null)
const canvas = ref<HTMLCanvasElement | null>(null)
const title = ref<HTMLElement | null>(null)
const subtitle = ref<HTMLElement | null>(null)
const image = ref<HTMLElement | null>(null)
const glossyWrap = ref<HTMLElement | null>(null)
const glossyX = ref(50)
const glossyY = ref(50)
const glossyOpacity = ref(0.7)

const glossyStyle = computed(() => ({
  left: `${glossyX.value}%`,
  top: `${glossyY.value}%`,
  opacity: glossyOpacity.value,
}))

let ctx: CanvasRenderingContext2D | null = null
let stars: { x: number; y: number; size: number; alpha: number }[] = []

const tiltWrap = ref<HTMLElement | null>(null)
const tiltX = ref(0)
const tiltY = ref(0)
const tiltScale = ref(1)
// убираем тень
// const tiltShadow = ref('0 20px 60px 0 rgba(0,0,0,0.35)')

const tiltStyle = computed(() => ({
  transform: `perspective(900px) rotateX(${tiltY.value}deg) rotateY(${-tiltX.value}deg) scale(${tiltScale.value})`,
  // boxShadow: tiltShadow.value,
  transition: 'transform 0.5s cubic-bezier(.25,.8,.25,1)',
}))

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
  if (!ctx) return
  ctx.clearRect(0, 0, w, h)
  ctx.fillStyle = 'rgba(0,255,209,1)'
  stars.forEach((s) => {
    if (!ctx) return
    ctx.globalAlpha = s.alpha
    ctx.beginPath()
    ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2)
    ctx.fill()
  })
}

function onGlossyMove(e: MouseEvent) {
  const wrap = glossyWrap.value
  if (!wrap) return
  const rect = wrap.getBoundingClientRect()
  const x = ((e.clientX - rect.left) / rect.width) * 100
  const y = ((e.clientY - rect.top) / rect.height) * 100
  glossyX.value = x
  glossyY.value = y
  glossyOpacity.value = 0.7
}
function onGlossyLeave() {
  glossyOpacity.value = 0.3
}

function onTiltMove(e: MouseEvent) {
  const wrap = tiltWrap.value
  if (!wrap) return
  const rect = wrap.getBoundingClientRect()
  const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
  const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
  tiltX.value = x * 8
  tiltY.value = -y * 8
  tiltScale.value = 1.03
  // tiltShadow.value = `0 ${30 + y * 10}px ${80 + Math.abs(x) * 20}px 0 rgba(0,0,0,0.38)`
}
function onTiltLeave() {
  tiltX.value = 0
  tiltY.value = 0
  tiltScale.value = 1
  // tiltShadow.value = '0 20px 60px 0 rgba(0,0,0,0.35)'
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
.main-gradient-btn {
  @apply px-12 py-3 text-black font-semibold text-2xl rounded-full shadow-lg transition-all duration-300;
  background: linear-gradient(90deg, #24F038 0%, #00FFF0 100%);
  box-shadow: 0 4px 24px 0 rgba(36, 240, 56, 0.25);
}
.main-gradient-btn:hover {
  background: linear-gradient(90deg, #00FFF0 0%, #24F038 100%);
  box-shadow: none;
}
.glossy-wrap {
  display: inline-block;
  position: relative;
}
.glossy-effect {
  position: absolute;
  pointer-events: none;
  width: 180px;
  height: 80px;
  border-radius: 100px;
  background: linear-gradient(120deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.15) 100%);
  filter: blur(6px);
  transform: translate(-50%, -50%) rotate(-15deg);
  transition: left 0.3s, top 0.3s, opacity 0.4s;
  z-index: 2;
}
.tilt-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  perspective: 900px;
}
.tilt-img {
  will-change: transform, box-shadow;
}
@media (max-width: 640px) {
  .tilt-wrap {
    width: 100% !important;
    min-width: 0 !important;
    max-width: 100vw !important;
  }
  .tilt-img {
    max-width: 100vw;
    height: auto;
  }
}
</style>
