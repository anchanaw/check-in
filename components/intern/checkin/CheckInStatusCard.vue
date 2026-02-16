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

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const checkedIn = ref(false)
const loading = ref(true)

onMounted(async () => {
  try {
    const res = await axios.get('/check-ins/me')

    // 🔥 สมมติ backend ส่งแบบนี้:
    // { checkedInToday: true }

    checkedIn.value = res.data.checkedInToday

  } catch (err) {
    console.error(err)
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
