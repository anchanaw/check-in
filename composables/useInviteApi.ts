import { useApi } from './core'
import { mockInviteResponse } from './invite.mock'
const USE_MOCK = import.meta.env.DEV

export const useInviteApi = () => {
  const { apiFetch } = useApi()

  return {
    async validate(inviteCode: string) {
      // 🟡 mock ตอน dev
      if (USE_MOCK) {
        return mockInviteResponse('register')
        // เปลี่ยนค่าเพื่อเทส flow:
        // 'team_change' | 'intern' | 'invalid'
      }

      // 🔴 เรียก backend จริง
      return apiFetch(`/api/invites/${inviteCode}`)
    }
  }
}
