import { defineNuxtPlugin, useRuntimeConfig } from '#app'
import { createClient, SupabaseClient } from '@supabase/supabase-js'

export default defineNuxtPlugin((nuxtApp) => {
    const config = useRuntimeConfig().public
    const supabase: SupabaseClient = createClient(
        config.supabaseUrl,
        config.supabaseKey
    )
    // Делаем доступным через provide/inject
    nuxtApp.provide('supabase', supabase)
})
