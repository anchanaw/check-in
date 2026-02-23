import { useApi } from '~/composables/core'

export function useCheckinApi() {
  const { apiFetch } = useApi()

  const checkIn = async (payload: {
    latitude: number
    longitude: number
  }) => {
    return await apiFetch('/check-ins', {
      method: 'POST',
      body: payload
    })
  }

  return { checkIn }
}