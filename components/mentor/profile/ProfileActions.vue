<template>
  <div class="actions">
    <a-button type="primary" block @click="goEditProfile">
      Edit Profile
    </a-button>

    <a-button block class="invite" @click="goInviteIntern">
      Invite Intern
    </a-button>

    <a-button danger block @click="$emit('logout')">
      Logout
    </a-button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

defineEmits(['logout'])

const router = useRouter()

const goEditProfile = () => {
  router.push('/mentor/edit_profile')
}

const goInviteIntern = () => {
  router.push('/mentor/invite_intern')
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
