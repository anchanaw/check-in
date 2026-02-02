<template>
  <a-form layout="vertical" @finish="submit">
    <!-- Description -->
    <a-form-item
      label="Description"
      help="Write a brief description about this entry"
      name="description"
      :rules="[{ required: true, message: 'Please enter description' }]"
    >
      <a-textarea
        v-model:value="form.description"
        placeholder="Value"
        :rows="4"
      />
    </a-form-item>

    <!-- Image -->
    <a-form-item label="Add Image (Optional)">
      <a-upload
        :before-upload="() => false"
        @change="onFileChange"
      >
        <a-button>Choose File</a-button>
      </a-upload>
    </a-form-item>

    <!-- Submit -->
    <a-button
      type="primary"
      block
      html-type="submit"
      class="submit-btn"
    >
      Submit
    </a-button>
  </a-form>
</template>

<script setup>
import { reactive } from 'vue'

const emit = defineEmits(['submit'])

const form = reactive({
  description: '',
  image: null
})

const onFileChange = (info) => {
  form.image = info.file
}

const submit = () => {
  emit('submit', { ...form })
}
</script>

<style scoped>
.submit-btn {
  margin-top: 12px;
}
</style>
