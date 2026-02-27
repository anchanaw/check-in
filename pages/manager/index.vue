<template>
  <ClientOnly>
    <div class="dashboard-page">
      <div class="top-right">
        <a-badge :count="unreadCount" :overflow-count="99" :show-zero="false">
          <NuxtLink to="/manager/notifications" class="bell-link">
            <BellOutlined class="bell-icon" />
          </NuxtLink>
        </a-badge>
      </div>

      <BaseCard class="dashboard-card">
        <div class="header-title">Manager Dashboard</div>

        <DashboardStats :stats="stats" :loading="loading" />
        <PendingLeaveCard :leaves="pendingLeaves" @view="goToLeaveDetail" @view-all="goToLeaveList" />
        <TeamOverview :mostInternTeam="overview.mostIntern" :newestTeam="overview.newest" :loading="loading" />
        <RankingCard :topTeams="topTeams" :topInterns="topInterns" :loading="loading" />
      </BaseCard>

      <ManagerBottomBar />
    </div>
  </ClientOnly>
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
import RankingCard from '@/components/manager/dashboard/RankingCard.vue'

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
    await fetchNotifications()

    /** ---------- TEAMS ---------- */
    const teamRes: any = await apiFetch('/teams')
    const teams = teamRes.data.teams || []

    stats.value.team = teamRes.data.total || teams.length

    const sortedByIntern = [...teams].sort(
      (a, b) => (b.internTotal ?? 0) - (a.internTotal ?? 0)
    )

    overview.value.mostIntern = sortedByIntern[0]?.name ?? '-'

    /** ---------- NEWEST TEAM ---------- */
    const newestRes: any = await apiFetch(
      '/teams?page=1&pageSize=1&sort=createdAt&order=desc'
    )

    overview.value.newest =
      newestRes.data.teams?.[0]?.name ?? '-'

    /** ---------- TOP 3 TEAMS ---------- */
    const topTeamRes: any = await apiFetch(
      '/teams?page=1&pageSize=3&sort=internTotal&order=desc'
    )

    topTeams.value =
      topTeamRes.data?.teams?.map((t: any) => t.name) ?? []

    /** ---------- MENTORS ---------- */
    const mentorRes: any = await apiFetch('/users/mentors')
    const mentors = mentorRes.data?.mentors || []
    stats.value.mentor = mentorRes.data?.total ?? mentors.length

    /** ---------- INTERNS ---------- */
    const internRes: any = await apiFetch('/users/interns')
    const interns = internRes.data?.interns || []

    stats.value.intern = interns.length

    /** ---------- TOP 3 INTERNS (POINTS RANKING) ---------- */
    const rankingRes: any = await apiFetch('/points/ranking')
    const rankingList = rankingRes?.data || []
    topInterns.value = rankingList
      .sort((a: any, b: any) => (b.totalPoints ?? 0) - (a.totalPoints ?? 0))
      .slice(0, 3)
      .map((i: any) => `${i.firstName ?? ''} ${i.lastName ?? ''}`.trim())
      .filter((name: string) => !!name)


    /** ---------- PENDING LEAVES ---------- */
    const leaveRes: any = await apiFetch('/leaves/pending')
    const leaves = leaveRes.data || []

    pendingLeaves.value = leaves
      .slice(0, 3)
      .map((item: any) => ({
        id: item.id,
        name: item.user?.firstName
          ? `${item.user.firstName} ${item.user.lastName}`
          : item.userId,
        type: 'Leave',
        date: `${new Date(item.startDate).toLocaleDateString()} - ${new Date(item.endDate).toLocaleDateString()}`,
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
  padding: 24px 12px 96px;
  position: relative;
}

.dashboard-card {
  max-width: 360px;
  margin: 35px auto 0;
}

.header-title {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 31px;
}


.top-right {
  position: fixed;
  top: 16px;
  right: 16px;
  z-index: 100;
}

.bell-icon {
  position: relative;
  font-size: 24px;
  color: #000;
  cursor: pointer;
}
</style>
