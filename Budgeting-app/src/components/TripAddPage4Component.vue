<template>
  <div class="trip-wrapper">
    <div class="header">
      <ScheduleHeaderComponent />
    </div>

    <div class="main-content">
      <p class="question">💵 <strong>예산을 알려주세요</strong></p>
      <div class="budget-row">
        <input
          type="text"
          class="budget-input"
          placeholder="예산을 입력해주세요"
          v-model="store.tripData.budget"
        />
        <select v-model="store.tripData.currency" class="currency-select">
          <option value="KRW">KRW</option>
          <option value="USD">USD</option>
          <option value="JPY">JPY</option>
        </select>
      </div>
      <p v-if="showError" class="error-message">예산을 입력해주세요.</p>
    </div>

    <div class="footer">
      <button class="next-button" @click="handleNext">다음</button>
    </div>
  </div>
</template>

<script setup>
import { useTripAddStore } from '@/stores/tripAddStore';
import ScheduleHeaderComponent from '@/components/TripAddHeaderComponent.vue';
import { ref } from 'vue';
import axios from 'axios';

const store = useTripAddStore();
const showError = ref(false);

async function handleNext() {
  if (!store.tripData.budget.trim()) {
    showError.value = true;
    return;
  }
  showError.value = false;

  const groupData = {
    groupName: store.tripData.groupName,
    place: store.tripData.place,
    travelPeriod: `${store.tripData.startDate} ~ ${store.tripData.endDate}`,
    groupUser: store.tripData.invitedEmails,
    budget: Number(store.tripData.budget),
    currency: store.tripData.currency,
  };

  try {
    await axios.post('http://localhost:3000/Group', groupData);
    store.nextStep();
  } catch (error) {
    console.error('그룹 생성 실패:', error);
    alert('저장 중 오류가 발생했어요.');
  }
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
  margin-top: calc(
    100vh / 6
  ); /* 화면의 1/6 정도 내려오게 (1/3 아래보단 위 느낌) */
}

.question {
  font-size: 18px;
  margin-bottom: 16px;
}

.budget-row {
  display: flex;
  gap: 8px;
  align-items: center;
  margin-top: 12px;
}

.budget-input {
  flex: 1;
  padding: 12px 16px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 12px;
  outline: none;
  background-color: white;
  height: 46px; /* ✅ 고정 높이 */
}

.currency-select {
  padding: 12px 16px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 12px;
  background-color: white;
  height: 46px; /* ✅ input과 동일한 높이 */
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
