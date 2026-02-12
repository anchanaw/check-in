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
    <div v-for="item in items" :key="item.id" class="row">
      <span class="point">
        +{{ item.point }} {{ item.reason }}
      </span>
      <span class="date">
        {{ item.date }}
      </span>
    </div>
  </BaseCard>
</template>

<script setup>
import BaseCard from '@/components/base/BaseCard.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const goViewAll = () => {
  router.push('/mentor/bonus_history') 
  // เปลี่ยน path ให้ตรงกับ route จริงของคุณ
}

defineProps({ items: Array })
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
