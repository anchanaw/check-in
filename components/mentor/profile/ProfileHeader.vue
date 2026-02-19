<template>
  <div class="header">
    <div class="avatar">
      <!-- ถ้ามี avatar -->
      <img
        v-if="avatar"
        :src="avatar"
        class="avatar-img"
        alt="avatar"
      />

      <!-- ถ้าไม่มี avatar -->
      <UserOutlined v-else class="useroutlined" />
    </div>

    <div class="name">{{ user.name }}</div>
    <div class="role">{{ user.role }}</div>
  </div>
</template>

<script setup lang="ts">
import { UserOutlined } from '@ant-design/icons-vue'

interface User {
  name: string
  role: string
}

const { user, avatar } = defineProps<{
  user: User
  avatar?: string | null
}>()
</script>

<style scoped>
.header {
  text-align: center;
  margin-bottom: 12px;
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: #fff;
  margin: -80px auto 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  overflow: hidden;
}

.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border: 3px solid red;
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
