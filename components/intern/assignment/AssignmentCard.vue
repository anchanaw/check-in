<template>
  <BaseCard>
    <div class="card">
      <div class="left">
        <StarFilled class="star" />
        <div>
          <div class="title">
            {{ data.title }}
            <span v-if="data.isBonus" class="bonus">BONUS</span>
          </div>
          <div class="status">
            Status :
            <span :class="statusClass">
              {{ statusText }}
            </span>
          </div>
          <div v-if="formattedDeadline" class="deadline">
            Due: {{ formattedDeadline }}
          </div>
        </div>
      </div>

      <div class="right">
        <a-button v-if="data.status === 'not_done'" class="do-btn" shape="round" type="primary" @click="goToDetail">
          + DO
        </a-button>

        <span v-else-if="data.status === 'approved' && data.point" class="point">
          + {{ data.point }}
        </span>
      </div>
    </div>
  </BaseCard>
</template>

<script setup lang="ts">
import BaseCard from '~/components/base/BaseCard.vue'
import { computed } from 'vue'
import { StarFilled } from '@ant-design/icons-vue'
import { useRouter } from 'vue-router'
import dayjs from 'dayjs'

const formattedDeadline = computed(() => {
  if (!props.data.deadline) return null
  return dayjs(props.data.deadline).format('DD/MM/YYYY')
})
const router = useRouter()

interface AssignmentData {
  id: string
  title: string
  status: 'done' | 'not_done' | 'pending' | 'approved' | 'rejected'
  point?: number
  isBonus?: boolean
  deadline?: string
}

const props = defineProps<{
  data: AssignmentData
}>()

const statusText = computed(() => {
  switch (props.data.status) {
    case 'done':
      return 'Done'
    case 'pending':
      return 'Pending Review'
    case 'approved':
      return 'Approved'
    case 'rejected':
      return 'Rejected'
    default:
      return 'Not Done'
  }
})

const statusClass = computed(() => {
  switch (props.data.status) {
    case 'done':
      return 'done'
    case 'pending':
      return 'pending'
    case 'approved':
      return 'approved'
    case 'rejected':
      return 'rejected'
    default:
      return 'not-done'
  }
})

const goToDetail = () => {
  router.push(`/intern/tasks/${props.data.id}`)
}
</script>

<style scoped>
.card {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.left {
  display: flex;
  gap: 8px;
}

.star {
  color: #faad14;
  margin-top: 4px;
}

.title {
  font-weight: 500;
}

.status {
  font-size: 12px;
}

.done {
  color: #52c41a;
  font-weight: 600;
}

.not-done {
  color: #999;
}

.pending {
  color: #faad14;
  font-weight: 600;
}

.approved {
  color: #52c41a;
  font-weight: 600;
}

.rejected {
  color: #ff4d4f;
  font-weight: 600;
}

.right {
  display: flex;
  align-items: center;
}

.point {
  color: #52c41a;
  font-weight: 600;
}

.do-btn {
  width: 83px;
  height: 32px;
  /* ⭐ ต้องกำหนดตรง */
  padding: 0;
  /* ⭐ ตัด padding เดิมของ Ant */
  line-height: 32px;
  /* ⭐ ให้ตัวอักษรอยู่กลาง */
  font-size: 14px;

  background-color: #22c55e;
  border-color: #22c55e;
  color: #fff;
  border-radius: 25px;
}
</style>
