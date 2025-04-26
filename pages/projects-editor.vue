<template>
    <div class="min-h-screen bg-gray-900 text-gray-100 py-10 px-4">
      <div class="max-w-6xl mx-auto space-y-8">
        <h1 class="text-3xl font-bold text-center">🗂️ Редактор проектов</h1>
  
        <div v-if="loading" class="text-center italic">Загрузка проектов…</div>
        <div v-else class="space-y-6">
          <!-- Список проектов -->
          <div
            v-for="proj in projects"
            :key="proj.id"
            class="bg-gray-800 p-6 rounded-lg shadow space-y-4"
          >
            <div class="flex justify-between items-start space-x-4">
              <!-- Поля для редактирования -->
              <div class="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm mb-1">Заголовок</label>
                  <input
                    v-model="proj.title"
                    @input="onEditTitle(proj)"
                    type="text"
                    placeholder="title"
                    class="w-full px-3 py-2 bg-gray-700 text-gray-100 rounded border border-gray-600"
                  />
                </div>
                <div>
                  <label class="block text-sm mb-1">Slug</label>
                  <input
                    v-model="proj.slug"
                    type="text"
                    placeholder="slug"
                    class="w-full px-3 py-2 bg-gray-700 text-gray-100 rounded border border-gray-600"
                  />
                </div>
                <div class="md:col-span-2">
                  <label class="block text-sm mb-1">Краткое описание</label>
                  <input
                    v-model="proj.short_description"
                    type="text"
                    placeholder="short_description"
                    class="w-full px-3 py-2 bg-gray-700 text-gray-100 rounded border border-gray-600"
                  />
                </div>
                <div>
                  <label class="block text-sm mb-1">URL обложки</label>
                  <input
                    v-model="proj.image_url"
                    type="url"
                    placeholder="image_url"
                    class="w-full px-3 py-2 bg-gray-700 text-gray-100 rounded border border-gray-600"
                  />
                </div>
                <div>
                  <label class="block text-sm mb-1">Ссылка на проект</label>
                  <input
                    v-model="proj.project_url"
                    type="url"
                    placeholder="project_url"
                    class="w-full px-3 py-2 bg-gray-700 text-gray-100 rounded border border-gray-600"
                  />
                </div>
                <div>
                  <label class="block text-sm mb-1">Статус</label>
                  <select
                    v-model="proj.status"
                    class="w-full px-3 py-2 bg-gray-700 text-gray-100 rounded border border-gray-600"
                  >
                    <option value="live">Live</option>
                    <option value="soon">Coming Soon</option>
                  </select>
                </div>
                <div class="md:col-span-2">
                  <label class="block text-sm mb-1">Long Description (Markdown)</label>
                  <textarea
                    v-model="proj.long_description"
                    rows="4"
                    class="w-full px-3 py-2 bg-gray-700 text-gray-100 rounded border border-gray-600 resize-none"
                  ></textarea>
                </div>
                <div class="md:col-span-2">
                  <label class="block text-sm mb-1">Images (по одной URL на строку)</label>
                  <textarea
                    v-model="proj.imagesText"
                    rows="3"
                    class="w-full px-3 py-2 bg-gray-700 text-gray-100 rounded border border-gray-600 resize-none"
                  ></textarea>
                </div>
              </div>
  
              <!-- Кнопки -->
              <div class="flex flex-col space-y-2">
                <button
                  @click="updateProject(proj)"
                  class="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 rounded text-white"
                >Сохранить</button>
                <button
                  @click="deleteProject(proj.id)"
                  class="px-4 py-2 bg-rose-500 hover:bg-rose-400 rounded text-white"
                >Удалить</button>
              </div>
            </div>
          </div>
  
          <!-- Форма добавления нового проекта -->
          <div class="bg-gray-800 p-6 rounded-lg shadow space-y-4">
            <h2 class="text-lg font-semibold">➕ Добавить проект</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                v-model="newProj.title"
                @input="onEditTitle(newProj)"
                type="text"
                placeholder="title"
                class="w-full px-3 py-2 bg-gray-700 text-gray-100 rounded border border-gray-600"
              />
              <input
                v-model="newProj.slug"
                type="text"
                placeholder="slug"
                class="w-full px-3 py-2 bg-gray-700 text-gray-100 rounded border border-gray-600"
              />
              <input
                v-model="newProj.short_description"
                type="text"
                placeholder="short_description"
                class="w-full px-3 py-2 bg-gray-700 text-gray-100 rounded border border-gray-600"
              />
              <input
                v-model="newProj.image_url"
                type="url"
                placeholder="image_url"
                class="w-full px-3 py-2 bg-gray-700 text-gray-100 rounded border border-gray-600"
              />
              <input
                v-model="newProj.project_url"
                type="url"
                placeholder="project_url"
                class="w-full px-3 py-2 bg-gray-700 text-gray-100 rounded border border-gray-600"
              />
              <select
                v-model="newProj.status"
                class="w-full px-3 py-2 bg-gray-700 text-gray-100 rounded border border-gray-600"
              >
                <option disabled value="">Статус</option>
                <option value="live">Live</option>
                <option value="soon">Coming Soon</option>
              </select>
              <textarea
                v-model="newProj.long_description"
                rows="4"
                placeholder="long_description"
                class="w-full px-3 py-2 bg-gray-700 text-gray-100 rounded border border-gray-600 resize-none"
              ></textarea>
              <textarea
                v-model="newProj.imagesText"
                rows="3"
                placeholder="images (каждый URL с новой строки)"
                class="w-full px-3 py-2 bg-gray-700 text-gray-100 rounded border border-gray-600 resize-none"
              ></textarea>
            </div>
            <button
              @click="addProject"
              class="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded text-white"
            >Создать проект</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, reactive, onMounted } from 'vue'
  import { useSupabase } from '~/composables/useSupabase'
  
  // простая транслитерация для кириллицы
  const CHAR_MAP: Record<string,string> = {
    а:'a',б:'b',в:'v',г:'g',д:'d',е:'e',ё:'yo',ж:'zh',з:'z',и:'i',й:'j',
    к:'k',л:'l',м:'m',н:'n',о:'o',п:'p',р:'r',с:'s',т:'t',у:'u',ф:'f',
    х:'h',ц:'c',ч:'ch',ш:'sh',щ:'shch',ъ:'',ы:'y',ь:'',э:'e',ю:'yu',я:'ya'
  }
  function slugify(str: string) {
    return str.toLowerCase().trim()
      // транслитерация
      .split('')
      .map(ch => CHAR_MAP[ch] ?? ch)
      .join('')
      // очистка
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9\-]/g, '')
      .replace(/\-+/g, '-')
  }
  
  interface Project {
    id: number
    created_at: string
    slug: string
    title: string
    short_description: string
    image_url: string
    project_url: string | null
    status: 'live' | 'soon'
    long_description: string | null
    images: string[] | null
  }
  
  const supabase = useSupabase()
  const projects = ref<(Project & { imagesText: string })[]>([])
  const loading  = ref(true)
  
  // реактивный новый проект
  const newProj = reactive<Partial<Project> & { imagesText: string }>({
    title: '',
    slug: '',
    short_description: '',
    image_url: '',
    project_url: null,
    status: 'soon',
    long_description: '',
    images: [],
    imagesText: ''
  })
  
  // при изменении title — пересоздаем slug
  function onEditTitle(p: { title?: string; slug?: string }) {
    if (p.title != null) {
      p.slug = slugify(p.title)
    }
  }
  
  onMounted(async () => {
    const { data, error } = await supabase
      .from<Project>('projects')
      .select('*')
      .order('id', { ascending: true })
    if (error) {
      alert('Ошибка загрузки: ' + error.message)
    } else {
      projects.value = (data || []).map(p => ({
        ...p,
        long_description: p.long_description ?? '',
        images: p.images || [],
        imagesText: (p.images || []).join('\n')
      }))
    }
    loading.value = false
  })
  
  async function updateProject(p: Project & { imagesText: string }) {
    if (!p.title || !p.slug) {
      alert('Заголовок и slug обязательны')
      return
    }
    const imagesArr = p.imagesText.split('\n').map(s => s.trim()).filter(Boolean)
    const { error } = await supabase
      .from('projects')
      .update({
        title: p.title,
        slug: p.slug,
        short_description: p.short_description,
        image_url: p.image_url,
        project_url: p.project_url,
        status: p.status,
        long_description: p.long_description,
        images: imagesArr
      })
      .eq('id', p.id)
    if (error) {
      alert('Ошибка сохранения: ' + error.message)
    } else {
      p.images = imagesArr
      alert('✅ Проект обновлён!')
    }
  }
  
  async function deleteProject(id: number) {
    if (!confirm('Удалить проект?')) return
    const { error } = await supabase.from('projects').delete().eq('id', id)
    if (error) {
      alert('Ошибка удаления: ' + error.message)
    } else {
      projects.value = projects.value.filter(p => p.id !== id)
      alert('🗑️ Проект удалён')
    }
  }
  
  async function addProject() {
    if (!newProj.title || !newProj.slug) {
      alert('Заполните title и slug')
      return
    }
    const imagesArr = newProj.imagesText.split('\n').map(s => s.trim()).filter(Boolean)
    const payload = {
      title: newProj.title,
      slug: newProj.slug,
      short_description: newProj.short_description,
      image_url: newProj.image_url,
      project_url: newProj.project_url,
      status: newProj.status,
      long_description: newProj.long_description,
      images: imagesArr
    }
    const { data, error } = await supabase
      .from<Project>('projects')
      .insert([payload])
      .select()
      .single()
    if (error) {
      alert('Ошибка создания: ' + error.message)
    } else {
      projects.value.push({ ...(data as any), imagesText: imagesArr.join('\n') })
      Object.assign(newProj, {
        title: '', slug: '', short_description: '',
        image_url: '', project_url: null, status: 'soon',
        long_description: '', imagesText: ''
      })
      alert('✨ Новый проект создан!')
    }
  }
  </script>
  
<style scoped>
  /* приглушённая гамма, как у quiz-editor */
</style>  