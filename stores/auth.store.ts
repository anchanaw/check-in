// stores/auth.store.ts
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    access_token: null as string | null,
    refresh_token: null as string | null
  }),

  actions: {
    setTokens(tokens: { access_token: string; refresh_token: string }) {
      this.access_token = tokens.access_token
      this.refresh_token = tokens.refresh_token
    },

    clearTokens() {
      this.access_token = null
      this.refresh_token = null
    }
  }
})
