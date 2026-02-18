<template>
  <div class="profile-page">
    <div class="wrapper">
      <BaseCard v-if="user">
        <ProfileHeader :user="user" :avatar="avatarUrl" editable @updateAvatar="uploadAvatar" />

        <ProfileInfoSection title="Account Information" :items="accountInfo" />

        <ProfileInfoSection title="Personal Information" :items="personalInfo" />

        <ProfileActions mode="mentor" @edit="onEdit" @logout="onLogout" />

      </BaseCard>
      <a-skeleton v-else active />

    </div>

    <MentorBottomBar active="profile" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useApi } from '~/composables/core'

import BaseCard from '~/components/base/BaseCard.vue'
import ProfileHeader from '~/components/mentor/profile/ProfileHeader.vue'
import ProfileInfoSection from '~/components/mentor/profile/ProfileInfoSection.vue'
import ProfileActions from '~/components/mentor/profile/ProfileActions.vue'
import MentorBottomBar from '@/components/mentor/MentorBottomBar.vue'

const { apiFetch } = useApi()
const router = useRouter()

interface Mentor {
  id: string
  email: string
  role: 'mentor'
  firstName: string
  lastName: string
  gender?: string
  dateOfBirth?: string
}

const loading = ref(true)
const user = ref<any>(null)
const avatarUrl = ref<string>('')
const accountInfo = ref<any[]>([])
const personalInfo = ref<any[]>([])

const uploadAvatar = async (file: File) => {
  const formData = new FormData()
  formData.append('avatar', file)

  await apiFetch('/users/avatar', {
    method: 'PATCH',
    body: formData
  })
}

onMounted(async () => {
  try {
    const res = await apiFetch('/auth/me') as { data: Mentor }
    const data = res.data

    // 🔥 ป้องกัน role ผิด
    if (data.role !== 'mentor') {
      router.replace('/')
      return
    }

    user.value = {
      name: `${data.firstName} ${data.lastName}`,
      role: 'Mentor'
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

  } catch (err) {
    console.error('Profile error:', err)
    router.replace('/login')
  } finally {
    loading.value = false
  }
})

const onEdit = () => {
  router.push('/mentor/profile/edit')
}

const onLogout = () => {
  localStorage.removeItem('access_token')
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
