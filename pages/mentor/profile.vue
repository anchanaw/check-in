<template>
  <div class="profile-page">
    <div class="wrapper">
      <BaseCard>
        <!-- Avatar + Name -->
        <ProfileHeader :user="user" />

        <!-- Info sections -->
        <ProfileInfoSection
          title="Account Information"
          :items="accountInfo"
        />

        <ProfileInfoSection
          title="Personal Information"
          :items="personalInfo"
        />

        <!-- Actions (Mentor) -->
        <ProfileActions
          mode="mentor"
          @edit="onEdit"
          @invite="onInvite"
          @logout="onLogout"
        />
      </BaseCard>
    </div>

    <MentorBottomBar active="profile" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import BaseCard from '~/components/base/BaseCard.vue'
import ProfileHeader from '~/components/mentor/profile/ProfileHeader.vue'
import ProfileInfoSection from '~/components/mentor/profile/ProfileInfoSection.vue'
import ProfileActions from '~/components/mentor/profile/ProfileActions.vue'
import MentorBottomBar from '@/components/mentor/MentorBottomBar.vue'

/**
 * TODO:
 * - GET /me (mentor)
 */
const user = ref({
  name: 'Sommai',
  role: 'Mentor · Team Frontend Development'
})

const accountInfo = ref([])
const personalInfo = ref([])

onMounted(() => {
  // 🔹 mock data
  accountInfo.value = [
    { label: 'Username', value: 'sommai.dev' },
    { label: 'Email', value: 'sommai@email.com' }
  ]

  personalInfo.value = [
    { label: 'First Name', value: 'Sommai' },
    { label: 'Last Name', value: 'Jaidee' },
    { label: 'Gender', value: 'Male' },
    { label: 'Date of Birth', value: '01/01/1995' }
  ]
})

const onEdit = () => {
  console.log('edit profile')
  // TODO: navigate to /mentor/profile/edit
}

const onInvite = () => {
  console.log('invite intern')
  // TODO: open invite modal
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
  margin-top: 96px; /* เผื่อ avatar ลอย */
}

.wrapper :deep(.base-card) {
  width: 100%;
  max-width: 360px;
}
</style>

