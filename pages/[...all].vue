<!-- pages/404.vue -->
<template>
    <div
      class="min-h-screen flex flex-col items-center justify-center bg-black text-white px-4"
    >
      <!-- Большой неоновый код ошибки -->
      <h1
        class="
          text-9xl font-extrabold
          text-transparent bg-clip-text
          bg-gradient-to-r from-cyan-400 to-green-400
          drop-shadow-[0_0_20px_rgba(0,255,209,0.8)]
        "
      >
        404
      </h1>
  
      <!-- Сообщение -->
      <p
        class="
          mt-4 text-2xl sm:text-3xl
          font-semibold
          text-gray-300
        "
      >
        🤔 Ой! Такой страницы не существует.
      </p>
  
      <!-- Подсказка -->
      <p class="mt-2 text-gray-500">
        Но не переживай, великий KING — мы всё исправим!
      </p>
  
      <!-- Ссылка домой -->
      <NuxtLink
        to="/"
        class="
          mt-8 inline-block
          px-6 py-3
          bg-gradient-to-r from-cyan-600 to-green-500
          hover:from-cyan-500 hover:to-green-400
          rounded-md uppercase font-bold
          shadow-lg
          transition
        "
      >
        🏠 Вернуться домой
      </NuxtLink>
    </div>
  </template>
  
  <script setup lang="ts">
  // Ничего не требуется: Nuxt сам покажет эту страницу при 404
  </script>
  
  <style scoped>
  /* Плавное появление */
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  div {
    animation: fadeIn 0.6s ease-out both;
  }
  </style>
  