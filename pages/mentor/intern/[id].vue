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
          <GiveBonusCard />
          <BonusHistoryCard :items="bonusHistory" />
          <LeaveHistoryCard :items="leaveHistory" />
        </a-space>
      </BaseCard>
    </div>

    <MentorBottomBar active="team" />
  </a-layout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import InternSummaryCard from '@/components/mentor/myintern/InternSummaryCard.vue'
import GiveBonusCard from '@/components/mentor/myintern/GiveBonusCard.vue'
import BonusHistoryCard from '@/components/mentor/myintern/BonusHistoryCard.vue'
import LeaveHistoryCard from '@/components/mentor/myintern/LeaveHistoryCard.vue'
import MentorBottomBar from '@/components/mentor/MentorBottomBar.vue'
import BackButton from '@/components/base/BackButton.vue'


const route = useRoute()
const router = useRouter()

const loading = ref(true)

const intern = ref({
  name: '',
  checkedIn: true,
  checkinTime: '',
  rank: '',
  totalPoints: 0,
  avgTime: ''
})

const bonusHistory = ref([])
const leaveHistory = ref([])

onMounted(async () => {
  loading.value = true
  await new Promise(r => setTimeout(r, 700)) // mock

  intern.value = {
    name: 'Sompong',
    checkedIn: true,
    checkinTime: '09.00 AM',
    rank: '#1',
    totalPoints: 250,
    avgTime: '09.02 AM'
  }

  bonusHistory.value = [
    { id: 1, reason: 'Good performance', date: '15 Jan', point: +1 },
    { id: 2, reason: 'Help team', date: '19 Jan', point: +1 }
  ]

  leaveHistory.value = [
    { id: 1, reason: 'Sick Leave', date: '10 Jan', status: 'approved' },
    { id: 2, reason: 'Personal Matter', date: '22 Jan', status: 'pending' }
  ]

  loading.value = false
})

const goBack = () => router.back()
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
