<!-- pages/login.vue -->
<template>
  <div class="h-screen relative overflow-hidden bg-black">
    <!-- Биопанк-фон: SVG-лозы -->
    <svg
      class="absolute inset-0 w-full h-full vine-svg"
      viewBox="0 0 200 200"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <!-- Первая лоза -->
      <path
        d="M0,200 C20,150 60,50 100,100 S180,10 200,200"
      />
      <!-- Вторая лоза -->
      <path
        d="M30,200 C50,170 90,70 130,120 S190,20 220,200"
      />
    </svg>

    <!-- Контент поверх фона -->
    <div
      class="relative z-10 flex items-center justify-center px-4"
      style="height:100vh"
    >
      <div class="max-w-md w-full bg-gray-900/80 p-8 rounded-lg shadow-lg">
        <!-- Заголовок -->
        <h1
          class="
            text-3xl sm:text-4xl font-bold text-center
            text-transparent bg-clip-text
            bg-gradient-to-r from-cyan-400 to-green-400
            drop-shadow-[0_0_10px_rgba(0,255,209,0.8)]
            mb-6
          "
        >
          🔒 Круглый стол для избранных! 🔑<br />
          Введите секретную фразу
        </h1>

        <!-- Информационный текст -->
        <p class="text-center text-white/70 mb-6">
          🌟 Добро пожаловать за кулисы KING DESIGNN 🌟<br />
          Только посвящённые знают «ключ» входа! ✨
        </p>

        <!-- Форма -->
        <form @submit.prevent="onSubmit" class="space-y-4">
          <input
            v-model="pass"
            type="password"
            placeholder="🕵️‍♀️ Секретная фраза"
            class="
              w-full px-4 py-3
              bg-black/50 text-white
              placeholder-gray-400
              rounded-md border border-cyan-600
              focus:outline-none focus:ring-2 focus:ring-cyan-400
              transition
            "
          />

          <button
            type="submit"
            class="
              w-full py-3
              bg-gradient-to-r from-cyan-600 to-green-500
              text-white font-bold uppercase
              rounded-md shadow-md
              hover:shadow-lg transition
            "
          >
            Войти! 🚀
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const pass = ref('')
const router = useRouter()

function onSubmit() {
  if (pass.value.trim() === 'myking253') {
    router.push('/dashboard')
  } else {
    alert('❌ Ты не достоин этой чести! 🤷‍♂️👑😜')
    router.push('/')
  }
}
</script>

<style scoped>
.vine-svg path {
  stroke: rgba(0,255,150,0.5);
  stroke-width: 2;
  fill: none;
  /* оценочная длина пути — можно скорректировать по факту */
  stroke-dasharray: 500;
  stroke-dashoffset: 500;
  /* делаем анимацию бесконечной */
  animation:
    vine-grow 4s ease-out infinite,
    vine-blink 2s ease-in-out infinite;
}

@keyframes vine-grow {
  /* от полного «спрятанного» пути к полностью нарисованному,
     затем сброс и снова рост */
  0%   { stroke-dashoffset: 500; }
  100% { stroke-dashoffset: 0; }
}

@keyframes vine-blink {
  0%, 100% { stroke-opacity: 0.4; }
  50%       { stroke-opacity: 0.8; }
}
</style>

