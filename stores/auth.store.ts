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
    setAuth(token: string, role: string) {
      this.isLoggedIn = true
      this.access_token = token
      this.role = role as any
    },

    clearAuth() {
      this.isLoggedIn = false
      this.access_token = null
      this.role = null
    }
  },

  persist: true
})
