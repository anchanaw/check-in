<template>
  <div>
    <h3 class="card-title">Check-in History</h3>

    <a-table
      :columns="columns"
      :data-source="data"
      size="small"
      bordered
      pagination="false"
    />
  </div>
</template>

<script setup>
const columns = [
  {
    title: 'Date',
    dataIndex: 'date'
  },
  {
    title: 'Time',
    dataIndex: 'time'
  },
  {
    title: 'Status',
    dataIndex: 'status'
  }
]

const data = [
  {
    key: 1,
    date: '12/01/2025',
    time: '09.00 AM',
    status: 'On time'
  }
]
</script>

<style scoped>
.card-title {
  font-weight: 600;
  margin-bottom: 8px;
}
</style>
