<template>
  <BaseCard class="pending-card">
    <div class="header">
      <span class="title">Pending Leave Requests</span>
    </div>

    <div
      v-for="item in leaves"
      :key="item.id"
      class="leave-row"
    >
      <div class="left">
        <a-avatar icon="user" />
        <div class="info">
          <div class="name">{{ item.name }}</div>
          <div class="desc">
            {{ item.type }} • {{ item.date }}
          </div>
        </div>
      </div>

      <div class="right">
        <a-tag v-if="item.status === 'pending'" color="orange">
          Pending
        </a-tag>

        <a-button
          size="small"
          type="link"
          @click="$emit('view', item)"
        >
          View
        </a-button>
      </div>
    </div>

    <a-button
      type="link"
      block
      class="view-all"
      @click="$emit('view-all')"
    >
      View all
    </a-button>
  </BaseCard>
</template>

<script setup lang="ts">
defineProps<{
  leaves: {
    id: number
    name: string
    type: string
    date: string
    status: 'pending' | 'approved' | 'rejected'
  }[]
}>()

defineEmits(['view', 'view-all'])
</script>

<style scoped>
.pending-card {
  width: 100%;
  margin-bottom: 16px;
}

.header {
  font-weight: 600;
  margin-bottom: 8px;
}

.leave-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
}

.left {
  display: flex;
  gap: 8px;
  align-items: center;
}

.info .name {
  font-weight: 500;
}

.info .desc {
  font-size: 12px;
  color: #888;
}

.view-all {
  margin-top: 8px;
}
</style>
