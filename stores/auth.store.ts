// stores/auth.store.ts
import { defineStore } from 'pinia'
import type { UserRole } from '~/types/auth'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoggedIn: false,
    access_token: null as string | null,
    role: null as UserRole | null
  }),

  actions: {
    /* =============================
       Restore token on app start
    ============================= */
    initAuth() {
      if (!import.meta.client) return

      const token =
        window.localStorage.getItem('access_token') ||
        window.sessionStorage.getItem('access_token')

      const role =
        window.localStorage.getItem('role') ||
        window.sessionStorage.getItem('role')

      if (token && role) {
        this.isLoggedIn = true
        this.access_token = token
        this.role = role as UserRole
      }
    },

    /* =============================
       Save token after login
    ============================= */
    setAuth(token: string, role: string, remember: boolean) {
      this.isLoggedIn = true
      this.access_token = token
      this.role = role as UserRole

      if (!import.meta.client) return

      if (remember) {
        window.localStorage.setItem('access_token', token)
        window.localStorage.setItem('role', role)
      } else {
        window.sessionStorage.setItem('access_token', token)
        window.sessionStorage.setItem('role', role)
      }
    },

    /* =============================
       Clear token on logout
    ============================= */
    clearAuth() {
      this.isLoggedIn = false
      this.access_token = null
      this.role = null

      if (!import.meta.client) return

      window.localStorage.removeItem('access_token')
      window.localStorage.removeItem('role')
      window.sessionStorage.removeItem('access_token')
      window.sessionStorage.removeItem('role')
    }
  }
})