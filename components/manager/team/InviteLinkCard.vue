<template>
  <BaseCard>
    <div class="section-title">Invite Link</div>

    <!-- LINK -->
    <div v-if="invite.url" class="link-row">
      <a-input :value="invite.url" readonly />
      <a-button @click="$emit('copy')">Copy</a-button>
    </div>

    <div v-else class="no-link">
      No active invite link
    </div>

    <!-- INFO -->
    <div class="info">Max Uses: {{ invite.maxUses }}</div>
    <div class="info">Used: {{ invite.used }}</div>

    <div class="info">
      Status:
      <a-tag :color="statusColor">
        {{ invite.status }}
      </a-tag>
    </div>

    <!-- ACTION -->
    <a-button
      v-if="invite.status === 'Active'"
      danger
      block
      @click="$emit('disable')"
    >
      Disable Link
    </a-button>
  </BaseCard>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import BaseCard from '@/components/base/BaseCard.vue'

const props = defineProps<{
  invite: {
    url: string
    maxUses: number
    used: number
    status: 'Active' | 'Disabled'
  }
}>()

defineEmits(['copy', 'disable'])

const statusColor = computed(() =>
  props.invite.status === 'Active' ? 'green' : 'red'
)
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
