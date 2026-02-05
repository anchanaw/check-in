<template>
  <div class="intern-list">
    <a-checkbox-group
      v-model:value="localSelectedIds"
      :disabled="disabled"
    >
      <div
        v-for="intern in interns"
        :key="intern.id"
        class="intern-item"
      >
        <a-checkbox :value="intern.id">
          {{ intern.name }}
        </a-checkbox>
      </div>
    </a-checkbox-group>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

/* ===== types ===== */
type Intern = {
  id: number
  name: string
}

/* ===== props ===== */
const props = defineProps<{
  interns: Intern[]
  selectedIds: number[]
  disabled?: boolean
}>()

/* ===== emits ===== */
const emit = defineEmits<{
  (e: 'update:selectedIds', value: number[]): void
}>()

/**
 * ใช้ computed เพื่อทำ v-model แบบ custom
 * parent จะ bind ด้วย v-model:selectedIds
 */
const localSelectedIds = computed({
  get: () => props.selectedIds,
  set: (value: number[]) => emit('update:selectedIds', value)
})
</script>

<style scoped>
.intern-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.intern-item {
  display: flex;
  align-items: center;
}
</style>
