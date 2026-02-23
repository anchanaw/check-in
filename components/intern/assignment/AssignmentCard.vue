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
        <a-button class="do-btn" v-if="data.status === 'not_done'" shape="round" type="primary" @click="goToDetail">
          + DO
        </a-button>

        <span v-if="data.status === 'done'" class="point">
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
  status: 'done' | 'not_done'
  point?: number
  isBonus?: boolean
  deadline?: string   // 🔥 เพิ่มตรงนี้
}

const props = defineProps<{
  data: AssignmentData
}>()

const statusText = computed(() =>
  props.data.status === 'done' ? 'Done' : 'Not Done'
)

const statusClass = computed(() =>
  props.data.status === 'done' ? 'done' : 'not-done'
)

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
}

.not-done {
  color: #ff4d4f;
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
