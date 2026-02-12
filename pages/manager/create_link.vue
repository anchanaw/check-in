<template>
  <div class="page">
    <div class="top-header">
      <BackButton class="back-btn" />
      <div class="title">Create Link</div>
    </div>

    <BaseCard class="card">
      <a-form
        layout="vertical"
        :model="form"
        @finish="submit"
      >

        <!-- Team -->
        <a-form-item label="Team Information">
          <a-select
            v-model:value="form.team_id"
            placeholder="Select team"
            :options="teamOptions"
          />
        </a-form-item>

        <!-- Mentor -->
        <a-form-item label="Assign Mentor">
          <a-select
            v-model:value="form.mentor_id"
            placeholder="Select mentor"
            :options="mentorOptions"
          />
        </a-form-item>

        <!-- Intern -->
        <a-form-item label="Add Intern (Optional)">
          <a-input-search
            v-model:value="search"
            placeholder="Search"
          />

          <a-checkbox-group
            v-model:value="form.intern_ids"
            class="checkbox-group"
          >
            <a-checkbox
              v-for="item in filteredInterns"
              :key="item.id"
              :value="item.id"
            >
              {{ item.name }}
            </a-checkbox>
          </a-checkbox-group>
        </a-form-item>

        <!-- Invite Name -->
        <a-form-item label="Invite link name (Optional)">
          <a-input v-model:value="form.name" />
        </a-form-item>

        <!-- Max Uses -->
        <a-form-item label="Max Uses (Optional)">
          <a-input-number
            v-model:value="form.max_uses"
            :min="1"
            style="width: 100%"
          />
        </a-form-item>

        <!-- Expired -->
        <a-form-item label="Expired At (Optional)">
          <a-date-picker
            v-model:value="form.expired_at"
            style="width: 100%"
          />
        </a-form-item>

        <a-button
          type="primary"
          block
          :loading="loading"
          html-type="submit"
        >
          Create Link
        </a-button>

      </a-form>
    </BaseCard>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, computed, onMounted } from 'vue'
import BaseCard from '@/components/base/BaseCard.vue'
import BackButton from '@/components/base/BackButton.vue'

const loading = ref(false)
const search = ref('')

const form = reactive({
  team_id: null,
  mentor_id: null,
  intern_ids: [],
  name: '',
  max_uses: 1,
  expired_at: null
})

// mock data (รอ API)
const teamOptions = ref([])
const mentorOptions = ref([])

interface Intern {
  id: number
  name: string
}

const interns = ref<Intern[]>([])

const filteredInterns = computed(() =>
  interns.value.filter(i =>
    i.name.toLowerCase().includes(search.value.toLowerCase())
  )
)

onMounted(async () => {
  // TODO: call API
  // teamOptions.value = await api.getTeams()
  // mentorOptions.value = await api.getMentors()
  // interns.value = await api.getInterns()
})

const submit = async () => {
  loading.value = true
  try {
    console.log(form)
    // await api.createInviteLink(form)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped> 
.page {
  min-height: 100vh;
  background: linear-gradient(180deg, #6fa9d6, #5f9ecf);
  padding: 16px;
}

.card {
  border-radius: 16px;
}

.checkbox-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: 8px;
}

.top-header {
  position: relative;
  height: 60px;
  margin-bottom: 12px;
}

.back-btn {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
}

.title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 20px;
  font-weight: 600;
}
</style>