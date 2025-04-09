<template>
    <div class="trip-wrapper">
      <div class="header">
        <ScheduleHeaderComponent />
      </div>
  
      <div class="main-content">
        <h1>완료됐어요!</h1>
        <!-- <img :src="finishIcon" al t="finish" class="finish-icon" /> -->
      </div>
  
      <div class="footer">
        <button class="next-button" @click="store.nextStep">완료</button>
      </div>
    </div>
  </template>
  
  <script setup>
//   import finishIcon from '@/assets/icons/finish-icon.png'
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
    justify-content: flex-start; /* 가운데 정렬 → 위쪽 정렬로 변경 */
    margin-top: calc(100vh / 6); /* 화면의 1/6 정도 내려오게 (1/3 아래보단 위 느낌) */
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