<template>
    <div class="min-h-screen bg-black text-white py-16 px-4">
      <!-- Фильтры -->
      <div class="max-w-4xl mx-auto mb-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <input
          v-model="filters.search"
          @input="fetchArticles"
          type="text"
          placeholder="Поиск..."
          class="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400"
        />
  
        <select
          v-model="filters.category"
          @change="fetchArticles"
          class="w-full p-3 rounded-lg bg-gray-800 text-white"
        >
          <option value="">Все категории</option>
          <option
            v-for="cat in categories"
            :key="cat.id"
            :value="String(cat.id)"
          >
            {{ cat.name_ru }}
          </option>
        </select>
  
        <input
          v-model="filters.date"
          @change="fetchArticles"
          type="date"
          class="w-full p-3 rounded-lg bg-gray-800 text-white"
        />
      </div>
  
      <!-- Состояние загрузки и ошибки -->
      <div v-if="loading" class="text-center italic">Загрузка...</div>
      <div v-else-if="error" class="text-center text-red-500">
        Ошибка при загрузке статей.
      </div>
  
      <!-- Список статей -->
      <div v-else class="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
        <div
          v-for="article in articles"
          :key="article.id"
          ref="cards"
          class="biopunk-card shadow-lg overflow-hidden"
        >
          <NuxtLink :to="`/blog/${article.slug}`" class="block flex flex-col h-full">
            <!-- Обложка с соотношением 4:3 -->
            <div class="w-full aspect-[4/3]">
              <img
                v-if="article.cover_url"
                :src="article.cover_url"
                alt=""
                class="w-full h-full object-cover"
              />
            </div>
            <!-- Контент -->
            <div class="p-4 bg-gray-900/80 flex-1 flex flex-col justify-between">
              <div>
                <h2 class="text-xl font-bold mb-1 neon-text">
                  {{ article.title }}
                </h2>
                <p class="text-gray-300 mb-3 line-clamp-3">
                  {{ article.excerpt }}
                </p>
              </div>
              <div>
                <div class="flex flex-wrap gap-2 mb-2">
                  <span
                    v-for="link in article.article_categories"
                    :key="link.category.name_ru"
                    class="px-2 py-1 bg-cyan-600 rounded text-xs"
                  >
                    {{ link.category.name_ru }}
                  </span>
                </div>
                <div class="text-sm text-gray-400">
                  {{ formatDate(article.published_at) }}
                </div>
              </div>
            </div>
          </NuxtLink>
        </div>
  
        <div v-if="articles.length === 0" class="text-center text-gray-500 col-span-full">
          Статей не найдено.
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref as vueRef, reactive, onMounted } from 'vue'
  import { useSupabase } from '~/composables/useSupabase'
  import gsap from 'gsap'
  
  interface Category {
    id: number
    name_ru: string
  }
  
  interface ArticleCategoryLink {
    category: { name_ru: string }
  }
  
  interface Article {
    id: number
    title: string
    slug: string
    excerpt: string
    cover_url: string
    published_at: string
    article_categories: ArticleCategoryLink[]
  }
  
  const supabase = useSupabase()
  const categories = vueRef<Category[]>([])
  const articles = vueRef<Article[]>([])
  const loading = vueRef(false)
  const error = vueRef(false)
  const cards = vueRef<HTMLElement[]>([])
  const filters = reactive({ search: '', category: '', date: '' })
  
  async function fetchCategories() {
    const { data, error: err } = await supabase
      .from('categories')
      .select('id,name_ru')
      .order('name_ru')
    if (!err && data) categories.value = data
  }
  
  async function fetchArticles() {
    loading.value = true
    error.value = false
  
    let query = supabase
      .from<Article>('articles')
      .select(
        `
        id,
        title,
        slug,
        excerpt,
        cover_url,
        published_at,
        article_categories!inner(
          category:categories ( name_ru )
        )`
      )
  
    if (filters.search) query = query.ilike('title', `%${filters.search}%`)
    if (filters.date) query = query.gte('published_at', filters.date)
    if (filters.category) query = query.eq('article_categories.category_id', Number(filters.category))
  
    const { data, error: err } = await query
      .order('published_at', { ascending: false })
  
    if (err) {
      console.error(err)
      error.value = true
    } else {
      articles.value = data || []
    }
  
    loading.value = false
  }
  
  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }
  
  onMounted(async () => {
    await fetchCategories()
    await fetchArticles()
  
    // GSAP hover effect
    cards.value.forEach(card => {
      gsap.set(card, { transformOrigin: 'center center' })
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          scale: 1.05,
          boxShadow: '0 0 20px rgba(0,255,209,0.4)',
          duration: 0.3,
          ease: 'power1.out'
        })
      })
      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          scale: 1,
          boxShadow: '0 0 10px rgba(0,255,209,0.3)',
          duration: 0.3,
          ease: 'power1.out'
        })
      })
    })
  })
  </script>
  
  <style scoped>
  @import 'https://cdn.jsdelivr.net/npm/@tailwindcss/typography@0.5.0/dist/typography.min.css';
  
  .biopunk-card {
    background: rgba(10, 10, 15, 0.8);
    border: 2px solid rgba(0, 255, 209, 0.4);
    box-shadow: 0 0 10px rgba(0, 255, 209, 0.3), inset 0 0 5px rgba(0, 255, 209, 0.2);
    border-radius: 0.5rem;
    transition: box-shadow 0.3s;
  }
  
  .line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  .neon-text {
    color: rgba(0, 255, 209, 0.8);
    text-shadow: 0 0 6px rgba(0, 255, 209, 0.6);
  }
  </style>
  