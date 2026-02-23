<template>
  <div>
    <h3 class="card-title">Today Status</h3>

    <div class="status-list">
      <div class="row">
        <span>Check-in Time :</span>
        <span>{{ checkInTime }}</span>
      </div>

      <div class="row">
        <span>Rank (Today) :</span>
        <span>{{ rankToday }}</span>
      </div>

      <div class="row">
        <span>Rank Score :</span>
        <span>{{ rankScore }}</span>
      </div>

      <div class="row">
        <span>Total Hours :</span>
        <span>{{ totalHours }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import dayjs from 'dayjs'
import { useApi } from '~/composables/core'

const { apiFetch } = useApi()

const checkInTime = ref('-')
const rankToday = ref('-')
const rankScore = ref('-')
const totalHours = ref('-')

onMounted(async () => {
  try {
    /* 🔹 1. ดึง user ปัจจุบัน */
    const meRes = await apiFetch('/auth/me')
    const myUserId = meRes.data.id

    /* 🔹 2. ดึง check-in วันนี้ */
    const checkRes = await apiFetch('/check-ins/me')

    if (checkRes.data.checkedInToday) {
      checkInTime.value = dayjs(checkRes.data.createdAt).format('HH:mm')
      totalHours.value = checkRes.data.hours ?? '-'
    } else {
      checkInTime.value = '-'
      totalHours.value = '-'
    }

    /* 🔹 3. ดึง ranking */
    const rankRes = await apiFetch('/points/ranking')

    const myIndex = rankRes.data.findIndex(
      (u) => String(u.userId) === String(myUserId)
    )

    if (myIndex !== -1) {
      rankToday.value = `#${myIndex + 1}`
      rankScore.value = `${rankRes.data[myIndex].totalPoints} pts`
    }

  } catch (err) {
    console.error('Today status error:', err)
  }
})
</script>

<style scoped>
.card-title {
  font-weight: 600;
  margin-bottom: 8px;
}

.status-list {
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  padding: 8px;
}

.row {
  display: flex;
  justify-content: space-between;
  padding: 6px 0;
  border-bottom: 1px solid #eee;
  font-size: 14px;
}

.row:last-child {
  border-bottom: none;
}
</style>
