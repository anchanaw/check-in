<template>
  <BaseCard>
    <div class="top-row">
      <div>
        <div class="label">Total Management</div>
        <div class="total">{{ total }}</div>
      </div>

      <a-button
  type="primary"
  size="small"
  class="create-btn"
  @click="emit('create')"
>
  + Create Link
</a-button>
    </div>

    <a-input
  v-model:value="keyword"
  placeholder="Search Team/Mentor"
  allow-clear
  class="search"
  @pressEnter="onSearch"
  @change="onSearch"
>
  <template #suffix>
    <SearchOutlined />
  </template>
</a-input>
  </BaseCard>

</template>

<script setup lang="ts">
import { SearchOutlined } from '@ant-design/icons-vue'
import BaseCard from '@/components/base/BaseCard.vue'
import { ref } from 'vue'

const emit = defineEmits(['create', 'search'])

const keyword = ref('')

const onSearch = () => {
  emit('search', keyword.value.trim())
}
defineProps<{
  total: number
  loading: boolean
}>()

</script>


<style scoped>
.top-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.label {
  font-size: 16px;
  font-weight: 500;
  color: #000000;
}

.total {
  font-weight: 600;
}

.search {
  margin-top: 4px;
}

/* wrapper */
:deep(.search.ant-input-affix-wrapper) {
  height: 24px;
  padding: 0 8px;

  background: #fff;        /* คุมพื้นหลังชั้นนอก */
  border: 1px solid #e5e7eb;
  box-shadow: none;

  display: flex;
  align-items: center;
}

/* input ข้างใน */
:deep(.search .ant-input) {
  height: 100%;
  line-height: 24px;
  padding: 0;

  background: transparent; /* 🔴 สำคัญมาก */
  box-shadow: none;
  border: none;

  font-size: 12px;
}

/* suffix icon */
:deep(.search .ant-input-suffix) {
  margin-left: 4px;
}


.create-btn {
  height: 28px;              
  padding: 0 12px;           
  font-size: 14px;           
  line-height: 28px;         
  border-radius: 8px;        
  background-color: #74c3ff;
  border: none;        
  box-shadow: none
}

</style>
