import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoggedIn: false,
    role: null as 'manager' | 'mentor' | 'intern' | null,
    user: null as null | {
      name: string
      email: string
      team?: string
      mentor?: string
    }
  }),

  actions: {
    // 🔧 mock login สำหรับ intern
    mockIntern() {
      this.isLoggedIn = true
      this.role = 'intern'
      this.user = {
        name: 'Mock Intern',
        email: 'intern@mock.com',
        team: 'Frontend',
        mentor: 'Anan'
      }
    },

    logout() {
      this.isLoggedIn = false
      this.role = null
      this.user = null
    }
  }
})
