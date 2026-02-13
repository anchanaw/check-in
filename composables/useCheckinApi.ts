export const useCheckinApi = () => {
  const { apiFetch } = useApi()

  const checkIn = async (data: {
    latitude: number
    longitude: number
  }) => {
    return await apiFetch('/check-ins', {
      method: 'POST',
      body: data
    })
  }

  return { checkIn }
}
