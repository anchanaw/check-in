<template>
  <a-form layout="vertical">
    <!-- Mentor name (mock) -->
    <div class="mentor-name">{{ mentorName }}</div>

    <!-- Team -->
    <a-form-item label="Team">
      <a-select
        v-model:value="form.team"
        placeholder="Select team"
        :options="teams"
      />
    </a-form-item>

    <!-- Invite setting -->
    <div class="section-title">Invite Setting</div>

    <a-form-item label="Invite link name (Optional)">
      <a-input v-model:value="form.name" placeholder="Optional" />
    </a-form-item>

    <a-form-item label="Max Uses (Optional)">
      <MaxUsesInput v-model="form.maxUses" />
    </a-form-item>

    <a-form-item label="Expired At (Optional)">
      <a-date-picker
        v-model:value="form.expiredAt"
        picker="month"
        style="width: 100%"
      />
    </a-form-item>

    <!-- Action -->
    <a-button
      type="primary"
      block
      class="create-btn"
      @click="createLink"
    >
      Create Link
    </a-button>
  </a-form>
</template>

<script setup>
import { reactive, ref } from 'vue'
import MaxUsesInput from './MaxUsesInput.vue'

/**
 * TODO:
 * - GET /teams
 * - POST /invite-links
 */

// 🔹 mock mentor
const mentorName = 'Sommai'

// 🔹 mock teams
const teams = [
  { label: 'Frontend Development', value: 'frontend' },
  { label: 'Backend Development', value: 'backend' }
]

// 🔹 form state (mock)
const form = reactive({
  team: null,
  name: '',
  maxUses: 1,
  expiredAt: null
})

const createLink = () => {
  console.log('create link payload:', { ...form })
  // TODO: POST /invite-links
}
</script>

<style scoped>
.mentor-name {
  font-weight: 600;
  margin-bottom: 12px;
}

.section-title {
  font-weight: 600;
  margin: 12px 0 8px;
}

.create-btn {
  margin-top: 16px;
}
</style>
