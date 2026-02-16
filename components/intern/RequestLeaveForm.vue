<template>
  <a-form layout="vertical" @finish="submit">
    <!-- Leave Type -->
    <a-form-item
      label="Leave Type"
      name="type"
      :rules="[{ required: true, message: 'Please select leave type' }]"
    >
      <a-select v-model:value="form.type" placeholder="Select type">
        <a-select-option value="sick">Sick Type</a-select-option>
        <a-select-option value="personal">Personal Leave</a-select-option>
        <a-select-option value="vacation">Vacation</a-select-option>
      </a-select>
    </a-form-item>

    <!-- Date -->
    <a-form-item
      label="Date"
      name="date"
      :rules="[{ required: true, message: 'Please select date' }]"
    >
      <a-date-picker
        v-model:value="form.date"
        style="width: 100%"
      />
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
        <a-time-picker
          v-model:value="form.from"
          format="HH:mm"
          style="width: 100%"
        />
      </a-form-item>

      <a-form-item label="To" class="half">
        <a-time-picker
          v-model:value="form.to"
          format="HH:mm"
          style="width: 100%"
        />
      </a-form-item>
    </div>

    <!-- Reason -->
    <a-form-item label="Reason">
      <a-textarea
        v-model:value="form.reason"
        placeholder="Value"
        :rows="3"
      />
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

<script setup>
import { reactive } from 'vue'
import dayjs from 'dayjs'

const emit = defineEmits(['submit', 'cancel'])

const form = reactive({
  type: null,
  date: null,
  timeType: 'all_day', // all_day | custom
  from: null,
  to: null,
  reason: ''
})

const submit = () => {
  if (!form.date) return

  let startDate
  let endDate

  if (form.timeType === 'all_day') {
    // เริ่ม 00:00:00
    startDate = dayjs(form.date)
      .startOf('day')
      .toISOString()

    // จบ 23:59:59
    endDate = dayjs(form.date)
      .endOf('day')
      .toISOString()
  } else {
    // custom time
    const baseDate = dayjs(form.date).format('YYYY-MM-DD')

    startDate = dayjs(`${baseDate} ${dayjs(form.from).format('HH:mm')}`)
      .toISOString()

    endDate = dayjs(`${baseDate} ${dayjs(form.to).format('HH:mm')}`)
      .toISOString()
  }

  emit('submit', {
    startDate,
    endDate,
    reason: form.reason
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
