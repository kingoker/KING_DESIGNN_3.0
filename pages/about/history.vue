<template>
  <section class="min-h-screen bg-[#0F1419] text-white py-20 bg-background">
    <div class="container mx-auto px-4">
      <div class="w-full max-w-full mx-auto">
        <!-- Динамический заголовок и подзаголовок + вкладки в рамке -->
        <div class="rounded-3xl bg-[#181F2A] border border-[#313A4A] min-h-[305px] px-4 md:px-6 py-8 mb-10 shadow-lg w-full">
          <h1 class="text-2xl sm:text-3xl md:text-5xl font-extrabold text-center mb-2 leading-tight">
            Как KING DESIGNN стал тем, <br class='hidden md:block'/> кем он является
          </h1>
          <p class="text-center text-base sm:text-lg text-gray-300 mb-6 mx-auto" style="max-width: 600px;">
            От первых фриланс-заказов <br>до создания полноценной digital-студии.
          </p>
          <div class="flex justify-center gap-2 sm:gap-4 md:gap-6 mb-0 w-full max-w-[600px] mx-auto overflow-x-auto scrollbar-none">
            <NuxtLink to="/about/team" class="px-6 sm:px-8 md:px-10 py-2 sm:py-3 rounded-full text-base sm:text-lg md:text-xl font-semibold border-2 border-[#444B5A] text-[#AEB6C3] bg-transparent whitespace-nowrap transition-all duration-200 hover:border-[#24F038] hover:text-[#24F038]">
              Команда
            </NuxtLink>
            <NuxtLink to="/about/contacts" class="px-6 sm:px-8 md:px-10 py-2 sm:py-3 rounded-full text-base sm:text-lg md:text-xl font-semibold border-2 border-[#444B5A] text-[#AEB6C3] bg-transparent whitespace-nowrap transition-all duration-200 hover:border-[#24F038] hover:text-[#24F038]">
              Контакты
            </NuxtLink>
            <NuxtLink to="/about/history" class="px-6 sm:px-8 md:px-10 py-2 sm:py-3 rounded-full text-base sm:text-lg md:text-xl font-semibold border-2 border-[#24F038] text-[#24F038] bg-[#24F038]/30 shadow-none whitespace-nowrap transition-all duration-200 hover:bg-[#24F038] hover:text-black">
              История
            </NuxtLink>
          </div>
        </div>
        <!-- Таймлайн -->
        <div class="w-full flex flex-col relative max-w-5xl mx-auto">
          <div class="flex flex-col items-center relative">
            <!-- Серый прогресс-бар -->
            <div class="absolute left-6 md:left-6 top-0 bottom-0 w-1 bg-[#313A4A] z-0" style="left: 20px;"></div>
            <!-- Зелёный прогресс-бар -->
            <div
              class="absolute left-6 md:left-6 w-1 bg-[#24F038] z-10 transition-all duration-500"
              :style="{
                left: '20px',
                top: '0',
                height: activeIdx > -1 ? `calc(${activeIdx === history.length - 1 ? '100%' : `${activeIdx} * 210px + 12px`})` : '0px'
              }"
            ></div>
            <TransitionGroup name="fade-up" tag="div" class="flex flex-col items-center relative">
              <div
                v-for="(item, idx) in history"
                :key="item.id"
                :ref="el => setYearRef(el, idx)"
                :class="['timeline-step relative flex flex-row w-full min-h-[180px]',
                  { 'completed': idx < activeIdx, 'active': idx === activeIdx, 'scroll-appear': visible[idx] }]
                "
              >
                <div class="timeline-dot-wrapper relative flex flex-col items-center w-12">
                  <div class="timeline-dot z-20"></div>
                </div>
                <!-- Контент справа -->
                <div class="flex flex-col md:flex-row items-start w-full ml-0 md:ml-4">
                  <div class="flex-1">
                    <div class="text-2xl md:text-3xl font-extrabold text-white mb-1" style="font-family: 'Exo 2', sans-serif;">{{ item.year }} год</div>
                    <div class="text-base md:text-lg text-white font-normal mb-0">{{ item.event }}</div>
                  </div>
                  <div class="rounded-2xl overflow-hidden shadow-xl bg-[rgba(18,25,38,0.7)] aspect-square w-[320px] h-[320px] ml-0 md:ml-8 mt-4 md:mt-0 flex-shrink-0 history-photo-frame">
                    <img :src="item.image_url" :alt="item.year" class="w-full h-full object-cover aspect-square" loading="lazy" />
                  </div>
                </div>
              </div>
            </TransitionGroup>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { useHistory } from '~/composables/useHistory'

useHead({
  title: 'История - KING DESIGNN',
  meta: [
    { name: 'description', content: 'История KING DESIGNN - от первых фриланс-заказов до создания полноценной digital-студии' }
  ]
})

const { history, loading, loadHistory } = useHistory()
const activeIdx = ref(-1)
const visible = ref<boolean[]>([])
const yearRefs = ref<(HTMLElement | null)[]>([])

function setYearRef(el: any, idx: number) {
  if (el instanceof HTMLElement) {
    yearRefs.value[idx] = el
  } else {
    yearRefs.value[idx] = null
  }
}

function updateActiveIdx() {
  let minDist = Infinity
  let idx = -1
  const dots = document.querySelectorAll('.timeline-dot')
  dots.forEach((el, i) => {
    const rect = el.getBoundingClientRect()
    const center = rect.top + rect.height / 2
    const dist = Math.abs(center - window.innerHeight / 2)
    if (dist < minDist) {
      minDist = dist
      idx = i
    }
  })
  activeIdx.value = idx
}
onMounted(async () => {
  await loadHistory()
  await nextTick()
  visible.value = history.value.map(() => false)
  // Intersection Observer для анимации появления
  const observer = new window.IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        const idx = yearRefs.value.findIndex(el => el === entry.target)
        if (idx !== -1) {
          visible.value[idx] = entry.isIntersecting
        }
      })
    },
    { threshold: 0.2 }
  )
  yearRefs.value.forEach(el => {
    if (el) observer.observe(el)
  })
  updateActiveIdx()
  window.addEventListener('scroll', updateActiveIdx)
  window.addEventListener('resize', updateActiveIdx)
})
</script>

<style scoped>
.scrollbar-none::-webkit-scrollbar {
  display: none;
}
.timeline-step {
  margin-bottom: 30px;
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.7s cubic-bezier(.4,0,.2,1), transform 0.7s cubic-bezier(.4,0,.2,1);
}
.timeline-step:last-child {
  margin-bottom: 0;
}
@media (max-width: 768px) {
  .timeline-step {
    margin-bottom: 100px;
  }
  .timeline-step:last-child {
    margin-bottom: 0;
  }
  .history-photo-frame {
    width: 100% !important;
    height: auto !important;
    aspect-ratio: 1 / 1;
    min-width: 0;
    max-width: 100vw;
    margin-left: 0 !important;
    margin-right: 0 !important;
  }
  .history-photo-frame img {
    width: 100% !important;
    height: 100% !important;
    object-fit: cover;
    aspect-ratio: 1 / 1;
  }
}
.timeline-dot-wrapper {
  position: relative;
  height: 100%;
  min-height: 180px;
}
.timeline-dot {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 4px solid #313A4A;
  background: #444B5A;
  position: relative;
  transition: background 0.5s, border-color 0.5s;
}
.timeline-step.completed .timeline-dot {
  background: #24F038;
  border-color: #24F038;
}
.timeline-step.active .timeline-dot {
  background: #24F038;
  border-color: #24F038;
}
.timeline-step.scroll-appear {
  opacity: 1;
  transform: translateY(0);
}
.fade-up-enter-active {
  transition: opacity 0.6s cubic-bezier(.4,0,.2,1), transform 0.6s cubic-bezier(.4,0,.2,1);
}
.fade-up-enter-from {
  opacity: 0;
  transform: translateY(40px);
}
.fade-up-enter-to {
  opacity: 1;
  transform: translateY(0);
}
.history-photo-frame {
  border: 2px solid #4E5562;
  box-shadow: 0 8px 32px 0 rgba(0,0,0,0.25);
  position: relative;
  background: rgba(18,25,38,0.7);
}
</style> 