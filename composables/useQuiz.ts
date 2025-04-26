import { ref } from 'vue'
import { useSupabase } from './useSupabase'

interface Question {
  id: number
  text: string
  type: 'radio' | 'checkbox'
}
interface Option {
  id: number
  question_id: number
  label: string
  weight: number
}
interface Settings {
  base_rate: number
}

export const useQuiz = () => {
  // для загрузки вопросов/опций и настроек
  const supabase = useSupabase()
  const questions = ref<Question[]>([])
  const options   = ref<Option[]>([])
  const settings  = ref<Settings>({ base_rate: 200 })
  const loading   = ref(false)

  // загрузка конфигурации quiz
  const loadQuizConfig = async () => {
    loading.value = true
    const { data: qs, error: qErr } = await supabase.from<Question>('questions').select('*')
    if (qErr) throw qErr
    questions.value = qs || []

    const { data: opts, error: oErr } = await supabase.from<Option>('options').select('*')
    if (oErr) throw oErr
    options.value = opts || []

    const { data: sett, error: sErr } = await supabase
      .from<Settings>('settings')
      .select('*')
      .limit(1)
      .single()
    if (!sErr && sett) settings.value = sett
    loading.value = false
  }

  // расчет стоимости
  const calculateCost = (answers: Record<number, number[]>): number => {
    let sum = 0
    for (const optIds of Object.values(answers)) {
      optIds.forEach(id => {
        const opt = options.value.find(o => o.id === id)
        if (opt) sum += opt.weight
      })
    }
    return sum * settings.value.base_rate
  }

  // отправка ответов на сервер
  const submitResponses = async (
    answers: Record<number, number[]>,
    contact: { name: string; email?: string; phone?: string }
  ) => {
    const cost = calculateCost(answers)
    const payload = { answers, contact, cost }

    // POST на наш API-роутинг
    const res = await fetch('/api/quiz', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    if (!res.ok) {
      const errText = await res.text()
      throw new Error(`Quiz submit failed: ${errText}`)
    }
    return await res.json()
  }

  return {
    questions,
    options,
    settings,
    loading,
    loadQuizConfig,
    calculateCost,
    submitResponses
  }
}
