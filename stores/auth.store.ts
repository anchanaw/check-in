// stores/auth.store.ts
import { defineStore } from 'pinia'

type User = {
  username: string
  role: string
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    access_token: null as string | null,
    refresh_token: null as string | null,
    user: null as User | null
  }),

  getters: {
    isLoggedIn: (state) => !!state.access_token,
    userRole: (state) => state.user?.role ?? null
  },

  actions: {
    setAuth(res: {
      access_token: string
      refresh_token: string
      user: User
    }) {
      this.access_token = res.access_token
      this.refresh_token = res.refresh_token
      this.user = res.user
    },

    clearAuth() {
      this.access_token = null
      this.refresh_token = null
      this.user = null
    }
  }
})
