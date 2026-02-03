<template>
  <a-modal
    :open="open"
    :footer="null"
    centered
    width="360px"
    @cancel="$emit('close')"
  >
    <BaseCard>
      <!-- Header -->
      <div class="modal-header">
        <span>Create Task</span>
        <a-button type="text" size="small" @click="$emit('close')">✕</a-button>
      </div>

      <a-form layout="vertical" @finish="submit">
        <a-form-item label="Task Title">
          <a-input v-model:value="form.title" />
        </a-form-item>

        <a-form-item label="Description">
          <a-textarea v-model:value="form.description" rows="3" />
        </a-form-item>

        <a-form-item label="Bonus">
          <BonusInput v-model="form.bonus" />
        </a-form-item>

        <a-form-item label="Deadline">
          <a-date-picker
            v-model:value="form.deadline"
            picker="month"
            style="width: 100%"
          />
        </a-form-item>

        <a-form-item label="Status">
          <a-switch v-model:checked="form.active" />
        </a-form-item>

        <!-- Actions -->
        <div class="actions">
          <a-button danger @click="$emit('close')">
            Cancel
          </a-button>
          <a-button type="primary" html-type="submit">
            Save Task
          </a-button>
        </div>
      </a-form>
    </BaseCard>
  </a-modal>
</template>

<script setup>
import { reactive, watch } from 'vue'
import BaseCard from '@/components/base/BaseCard.vue'
import BonusInput from './BonusInput.vue'

defineProps({
  open: Boolean
})

const emit = defineEmits(['close', 'save'])

// 🔹 mock form
const form = reactive({
  title: '',
  description: '',
  bonus: 1,
  deadline: null,
  active: true
})

watch(
  () => open,
  (val) => {
    if (val) {
      // reset form when open
      form.title = ''
      form.description = ''
      form.bonus = 1
      form.deadline = null
      form.active = true
    }
  }
)

const submit = () => {
  emit('save', { ...form })
}
</script>

<style scoped>
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
  margin-bottom: 12px;
}

.actions {
  display: flex;
  justify-content: space-between;
  margin-top: 12px;
}
</style>
