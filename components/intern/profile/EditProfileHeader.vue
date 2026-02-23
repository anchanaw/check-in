<template>
  <div class="header">
    <div class="avatar">
      <!-- ถ้ามีรูป ให้แสดงรูป -->
      <img v-if="avatar" :src="avatar" class="avatar-img" />

      <!-- ถ้าไม่มีรูป แสดงไอคอน -->
      <UserOutlined v-else class="useroutlined" />

      <!-- edit icon -->
      <EditOutlined class="edit-icon" @click="openFile" />

      <!-- hidden input -->
      <input ref="fileInput" type="file" accept="image/*" class="hidden-input" @change="onChange" />
    </div>


    <div class="name">{{ user.name }}</div>
    <div class="role">{{ user.role }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { UserOutlined, EditOutlined } from '@ant-design/icons-vue'

const { user, avatar } = defineProps<{
  user: {
    name: string
    role: string
  }
  avatar?: string | null
}>()

const emit = defineEmits<{
  (e: 'updateAvatar', file: File): void
}>()

const fileInput = ref<HTMLInputElement | null>(null)

const openFile = () => {
  fileInput.value?.click()
}

const onChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return

  emit('updateAvatar', file)
}
</script>
<style scoped>
.header {
  text-align: center;
  margin-bottom: 12px;
}

.avatar {
  position: relative;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: #fff;
  margin: -80px auto 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}

.edit-icon {
  position: absolute;
  bottom: -2px;
  right: -2px;
  font-size: 14px;
  background: #fff;
  border-radius: 50%;
  cursor: pointer;
}

.hidden-input {
  display: none;
}

.name {
  font-weight: 600;
}

.role {
  font-size: 12px;
  color: #666;
}

.useroutlined {
  font-size: 50px;
  color: #ccc;
}

.avatar-img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
}
</style>
