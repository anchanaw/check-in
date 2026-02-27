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

        <EditProfileForm :formData="form" :editableFields="editableFields" @save="onSave" @cancel="onCancel" />
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
import EditProfileHeader from '~/components/manager/profile/EditProfileHeader.vue'
import EditProfileForm from '~/components/manager/profile/EditProfileForm.vue'
import BackButton from '~/components/base/BackButton.vue'

const { apiFetch } = useApi()
const router = useRouter()
const editableFields = ['firstName', 'lastName', 'gender', 'dob'] as const

const user = reactive({
  name: '',
  role: 'Manager'
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
const initialForm = reactive({
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
    form.dob = data.dateOfBirth
      ? new Date(data.dateOfBirth).toISOString().split('T')[0]!
      : ''
    initialForm.firstName = form.firstName
    initialForm.lastName = form.lastName
    initialForm.gender = form.gender
    initialForm.dob = form.dob

    const imgRes: any = await apiFetch('/auth/profile/image-signed-url')
    form.avatarPreview = imgRes.data?.signedUrl || imgRes.data?.url || null

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
    const hasAvatarChange = !!form.avatar
    const body: Record<string, any> = {}

    if (payload.firstName !== initialForm.firstName) {
      body.firstName = payload.firstName ?? ''
    }
    if (payload.lastName !== initialForm.lastName) {
      body.lastName = payload.lastName ?? ''
    }
    if ((payload.gender || '') !== initialForm.gender) {
      body.gender = payload.gender || null
    }
    if ((payload.dob || '') !== initialForm.dob) {
      body.dateOfBirth = payload.dob
        ? new Date(payload.dob).toISOString()
        : null
    }

    if (Object.keys(body).length > 0) {
      await apiFetch('/auth/profile', {
        method: 'PATCH',
        body
      })

      initialForm.firstName = payload.firstName ?? ''
      initialForm.lastName = payload.lastName ?? ''
      initialForm.gender = payload.gender || ''
      initialForm.dob = payload.dob || ''
    }

    if (form.avatar) {
  const formData = new FormData()
  formData.append("file", form.avatar)

  await apiFetch('/auth/profile/image', {
    method: 'POST',
    body: formData
  })

  form.avatar = null
}

    if (Object.keys(body).length === 0 && !hasAvatarChange) {
      message.info('No changes to save')
      return
    }

    message.success('Profile updated successfully')
    await apiFetch('/auth/profile/image-signed-url')
    router.push('/manager/profile')

  } catch (err) {
    message.error('Failed to update profile')
  }
}

const onCancel = () => router.back()

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
