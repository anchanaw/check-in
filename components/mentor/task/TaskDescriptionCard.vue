<template>
  <BaseCard>

    <div class="section">
      <div class="section-title">Descriptions</div>
      <div class="text">
        {{ task.description }}
      </div>
    </div>

    <div class="section" v-if="task.image">
      <div class="section-title">Image</div>
      <img :src="task.image" class="image" />
    </div>

    <div class="section" v-if="task.note">
      <div class="section-title">Note</div>
      <div class="text">{{ task.note }}</div>
    </div>

  </BaseCard>
</template>

<script setup lang="ts">
import BaseCard from '@/components/base/BaseCard.vue'
defineProps<{ task: any }>()
</script>

<style scoped>
.section {
  margin-bottom: 12px;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 6px;
}

.text {
  font-size: 16px;
  color: #333;
}

.image {
  width: 100px;
  border-radius: 10px;
}
</style>
