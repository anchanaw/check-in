<template>
  <div>
    <h3 class="card-title">Check-in History</h3>

    <a-table :columns="columns" :data-source="data" :loading="loading" size="small" bordered :pagination="false" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import dayjs from 'dayjs'
import { useApi } from '~/composables/core'

const { apiFetch } = useApi()

const columns = [
  { title: 'Date', dataIndex: 'date' },
  { title: 'Time', dataIndex: 'time' },
  { title: 'Status', dataIndex: 'status' }
]

const data = ref([])
const loading = ref(false)

onMounted(async () => {
  try {
    loading.value = true

    const res = await apiFetch('/check-ins/attendance')

    data.value = (res.data?.events || [])
      .map((item, index) => {

        // check_in )
        if (item.type === 'check_in') {

          const dateObj = dayjs(item.date)

          const rawTime = item.details?.replace('Time: ', '') || null

          let formattedTime = '-'

          if (rawTime) {
            const dateTime = dayjs(`${item.date} ${rawTime}`).add(7, 'hour')
            formattedTime = dateTime.format('HH:mm')
          }
          return {
            key: index,
            date: dateObj.format('DD/MM/YYYY'),
            time: formattedTime,
            status: formatCheckinStatus(item.status)
          }
        }

        return null
      })
      .filter(Boolean)

  } catch (err) {
    console.error('Attendance error:', err)
  } finally {
    loading.value = false
  }
})

const formatCheckinStatus = (status) => {
  if (status === 'on_time') return 'On time'
  if (status === 'late') return 'Late'
  return status || 'Unknown'
}
</script>

<style scoped>
.card-title {
  font-weight: 600;
  margin-bottom: 8px;
}
</style>
