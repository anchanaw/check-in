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
                {{ baseUrl }}/invite?code={{ invite.code }}
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
import { ref, onMounted, onActivated, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useApi } from '~/composables/core'
import dayjs from 'dayjs'
import BaseCard from '@/components/base/BaseCard.vue'
import BackButton from '@/components/base/BackButton.vue'
import InternRow from '@/components/mentor/myintern/InternRow.vue'
import InternLegend from '@/components/mentor/myintern/InternLegend.vue'

const { apiFetch } = useApi()
const route = useRoute()
const router = useRouter()


const team = ref({ name: '' })
const invite = ref<any | null>(null)

const loading = ref(true)
const error = ref<string | null>(null)

const baseUrl = ref(typeof window !== 'undefined' ? window.location.origin : '')
const teamId = route.params.id as string

/* =========================
   LOAD DATA
========================= */
interface Intern {
  id: string
  name: string
  status: 'checked-in' | 'not-checked'
  checkin_time?: string
  rank: number
  totalScore: number
}

const interns = ref<Intern[]>([])

const loadData = async () => {
  try {
    loading.value = true
    error.value = null

    /* =========================
       1️⃣ โหลดข้อมูลพื้นฐานพร้อมกัน
    ========================= */
    const [teamRes, internRes, rankingRes, inviteRes] =
      await Promise.all([
        apiFetch<{ data: { teams: any[] } }>('/teams?page=1&pageSize=100'),
        apiFetch<{ data: any[] }>('/users/interns'),
        apiFetch<{ data: any[] }>('/points/ranking'),
        apiFetch<{ data: any[] }>('/auth/invites')
      ])

    const allTeams = teamRes.data.teams || []

    const currentTeam = allTeams.find(
      (t: any) => String(t.id) === String(teamId)
    )

    if (!currentTeam) {
      error.value = 'Team not found'
      return
    }

    team.value.name = currentTeam.name

    /* =========================
       2️⃣ Filter intern ในทีมนี้
    ========================= */
    const teamInterns = (internRes.data || []).filter((intern: any) =>
      intern.teams?.some((t: any) => String(t.id) === String(teamId))
    )

    /* =========================
       3️⃣ Ranking + Score Map
    ========================= */
    const rankingMap: Record<string, number> = {}
    const scoreMap: Record<string, number> = {}

    rankingRes.data
      .sort((a: any, b: any) => b.totalPoints - a.totalPoints)
      .forEach((item: any, index: number) => {
        rankingMap[String(item.internId)] = index + 1
        scoreMap[String(item.internId)] = item.totalPoints
      })

    /* =========================
       4️⃣ โหลด check-in วันนี้ของแต่ละคน
    ========================= */
    const checkStatusMap: Record<string, boolean> = {}
    const checkTimeMap: Record<string, string> = {}

    const today = dayjs().add(7, 'hour').format('YYYY-MM-DD')

    await Promise.all(
      teamInterns.map(async (intern: any) => {
        try {
          const res: any = await apiFetch(
            `/users/interns/${intern.id}/check-ins`
          )

          const records = res?.data || []

          const todayRecord = records.find(
            (item: any) =>
              item.checkInDate === today
          )

          if (todayRecord) {
            checkStatusMap[String(intern.id)] = true

            // 🔥 ใช้ checkInTime ตรง ๆ
            checkTimeMap[String(intern.id)] = dayjs(
              `${todayRecord.checkInDate} ${todayRecord.checkInTime}`
            )
              .add(7, 'hour')
              .format('HH:mm')

          } else {
            checkStatusMap[String(intern.id)] = false
            checkTimeMap[String(intern.id)] = ''
          }

        } catch (err) {
          console.error('Check-in fetch error:', err)
          checkStatusMap[String(intern.id)] = false
          checkTimeMap[String(intern.id)] = ''
        }
      })
    )

    /* =========================
       5️⃣ รวมข้อมูลทั้งหมด
    ========================= */
    type InternStatus = 'checked-in' | 'not-checked'
    interns.value = teamInterns
      .map((intern: any) => {
        const status: InternStatus =
          checkStatusMap[String(intern.id)]
            ? 'checked-in'
            : 'not-checked'

        return {
          id: String(intern.id),
          name: `${intern.firstName} ${intern.lastName}`,
          status,
          checkin_time: checkTimeMap[String(intern.id)] || '',
          rank: rankingMap[String(intern.id)] || 0,
          totalScore: scoreMap[String(intern.id)] || 0
        }
      })
      .sort((a, b) => a.rank - b.rank)
    console.log('checkTimeMap:', checkTimeMap)

    /* =========================
       6️⃣ Invite
    ========================= */
    invite.value =
      inviteRes.data.find(
        (i: any) =>
          i.type === 'registration' &&
          i.role === 'intern' &&
          i.usesCount < i.maxUses
      ) || null

  } catch (err) {
    console.error(err)
    error.value = 'Failed to load team data'
  } finally {
    loading.value = false
  }
}
/* =========================
   LIFECYCLE
========================= */
onMounted(loadData)
onActivated(loadData)

/* =========================
   REFRESH SUPPORT
========================= */
watch(
  () => route.query.refresh,
  (val) => {
    if (val === 'true') {
      loadData()
    }
  }
)

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