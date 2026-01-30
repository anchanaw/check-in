import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    display_name: '',
    username: ''
  }),

  actions: {
    setUser(user: {
      display_name: string
      username: string
    }) {
      this.display_name = user.display_name
      this.username = user.username
    },

    clearUser() {
      this.display_name = ''
      this.username = ''
    }
  },

    persist: true
})
