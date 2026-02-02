<template>
  <BaseCard class="card" variant="checkin">
    <h3>Location</h3>

    <a-form layout="vertical">
      <a-form-item label="Latitude">
        <a-input placeholder="Value" />
      </a-form-item>

      <a-form-item label="Longitude">
        <a-input placeholder="Value" />
      </a-form-item>

      <a-button class="reset-btn" type="primary" size="small">
        Reset
      </a-button>
    </a-form>
  </BaseCard>
</template>

<style scoped>
.card {
  width: 100%;
}

.reset-btn {
  width: 67px;
  height: 40px;
  background-color: #74C3FF;
  border-radius: 8px;
  border-color: #74C3FF;
}
</style>
