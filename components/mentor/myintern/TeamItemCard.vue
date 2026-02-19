<template>
  <div class="team-item" @click="$emit('click')">

    <div class="left">
      <div class="name">{{ team.name }}</div>

      <div class="mentor">
        Mentor: {{ team.mentorName }}
      </div>

      <div class="intern-count">
        {{ team.internTotal }} Interns
      </div>
    </div>

    <RightOutlined class="arrow" />

  </div>
</template>

<script setup lang="ts">
import { RightOutlined } from '@ant-design/icons-vue'

defineProps<{
  team: {
    id: string
    name: string
    mentorName: string
    internTotal: number
  }
}>()
</script>

<style scoped>
.team-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-radius: 12px;
  background: #f4f4f4;
  margin-bottom: 12px;
  cursor: pointer;
  transition: 0.2s ease;
}

.team-item:hover {
  background: #eaeaea;
}

.name {
  font-weight: 600;
}

.mentor {
  font-size: 13px;
  color: #888;
  margin-bottom: 4px;
}

.intern-count {
  font-size: 13px;
  color: #666;
}
</style>
