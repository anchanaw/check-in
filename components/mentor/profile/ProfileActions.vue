<template>
  <div class="actions">
    <a-button type="primary" block @click="goEditProfile">
      Edit Profile
    </a-button>

    <!-- 🔥 แสดง Invite เฉพาะ mentor -->

    <a-button danger block @click="logout">
      Logout
    </a-button>
  </div>
</template>


<script setup lang="ts">
import { useRouter } from 'vue-router'
import { Modal } from 'ant-design-vue'
import { useAuthStore } from '@/stores/auth.store'

const props = defineProps<{
  mode: 'mentor' | 'intern'
}>()

const emit = defineEmits<{
  (e: 'edit'): void
  (e: 'invite'): void
  (e: 'logout'): void
}>()

const router = useRouter()
const authStore = useAuthStore()

const goEditProfile = () => {
  emit('edit')
}

const goInviteIntern = () => {
  emit('invite')
}

const logout = () => {
  Modal.confirm({
    title: 'Are you sure you want to logout?',
    onOk() {
      authStore.$reset()
      localStorage.removeItem('access_token')
      emit('logout')
      router.replace('/login')
    }
  })
}
</script>

<style scoped>
.actions {
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.invite {
  background: #6b4eff;
  color: #fff;
}
</style>
