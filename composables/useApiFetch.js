import { defu } from 'defu'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import { useAuthStore } from '~/stores/authentication'

dayjs.extend(utc)
dayjs.extend(timezone)

export function useApiFetch (url, options = {}) {
    const config = useRuntimeConfig()
    const auth = useAuthStore()

    const defaults = {
        baseURL: config.public.apiBaseUrl + '/api',
        key: url,
        server: false,
        onRequest({ options }) {
            if (auth.accessToken) {
                options.headers = {
                    ...options.headers,
                    'Authorization': 'Bearer ' + auth.accessToken,
                    'Timezone': dayjs.tz.guess(),
                }
            }
        },

        async onResponseError({ response }) {
            if (response.status === 401) {
                systemErrorStore().setOpenState(true)
                console.log('token failed');
                // useLoadingStore().endLoad()
                usePathStore().setVin('')
            }
            // if (response.status === 400) {
            //     // systemErrorStore().setOpenState(true)
            //     // useLoadingStore().endLoad()
            //     // console.log('connection timed out!');
            // }
            else if (response.status === 500) {
                serverErrorStore().setOpenState(true)
                // useLoadingStore().endLoad()
                console.log('system error!');
            }
            else {
                console.log('error!', response);
            }
        },
    }

    const params = defu(options, defaults)

    return $fetch(url, {
        ...params,
    })
    // return useFetch(url, params)
}