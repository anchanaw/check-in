<template>
  <a-layout class="page">
    <!-- Back button (อยู่นอกการ์ด) -->
    <div class="top-back">
      <BackButton />
    </div>

    <!-- Centered content -->
    <div class="center-wrapper">
      <BaseCard class="outer-card">
        <!-- Header (ไม่มีลูกศรแล้ว) -->
        <div class="header">
          <div class="name">
            {{ intern.name }}
          </div>
        </div>

        <!-- Content -->
        <a-space direction="vertical" :size="14" style="width:100%">
          <InternSummaryCard :data="intern" :loading="loading" />
          <GiveBonusCard @updated="() => loadIntern(route.params.id as string)" />
          <BonusHistoryCard :items="bonusHistory" :internId="route.params.id as string" />
          <LeaveHistoryCard :items="leaveHistory" />
        </a-space>
      </BaseCard>
    </div>

    <MentorBottomBar active="team" />
  </a-layout>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useApi } from '~/composables/core'
import dayjs from 'dayjs'

import InternSummaryCard from '@/components/mentor/myintern/InternSummaryCard.vue'
import GiveBonusCard from '@/components/mentor/myintern/GiveBonusCard.vue'
import BonusHistoryCard from '@/components/mentor/myintern/BonusHistoryCard.vue'
import LeaveHistoryCard from '@/components/mentor/myintern/LeaveHistoryCard.vue'
import MentorBottomBar from '@/components/mentor/MentorBottomBar.vue'
import BackButton from '@/components/base/BackButton.vue'

const { apiFetch } = useApi()
const route = useRoute()

const loading = ref(false)

const intern = ref({
  name: '',
  checkedIn: false,
  checkinTime: '',
  rank: '',
  totalPoints: 0,
  avgTime: '-'
})

const bonusHistory = ref<any[]>([])
const leaveHistory = ref<any[]>([])

const loadIntern = async (internId: string) => {
  if (!internId || internId === 'undefined') {
    console.error('❌ Invalid internId:', internId)
    return
  }

  loading.value = true

  try {
    /* =========================
       1️⃣ ดึงข้อมูล intern
    ========================= */
    const internRes = await apiFetch('/users/interns') as { data: any[] }

    const user = internRes.data.find(
      i => String(i.id) === String(internId)
    )

    /* =========================
     2️⃣ ดึงคะแนนจาก ranking
  ========================= */
    const rankingRes = await apiFetch(
      '/points/ranking'
    ) as { data: any[] }

    const rankingList = rankingRes.data || []

    const myRankIndex = rankingList.findIndex(
      (r: any) => String(r.internId) === String(internId)
    )

    const rank =
      myRankIndex >= 0 ? `#${myRankIndex + 1}` : '-'

    const totalPoints =
      myRankIndex >= 0
        ? Number(rankingList[myRankIndex].totalPoints)
        : 0
    /* =========================
       4️⃣ ดึง check-ins จริง
    ========================= */
    const checkRes = await apiFetch(
      `/users/interns/${internId}/check-ins`
    ) as { data: any[] }

    const records = checkRes.data || []

    const today = dayjs().add(7, 'hour').format('YYYY-MM-DD')

    const todayRecord = records.find(
      (item: any) =>
        item.checkInDate === today
    )

    let checkinTime = ''
    let avgTime = '-'

    if (todayRecord) {
      checkinTime = dayjs(
        `${todayRecord.checkInDate} ${todayRecord.checkInTime}`
      )
        .add(7, 'hour')
        .format('HH:mm')
    }

    // 🔥 คำนวณ average check-in time
    if (records.length > 0) {
      const minutes = records.map((r: any) => {
        const adjusted = dayjs(
          `${r.checkInDate} ${r.checkInTime}`
        ).add(7, 'hour')

        return adjusted.hour() * 60 + adjusted.minute()
      })

      const avg =
        minutes.reduce((a, b) => a + b, 0) /
        minutes.length

      const avgHour = Math.floor(avg / 60)
      const avgMin = Math.round(avg % 60)

      avgTime =
        `${String(avgHour).padStart(2, '0')}:` +
        `${String(avgMin).padStart(2, '0')}`
    }

    /* =========================
       5️⃣ SET DATA
    ========================= */
    intern.value = {
      name: user
        ? `${user.firstName} ${user.lastName}`
        : 'Unknown',
      checkedIn: !!todayRecord,
      checkinTime,
      rank,
      totalPoints: Number(totalPoints),
      avgTime
    }

  } catch (err) {
    console.error('Intern detail error:', err)
  } finally {
    loading.value = false
  }

  const pointRes = await apiFetch(
  `/users/interns/${internId}/points`
) as any

const history = pointRes.data || []

// 🔥 เรียงใหม่สุดก่อน
history.sort(
  (a: any, b: any) =>
    new Date(b.createdAt).getTime() -
    new Date(a.createdAt).getTime()
)

// 🔥 ส่งแค่ 3 อันไป card
bonusHistory.value = history.slice(0, 3).map((item: any) => ({
  id: item.id,
  point: item.points,
  reason: item.reason || item.eventType,
  date: item.createdAt
}))

const attendanceRes = await apiFetch(
  `/users/interns/${internId}/attendance`
) as any

const attendance = attendanceRes.data || []

// 🔥 เอาเฉพาะ leave
const leaves = attendance.filter(
  (item: any) => item.type === 'leave'
)

// 🔥 เรียงใหม่สุดก่อน
leaves.sort(
  (a: any, b: any) =>
    new Date(b.date).getTime() -
    new Date(a.date).getTime()
)

// 🔥 เอาแค่ 3 อัน
leaveHistory.value = leaves.slice(0, 3).map((item: any) => ({
  id: item.id,
  date: item.date,
  status: item.status,
  reason: item.reason || '-'
}))
}

watch(
  () => route.params.id,
  (id) => {
    if (typeof id === 'string') {
      loadIntern(id)
    }
  },
  { immediate: true }
)
</script>

<style scoped>
.page {
  min-height: 100vh;
  padding: 12px 12px 80px;
  background: #6ec1ff;
}

/* ปุ่ม back ด้านบน */
.top-back {
  margin-bottom: 8px;
}

/* จัดกลาง */
.center-wrapper {
  display: flex;
  justify-content: center;
}

/* กรอบขาวใหญ่ */
.outer-card {
  width: 100%;
  max-width: 360px;
}

/* Header ในการ์ด */
.header {
  text-align: start;
  margin-bottom: 5px;
}

.name {
  font-size: 24px;
  font-weight: 600;
  display: inline-block;
  padding-bottom: 4px;
}
</style>
