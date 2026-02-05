<template>
  <BaseCard class="form-card">
    <!-- Team -->
    <div class="field">
      <label>Team Information</label>
      <a-select
        v-model:value="teamId"
        placeholder="Select team"
        :options="teamOptions"
        :disabled="loading"
      />
    </div>

    <!-- Mentor -->
    <div class="field">
      <label>Assign Mentor</label>
      <a-select
        v-model:value="mentorId"
        placeholder="Select mentor"
        :options="mentorOptions"
        :disabled="loading"
      />
    </div>

    <!-- Intern -->
    <div class="field">
      <label>Add Intern <span>(Optional)</span></label>

      <a-input
        v-model:value="internSearch"
        placeholder="Search intern"
        class="search"
        :disabled="loading"
      />

      <InternSelectList
        :interns="filteredInterns"
        v-model:selectedIds="internIds"
        :disabled="loading"
      />
    </div>

    <!-- Link name -->
    <div class="field">
      <label>Invite link name <span>(Optional)</span></label>
      <a-input
        v-model:value="linkName"
        :disabled="loading"
      />
    </div>

    <!-- Max uses -->
    <div class="field">
      <label>Max Uses <span>(Optional)</span></label>
      <a-input-number
        v-model:value="maxUses"
        :min="1"
        style="width: 100%"
        :disabled="loading"
      />
    </div>

    <!-- Expired -->
    <div class="field">
      <label>Expired At <span>(Optional)</span></label>
      <a-date-picker
        v-model:value="expiredAt"
        picker="month"
        style="width: 100%"
        :disabled="loading"
      />
    </div>

    <a-button
      type="primary"
      block
      class="submit-btn"
      :loading="loading"
      :disabled="!canSubmit"
      @click="submit"
    >
      Create Link
    </a-button>
  </BaseCard>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import BaseCard from '@/components/base/BaseCard.vue'
import InternSelectList from './InternSelectList.vue'

/* ===== types ===== */
type Team = { id: number; name: string }
type Mentor = { id: number; name: string }
type Intern = { id: number; name: string }

/* ===== props ===== */
const props = defineProps<{
  teams: Team[]
  mentors: Mentor[]
  interns: Intern[]
  loading: boolean
}>()

/* ===== emits ===== */
const emit = defineEmits<{
  (e: 'submit', payload: {
    team_id: number
    mentor_id: number
    intern_ids: number[]
    link_name?: string | null
    max_uses?: number | null
    expired_at?: string | null
  }): void
}>()

/* ===== form state ===== */
const teamId = ref<number | null>(null)
const mentorId = ref<number | null>(null)
const internIds = ref<number[]>([])

const linkName = ref<string>('')
const maxUses = ref<number | null>(null)
const expiredAt = ref<any>(null)

const internSearch = ref('')

/* ===== options ===== */
const teamOptions = computed(() =>
  props.teams.map(t => ({
    value: t.id,
    label: t.name
  }))
)

const mentorOptions = computed(() =>
  props.mentors.map(m => ({
    value: m.id,
    label: m.name
  }))
)

/* ===== intern filter ===== */
const filteredInterns = computed(() => {
  if (!internSearch.value) return props.interns
  return props.interns.filter(i =>
    i.name.toLowerCase().includes(internSearch.value.toLowerCase())
  )
})

/* ===== validation ===== */
const canSubmit = computed(() =>
  !!teamId.value && !!mentorId.value && !props.loading
)

/* ===== submit ===== */
const submit = () => {
  if (!canSubmit.value) return

  emit('submit', {
    team_id: teamId.value!,
    mentor_id: mentorId.value!,
    intern_ids: internIds.value,
    link_name: linkName.value || null,
    max_uses: maxUses.value,
    expired_at: expiredAt.value
      ? expiredAt.value.toISOString()
      : null
  })
}
</script>

<style scoped>
.form-card {
  width: 100%;
  max-width: 360px;
}

.field {
  margin-bottom: 12px;
}

label {
  display: block;
  font-weight: 600;
  margin-bottom: 4px;
}

label span {
  font-weight: 400;
  font-size: 12px;
  color: #999;
}

.search {
  margin-bottom: 8px;
}

.submit-btn {
  margin-top: 12px;
}
</style>
