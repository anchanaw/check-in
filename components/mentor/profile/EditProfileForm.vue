<template>
  <a-form layout="vertical" :model="form" @finish="submit">
    <Section title="Account Information">

      <!-- Change Password -->
      <a-button block class="change-password" html-type="button" @click="goChangePassword">
        <img src="/icons/unlock.svg" class="btn-icon" />
        Change Password
      </a-button>
    </Section>

    <!-- Personal -->
    <Section title="Personal Information">
      <a-form-item label="First Name">
        <a-input v-model:value="form.firstName" />
      </a-form-item>

      <a-form-item label="Last Name">
        <a-input v-model:value="form.lastName" />
      </a-form-item>

      <a-form-item label="Gender" name="gender">
        <a-select v-model:value="form.gender" placeholder="Select gender" allow-clear>
          <a-select-option value="male">Male</a-select-option>
          <a-select-option value="female">Female</a-select-option>
          <a-select-option value="other">Other</a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item label="Date of Birth">
        <a-input type="date" v-model:value="form.dob" :max="today" />
      </a-form-item>

    </Section>

    <!-- Actions -->
    <a-button type="primary" block html-type="submit" class="save-btn">
      Save Changes
    </a-button>

    <a-button block danger html-type="button" class="cancel-btn" @click="$emit('cancel')">
      Cancel
    </a-button>
  </a-form>
</template>

<script setup lang="ts">
import { reactive, watch, ref, computed } from 'vue'
import type { PropType } from 'vue'

const goChangePassword = () => {
  navigateTo('/mentor/change_password')
}

const today = computed(() => {
  const now = new Date()
  return now.toISOString().split('T')[0]
})
const props = defineProps({
  formData: {
    type: Object as PropType<Record<string, any>>,
    required: false,
    default: () => ({})
  }
})

const emit = defineEmits<{
  save: [data: Record<string, any>]
  cancel: []
}>()

// ✅ local form state
const form = reactive<Record<string, any>>({
  username: '',
  email: '',
  firstName: '',
  lastName: '',
  gender: '',
  dob: ''
})

// ✅ sync props → form
watch(
  () => props.formData,
  (val) => {
    if (val) Object.assign(form, val)
  },
  { immediate: true }
)

const submit = () => {
  emit('save', { ...form })
}
</script>

<style scoped>
.change-password {
  background: #A5E2FE;
  color: #000000;
  font-size: 16px;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.btn-icon {
  width: 16px;
  height: 16px;
}

.save-btn {
  margin-top: 12px;
}

.cancel-btn {
  margin-top: 8px;
}
</style>
