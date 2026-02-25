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
import { ref, onMounted, watch } from 'vue'
import { navigateTo } from '#app'
import BaseCard from '@/components/base/BaseCard.vue'
import BackButton from '@/components/base/BackButton.vue'
import ManagerBottomBar from '@/components/manager/ManagerBottomBar.vue'
import MentorFilterBar from '@/components/manager/users/MentorFilterBar.vue'
import MentorTable from '@/components/manager/users/MentorTable.vue'
import MentorDetailModal from '@/components/manager/users/MentorDetailModal.vue'
import { useApiFetch } from '~/composables/useApiFetch'

/* ===== state ===== */
const loading = ref(true)
const keyword = ref('')
const status = ref<'all' | 'active' | 'inactive'>('all')

const mentors = ref<any[]>([])

/* ===== load mentors ===== */
const loadMentors = async () => {
  try {
    loading.value = true

    const res: any = await useApiFetch('/users/mentors', {
      method: 'GET'
    })

    const list = res?.data?.mentors || []

    let mapped = list.map((m: any) => ({
      id: m.id,
      name: `${m.firstName} ${m.lastName}`,
      firstName: m.firstName,
      lastName: m.lastName,
      email: m.email,
      team: m.teams?.length
        ? m.teams.map((t: any) => t.name).join(', ')
        : '-',
      lastLogin: '-', // API ไม่มี field นี้
      status: 'active' // API ไม่มี status → default ไว้ก่อน
    }))

    /* ===== filter frontend (ถ้า backend ยังไม่รองรับ query) ===== */
    if (keyword.value) {
      mapped = mapped.filter((m: any) =>
        m.name.toLowerCase().includes(keyword.value.toLowerCase())
      )
    }

    if (status.value !== 'all') {
      mapped = mapped.filter((m: any) => m.status === status.value)
    }

    mentors.value = mapped

  } catch (err) {
    console.error('Load mentors failed:', err)
  } finally {
    loading.value = false
  }
}

/* ===== initial load ===== */
onMounted(loadMentors)

/* ===== reload when filter changes ===== */
watch([keyword, status], () => {
  loadMentors()
})

/* ===== actions ===== */
const onAdd = () => {
  navigateTo('/manager/users/addmentor')
}

const detailOpen = ref(false)

type Mentor = {
  id: string
  name: string
  status: 'active' | 'inactive'
  firstName?: string
  lastName?: string
  team?: string
  email?: string
  lastLogin?: string
}

const selectedMentor = ref<Mentor>({
  id: '',
  name: '',
  status: 'inactive'
})

const openDetail = (mentor: Mentor) => {
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
