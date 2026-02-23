<template>
  <div class="edit-profile-page">
    <!-- Header -->
    <div class="top-header">
      <BackButton />
      <span class="header-title">Edit Profile</span>
    </div>

    <div class="wrapper">
      <BaseCard>
        <EditProfileHeader :user="user" :avatar="form.avatarPreview" @updateAvatar="onAvatarChange" />
        <EditProfileForm :formData="form" @save="onSave" @cancel="onCancel" @changePassword="onChangePassword" />
      </BaseCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useApi } from '~/composables/core'
import { useAuthStore } from '~/stores/auth.store'
import { message } from 'ant-design-vue'

import BaseCard from '~/components/base/BaseCard.vue'
import EditProfileHeader from '~/components/mentor/profile/EditProfileHeader.vue'
import EditProfileForm from '~/components/mentor/profile/EditProfileForm.vue'
import BackButton from '~/components/base/BackButton.vue'

const { apiFetch } = useApi()
const router = useRouter()
const auth = useAuthStore()

const user = reactive({
  name: '',
  role: 'Mentor'
})

const form = reactive({
  avatar: null as File | null,
  avatarPreview: null as string | null,
  email: '',
  firstName: '',
  lastName: '',
  gender: '',
  dob: ''
})

interface MeResponse {
  success: true
  data: {
    id: string
    email: string
    role: string
    firstName: string
    lastName: string
    gender?: string | null
    dateOfBirth?: string | null
    profileImageUrl?: string | null
    studentId?: string | null
    university?: string | null
  }
}
/* ------------------ LOAD PROFILE ------------------ */
onMounted(async () => {
  try {
    // 🔥 กันกรณี token ยังไม่ sync
    if (!auth.access_token) return

    const res = await apiFetch<MeResponse>('/auth/me')
    const data = res.data!
    const dob = data.dateOfBirth

    user.name = `${data.firstName} ${data.lastName}`

    form.email = data.email
    form.firstName = data.firstName
    form.lastName = data.lastName
    form.gender = data.gender || ''
    if (dob) {
      form.dob = new Date(dob)
        .toISOString()
        .split('T')[0]!
    } else {
      form.dob = ''
    }
    // 🔥 โหลดรูปแบบแยก try
    try {
      const imgRes = await apiFetch<any>('/auth/profile/image-signed-url')
      form.avatarPreview =
        imgRes?.data?.signedUrl || imgRes?.data?.url || null
    } catch {
      form.avatarPreview = null
    }

  } catch (err) {
    console.error('Edit profile load error:', err)
    // ❌ ไม่ redirect เอง
    // useApi จะ handle 401 ให้
  }
})

/* ------------------ AVATAR CHANGE ------------------ */
const onAvatarChange = (file: File) => {
  form.avatar = file
  form.avatarPreview = URL.createObjectURL(file)
}

/* ------------------ SAVE ------------------ */
const onSave = async (payload: any) => {
  try {
    await apiFetch('/auth/profile', {
      method: 'PATCH',
      body: {
        firstName: payload.firstName,
        lastName: payload.lastName,
        gender: payload.gender,
        ...(payload.dob && {
          dateOfBirth: new Date(payload.dob).toISOString()
        })
      }
    })

    // 🔥 upload avatar ถ้ามี
    if (form.avatar) {
      const formData = new FormData()
      formData.append('file', form.avatar)

      await apiFetch('/auth/profile/image', {
        method: 'POST',
        body: formData
      })
    }

    message.success('Profile updated successfully')
    router.push('/mentor/profile')

  } catch (err) {
    console.error('Update profile error:', err)
    message.error('Failed to update profile')
  }
}

const onCancel = () => router.back()

const onChangePassword = () => {
  router.push('/mentor/change_password')
}
</script>

<style scoped>
.edit-profile-page {
  background-color: #6ec1ff;
  min-height: 100vh;
  padding-bottom: 72px;
}

.top-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px;
}

.header-title {
  font-weight: 600;
}

.wrapper {
  display: flex;
  justify-content: center;
  padding: 0 12px;
}

.wrapper :deep(.base-card) {
  width: 100%;
  max-width: 360px;
}
</style>
