<template>
  <div class="create-link-page">
    <!-- Header -->
    <div class="top-header">
      <BackButton class="back-btn" />
      <span class="title">Create Link</span>
    </div>

    <div class="content">
      <LinkFormCard
        :teams="teams"
        :mentors="mentors"
        :interns="interns"
        :loading="loading"
        @submit="onSubmit"
      />
    </div>

    <ManagerBottomBar />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ManagerBottomBar from '@/components/manager/ManagerBottomBar.vue'
import LinkFormCard from '@/components/manager/createlink/LinkFormCard.vue'
import BackButton from '@/components/base/BackButton.vue'

/* ===== types (ตรง backend) ===== */
interface Team {
  id: number
  name: string
}

interface Mentor {
  id: number
  name: string
}

interface Intern {
  id: number
  name: string
}

/* ===== state ===== */
const loading = ref(true)

const teams = ref<Team[]>([])
const mentors = ref<Mentor[]>([])
const interns = ref<Intern[]>([])

/* ===== init (GET) ===== */
onMounted(async () => {
  loading.value = true

  await new Promise(r => setTimeout(r, 600))

  /**
   * TODO: GET /manager/create-link/init
   * response: {
   *   teams: { id, name }[]
   *   mentors: { id, name }[]
   *   interns: { id, name }[]
   * }
   */
  teams.value = [
    { id: 1, name: 'Frontend' },
    { id: 2, name: 'Backend' },
    { id: 3, name: 'Tester' }
  ]

  mentors.value = [
    { id: 10, name: 'Sommai' },
    { id: 11, name: 'Amorn' },
    { id: 12, name: 'Kiki' }
  ]

  interns.value = [
    { id: 101, name: 'Sompong' },
    { id: 102, name: 'Anon' },
    { id: 103, name: 'Amorn' }
  ]

  loading.value = false
})

/* ===== submit (POST) ===== */
const onSubmit = (payload: {
  team_id: number
  mentor_id: number
  intern_ids: number[]
  link_name?: string | null
  max_uses?: number | null
  expired_at?: string | null
}) => {
  console.log('create link payload:', payload)

  /**
   * TODO: POST /manager/create-link
   * payload (ตรง backend):
   * {
   *   team_id: number
   *   mentor_id: number
   *   intern_ids: number[]
   *   link_name?: string
   *   max_uses?: number
   *   expired_at?: string (ISO)
   * }
   */
}
</script>

<style scoped>
.create-link-page {
  background: #74c3ff;
  min-height: 100vh;
  padding-bottom: 90px;
}

.top-header {
  position: relative;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
}

.back-btn {
  position: absolute;
  left: 12px;
}

.title {
  font-size: 24px;
  font-weight: 600;
}

.content {
  display: flex;
  justify-content: center;
  padding: 12px;
}
</style>
