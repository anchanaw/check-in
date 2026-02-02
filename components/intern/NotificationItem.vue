<template>
  <a-card class="noti-card">
    <div class="card-content">
      <!-- Icon -->
      <div class="icon">
        <InfoCircleOutlined />
      </div>

      <!-- Text -->
      <div class="text">
        <div class="card-title">{{ data.title }}</div>
        <div class="card-body">{{ data.body }}</div>

        <a-button
          size="small"
          class="detail-btn"
          @click="$emit('detail', data)"
        >
          Detail
        </a-button>
      </div>

      <!-- Remove -->
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

<script setup>
import { InfoCircleOutlined } from '@ant-design/icons-vue'

defineProps({
  data: {
    type: Object,
    required: true
  }
})

defineEmits(['detail', 'remove'])
</script>

<style scoped>
.noti-card {
  border-radius: 12px;
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
  margin-bottom: 8px;
}

.detail-btn {
  padding: 0;
}
</style>
