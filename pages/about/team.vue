<template>
  <section class="min-h-screen bg-[#0F1419] text-white py-20 bg-background">
    <div class="container mx-auto px-4">
      <div class="w-full max-w-full mx-auto">
        <!-- Динамический заголовок и подзаголовок + вкладки в рамке -->
        <div class="rounded-3xl bg-[#181F2A] border border-[#313A4A] min-h-[305px] px-4 md:px-6 py-8 mb-10 shadow-lg w-full">
          <h1 class="text-2xl sm:text-3xl md:text-5xl font-extrabold text-center mb-2 leading-tight">
            Мозг, сердце и душа<br />KING DESIGNN
          </h1>
          <p class="text-center text-base sm:text-lg text-gray-300 mb-6 mx-auto" style="max-width: 600px;">
            Мы — смесь дизайнеров, разработчиков и стратегов, движимых одной целью: создавать будущее
          </p>
          <div class="flex justify-center gap-2 sm:gap-4 md:gap-6 mb-0 w-full max-w-[600px] mx-auto overflow-x-auto scrollbar-none">
            <NuxtLink to="/about/team" class="px-6 sm:px-8 md:px-10 py-2 sm:py-3 rounded-full text-base sm:text-lg md:text-xl font-semibold border-2 border-[#24F038] text-[#24F038] bg-[#24F038]/30 shadow-none whitespace-nowrap transition-all duration-200 hover:bg-[#24F038] hover:text-black">
              Команда
            </NuxtLink>
            <NuxtLink to="/about/contacts" class="px-6 sm:px-8 md:px-10 py-2 sm:py-3 rounded-full text-base sm:text-lg md:text-xl font-semibold border-2 border-[#444B5A] text-[#AEB6C3] bg-transparent whitespace-nowrap transition-all duration-200 hover:border-[#24F038] hover:text-[#24F038]">
              Контакты
            </NuxtLink>
            <NuxtLink to="/about/history" class="px-6 sm:px-8 md:px-10 py-2 sm:py-3 rounded-full text-base sm:text-lg md:text-xl font-semibold border-2 border-[#444B5A] text-[#AEB6C3] bg-transparent whitespace-nowrap transition-all duration-200 hover:border-[#24F038] hover:text-[#24F038]">
              История
            </NuxtLink>
          </div>
        </div>
        
        <!-- Секция команды -->
        <div class="w-full">
          <div v-if="loading" class="text-center italic py-12">Загрузка…</div>
          <div v-else-if="!members.length" class="text-center text-gray-400 py-12">Команда пока что формируется.</div>
          <div v-else class="flex flex-col items-center">
            <div class="w-full flex flex-col md:flex-row md:justify-start md:items-start gap-8">
              <div v-for="m in members" :key="m.id" class="relative group rounded-2xl overflow-hidden shadow-xl transition-all duration-300 aspect-[1/1.4] border-2 border-[#4E5562] bg-[rgba(18,25,38,0.7)] backdrop-blur-xl md:max-w-[480px] w-full mx-auto md:mx-0">
                <img :src="m.photo_url" :alt="m.name" class="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-500 group-hover:scale-105" />
                <div class="absolute bottom-0 left-0 w-full z-10">
                  <div class="glass-gradient px-6 pt-12 pb-5">
                    <div class="glass-gradient-blur"></div>
                    <div class="glass-gradient-white"></div>
                    <div class="mb-1">
                      <span class="block font-extrabold text-white text-4xl leading-tight tracking-tight" style="font-family: 'Exo 2', sans-serif;">
                        {{ m.name }}
                      </span>
                    </div>
                    <div class="text-primary font-semibold text-2xl leading-snug mb-1" style="font-family: 'Exo 2', sans-serif;">
                      {{ m.bio }}
                    </div>
                    <div class="text-gray-400 font-light text-lg" style="font-family: 'Exo 2', sans-serif;">
                      {{ m.position }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="w-full flex justify-center mt-12 mb-24">
              <button class="w-full md:max-w-[480px] px-10 py-4 rounded-full text-xl font-bold bg-gradient-to-r from-green-400 to-cyan-400 text-black shadow-lg hover:from-cyan-400 hover:to-green-400 transition-all duration-300" @click="showJoinModal = true">
                СТАТЬ ЧАСТЬЮ КОМАНДЫ
              </button>
            </div>
          </div>
          <transition name="fade">
            <div v-if="showJoinModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xl">
              <div class="bg-[#181F2A]/90 rounded-3xl p-10 max-w-xl w-full text-center border-4 border-[#24F038] shadow-2xl relative animate-pulse-border modal-blur">
                <button @click="showJoinModal = false" class="absolute top-4 right-4 text-3xl text-gray-400 hover:text-white">&times;</button>
                <div class="text-3xl md:text-5xl font-extrabold text-primary mb-6 leading-tight">Спасибо за интерес!</div>
                <div class="text-xl md:text-2xl text-white font-semibold mb-2">Напишите нам в Telegram</div>
                <a href="https://t.me/king_designn" target="_blank" class="text-2xl md:text-3xl font-bold text-cyan-400 underline hover:text-green-400 transition">@king_designn</a>
                <div class="text-lg text-gray-300 mt-6">чтобы быстрее начать сотрудничество</div>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useTeam } from '~/composables/useTeam'

const { members, loading, loadTeam } = useTeam()
const showJoinModal = ref(false)

onMounted(loadTeam)

watch(showJoinModal, (val) => {
  if (val) {
    document.body.classList.add('overflow-hidden')
  } else {
    document.body.classList.remove('overflow-hidden')
  }
})

// Устанавливаем мета-теги для SEO
useHead({
  title: 'Команда - KING DESIGNN',
  meta: [
    { name: 'description', content: 'Познакомьтесь с командой KING DESIGNN - дизайнеры, разработчики и стратеги, создающие будущее' }
  ]
})
</script>

<style scoped>
.scrollbar-none::-webkit-scrollbar {
  display: none;
}
.glass-gradient {
  position: relative;
  background: linear-gradient(180deg, rgba(18,25,38,0) 0%, rgba(18,25,38,1) 100%);
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
  overflow: hidden;
}
.glass-gradient-blur {
  position: absolute;
  left: 0; right: 0; bottom: 0;
  height: 80%;
  pointer-events: none;
  z-index: 0;
  filter: blur(24px);
}
.glass-gradient-white {
  position: absolute;
  left: 0; right: 0; bottom: 0;
  height: 80%;
  pointer-events: none;
  z-index: -1;
  background: linear-gradient(180deg, rgba(18,25,38,0) 0%, rgba(18,25,38,0.7) 60%, rgba(18,25,38,1) 100%);
}
.group {
  box-shadow: 0 8px 32px 0 rgba(0,0,0,0.25);
  transition: box-shadow 0.4s, border-color 0.3s;
}
.group:hover {
  border-color: #24F038 !important;
  box-shadow: 0 0 0 4px #24F038 inset, 0 2px 12px 0 rgba(0,0,0,0.10) inset;
}
.group img {
  transition: transform 0.5s;
}
.group:hover img {
  transform: scale(1.05);
}
.group .glass-gradient {
  transition: background 0.4s;
}
@keyframes pulse-border {
  0% {
    box-shadow: 0 0 0 0 #24F03880, 0 0 32px 0 #24F03840;
    border-color: #24F038;
  }
  50% {
    box-shadow: 0 0 0 8px #24F03840, 0 0 48px 8px #24F03820;
    border-color: #24F038;
  }
  100% {
    box-shadow: 0 0 0 0 #24F03880, 0 0 32px 0 #24F03840;
    border-color: #24F038;
  }
}
.animate-pulse-border {
  animation: pulse-border 2.5s infinite;
}
.modal-blur {
  background: rgba(24,31,42,0.90);
  backdrop-filter: blur(32px);
}
</style> 