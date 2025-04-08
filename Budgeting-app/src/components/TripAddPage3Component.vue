<template>
  <div class="trip-wrapper">
    <div class="header">
      <ScheduleHeaderComponent />
    </div>

    <div class="main-content">
      <p class="question">👥 <strong>누구랑 함께 여행하나요?</strong></p>

      <div class="button-group">
        <button
          class="choice-button"
          :class="{ selected: selected === '혼자' }"
          @click="select('혼자')"
        >
          혼자 여행
        </button>
        <button
          class="choice-button"
          :class="{ selected: selected === '그룹' }"
          @click="select('그룹')"
        >
          함께 여행
        </button>
      </div>
    </div>

    <div class="footer">
      <button class="next-button" :disabled="!selected" @click="store.nextStep">
        다음
      </button>
    </div>
  </div>
</template>

<script setup>
import { useTripAddStore } from '@/stores/tripAddStore'
import ScheduleHeaderComponent from '@/components/TripAddHeaderComponent.vue'
import { ref } from 'vue';

const selected = ref(''); // 선택 상태 저장
const store = useTripAddStore();

function select(option) {
  selected.value = option
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
  margin-top: 10vh;
}

.question {
  font-size: 18px;
  margin-bottom: 20px;
}

.button-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 20px;
}

.choice-button {
  padding: 14px 20px;
  font-size: 16px;
  border-radius: 12px;
  border: 1px solid #ddd;
  background-color: white;
  cursor: pointer;
  transition: background-color 0.3s;
}

.choice-button.selected {
  background-color: rgba(255, 204, 0, 0.49);
  border-color: #ffcc00;
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
  transition: background-color 0.3s;
}

.next-button:disabled {
  background-color: #ddd;
  cursor: not-allowed;
}
</style>