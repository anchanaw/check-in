<template>
  <BaseCard>
    <a-space direction="vertical" style="width:100%">
      <a-input
        v-model:value="note"
        placeholder="Note (Optional)"
      />

      <a-space>
        <a-button
          danger
          :loading="loading"
          @click="$emit('reject', note)"
        >
          Reject
        </a-button>

        <a-button
          type="primary"
          :loading="loading"
          @click="$emit('approve', note)"
        >
          Approve & Add points
        </a-button>
      </a-space>
    </a-space>
  </BaseCard>
</template>

<script setup>
import { ref } from 'vue'
import BaseCard from '@/components/base/BaseCard.vue'

defineProps({ loading: Boolean })
defineEmits(['approve', 'reject'])

const note = ref('')
</script>
