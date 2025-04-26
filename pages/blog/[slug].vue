<template>
  <div class="relative min-h-screen bg-black text-white py-20 px-4">
    <!-- Биопанк фон -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-tr from-cyan-600 to-green-400 opacity-20 rounded-full blur-3xl animate-blob"></div>
      <div class="absolute -bottom-32 -right-32 w-80 h-80 bg-gradient-to-br from-green-400 to-cyan-600 opacity-20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
    </div>

    <article class="relative max-w-3xl mx-auto">
      <div v-if="pending" class="text-center italic">Загрузка…</div>
      <div v-else-if="error" class="text-center text-red-500">Статья не найдена.</div>
      <div v-else class="bg-gray-900/70 backdrop-blur-lg rounded-2xl p-8 border border-cyan-500 animate-border-neon overflow-hidden">
        <!-- Обложка -->
        <img
          v-if="article.cover_url"
          :src="article.cover_url"
          class="w-full object-cover rounded-md mb-8"
          alt="Обложка"
        />

        <!-- Заголовок -->
        <h1 class="text-4xl font-extrabold mb-4">
          {{ article.title }}
        </h1>

        <!-- Категории -->
        <div class="flex flex-wrap gap-2 mb-6">
          <span
            v-for="link in article.article_categories"
            :key="link.category.name_ru"
            class="px-3 py-1 bg-cyan-600 rounded text-sm"
          >
            {{ link.category.name_ru }}
          </span>
        </div>

        <!-- Дата -->
        <div class="text-gray-400 mb-8">
          {{ formatDate(article.published_at) }}
        </div>

        <!-- Содержимое статьи -->
        <div class="prose prose-invert neon-text">
          <div v-html="renderedContent"></div>
        </div>
      </div>
    </article>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter, createError, useAsyncData } from '#imports'
import MarkdownIt from 'markdown-it'
import { useSupabase } from '~/composables/useSupabase'

const route = useRoute()
const slug = route.params.slug as string
const router = useRouter()
const supabase = useSupabase()

const { data: article, pending, error } = await useAsyncData(
  `article-${slug}`,
  async () => {
    const { data, error } = await supabase
      .from('articles')
      .select(
        `
        id,
        title,
        content_markdown,
        cover_url,
        published_at,
        article_categories!inner(
          category:categories ( name_ru )
        )`
      )
      .eq('slug', slug)
      .single()
    if (error || !data) throw createError({ statusCode: 404 })
    return data
  }
)
if (error.value?.statusCode === 404) router.replace('/404')

const md = new MarkdownIt({ html: true, linkify: true })
const renderedContent = computed(() =>
  article.value?.content_markdown ? md.render(article.value.content_markdown) : ''
)

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>

<style scoped>
@import 'https://cdn.jsdelivr.net/npm/@tailwindcss/typography@0.5.0/dist/typography.min.css';

/* Neon border animation */
@keyframes border-neon {
  0%,100% { border-color: rgba(0,255,209,0.6) }
  50%     { border-color: rgba(0,200,150,0.6) }
}
.animate-border-neon { animation: border-neon 3s ease-in-out infinite };

/* Blob animation */
@keyframes blob {
  0%,100% { transform: translate(0,0) scale(1) }
  33%     { transform: translate(20px,-10px) scale(1.1) }
  66%     { transform: translate(-10px,20px) scale(0.9) }
}
.animate-blob { animation: blob 8s infinite ease-in-out }
.animation-delay-2000 { animation-delay: 2s }

</style>
