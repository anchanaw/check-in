<template>
  <div class="rank-row">
    <BaseCard class="rank-card">
      <div class="title">Top Team</div>
      <div v-for="(team, i) in topTeams" :key="i">
        <span class="rank">#{{ i + 1 }}</span> {{ team }}
      </div>
    </BaseCard>

    <BaseCard class="rank-card">
      <div class="title">Top Intern</div>
      <div v-for="(intern, i) in topInterns" :key="i">
        <span class="rank">#{{ i + 1 }}</span> {{ intern }}
      </div>
    </BaseCard>
  </div>
</template>

<script setup lang="ts">
import BaseCard from '@/components/base/BaseCard.vue'

defineProps<{
  topTeams: string[]
  topInterns: string[]
  loading: boolean
}>()
</script>

<style scoped>
.rank-row {
  display: flex;
  gap: 8px;
  margin-top: 12px;
}

.rank-card {
  flex: 1;
}

.title {
  font-weight: 600;
  margin-bottom: 6px;
}

.rank {
  color: #f59e0b;
  margin-right: 4px;
}
</style>
