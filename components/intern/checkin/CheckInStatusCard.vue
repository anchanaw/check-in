<template>
  <BaseCard class="card">
    <h3>Check-in Status</h3>

    <a-space>
      <span class="status-icon">
        {{ checkedIn ? '✅' : '📍' }}
      </span>

      <span class="status-text" :class="{ success: checkedIn }">
        {{ checkedIn ? 'Checked-in' : 'Not verified' }}
      </span>
    </a-space>

  </BaseCard>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useApi } from '~/composables/core'

const checkedIn = ref(false)
const loading = ref(true)
const { apiFetch } = useApi()

onMounted(async () => {
  try {
    const res = await apiFetch < {
      success: boolean
  data: {
        id: string
    checkInDate: string
    checkInTime: string
    status: string
    latitude: number
    longitude: number
      }[]
    } > ('/check-ins/me')
    
    // 🔥 ดูข้อมูลจริง
    const checkins = res?.data || []

    if (Array.isArray(checkins) && checkins.length > 0) {
      const today = new Date().toISOString().split('T')[0] // YYYY-MM-DD
      const todayRecord = checkins.find(
        (item: any) => item.checkInDate === today
      )

      checkedIn.value = !!todayRecord
    } else {
      checkedIn.value = false
    }

  } catch (err) {
    console.error(err)
    checkedIn.value = false
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.card {
  width: 100%;
}

.status-text {
  color: #ff4d4f;
  font-weight: 500;
}

.success {
  color: #52c41a;
}
</style>
