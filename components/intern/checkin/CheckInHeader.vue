<template>
    <div class="header">
        <div class="top">
            <div class="user-name">Hi, {{ userName }}</div>
            <a-button class="notification-btn" type="text" shape="circle" @click="goToNoti">
                <BellOutlined />
            </a-button>
        </div>

        <!-- 🔥 กล่องวันที่ -->
        <a-tag class="date-tag">
            {{ date }}
        </a-tag>
    </div>
</template>

<script setup>
import { BellOutlined } from '@ant-design/icons-vue'
import { useRouter } from 'vue-router'
import dayjs from 'dayjs'

defineProps({
  userName: String
})

const router = useRouter()

const goToNoti = () => {
  router.push('/intern/notifications')
}

// 🔥 วันที่วันนี้แบบไทย
const today = dayjs()
const date = `${today.format('DD MMM')} ${today.year() + 543}`
</script>


<style scoped>
.header {
    width: 100%;
    padding: 20px;
    margin-bottom: 24px;
}

.top {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.user-name {
    font-size: 36px;
    font-weight: bold;
}

.date-tag {
    margin-top: 8px;
    font-size: 32px;
    padding: 6px 12px;
    border-radius: 6px;
}

.notification-btn {
    font-size: 30px;
}
</style>
