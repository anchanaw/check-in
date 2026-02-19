<template>
  <div class="leave-card">

    <!-- HEADER -->
    <div class="header">
      <div class="name">
        {{ request.name }}
      </div>

      <a-tag v-if="request.status === 'pending'" color="orange">
        Pending
      </a-tag>

      <a-tag v-else-if="request.status === 'approved'" color="green">
        Approved
      </a-tag>

      <a-tag v-else color="red">
        Rejected
      </a-tag>
    </div>

    <!-- DETAIL -->
    <div class="detail">
      <div class="date">
        {{ request.startDate }} – {{ request.endDate }}
        • {{ request.duration }} day<span v-if="request.duration > 1">s</span>
      </div>


      <div class="description">
        {{ request.description }}
      </div>
    </div>

    <!-- ACTIONS -->
    <div class="actions" v-if="request.status === 'pending'">
      <a-button block class="reject" @click="$emit('reject', request.id)">
        Reject
      </a-button>

      <a-button block type="primary" @click="$emit('approve', request.id)">
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

.actions {
  display: flex;
  gap: 8px;
}

.reject {
  background: #e0e0e0;
}
</style>
