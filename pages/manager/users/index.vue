<template>
  <div class="users-page">
    <!-- Header -->
    <div class="top-header">
      <span class="title">Manage Users</span>
    </div>

    <div class="content">
      <BaseCard class="card">
        <div class="subtitle">
          Choose a role to view user list
        </div>

        <UserRoleCard icon="mentor" title="Mentor" desc="Manage mentor and their team" :count="counts.mentor"
          :loading="loading" @click="goMentor" />

        <UserRoleCard icon="intern" title="Intern" desc="View and manage intern accounts" :count="counts.intern"
          :loading="loading" @click="goIntern" />
      </BaseCard>
    </div>

    <ManagerBottomBar />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import BaseCard from '@/components/base/BaseCard.vue'
import ManagerBottomBar from '@/components/manager/ManagerBottomBar.vue'
import UserRoleCard from '@/components/manager/users/UserRoleCard.vue'
import { useApi } from '~/composables/core'

const { apiFetch } = useApi()
const loading = ref(true)

/* ===== mock state (ตรง API) ===== */
const counts = ref({
  mentor: 0,
  intern: 0
})


onMounted(async () => {
  try {
    loading.value = true

    const [internRes, mentorRes]: any = await Promise.all([
      apiFetch('/users/interns'),
      apiFetch('/users/mentors')
    ])

    const internList = internRes?.data?.interns || []
    const mentorList = mentorRes?.data?.mentors || []

    counts.value = {
      mentor: mentorList.length,
      intern: internList.length
    }

  } catch (err) {
    console.error('Load users failed:', err)
  } finally {
    loading.value = false
  }
})

/* ===== navigation ===== */
const goMentor = () => {
  navigateTo('/manager/users/mentor')
}

const goIntern = () => {
  navigateTo('/manager/users/intern')
}
</script>

<style scoped>
.users-page {
  background: #74c3ff;
  min-height: 100vh;
  padding-bottom: 90px;
}

.top-header {
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
}

.title {
  font-size: 18px;
}

.content {
  display: flex;
  justify-content: center;
  padding: 12px;
}

.card {
  width: 100%;
  max-width: 360px;
}

.subtitle {
  font-size: 12px;
  color: #666;
  margin-bottom: 12px;
}
</style>
