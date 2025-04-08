<template>
  <div class="header-container">
    <img :src="backIcon" alt="back" class="back-icon" @click="goBack" />
    <span class="header-title">여행 일정 추가</span>
    <div class="dots">
      <span
        v-for="n in 4"
        :key="n"
        :class="['dot', { active: n <= store.currentStep }]"
      ></span>
    </div>
  </div>
</template>

<script setup>
import backIcon from '@/assets/icons/back-icon.png'
import { useTripAddStore } from '@/stores/tripAddStore'

const store = useTripAddStore()

function goBack() {
  store.prevStep()
}
</script>

<style scoped>
.header-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: calc(env(safe-area-inset-top, 0px) + 16px);
  padding-bottom: 12px;
  background-color: #f8f8f8;
  position: relative;
  z-index: 10;
}

/* .back-icon {
  position: absolute;
  left: 16px;
  top: 16px;
  width: 10px;
  cursor: pointer;
} */

.back-icon {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  width: 10px;
  height: 15px;
  cursor: pointer;
}

.header-title {
  margin-top: 16px;
  font-size: 18px;
  font-weight: bold;
  color: #000;
}

.dots {
  margin-top: 20px;
  display: flex;
  gap: 6px;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #ccc;
}

.dot.active {
  background-color: #ffc107;
}
</style>