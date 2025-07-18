import { defineNuxtRouteMiddleware, navigateTo } from '#imports'
import { useAuth } from '~/composables/useAuth'

export default defineNuxtRouteMiddleware((to, from) => {
  const { isLoggedIn } = useAuth()
  if (!isLoggedIn.value) {
    return navigateTo('/login')
  }
}) 