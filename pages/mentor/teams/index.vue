<template>
  <div class="page">

    <!-- Header -->
    <div class="top-header">
      <BackButton />
      <div class="title">Teams</div>
    </div>

    <BaseCard>

      <!-- Loading -->
      <a-skeleton v-if="loading" active />

      <!-- Team List -->
      <!-- Team List -->
      <div v-else>

        <!-- 🔥 ถ้าไม่มีทีม -->
        <div v-if="teams.length === 0" class="empty-state">
          ยังไม่มีทีม
        </div>

        <!-- 🔥 ถ้ามีทีม -->
        <template v-else>

          <TeamItemCard v-for="team in teams" :key="team.id" :team="team" @click="goDetail(team.id)" />

          <!-- Pagination -->
          <div class="pagination">
            <a-pagination :current="page" :page-size="pageSize" :total="total" show-size-changer
              @change="handlePageChange" @showSizeChange="handleSizeChange" />
          </div>

        </template>

      </div>

    </BaseCard>

    <div class="create-wrapper">
      <a-button type="primary" block size="large" @click="goCreateLink">
        Create Link
      </a-button>
    </div>

    <MentorBottomBar />

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onActivated } from 'vue'
import { useRouter } from 'vue-router'
import { useApi } from '~/composables/core'

import BaseCard from '@/components/base/BaseCard.vue'
import BackButton from '@/components/base/BackButton.vue'
import TeamItemCard from '@/components/mentor/myintern/TeamItemCard.vue'
import MentorBottomBar from '@/components/mentor/MentorBottomBar.vue'

const { apiFetch } = useApi()
const router = useRouter()

interface Team {
  id: string
  name: string
  mentorName: string
  internTotal: number
}

const teams = ref<Team[]>([])
const loading = ref(false)

const page = ref(1)
const pageSize = ref(10)
const total = ref(0)

/* =========================
   LOAD TEAMS
========================= */
interface Team {
  id: string
  name: string
  mentorId: string
  mentorName: string
  internTotal: number
}

interface TeamsResponse {
  success: boolean
  data: {
    teams: Team[]
    total: number
  }
}

interface MeResponse {
  success: boolean
  data: {
    id: string
  }
}

const loadTeams = async () => {
  try {
    loading.value = true

    // 🔥 ดึง id ของ user ที่ login
    const me = await apiFetch<MeResponse>('/auth/me')
    const myId = me.data!.id
console.log('myId:', myId)
    // 🔥 เรียก API พร้อม mentorId
    const res = await apiFetch<TeamsResponse>(
      `/teams?page=${page.value}&pageSize=${pageSize.value}&mentorId=${myId}`
    )

    teams.value = res.data.teams
    total.value = res.data.total

  } catch (err) {
    console.error('Team fetch error:', err)
  } finally {
    loading.value = false
  }
}

/* =========================
   PAGINATION HANDLERS
========================= */
const handlePageChange = (newPage: number) => {
  page.value = newPage
  loadTeams()
}

const handleSizeChange = (current: number, size: number) => {
  page.value = 1
  pageSize.value = size
  loadTeams()
}

/* =========================
   LIFECYCLE
========================= */
onMounted(loadTeams)
onActivated(loadTeams)

/* =========================
   NAVIGATION
========================= */
const goDetail = (id: string) => {
  router.push(`/mentor/teams/${id}`)
}
const goCreateLink = () => {
  router.push('/mentor/teams/create')
}
</script>

<style scoped>
.pagination {
  margin-top: 16px;
  display: flex;
  justify-content: center;
}

.page {
  min-height: 100vh;
  background: #6CBCFA;
  padding: 16px;
}

.card {
  border-radius: 16px;
  margin-bottom: 20px;
}

.create-wrapper {
  padding: 0 16px;
  margin-bottom: 80px;
}

.top-header {
  position: relative;
  height: 60px;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
}

.title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 24px;
  font-weight: 600;
}

.create-wrapper {
  margin-top: 16px;
}

.empty-state {
  text-align: center;
  padding: 40px 0;
  color: #999;
  font-size: 16px;
}
</style>