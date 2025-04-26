<template>
    <div class="min-h-screen bg-gray-900 text-gray-100 py-10 px-4">
      <div class="max-w-5xl mx-auto space-y-8">
        <h1 class="text-3xl font-bold text-center">👥 Редактор команды</h1>
  
        <!-- Фильтр поиска по имени -->
        <div class="w-full max-w-sm mx-auto">
          <input v-model="filter" type="text" placeholder="Поиск по имени" 
                 class="w-full p-2 bg-gray-800 rounded" />
        </div>
  
        <div v-if="loading" class="text-center italic">Загрузка данных…</div>
  
        <div v-else class="space-y-6">
          <!-- Список участников -->
          <div
            v-for="m in filteredMembers"
            :key="m.id"
            class="bg-gray-800 p-6 rounded-lg shadow flex flex-col space-y-4"
          >
            <div class="flex justify-between items-center">
              <h2 class="text-xl font-semibold">Участник #{{ m.id }}</h2>
              <div class="flex space-x-2">
                <button @click="updateMember(m)" 
                        class="px-4 py-2 bg-green-600 hover:bg-green-500 rounded">Сохранить</button>
                <button @click="deleteMember(m.id)" 
                        class="px-4 py-2 bg-red-600 hover:bg-red-500 rounded">Удалить</button>
              </div>
            </div>
  
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input v-model="m.name" placeholder="Имя" 
                     class="w-full p-2 bg-gray-700 rounded" />
              <input v-model="m.position" placeholder="Должность" 
                     class="w-full p-2 bg-gray-700 rounded" />
            </div>
            <input v-model="m.photo_url" placeholder="URL фото" 
                   class="w-full p-2 bg-gray-700 rounded" />
            <textarea v-model="m.bio" rows="3" placeholder="Биография" 
                      class="w-full p-2 bg-gray-700 rounded"></textarea>
          </div>
  
          <!-- Форма добавления нового участника -->
          <div class="bg-gray-800 p-6 rounded-lg shadow space-y-4">
            <h2 class="text-xl font-semibold">➕ Новый участник</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input v-model="newMember.name" placeholder="Имя" 
                     class="w-full p-2 bg-gray-700 rounded" />
              <input v-model="newMember.position" placeholder="Должность" 
                     class="w-full p-2 bg-gray-700 rounded" />
            </div>
            <input v-model="newMember.photo_url" placeholder="URL фото" 
                   class="w-full p-2 bg-gray-700 rounded" />
            <textarea v-model="newMember.bio" rows="3" placeholder="Биография" 
                      class="w-full p-2 bg-gray-700 rounded"></textarea>
  
            <button @click="addMember" 
                    class="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded">Добавить участника</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, reactive, onMounted, computed } from 'vue'
  import { useSupabase } from '~/composables/useSupabase'
  
  interface Member {
    id: number
    name: string
    position: string
    bio: string
    photo_url: string
    created_at: string
  }
  
  const supabase = useSupabase()
  const members = ref<Member[]>([])
  const loading = ref(true)
  const filter = ref('')
  
  // Новый участник (без id и created_at)
  const newMember = reactive<Partial<Member>>({
    name: '', position: '', photo_url: '', bio: ''
  })
  
  // Загрузка списка участников из таблицы team_members
  async function loadTeam() {
    loading.value = true
    const { data } = await supabase
      .from<Member>('team_members')
      .select('id,name,position,bio,photo_url,created_at')
    if (data) members.value = data
    loading.value = false
  }
  
  // Фильтрация по имени
  const filteredMembers = computed(() =>
    members.value
      .filter(m => m.name.toLowerCase().includes(filter.value.toLowerCase()))
      .sort((a, b) => a.id - b.id)
  )
  
  // Обновление участника и перезагрузка списка
  async function updateMember(m: Member) {
    const { error } = await supabase
      .from('team_members')
      .update({ name: m.name, position: m.position, photo_url: m.photo_url, bio: m.bio })
      .eq('id', m.id)
    if (!error) {
      await loadTeam()
      alert('Участник обновлён')
    }
  }
  
  // Удаление участника и перезагрузка
  async function deleteMember(id: number) {
    if (!confirm('Удалить участника?')) return
    await supabase.from('team_members').delete().eq('id', id)
    await loadTeam()
  }
  
  // Добавление нового участника и перезагрузка
  async function addMember() {
    if (!newMember.name || !newMember.position) {
      alert('Имя и должность обязательны')
      return
    }
    const { data, error } = await supabase
      .from('team_members')
      .insert([{ name: newMember.name, position: newMember.position, photo_url: newMember.photo_url, bio: newMember.bio }])
      .select('id')
      .single()
    if (!error && data) {
      Object.assign(newMember, { name: '', position: '', photo_url: '', bio: '' })
      await loadTeam()
      alert('Участник добавлен')
    }
  }
  
  onMounted(loadTeam)
  </script>
  
  <style scoped>
  .bg-gray-800 { background-color: rgba(31,31,46,0.9) }
  </style>
  