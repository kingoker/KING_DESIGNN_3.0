import { ref } from 'vue'
import { useSupabase } from '~/composables/useSupabase'

export type HistoryItem = {
  id: number
  year: string
  event: string
  image_url: string
  created_at: string
}

export function useHistory() {
  const history = ref<HistoryItem[]>([])
  const loading = ref(false)

  async function loadHistory() {
    loading.value = true
    const supabase = useSupabase()
    const { data, error } = await supabase
      .from('history')
      .select('id,year,event,image_url,created_at')
      .order('year', { ascending: true })

    if (error) {
      console.error('Ошибка загрузки истории:', error.message)
      history.value = []
    } else {
      history.value = data || []
    }
    loading.value = false
  }

  return {
    history,
    loading,
    loadHistory
  }
} 