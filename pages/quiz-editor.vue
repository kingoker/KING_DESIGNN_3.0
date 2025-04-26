```vue
<!-- pages/quiz-editor.vue -->
<template>
  <div class="min-h-screen bg-gray-900 text-gray-100 py-10 px-4">
    <div class="max-w-4xl mx-auto space-y-8">
      <!-- Редактирование базовой ставки -->
      <div class="bg-gray-800 p-4 rounded-lg shadow">
        <h2 class="text-lg font-semibold mb-2">⚙️ Базовая ставка (за единицу веса):</h2>
        <div class="flex items-center space-x-2">
          <input
            v-model.number="settings.base_rate"
            type="number"
            class="w-32 px-3 py-2 bg-gray-700 text-gray-100 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
          <button
            @click="updateSettings"
            class="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded text-white transition"
          >Сохранить</button>
        </div>
      </div>

      <h1 class="text-3xl font-bold text-center">✏️ Редактор квиза</h1>

      <div v-if="loading" class="text-center italic">Загрузка данных…</div>
      <div v-else class="space-y-6">
        <!-- Список вопросов по порядку -->
        <div
          v-for="q in sortedQuestions"
          :key="q.id"
          class="bg-gray-800 p-6 rounded-lg shadow"
        >
          <div class="flex justify-between items-start mb-4">
            <div class="flex-1 space-y-2">
              <input
                v-model="q.text"
                class="w-full px-3 py-2 bg-gray-700 text-gray-100 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
                placeholder="Текст вопроса"
              />
              <select
                v-model="q.type"
                class="w-32 px-3 py-2 bg-gray-700 text-gray-100 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                <option value="radio">Radio</option>
                <option value="checkbox">Checkbox</option>
              </select>
            </div>
            <div class="flex flex-col space-y-2 ml-4">
              <button
                @click="updateQuestion(q)"
                class="px-4 py-2 bg-green-600 hover:bg-green-500 rounded text-white transition"
              >Сохранить</button>
              <button
                @click="deleteQuestion(q.id)"
                class="px-4 py-2 bg-red-600 hover:bg-red-500 rounded text-white transition"
              >Удалить</button>
            </div>
          </div>

          <!-- Опции вопроса -->
          <div class="mt-4 space-y-4">
            <h3 class="font-semibold">Опции:</h3>
            <div v-for="opt in optionsByQuestion[q.id]" :key="opt.id" class="flex items-center space-x-2">
              <input
                v-model="opt.label"
                class="flex-1 px-2 py-1 bg-gray-700 text-gray-100 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
                placeholder="Текст опции"
              />
              <input
                v-model.number="opt.weight"
                type="number"
                class="w-20 px-2 py-1 bg-gray-700 text-gray-100 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
                placeholder="Вес"
              />
              <button @click="updateOption(opt)" class="px-3 py-1 bg-emerald-400 hover:bg-green-500 rounded text-white transition">✔️</button>
              <button @click="deleteOption(opt.id)" class="px-3 py-1 bg-rose-400 hover:bg-red-500 rounded text-white transition">❌</button>
            </div>
            <div class="flex items-center space-x-2">
              <input
                v-model="newOptionLabel[q.id]"
                class="flex-1 px-2 py-1 bg-gray-700 text-gray-100 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
                placeholder="Новая опция"
              />
              <input
                v-model.number="newOptionWeight[q.id]"
                type="number"
                class="w-20 px-2 py-1 bg-gray-700 text-gray-100 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
                placeholder="Вес"
              />
              <button @click="addOption(q.id)" class="px-3 py-1 bg-sky-400 hover:bg-blue-500 rounded text-white transition">➕</button>
            </div>
          </div>
        </div>

        <!-- Добавить новый вопрос -->
        <div class="bg-gray-800 p-6 rounded-lg shadow">
          <h2 class="text-lg font-semibold mb-4">➕ Добавить вопрос</h2>
          <div class="flex space-x-2 items-center">
            <input
              v-model="newQuestionText"
              class="flex-1 px-3 py-2 bg-gray-700 text-gray-100 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
              placeholder="Текст нового вопроса"
            />
            <select
              v-model="newQuestionType"
              class="w-32 px-3 py-2 bg-gray-700 text-gray-100 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              <option value="radio">Radio</option>
              <option value="checkbox">Checkbox</option>
            </select>
            <button @click="addQuestion" class="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded text-white transition">Создать</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { useSupabase } from '~/composables/useSupabase'

interface Question { id: number; text: string; type: string }
interface Option { id: number; question_id: number; label: string; weight: number }
interface Settings { id: number; base_rate: number }

const supabase = useSupabase()
const questions = ref<Question[]>([])
const options = ref<Option[]>([])
const loading = ref(true)
const settings = ref<Settings>({ id: 0, base_rate: 200 })

// new question
const newQuestionText = ref('')
const newQuestionType = ref<'radio' | 'checkbox'>('radio')
// new options per question
const newOptionLabel = reactive<Record<number,string>>({})
const newOptionWeight = reactive<Record<number,number>>({})

onMounted(async () => {
  loading.value = true
  const [qsRes, optsRes, setRes] = await Promise.all([
    supabase.from<Question>('questions').select('*').order('id', { ascending: true }),
    supabase.from<Option>('options').select('*').order('id', { ascending: true }),
    supabase.from<Settings>('settings').select('*').limit(1).single()
  ])
  questions.value = qsRes.data || []
  options.value = optsRes.data || []
  if (!setRes.error && setRes.data) settings.value = setRes.data
  loading.value = false
})

// Сортируем вопросы по id (порядок гарантирован)
const sortedQuestions = computed(() => questions.value)

// Группировка опций
const optionsByQuestion = computed(() =>
  sortedQuestions.value.reduce((acc, q) => {
    acc[q.id] = options.value.filter(o => o.question_id === q.id)
    return acc
  }, {} as Record<number, Option[]>)
)

// Settings CRUD
async function updateSettings() {
  if (settings.value.base_rate <= 0) {
    alert('Ставка должна быть больше нуля!')
    return
  }
  const { error } = await supabase.from('settings')
    .update({ base_rate: settings.value.base_rate })
    .eq('id', settings.value.id)
  if (!error) alert(`🎉 Базовая ставка обновлена: $${settings.value.base_rate}!`)
  else alert('Ошибка обновления ставки.')
}

// Question CRUD
async function addQuestion() {
  if (!newQuestionText.value.trim()) {
    alert('Введите текст вопроса!')
    return
  }
  if (!newQuestionType.value) {
    alert('Выберите тип вопроса!')
    return
  }
  const { data, error } = await supabase.from('questions')
    .insert([{ text: newQuestionText.value, type: newQuestionType.value }])
    .select().single()
  if (error) {
    alert(`Ошибка при добавлении вопроса: ${error.message}`)
    return
  }
  questions.value.push(data)
  alert('✨ Новый вопрос создан!')
  newQuestionText.value = ''
  newQuestionType.value = 'radio'
}

async function updateQuestion(q: Question) {
  if (!q.text.trim()) {
    alert('Текст вопроса не может быть пустым!')
    return
  }
  const { error } = await supabase.from('questions')
    .update({ text: q.text, type: q.type })
    .eq('id', q.id)
  if (!error) alert('✏️ Вопрос обновлён!')
  else alert('Ошибка при обновлении вопроса.')
}

async function deleteQuestion(id: number) {
  const confirmed = confirm('Удалить вопрос навсегда?')
  if (!confirmed) return
  const { error } = await supabase.from('questions').delete().eq('id', id)
  if (!error) {
    questions.value = questions.value.filter(q => q.id !== id)
    options.value = options.value.filter(o => o.question_id !== id)
    alert('🗑️ Вопрос удалён!')
  } else alert('Ошибка при удалении вопроса.')
}

// Option CRUD
async function addOption(qid: number) {
  const label = newOptionLabel[qid]?.trim()
  const weight = newOptionWeight[qid]
  if (!label) {
    alert('Введите текст опции!')
    return
  }
  if (weight == null || weight < 0) {
    alert('Вес должен быть >= 0!')
    return
  }
  const { data, error } = await supabase.from('options')
    .insert([{ question_id: qid, label, weight }])
    .select().single()
  if (error) {
    alert(`Ошибка при добавлении опции: ${error.message}`)
    return
  }
  options.value.push(data)
  alert('➕ Опция добавлена!')
  newOptionLabel[qid] = ''
  newOptionWeight[qid] = 0
}

async function updateOption(o: Option) {
  if (!o.label.trim()) {
    alert('Текст опции не может быть пустым!')
    return
  }
  if (o.weight < 0) {
    alert('Вес должен быть >= 0!')
    return
  }
  const { error } = await supabase.from('options')
    .update({ label: o.label, weight: o.weight })
    .eq('id', o.id)
  if (!error) alert('✅ Опция обновлена!')
  else alert('Ошибка при обновлении опции.')
}

async function deleteOption(id: number) {
  const confirmed = confirm('Удалить опцию навсегда?')
  if (!confirmed) return
  const { error } = await supabase.from('options').delete().eq('id', id)
  if (!error) {
    options.value = options.value.filter(o => o.id !== id)
    alert('❌ Опция удалена!')
  } else alert('Ошибка при удалении опции.')
}
</script>

<style scoped>
/* Цветовая гамма приглушена — серые и синие тона вместо кислотных */
</style>
```
