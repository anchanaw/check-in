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

    <ManagerBottomBar />

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import BaseCard from '@/components/base/BaseCard.vue'
import BackButton from '@/components/base/BackButton.vue'
import TeamItemCard from '@/components/mentor/myintern/TeamItemCard.vue'

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
    // 🔜 ต่อ API ตรงนี้
    // teams.value = await apiFetch('/manager/teams')

    // mock data
    teams.value = [
      {
        id: 1,
        name: 'Frontend - Batch 1',
        intern_count: 2,
        invite_active: true
      },
      {
        id: 2,
        name: 'Frontend - Batch 2',
        intern_count: 3,
        invite_active: false
      }
    ]
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