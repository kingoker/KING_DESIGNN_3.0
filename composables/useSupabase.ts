// composables/useSupabase.ts
import { useNuxtApp } from '#app'
import type { SupabaseClient } from '@supabase/supabase-js'

export const useSupabase = (): SupabaseClient => {
  const nuxtApp = useNuxtApp()
  // получаем клиент, который мы предоставили в plugins/supabase.client.ts
  return nuxtApp.$supabase as SupabaseClient
}