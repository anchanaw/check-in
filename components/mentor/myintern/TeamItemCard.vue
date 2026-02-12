<template>
  <div class="team-item" @click="$emit('click')">

    <div class="left">
      <div class="name">{{ team.name }}</div>
      <div class="intern-count">
        {{ team.intern_count }} Interns
      </div>

      <a-tag
        :color="team.invite_active ? 'green' : 'red'"
        class="status"
      >
        {{ team.invite_active ? 'Active Invite Link' : 'Invite Link Disabled' }}
      </a-tag>
    </div>

    <RightOutlined class="arrow" />

  </div>
</template>

<script setup lang="ts">
import { RightOutlined } from '@ant-design/icons-vue'

defineProps<{
  team: {
    id: number
    name: string
    intern_count: number
    invite_active: boolean
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

.intern-count {
  font-size: 13px;
  color: #666;
  margin-bottom: 6px;
}

.status {
  font-size: 12px;
}
</style>
