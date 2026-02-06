<template>
  <div class="mentor-register-page">
  <header class="register-header">
    <div class="top-bar">
      <BackButton class="back-btn"/>
      <div class="title">Create Mentor Account</div>
    </div>
  </header>

  <BaseCard maxWidth="320px">
    <a-form layout="vertical" @finish="onSubmit">

      <a-form-item label="First Name" name="firstName" :rules="req">
        <a-input placeholder="First name" />
      </a-form-item>

      <a-form-item label="Last Name" name="lastName" :rules="req">
        <a-input placeholder="Last name" />
      </a-form-item>

      <a-form-item label="Display Name" name="displayName" :rules="req">
        <a-input placeholder="Display name" />
      </a-form-item>

      <a-form-item label="Email" name="email" :rules="[
        { required: true, message: 'Email is required' },
        { type: 'email', message: 'Invalid email' }
      ]">
        <a-input placeholder="Email" />
      </a-form-item>

      <a-form-item label="Password" name="password" :rules="req">
        <a-input-password placeholder="Password" />
      </a-form-item>

      <a-form-item label="Confirm Password" name="confirmPassword" :rules="[
        { required: true, message: 'Confirm password' },
        { validator: validateConfirm }
      ]">
        <a-input-password placeholder="Confirm password" />
      </a-form-item>

      <a-form-item label="Gender" name="gender">
        <a-select placeholder="Select">
          <a-select-option value="male">Male</a-select-option>
          <a-select-option value="female">Female</a-select-option>
          <a-select-option value="other">Other</a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item label="Date of Birth" name="dob">
        <a-date-picker class="full-width" placeholder="Select date" />
      </a-form-item>

      <a-form-item>
        <a-button html-type="submit" block :loading="loading" class="submit-btn">
          Sign Up
        </a-button>
      </a-form-item>

    </a-form>
  </BaseCard>
  <SuccessModal
  :open="successOpen"
  @close="onSuccessClose"
/>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { navigateTo } from '#app'
import { useAuthApi } from '~/composables/useAuthApi'
import BackButton from '~/components/base/BackButton.vue'
import SuccessModal from '~/components/manager/users/SuccessModal.vue'

definePageMeta({
  layout: 'mobile',
  noPadding: true
})

const { register } = useAuthApi()
const successOpen = ref(false)

/* ===== validation ===== */
const req = [{ required: true, message: 'Required' }]

const validateConfirm =
  ({ getFieldValue }: { getFieldValue: (name: string) => any }) => ({
    validator(_: any, value: any) {
      if (!value || value === getFieldValue('password')) {
        return Promise.resolve()
      }
      return Promise.reject('Passwords do not match')
    }
  })

/* ===== submit ===== */
const loading = ref(false)

const onSubmit = async (values: any) => {
  loading.value = true

  try {
    const payload = {
      email: values.email,
      username: values.email,
      password: values.password,
      first_name: values.firstName,
      last_name: values.lastName,
      display_name: values.displayName,
      gender: values.gender,
      birth_date: values.dob
        ? values.dob.format('YYYY-MM-DD')
        : null
    }

    await register(payload)

    // ✅ เปิด success modal อย่างเดียว
    successOpen.value = true
  } catch (err) {
    alert('Registration failed')
  } finally {
    loading.value = false
  }
}
const onSuccessClose = () => {
  navigateTo('/manager/users/mentor')
}
</script>

<style scoped>
.register-header {
  background: #6CBCFA;
  width: 100%;
}

/* top bar */
.top-bar {
  width: 100%;
  position: relative;
  height: 56px;              /* ความสูง app bar มาตรฐาน */
  display: flex;
  align-items: center;
  justify-content: center;   /* จัด title กลาง */

  padding: 0 48px;           /* เผื่อพื้นที่ซ้าย-ขวา */
  box-sizing: border-box;
}

/* ปุ่ม back ซ้ายบน */
.top-bar :deep(.back-btn) {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
}

/* title กลางจริง */
.title {
  font-size: 20px;
  font-weight: 600;
  text-align: center;
  white-space: nowrap;
}

.mentor-register-page {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* BaseCard */
:deep(.ant-card) {
  margin-top: 16px;      /* ⭐ ช่องว่างระหว่างฟ้ากับการ์ด */
  border-radius: 12px;
}

:deep(.ant-input),
:deep(.ant-input-password),
:deep(.ant-select-selector),
:deep(.ant-picker) {
  height: 40px;
  border-radius: 8px;
}

.submit-btn {
  margin-top: 4px;
  height: 40px;
  border-radius: 8px;
  background: #2b2b2b;
  font-weight: 500;
  color: white;
}

</style>