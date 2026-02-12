<template>
  <div class="row clickable" @click="goDetail">

    <div class="left">
      <span class="dot" :class="intern.status"></span>
      <span class="name">{{ intern.name }}</span>
    </div>

    <div class="center">
      <span v-if="intern.status === 'checked-in'" class="green">
        {{ intern.checkin_time }}
      </span>

      <span v-else-if="intern.status === 'leave-pending'" class="orange">
        Leave Pending
      </span>

      <span v-else-if="intern.status === 'on-leave'" class="blue">
        On Leave
      </span>

      <span v-else class="gray">-</span>
    </div>

    <div class="right">
      #{{ intern.order }}
    </div>

  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const props = defineProps<{
  intern: {
    id: number
    name: string
    status: string
    checkin_time?: string
    order: number
  }
}>()

const router = useRouter()

function goDetail() {
  router.push(`/mentor/intern/${props.intern.id}`)
}

</script>

<style scoped>
.row {
  display: grid;
  grid-template-columns: 1fr auto auto;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid #e5e5e5;
}

.row:last-child {
  border-bottom: none;
}

.left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.dot {
  width: 12px;
  height: 12px;
  min-width: 12px;
  border-radius: 50%;
  flex-shrink: 0;
}

.name {
  font-size: 18px;
  font-weight: 500;
  color: #222;
}

/* สีสถานะ */
.checked-in { background: #22c55e; }
.not-checked { background: #bdbdbd; }
.leave-pending { background: #f59e0b; }
.on-leave { background: #3b82f6; }

.green { 
  color: #22c55e; 
  font-weight: 500;
}

.orange { 
  color: #f59e0b; 
  font-weight: 500;
}

.blue { 
  color: #3b82f6; 
  font-weight: 500;
}

.gray { 
  color: #d32f2f; /* สีแดงแบบในรูป */
  font-weight: 500;
}

.center {
  font-size: 16px;
  text-align: right;
  padding-right: 20px;
}

.right {
  font-size: 14px;
  color: #666;
}

.clickable {
  cursor: pointer;
  transition: 0.2s ease;
}

.clickable:hover {
  background: rgba(0, 0, 0, 0.03);
}

.clickable:active {
  transform: scale(0.98);
}

</style>
