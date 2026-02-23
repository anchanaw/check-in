<template>
    <div class="company-page">
        <div class="page">
            <div class="top-header">
                <BackButton />
                <span class="title">Company Setting</span>
            </div>

            <BackHeader title="Company Setting" />

            <a-form layout="vertical" :model="form" @finish="submit">
                <CompanyInfoCard v-model:name="form.name" />

                <CompanyLocationCard v-model:latitude="form.latitude" v-model:longitude="form.longitude"
                    v-model:radius="form.radius" />

                <CheckinTimeCard v-model:start="form.start_time" v-model:end="form.end_time" />

                <a-form-item label="Assign Mentors">
                    <a-select v-model:value="form.mentorIds" mode="multiple" :options="mentorOptions"
                        placeholder="Select mentors" />
                </a-form-item>

                <div class="save-wrapper">
                    <a-button type="primary" block :loading="loading" html-type="submit">
                        Save Setting
                    </a-button>
                </div>
            </a-form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import { message } from 'ant-design-vue'

import BackButton from '@/components/base/BackButton.vue'
import CompanyInfoCard from '@/components/manager/settings/CompanyInfoCard.vue'
import CompanyLocationCard from '@/components/manager/settings/CompanyLocationCard.vue'
import CheckinTimeCard from '@/components/manager/settings/CheckinTimeCard.vue'
import { useApiFetch } from '~/composables/useApiFetch'

const loading = ref(false)
const officeId = ref<string | null>(null)
const mentorOptions = ref<{ label: string; value: string }[]>([])

const form = reactive<{
    name: string
    latitude: string
    longitude: string
    radius: number
    start_time: Dayjs | null
    end_time: Dayjs | null
    mentorIds: string[]
}>({
    name: '',
    latitude: '',
    longitude: '',
    radius: 0,
    start_time: null,
    end_time: null,
    mentorIds: []
})

const loadMentors = async () => {
    try {
        const res = await useApiFetch('/users/mentors')
        const list = res?.data ?? []

        mentorOptions.value = list.map((m: any) => ({
            label: `${m.firstName} ${m.lastName}`,
            value: m.id
        }))
    } catch (err) {
        console.error(err)
    }
}
const loadOffice = async () => {
    try {
        const res = await useApiFetch('/offices', {
            method: 'GET'
        })

        const list = Array.isArray(res) ? res : res?.data

        if (!list || !Array.isArray(list) || list.length === 0) return

        const office = list[0]

        officeId.value = office.id ?? null

        form.name = office.name ?? ''
        form.latitude = office.latitude != null ? String(office.latitude) : ''
        form.longitude = office.longitude != null ? String(office.longitude) : ''
        form.radius = office.radiusMeters ?? 0

        form.start_time = dayjs()
            .hour(office.checkInStartHour ?? 0)
            .minute(office.checkInStartMinute ?? 0)

        form.end_time = dayjs()
            .hour(office.checkInEndHour ?? 0)
            .minute(office.checkInEndMinute ?? 0)

        form.mentorIds = office.mentorIds ?? []

    } catch (err) {
        console.error(err)
    }
}
/* ==============================
   GET OFFICE (onMounted)
================================ */
onMounted(() => {
    loadOffice()
    loadMentors()
})

/* ==============================
   SUBMIT
================================ */
const submit = async () => {
    if (!form.start_time || !form.end_time) {
        message.error('Please select check-in time')
        return
    }

    loading.value = true
    if (form.end_time.isBefore(form.start_time)) {
        message.error('End time must be after start time')
        return
    }
    try {
        const payload = {
            name: form.name,
            latitude: Number(form.latitude),
            longitude: Number(form.longitude),
            radiusMeters: Number(form.radius),

            checkInStartHour: form.start_time.hour(),
            checkInStartMinute: form.start_time.minute(),

            checkInEndHour: form.end_time.hour(),
            checkInEndMinute: form.end_time.minute(),

            lateThresholdHour: form.end_time.hour(),
            lateThresholdMinute: form.end_time.minute(),

            mentorIds: form.mentorIds
        }

        if (officeId.value) {
            await useApiFetch(`/offices/${officeId.value}`, {
                method: 'PATCH',
                body: payload
            })

            message.success('Company setting updated successfully')
            await loadOffice() // 🔥 รีโหลดค่าล่าสุด
        } else {
            const res = await useApiFetch('/offices', {
                method: 'POST',
                body: payload
            })

            officeId.value = res?.id ?? null
            message.success('Company setting created successfully')
            await loadOffice() // 🔥 รีโหลดหลังสร้าง
        }

    } catch (err) {
        console.error(err)
        message.error('Something went wrong')
    } finally {
        loading.value = false
    }
}
</script>

<style scoped>
.company-page {
    min-height: 100vh;
    background: linear-gradient(180deg, #6CBCFA 0%, #6CBCFA 100%);
    padding-bottom: 40px;
}

.page {
    padding: 16px;
}

.top-header {
    position: relative;
    height: 42px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.back-btn {
    position: absolute;
    left: 16px;
}

.title {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    margin: 0;
    font-size: 22px;
    font-weight: 700;
    white-space: nowrap;
    /* 🔥 ตัวนี้สำคัญ */
}


.save-wrapper {
    margin-top: 12px;
}
</style>
