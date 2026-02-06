// stores/auth.store.ts
import { defineStore } from 'pinia'
import type { UserRole } from '~/types/auth'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoggedIn: false,
    access_token: null as string | null,
    refresh_token: null as string | null,
    role: null as UserRole | null
  }),

  actions: {
    setAuth(payload: { access_token: string; refresh_token: string; role: UserRole }) {
      this.isLoggedIn = true
      this.access_token = payload.access_token
      this.refresh_token = payload.refresh_token
      this.role = payload.role
    },

    clearAuth() {
      this.isLoggedIn = false
      this.access_token = null
      this.refresh_token = null
      this.role = null
    }
  },

  persist: true
})
