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

<script setup lang="ts">
import BonusTaskItem from '@/components/mentor/bonus/BonusTaskItem.vue'

interface BonusTask {
  id: string
  internName: string
  taskTitle: string
  bonusPoint: number
  content?: string
  submittedAt?: string
}

defineProps<{
  loading: boolean
  tasks: BonusTask[]
}>()

defineEmits<{
  (e: 'review', task: BonusTask): void
}>()
</script>
