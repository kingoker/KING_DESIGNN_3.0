<!-- pages/responses.vue -->
<template>
  <div class="min-h-screen bg-black text-white py-10 px-4">
    <div class="max-w-6xl mx-auto space-y-8">
      <!-- Заголовок и статистика -->
      <div class="text-center">
        <h1 class="text-4xl font-bold drop-shadow-[0_0_10px_rgba(0,255,209,0.8)]">
          📥 Все заявки
        </h1>
        <p class="mt-2 text-lg">
          Всего: <span class="text-cyan-400">{{ filtered.length }}</span> |
          Средняя стоимость: <span class="text-green-400">{{ avgCost }} $</span>
        </p>
      </div>

      <!-- Панель фильтров -->
      <div
        class="bg-gray-900/80 p-6 rounded-lg shadow-lg grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <!-- Поиск по имени/email -->
        <input
          v-model="filters.query"
          type="text"
          placeholder="🔍 Поиск по имени или email"
          class="w-full px-4 py-2 bg-black/50 rounded-md focus:ring-2 focus:ring-cyan-400"
        />

        <!-- Даты -->
        <div class="flex space-x-2">
          <input
            v-model="filters.from"
            type="date"
            class="w-1/2 px-4 py-2 bg-black/50 rounded-md focus:ring-2 focus:ring-cyan-400"
          />
          <input
            v-model="filters.to"
            type="date"
            class="w-1/2 px-4 py-2 bg-black/50 rounded-md focus:ring-2 focus:ring-cyan-400"
          />
        </div>

        <!-- Стоимость -->
        <div class="flex space-x-2">
          <input
            v-model.number="filters.minCost"
            type="number"
            placeholder="Мин $"
            class="w-1/2 px-4 py-2 bg-black/50 rounded-md focus:ring-2 focus:ring-cyan-400"
          />
          <input
            v-model.number="filters.maxCost"
            type="number"
            placeholder="Макс $"
            class="w-1/2 px-4 py-2 bg-black/50 rounded-md focus:ring-2 focus:ring-cyan-400"
          />
        </div>
      </div>

      <!-- Список заявок -->
      <div v-if="loading" class="text-center italic">Загрузка заявок…</div>
      <div v-else class="space-y-6">
        <div
          v-for="r in filtered"
          :key="r.id"
          class="bg-gray-900/80 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
        >
          <!-- Шапка карточки -->
          <div class="flex justify-between items-center mb-4">
            <div class="flex items-center space-x-4">
              <span class="text-xl font-semibold">#{{ r.id }}</span>
              <span class="px-3 py-1 bg-cyan-600 rounded text-sm font-medium">
                {{ formatDate(r.created_at) }}
              </span>
            </div>
            <span class="text-xl font-bold text-green-400">
              ${{ r.cost }}
            </span>
          </div>

          <!-- Контакты -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <h2 class="font-semibold mb-1">👤 Имя</h2>
              <p>{{ r.name || '—' }}</p>
            </div>
            <div>
              <h2 class="font-semibold mb-1">📧 Email</h2>
              <p>{{ r.email || '—' }}</p>
            </div>
            <div>
              <h2 class="font-semibold mb-1">📞 Телефон</h2>
              <p>{{ r.phone || '—' }}</p>
            </div>
          </div>

          <!-- Ответы -->
          <div>
            <h2 class="font-semibold mb-2">📝 Ответы:</h2>
            <div class="space-y-4">
              <div
                v-for="(optIds, qid) in r.answers"
                :key="qid"
                class="space-y-1"
              >
                <p class="font-medium">{{ questionsMap[qid].text }}</p>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="id in optIds"
                    :key="id"
                    class="px-2 py-1 bg-gray-800 rounded text-sm tracking-wide"
                  >
                    {{ optionsMap[id] }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Если после фильтра ничего не найдено -->
        <div v-if="!filtered.length && !loading" class="text-center text-gray-500">
          Ничего не найдено по заданным фильтрам.
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue'
import { useSupabase } from '~/composables/useSupabase'

interface ResponseRow {
  id: number
  name: string | null
  email: string | null
  phone: string | null
  answers: Record<number, number[]>
  cost: number
  created_at: string
}
interface Question { id: number; text: string }
interface Option { id: number; label: string }

const supabase = useSupabase()

const responses = ref<ResponseRow[]>([])
const questions = ref<Question[]>([])
const options = ref<Option[]>([])
const loading = ref(true)

// фильтры
const filters = reactive({
  query: '',
  from: '',
  to: '',
  minCost: null as number|null,
  maxCost: null as number|null,
})

onMounted(async () => {
  // загрузка вопросов/опций
  const [{ data: qs }, { data: opts }] = await Promise.all([
    supabase.from<Question>('questions').select('id, text'),
    supabase.from<Option>('options').select('id, label'),
  ])
  questions.value = qs || []
  options.value = opts || []

  // загрузка заявок
  const { data: rows, error } = await supabase
    .from<ResponseRow>('responses')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error(error)
    alert('Не удалось загрузить заявки.')
  } else {
    responses.value = rows || []
  }
  loading.value = false
})

const questionsMap = computed(() =>
  Object.fromEntries(questions.value.map(q => [q.id, q]))
)
const optionsMap = computed(() =>
  Object.fromEntries(options.value.map(o => [o.id, o.label]))
)

// отфильтрованные заявки
const filtered = computed(() => {
  return responses.value.filter(r => {
    const q = filters.query.toLowerCase()
    // поиск по имени или email
    if (q && !((r.name||'').toLowerCase().includes(q) || (r.email||'').toLowerCase().includes(q)))
      return false

    // по дате
    const date = new Date(r.created_at).toISOString().slice(0,10)
    if (filters.from && date < filters.from) return false
    if (filters.to   && date > filters.to)   return false

    // по стоимости
    if (filters.minCost != null && r.cost < filters.minCost) return false
    if (filters.maxCost != null && r.cost > filters.maxCost) return false

    return true
  })
})

// статистика
const avgCost = computed(() => {
  if (!filtered.value.length) return 0
  const sum = filtered.value.reduce((s,r) => s + r.cost, 0)
  return Math.round(sum / filtered.value.length)
})

function formatDate(dt: string) {
  return new Date(dt).toLocaleString()
}
</script>

<style scoped>
h2 { color: #00ffd1; }
</style>
