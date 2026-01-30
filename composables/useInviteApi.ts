import { useApi } from './core'

export const useInviteApi = () => {
  const { apiFetch } = useApi()

  return {
    validate(invite_code: string) {
      return apiFetch(`/api/invites/${invite_code}`)
    }
  }
}
