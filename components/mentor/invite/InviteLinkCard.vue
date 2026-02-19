<template>
  <div class="invite-card">
    <div class="label">Invite Link</div>

    <div class="link-row">
      <a-input :value="invite.link" readonly :disabled="invite.status !== 'Active'" /> 
      <a-button size="small"
        :disabled="invite.status !== 'Active'" @click="handleCopy">
        copy
      </a-button>
    </div>

    <div class="meta">
      <div><span>Max Uses</span><span>{{ invite.maxUses }}</span></div>
      <div><span>Used</span><span>{{ invite.used }}</span></div>
      <div><span>Status</span><span>{{ invite.status }}</span></div>
    </div>

    <a-button block class="disable" v-if="invite.status === 'Active'" @click="$emit('disable')">
      Disable Link
    </a-button>
  </div>
</template>

<script setup>
const props = defineProps({
  invite: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['copy', 'disable'])

const handleCopy = () => {
  if (props.invite.status !== 'Active') return
  emit('copy')
}
</script>

<style scoped>
.invite-card {
  margin-top: 12px;
}

.label {
  font-weight: 600;
  margin-bottom: 6px;
}

.link-row {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}

.meta {
  font-size: 14px;
  margin-bottom: 12px;
}

.meta div {
  display: flex;
  justify-content: space-between;
  padding: 4px 0;
}

.disable {
  background: #e0e0e0;
}
</style>
