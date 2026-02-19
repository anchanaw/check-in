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
import { message } from 'ant-design-vue'

import BaseCard from '~/components/base/BaseCard.vue'
import EditProfileHeader from '~/components/mentor/profile/EditProfileHeader.vue'
import EditProfileForm from '~/components/mentor/profile/EditProfileForm.vue'
import BackButton from '~/components/base/BackButton.vue'

const { apiFetch } = useApi()
const router = useRouter()

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

/* ------------------ LOAD PROFILE ------------------ */
onMounted(async () => {
  try {
    const res: any = await apiFetch('/auth/me')
    const data = res.data

    user.name = `${data.firstName} ${data.lastName}`

    form.email = data.email
    form.firstName = data.firstName
    form.lastName = data.lastName
    form.gender = data.gender || ''
    form.dob = data.dateOfBirth || ''

    const imgRes: any = await apiFetch('/auth/profile/image-signed-url')
    form.avatarPreview = imgRes.data?.url || null

  } catch {
    message.error('Session expired')
    router.push('/login')
  }
})

/* ------------------ AVATAR CHANGE ------------------ */
const onAvatarChange = (file: File) => {
  form.avatar = file
  form.avatarPreview = URL.createObjectURL(file)
  console.log('preview url:', form.avatarPreview)
}

/* ------------------ SAVE ------------------ */
const onSave = async (payload: any) => {
  console.log('payload:', payload)
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

    if (form.avatar) {
      const toBase64 = (file: File) =>
        new Promise<string>((resolve, reject) => {
          const reader = new FileReader()
          reader.readAsDataURL(file)
          reader.onload = () => resolve(reader.result as string)
          reader.onerror = error => reject(error)
        })

      if (form.avatar) {
        const base64 = await toBase64(form.avatar)

        await apiFetch('/auth/profile/image', {
          method: 'POST',
          body: {
            image: base64
          }
        })
      }
    }

    message.success('Profile updated successfully')
    await apiFetch('/auth/profile/image-signed-url')
    router.push('/mentor/profile')

  } catch {
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
