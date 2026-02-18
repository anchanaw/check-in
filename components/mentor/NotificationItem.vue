<template>
  <a-card
    class="noti-card"
    :class="{ unread }"
  >
    <div class="card-content">
      <div class="icon">
        <component :is="iconComponent" />
      </div>

      <div class="text">
        <div class="card-title">{{ data.title }}</div>
        <div class="card-body">{{ data.body }}</div>

        <a-button
          size="small"
          class="detail-btn"
          type="link"
          @click="$emit('detail', data)"
        >
          Detail
        </a-button>
      </div>

      <a-button
        type="text"
        danger
        @click="$emit('remove', data.id)"
      >
        ✕
      </a-button>
    </div>
  </a-card>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { BellOutlined, FileTextOutlined } from '@ant-design/icons-vue'

const props = defineProps<{
  data: any
  unread: boolean
}>()

const iconComponent = computed(() => {
  if (props.data.type === 'task') return FileTextOutlined
  return BellOutlined
})
</script>


<style scoped>
.noti-card {
  border-radius: 8px;
  margin-bottom: 8px;
}

.noti-card :deep(.ant-card-body) {
  padding: 11px 16px;
}

.noti-card.unread {
  background-color: #eef5ff;
}

.card-content {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.icon {
  font-size: 20px;
  margin-top: 4px;
}

.text {
  flex: 1;
}

.card-title {
  font-weight: 600;
}

.card-body {
  font-size: 13px;
  color: #555;
  margin-bottom: 6px;
}

.detail-btn {
  padding: 0;
}
</style>
