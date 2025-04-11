<template>
  <div class="trip-wrapper">
    <div class="header">
      <ScheduleHeaderComponent />
    </div>

    <div class="main-content">
      <p class="done-text">완료됐어요!</p>
      <img :src="finishIcon" al t="finish" class="finish-icon" />
    </div>

    <div class="footer">
      <button class="next-button" @click="goToHome">완료</button>
    </div>
  </div>
</template>

<script setup>
import finishIcon from '@/assets/icons/finish-icon.png';
import { useTripAddStore } from '@/stores/tripAddStore';
import ScheduleHeaderComponent from '@/components/TripAddHeaderComponent.vue';
import { useRouter } from 'vue-router';

const store = useTripAddStore();
const router = useRouter();

function goToHome() {
  store.resetSteps();
  router.push('/home'); // ✅ 홈으로 이동
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin-top: 160px;
}

.done-text {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 24px;
  text-align: center;
}

.finish-icon {
  width: 65px;
  height: 65px;
  object-fit: contain;
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
