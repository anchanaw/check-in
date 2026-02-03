<template>
  <div class="edit-profile-page">
    <!-- Header -->
    <div class="top-header">
      <a-button type="text" shape="circle" @click="goBack">
        <ArrowLeftOutlined />
      </a-button>
      <span class="header-title">Edit Profile</span>
    </div>

    <div class="wrapper">
      <BaseCard>
        <EditProfileHeader
          :user="user"
          :avatar="form.avatarPreview"
          @updateAvatar="onAvatarChange"
        />

        <EditProfileForm
          mode="mentor"
          :formData="form"
          @save="onSave"
          @cancel="onCancel"
          @changePassword="onChangePassword"
        />
      </BaseCard>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import { ArrowLeftOutlined } from '@ant-design/icons-vue'

import BaseCard from '~/components/base/BaseCard.vue'
import EditProfileHeader from '~/components/mentor/profile/EditProfileHeader.vue'
import EditProfileForm from '~/components/mentor/profile/EditProfileForm.vue'

/**
 * TODO:
 * - GET /me (mentor)
 * - PUT /me
 */
const user = reactive({
  name: 'Sommai',
  role: 'Mentor · Team Frontend Development'
})

const form = reactive({
  avatar: null,
  avatarPreview: null,

  // account
  username: '',
  email: '',

  // personal
  firstName: '',
  lastName: '',
  gender: '',
  dob: ''
})

onMounted(() => {
  // 🔹 mock data
  form.username = 'sommai.dev'
  form.email = 'sommai@email.com'
  form.firstName = 'Sommai'
  form.lastName = 'Jaidee'
  form.gender = 'Male'
  form.dob = '1995-01-01'
})

const onAvatarChange = (file) => {
  form.avatar = file
  form.avatarPreview = URL.createObjectURL(file)
}

const goBack = () => history.back()

const onSave = (payload) => {
  console.log('save mentor profile:', payload)
  /**
   * TODO:
   * PUT /me
   */
}

const onCancel = () => history.back()

const onChangePassword = () => {
  console.log('change password')
  // TODO: open change password modal
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
