<template>
  <BaseCard>
    <!-- Title -->
    <div class="title-row">
      <div class="title">History</div>
      <div class="view-all" @click="goViewAll">
        View all
      </div>
    </div>

    <!-- Table header -->
    <div class="header-row">
      <span>Points</span>
      <span>Date</span>
    </div>

    <!-- Rows -->
    <!-- Empty -->
<div v-if="!items || items.length === 0" class="empty">
  No bonus history
</div>

<!-- Rows -->
<div v-else v-for="item in latestItems" :key="item.id" class="row">
  <span
    class="point"
    :class="{ positive: item.point > 0, negative: item.point < 0 }"
  >
    {{ item.point > 0 ? '+' : '' }}{{ item.point }}
    {{ item.reason }}
  </span>

  <span class="date">
    {{ formatDate(item.date) }}
  </span>
</div>

  </BaseCard>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import BaseCard from '@/components/base/BaseCard.vue'
import { useRouter } from 'vue-router'

interface BonusItem {
  id: string
  point: number
  reason: string
  date: string
}

const props = defineProps<{
  items: BonusItem[]
  internId: string
}>()

const router = useRouter()

/* ✅ เอา 3 อันล่าสุด */
const latestItems = computed(() => {
  if (!props.items) return []

  return [...props.items]
    .sort(
      (a, b) =>
        new Date(b.date).getTime() -
        new Date(a.date).getTime()
    )
    .slice(0, 3)
})

const formatDate = (date: string) => {
  if (!date) return '-'
  return new Date(date).toLocaleDateString()
}

const goViewAll = () => {
  router.push({
    path: '/mentor/bonus_history',
    query: { id: props.internId }
  })
}
</script>

<style scoped>
/* Title */
.title {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
}

/* Header row */
.header-row {
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  font-weight: 500;
  padding-bottom: 6px;
  border-bottom: 1px solid #e5e7eb;
  margin-bottom: 6px;
}

/* Data row */
.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  padding: 6px 0;
}

/* Point */
.point {
  color: #22c55e;
  font-weight: 500;
}

/* Date */
.date {
  color: #111;
}

/* Title row */
.title-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

/* Title */
.title {
  font-size: 16px;
  font-weight: 600;
}

/* View all */
.view-all {
  font-size: 14px;
  color: #2563eb;
  cursor: pointer;
  font-weight: 500;
}

.view-all:hover {
  text-decoration: underline;
}

</style>
