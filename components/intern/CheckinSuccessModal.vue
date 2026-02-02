<template>
  <a-modal
    :open="open"
    :footer="null"
    centered
    closable="false"
    width="300px"
  >
    <div class="modal success">
      <CheckCircleFilled class="icon" />
      <h3>Check-in Successful!</h3>
      <p>You are within the allowed area</p>

      <a-button
        type="primary"
        class="ok-btn"
        @click="$emit('close')"
      >
        OK
      </a-button>
    </div>
  </a-modal>
</template>

<script setup>
import { CheckCircleFilled } from '@ant-design/icons-vue'

defineProps({
  open: Boolean
})

defineEmits(['close'])
</script>

<style scoped>
.modal {
  text-align: center;
  padding: 12px 0;
}

.success {
  color: #16a34a;
}

.icon {
  font-size: 48px;
  margin-bottom: 8px;
}

.ok-btn {
  margin-top: 12px;
  background: #16a34a;
  border-color: #16a34a;
}
</style>
