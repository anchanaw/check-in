<template>
    <a-layout class="page">

        <!-- Header -->
        <div class="top-header">
            <div class="back">
                <BackButton />
            </div>

            <div class="title">Point History</div>
        </div>

        <!-- Tabs -->
        <div class="tabs-wrapper">
            <a-tabs v-model:activeKey="activeTab" class="full-tabs">
                <a-tab-pane key="all" tab="All" />
                <a-tab-pane key="task" tab="Task" />
                <a-tab-pane key="bonus" tab="Bonus" />
            </a-tabs>
        </div>

        <!-- Content -->
        <div class="content">
            <a-spin :spinning="loading">

                <BonusHistoryItem v-for="item in filteredItems" :key="item.id" :item="item" />

            </a-spin>
        </div>

    </a-layout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import BackButton from '@/components/base/BackButton.vue'
import BonusHistoryItem from '@/components/mentor/bonus/BonusHistoryItem.vue'

const activeTab = ref('all')
const loading = ref(true)

interface HistoryItem {
  id: number
  eventType: 'task' | 'mentor_add' | 'mentor_remove'
  title: string
  subtitle: string
  date: string
  points: number
}

const items = ref<HistoryItem[]>([])

/* mock API */
onMounted(async () => {
    loading.value = true
    await new Promise(r => setTimeout(r, 800))

    items.value = [
        {
            id: 1,
            eventType: 'task',
            title: 'Task Completed',
            subtitle: 'Share your day',
            date: '15 Jan 2026',
            points: 2
        },
        {
            id: 2,
            eventType: 'mentor_add',
            title: 'Bonus Points',
            subtitle: 'Mentor reward',
            date: '09 Jan 2026',
            points: 2
        },
        {
            id: 3,
            eventType: 'mentor_remove',
            title: 'Points Deducted',
            subtitle: 'Mentor reward',
            date: '09 Jan 2026',
            points: -2
        }
    ]

    loading.value = false
})

const filteredItems = computed(() => {
  if (activeTab.value === 'all') {
    return items.value
  }

  if (activeTab.value === 'task') {
    return items.value.filter(i => i.eventType === 'task')
  }

  if (activeTab.value === 'bonus') {
    return items.value.filter(i =>
      i.eventType === 'mentor_add' ||
      i.eventType === 'mentor_remove'
    )
  }

  return []
})

</script>

<style scoped>
.page {
    min-height: 100vh;
    background: #6ec1ff;
    padding-bottom: 40px;
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
    font-size: 24px;
    font-weight: 600;
}

.tabs-wrapper {
    background: #ffffff;
}

/* ทำให้ nav เต็มจอ */
:deep(.full-tabs .ant-tabs-nav) {
    margin: 0;
}

/* ทำให้แท็บกระจายเท่ากัน */
:deep(.full-tabs .ant-tabs-nav-list) {
    width: 100%;
    display: flex;
}

:deep(.full-tabs .ant-tabs-tab) {
    flex: 1;
    justify-content: center;
    margin: 0 !important;
}

/* เส้น active ให้เต็มช่อง */
:deep(.full-tabs .ant-tabs-ink-bar) {
    height: 3px;
}

.content {
    padding: 16px;
}
</style>
