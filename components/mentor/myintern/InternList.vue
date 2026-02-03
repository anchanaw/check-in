<template>
  <BaseCard>
    <a-skeleton v-if="loading" active />

    <div v-else>
      <div
        v-for="intern in interns"
        :key="intern.id"
        class="row clickable"
        @click="$emit('select', intern)"
      >
        <div class="left">
          <span :class="['dot', intern.status]" />
          <strong>{{ intern.name }}</strong>
        </div>

        <div class="right">
          <span v-if="intern.time" class="time">
            {{ intern.time }}
          </span>
          <span class="order">{{ intern.order }}</span>
        </div>
      </div>

      <!-- Legend -->
      <div class="legend">
        <div><span class="dot checked-in" /> Checked-in</div>
        <div><span class="dot leave-pending" /> Leave Pending</div>
        <div><span class="dot not-checked" /> Not Checked-in</div>
        <div><span class="dot on-leave" /> On Leave</div>
      </div>
    </div>
  </BaseCard>
</template>

<script setup>
import BaseCard from '@/components/base/BaseCard.vue'

defineProps({
  loading: Boolean,
  interns: Array
})

defineEmits(['select'])
</script>

<style scoped>
.row {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid #eee;
}

.clickable {
  cursor: pointer;
}

.clickable:hover {
  background: #f5f8ff;
}

.left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.right {
  display: flex;
  gap: 8px;
  font-size: 12px;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.checked-in { background: #22c55e; }
.leave-pending { background: #facc15; }
.not-checked { background: #9ca3af; }
.on-leave { background: #3b82f6; }
</style>
