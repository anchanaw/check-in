<template>
  <div class="dashboard-page">
    <!-- 🔔 notification -->
    <div class="top-right">
      <a-badge :count="unreadCount" :overflow-count="99" :show-zero="false">
        <NuxtLink to="/mentor/notifications" class="bell-link">
          <BellOutlined class="bell-icon" />
        </NuxtLink>
      </a-badge>
    </div>

    <BaseCard class="dashboard-card">
      <div class="header-title">Manager Dashboard</div>

      <DashboardStats :stats="stats" :loading="loading" />
      <PendingLeaveCard :leaves="pendingLeaves" @view="goToLeaveDetail" @view-all="goToLeaveList" />
      <TeamOverview :mostInternTeam="overview.mostIntern" :newestTeam="overview.newest" :loading="loading" />
      <RankingSection :topTeams="topTeams" :topInterns="topInterns" :loading="loading" />
    </BaseCard>
    <ManagerBottomBar />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { BellOutlined } from '@ant-design/icons-vue'
import BaseCard from '@/components/base/BaseCard.vue'
import PendingLeaveCard from '@/components/manager/dashboard/PendingLeaveCard.vue'
import DashboardStats from '@/components/manager/dashboard/DashboardStats.vue'
import TeamOverview from '@/components/manager/dashboard/TeamOverview.vue'
import RankingSection from '@/components/manager/dashboard/RankingCard.vue'
import ManagerBottomBar from '@/components/manager/ManagerBottomBar.vue'
import { useApi } from '~/composables/core'
import { useLeaveApi } from '~/composables/manager/useLeaveApi'
import { useManagerNotifications } from '@/composables/manager/useManagerNotifications'

const { apiFetch } = useApi()
const { getPendingLeaves } = useLeaveApi()
const { unreadCount, fetchNotifications } = useManagerNotifications()

definePageMeta({
  middleware: 'role'
})

const loading = ref(true)
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
const pendingLeaves = ref<any[]>([])

/* ================= LOAD DASHBOARD ================= */
onMounted(async () => {
  try {
    loading.value = true

    /** ---------- 1️⃣ TEAMS ---------- */
    const teamRes: any = await apiFetch('/teams')
    const teams = teamRes.data.teams || []

    // total team
    stats.value.team = teamRes.data.total || teams.length

    // total mentor (unique mentorId)
    const uniqueMentors = new Set(teams.map((t: any) => t.mentorId))
    stats.value.mentor = uniqueMentors.size

    // team with most intern
    const sortedByIntern = [...teams].sort(
      (a, b) => b.internTotal - a.internTotal
    )

    overview.value.mostIntern = sortedByIntern[0]?.name || '-'

    // newest team
    const sortedByCreated = [...teams].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
    )

    overview.value.newest = sortedByCreated[0]?.name || '-'

    // top 3 teams
    topTeams.value = sortedByIntern
      .slice(0, 3)
      .map((t: any) => t.name)

    /** ---------- 2️⃣ INTERNS ---------- */
    const internRes: any = await apiFetch('/users/interns')
    const interns = internRes.data || []

    stats.value.intern = interns.length

    // TODO: ถ้ามีคะแนนจริงให้ sort ตามคะแนน
    topInterns.value = interns
      .slice(0, 3)
      .map((i: any) => `${i.firstName} ${i.lastName}`)

    /** ---------- 3️⃣ PENDING LEAVES ---------- */
    const leaveRes: any = await getPendingLeaves()

    pendingLeaves.value = (leaveRes.data || [])
      .slice(0, 3)
      .map((item: any) => ({
        id: item.id,
        name: item.user?.display_name || '-',
        type: item.leave_type,
        date: item.duration_text,
        status: item.status
      }))

  } catch (err) {
    console.error(err)
  } finally {
    loading.value = false
  }
})

const hasNotification = ref(true)

const onClickBell = () => {
  navigateTo('/manager/notifications')
}

const goToLeaveDetail = (item: any) => {
  navigateTo(`/manager/leave/${item.id}`)
}

const goToLeaveList = () => {
  navigateTo('/manager/leave_request')
}
</script>

<style scoped>
.dashboard-page {
  background: #74c3ff;
  min-height: 100vh;
  padding: 24px 12px;
  position: relative;
  /* 🔴 เพิ่มบรรทัดนี้ */
}

.dashboard-card {
  max-width: 360px;
  margin: 35px auto 0;
  /* top 55px */
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
  position: fixed;
  /* ยึดกับ viewport */
  top: 16px;
  right: 16px;
  z-index: 100;
  /* สูงกว่ากรอบขาว */
}

.bell-icon {
  font-size: 24px;
  color: #000;
  cursor: pointer;
}
</style>
