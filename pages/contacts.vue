<!-- pages/contact.vue -->
<template>
  <section class="min-h-screen bg-black text-white py-20 px-4">
    <div class="max-w-3xl mx-auto space-y-12">

      <!-- Заголовок -->
      <h1 class="text-6xl md:text-7xl font-extrabold text-center flex items-center justify-center space-x-2 leading-tight">
        <span class="text-[#00ffd1] text-7xl md:text-8xl">📬</span>
        <span
          class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-green-400
                 drop-shadow-[0_0_10px_rgba(0,255,209,0.8)]"
        >
          Контакты
        </span>
      </h1>

      <!-- О компании -->
      <div class="space-y-4">
        <p class="text-gray-300 text-lg md:text-xl leading-relaxed">
          KING DESIGNN — цифровое дизайн-агентство, создающее футуристичные и минималистичные решения для брендов по всему миру.
        </p>
        <p class="text-gray-300 text-lg md:text-xl leading-relaxed">
          Наши услуги включают веб-дизайн, иллюстрации, брендинг и автоматизацию процессов. Мы стремимся к инновациям и помогаем клиентам выделяться на рынке.
        </p>
      </div>

      <!-- Информация о контактах -->
      <div class="space-y-6">
        <p class="text-gray-300 text-lg md:text-xl leading-relaxed">
          Если у вас есть вопросы или вы хотите обсудить проект — напишите нам или позвоните.
        </p>
        <ul class="space-y-4">
          <li class="flex items-center space-x-3">
            <span class="text-xl text-[#00ffd1]">📍</span>
            <span class="text-lg md:text-xl">2117 81st Street, Brooklyn, NY 11214</span>
          </li>
          <li class="flex items-center space-x-3">
            <span class="text-xl text-[#00ffd1]">✉️</span>
            <a href="mailto:info@kingdesignn.ru" class="hover:underline text-lg md:text-xl">
              info@kingdesignn.ru
            </a>
          </li>
          <li class="flex items-center space-x-3">
            <span class="text-xl text-[#00ffd1]">📞</span>
            <a href="tel:+19297373991" class="hover:underline text-lg md:text-xl">
              +1 (929) 737-3991
            </a>
          </li>
          <li class="flex items-center space-x-3">
            <span class="text-xl text-[#00ffd1]">⏰</span>
            <span class="text-lg md:text-xl">Пн–Пт: 9:00–18:00 EST</span>
          </li>
        </ul>
        <div>
          <a
            href="https://t.me/king_designn"
            target="_blank"
            class="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-full text-white font-semibold transition space-x-2 text-lg md:text-xl"
          >
            <!-- иконка Telegram -->
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 240 240" fill="currentColor">
              <path d="M120 0C53.7 0 0 53.7 0 120s53.7 120 120 120 120-53.7 120-120S186.3 0 120 0zm56.5 82.7l-18.2 86.2c-1.3 7.2-4.7 9-9.5 5.6l-26.3-19.5-12.7 12.2c-1.4 1.4-2.6 2.6-5.3 2.6l1.9-27.4 49.7-44.9c2.2-1.9-.5-3-3.5-1.1l-61.4 38.6-26.4-8.2c-5.7-1.8-5.8-5.7 1.2-8.5l102.9-39.6c4.8-1.8 9-1 7.3 6.5z"/>
            </svg>
            <span>Связаться в Telegram</span>
          </a>
        </div>
      </div>

      <!-- Форма обратной связи -->
      <form @submit.prevent="onSubmit" class="space-y-6">
        <div>
          <label for="name" class="block mb-2 text-lg md:text-xl">Ваше имя</label>
          <input
            id="name"
            v-model="form.name"
            type="text"
            required
            class="w-full p-3 bg-gray-800 rounded placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400 text-lg md:text-xl"
          />
        </div>
        <div>
          <label for="email" class="block mb-2 text-lg md:text-xl">Email</label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            required
            class="w-full p-3 bg-gray-800 rounded placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400 text-lg md:text-xl"
          />
        </div>
        <div>
          <label for="message" class="block mb-2 text-lg md:text-xl">Сообщение</label>
          <textarea
            id="message"
            v-model="form.message"
            rows="5"
            required
            class="w-full p-3 bg-gray-800 rounded placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400 text-lg md:text-xl"
          ></textarea>
        </div>
        <button
          type="submit"
          :disabled="loading"
          class="w-full py-3 bg-green-600 hover:bg-green-500 disabled:opacity-50 rounded text-white font-semibold transition text-lg md:text-xl"
        >
          {{ loading ? 'Отправка...' : 'Отправить' }}
        </button>
      </form>

      <!-- Статус отправки -->
      <p v-if="status" class="text-green-400 font-medium text-lg md:text-xl">{{ status }}</p>

    </div>
  </section>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

const form = reactive({ name: '', email: '', message: '' })
const status = ref('')
const loading = ref(false)

async function onSubmit() {
  if (!form.name || !form.email || !form.message) {
    status.value = 'Пожалуйста, заполните все поля.'
    return
  }
  loading.value = true
  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
    if (!res.ok) throw new Error('Network response was not ok')
    status.value = 'Спасибо! Ваше сообщение отправлено.'
    form.name = ''
    form.email = ''
    form.message = ''
  } catch (e) {
    console.error(e)
    status.value = 'Ошибка при отправке. Попробуйте позже.'
  } finally {
    loading.value = false
    setTimeout(() => (status.value = ''), 5000)
  }
}
</script>

<style scoped>
/* при желании добавьте мелкие кастомизации */
</style>
