import { ref } from 'vue'
import { useSupabase } from '~/composables/useSupabase'

type TeamMember = {
id: number
name: string
position: string
bio: string
photo_url: string
created_at: string
}

export function useTeam() {
const members = ref<TeamMember[]>([])
const loading = ref(false)

async function loadTeam() {
loading.value = true
const supabase = useSupabase()
const { data, error } = await supabase
.from('team_members')
.select('id,name,position,bio,photo_url,created_at')
.order('id', { ascending: true })

if (error) {
  console.error('Ошибка загрузки команды:', error.message)
  members.value = []
} else {
  members.value = data || []
}

loading.value = false

}

return {
members,
loading,
loadTeam
}
}

