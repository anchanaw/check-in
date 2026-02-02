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

<script setup>
import { ref, watch } from 'vue'
import { UserOutlined, EditOutlined } from '@ant-design/icons-vue'

const props = defineProps({
  user: {
    type: Object,
    required: true
  },
  avatar: {
    type: String,
    default: null
  },
  editable: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['updateAvatar'])

const preview = ref(props.avatar)
const fileInput = ref(null)

/* sync avatar จาก parent */
watch(
  () => props.avatar,
  (val) => {
    preview.value = val
  }
)

const triggerUpload = () => {
  fileInput.value?.click()
}

const onFileChange = (e) => {
  const file = e.target.files[0]
  if (!file) return

  preview.value = URL.createObjectURL(file)
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
