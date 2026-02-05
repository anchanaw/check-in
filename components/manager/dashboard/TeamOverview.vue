<template>
  <BaseCard>
    <div class="title">Team Overview</div>

    <a-skeleton v-if="loading" active />

    <template v-else>
      <div class="item">
        👤 {{ mostInternTeam }}
        <small>Team with most intern</small>
      </div>

      <div class="item">
        💼 {{ newestTeam }}
        <small>Newest Team</small>
      </div>
    </template>
  </BaseCard>
</template>

<script setup lang="ts">
import BaseCard from '@/components/base/BaseCard.vue'

defineProps<{
  mostInternTeam: string
  newestTeam: string
  loading: boolean
}>()
</script>

<style scoped>
.title {
  font-weight: 600;
  margin-bottom: 8px;
}

.item {
  margin-bottom: 6px;
}

small {
  display: block;
  font-size: 11px;
  color: #999;
}
</style>
