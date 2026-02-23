<template>
  <a-modal
    :open="open"
    :footer="null"
    centered
    @cancel="emit('update:open', false)"
  >
      <!-- name -->
      <div class="name">
        {{ mentor?.name || '-' }}
      </div>

      <!-- info list -->
      <div class="info">
        <div class="row">
          <span class="label">First name :</span>
          <span>{{ mentor?.firstName || '-' }}</span>
        </div>

        <div class="row">
          <span class="label">Last name :</span>
          <span>{{ mentor?.lastName || '-' }}</span>
        </div>

        <div class="row">
          <span class="label">Team :</span>
          <span>{{ mentor?.team || '-' }}</span>
        </div>

        <div class="row">
          <span class="label">Email :</span>
          <span>{{ mentor?.email || '-' }}</span>
        </div>

        <div class="row">
          <span class="label">Last Login :</span>
          <span>{{ mentor?.lastLogin || '-' }}</span>
        </div>
      </div>

      <!-- status -->
      <div class="status">
        <a-tag
          :color="mentor?.status === 'active' ? 'green' : 'red'"
        >
          {{ mentor?.status || '-' }}
        </a-tag>
      </div>
  </a-modal>
</template>

<script setup lang="ts">
import BaseCard from '@/components/base/BaseCard.vue'

defineProps<{
  open: boolean
  mentor?: {
    id?: string
    name?: string
    status?: 'active' | 'inactive'
    firstName?: string
    lastName?: string
    team?: string
    email?: string
    lastLogin?: string
  }
}>()


const emit = defineEmits(['update:open'])
</script>

<style scoped>
.detail-card {
  padding: 16px;
}

/* name */
.name {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
}

/* info list */
.info {
  margin-bottom: 12px;
}

.row {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  margin-bottom: 4px;
}

.label {
  color: #666;
}

/* status */
.status {
  display: flex;
  justify-content: center;
}
</style>
