<template>
  <div>
    <h3 class="card-title">Today Status</h3>

    <div class="status-list">
      <div class="row">
        <span>Check-in Time :</span>
        <span>-</span>
      </div>
      <div class="row">
        <span>Rank (Today) :</span>
        <span>-</span>
      </div>
      <div class="row">
        <span>Rank Score :</span>
        <span>-</span>
      </div>
      <div class="row">
        <span>Total Hours :</span>
        <span>-</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-title {
  font-weight: 600;
  margin-bottom: 8px;
}

.status-list {
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  padding: 8px;
}

.row {
  display: flex;
  justify-content: space-between;
  padding: 6px 0;
  border-bottom: 1px solid #eee;
  font-size: 14px;
}

.row:last-child {
  border-bottom: none;
}
</style>
