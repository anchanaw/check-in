import { useApi } from '../../api/core'

export const useCheckinApi = () => {
  const { apiFetch } = useApi()

  return {
    checkIn(data: {
      latitude: number
      longitude: number
    }) {
      return apiFetch('/api/checkin', {
        method: 'POST',
        body: data
      })
    }
  }
}
