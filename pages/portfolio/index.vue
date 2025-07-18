<!-- pages/portfolio.vue -->
<template>
  <section class="relative min-h-screen bg-background text-white py-16 px-4">
    <div class="relative z-10">
      <h1 class="text-5xl font-extrabold text-center mb-12">
        Портфолио проектов
      </h1>
      <div v-if="loading" class="text-center italic">Загрузка…</div>
      <div v-else-if="!projects.length" class="text-center text-gray-400">Здесь пока нет проектов.</div>
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <NuxtLink
          v-for="p in projects"
          :key="p.id"
          :to="`/portfolio/${p.slug}`"
          :class="[
            'group relative rounded-2xl overflow-hidden shadow-xl transition-all duration-300 min-h-[530px] sm:min-h-[700px] h-[50vh] border-2 border-[#4E5562]'
          ]"
          style="background: rgba(18,25,38,0.7); backdrop-filter: blur(16px);"
        >
          <!-- Картинка на всю карточку -->
          <img :src="p.image_url" :alt="p.title" class="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-500 group-hover:scale-105" />
          <!-- Градиентная стеклянная плашка снизу -->
          <div class="absolute bottom-0 left-0 w-full z-10">
            <div class="glass-gradient px-6 pt-12 pb-5">
              <div class="glass-gradient-blur"></div>
              <div class="glass-gradient-white"></div>
              <div class="flex items-center gap-2 mb-1">
                <span v-if="p.title.includes('Квиз')"></span>
                <span v-else-if="p.status === 'live'">
                </span>
                <span v-else></span>
                <span class="block font-extrabold text-white text-xl leading-tight tracking-tight" style="font-family: 'Exo 2', sans-serif;">
                  {{ p.title }}
                </span>
              </div>
              <div :class="'text-primary font-semibold text-2xl font-extralight leading-snug mb-2'" style="font-family: 'Exo 2', sans-serif;">
                {{ p.short_description }}
              </div>
              <div :class="p.status === 'live' ? 'text-primary font-light text-md' : 'text-gray-400 font-light text-md'" style="font-family: 'Exo 2', sans-serif;">
                {{ p.status === 'live' ? 'Готов' : 'В разработке' }}
              </div>
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useProjects } from '~/composables/useProjects'
const { projects, loading, loadProjects } = useProjects()

onMounted(loadProjects)
</script>

<style scoped>
.bg-background {
  background-color: theme('colors.background');
}
.group {
  position: relative;
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
  /* Градиент прозрачности + blur */
  /* background: linear-gradient(180deg, #121926 0%, #121926 100%); */
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
  transform: scale(1.04);
}
.group .glass-gradient {
  transition: background 0.4s;
}
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
