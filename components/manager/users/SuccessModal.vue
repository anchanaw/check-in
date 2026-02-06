<template>
  <a-modal
    :open="open"
    :footer="null"
    centered
    closable
    @cancel="onClose"
  >
    <div class="success-content">
      <div class="success-title">Successful!</div>
      <div class="success-text">You're now a Mentor</div>
    </div>
  </a-modal>
</template>

<script setup lang="ts">
defineProps<{
  open: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const onClose = () => {
  emit('close')
}
</script>

<style scoped>
.success-content {
  text-align: center;
  padding: 24px 16px;
}

.success-title {
  color: #2ecc71;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 4px;
}

.success-text {
  font-size: 14px;
  color: #333;
}
</style>
