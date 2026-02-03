<template>
  <a-table
    :columns="columns"
    :data-source="tasks"
    size="small"
    bordered
    :pagination="false"
  />
</template>

<script setup>
import { h } from 'vue'
import { Switch } from 'ant-design-vue'

/**
 * TODO:
 * - GET /tasks
 * - PATCH /tasks/:id/status
 */

const tasks = [
  {
    key: 1,
    title: 'Share your day',
    bonus: '+2',
    deadline: '26/1/26',
    active: true
  }
]

const columns = [
  {
    title: 'Task title',
    dataIndex: 'title'
  },
  {
    title: 'Bonus',
    dataIndex: 'bonus',
    width: 60,
    align: 'center'
  },
  {
    title: 'Dead line',
    dataIndex: 'deadline',
    width: 80,
    align: 'center'
  },
  {
    title: 'Status',
    key: 'status',
    width: 70,
    align: 'center',
    customRender: ({ record }) =>
      h(Switch, {
        checked: record.active,
        size: 'small',
        onChange: (val) => {
          record.active = val
          console.log('toggle status:', record)
        }
      })
  }
]
</script>
