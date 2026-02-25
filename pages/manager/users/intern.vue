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
        <InternFilterBar v-model:keyword="keyword" v-model:status="status" :loading="loading" />

        <!-- table -->
        <InternTable :interns="interns" :loading="loading" @select="openDetail" />

        <!-- detail modal -->
        <InternDetailModal v-model:open="detailOpen" :intern="selectedIntern" @toggle-status="toggleStatus" />
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
import { useApi } from '~/composables/core'
import { message } from 'ant-design-vue'

import InternFilterBar from '@/components/manager/users/InternFilterBar.vue'
import InternTable, { type Intern } from '@/components/manager/users/InternTable.vue'
import InternDetailModal from '@/components/manager/users/InternDetailModal.vue'

/* ===== state ===== */
const { apiFetch } = useApi()

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
  isActive?: boolean
}>({
  id: 0,
  name: '',
  status: 'inactive'
})
const resolveStatus = (user: any): 'active' | 'inactive' => {
  if (user?.status === 'active' || user?.status === 'inactive') {
    return user.status
  }
  return user?.isActive === false ? 'inactive' : 'active'
}

const resolveTeam = (user: any): string => {
  if (Array.isArray(user?.teams) && user.teams.length > 0) {
    return user.teams
      .map((t: any) => t?.name)
      .filter(Boolean)
      .join(', ')
  }
  return user?.teamName || '-'
}

const loadInterns = async () => {
  try {
    loading.value = true

    const res: any = await apiFetch('/users/interns')

    const internList = res.data?.interns || []

    interns.value = internList.map((u: any) => ({
      id: u.id,
      name: `${u.firstName} ${u.lastName}`,
      status: resolveStatus(u),
      team: resolveTeam(u)
    }))

  } catch (err) {
    console.error('Load interns failed:', err)
  } finally {
    loading.value = false
  }
}
/* ===== init (GET) ===== */
onMounted(() => {
  loadInterns()
})

/* ===== actions ===== */
const openDetail = async (intern: Intern) => {
  try {
    loading.value = true

    const res: any = await apiFetch(`/users/${intern.id}`)

    const data = res.data

    selectedIntern.value = {
      id: data.id,
      name: `${data.firstName} ${data.lastName}`,
      status: resolveStatus(data),
      isActive: data.isActive,

      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      university: data.university,
      studentId: data.studentId,
      team: resolveTeam(data) !== '-'
        ? resolveTeam(data)
        : ((intern as any).team || '-'),
      lastCheckedIn: data.lastCheckIn
        ? new Date(data.lastCheckIn).toLocaleString()
        : '-'
    }

    detailOpen.value = true

  } catch (err) {
    console.error('Load intern detail failed:', err)
  } finally {
    loading.value = false
  }
}

const toggleStatus = async () => {
  try {
    const newStatus = selectedIntern.value.status === 'active'

    await apiFetch(`/users/${selectedIntern.value.id}`, {
      method: 'PATCH',
      body: { isActive: !newStatus }
    })

    selectedIntern.value.status = newStatus
      ? 'inactive'
      : 'active'

    message.success('Status updated')

    loadInterns()

  } catch (err) {
    message.error('Failed to update status')
  }
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
