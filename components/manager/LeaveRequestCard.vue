<template>
  <div class="leave-card">
    <div class="header">
      <div class="name">{{ request.name }}</div>
      <a-tag color="orange" v-if="request.status === 'Pending'">
        Pending
      </a-tag>
      <a-tag color="green" v-else-if="request.status === 'Approved'">
        Approved
      </a-tag>
      <a-tag color="red" v-else>
        Rejected
      </a-tag>
    </div>

    <div class="detail">
      <div class="type">{{ request.type }}</div>
      <div class="date">
        {{ request.date }} ({{ request.duration }})
      </div>
      <div class="description">{{ request.description }}</div>
    </div>

    <div class="actions" v-if="request.status === 'Pending'">
      <a-button block class="reject" @click="$emit('reject')">
        Reject
      </a-button>
      <a-button block type="primary" @click="$emit('approve')">
        Approve
      </a-button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  request: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.leave-card {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.name {
  font-weight: 600;
}

.detail {
  font-size: 14px;
  color: #555;
}

.type {
  font-weight: 500;
}

.actions {
  display: flex;
  gap: 8px;
}

.reject {
  background: #e0e0e0;
}
</style>
