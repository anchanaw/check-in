<template>
  <div class="profile-page">
    <div class="wrapper">
      <BaseCard>
        <!-- Avatar + Name -->
        <ProfileHeader :user="user" />

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

<script setup>
import { ref, onMounted } from 'vue'
import BaseCard from '@/components/BaseCard.vue'
import ProfileHeader from '~/components/profile/ProfileHeader.vue'
import ProfileInfoSection from '~/components/profile/ProfileInfoSection.vue'
import ProfileActions from '~/components/profile/ProfileActions.vue'
import BottomBar from '@/components/BottomBar.vue'

/**
 * TODO:
 * - GET /me
 */
const user = ref({
  name: 'Sompong',
  role: 'Intern · Team Frontend Development'
})

const accountInfo = ref([])
const personalInfo = ref([])
const educationInfo = ref([])

onMounted(() => {
  // 🔹 mock data (รอต่อ API)
  accountInfo.value = [
    { label: 'Username', value: 'sompong.dev' },
    { label: 'Email', value: 'sompong@email.com' }
  ]

  personalInfo.value = [
    { label: 'First Name', value: 'Sompong' },
    { label: 'Last Name', value: 'Jaidee' },
    { label: 'Gender', value: 'Male' },
    { label: 'Date of Birth', value: '01/01/2000' }
  ]

  educationInfo.value = [
    { label: 'University', value: 'ABC University' },
    { label: 'Student ID', value: '64123456' }
  ]
})

const onEdit = () => {
  console.log('edit profile')
  // TODO: navigate to /profile/edit
}

const onLeave = () => {
  console.log('request leave')
  // TODO: open leave modal
}

const onLogout = () => {
  console.log('logout')
  // TODO: clear token & redirect
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
