// stores/auth.store.ts
import { defineStore } from 'pinia'
import { jwtDecode } from 'jwt-decode'
import type { UserRole } from '~/types/auth'

interface JwtPayload {
  role: UserRole
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoggedIn: false,
    access_token: null as string | null,
    role: null as UserRole | null
  }),

  actions: {
    setAuth(token: string, role: string, remember: boolean) {
      this.isLoggedIn = true
      this.access_token = token
      this.role = role as any

      if (remember) {
        localStorage.setItem('access_token', token)
        localStorage.setItem('role', role)
      } else {
        sessionStorage.setItem('access_token', token)
        sessionStorage.setItem('role', role)
      }
    },

    clearAuth() {
      this.isLoggedIn = false
      this.access_token = null
      this.role = null

      localStorage.removeItem('access_token')
      localStorage.removeItem('role')
      sessionStorage.removeItem('access_token')
      sessionStorage.removeItem('role')
    }
  }
})
