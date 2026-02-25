import { defu } from 'defu'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import { useAuthStore } from '~/stores/auth.store'

dayjs.extend(utc)
dayjs.extend(timezone)

export function useApiFetch(url, options = {}) {
    const config = useRuntimeConfig()
    const auth = useAuthStore()

    const defaults = {
        baseURL:config.public.apiBase,
        key: url,
        server: false,
        onRequest({ options }) {
            if (auth.access_token) {
                options.headers = {
                    ...options.headers,
                    Authorization: 'Bearer ' + auth.access_token,
                }
            }
        },

        async onResponseError({ response }) {
            if (response.status === 401) {
                console.log('token failed')
            } else if (response.status === 500) {
                console.log('system error!')
            } else {
                console.log('error!', response)
            }
        },
    }

    const params = defu(options, defaults)

    return $fetch(url, {
        ...params,
    })
}