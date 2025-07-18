<template>
  <section class="min-h-screen bg-[#0F1419] text-white py-20 bg-background">
    <div class="container mx-auto px-4">
      <div class="w-full max-w-full mx-auto">
        <!-- Динамический заголовок и подзаголовок + вкладки в рамке -->
        <div class="rounded-3xl bg-[#181F2A] border border-[#313A4A] min-h-[305px] px-4 md:px-6 py-8 mb-10 shadow-lg w-full">
          <h1 class="text-2xl sm:text-3xl md:text-5xl font-extrabold text-center mb-2 leading-tight">
            Свяжитесь с нами —<br class='hidden md:block'/> это просто
          </h1>
          <p class="text-center text-base sm:text-lg text-gray-300 mb-6 mx-auto" style="max-width: 600px;">
            У вас есть идея, вопрос или проект? <br class='hidden md:block'/> Напишите нам
          </p>
          <div class="flex justify-center gap-2 sm:gap-4 md:gap-6 mb-0 w-full max-w-[600px] mx-auto overflow-x-auto scrollbar-none">
            <NuxtLink to="/about/team" class="px-6 sm:px-8 md:px-10 py-2 sm:py-3 rounded-full text-base sm:text-lg md:text-xl font-semibold border-2 border-[#444B5A] text-[#AEB6C3] bg-transparent whitespace-nowrap transition-all duration-200 hover:border-[#24F038] hover:text-[#24F038]">
              Команда
            </NuxtLink>
            <NuxtLink to="/about/contacts" class="px-6 sm:px-8 md:px-10 py-2 sm:py-3 rounded-full text-base sm:text-lg md:text-xl font-semibold border-2 border-[#24F038] text-[#24F038] bg-[#24F038]/30 shadow-none whitespace-nowrap transition-all duration-200 hover:bg-[#24F038] hover:text-black">
              Контакты
            </NuxtLink>
            <NuxtLink to="/about/history" class="px-6 sm:px-8 md:px-10 py-2 sm:py-3 rounded-full text-base sm:text-lg md:text-xl font-semibold border-2 border-[#444B5A] text-[#AEB6C3] bg-transparent whitespace-nowrap transition-all duration-200 hover:border-[#24F038] hover:text-[#24F038]">
              История
            </NuxtLink>
          </div>
        </div>
        
        <div class="flex flex-col lg:flex-row w-full gap-8 lg:gap-12 justify-between items-start">
          <div class="flex flex-col gap-8 lg:gap-12 items-start w-full lg:w-1/2">
            <div class="flex flex-col w-full">
              <div class="w-full mx-auto mb-8">
                <div class="flex flex-col gap-4 mb-8">
                  <a href="mailto:info@kingdesignn.ru" class="rounded-2xl border border-[#444B5A] px-6 py-3 text-lg font-semibold text-white bg-[#181F2A]/80 w-full text-center hover:border-white hover:bg-[#181F2A]/90 transition-all duration-300 cursor-pointer">
                    📩 info@kingdesignn.ru
                  </a>
                  <a href="tel:+19297373991" class="rounded-2xl border border-[#444B5A] px-6 py-3 text-lg font-semibold text-white bg-[#181F2A]/80 w-full text-center hover:border-white hover:bg-[#181F2A]/90 transition-all duration-300 cursor-pointer">
                    📞 +1 929 737 39 91
                  </a>
                </div>
                <div class="flex gap-4 justify-center mb-8">
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
              <img src="https://exfjkcbeouskioxzejkv.supabase.co/storage/v1/object/public/other//main%20robots.png" alt="Роботы KING DESIGNN" class="block w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-md mx-auto" loading="lazy"/>
            </div>
          </div>
          <div class="w-full lg:w-1/2 flex flex-col justify-center mt-8 lg:mt-0">
            <form @submit.prevent="onSubmit" class="rounded-3xl border border-[#313A4A] bg-[#181F2A] p-4 sm:p-6 md:p-8 flex flex-col gap-6 shadow-lg mx-auto lg:mx-0 w-full max-w-lg">
              <div class="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 flex items-center gap-2 justify-center">
                <span>📬</span> Напиши нам
              </div>
              <div class="text-gray-300 text-center mb-2 text-base sm:text-lg md:text-xl">Если у тебя есть идея, проект или просто срочный вопрос — мы на связи.</div>
              <div>
                <label class="block text-sm text-[#24F038] mb-1" for="name">Имя:</label>
                <input id="name" name="name" type="text" v-model="name" class="w-full rounded-full border border-[#444B5A] bg-transparent px-6 py-3 text-lg text-[#24F038] focus:border-[#24F038] focus:ring-2 focus:ring-[#24F038]/40 hover:border-[#24F038] transition-all duration-200" placeholder="Как к тебе обращаться?" />
              </div>
              <div>
                <label class="block text-sm text-[#24F038] mb-1" for="email">Email:</label>
                <input id="email" name="email" type="email" v-model="email" class="w-full rounded-full border border-[#444B5A] bg-transparent px-6 py-3 text-lg text-white focus:border-[#24F038] focus:ring-2 focus:ring-[#24F038]/40 hover:border-[#24F038] transition-all duration-200" placeholder="Без спама, только по делу" />
              </div>
              <div>
                <label class="block text-sm text-[#24F038] mb-1" for="topic">Тема обращения:</label>
                <textarea id="topic" name="topic" rows="3" v-model="topic" class="w-full rounded-3xl border border-[#444B5A] bg-transparent px-6 py-3 text-lg text-white focus:border-[#24F038] focus:ring-2 focus:ring-[#24F038]/40 hover:border-[#24F038] transition-all duration-200 resize-none" placeholder="В двух словах: о чём речь?"></textarea>
              </div>
              <button type="submit" :disabled="loading" class="w-full mt-2 py-3 rounded-full text-xl font-bold bg-gradient-to-r from-green-400 to-cyan-400 text-black shadow-lg hover:from-cyan-400 hover:to-green-400 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed">
                {{ loading ? 'Отправка...' : 'ОТПРАВИТЬ СООБЩЕНИЕ' }}
              </button>
            </form>
            <transition name="fade">
              <div v-if="showSuccess" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
                <div class="bg-[#181F2A] rounded-2xl p-8 text-center text-white max-w-md w-full border-2 border-[#24F038] shadow-2xl">
                  <div class="text-3xl mb-4">Спасибо!</div>
                  <div class="text-lg">Ваша заявка успешно отправлена.</div>
                  <button @click="showSuccess = false" class="mt-6 px-6 py-2 rounded-full bg-gradient-to-r from-green-400 to-cyan-400 text-black font-bold">Закрыть</button>
                </div>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
// Устанавливаем мета-теги для SEO
useHead({
  title: 'Контакты - KING DESIGNN',
  meta: [
    { name: 'description', content: 'Свяжитесь с KING DESIGNN - у вас есть идея, вопрос или проект? Напишите нам' }
  ]
})

const name = ref('')
const email = ref('')
const topic = ref('')
const loading = ref(false)
const showSuccess = ref(false)

async function onSubmit() {
  if (!name.value.trim() || !email.value.trim() || !topic.value.trim()) {
    alert('Пожалуйста, заполните все поля!')
    return
  }
  loading.value = true
  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name.value, email: email.value, topic: topic.value })
    })
    if (res.ok) {
      showSuccess.value = true
      name.value = ''
      email.value = ''
      topic.value = ''
    } else {
      alert('Ошибка при отправке. Попробуйте позже.')
    }
  } catch (e) {
    alert('Ошибка при отправке. Попробуйте позже.')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.scrollbar-none::-webkit-scrollbar {
  display: none;
}
@media (max-width: 1023px) {
  .flex-raw, .flex.flex-raw {
    flex-direction: column !important;
  }
  .flex.flex-raw > div,
  .flex.flex-raw > .flex,
  .flex.flex-raw > .w-1\/2 {
    width: 100% !important;
    max-width: 100% !important;
  }
  .flex.flex-raw > .w-full {
    margin-bottom: 2rem;
  }
}
</style> 