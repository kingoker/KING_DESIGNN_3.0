<template>
  <div class="min-h-screen bg-gray-900 text-gray-100 py-10 px-4">
    <div class="max-w-5xl mx-auto space-y-8">
      <h1 class="text-3xl font-bold text-center">📰 Редактор блога</h1>

      <!-- Фильтры поиска -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <input
          v-model="filters.search"
          type="text"
          placeholder="Поиск по названию"
          class="w-full p-2 bg-gray-800 rounded"
        />
        <select
          v-model="filters.category"
          class="w-full p-2 bg-gray-800 rounded"
        >
          <option value="">Все категории</option>
          <option
            v-for="c in categories"
            :key="c.id"
            :value="String(c.id)"
          >{{ c.name_ru }}</option>
        </select>
        <input
          v-model="filters.date"
          type="date"
          class="w-full p-2 bg-gray-800 rounded"
        />
      </div>

      <div v-if="loading" class="text-center italic">Загрузка данных…</div>

      <div v-else class="space-y-6">
        <!-- Список отфильтрованных и отсортированных статей -->
        <div
          v-for="a in filteredArticles"
          :key="a.id"
          class="bg-gray-800 p-6 rounded-lg shadow flex flex-col space-y-4"
        >
          <div class="flex justify-between items-center">
            <h2 class="text-xl font-semibold">Статья #{{ a.id }}</h2>
            <div class="flex space-x-2">
              <button @click="updateArticle(a)" class="px-4 py-2 bg-green-600 hover:bg-green-500 rounded">Сохранить</button>
              <button @click="deleteArticle(a.id)" class="px-4 py-2 bg-red-600 hover:bg-red-500 rounded">Удалить</button>
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
              placeholder="Slug"
              class="w-full p-2 bg-gray-700 rounded"
            />
          </div>
          <textarea v-model="a.excerpt" rows="2" placeholder="Краткий анонс" class="w-full p-2 bg-gray-700 rounded"></textarea>
          <input v-model="a.cover_url" placeholder="URL обложки" class="w-full p-2 bg-gray-700 rounded" />
          <input v-model="a.published_at" type="datetime-local" class="w-full p-2 bg-gray-700 rounded" />

          <div>
            <label class="block mb-1">Категории:</label>
            <div class="flex flex-wrap gap-2">
              <label v-for="c in categories" :key="c.id" class="flex items-center space-x-1">
                <input type="checkbox" :value="c.id" v-model="a.category_ids" />
                <span>{{ c.name_ru }}</span>
              </label>
            </div>
          </div>

          <div>
            <label class="block mb-1">Контент (Markdown):</label>
            <textarea v-model="a.content_markdown" rows="4" class="w-full p-2 bg-gray-700 rounded font-mono"></textarea>
          </div>
        </div>

        <!-- Добавление новой статьи -->
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
              placeholder="Slug"
              class="w-full p-2 bg-gray-700 rounded"
            />
          </div>
          <textarea v-model="newArticle.excerpt" rows="2" placeholder="Краткий анонс" class="w-full p-2 bg-gray-700 rounded"></textarea>
          <input v-model="newArticle.cover_url" placeholder="URL обложки" class="w-full p-2 bg-gray-700 rounded" />
          <input v-model="newArticle.published_at" type="datetime-local" class="w-full p-2 bg-gray-700 rounded" />

          <div>
            <label class="block mb-1">Категории:</label>
            <div class="flex flex-wrap gap-2">
              <label v-for="c in categories" :key="c.id" class="flex items-center space-x-1">
                <input type="checkbox" :value="c.id" v-model="newArticle.category_ids" />
                <span>{{ c.name_ru }}</span>
              </label>
            </div>
          </div>

          <div>
            <label class="block mb-1">Контент (Markdown):</label>
            <textarea v-model="newArticle.content_markdown" rows="4" class="w-full p-2 bg-gray-700 rounded font-mono"></textarea>
          </div>

          <button @click="addArticle" class="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded">Создать статью</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue'
import { useSupabase } from '~/composables/useSupabase'

// простая транслитерация
const CHAR_MAP: Record<string,string> = {
  а:'a',б:'b',в:'v',г:'g',д:'d',е:'e',ё:'yo',ж:'zh',з:'z',и:'i',й:'j',
  к:'k',л:'l',м:'m',н:'n',о:'o',п:'p',р:'r',с:'s',т:'t',у:'u',ф:'f',
  х:'h',ц:'c',ч:'ch',ш:'sh',щ:'shch',ъ:'',ы:'y',ь:'',э:'e',ю:'yu',я:'ya'
}
function slugify(str: string) {
  return str.toLowerCase().trim()
    .split('')
    .map(ch => CHAR_MAP[ch] ?? ch)
    .join('')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9\-]/g, '')
    .replace(/\-+/g, '-')
}

interface Category { id: number; name_ru: string }
interface Article { id: number; title: string; slug: string; excerpt: string; cover_url: string; published_at: string; category_ids: number[]; content_markdown: string }

const supabase = useSupabase()
const categories = ref<Category[]>([])
const articles = ref<Article[]>([])
const loading = ref(true)

// Фильтры
const filters = reactive({ search: '', category: '', date: '' })

// Новая статья
const newArticle = reactive<Partial<Article>>({
  title: '', slug: '', excerpt: '', cover_url: '',
  published_at: new Date().toISOString().slice(0,16),
  category_ids: [] as number[], content_markdown: ''
})

// Генерация slug при вводе заголовка
function onEditTitle(a: { title?: string; slug?: string }) {
  if (a.title != null && !a.hasOwnProperty('slug_manually')) {
    a.slug = slugify(a.title)
  }
}

async function loadData() {
  loading.value = true
  const [cRes, aRes, acRes] = await Promise.all([
    supabase.from('categories').select('id,name_ru'),
    supabase.from<Article>('articles').select('id,title,slug,excerpt,cover_url,published_at,content_markdown'),
    supabase.from('article_categories').select('article_id,category_id')
  ])
  if (cRes.data) categories.value = cRes.data
  if (aRes.data) {
    const catMap = acRes.data?.reduce((m, r) => { m[r.article_id] = m[r.article_id]||[]; m[r.article_id].push(r.category_id); return m }, {} as Record<number,number[]>)
    articles.value = aRes.data.map(a => ({ ...a, category_ids: catMap[a.id]||[] }))
  }
  loading.value = false
}

const filteredArticles = computed(() =>
  articles.value
    .filter(a => {
      const matchTitle = a.title.toLowerCase().includes(filters.search.toLowerCase())
      const matchCat = !filters.category || a.category_ids.includes(Number(filters.category))
      const matchDate = !filters.date || a.published_at.slice(0,10) === filters.date
      return matchTitle && matchCat && matchDate
    })
    .sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime())
)

async function updateArticle(a: Article) {
  await supabase.from('articles').update({
    title: a.title, slug: a.slug, excerpt: a.excerpt, cover_url: a.cover_url,
    published_at: a.published_at, content_markdown: a.content_markdown
  }).eq('id', a.id)
  await supabase.from('article_categories').delete().eq('article_id', a.id)
  if (a.category_ids.length) {
    await supabase.from('article_categories').insert(
      a.category_ids.map(cid => ({ article_id: a.id, category_id: cid }))
    )
  }
  alert('Статья обновлена')
}

async function deleteArticle(id: number) {
  if (!confirm('Удалить статью?')) return
  await supabase.from('article_categories').delete().eq('article_id', id)
  await supabase.from('articles').delete().eq('id', id)
  articles.value = articles.value.filter(a => a.id !== id)
}

async function addArticle() {
  if (!newArticle.title || !newArticle.slug) {
    alert('Заголовок и slug обязательны')
    return
  }
  const { data, error } = await supabase.from('articles').insert([{
    title: newArticle.title, slug: newArticle.slug, excerpt: newArticle.excerpt,
    cover_url: newArticle.cover_url, published_at: newArticle.published_at,
    content_markdown: newArticle.content_markdown
  }]).select('id').single()
  if (!error && data) {
    const aid = data.id
    if (newArticle.category_ids && newArticle.category_ids.length) {
      await supabase.from('article_categories').insert(
        newArticle.category_ids.map(cid => ({ article_id: aid, category_id: cid }))
      )
    }
    await loadData()
    Object.assign(newArticle, {
      title: '', slug: '', excerpt: '', cover_url: '',
      published_at: new Date().toISOString().slice(0,16),
      category_ids: [], content_markdown: ''
    })
    alert('Статья создана')
  }
}

onMounted(loadData)
</script>

<style scoped>
.bg-gray-800 { background-color: rgba(31,31,46,0.9) }
</style>
