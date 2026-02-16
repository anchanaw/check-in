<template>
  <!-- overlay -->
  <div v-if="open" class="popup-overlay">
    <!-- popup -->
    <div class="popup-card">
      <!-- header -->
      <div class="popup-header">
        <span>Create Task</span>
        <button class="close-btn" @click="close">✕</button>
      </div>

      <!-- body -->
      <div class="popup-body">
        <a-form layout="vertical" @finish="submit">
          <a-form-item label="Task Title" name="title" required>
            <a-input v-model:value="form.title" />
          </a-form-item>

          <a-form-item label="Description" name="description">
            <a-textarea v-model:value="form.description" rows="3" />
          </a-form-item>

          <a-form-item label="Bonus" name="bonus">
            <BonusInput v-model="form.bonus" />
          </a-form-item>

          <a-form-item label="Deadline" name="deadline">
            <a-date-picker v-model:value="form.deadline" picker="month" style="width: 100%" input-read-only />
          </a-form-item>

          <a-form-item label="Status" name="active">
            <StatusSwitch v-model="form.active" />
          </a-form-item>

          <div class="actions">
            <a-button class="btn-cancel" @click="close">
              Cancel
            </a-button>

            <!-- 🔥 ต้องมี html-type="submit" และ type="primary" -->
            <a-button type="primary" class="btn-save" html-type="submit">
              Save Task
            </a-button>
          </div>
        </a-form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue'
import BonusInput from './BonusInput.vue'
import StatusSwitch from '@/components/base/StatusSwitch.vue'
import dayjs from 'dayjs'

defineProps<{
  open: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'save', payload: any): void
}>()

const form = reactive({
  title: '',
  description: '',
  bonus: 1,
  deadline: null as any,
  active: true
})

watch(
  () => open,
  (val) => {
    if (val()) {
      form.title = ''
      form.description = ''
      form.bonus = 1
      form.deadline = null
      form.active = true
    }
  }
)

const close = () => emit('close') 

const submit = () => {
  const payload = {
    title: form.title,
    description: form.description,
    points: form.bonus,          
    isBonus: form.active,        
    deadline: form.deadline
      ? dayjs(form.deadline).toISOString()
      : null
  }

  console.log('Final Payload:', payload)

  emit('save', payload)
  close()
}

</script>

<style scoped>
/* overlay */
.popup-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

/* card */
.popup-card {
  width: 360px;
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
}

/* header */
.popup-header {
  background: #9ec3df;
  text-align: center;
  font-weight: 600;
  padding: 10px 12px;
  position: relative;
}

.close-btn {
  position: absolute;
  right: 10px;
  top: 6px;
  background: transparent;
  border: none;
  font-size: 18px;
  cursor: pointer;
}

/* body */
.popup-body {
  padding: 12px;
}

/* actions */
.actions {
  display: flex;
  gap: 12px;
  margin-top: 14px;
}

.btn-cancel {
  flex: 1;
  height: 36px;
  border-radius: 8px;
  background: #ff5a5a;
  color: #fff;
  border: none;
}

.btn-save {
  flex: 1;
  height: 36px;
  border-radius: 8px;
  background: #74c3ff;
  color: #fff;
  border: none;
}

/* ===== SWITCH FIX ===== */

/* กัน a-form-item มายุ่ง layout */
.switch-wrapper {
  display: flex;
  align-items: center;
  height: 22px;
}

/* ตัว switch */
:deep(.status-switch.ant-switch) {
  width: 36px;
  min-width: 36px;
  height: 18px;
  line-height: 18px;
  padding: 0;

  background: #d1d5db;
  border-radius: 999px;
}

/* ตอนเปิด */
:deep(.status-switch.ant-switch-checked) {
  background: #1e6fff;
}

/* ตัวทำให้อ้วน → ปิด */
:deep(.status-switch .ant-switch-inner) {
  display: none;
  padding: 0;
}

/* ปุ่มกลม */
:deep(.status-switch .ant-switch-handle) {
  width: 14px;
  height: 14px;
  top: 2px;
  left: 2px;
}

:deep(.status-switch .ant-switch-handle::before) {
  background: #fff;
  border-radius: 50%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);
}

/* เลื่อนตอนเปิด */
:deep(.status-switch.ant-switch-checked .ant-switch-handle) {
  left: calc(100% - 16px);
}
</style>
