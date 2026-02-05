<template>
  <BaseCard>
    <div class="section-title">Invite Link</div>

    <div class="link-row">
      <a-input :value="invite.url" readonly />
      <a-button size="small" @click="emit('copy')">copy</a-button>
    </div>

    <div class="info">Max Uses: {{ invite.maxUses }}</div>
    <div class="info">Expires At: {{ invite.expiresAt }}</div>
    <div class="info">Used: {{ invite.used }}</div>
    <div class="info">
      Status:
      <a-tag color="green">Active</a-tag>
    </div>

    <a-button danger block @click="emit('disable')">
      Disable Link
    </a-button>
  </BaseCard>
</template>

<script setup lang="ts">
import BaseCard from '@/components/base/BaseCard.vue'

defineProps<{ invite: any }>()
const emit = defineEmits(['copy', 'disable'])
</script>

<style scoped>
.section-title {
  font-weight: 600;
  margin-bottom: 8px;
}

.link-row {
  display: flex;
  gap: 6px;
  margin-bottom: 8px;
}

.info {
  font-size: 13px;
  margin-bottom: 4px;
}
</style>
