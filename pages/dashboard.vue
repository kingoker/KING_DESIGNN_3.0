<template>
  <div class="min-h-screen bg-black text-white py-12 px-4">
    <div class="max-w-5xl mx-auto">
      <!-- Заголовок -->
      <h1
        class="
          text-5xl font-bold text-center mb-4
          drop-shadow-[0_0_10px_rgba(0,255,209,0.8)]
        "
      >
        💼 Панель управления
      </h1>
      <p class="text-center text-white/70 mb-12">
        Выберите действие ниже, великий KING! 👑
      </p>

      <!-- Сетка карточек -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Просмотр заявок -->
        <NuxtLink to="/responses" class="card">
          <div class="text-6xl mb-4">📥</div>
          <h2 class="text-2xl font-semibold mb-2">Просмотр заявок</h2>
          <p class="text-white/70">
            Здесь вы увидите все отправленные формы от ваших клиентов.
          </p>
        </NuxtLink>

        <!-- Редактор квиза -->
        <NuxtLink to="/quiz-editor" class="card">
          <div class="text-6xl mb-4">✏️</div>
          <h2 class="text-2xl font-semibold mb-2">Редактор квиза</h2>
          <p class="text-white/70">
            Управляйте вопросами и опциями прямо из дашборда.
          </p>
        </NuxtLink>

        <!-- Редактор проектов -->
        <NuxtLink to="/projects-editor" class="card">
          <div class="text-6xl mb-4">🗂️</div>
          <h2 class="text-2xl font-semibold mb-2">Редактор проектов</h2>
          <p class="text-white/70">
            Создавайте и редактируйте карточки портфолио прямо здесь.
          </p>
        </NuxtLink>

        <!-- Редактировать команду -->
        <NuxtLink to="/team-editor" class="card">
          <div class="text-6xl mb-4">👥</div>
          <h2 class="text-2xl font-semibold mb-2">Редактировать команду</h2>
          <p class="text-white/70">
            Добавляйте, изменяйте или удаляйте участников команды.
          </p>
        </NuxtLink>

        <!-- Редактор блога -->
        <NuxtLink to="/blog-editor" class="card">
          <div class="text-6xl mb-4">📰</div>
          <h2 class="text-2xl font-semibold mb-2">Редактор блога</h2>
          <p class="text-white/70">
            Управляйте статьями блога: создавайте, редактируйте и удаляйте.
          </p>
        </NuxtLink>

        <!-- Заглушка для будущих фич -->
        <div class="card opacity-50 cursor-not-allowed">
          <div class="text-6xl mb-4">⚙️</div>
          <h2 class="text-2xl font-semibold mb-2">В разработке</h2>
          <p class="text-white/70">
            Скоро здесь появятся новые функции для избранных.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import adminMiddleware from '~/middleware/admin'
definePageMeta({ middleware: [adminMiddleware] })
// Пока без логики — просто визуалка.
// Позже создадим страницу /team-editor и подключим CRUD для участников.
</script>

<style scoped>
.card {
  display: block;
  background: rgba(31,31,46,0.8);
  padding: 1.5rem;
  border: 1px solid #00ffd1;
  border-radius: 0.5rem;
  box-shadow: 0 0 10px rgba(0,255,209,0.5);
  text-align: center;
  transition: box-shadow .3s;
}
.card:hover {
  box-shadow: 0 0 20px rgba(0,255,209,0.8);
}
</style>
