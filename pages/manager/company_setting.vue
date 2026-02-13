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

                <CompanyLocationCard v-model:latitude="form.latitude" v-model:longitude="form.longitude"   v-model:radius="form.radius" />

                <CheckinTimeCard v-model:start="form.start_time" v-model:end="form.end_time" />

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
import BackButton from '@/components/base/BackButton.vue'
import CompanyInfoCard from '@/components/manager/settings/CompanyInfoCard.vue'
import CompanyLocationCard from '@/components/manager/settings/CompanyLocationCard.vue'
import CheckinTimeCard from '@/components/manager/settings/CheckinTimeCard.vue'

const loading = ref(false)

const form = reactive({
    name: '',
    latitude: '',
    longitude: '',
    radius: 0,
    start_time: null,
    end_time: null
})

// 🟢 รอ GET API
onMounted(async () => {
    // const res = await api.getCompanySetting()
    // Object.assign(form, res.data)
})

const submit = async () => {
    loading.value = true
    try {
        console.log('submit data', form)
        // await api.updateCompanySetting(form)
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
