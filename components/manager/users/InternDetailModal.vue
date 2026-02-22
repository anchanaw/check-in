<template>
  <a-modal :open="open" :footer="null" centered @cancel="emit('update:open', false)">
    <!-- name -->
    <div class="name">
      {{ intern.name }}
    </div>

    <!-- info -->
    <div class="info">
      <div class="row">
        <span class="label">First name :</span>
        <span>{{ intern.firstName || '-' }}</span>
      </div>

      <div class="row">
        <span class="label">Last name :</span>
        <span>{{ intern.lastName || '-' }}</span>
      </div>

      <div class="row">
        <span class="label">Team :</span>
        <span>{{ intern.team || '-' }}</span>
      </div>

      <div class="row">
        <span class="label">Email :</span>
        <span>{{ intern.email || '-' }}</span>
      </div>

      <div class="row">
        <span class="label">University :</span>
        <span>{{ intern.university || '-' }}</span>
      </div>

      <div class="row">
        <span class="label">Student Id :</span>
        <span>{{ intern.studentId || '-' }}</span>
      </div>

      <div class="row">
        <span class="label">Last Checked-in :</span>
        <span>{{ intern.lastCheckedIn || '-' }}</span>
      </div>
    </div>

    <!-- status -->
    <div class="status">
      <a-tag :color="intern.status === 'active' ? 'green' : 'red'">
        {{ intern.status }}
      </a-tag>
    </div>
    <a-button :type="intern.status === 'active' ? 'default' : 'primary'" :danger="intern.status === 'active'" block
      @click="emit('toggle-status')" class="status-btn">
      {{
        intern.status === 'active'
          ? 'Mark as Inactive'
          : 'Activate Intern'
      }}
    </a-button>
  </a-modal>
</template>

<script setup lang="ts">
import BaseCard from '@/components/base/BaseCard.vue'

defineProps<{
  open: boolean
  intern: {
    id?: number
    name: string
    status: 'active' | 'inactive'

    firstName?: string
    lastName?: string
    team?: string
    email?: string
    university?: string
    studentId?: string
    lastCheckedIn?: string
  }
}>()

const emit = defineEmits(['update:open', 'toggle-status'])
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

.status-btn {
  margin-top: 12px;
}
</style>
