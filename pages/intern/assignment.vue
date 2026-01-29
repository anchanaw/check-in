<template>
  <div class="assignments-page">
    <h2 class="page-title">Assignments</h2>

    <div class="wrapper">
      <AssignmentCard
        v-for="item in assignments"
        :key="item.id"
        :data="item"
        @addLabel="onAddLabel"
      />

      <a-empty
        v-if="!assignments.length"
        description="No assignments"
      />
    </div>

    <BottomBar active="assignment" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import AssignmentCard from '~/components/assignment/AssignmentCard.vue'
import BottomBar from '@/components/BottomBar.vue'

/**
 * TODO:
 * - GET /assignments
 */
const assignments = ref([])

onMounted(() => {
  assignments.value = [
    {
      id: 1,
      title: 'Share your day',
      status: 'not_done'
    },
    {
      id: 2,
      title: 'Help Team',
      status: 'done',
      point: 3
    }
  ]
})

const onAddLabel = (item) => {
  console.log('add label:', item)
}
</script>

<style scoped>
.assignments-page {
  background-color: #6ec1ff;
  min-height: 100vh;
  padding: 12px;
  padding-bottom: 72px;
}

.page-title {
  text-align: center;
  font-weight: 600;
  margin-bottom: 12px;
}

/* กลางแนวนอน */
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}
</style>
