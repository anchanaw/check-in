<template>
  <a-form layout="vertical" :model="form" @finish="submit">
    <!-- Description -->
    <a-form-item label="Description" name="content" :rules="[
      { required: true, message: 'Please enter description', trigger: ['blur', 'change'] }
    ]">
      <a-textarea v-model:value="form.content" placeholder="Value" :rows="4" />
    </a-form-item>

    <!-- Image -->
    <a-form-item label="Add Image (Optional)">
      <a-upload :before-upload="() => false" @change="onFileChange">
        <a-button>Choose File</a-button>
      </a-upload>
    </a-form-item>

    <!-- Submit -->
    <a-button type="primary" block html-type="submit" class="submit-btn">
      Submit
    </a-button>
  </a-form>
</template>

<script setup>
import { reactive } from 'vue'

const emit = defineEmits(['submit'])

const form = reactive({
  content: '',
  file: null   // 🔥 เปลี่ยน image → file
})

const onFileChange = (info) => {
  form.file = info.file.originFileObj
}

const submit = () => {
  emit('submit', {
    content: form.content
  })
}
</script>

<style scoped>
.submit-btn {
  margin-top: 12px;
}
</style>
