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
          :class="{ selected: selected === 'alone' }"
          @click="select('alone')"
        >
          혼자 여행
        </button>
        <button
          class="choice-button"
          :class="{ selected: selected === 'group' }"
          @click="select('group')"
        >
          함께 여행
        </button>
      </div>
    </div>

    <div class="footer">
      <button class="next-button" :disabled="!selected" @click="goNextStep">
        다음
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useTripAddStore } from '@/stores/tripAddStore';
import { useUserStore } from '@/stores/userStore';
import ScheduleHeaderComponent from '@/components/TripAddHeaderComponent.vue';

const selected = ref(''); // 선택 상태 저장
const store = useTripAddStore();
const userStore = useUserStore();

function select(option) {
  selected.value = option;
}

function goNextStep() {
  store.tripData.companion = selected.value; // 반드시 추가

  //  혼자 여행일 경우 현재 유저 이메일을 그룹 유저로 추가
  if (selected.value === 'alone') {
    store.tripData.invitedEmails = [userStore.user.email];

    // 혼자 여행일 경우 기본 그룹 이름 설정
    if (!store.tripData.groupName) {
      const today = new Date().toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
      store.tripData.groupName = `혼자 여행 (${today})`;
    }
  }

  store.nextStep();
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
  margin-top: 15vh;
}

.question {
  font-size: 18px;
  margin-bottom: 10px;
}

.button-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 20px;
}

.choice-button {
  padding: 14px 20px;
  margin-bottom: 10px;
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
