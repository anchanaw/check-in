<template>
  <div class="create-link-page">
    <!-- Header -->
    <div class="top-header">
      <a-button type="text" shape="circle" @click="goBack">
        <BackButton />
      </a-button>
      <span class="header-title">Create Link</span>
    </div>

    <div class="wrapper">
      <BaseCard>
        <CreateLinkForm />
      </BaseCard>
    </div>

    <MentorBottomBar active="profile" />
  </div>
</template>

<script setup>
import BaseCard from '~/components/base/BaseCard.vue'
import CreateLinkForm from '~/components/mentor/invite/CreateLinkForm.vue'
import MentorBottomBar from '@/components/mentor/MentorBottomBar.vue'
import BackButton from '~/components/base/BackButton.vue'

const goBack = () => history.back()
</script>

<style scoped>
.create-link-page {
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
