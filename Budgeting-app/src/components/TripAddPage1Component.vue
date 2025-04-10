<template>
  <div class="trip-wrapper">
    <div class="header">
      <ScheduleHeaderComponent :back-to-home="true" />
    </div>

    <div class="main-content">
      <p class="question">✈️ <strong>어디로 여행을 가시나요?</strong></p>
      <select v-model="store.tripData.place" class="region-input">
        <option disabled value="">여행지를 선택해주세요</option>
        <option v-for="(name, code) in countries" :key="code" :value="code">
          {{ name }}
        </option>
      </select>
      <p v-if="showError" class="error-message">여행지를 선택해주세요.</p>
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

const countries = {
  US: 'United States',
  JP: 'Japan',
  AU: 'Australia',
  KR: 'South Korea',
  GB: 'United Kingdom',
  FR: 'France',
  DE: 'Germany',
  CA: 'Canada',
  CN: 'China',
  IT: 'Italy',
  ES: 'Spain',
  TH: 'Thailand',
  VN: 'Vietnam',
  MX: 'Mexico',
  IN: 'India',
  BR: 'Brazil'
}

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
  justify-content: flex-start;
  margin-top: calc(100vh / 6);
}

.question {
  font-size: 18px;
  margin-bottom: 16px;
}

/* ✅ 공통 스타일 그대로 유지 (select에도 적용됨) */
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