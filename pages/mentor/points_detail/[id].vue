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
          <div class="points-header" :class="bonus.points < 0 ? 'minus' : 'plus'">
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
import dayjs from 'dayjs'
import { useApi } from '~/composables/core'
import BackButton from '@/components/base/BackButton.vue'
import BaseCard from '@/components/base/BaseCard.vue'

const { apiFetch } = useApi()
const route = useRoute()
const router = useRouter()
const loading = ref(true)

interface PointDetail {
  id: string
  points: number
  type: string
  reason: string
  date: string
}

const bonus = ref<PointDetail | null>(null)

onMounted(async () => {
  loading.value = true

  const pointId = route.params.id as string
  const internId = route.query.internId as string

  console.log('INTERN ID:', internId)
  console.log('POINT ID:', pointId)

  if (!internId || !pointId) {
    router.back()
    return
  }

  try {
    const res = await apiFetch<{
      data: {
        intern: { id: string; email: string; firstName: string; lastName: string }
        points: any[]
        total: number
        page: number
        pageSize: number
        totalPages: number
      }
    }>(`/users/interns/${internId}/points`)

    const history = res?.data?.points || []

    const found = history.find(
      (item: any) => item.id === pointId
    )

    if (!found) {
      router.back()
      return
    }

    bonus.value = {
      id: found.id,
      points: found.points,
      type: mapType(found),
      reason: found.reason || '-',
      date: dayjs(found.createdAt)
        .add(7, 'hour')
        .format('DD MMM YYYY HH:mm')
    }

  } catch (err) {
    console.error('Load point detail error:', err)
    router.back()
  } finally {
    loading.value = false
  }
})

const mapType = (item: any) => {
  if (item.sourceType === 'bonus') {
    return 'Bonus'
  }

  if (item.sourceType === 'manual') {
    return item.points > 0
      ? 'Manual Added'
      : 'Manual Deducted'
  }

  if (item.sourceType === 'checkin') {
    return 'Check-in'
  }

  return 'Point Update'
}

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
