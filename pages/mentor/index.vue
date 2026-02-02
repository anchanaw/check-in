<template>
  <div class="page">
    <!-- Header -->
    <div class="header">
      <div>
        <h1>Hi, Sommai</h1>
        <p>Mentor · Team Frontend Development</p>
      </div>
      <span class="bell">🔔</span>
    </div>

    <OverviewCard />
    <ActionCard class="mt" />

    <BottomBar />
  </div>
</template>

<script setup>
import OverviewCard from '@/components/mentor/dashboard/OverviewCard.vue'
import ActionCard from '@/components/mentor/dashboard/ActionCard.vue'
import BottomBar from '@/components/mentor/MentorBottomBar.vue'
</script>

<style scoped>
.page {
  min-height: 100vh;
  padding: 16px 16px 80px;
  background: #79c3f6;
}

.header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
}

.header h1 {
  margin: 0;
  font-size: 24px;
}

.header p {
  margin: 4px 0 0;
  font-size: 14px;
}

.bell {
  font-size: 20px;
}

.mt {
  margin-top: 16px;
}
</style>
