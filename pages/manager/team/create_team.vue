<template>
    <div class="page-wrapper">

        <!-- Top Bar -->
        <div class="top-bar">
            <BackButton />
            <span>Create Team</span>
        </div>

        <div class="card-container">
            <a-card class="team-card" bordered>

                <div class="card-header">
                    <h2>Create Team</h2>
                    <p>Create a new team and assign a mentor</p>
                </div>

                <div class="field">
                    <label>Team Name</label>
                    <a-input v-model:value="teamName" placeholder="Enter team name" size="large" />
                </div>

                <div class="field">
                    <label>Assign Mentor</label>

                    <a-select v-model:value="mentorId" :options="mentorOptions" placeholder="Select Mentor" size="large"
                        show-search option-filter-prop="label" />

                    <a-tag v-if="mentorName" color="blue" class="mentor-preview">
                        👤 {{ mentorName }}
                    </a-tag>
                </div>

                <a-button type="primary" size="large" block class="create-btn" :loading="loading" :disabled="!canSubmit"
                    @click="createTeam">
                    Create Team
                </a-button>

            </a-card>
        </div>

    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { message } from 'ant-design-vue'
import BackButton from '~/components/base/BackButton.vue'
import { useApiFetch } from '~/composables/useApiFetch'
import { useRouter } from 'vue-router'

const router = useRouter()
const apiFetch = useApiFetch

const loading = ref(false)
const teamName = ref('')
const mentorId = ref<string | null>(null)
const mentorName = ref<string | null>(null)
const mentors = ref<any[]>([])

/* =============================
   Mentor Options
============================= */
const mentorOptions = computed(() =>
  mentors.value.map(m => ({
    value: m.id,
    label: m.name
  }))
)

/* =============================
   Enable Submit
============================= */
const canSubmit = computed(() =>
  !!teamName.value && !!mentorId.value && !loading.value
)

/* =============================
   Watch Selected Mentor
============================= */
watch(mentorId, (newVal) => {
  const selected = mentors.value.find(m => m.id === newVal)
  mentorName.value = selected?.name || null
})

/* =============================
   Load Mentors
============================= */
onMounted(async () => {
  try {
    const res: any = await apiFetch('/users/mentors')
    const list = res.data || []

    mentors.value = list.map((m: any) => ({
      id: m.id,
      name: `${m.firstName} ${m.lastName}`
    }))
  } catch (err) {
    message.error('Failed to load mentors')
  }
})

/* =============================
   Create Team
============================= */
const createTeam = async () => {
  try {
    loading.value = true

    const res: any = await apiFetch('/teams', {
      method: 'POST',
      body: {
        name: teamName.value.trim(),
        mentorId: mentorId.value
      }
    })

    message.success('Team created successfully 🎉')

    const createdTeamId = res.data.id

    router.push({
      path: '/manager/team/create_invite',
      query: {
        teamId: createdTeamId,
        teamName: teamName.value
      }
    })

  } catch (err: any) {
    message.error(err?.data?.message || err?.message || 'Something went wrong')
  } finally {
    loading.value = false
  }

  console.log('CREATE TEAM PAYLOAD:', {
    name: teamName.value,
    mentorId: mentorId.value
  })
}
</script>

<style scoped>
.page-wrapper {
    min-height: 100vh;
    background: linear-gradient(180deg, #6fb1fc 0%, #f5f7fa 40%);
}

/* Top bar */
.top-bar {
    height: 60px;
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 0 16px;
    font-size: 18px;
    font-weight: 600;
    color: #fff;
}

/* Center card */
.card-container {
    display: flex;
    justify-content: center;
    padding: 20px 16px 60px;
}

.team-card {
    width: 100%;
    max-width: 420px;
    border-radius: 20px;
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.08);
}

/* Header inside card */
.card-header {
    margin-bottom: 28px;
}

.card-header h2 {
    margin: 0;
    font-weight: 600;
}

.card-header p {
    margin-top: 6px;
    font-size: 14px;
    color: #888;
}

/* Form */
.field {
    margin-bottom: 22px;
}

.field label {
    display: block;
    font-weight: 500;
    margin-bottom: 8px;
}

.mentor-preview {
    margin-top: 10px;
}

/* Button */
.create-btn {
    margin-top: 10px;
    height: 48px;
    font-weight: 600;
    border-radius: 12px;
}
</style>