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

      <!-- Team Header -->
      <div class="team-header">
        <div class="team-name">{{ team.name }}</div>

        <div class="team-bottom">
          <div class="invite-link">
            {{ team.invite_link }}
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

    </BaseCard>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import BaseCard from '@/components/base/BaseCard.vue'
import BackButton from '@/components/base/BackButton.vue'
import InternRow from '@/components/mentor/myintern/InternRow.vue'
import InternLegend from '@/components/mentor/myintern/InternLegend.vue'

const route = useRoute()
const router = useRouter()

interface Intern {
  id: number
  name: string
  status: 'checked-in' | 'not-checked' | 'leave-pending' | 'on-leave'
  checkin_time?: string
  order: number
}

const team = ref({
  name: '',
  invite_link: ''
})

const interns = ref<Intern[]>([])

onMounted(() => {
  const teamId = Number(route.params.id)

  console.log('Team ID:', teamId)

  interface TeamData {
    name: string
    invite_link: string
    interns: Intern[]
  }

  const mockTeams: Record<number, TeamData> = {
    1: {
      name: 'Frontend - Batch 1',
      invite_link: 'http://invite.link/join/abc',
      interns: [
        { id: 1, name: 'Sompong', status: 'checked-in', checkin_time: '09:00 AM', order: 1 },
        { id: 2, name: 'Anon', status: 'not-checked', order: 3 },
        { id: 3, name: 'Somchai', status: 'leave-pending', order: 2 },
        { id: 4, name: 'Somying', status: 'on-leave', order: 4 }
      ]
    },
    2: {
      name: 'Frontend - Batch 2',
      invite_link: 'http://invite.link/join/xyz',
      interns: [
        { id: 5, name: 'Mali', status: 'checked-in', checkin_time: '08:55 AM', order: 1 },
        { id: 6, name: 'Narin', status: 'not-checked', order: 2 },
        { id: 7, name: 'Krit', status: 'on-leave', order: 3 }
      ]
    }
  }

  const data = mockTeams[teamId]

  if (!data) {
    team.value = { name: 'Unknown Team', invite_link: '-' }
    interns.value = []
    return
  }

  team.value = {
    name: data.name,
    invite_link: data.invite_link
  }

  interns.value = data.interns
})


function goTeamSetting() {
  router.push(`/mentor/team/${route.params.id}/settings`)
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
</style>