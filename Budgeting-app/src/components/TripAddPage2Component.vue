<template>
    <div class="trip-wrapper">
      <div class="header">
        <ScheduleHeaderComponent />
      </div>
  
      <div class="main-content">
        <p class="question">📅 <strong>여행 기간을 알려주세요</strong></p>
        <label for="start">가는날</label>
            <input
                id="start"
                type="date"
                v-model="store.tripData.startDate"
            />
            <!-- ✅ 가는날 에러 메시지 -->
            <p v-if="showStartError" class="error-message">가는 날을 선택해주세요.</p>

            <div class="arrow">↓</div>

            <label for="end">오는날</label>
            <input
                id="end"
                type="date"
                v-model="store.tripData.endDate"
            />
            <!-- ✅ 오는날 에러 메시지 -->
            <p v-if="showEndError" class="error-message">오는 날을 선택해주세요.</p>

            <!-- ❗ 날짜 순서 오류 -->
            <p v-if="showDateOrderError" class="error-message">
              올바른 날짜를 선택해주세요.
            </p>
        </div>
  
      <div class="footer">
        <button class="next-button" @click="handleNext">다음</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useTripAddStore } from '@/stores/tripAddStore'
  import ScheduleHeaderComponent from '@/components/TripAddHeaderComponent.vue'

  const store = useTripAddStore()
  // ✅ 에러 상태를 위한 ref 추가
  const showStartError = ref(false)
  const showEndError = ref(false)
  const showDateOrderError = ref(false)

  function handleNext() {
    const { startDate, endDate } = store.tripData

    showStartError.value = !startDate
    showEndError.value = !endDate
    showDateOrderError.value = false

    if (!startDate || !endDate) return

    // ❗ 날짜 순서 체크
    const start = new Date(startDate)
    const end = new Date(endDate)

    if (start > end) {
      showDateOrderError.value = true
      return
  }

  store.nextStep()
}
  </script>
  
  <style scoped>
  .trip-wrapper {
    max-width: 393px;
    width: 100%;
    height: 100vh;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 24px;
    background-color: var(--color-bg);
    box-sizing: border-box;
  }
  
  .main-content {
    flex: 1;
    padding-left: 25px;
    display: flex;
    flex-direction: column;
    justify-content: flex; /* 가운데 정렬 → 위쪽 정렬로 변경 */
    margin-top: 10vh; /* 화면의 1/6 정도 내려오게 (1/3 아래보단 위 느낌) */
}

input[type='date'] {
  padding: 12px;
  padding-right: 10px;
  width: 90%;
  font-size: 16px;
  border-radius: 12px;
  border: 1px solid #ccc;
  margin: 8px 0 8px;
}

.error-message {
  color: red;
  font-size: 12px;
  margin-bottom: 8px;
  margin-left: 8px;
}

.arrow {
  text-align: center;
  font-size: 24px;
  margin: 8px 0;
}
.question {
    font-size: 18px;
    margin-bottom: 20px;
}
  
  .footer {
    display: flex;
    justify-content: center;
    margin-bottom: 82px;
  }
  
  .next-button {
    background-color: var(--color-main);
    color: black;
    padding: 14px 40px;
    border: none;
    border-radius: 14px;
    font-size: 16px;
    font-weight: bold;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }
  </style>