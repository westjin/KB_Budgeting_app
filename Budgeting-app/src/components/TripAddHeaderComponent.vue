<template>
  <div class="header-container">
    <img :src="backIcon" alt="back" class="back-icon" @click="goBack" />
    <span class="header-title">여행 일정 추가</span>
    <div class="dots">
      <span
        v-for="n in totalDots"
        :key="n"
        :class="['dot', { active: n <= activeDotCount }]"
      ></span>
    </div>
  </div>
</template>

<script setup>
import backIcon from '@/assets/icons/back-icon.png'
import { useTripAddStore } from '@/stores/tripAddStore'
import { computed } from 'vue'
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const store = useTripAddStore()
const props = defineProps({
  backToHome: {
    type: Boolean,
    default: false
  }
})

function goBack() {
  if (props.backToHome) {
    store.resetSteps()
    router.push('/') //홈으로 이동
  } else {
    store.prevStep()
  }
}

// 항상 dot 4개 고정
const totalDots = 4

const activeDotCount = computed(() => {
  const step = store.currentStep
  const isGroup = store.tripData.companion === 'group'

  //완료 페이지에서는 항상 4개 다 색칠
  if ((isGroup && step === 7) || (!isGroup && step === 5) )return 4

  // 예산 입력단계(혼자든 그룹이든 마지막 단계)
  if ((isGroup && step === 6) || (!isGroup && step === 4)) {
    return 4
  }

  // 그룹이면 최대 3개까지만 칠함
  if (isGroup) return Math.min(step, 3)

  // 혼자면 현재 단계 그대로
  return step
})
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