<template>
  <div class="header">
    <div class="avatar">
      <UserOutlined class="useroutlined"/>
      <EditOutlined class="edit-icon" />
    </div>
    <div class="name">{{ user.name }}</div>
    <div class="role">{{ user.role }}</div>
  </div>
</template>

<script setup>
import { UserOutlined, EditOutlined } from '@ant-design/icons-vue'

defineProps({
  user: Object
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
