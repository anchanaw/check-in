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
          <BonusHistoryCard :items="bonusHistory" />
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
    // 1️⃣ ดึงข้อมูล intern
    const internRes = await apiFetch('/users/interns') as { data: any[] }
    const user = internRes.data.find(
      i => String(i.id) === String(internId)
    )

    // 2️⃣ ดึงคะแนน
    const pointRes = await apiFetch(`/users/interns/${internId}/points`) as { data: { totalPoints: number; history: any[] } }
    const totalPoints = pointRes.data?.totalPoints || 0
    bonusHistory.value = pointRes.data?.history || []

    // 3️⃣ ดึง ranking
    const rankingRes = await apiFetch('/points/ranking') as { data: any[] }
    const rankingIndex = rankingRes.data.findIndex(
      (r: any) => String(r.userId) === String(internId)
    )
    const rank = rankingIndex >= 0 ? `#${rankingIndex + 1}` : '-'

    // 4️⃣ ดึง attendance
    const attendanceRes = await apiFetch(`/users/interns/${internId}/attendance`) as { data: { todayCheckIn?: any; averageCheckInTime?: string; leaves?: any[] } }
    const attendance = attendanceRes.data

    const todayCheckIn = attendance?.todayCheckIn
    const avgTime = attendance?.averageCheckInTime || '-'

    intern.value = {
      name: user ? `${user.firstName} ${user.lastName}` : 'Unknown',
      checkedIn: !!todayCheckIn,
      checkinTime: todayCheckIn?.time || '',
      rank,
      totalPoints,
      avgTime
    }

    leaveHistory.value = attendance?.leaves || []

  } catch (err) {
    console.error('Intern detail error:', err)
  } finally {
    loading.value = false
  }
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
