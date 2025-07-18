import { ref, computed } from 'vue'

const isLoggedIn = ref(false)
const isAdmin = ref(false)

// Инициализация из localStorage
if (process.client) {
  isLoggedIn.value = localStorage.getItem('isLoggedIn') === 'true'
  isAdmin.value = localStorage.getItem('isAdmin') === 'true'
}

export function useAuth() {
  function login(admin = false) {
    isLoggedIn.value = true
    isAdmin.value = admin
    if (process.client) {
      localStorage.setItem('isLoggedIn', 'true')
      localStorage.setItem('isAdmin', admin ? 'true' : 'false')
    }
  }
  function logout() {
    isLoggedIn.value = false
    isAdmin.value = false
    if (process.client) {
      localStorage.removeItem('isLoggedIn')
      localStorage.removeItem('isAdmin')
    }
  }
  return {
    isLoggedIn: computed(() => isLoggedIn.value),
    isAdmin: computed(() => isAdmin.value),
    login,
    logout
  }
} 