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

            <div class="arrow">↓</div>

            <label for="end">오는날</label>
            <input
                id="end"
                type="date"
                v-model="store.tripData.endDate"
            />
        </div>
  
      <div class="footer">
        <button class="next-button" @click="store.nextStep">다음</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useTripAddStore } from '@/stores/tripAddStore'
  import ScheduleHeaderComponent from '@/components/TripAddHeaderComponent.vue'
  
  const store = useTripAddStore()
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
  margin: 8px 0 16px;
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