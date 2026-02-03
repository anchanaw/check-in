<template>
  <BaseCard>
    <a-typography-text strong>Give Bonus Points</a-typography-text>

    <a-space direction="vertical" style="width:100%">
      <a-input-number v-model:value="points" :min="1" />
      <a-input v-model:value="reason" placeholder="Reason" />
      <a-button type="primary" block @click="submit">
        Add points
      </a-button>
    </a-space>
  </BaseCard>
</template>

<script setup>
import { ref } from 'vue'
import BaseCard from '@/components/base/BaseCard.vue'

const points = ref(1)
const reason = ref('')

const submit = () => {
  console.log('ADD BONUS', points.value, reason.value)
  // TODO: API
}
</script>
