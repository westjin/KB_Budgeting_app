<template>
    <div class="trip-wrapper">
      <div class="header">
        <ScheduleHeaderComponent />
      </div>
  
      <div class="main-content">
        <p class="question">✈️ <strong>어디로 여행을 가시나요?</strong></p>
        <input
          type="text"
          class="region-input"
          placeholder="여행지를 입력해주세요"
          v-model="store.tripData.place"
        />
        <p v-if="showError" class="error-message">여행지를 입력해주세요.</p>
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

  const showError = ref(false)
  const store = useTripAddStore()
  function handleNext() {
  if (!store.tripData.place.trim()) {
    showError.value = true
    return
  }
  showError.value = false
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
  justify-content: flex-start; /* 가운데 정렬 → 위쪽 정렬로 변경 */
  margin-top: calc(100vh / 6); /* 화면의 1/6 정도 내려오게 (1/3 아래보단 위 느낌) */
}
  
  .question {
    font-size: 18px;
    margin-bottom: 16px;
  }
  
  .region-input {
    width: 100%;
    margin-top: 14px;
    padding: 12px 16px;
    font-size: 16px;
    border: 1px solid #ddd;
    border-radius: 12px;
    outline: none;
    background-color: white;
  }

  .error-message {
  color: red;
  font-size: 14px;
  margin-top: 8px;
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