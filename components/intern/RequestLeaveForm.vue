<template>
  <a-form layout="vertical" :model="form" @finish="submit">
    <!-- Leave Type -->
    <a-form-item label="Leave Type" name="type" :rules="[{ required: true, message: 'Please select leave type' }]">
      <a-select v-model:value="form.type" placeholder="Select type">
        <a-select-option value="sick">Sick Type</a-select-option>
        <a-select-option value="personal">Personal Leave</a-select-option>
        <a-select-option value="vacation">Vacation</a-select-option>
      </a-select>
    </a-form-item>

    <!-- Date -->
    <a-form-item label="Date" name="date" :rules="[{ required: true, message: 'Please select date' }]">
      <a-date-picker v-model:value="form.date" style="width: 100%" />
    </a-form-item>

    <!-- Select Time -->
    <a-form-item label="Select Time">
      <a-radio-group v-model:value="form.timeType">
        <a-radio value="all_day">All Day</a-radio>
        <a-radio value="custom">Custom Time</a-radio>
      </a-radio-group>
    </a-form-item>

    <!-- Custom Time -->
    <div v-if="form.timeType === 'custom'" class="time-row">
      <a-form-item label="From" class="half">
        <a-time-picker v-model:value="form.from" format="HH:mm" style="width: 100%" />
      </a-form-item>

      <a-form-item label="To" class="half">
        <a-time-picker v-model:value="form.to" format="HH:mm" style="width: 100%" />
      </a-form-item>
    </div>

    <!-- Reason -->
    <a-form-item label="Reason">
      <a-textarea v-model:value="form.reason" placeholder="Value" :rows="3" />
    </a-form-item>

    <!-- Actions -->
    <a-button type="primary" block html-type="submit">
      Submit
    </a-button>

    <a-button block danger class="mt" @click="$emit('cancel')">
      Cancel
    </a-button>
  </a-form>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import dayjs, { Dayjs } from 'dayjs'
import { message } from 'ant-design-vue'

const emit = defineEmits(['submit', 'cancel'])

const form = reactive < {
  type: string | null
  date: Dayjs | null
  timeType: 'all_day' | 'custom'
  from: Dayjs | null
  to: Dayjs | null
  reason: string
} > ({
  type: null,
  date: null,
  timeType: 'all_day',
  from: null,
  to: null,
  reason: ''
})

const submit = () => {
  if (!form.date) {
    message.error('Please select date')
    return
  }

  if (!form.reason.trim()) {
    message.error('Please enter reason')
    return
  }

  let startDate: string
  let endDate: string

  if (form.timeType === 'all_day') {
    startDate = dayjs(form.date).startOf('day').toISOString()
    endDate = dayjs(form.date).endOf('day').toISOString()
  } else {
    if (!form.from || !form.to) {
      message.error('Please select time range')
      return
    }

    const baseDate = dayjs(form.date).format('YYYY-MM-DD')

    const start = dayjs(`${baseDate} ${form.from.format('HH:mm')}`)
    const end = dayjs(`${baseDate} ${form.to.format('HH:mm')}`)

    if (end.isBefore(start)) {
      message.error('End time must be after start time')
      return
    }

    startDate = start.toISOString()
    endDate = end.toISOString()
  }

  emit('submit', {
    startDate,
    endDate,
    reason: form.reason.trim()
  })
}
</script>

<style scoped>
.time-row {
  display: flex;
  gap: 8px;
}

.half {
  flex: 1;
}

.mt {
  margin-top: 8px;
}
</style>
