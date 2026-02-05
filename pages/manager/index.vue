<template>
  <div class="dashboard-page">
    <!-- 🔔 notification -->
    <div class="top-right">
      <a-badge :dot="hasNotification">
        <BellOutlined class="bell-icon" @click="onClickBell" />
      </a-badge>
    </div>

    <BaseCard class="dashboard-card">
      <div class="header-title">Manager Dashboard</div>

      <DashboardStats :stats="stats" :loading="loading" />
      <TeamOverview
        :mostInternTeam="overview.mostIntern"
        :newestTeam="overview.newest"
        :loading="loading"
      />
      <RankingSection
        :topTeams="topTeams"
        :topInterns="topInterns"
        :loading="loading"
      />
    </BaseCard>
    <ManagerBottomBar />
  </div>
</template>


<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { BellOutlined } from '@ant-design/icons-vue'
import BaseCard from '@/components/base/BaseCard.vue'
import DashboardStats from '@/components/manager/dashboard/DashboardStats.vue'
import TeamOverview from '@/components/manager/dashboard/TeamOverview.vue'
import RankingSection from '@/components/manager/dashboard/RankingCard.vue'
import ManagerBottomBar from '@/components/manager/ManagerBottomBar.vue'

const loading = ref(true)

/** mock state (ตรงกับ API จริงในอนาคต) */
const stats = ref({
  mentor: 0,
  intern: 0,
  team: 0
})

const overview = ref({
  mostIntern: '',
  newest: ''
})

const topTeams = ref<string[]>([])
const topInterns = ref<string[]>([])

onMounted(async () => {
  // mock loading
  await new Promise(r => setTimeout(r, 800))

  // TODO: GET /manager/dashboard
  stats.value = {
    mentor: 5,
    intern: 10,
    team: 5
  }

  overview.value = {
    mostIntern: 'Frontend Development Team',
    newest: 'Backend Development Team'
  }

  topTeams.value = ['Frontend', 'Backend', 'Backend']
  topInterns.value = ['Sompong', 'Anon', 'Jane']

  loading.value = false
})

const hasNotification = ref(true) // mock

const onClickBell = () => {
  console.log('open notification')

  /**
   * TODO:
   * navigateTo('/notifications')
   * or open dropdown
   */
}

</script>

<style scoped>
.dashboard-page {
  background: #74c3ff;
  min-height: 100vh;
  padding: 24px 12px;
  position: relative; /* 🔴 เพิ่มบรรทัดนี้ */
}

.dashboard-card {
  max-width: 360px;
  margin: 55px auto 0; /* top 55px */
}

.header-title {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 31px;
}


/* 🔔 ลอยอยู่นอก card */
.top-right {
  position: fixed;     /* ยึดกับ viewport */
  top: 16px;
  right: 16px;
  z-index: 100;        /* สูงกว่ากรอบขาว */
}

.bell-icon {
  font-size: 24px;
  color: #000;
  cursor: pointer;
}

</style>
