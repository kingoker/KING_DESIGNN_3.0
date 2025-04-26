<template>
  <div class="min-h-screen bg-black text-white py-20 px-4">
    <div v-if="pending" class="text-center italic">Загрузка…</div>
    <div v-else-if="error" class="text-center text-red-500">
      Проект не найден.
    </div>

    <article
      v-else
      class="relative max-w-3xl mx-auto bg-gray-900/70 backdrop-blur-lg rounded-2xl p-8
             border-2 border-cyan-500 animate-border-neon overflow-hidden"
    >
      <!-- Hero -->
      <header class="text-center space-y-4 mb-12">
        <h1
          class="text-5xl sm:text-6xl font-extrabold
                 text-transparent bg-clip-text
                 bg-gradient-to-r from-cyan-400 to-green-400
                 drop-shadow-[0_0_20px_rgba(0,255,209,0.9)]"
        >
          {{ project.title }}
        </h1>
        <p class="italic text-gray-300">{{ project.short_description }}</p>
        <div v-if="isLive" class="mt-6">
          <a
            :href="project.project_url"
            target="_blank"
            class="inline-block px-8 py-3 font-bold uppercase
                   bg-gradient-to-r from-cyan-400 to-green-400
                   hover:from-cyan-300 hover:to-green-300
                   rounded-full shadow-lg transition transform hover:scale-105"
          >
            🚀 Перейти к проекту
          </a>
        </div>
        <div v-else class="mt-6 text-gray-500 italic">Скоро запуск…</div>
      </header>

      <!-- Карусель с drag/swipe -->
      <section v-if="project.images?.length" class="mb-12">
        <div
          class="relative overflow-hidden rounded-lg shadow-xl cursor-grab active:cursor-grabbing"
          @touchstart.passive="onTouchStart"
          @touchend.passive="onTouchEnd"
          @mousedown.prevent="onMouseDown"
          @mousemove.prevent="onMouseMove"
          @mouseup.prevent="onMouseUp"
          @mouseleave="onMouseUp"
          ref="carousel"
        >
          <div
            class="flex transition-transform duration-300"
            :style="{ transform: `translateX(${ -currentIndex * 100 + dragOffsetPercent }%)` }"
          >
            <div
              v-for="(img, i) in project.images"
              :key="i"
              class="flex-shrink-0 w-full h-64 sm:h-96"
            >
              <img
                :src="img"
                class="w-full h-full object-cover cursor-pointer"
                @click="openLightbox(img)"
              />
            </div>
          </div>
          <!-- Стрелки -->
          <button
            @click="prevSlide"
            class="absolute left-2 top-1/2 transform -translate-y-1/2
                   bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 z-10"
            aria-label="Previous"
          >‹</button>
          <button
            @click="nextSlide"
            class="absolute right-2 top-1/2 transform -translate-y-1/2
                   bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 z-10"
            aria-label="Next"
          >›</button>
        </div>
        <!-- Индикаторы -->
        <div class="flex justify-center space-x-2 mt-3">
          <button
            v-for="(img, i) in project.images"
            :key="i"
            @click="goToSlide(i)"
            :class="i === currentIndex ? 'bg-cyan-400' : 'bg-gray-600'"
            class="w-3 h-3 rounded-full transition-colors"
          />
        </div>
      </section>

      <!-- Описание -->
      <section
        class="prose prose-invert mx-auto neon-text max-w-none"
        v-html="renderedDescription"
      />

      <!-- Фоны -->
      <div
        class="pointer-events-none absolute -top-32 -right-32 w-64 h-64
               bg-gradient-to-tr from-cyan-500 to-green-400 opacity-20
               rounded-full blur-3xl animate-blob"
      />
      <div
        class="pointer-events-none absolute -bottom-32 -left-32 w-80 h-80
               bg-gradient-to-br from-green-400 to-cyan-500 opacity-20
               rounded-full blur-3xl animate-blob animation-delay-2000"
      />
    </article>

    <!-- Lightbox -->
    <Teleport to="body">
      <div
        v-if="lightbox"
        class="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
        @click.self="closeLightbox"
      >
        <button
          @click="closeLightbox"
          class="absolute top-6 right-6 text-white text-3xl"
          aria-label="Close"
        >✖️</button>
        <img
          :src="lightbox"
          class="max-w-full max-h-full rounded-lg shadow-2xl"
          alt="Preview"
        />
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter, createError } from '#imports'
import MarkdownIt from 'markdown-it'
import { useAsyncData } from '#imports'
import { useSupabase } from '~/composables/useSupabase'

const route = useRoute()
const slug = route.params.slug as string
const router = useRouter()
const supabase = useSupabase()

// SSR fetch
const { data: project, pending, error } = await useAsyncData(
  `project-${slug}`,
  async () => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('slug', slug)
      .single()
    if (error || !data) throw createError({ statusCode: 404 })
    return data
  }
)
if (error.value?.statusCode === 404) router.replace('/404')

// Markdown → HTML
const md = new MarkdownIt({ html: true, linkify: true })
const renderedDescription = computed(() =>
  project.value?.long_description
    ? md.render(project.value.long_description)
    : '<p class="text-gray-300">Нет подробного описания.</p>'
)

// Проверка live
const isLive = computed(() =>
  project.value?.status === 'live' && !!project.value.project_url
)

// Carousel logic
const currentIndex = ref(0)
// Для touch
let touchStartX = 0
function onTouchStart(e: TouchEvent) {
  touchStartX = e.changedTouches[0].clientX
}
function onTouchEnd(e: TouchEvent) {
  const diff = e.changedTouches[0].clientX - touchStartX
  if (diff > 50) prevSlide()
  else if (diff < -50) nextSlide()
}

// Для mouse drag
const isDragging = ref(false)
let mouseStartX = 0
let dragOffset = 0

function onMouseDown(e: MouseEvent) {
  isDragging.value = true
  mouseStartX = e.clientX
}
function onMouseMove(e: MouseEvent) {
  if (!isDragging.value) return
  dragOffset = e.clientX - mouseStartX
}
function onMouseUp() {
  if (!isDragging.value) return
  isDragging.value = false
  if (dragOffset > 50) prevSlide()
  else if (dragOffset < -50) nextSlide()
  dragOffset = 0
}

// динамический сдвиг в процентах
const dragOffsetPercent = computed(() => {
  if (!project.value) return 0
  return (dragOffset / (carousel.value?.clientWidth || 1)) * 100
})
const carousel = ref<HTMLElement|null>(null)

function prevSlide() {
  if (!project.value) return
  const n = project.value.images.length
  currentIndex.value = (currentIndex.value + n - 1) % n
}
function nextSlide() {
  if (!project.value) return
  const n = project.value.images.length
  currentIndex.value = (currentIndex.value + 1) % n
}
function goToSlide(i: number) {
  currentIndex.value = i
}

// Lightbox
const lightbox = ref<string|null>(null)
function openLightbox(src: string) { lightbox.value = src }
function closeLightbox() { lightbox.value = null }
</script>

<style scoped>
@import 'https://cdn.jsdelivr.net/npm/@tailwindcss/typography@0.5.0/dist/typography.min.css';

/* Neon border */
@keyframes border-neon {
  0%,100% { border-color: rgba(0,255,209,0.6) }
  50%     { border-color: rgba(0,200,150,0.6) }
}
.animate-border-neon { animation: border-neon 3s ease-in-out infinite; }

/* Blob */
@keyframes blob {
  0%,100% { transform: translate(0,0) scale(1) }
  33%     { transform: translate(20px,-10px) scale(1.1) }
  66%     { transform: translate(-10px,20px) scale(0.9) }
}
.animate-blob { animation: blob 8s infinite ease-in-out; }
.animation-delay-2000 { animation-delay: 2s; }

</style>
