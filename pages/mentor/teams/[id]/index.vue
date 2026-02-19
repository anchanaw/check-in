<template>
  <div class="page">

    <!-- Header -->
    <div class="top-header">
      <div class="left">
        <BackButton />
      </div>

      <div class="title">Intern List</div>
    </div>

    <BaseCard class="card">

      <!-- 🔄 Loading -->
      <div v-if="loading">
        <a-skeleton active :paragraph="{ rows: 5 }" />
      </div>

      <!-- ❗ Error -->
      <div v-else-if="error" class="error-state">
        {{ error }}
      </div>

      <!-- ✅ Normal Content -->
      <div v-else>

        <!-- Team Header -->
        <div class="team-header">
          <div class="team-name">{{ team.name }}</div>

          <div class="team-bottom">
            <div v-if="invite" class="invite-section">
              <div class="invite-link">
                {{ baseUrl }}/register?code={{ invite.code }}
              </div>
            </div>

            <div v-else class="no-invite">
              No active invite link
            </div>

            <button class="team-btn" @click="goTeamSetting">
              Team Settings <span class="arrow">›</span>
            </button>
          </div>
        </div>

        <!-- Intern List -->
        <div class="intern-list">
          <InternRow v-for="intern in interns" :key="intern.id" :intern="intern" />
        </div>

        <InternLegend />

      </div>

    </BaseCard>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useApi } from '~/composables/core'

import BaseCard from '@/components/base/BaseCard.vue'
import BackButton from '@/components/base/BackButton.vue'
import InternRow from '@/components/mentor/myintern/InternRow.vue'
import InternLegend from '@/components/mentor/myintern/InternLegend.vue'

const { apiFetch } = useApi()
const route = useRoute()
const router = useRouter()


interface Intern {
  id: string
  name: string
  status: string
  order: number
}

const team = ref({ name: '' })
const interns = ref<Intern[]>([])
const invite = ref<any | null>(null)

const loading = ref(true)
const error = ref<string | null>(null)

const baseUrl = ref(typeof window !== 'undefined' ? window.location.origin : '')
const teamId = route.params.id as string

/* =========================
   LOAD DATA
========================= */
const loadData = async () => {
  try {
    loading.value = true
    error.value = null

    // โหลดพร้อมกัน
    const [
      teamRes,
      internRes,
      inviteRes,
      rankingRes
    ] = await Promise.all([
      apiFetch('/teams?page=1&pageSize=50') as Promise<{
        data: { teams: any[] }
      }>,
      apiFetch('/users/interns') as Promise<{
        data: any[]
      }>,
      apiFetch('/auth/invites') as Promise<{
        data: any[]
      }>,
      apiFetch('/points/ranking') as Promise<{
        data: any[]
      }>
    ])

    /* -------------------------
       TEAM INFO
    -------------------------- */
    const currentTeam = teamRes.data.teams.find(
      (t: any) => String(t.id) === String(teamId)
    )

    team.value.name = currentTeam?.name || 'Unknown Team'

    /* -------------------------
       TEAM INTERNS
    -------------------------- */
    const teamInterns = internRes.data.filter((intern: any) =>
      intern.teams?.some((t: any) => String(t.id) === String(teamId))
    )

    /* -------------------------
       RANKING MAP
    -------------------------- */
    const rankingMap: Record<string, number> = {}

    rankingRes.data.forEach((item: any, index: number) => {
      rankingMap[String(item.userId)] = index + 1
    })

    interns.value = teamInterns.map((intern: any) => ({
      id: String(intern.id),
      name: `${intern.firstName} ${intern.lastName}`,
      status: 'not-checked',
      order: rankingMap[String(intern.id)] || 0
    }))

    /* -------------------------
       ACTIVE INVITE
    -------------------------- */
    invite.value =
      inviteRes.data.find(
        (i: any) =>
          String(i.teamId) === String(teamId) &&
          i.usesCount < i.maxUses
      ) || null

  } catch (err) {
    console.error(err)
    error.value = 'Failed to load team data'
  } finally {
    loading.value = false
  }
}

onMounted(loadData)

function goTeamSetting() {
  router.push(`/mentor/teams/${teamId}/settings`)
}
</script>


<style scoped>
.page {
  min-height: 100vh;
  background: #6CBCFA;
  padding: 16px;
}

.top-header {
  position: relative;
  background: #6CBCFA;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.left {
  position: absolute;
  left: 0;
  padding-left: 8px;
}

.title {
  font-size: 28px;
  font-weight: 700;
  color: #1a1a1a;
}

.card {
  border-radius: 16px;
}

.team-header {
  background: #ffffff;
  padding: 10px;
  border-radius: 20px;
  margin-bottom: 20px;

  box-shadow:
    0 12px 30px rgba(0, 0, 0, 0.15);
}

.team-name {
  font-size: 24px;
  font-weight: 700;
  color: #111;
  margin-bottom: 14px;
}

.team-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.invite-link {
  font-size: 15px;
  color: #666;
}

.team-btn {
  background: #6CBCFA;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: 0.2s ease;
}

.team-btn:hover {
  transform: translateY(-1px);
}

.arrow {
  font-size: 18px;
}

.error-state {
  text-align: center;
  padding: 20px;
  color: red;
}

</style>