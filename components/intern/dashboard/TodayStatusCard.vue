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

    const today = dayjs().add(7, 'hour').format('YYYY-MM-DD')

    const checkIns = checkRes.data?.checkIns || []

    const todayRecord = checkIns.find(
      (item) => item.checkInDate === today
    )

    const totalCheckInDays = Number(checkRes.data?.totalCheckInDays || 0)
    totalHours.value =
      totalCheckInDays > 0
        ? `${totalCheckInDays * 8} hrs`
        : '-'

    if (todayRecord) {
      const dateTime = dayjs(
        `${todayRecord.checkInDate} ${todayRecord.checkInTime}`
      )

      const thaiTime = dateTime.add(7, 'hour')

      checkInTime.value = thaiTime.format('HH:mm')
    } else {
      checkInTime.value = '-'
    }

    /* 🔹 3. ดึง ranking */
    const rankRes = await apiFetch('/points/ranking')

    const rankingList = rankRes.data || []

    const myIndex = rankingList.findIndex(
      (u) => String(u.internId) === String(myUserId)
    )

    if (myIndex !== -1) {
      rankToday.value = `#${myIndex + 1}`
      rankScore.value = `${rankingList[myIndex].totalPoints} pts`
    } else {
      rankToday.value = '-'
      rankScore.value = '-'
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
