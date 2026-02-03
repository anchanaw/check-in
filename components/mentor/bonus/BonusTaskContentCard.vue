<template>
  <BaseCard>
    <a-skeleton v-if="loading" active />

    <div v-else>
      <a-typography-text strong>Descriptions</a-typography-text>
      <p class="desc">{{ task.description }}</p>

      <a-typography-text strong>Image</a-typography-text>
      <img
        v-if="task.imageUrl"
        :src="task.imageUrl"
        class="image"
      />
    </div>
  </BaseCard>
</template>

<script setup>
import BaseCard from '@/components/base/BaseCard.vue'
defineProps({ task: Object, loading: Boolean })
</script>

<style scoped>
.desc {
  font-size: 13px;
  margin: 8px 0 12px;
}
.image {
  width: 120px;
  border-radius: 8px;
}
</style>
