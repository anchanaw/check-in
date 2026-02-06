<template>
  <div class="mentor-page">
    <!-- Header -->
    <div class="top-header">
      <BackButton class="back-btn" />
      <span class="title">Mentor</span>
    </div>

    <div class="content">
      <BaseCard class="card">
        <!-- filter + search -->
        <MentorFilterBar v-model:keyword="keyword" v-model:status="status" :loading="loading" />

        <MentorTable :mentors="mentors" :loading="loading" @select="openDetail" />

        <MentorDetailModal v-model:open="detailOpen" :mentor="selectedMentor" />

      </BaseCard>

      <!-- add mentor -->
      <a-button type="primary" html-type="button" class="add-btn" @click="onAdd">
        Add Mentor
      </a-button>
    </div>

    <ManagerBottomBar />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { navigateTo } from '#app'
import BaseCard from '@/components/base/BaseCard.vue'
import BackButton from '@/components/base/BackButton.vue'
import ManagerBottomBar from '@/components/manager/ManagerBottomBar.vue'
import MentorFilterBar from '@/components/manager/users/MentorFilterBar.vue'
import MentorTable from '@/components/manager/users/MentorTable.vue'
import MentorDetailModal from '@/components/manager/users/MentorDetailModal.vue'

/* ===== state ===== */
const loading = ref(true)
const keyword = ref('')
const status = ref<'all' | 'active' | 'inactive'>('all')

const mentors = ref<any[]>([])

/* ===== init (GET) ===== */
onMounted(async () => {
  await new Promise(r => setTimeout(r, 600))

  /**
   * TODO: GET /manager/users/mentors
   * params: { keyword, status }
   */
  mentors.value = [
    { id: 1, name: 'Sommai', status: 'active' },
    { id: 2, name: 'Amorn', status: 'active' },
    { id: 3, name: 'Kiki', status: 'inactive' }
  ]

  loading.value = false
})

/* ===== actions ===== */
const onAdd = () => {
  navigateTo('/manager/users/addmentor')
  // navigateTo('/manager/users/mentor/create')
}

const detailOpen = ref(false)

type Mentor = {
  id: number
  name: string
  status: 'active' | 'inactive'
}

const selectedMentor = ref<Mentor & {
  firstName?: string
  lastName?: string
  team?: string
  email?: string
  lastLogin?: string
}>({
  id: 0,
  name: '',
  status: 'inactive'
})

const openDetail = (mentor: any) => {
  selectedMentor.value = mentor
  detailOpen.value = true
}

</script>

<style scoped>
.mentor-page {
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
  font-size: 16px;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px;
}

.card {
  width: 100%;
  max-width: 360px;
}

.add-btn {
  margin-top: 12px;
  width: 100%;
  max-width: 360px;
}
</style>
