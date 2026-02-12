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

  const internId = route.params.id
  console.log('Intern ID:', internId)

  await new Promise(r => setTimeout(r, 500)) // mock delay

  // 🔥 mock data ตาม id
  const mockData = {
    1: {
      name: 'Sompong',
      checkedIn: true,
      checkinTime: '09.00 AM',
      rank: '#1',
      totalPoints: 250,
      avgTime: '09.02 AM'
    },
    2: {
      name: 'Anon',
      checkedIn: false,
      checkinTime: '',
      rank: '#3',
      totalPoints: 180,
      avgTime: '-'
    }
  }

  intern.value = mockData[internId] || {
    name: 'Unknown',
    checkedIn: false,
    checkinTime: '',
    rank: '-',
    totalPoints: 0,
    avgTime: '-'
  }

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
