<template>
    <div class="team-page">
  <div class="content">
    <h2 class="page-title">Team</h2>

    <TeamSummaryCard
  class="summary-card"
  :total="filteredTeams.length"
  :loading="loading"
  @create="goCreateLink"
  @search="onSearch"
/>

    <BaseCard class="table-card">
      <TeamTable :teams="teams" :loading="loading" />
    </BaseCard>
  </div>

  <!-- bottom bar อยู่นอก content -->
  <ManagerBottomBar />
</div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import BaseCard from '@/components/base/BaseCard.vue'
import ManagerBottomBar from '@/components/manager/ManagerBottomBar.vue'
import TeamSummaryCard from '@/components/manager/team/TeamSummaryCard.vue'
import TeamTable from '@/components/manager/team/TeamTable.vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const goCreateLink = () => {
  router.push('/manager/create_link')
}

const onSearch = (value: string) => {
  search.value = value
}
const search = ref('')
const loading = ref(true)

const totalManagement = ref(0)
const teams = ref<any[]>([])

const filteredTeams = computed(() => {
  return teams.value.filter(team =>
    team.team.toLowerCase().includes(search.value.toLowerCase())
  )
})

onMounted(async () => {
    await new Promise(r => setTimeout(r, 800))

    // TODO: GET /manager/teams
    totalManagement.value = 3

    teams.value = [
        { id: 1,team: 'Frontend', mentor: 'Sommai', intern: 3, status: 'open' },
        { id: 2,team: 'Backend', mentor: 'Amorn', intern: 2, status: 'open' },
        { id: 3,team: 'Tester', mentor: 'Kiki', intern: 2, status: 'open' }
    ]

    loading.value = false
})
</script>

<style scoped>
.team-page {
  background: #74c3ff;
  min-height: 100vh;
  padding: 24px 12px 90px;
}

/* กล่องเนื้อหากลาง */
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.content > * {
  width: 100%;
  max-width: 360px;
}

.page-title {
  text-align: center;
  font-size: 24px;
  font-weight: 600;
  margin: 0;
}

.summary-card {
  margin-top: 12px;
}

.table-card {
  margin-top: 12px;
}

</style>
