<template>
    <div class="trip-wrapper">
      <ScheduleHeaderComponent />
      <div class="main-content">
        <p class="question">👥 <strong>그룹 이름을 알려주세요!</strong></p>
        <input type="text" class="region-input" placeholder="그룹 이름을 입력해주세요" />
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
  /* 기존 trip-wrapper 스타일 복붙해도 좋아요 */
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
  </style>