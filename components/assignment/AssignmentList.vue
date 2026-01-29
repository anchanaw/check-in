<template>
  <div class="list">
    <AssignmentItem
      v-for="item in items"
      :key="item.id"
      :data="item"
      @addLabel="$emit('addLabel', item)"
    />

    <a-empty
      v-if="!items.length"
      description="No assignments"
    />
  </div>
</template>

<script setup>
import AssignmentItem from './assignment/AssignmentCard.vue'

defineProps({
  items: {
    type: Array,
    default: () => []
  }
})

defineEmits(['addLabel'])
</script>

<style scoped>
.list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
