<template>
  <div class="section">
    <div class="title">{{ title }}</div>

    <div class="list">
      <div v-for="(item, index) in items" :key="index" class="row">
        <span>{{ item.label }}</span>
        <span class="value">
          {{ item.value ?? '-' }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface InfoItem {
  label: string
  value: string | number | null | undefined
}

defineProps < {
  title: string
  items: InfoItem[]
} > ()
</script>


<style scoped>
.section {
  margin-top: 12px;
}

.title {
  font-weight: 600;
  margin-bottom: 6px;
}

.list {
  border: 1px solid #eaeaea;
  border-radius: 8px;
}

.row {
  display: flex;
  justify-content: space-between;
  padding: 8px;
  font-size: 13px;
  border-bottom: 1px solid #eee;
}

.row:last-child {
  border-bottom: none;
}

.value {
  color: #555;
}
</style>
