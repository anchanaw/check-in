<template>
  <div class="intern-page">
    <!-- Header -->
    <div class="top-header">
      <BackButton class="back-btn" />
      <span class="title">Intern</span>
    </div>

    <div class="content">
      <BaseCard class="card">
        <!-- filter + search -->
        <InternFilterBar
          v-model:keyword="keyword"
          v-model:status="status"
          :loading="loading"
        />

        <!-- table -->
        <InternTable
          :interns="interns"
          :loading="loading"
          @select="openDetail"
        />

        <!-- detail modal -->
        <InternDetailModal
          v-model:open="detailOpen"
          :intern="selectedIntern"
        />
      </BaseCard>
    </div>

    <ManagerBottomBar />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

import BaseCard from '@/components/base/BaseCard.vue'
import BackButton from '@/components/base/BackButton.vue'
import ManagerBottomBar from '@/components/manager/ManagerBottomBar.vue'

import InternFilterBar from '@/components/manager/users/InternFilterBar.vue'
import InternTable, { type Intern } from '@/components/manager/users/InternTable.vue'
import InternDetailModal from '@/components/manager/users/InternDetailModal.vue'

/* ===== state ===== */
const loading = ref(true)
const keyword = ref('')
const status = ref<'all' | 'active' | 'inactive'>('all')

const interns = ref<Intern[]>([])

/* ===== detail modal ===== */
const detailOpen = ref(false)

const selectedIntern = ref<Intern & {
  firstName?: string
  lastName?: string
  team?: string
  email?: string
  university?: string
  studentId?: string
  lastCheckedIn?: string
}>({
  id: 0,
  name: '',
  status: 'inactive'
})

/* ===== init (GET) ===== */
onMounted(async () => {
  await new Promise(r => setTimeout(r, 600))

  /**
   * TODO: GET /manager/users/interns
   * params: { keyword, status }
   */
  interns.value = [
    { id: 1, name: 'Sompong', status: 'active' },
    { id: 2, name: 'Anon', status: 'active' },
    { id: 3, name: 'Amorn', status: 'inactive' }
  ]

  loading.value = false
})

/* ===== actions ===== */
const openDetail = (intern: Intern) => {
  selectedIntern.value = intern
  detailOpen.value = true
}
</script>

<style scoped>
.intern-page {
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
</style>
