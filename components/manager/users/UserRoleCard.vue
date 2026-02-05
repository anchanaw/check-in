<template>
  <div class="role-card" @click="emit('click')">
    <div class="left">
      <div class="icon">
        <component :is="iconComponent" />
      </div>

      <div>
        <div class="title">{{ title }}</div>
        <div class="desc">{{ desc }}</div>
      </div>
    </div>

    <div class="right">
      <a-tag color="blue">
        {{ loading ? '...' : `${count} Users` }}
      </a-tag>
      <span class="arrow">›</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { UserOutlined } from '@ant-design/icons-vue'
import { TeamOutlined } from '@ant-design/icons-vue'

const props = defineProps<{
  icon: 'mentor' | 'intern'
  title: string
  desc: string
  count: number
  loading?: boolean
}>()

const emit = defineEmits(['click'])

const iconComponent = props.icon === 'mentor'
  ? UserOutlined
  : TeamOutlined
</script>

<style scoped>
.role-card {
  background: #fff;
  border-radius: 10px;
  padding: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  margin-bottom: 10px;
}

.left {
  display: flex;
  gap: 10px;
  align-items: center;
}

.icon {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: #e0f2fe;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #2563eb;
  font-size: 18px;
}

.title {
  font-weight: 600;
}

.desc {
  font-size: 12px;
  color: #666;
}

.right {
  display: flex;
  align-items: center;
  gap: 6px;
}

.arrow {
  font-size: 18px;
  color: #999;
}
</style>
