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

    data.value = (res.data || [])
      .map((item, index) => {
        if (item.type === 'CHECK_IN') {
          const dateObj = dayjs(item.createdAt)

          return {
            key: index,
            date: dateObj.format('DD/MM/YYYY'),
            time: dateObj.format('HH:mm'),
            status: formatCheckinStatus(item.status)
          }
        }

        if (item.type === 'LEAVE') {
          const dateObj = dayjs(item.startDate)

          return {
            key: index,
            date: dateObj.format('DD/MM/YYYY'),
            time: '-',
            status: 'Leave'
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
  if (status === 'ON_TIME') return 'On time'
  if (status === 'LATE') return 'Late'
  return 'Unknown'
}
</script>

<style scoped>
.card-title {
  font-weight: 600;
  margin-bottom: 8px;
}
</style>
