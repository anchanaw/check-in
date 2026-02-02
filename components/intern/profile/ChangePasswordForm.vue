<template>
  <a-form layout="vertical" @finish="submit">
    <a-form-item
      label="Current Password"
      name="currentPassword"
      :rules="[{ required: true, message: 'Please enter current password' }]"
    >
      <a-input-password v-model:value="form.currentPassword" />
    </a-form-item>

    <a-form-item
      label="New Password"
      name="newPassword"
      :rules="[
        { required: true, message: 'Please enter new password' },
        { min: 8, message: 'Must contain at least 8 characters' }
      ]"
      extra="must contain 8 char."
    >
      <a-input-password v-model:value="form.newPassword" />
    </a-form-item>

    <a-form-item
      label="Confirm Password"
      name="confirmPassword"
      :rules="[{ validator: validateConfirm }]"
    >
      <a-input-password v-model:value="form.confirmPassword" />
    </a-form-item>

    <a-button type="primary" block html-type="submit">
      Update Password
    </a-button>

    <a-button block danger class="mt" @click="$emit('cancel')">
      Cancel
    </a-button>
  </a-form>
</template>

<script setup>
import { reactive } from 'vue'

const emit = defineEmits(['submit', 'cancel'])

const form = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const validateConfirm = async (_rule, value) => {
  if (value !== form.newPassword) {
    return Promise.reject('Passwords do not match')
  }
  return Promise.resolve()
}

const submit = () => {
  emit('submit', {
    currentPassword: form.currentPassword,
    newPassword: form.newPassword
  })
}
</script>

<style scoped>
.mt {
  margin-top: 8px;
}
</style>
