<template>
  <a-space direction="vertical" size="middle" style="width:100%">
    <a-skeleton v-if="loading" active />

    <template v-else>
      <BonusTaskItem
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        @review="$emit('review', task)"
      />

      <a-empty
        v-if="!tasks.length"
        description="No bonus tasks"
      />
    </template>
  </a-space>
</template>

<script setup>
import BonusTaskItem from '@/components/mentor/BonusTaskItem.vue'

defineProps({
  loading: Boolean,
  tasks: Array
})

defineEmits(['review'])
</script>
