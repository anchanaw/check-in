<template>
  <div class="filter-bar">
    <a-select
      v-model:value="localStatus"
      class="filter filter-select"
    >
      <a-select-option value="all">Filter</a-select-option>
      <a-select-option value="active">Active</a-select-option>
      <a-select-option value="inactive">Inactive</a-select-option>
    </a-select>

    <a-input
      v-model:value="localKeyword"
      placeholder="Search"
      class="filter-input"
    >
      <template #suffix>
        <SearchOutlined />
      </template>
    </a-input>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { SearchOutlined } from '@ant-design/icons-vue'

const props = defineProps<{
  keyword: string
  status: 'all' | 'active' | 'inactive'
  loading?: boolean
}>()

const emit = defineEmits(['update:keyword', 'update:status'])

const localKeyword = computed({
  get: () => props.keyword,
  set: v => emit('update:keyword', v)
})

const localStatus = computed({
  get: () => props.status,
  set: v => emit('update:status', v)
})
</script>

<style scoped>
.filter-bar {
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
}

.filter-select {
  width: 100px;
}

/* normalize height */
:deep(.filter-select .ant-select-selector),
:deep(.filter-input.ant-input-affix-wrapper) {
  height: 32px;
  display: flex;
  align-items: center;
}

:deep(.filter-input .ant-input) {
  height: 100%;
  padding: 0;
  line-height: 32px;
  background: transparent;
  border: none;
}
</style>
