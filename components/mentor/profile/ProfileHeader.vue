<template>
  <div class="header">
    <div
      class="avatar"
      :class="{ clickable: editable }"
      @click="editable && triggerUpload()"
    >
      <!-- มีรูป -->
      <img
        v-if="preview"
        :src="preview"
        class="avatar-img"
        alt="avatar"
      />

      <!-- ไม่มีรูป -->
      <UserOutlined v-else class="useroutlined"/>

      <!-- icon edit (เฉพาะโหมดแก้ไข) -->
      <EditOutlined v-if="editable" class="edit-icon" />
    </div>

    <!-- input file (เฉพาะโหมดแก้ไข) -->
    <input
      v-if="editable"
      ref="fileInput"
      type="file"
      accept="image/*"
      hidden
      @change="onFileChange"
    />

    <div class="name">{{ user.name }}</div>
    <div class="role">{{ user.role }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onBeforeUnmount } from 'vue'
import { message } from 'ant-design-vue'
import { UserOutlined, EditOutlined } from '@ant-design/icons-vue'

interface User {
  name: string
  role: string
}

const props = defineProps<{
  user: User
  avatar?: string | null
  editable?: boolean
}>()

const emit = defineEmits<{
  (e: 'updateAvatar', file: File): void
}>()

const preview = ref<string | null>(props.avatar || null)
const fileInput = ref<HTMLInputElement | null>(null)
let objectUrl: string | null = null

/* sync avatar จาก parent */
watch(
  () => props.avatar,
  (val) => {
    preview.value = val || null
  }
)

const triggerUpload = () => {
  fileInput.value?.click()
}

const onFileChange = (e: Event) => {
  const input = e.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return

  // 🔥 ตรวจ type
  if (!file.type.startsWith('image/')) {
    message.error('Please upload an image file')
    return
  }

  // 🔥 ตรวจขนาด (เช่น 2MB)
  if (file.size > 2 * 1024 * 1024) {
    message.error('Image size must be less than 2MB')
    return
  }

  // 🔥 revoke object URL เก่า
  if (objectUrl) {
    URL.revokeObjectURL(objectUrl)
  }

  objectUrl = URL.createObjectURL(file)
  preview.value = objectUrl

  emit('updateAvatar', file)

  // reset input เพื่อให้เลือกไฟล์เดิมซ้ำได้
  input.value = ''
}

onBeforeUnmount(() => {
  if (objectUrl) {
    URL.revokeObjectURL(objectUrl)
  }
})
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
  box-shadow: 0 2px 6px rgba(0,0,0,0.15);
  overflow: hidden;
}

.avatar.clickable {
  cursor: pointer;
}

.avatar-img {
  width: 50px;
  height: 50px;
  object-fit: cover;
}

.edit-icon {
  position: absolute;
  bottom: -2px;
  right: -2px;
  font-size: 14px;
  background: #fff;
  border-radius: 50%;
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
</style>
