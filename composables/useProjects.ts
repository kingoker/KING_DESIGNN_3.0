// composables/useProjects.ts
import { ref } from 'vue'
import { useSupabase } from './useSupabase'

export interface Project {
  id: number
  slug: string
  title: string
  short_description: string
  image_url: string
  project_url: string | null
  status: 'live' | 'soon'
  long_description?: string
  images?: string[]
}

export function useProjects() {
  const supabase = useSupabase()
  const projects = ref<Project[]>([])
  const loading = ref(false)
  const error = ref<string|null>(null)

  /** Загрузка списка проектов */
  async function loadProjects() {
    loading.value = true
    error.value = null
    try {
      const { data, error: sbErr } = await supabase
        .from<Project>('projects')
        .select('*')
        .order('created_at', { ascending: false })

      if (sbErr) {
        console.error('[loadProjects] Supabase error:', sbErr.message)
        error.value = sbErr.message
        projects.value = []
      } else {
        projects.value = data ?? []
      }
    } catch (e: any) {
      console.error('[loadProjects] Unexpected error:', e)
      error.value = e.message || String(e)
      projects.value = []
    } finally {
      loading.value = false
    }
  }

  /** Загрузка одного проекта по slug */
  async function loadProject(slug: string): Promise<Project|null> {
    loading.value = true
    error.value = null
    try {
      const { data, error: sbErr } = await supabase
        .from<Project>('projects')
        .select('*')
        .eq('slug', slug)
        .single()

      if (sbErr) {
        console.error(`[loadProject:${slug}] Supabase error:`, sbErr.message)
        error.value = sbErr.message
        return null
      }
      return data
    } catch (e: any) {
      console.error(`[loadProject:${slug}] Unexpected error:`, e)
      error.value = e.message || String(e)
      return null
    } finally {
      loading.value = false
    }
  }

  return { projects, loading, error, loadProjects, loadProject }
}
