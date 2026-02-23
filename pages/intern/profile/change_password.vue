<template>
  <div class="change-password-page">
    <!-- Header -->
    <div class="top-header">
        <BackButton/>
      <span class="header-title">Change Password</span>
    </div>

    <div class="wrapper">
      <BaseCard>
        <h3 class="card-title">Change Password</h3>
        <ChangePasswordForm :loading="loading" @submit="handleSubmit" @cancel="goBack" />
      </BaseCard>
    </div>


  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useApi } from '~/composables/core'
import { message } from 'ant-design-vue'
import { ref } from 'vue'

import BaseCard from '~/components/base/BaseCard.vue'
import BackButton from '~/components/base/BackButton.vue'
import ChangePasswordForm from '~/components/mentor/profile/ChangePasswordForm.vue'

const { apiFetch } = useApi()
const router = useRouter()
const loading = ref(false)

const handleSubmit = async (form: {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}) => {
  if (form.newPassword !== form.confirmPassword) {
    message.error('Passwords do not match')
    return
  }

  try {
    loading.value = true

    await apiFetch('/auth/change-password', {
      method: 'POST',
      body: {
        currentPassword: form.currentPassword,
        newPassword: form.newPassword
      }
    })

    message.success('Password changed successfully')

    router.push('/mentor/profile')

  } catch (err: any) {
    message.error(err?.message || 'Failed to change password')
  } finally {
    loading.value = false
  }
}
const goBack = () => {
  router.back()
}
</script>

<style scoped>
.change-password-page {
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

.card-title {
  font-weight: 600;
  margin-bottom: 12px;
}
</style>
