<template>
    <div class="trip-wrapper">
      <ScheduleHeaderComponent />
      <div class="main-content">
        <p class="question">👥 <strong>그룹 이름을 알려주세요!</strong></p>
        <input type="text" class="group-name-input" placeholder="그룹 이름을 입력해주세요" v-model="store.tripData.groupName" />
        <!-- ✅ 에러 메시지 -->
        <p v-if="showError" class="error-message">그룹 이름을 입력해주세요.</p>
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
  const showError = ref(false)

  function handleNext() {
    if (!store.tripData.groupName.trim()) {
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
    justify-content: flex-start;
    margin-top: calc(100vh / 6);
}

.question {
    font-size: 18px;
    margin-bottom: 10px;
}

.group-name-input {
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
  font-size: 12px;
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