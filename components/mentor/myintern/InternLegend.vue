<template>
  <div class="legend-card">
    <div class="legend">
      <div class="item">
        <span class="dot checked-in"></span>
        <span>Checked-in</span>
      </div>

      <div class="item">
        <span class="dot leave-pending"></span>
        <span>Leave Pending</span>
      </div>

      <div class="item">
        <span class="dot not-checked"></span>
        <span>Not Checked-in</span>
      </div>

      <div class="item">
        <span class="dot on-leave"></span>
        <span>Not Checked-in (On Leave)</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.legend-card {
  background: #ffffff;
  padding: 18px 22px;
  border-radius: 16px;

  /* เงานุ่มแบบ modern */
  box-shadow: 
    0 4px 6px rgba(0, 0, 0, 0.05),
    0 10px 20px rgba(0, 0, 0, 0.08);

  margin-top: 16px;
}

.legend {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px 40px;
  font-size: 15px;
  color: #333;
}

.item {
  display: flex;
  align-items: center;  /* จัดกึ่งกลางแนวตั้ง */
  gap: 10px;
}

.dot {
  width: 12px;
  height: 12px;
  min-width: 12px;      /* ป้องกันโดนบีบ */
  min-height: 12px;
  border-radius: 50%;
  display: inline-block;
  flex-shrink: 0;       /* สำคัญมาก */
}


/* สีตามภาพ */
.checked-in {
  background: #22c55e; /* เขียว */
}

.leave-pending {
  background: #f59e0b; /* เหลือง */
}

.not-checked {
  background: #bdbdbd; /* เทา */
}

.on-leave {
  background: #3b82f6; /* น้ำเงิน */
}
</style>
