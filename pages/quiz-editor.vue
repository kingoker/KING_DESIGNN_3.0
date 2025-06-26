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
            class="w-24 px-3 py-2 bg-gray-700 text-gray-100 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
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
        <!-- Вопросы -->
        <div
          v-for="q in sortedQuestions"
          :key="q.id"
          class="bg-gray-800 p-6 rounded-lg shadow"
        >
          <div class="flex justify-between items-center mb-4">
            <input
              v-model="q.text"
              class="flex-1 px-3 py-2 bg-gray-700 text-gray-100 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
              placeholder="Текст вопроса"
            />
            <label class="ml-4 inline-flex items-center cursor-pointer">
              <input type="checkbox" v-model="q.type" true-value="checkbox" false-value="radio" class="sr-only">
              <div class="relative">
                <div class="block bg-gray-600 w-14 h-8 rounded-full"></div>
                <div
                  class="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"
                  :class="{ 'translate-x-6': q.type === 'checkbox' }"
                ></div>
              </div>
              <span class="ml-3 text-sm">Checkbox</span>
            </label>
            <div class="ml-4 space-x-2">
              <button @click="updateQuestion(q)" class="px-4 py-2 bg-green-600 hover:bg-green-500 rounded text-white">Сохранить</button>
              <button @click="deleteQuestion(q.id)" class="px-4 py-2 bg-red-600 hover:bg-red-500 rounded text-white">Удалить</button>
            </div>
          </div>

          <!-- Опции -->
          <div class="mt-4 space-y-4">
            <h3 class="font-semibold">Опции:</h3>
            <div v-for="opt in optionsByQuestion[q.id]" :key="opt.id" class="grid grid-cols-12 gap-2">
              <div class="flex flex-col col-span-9 gap-2 w-full">
                <input v-model="opt.label" class="px-2 py-1 bg-gray-700 text-gray-100 rounded border border-gray-600" placeholder="Текст" />
                <textarea v-model="opt.description" class=" px-2 py-1 bg-gray-700 text-gray-400 rounded border border-gray-600 resize-none" rows="2" placeholder="Описание"></textarea>
              </div>
              <input v-model.number="opt.weight" type="number" class="col-span-1 px-2 py-1 bg-gray-700 text-gray-100 rounded border border-gray-600 text-center" placeholder="Вес" />
              <button @click="updateOption(opt)" :class="['col-span-1 px-3 py-1 rounded transition', opt._dirty ? 'bg-yellow-400 hover:bg-yellow-500' : 'bg-emerald-400 hover:bg-green-500']">✔️</button>
              <button @click="deleteOption(opt.id)" class="col-span-1 px-3 py-1 bg-rose-400 hover:bg-red-500 rounded text-white">❌</button>
            </div>
            <div class="grid grid-cols-12 gap-2">
              <div class="flex flex-col col-span-9 gap-2 w-full">
                <input v-model="newOptionLabel[q.id]" class="col-span-3 px-2 py-1 bg-gray-700 text-gray-100 rounded border border-gray-600" placeholder="Новая опция" />
                <textarea v-model="newOptionDescription[q.id]" class="col-span-5 px-2 py-1 bg-gray-700 text-gray-400 rounded border border-gray-600 resize-none" rows="2" placeholder="Описание"></textarea>
              </div>
              <input v-model.number="newOptionWeight[q.id]" type="number" class="col-span-1 px-2 py-1 bg-gray-700 text-gray-100 rounded border border-gray-600 text-center" placeholder="Вес" />
              <button @click="addOption(q.id)" class="col-span-2 px-3 py-1 bg-sky-400 hover:bg-blue-500 rounded text-white">➕</button>
            </div>
          </div>
        </div>

        <!-- Добавить вопрос -->
        <div class="bg-gray-800 p-6 rounded-lg shadow">
          <h2 class="text-lg font-semibold mb-4">➕ Добавить вопрос</h2>
          <div class="flex space-x-2 items-center">
            <input v-model="newQuestionText" class="flex-1 px-3 py-2 bg-gray-700 text-gray-100 rounded border border-gray-600" placeholder="Новый вопрос" />
            <select v-model="newQuestionType" class="w-32 px-3 py-2 bg-gray-700 text-gray-100 rounded border border-gray-600">
              <option value="radio">Radio</option>
              <option value="checkbox">Checkbox</option>
            </select>
            <button @click="addQuestion" class="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded text-white">Создать</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { useSupabase } from '~/composables/useSupabase'

interface Question {
  id: number
  text: string
  type: 'radio' | 'checkbox'
}

interface Option {
  id: number
  question_id: number
  label: string
  description?: string
  weight: number
}

interface Settings {
  id: number
  base_rate: number
}

const supabase = useSupabase()
const questions = ref<Question[]>([])
const options = ref<Option[]>([])
const settings = ref<Settings>({ id: 0, base_rate: 200 })
const loading = ref(true)

const newQuestionText = ref('')
const newQuestionType = ref<'radio' | 'checkbox'>('radio')

const newOptionLabel = reactive<Record<number, string>>({})
const newOptionDescription = reactive<Record<number, string>>({})
const newOptionWeight = reactive<Record<number, number>>({})
const dirtyOptions = reactive<Record<number, boolean>>({})

const markDirty = (id: number) => {
  dirtyOptions[id] = true
}

onMounted(async () => {
  loading.value = true
  const [qsRes, optsRes, setRes] = await Promise.all([
    supabase.from('questions').select('*').order('id'),
    supabase.from('options').select('*').order('id'),
    supabase.from('settings').select('*').limit(1).single()
  ])
  questions.value = qsRes.data || []
  options.value = optsRes.data || []
  if (setRes.data) settings.value = setRes.data
  loading.value = false
})

const sortedQuestions = computed(() => questions.value)

const optionsByQuestion = computed(() =>
  sortedQuestions.value.reduce((acc, q) => {
    acc[q.id] = options.value.filter(o => o.question_id === q.id)
    return acc
  }, {} as Record<number, Option[]>)
)

async function updateSettings() {
  if (settings.value.base_rate <= 0) return alert('Ставка должна быть больше нуля!')
  const { error } = await supabase.from('settings')
    .update({ base_rate: settings.value.base_rate })
    .eq('id', settings.value.id)
  if (!error) alert('✅ Ставка обновлена!')
}

async function addQuestion() {
  const text = newQuestionText.value.trim()
  if (!text) return alert('Введите текст вопроса!')
  const { data, error } = await supabase.from('questions')
    .insert([{ text, type: newQuestionType.value }])
    .select().single()
  if (data) {
    questions.value.push(data)
    newQuestionText.value = ''
    newQuestionType.value = 'radio'
  } else alert(error.message)
}

async function updateQuestion(q: Question) {
  const { error } = await supabase.from('questions')
    .update({ text: q.text, type: q.type })
    .eq('id', q.id)
  if (!error) alert('📝 Вопрос обновлён!')
}

async function deleteQuestion(id: number) {
  if (!confirm('Удалить вопрос?')) return
  const { error } = await supabase.from('questions').delete().eq('id', id)
  if (!error) {
    questions.value = questions.value.filter(q => q.id !== id)
    options.value = options.value.filter(o => o.question_id !== id)
  }
}

async function addOption(qid: number) {
  const label = newOptionLabel[qid]?.trim()
  const description = newOptionDescription[qid]?.trim() || ''
  const weight = newOptionWeight[qid]

  if (!label) return alert('Введите текст опции!')
  if (weight == null || weight < 0) return alert('Вес должен быть ≥ 0')

  const { data, error } = await supabase.from('options')
    .insert([{ question_id: qid, label, description, weight }])
    .select().single()
  if (data) {
    options.value.push(data)
    newOptionLabel[qid] = ''
    newOptionDescription[qid] = ''
    newOptionWeight[qid] = 0
  } else alert(error.message)
}

async function updateOption(opt: Option) {
  const { error } = await supabase.from('options')
    .update({
      label: opt.label,
      description: opt.description,
      weight: opt.weight
    }).eq('id', opt.id)
  if (!error) {
    dirtyOptions[opt.id] = false
    alert('✅ Опция обновлена!')
  }
}

async function deleteOption(id: number) {
  if (!confirm('Удалить опцию?')) return
  const { error } = await supabase.from('options').delete().eq('id', id)
  if (!error) options.value = options.value.filter(o => o.id !== id)
}
</script>


<style scoped>
.dot {
  transition: transform 0.3s ease-in-out;
}
.translate-x-6 {
  transform: translateX(1.5rem);
}
</style>