<template>
  <section class="relative min-h-screen bg-background text-white px-4 md:px-[100px] pt-8 pb-4">
    <div class="w-full max-w-full mx-auto">
      <!-- Динамический заголовок и подзаголовок + вкладки в рамке -->
      <div class="rounded-3xl bg-[#181F2A] border border-[#313A4A] min-h-[305px] px-4 md:px-6 py-8 mb-10 shadow-lg w-full">
        <h1 class="text-2xl sm:text-3xl md:text-5xl font-extrabold text-center mb-2 leading-tight">
          <span v-if="activeTab === 'team'">Мозг, сердце и душа<br />KING DESIGNN</span>
          <span v-else-if="activeTab === 'contacts'">Свяжитесь с нами —<br class='hidden md:block'/> это просто</span>
          <span v-else-if="activeTab === 'history'">Как KING DESIGNN стал тем, <br class='hidden md:block'/> кем он является</span>
        </h1>
        <p class="text-center text-base sm:text-lg text-gray-300 mb-6 mx-auto" style="max-width: 600px;">
          <span v-if="activeTab === 'team'">Мы — смесь дизайнеров, разработчиков и стратегов, движимых одной целью: создавать будущее</span>
          <span v-else-if="activeTab === 'contacts'">У вас есть идея, вопрос или проект? <br class='hidden md:block'/> Напишите нам</span>
          <span v-else-if="activeTab === 'history'">От первых фриланс-заказов <br>до создания полноценной digital-студии.</span>
        </p>
        <div class="flex justify-center gap-2 sm:gap-4 md:gap-6 mb-0 w-full max-w-[600px] mx-auto overflow-x-auto scrollbar-none">
          <NuxtLink to="/about/team" class="px-6 sm:px-8 md:px-10 py-2 sm:py-3 rounded-full text-base sm:text-lg md:text-xl font-semibold border-2 border-[#24F038] text-[#24F038] bg-[#24F038]/30 shadow-none transition-all duration-200 whitespace-nowrap hover:bg-[#24F038] hover:text-black">
            Команда
          </NuxtLink>
          <NuxtLink to="/about/contacts" class="px-6 sm:px-8 md:px-10 py-2 sm:py-3 rounded-full text-base sm:text-lg md:text-xl font-semibold border-2 border-[#444B5A] text-[#AEB6C3] bg-transparent transition-all duration-200 whitespace-nowrap hover:border-[#24F038] hover:text-[#24F038]">
            Контакты
          </NuxtLink>
          <NuxtLink to="/about/history" class="px-6 sm:px-8 md:px-10 py-2 sm:py-3 rounded-full text-base sm:text-lg md:text-xl font-semibold border-2 border-[#444B5A] text-[#AEB6C3] bg-transparent transition-all duration-200 whitespace-nowrap hover:border-[#24F038] hover:text-[#24F038]">
            История
          </NuxtLink>
        </div>
      </div>
      <!-- Tab Content -->
      <div>
        <div v-if="activeTab === 'team'">
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
            <button class="mt-12 px-10 py-4 mb-24 rounded-full text-xl font-bold bg-gradient-to-r from-green-400 to-cyan-400 text-black shadow-lg hover:from-cyan-400 hover:to-green-400 transition-all duration-300" @click="showJoinModal = true">
              СТАТЬ ЧАСТЬЮ КОМАНДЫ
            </button>
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
        <div v-else-if="activeTab === 'contacts'">
            <div class="flex flex-col md:flex-row gap-8 items-stretch">
            <!-- Левая часть: контакты и роботы -->
            <div class="flex-1 flex flex-col items-center justify-between gap-8">
              <div class="w-full flex flex-col items-center gap-4">
                <div class="w-full">
                  <div class="flex flex-col gap-4">
                    <a href="mailto:info@kingdesignn.ru" class="rounded-2xl border border-[#444B5A] px-6 py-3 text-lg font-semibold text-white bg-[#181F2A]/80 w-full text-center hover:border-white hover:bg-[#181F2A]/90 transition-all duration-300 cursor-pointer">
                      📩 info@kingdesignn.ru
                    </a>
                    <a href="tel:+19297373991" class="rounded-2xl border border-[#444B5A] px-6 py-3 text-lg font-semibold text-white bg-[#181F2A]/80 w-full text-center hover:border-white hover:bg-[#181F2A]/90 transition-all duration-300 cursor-pointer">
                      📞 +1 929 737 39 91
                    </a>
                  </div>
                </div>
                <div class="flex gap-4 mt-4">
                  <a href="https://t.me/king_designn" target="_blank" aria-label="Telegram" class="footer-social">
                    <svg class="footer-icon text-white hover:text-primary transition-colors" width="70" height="70" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clip-path="url(#clip0_23_201)">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M0 15C0 23.2843 6.71575 30 15 30C23.2843 30 30 23.2843 30 15C30 6.71575 23.2843 0 15 0C6.71575 0 0 6.71575 0 15ZM12.25 21.875L12.5052 18.0514L19.4606 11.7744C19.7658 11.5034 19.3939 11.3713 18.9887 11.6171L10.4046 17.0327L6.69669 15.8754C5.89594 15.6302 5.89019 15.08 6.87644 14.6844L21.3252 9.11306C21.9851 8.81344 22.6221 9.27156 22.3701 10.2816L19.9095 21.8769C19.7377 22.7009 19.2398 22.898 18.55 22.5174L14.8017 19.7481L13 21.5C12.9943 21.5055 12.9887 21.511 12.9831 21.5165C12.7816 21.7127 12.6148 21.875 12.25 21.875Z" fill="currentColor"/>
                      </g>
                      <defs>
                        <clipPath id="clip0_23_201">
                          <rect width="30" height="30" fill="white"/>
                        </clipPath>
                      </defs>
                    </svg>
                  </a>
                  <a href="https://www.instagram.com/king_designn/" target="_blank" aria-label="Instagram" class="footer-social">
                    <svg class="footer-icon text-white hover:text-primary transition-colors" width="70" height="70" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clip-path="url(#clip0_23_206)">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M15 0C6.71575 0 0 6.71575 0 15C0 23.2843 6.71575 30 15 30C23.2843 30 30 23.2843 30 15C30 6.71575 23.2843 0 15 0C6.71575 0 0 6.71575 0 15ZM11.7021 7.04831C12.5554 7.0095 12.8281 7 15.0007 7H14.9983C17.1716 7 17.4432 7.0095 18.2966 7.04831C19.1483 7.08731 19.7299 7.22219 20.24 7.42C20.7666 7.62419 21.2116 7.8975 21.6566 8.3425C22.1017 8.78719 22.375 9.2335 22.58 9.75969C22.7767 10.2684 22.9117 10.8497 22.9517 11.7014C22.99 12.5548 23 12.8274 23 15.0001C23 17.1727 22.99 17.4447 22.9517 18.2981C22.9117 19.1494 22.7767 19.7309 22.58 20.2398C22.375 20.7658 22.1017 21.2121 21.6566 21.6568C21.2121 22.1018 20.7665 22.3758 20.2405 22.5802C19.7314 22.778 19.1494 22.9128 18.2978 22.9518C17.4444 22.9907 17.1726 23.0002 14.9998 23.0002C12.8272 23.0002 12.5548 22.9907 11.7014 22.9518C10.8499 22.9128 10.2684 22.778 9.75937 22.5802C9.2335 22.3758 8.78719 22.1018 8.34269 21.6568C7.89781 21.2121 7.6245 20.7658 7.42 20.2396C7.22231 19.7309 7.0875 19.1496 7.04831 18.2979C7.00969 17.4446 7 17.1727 7 15.0001C7 12.8274 7.01 12.5546 7.04819 11.7012C7.0865 10.8499 7.2215 10.2684 7.41981 9.7595C7.62481 9.2335 7.89819 8.78719 8.34319 8.3425C8.78788 7.89769 9.23419 7.62431 9.76038 7.42C10.2691 7.22219 10.8504 7.08731 11.7021 7.04831Z" fill="currentColor"/>
                        <path d="M15.0008 12.3335C16.4735 12.3335 17.6675 13.5274 17.6675 15.0002C17.6675 16.4729 16.4735 17.6669 15.0008 17.6669C13.528 17.6669 12.3341 16.4729 12.3341 15.0002C12.3341 13.5274 13.528 12.3335 15.0008 12.3335Z" fill="currentColor"/>
                      </g>
                      <defs>
                        <clipPath id="clip0_23_206">
                          <rect width="30" height="30" fill="white"/>
                        </clipPath>
                      </defs>
                    </svg>
                  </a>
                  <a href="https://youtube.com/" target="_blank" aria-label="YouTube" class="footer-social">
                    <svg class="footer-icon text-white hover:text-primary transition-colors" width="70" height="70" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clip-path="url(#clip0_23_203)">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M15 0C6.71575 0 0 6.71575 0 15C0 23.2843 6.71575 30 15 30C23.2843 30 30 23.2843 30 15C30 6.71575 23.2843 0 15 0C6.71575 0 0 6.71575 0 15ZM21.251 9.84331C21.9394 10.0323 22.4816 10.5889 22.6656 11.2957C23 12.5769 23 15.25 23 15.25C23 15.25 23 17.923 22.6656 19.2043C22.4816 19.9111 21.9394 20.4678 21.251 20.6567C20.0034 21 15 21 15 21C15 21 9.99662 21 8.74894 20.6567C8.06044 20.4678 7.51825 19.9111 7.33425 19.2043C7 17.923 7 15.25 7 15.25C7 15.25 7 12.5769 7.33425 11.2957C7.51825 10.5889 8.06044 10.0323 8.74894 9.84331C9.99662 9.5 15 9.5 15 9.5C15 9.5 20.0034 9.5 21.251 9.84331Z" fill="currentColor"/>
                        <path d="M13.5 18V13L17.5 15.5001L13.5 18Z" fill="currentColor"/>
                      </g>
                      <defs>
                        <clipPath id="clip0_23_203">
                          <rect width="30" height="30" fill="white"/>
                        </clipPath>
                      </defs>
                    </svg>
                  </a>
                </div>
              </div>
              <img src="https://exfjkcbeouskioxzejkv.supabase.co/storage/v1/object/public/other//main%20robots.png" alt="Роботы KING DESIGNN" class="w-full max-w-xs md:max-w-sm mt-8 mx-auto" loading="lazy"/>
            </div>
            <!-- Правая часть: форма -->
            <div class="flex-1 flex flex-col justify-center">
              <form class="rounded-3xl border border-[#313A4A] bg-[#181F2A] p-8 flex flex-col gap-6 shadow-lg">
                <div class="text-2xl font-bold mb-2 flex items-center gap-2 justify-center">
                  <span>📬</span> Напиши нам
                </div>
                <div class="text-gray-300 text-center mb-2">Если у тебя есть идея, проект или просто срочный вопрос — мы на связи.</div>
                <div>
                  <label class="block text-sm text-[#24F038] mb-1" for="name">Имя:</label>
                  <input id="name" name="name" type="text" class="w-full rounded-full border border-[#444B5A] bg-transparent px-6 py-3 text-lg text-[#24F038] focus:border-[#24F038] focus:ring-2 focus:ring-[#24F038]/40 hover:border-[#24F038] transition-all duration-200" placeholder="Как к тебе обращаться?" />
                </div>
                <div>
                  <label class="block text-sm text-[#24F038] mb-1" for="email">Email:</label>
                  <input id="email" name="email" type="email" class="w-full rounded-full border border-[#444B5A] bg-transparent px-6 py-3 text-lg text-white focus:border-[#24F038] focus:ring-2 focus:ring-[#24F038]/40 hover:border-[#24F038] transition-all duration-200" placeholder="Без спама, только по делу" />
                </div>
                <div>
                  <label class="block text-sm text-[#24F038] mb-1" for="topic">Тема обращения:</label>
                  <textarea id="topic" name="topic" rows="3" class="w-full rounded-3xl border border-[#444B5A] bg-transparent px-6 py-3 text-lg text-white focus:border-[#24F038] focus:ring-2 focus:ring-[#24F038]/40 hover:border-[#24F038] transition-all duration-200 resize-none" placeholder="В двух словах: о чём речь?"></textarea>
                </div>
                <button type="submit" class="w-full mt-2 py-3 rounded-full text-xl font-bold bg-gradient-to-r from-green-400 to-cyan-400 text-black shadow-lg hover:from-cyan-400 hover:to-green-400 transition-all duration-300">ОТПРАВИТЬ СООБЩЕНИЕ</button>
              </form>
            </div>
          </div>
        </div>
        <div v-else-if="activeTab === 'history'">
          <!-- Здесь будет секция истории -->
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useTeam } from '~/composables/useTeam'

const activeTab = ref<'team' | 'contacts' | 'history'>('team')
const { members, loading, loadTeam } = useTeam()
const showJoinModal = ref(false)

onMounted(() => {
  loadTeam()
  // Перенаправляем на страницу команды по умолчанию
  if (process.client) {
    navigateTo('/about/team')
  }
})

watch(showJoinModal, (val) => {
  if (val) {
    document.body.classList.add('overflow-hidden')
  } else {
    document.body.classList.remove('overflow-hidden')
  }
})

// Устанавливаем мета-теги для SEO
useHead({
  title: 'О нас - KING DESIGNN',
  meta: [
    { name: 'description', content: 'Узнайте больше о KING DESIGNN - команде, контактах и истории компании' }
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
  transform: scale(1.04);
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
