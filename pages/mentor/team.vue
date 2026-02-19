<template>
  <div class="page">

    <!-- Header -->
    <div class="top-header">
      <BackButton class="back-btn" />
      <div class="title">Team</div>
    </div>

    <!-- Card -->
    <BaseCard class="card">

      <TeamItemCard v-for="team in teams" :key="team.id" :team="team" @click="goDetail(team.id)" />

    </BaseCard>

    <!-- Create Button -->
    <div class="create-wrapper">
      <a-button type="primary" block size="large" @click="goCreateLink">
        Create Link
      </a-button>
    </div>

    <MentorBottomBar />

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import BaseCard from '@/components/base/BaseCard.vue'
import BackButton from '@/components/base/BackButton.vue'
import TeamItemCard from '@/components/mentor/myintern/TeamItemCard.vue'
import MentorBottomBar from '@/components/mentor/MentorBottomBar.vue'
import { useApi } from '~/composables/core'

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

const loadTeams = async () => {
  try {
    loading.value = true

    const res: any = await apiFetch(
      `/teams?page=${page.value}&pageSize=${pageSize.value}`
    )

    console.log('TEAMS RESPONSE:', res)

    teams.value = res.data.teams

  } catch (err) {
    console.error('Team fetch error:', err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadTeams()
})

const goDetail = (id: string) => {
  router.push(`/mentor/teams/${id}`)
}

const goCreateLink = () => {
  router.push('/mentor/teams/create')
}
</script>

<style scoped>
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
</style>