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
  status: 'checked-in' | 'not-checked' | 'leave-pending' | 'on-leave'
  checkin_time?: string
  order: number
}

const team = ref({
  name: '',
  invite_link: ''
})

const interns = ref<Intern[]>([])
const loading = ref(false)
const invite = ref<any | null>(null)
const baseUrl = ref(typeof window !== 'undefined' ? window.location.origin : '')

onMounted(async () => {
  const teamId = route.params.id as string
  loading.value = true

  try {
    // 1️⃣ ดึง intern ทั้งหมด
    const internRes = await apiFetch('/users/interns') as { data: any[] }
    const allInterns = internRes.data

    // 2️⃣ filter intern ตาม team
    const teamInterns = allInterns.filter(intern =>
      intern.teams?.some((t: any) => t.id === teamId)
    )

    // โหลด invites ทั้งหมด
    const inviteRes = await apiFetch('/auth/invites') as { data: any[] }

    // ❗ ถ้า backend ไม่มี teamId จะเช็คไม่ได้
    invite.value = inviteRes.data.find(
      (i: any) =>
        String(i.teamId) === String(teamId) &&
        i.usesCount < i.maxUses
    ) || null

    // ตั้งชื่อทีมจาก intern คนแรก
    const teamInfo = teamInterns[0]?.teams?.find((t: any) => t.id === teamId)

    team.value = {
      name: teamInfo?.name || 'Unknown Team',
      invite_link: '-' // ยังไม่มี API invite link
    }

    // 3️⃣ ดึง ranking
    const rankingRes = await apiFetch('/points/ranking') as { data: any[] }

    const rankingMap: Record<string, number> = {}
    rankingRes.data.forEach((item: any, index: number) => {
      rankingMap[item.userId] = index + 1
    })

    // 4️⃣ map interns
    interns.value = teamInterns.map((intern: any) => ({
      id: String(intern.id),
      name: `${intern.firstName} ${intern.lastName}`,
      status: 'not-checked', // ยังไม่ได้คำนวณ attendance
      order: rankingMap[intern.id] || 0
    }))

  } catch (err) {
    console.error('Team detail error:', err)
  } finally {
    loading.value = false
  }
})

function goTeamSetting() {
  router.push(`/mentor/teams/${route.params.id}/settings`)
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