<template>
  <div class="profile-page">
    <div class="wrapper">
      <BaseCard v-if="user">
        <!-- Avatar + Name -->
        <ProfileHeader :user="user" :avatar="avatarUrl" />

        <!-- Info sections -->
        <ProfileInfoSection title="Account Information" :items="accountInfo" />

        <ProfileInfoSection title="Personal Information" :items="personalInfo" />

        <!-- Actions (Mentor) -->
        <ProfileActions mode="manager" @edit="onEdit" @logout="onLogout" />
      </BaseCard>
      <a-skeleton v-else active />
    </div>

    <ManagerBottomBar active="profile" />
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { useApi } from '~/composables/core'
import { useAuthStore } from '~/stores/auth.store'
import { ref, onMounted, onActivated } from 'vue'

import BaseCard from '~/components/base/BaseCard.vue'
import ProfileHeader from '~/components/manager/profile/ProfileHeader.vue'
import ProfileInfoSection from '~/components/manager/profile/ProfileInfoSection.vue'
import ProfileActions from '~/components/manager/profile/ProfileActions.vue'
import ManagerBottomBar from '@/components/manager/ManagerBottomBar.vue'

const route = useRoute()
console.log('current route:', route.fullPath)
const { apiFetch } = useApi()
const router = useRouter()
const auth = useAuthStore()

const loading = ref(true)
const user = ref<any>(null)
const avatarUrl = ref<string>('')
const accountInfo = ref<any[]>([])
const personalInfo = ref<any[]>([])

if (route.fullPath.includes('undefined')) {
  router.replace('/manager/profile')
}

const formatRole = (role: string) => {
  switch (role) {
    case 'manager':
      return 'Manager'
    case 'mentor':
      return 'Mentor'
    case 'intern':
      return 'Intern'
    default:
      return '-'
  }
}
const loadProfile = async () => {
  try {
    loading.value = true

    const res = await apiFetch<{ data: any }>('/auth/me')
    const data = res.data

    user.value = {
      name: `${data.firstName} ${data.lastName}`,
      role: formatRole(data.role)
    }

    accountInfo.value = [
      { label: 'Email', value: data.email }
    ]

    personalInfo.value = [
      { label: 'First Name', value: data.firstName },
      { label: 'Last Name', value: data.lastName },
      { label: 'Gender', value: data.gender || '-' },
      {
        label: 'Date of Birth',
        value: data.dateOfBirth
          ? new Date(data.dateOfBirth).toLocaleDateString()
          : '-'
      }
    ]

    const imgRes = await apiFetch<{ data: { signedUrl: string } }>(
      '/auth/profile/image-signed-url'
    )

    avatarUrl.value = imgRes?.data?.signedUrl || ''

  } catch (err) {
    auth.clearAuth()
    router.replace('/login')
  } finally {
    loading.value = false
  }
}

onMounted(loadProfile)
onActivated(loadProfile)

const onEdit = () => {
  router.push('/manager/profile/edit')
}

const onLogout = () => {
  auth.clearAuth()   // 🔥 ใช้ store เท่านั้น
  router.push('/login')
}
</script>

<style scoped>
.profile-page {
  background-color: #6ec1ff;
  min-height: 100vh;
  padding: 12px;
  padding-bottom: 72px;
}

.wrapper {
  display: flex;
  justify-content: center;
  margin-top: 96px;
  /* เผื่อ avatar ลอย */
}

.wrapper :deep(.base-card) {
  width: 100%;
  max-width: 360px;
}
</style>
