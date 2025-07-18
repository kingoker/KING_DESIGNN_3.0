import { defineNuxtRouteMiddleware, navigateTo } from '#imports'
import { useAuth } from '~/composables/useAuth'

export default defineNuxtRouteMiddleware((to, from) => {
  const { isAdmin } = useAuth()
  if (!isAdmin.value) {
    return navigateTo('/forbidden')
  }
}) 