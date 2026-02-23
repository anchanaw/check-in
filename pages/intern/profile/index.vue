<template>
  <div class="profile-page">
    <div class="wrapper">
      <BaseCard v-if="user">
        <!-- Avatar + Name -->
        <ProfileHeader :user="user" :avatar="avatarUrl" />

        <!-- Info sections -->
        <ProfileInfoSection title="Account Information" :items="accountInfo" />
        <ProfileInfoSection title="Personal Information" :items="personalInfo" />
        <ProfileInfoSection title="Education" :items="educationInfo" />

        <!-- Actions -->
        <ProfileActions
          @edit="onEdit"
          @leave="onLeave"
          @logout="onLogout"
        />
      </BaseCard>
    </div>

    <BottomBar active="profile" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onActivated } from 'vue'
import { useRouter } from 'vue-router'
import { useApi } from '~/composables/core'
import { useAuthStore } from '~/stores/auth.store'
import dayjs from 'dayjs'

import BaseCard from '~/components/base/BaseCard.vue'
import ProfileHeader from '~/components/intern/profile/ProfileHeader.vue'
import ProfileInfoSection from '~/components/intern/profile/ProfileInfoSection.vue'
import ProfileActions from '~/components/intern/profile/ProfileActions.vue'
import BottomBar from '@/components/intern/BottomBar.vue'

const { apiFetch } = useApi()
const router = useRouter()
const auth = useAuthStore()

interface MeResponse {
  success: boolean
  data: {
    id: string
    email: string
    role: string
    firstName: string
    lastName: string
    gender?: string
    dateOfBirth?: string
    studentId?: string
    university?: string
  }
}

const loading = ref(true)
const avatarUrl = ref('')
const user = ref<any>(null)

const accountInfo = ref<any[]>([])
const personalInfo = ref<any[]>([])
const educationInfo = ref<any[]>([])

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
    if (!auth.access_token) return

    loading.value = true

    const res = await apiFetch<MeResponse>('/auth/me')
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
          ? dayjs(data.dateOfBirth).format('DD/MM/YYYY')
          : '-'
      }
    ]

    educationInfo.value = [
      { label: 'University', value: data.university || '-' },
      { label: 'Student ID', value: data.studentId || '-' }
    ]

    // โหลด avatar (กันพัง)
    try {
      const imgRes = await apiFetch<any>('/auth/profile/image-signed-url')
      avatarUrl.value = imgRes?.data?.signedUrl || ''
    } catch {
      avatarUrl.value = ''
    }

  } catch (err) {
    console.error('Intern profile load error:', err)
  } finally {
    loading.value = false
  }
}

onMounted(loadProfile)
onActivated(loadProfile)

const onEdit = () => {
  router.push('/intern/profile/edit')
}

const onLeave = () => {
  router.push('/intern/leave')
}

const onLogout = () => {
  auth.clearAuth()
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
  margin-top: 80px;
}

.wrapper :deep(.base-card) {
  width: 100%;
  max-width: 360px;
}
</style>
