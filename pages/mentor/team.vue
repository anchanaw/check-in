<template>
  <div class="page">

    <!-- Header -->
    <div class="top-header">
      <BackButton class="back-btn" />
      <div class="title">Team</div>
    </div>

    <!-- Card -->
    <BaseCard class="card">

      <TeamItemCard
        v-for="team in teams"
        :key="team.id"
        :team="team"
        @click="goDetail(team.id)"
      />

    </BaseCard>

    <!-- Create Button -->
    <div class="create-wrapper">
      <a-button
        type="primary"
        block
        size="large"
        @click="goCreateLink"
      >
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
  id: number
  name: string
  intern_count: number
  invite_active: boolean
}

const teams = ref<Team[]>([])
const loading = ref(false)

onMounted(async () => {
  loading.value = true
  try {
    const res = await apiFetch('/users/interns') as { data: any[] }

    const interns = res.data

    // 🔥 group intern ตาม team
    const teamMap: Record<number, Team> = {}

    interns.forEach((intern: any) => {
      const teamId = intern.team_id
      const teamName = intern.team_name

      if (!teamMap[teamId]) {
        teamMap[teamId] = {
          id: teamId,
          name: teamName,
          intern_count: 0,
          invite_active: true // ยังไม่มี API บอก → default ก่อน
        }
      }

      teamMap[teamId].intern_count++
    })

    teams.value = Object.values(teamMap)

  } catch (err) {
    console.error('Team fetch error:', err)
  } finally {
    loading.value = false
  }
})

const goDetail = (id: number) => {
  router.push(`/mentor/teams/${id}`)
}

const goCreateLink = () => {
  router.push('/mentor/create-link')
}
</script>

<style scoped>.page {
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