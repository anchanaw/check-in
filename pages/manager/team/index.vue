<template>
  <div class="team-page">
    <div class="content">
      <h2 class="page-title">Team</h2>

      <TeamSummaryCard class="summary-card" :total="totalTeams" :loading="loading" @create="goCreateLink"
        @search="onSearch" />

      <BaseCard class="table-card">
        <TeamTable :teams="teams" :loading="loading" :total="totalTeams" :page="page" :page-size="pageSize"
          @page-change="onPageChange" />
      </BaseCard>
    </div>

    <!-- bottom bar อยู่นอก content -->
    <ManagerBottomBar />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useApi } from '~/composables/core'

import BaseCard from '@/components/base/BaseCard.vue'
import ManagerBottomBar from '@/components/manager/ManagerBottomBar.vue'
import TeamSummaryCard from '@/components/manager/team/TeamSummaryCard.vue'
import TeamTable from '@/components/manager/team/TeamTable.vue'

const { apiFetch } = useApi()
const router = useRouter()

const search = ref('')
const loading = ref(false)
const teams = ref<any[]>([])
const totalTeams = ref(0)

const page = ref(1)
const pageSize = 10

/* ================= LOAD TEAMS ================= */
const loadTeams = async () => {
  loading.value = true

  try {
    const res: any = await apiFetch('/teams', {
      params: {
        page: page.value,
        pageSize
      }
    })

    const teamList = res.data?.teams || []

    // 🔥 ดึง mentor name เพิ่ม
    const enrichedTeams = await Promise.all(
      teamList.map(async (t: any) => {
        let mentorName = 'Unassigned'

        if (t.mentorId) {
          try {
            const mentorRes: any = await apiFetch(`/users/${t.mentorId}`)
            const mentorData = mentorRes.data
            mentorName = `${mentorData.firstName} ${mentorData.lastName}`
          } catch {
            mentorName = 'Unassigned'
          }
        }

        return {
          id: t.id,
          team: t.name,
          mentor: mentorName,
          intern: t.internTotal || 0,
          status: 'open'
        }
      })
    )

    teams.value = enrichedTeams
    totalTeams.value = res.data.total || 0

  } catch (err) {
    console.error('Load teams failed:', err)
  } finally {
    loading.value = false
  }
}
/* ================= SEARCH ================= */
const filteredTeams = computed(() => {
  if (!search.value) return teams.value

  return teams.value.filter(team =>
    team.team.toLowerCase().includes(search.value.toLowerCase()) ||
    team.mentor.toLowerCase().includes(search.value.toLowerCase())
  )
})

const onSearch = (value: string) => {
  search.value = value
}

/* ================= PAGE CHANGE ================= */
const onPageChange = (newPage: number) => {
  page.value = newPage
  loadTeams()
}

/* ================= NAVIGATION ================= */
const goCreateLink = () => {
  router.push('/manager/team/create_team')
}

/* ================= INIT ================= */
onMounted(() => {
  loadTeams()
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

.content>* {
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
