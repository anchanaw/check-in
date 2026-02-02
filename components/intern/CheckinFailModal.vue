<template>
  <a-modal
    :open="open"
    :footer="null"
    centered
    closable="false"
    width="300px"
  >
    <div class="modal fail">
      <CloseCircleFilled class="icon" />
      <h3>Check-in Fail!</h3>
      <p>You are outside the allowed area</p>

      <a-button
  class="ok-btn danger-btn"
  @click="$emit('close')"
>
  OK
</a-button>
    </div>
  </a-modal>
</template>

<script setup>
import { CloseCircleFilled } from '@ant-design/icons-vue'

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

.fail {
  color: #dc2626;
}

.icon {
  font-size: 48px;
  margin-bottom: 8px;
}

.ok-btn {
  margin-top: 12px;
  max-width: 62px;
  width: 100%;
}

.danger-btn {
  background-color: #dc2626;
  border-color: #dc2626;
  color: #ffffff;
}

.danger-btn:hover,
.danger-btn:focus {
  background-color: #b91c1c;
  border-color: #b91c1c;
  color: #ffffff;
}

</style>
