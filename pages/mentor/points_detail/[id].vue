<template>
  <a-layout class="page">

    <!-- Header -->
    <div class="top-header">
      <div class="back">
        <BackButton />
      </div>
      <div class="title">Points Detail</div>
    </div>

    <div class="content">
      <a-spin :spinning="loading">

        <BaseCard v-if="bonus" class="bonus-card">

          <!-- Top Colored Section -->
          <div
            class="points-header"
            :class="bonus.points < 0 ? 'minus' : 'plus'"
          >
            {{ formattedPoints }} points
          </div>

          <div class="detail-row">
            <span>Type :</span>
            <span>{{ bonus.type }}</span>
          </div>

          <div class="divider" />

          <div class="detail-row">
            <span>Reason :</span>
            <span>{{ bonus.reason }}</span>
          </div>

          <div class="divider" />

          <div class="detail-row">
            <span>Date :</span>
            <span>{{ bonus.date }}</span>
          </div>

        </BaseCard>

      </a-spin>
    </div>

  </a-layout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import BackButton from '@/components/base/BackButton.vue'
import BaseCard from '@/components/base/BaseCard.vue'

const route = useRoute()
const router = useRouter()
const loading = ref(true)

interface PointDetail {
  id: number
  points: number
  type: string
  reason: string
  date: string
}

const bonus = ref<PointDetail | null>(null)

/* 🔥 mock data */
const mockData: Record<number, PointDetail> = {
  2: {
    id: 1,
    points: 2,
    type: 'Mentor-added bonus',
    reason: 'Extra offer on task',
    date: '09 Jan 2026'
  },
  3: {
    id: 2,
    points: -2,
    type: 'Mentor adjustment',
    reason: 'Arriving late',
    date: '09 Jan 2026'
  }
}

onMounted(async () => {
  loading.value = true
  const id = Number(route.params.id)

  try {
    // 🔥 เปิดใช้ตอน API พร้อม
    // const res = await $fetch<PointDetail>(`/api/points/${id}`)
    // bonus.value = res

    // 🔥 ตอนนี้ใช้ mock แทน
    const data = mockData[id]

    if (!data) {
      router.replace('/mentor/points')
      return
    }

    bonus.value = data

  } catch (err) {
    console.error('Load failed, using fallback mock')

    const fallback = mockData[id]
    if (fallback) {
      bonus.value = fallback
    } else {
      router.replace('/mentor/points')
    }

  } finally {
    loading.value = false
  }
})

const formattedPoints = computed(() => {
  if (!bonus.value) return ''
  return bonus.value.points > 0
    ? `+${bonus.value.points}`
    : bonus.value.points
})
</script>


<style scoped>
.page {
  min-height: 100vh;
  background: #6ec1ff;
}

.top-header {
  position: relative;
  height: 70px;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.back {
  position: absolute;
  left: 16px;
}

.title {
  font-size: 20px;
  font-weight: 600;
}

.content {
  padding: 20px 16px;
}

.bonus-card {
  border-radius: 18px;
  overflow: hidden;
}

/* Top colored section */
.points-header {
  padding: 18px;
  font-size: 22px;
  font-weight: 700;
}

.points-header.plus {
  background: #d1fae5;
  color: #16a34a;
}

.points-header.minus {
  background: #fecaca;
  color: #dc2626;
}

/* Detail rows */
.detail-row {
  display: flex;
  justify-content: space-between;
  padding: 14px 18px;
  font-size: 14px;
}

.divider {
  height: 1px;
  background: #e5e7eb;
  margin: 0 18px;
}
</style>
