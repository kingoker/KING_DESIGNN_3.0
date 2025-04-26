<template>
    <section ref="root" class="relative overflow-hidden min-h-screen bg-black text-white py-20 px-4">
      <!-- Canvas Background (stars) -->
      <canvas ref="canvas" class="absolute inset-0 w-full h-full"></canvas>
  
      <div class="relative z-10">
        <!-- Title -->
        <h1 class="text-5xl font-extrabold text-center mb-12">
          <span class="text-green-400 drop-shadow-[0_0_20px_rgba(0,255,150,0.8)]">👥</span>
          <span class="inline-block ml-2 text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-green-600 drop-shadow-[0_0_20px_rgba(0,255,150,0.8)]">
            Наша команда
          </span>
        </h1>
  
        <!-- Loading & Empty States -->
        <div v-if="loading" class="text-center italic">Загрузка…</div>
        <div v-else-if="!members.length" class="text-center text-gray-400">
          Команда пока что формируется.
        </div>
  
        <!-- Circular Profile Cards Grid -->
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 justify-items-center">
          <div v-for="m in members" :key="m.id" class="flex flex-col items-center space-y-4">
            <!-- Profile Photo Circle -->
            <div class="w-80 h-80 rounded-full overflow-hidden border-4 border-transparent transition-all duration-500 hover:border-green-400">
              <img :src="m.photo_url" alt="{{ m.name }}" class="w-full h-full object-cover transform transition-transform duration-500 hover:scale-105" />
            </div>
  
            <!-- Name & Position -->
            <h2 class="text-2xl font-semibold text-center text-green-300 transition-colors duration-300 hover:text-green-100">
              {{ m.name }}
            </h2>
            <p class="text-gray-400 text-center italic">
              {{ m.position }}
            </p>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, onBeforeUnmount } from 'vue'
  import { useTeam } from '~/composables/useTeam'
  import gsap from 'gsap'
  
  const { members, loading, loadTeam } = useTeam()
  const root = ref<HTMLElement|null>(null)
  const canvas = ref<HTMLCanvasElement|null>(null)
  let ctx: CanvasRenderingContext2D|null = null
  let stars: { x: number; y: number; vx: number; vy: number; size: number; alpha: number }[] = []
  
  function resize() {
    if (!root.value || !canvas.value) return
    const w = root.value.clientWidth
    const h = root.value.clientHeight
    canvas.value.width = w * (window.devicePixelRatio || 1)
    canvas.value.height = h * (window.devicePixelRatio || 1)
    canvas.value.style.width = w + 'px'
    canvas.value.style.height = h + 'px'
    ctx = canvas.value.getContext('2d')
    if (ctx) ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1)
  
    const count = Math.floor((w * h) / 15000)
    stars = []
    for (let i = 0; i < count; i++) {
      const s = {
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 1.5 + 0.5,
        alpha: Math.random(),
      }
      stars.push(s)
      gsap.to(s, {
        alpha: Math.random(),
        duration: 1 + Math.random(),
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: Math.random(),
      })
    }
  }
  
  function draw() {
    if (!ctx || !root.value) return
    const w = root.value.clientWidth
    const h = root.value.clientHeight
    ctx.clearRect(0, 0, w, h)
    ctx.fillStyle = 'rgba(0,255,150,1)'
    stars.forEach(s => {
      ctx.globalAlpha = s.alpha
      ctx.beginPath()
      ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2)
      ctx.fill()
      s.x += s.vx
      s.y += s.vy
      if (s.x < 0 || s.x > w) s.vx *= -1
      if (s.y < 0 || s.y > h) s.vy *= -1
    })
  }
  
  onMounted(() => {
    loadTeam()
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
    canvas { position: absolute; inset: 0; z-index: 0 }
</style>
