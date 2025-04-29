<template>
  <div class="min-h-screen bg-gray-900 text-gray-100 py-10 px-4">
    <div class="max-w-5xl mx-auto space-y-8">
      <h1 class="text-3xl font-bold text-center">📰 Редактор блога</h1>

      <!-- Фильтры -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <input
          v-model="filters.search"
          type="text"
          placeholder="Поиск по названию"
          class="w-full p-2 bg-gray-800 rounded"
        />
        <select v-model="filters.category" class="w-full p-2 bg-gray-800 rounded">
          <option value="">Все категории</option>
          <option v-for="c in categories" :key="c.id" :value="String(c.id)">
            {{ c.name_ru }}
          </option>
        </select>
        <input v-model="filters.date" type="date" class="w-full p-2 bg-gray-800 rounded" />
      </div>

      <div v-if="loading" class="text-center italic">Загрузка данных…</div>

      <div v-else class="space-y-6">
        <!-- Список статей -->
        <div
          v-for="a in filteredArticles"
          :key="a.id"
          class="bg-gray-800 p-6 rounded-lg shadow space-y-4"
        >
          <div class="flex justify-between items-center">
            <h2 class="text-xl font-semibold">Статья #{{ a.id }}</h2>
            <div class="flex space-x-2">
              <button
                @click="handleUpdateArticle(a)"
                class="px-4 py-2 bg-green-600 hover:bg-green-500 rounded"
              >
                Сохранить
              </button>
              <button
                @click="handleDeleteArticle(a.id)"
                class="px-4 py-2 bg-red-600 hover:bg-red-500 rounded"
              >
                Удалить
              </button>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              v-model="a.title"
              @input="onEditTitle(a)"
              placeholder="Заголовок"
              class="w-full p-2 bg-gray-700 rounded"
            />
            <input
              v-model="a.slug"
              @input="onEditSlug(a)"
              placeholder="Slug"
              class="w-full p-2 bg-gray-700 rounded"
            />
          </div>

          <textarea
            v-model="a.excerpt"
            rows="2"
            placeholder="Краткий анонс"
            class="w-full p-2 bg-gray-700 rounded"
          ></textarea>
          <input
            v-model="a.cover_url"
            placeholder="URL обложки"
            class="w-full p-2 bg-gray-700 rounded"
          />
          <input
            v-model="a.published_at"
            type="datetime-local"
            class="w-full p-2 bg-gray-700 rounded"
          />

          <div>
            <label class="block mb-1">Категории:</label>
            <div class="flex flex-wrap gap-2">
              <label
                v-for="c in categories"
                :key="c.id"
                class="flex items-center space-x-1"
              >
                <input type="checkbox" :value="c.id" v-model="a.category_ids" />
                <span>{{ c.name_ru }}</span>
              </label>
            </div>
          </div>

          <div сlass="tiptap">
            <label class="block mb-1">Контент (Markdown):</label>
            <editor v-model="a.content_markdown" class="w-full p-2 bg-gray-700 rounded font-mono"/>
          </div>
        </div>

        <!-- Форма новой статьи -->
        <div class="bg-gray-800 p-6 rounded-lg shadow space-y-4">
          <h2 class="text-xl font-semibold">➕ Новая статья</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              v-model="newArticle.title"
              @input="onEditTitle(newArticle)"
              placeholder="Заголовок"
              class="w-full p-2 bg-gray-700 rounded"
            />
            <input
              v-model="newArticle.slug"
              @input="onEditSlug(newArticle)"
              placeholder="Slug"
              class="w-full p-2 bg-gray-700 rounded"
            />
          </div>
          <textarea
            v-model="newArticle.excerpt"
            rows="2"
            placeholder="Краткий анонс"
            class="w-full p-2 bg-gray-700 rounded"
          ></textarea>
          <input
            v-model="newArticle.cover_url"
            placeholder="URL обложки"
            class="w-full p-2 bg-gray-700 rounded"
          />
          <input
            v-model="newArticle.published_at"
            type="datetime-local"
            class="w-full p-2 bg-gray-700 rounded"
          />

          <div>
            <label class="block mb-1">Категории:</label>
            <div class="flex flex-wrap gap-2">
              <label
                v-for="c in categories"
                :key="c.id"
                class="flex items-center space-x-1"
              >
                <input type="checkbox" :value="c.id" v-model="newArticle.category_ids" />
                <span>{{ c.name_ru }}</span>
              </label>
            </div>
          </div>

          <div>
            <label class="block mb-1">Контент (Markdown):</label>
            <editor v-model="newArticle.content_markdown" class="w-full p-2 bg-gray-700 rounded font-mono" />
          </div>

          <button
            @click="handleAddArticle"
            class="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded"
          >
            Создать статью
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { reactive, onMounted } from 'vue'
  import { useBlog } from '~/composables/useBlog'
  import Editor from '~/components/Editor.vue'


  interface Article {
    id?: number
    title: string
    slug: string
    excerpt: string
    cover_url: string
    published_at: string
    category_ids: number[]
    content_markdown: string
    slug_manually: boolean
  }

  const {
    categories,
    articles,
    loading,
    filters,
    filteredArticles,
    slugify,
    loadData,
    updateArticle,
    deleteArticle,
    createArticle
  } = useBlog()

  const newArticle = reactive<Article>({
    title: '',
    slug: '',
    excerpt: '',
    cover_url: '',
    published_at: new Date().toISOString().slice(0, 16),
    category_ids: [],
    content_markdown: '',
    slug_manually: false
  })

  function onEditTitle(a: Article) {
    if (!a.slug_manually && a.title) {
      a.slug = slugify(a.title)
    }
  }

  function onEditSlug(a: Article) {
    a.slug_manually = true
  }

  async function handleUpdateArticle(article: Article) {
    try {
      await updateArticle(article)
      alert('✅ Статья обновлена!')
    } catch (error: any) {
      alert(`Ошибка сохранения: ${error.message}`)
    }
  }

  async function handleDeleteArticle(id: number) {
    if (!confirm('Удалить статью?')) return
    try {
      await deleteArticle(id)
    } catch (error: any) {
      alert(`Ошибка удаления: ${error.message}`)
    }
  }

  async function handleAddArticle() {
    if (!newArticle.title || !newArticle.slug) {
      alert('Заголовок и slug обязательны')
      return
    }

    try {
      await createArticle(newArticle)
      Object.assign(newArticle, {
        title: '',
        slug: '',
        excerpt: '',
        cover_url: '',
        published_at: new Date().toISOString().slice(0, 16),
        category_ids: [],
        content_markdown: '',
        slug_manually: false
      })
      alert('🎉 Добавлена новая статья!')
    } catch (error: any) {
      alert(`Ошибка создания: ${error.message}`)
    }
  }

  onMounted(loadData)
</script>