<template>
  <a-form layout="vertical" @finish="submit">
    <!-- Account -->
    <Section title="Account Information">
      <a-form-item label="Username">
        <a-input v-model:value="form.username" />
      </a-form-item>

      <a-form-item label="Email">
        <a-input v-model:value="form.email" />
      </a-form-item>

      <!-- Change Password -->
      <a-button block class="change-password" html-type="button" @click="goChangePassword">
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

      <a-form-item label="Gender">
        <a-input v-model:value="form.gender" />
      </a-form-item>

      <a-form-item label="Date of Birth">
        <a-input type="date" v-model:value="form.dob" />
      </a-form-item>
    </Section>

    <!-- Education -->
    <Section title="Education">
      <a-form-item label="University">
        <a-input v-model:value="form.university" />
      </a-form-item>

      <a-form-item label="Student ID">
        <a-input v-model:value="form.studentId" />
      </a-form-item>
    </Section>

    <!-- Actions -->
    <a-button type="primary" block html-type="submit" class="save-btn">
      Save Changes
    </a-button>

    <!-- Cancel -->
    <a-button block danger html-type="button" class="cancel-btn" @click="$emit('cancel')">
      Cancel
    </a-button>

  </a-form>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue'
import { useRouter } from 'vue-router'
import type { PropType } from 'vue'

const router = useRouter()

const goChangePassword = () => {
  navigateTo('/intern/change_password')
}

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

// ✅ local form state (ปลอดภัย)
const form = reactive<Record<string, any>>({
  username: '',
  email: '',
  firstName: '',
  lastName: '',
  gender: '',
  dob: '',
  university: '',
  studentId: ''
})

// ✅ sync props → form
watch(
  () => props.formData,
  (val) => {
    if (val) {
      Object.assign(form, val)
    }
  },
  { immediate: true }
)

const submit = () => {
  emit('save', { ...form })
}
</script>

<style scoped>
.change-password {
  background: #7a6fd1;
  color: #fff;
  margin-bottom: 12px;
}

.save-btn {
  margin-top: 12px;
}

.cancel-btn {
  margin-top: 8px;
}
</style>
