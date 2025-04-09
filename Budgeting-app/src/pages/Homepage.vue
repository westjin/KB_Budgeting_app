<template>
  <div class="w-[393px] h-[852px] mx-auto bg-white px-4 pt-8 pb-24">
    <!-- 상단 로고 및 프로필 -->
    <div class="flex justify-between items-center mb-6">
      <div class="text-xl font-bold text-[#D4A016] flex items-center space-x-1">
        <img src="@/assets/icons/airplane.png" alt="로고" class="w-5 h-5" />
        <span>TripLog</span>
      </div>
      <img
        src="@/assets/icons/profile-icon.png"
        alt="프로필"
        class="w-8 h-8 rounded-full"
      />
    </div>

    <div class="mt-8">
      <div
        v-if="exchangeStore.rates.length === 0"
        class="text-center text-gray-500"
      >
        환율 정보를 불러오는 중...
      </div>
      <!-- 환율 타이틀 + 상세보기 -->
      <div v-else class="flex justify-between items-center mb-3">
        <span class="text-base font-semibold text-gray-800">
          환율 한눈에 보기
        </span>
        <span class="text-sm text-blue-500 cursor-pointer" @click="goToDetails">
          상세보기
        </span>
      </div>

      <!-- 환율 카드 슬라이드 -->
      <div class="relative flex items-center justify-center mb-4">
        <button
          @click="prevCard"
          class="absolute left-0 p-2 text-xl text-gray-400"
        >
          ←
        </button>

        <div
          v-if="currentCard"
          class="flex justify-between items-center border border-gray-300 rounded-xl px-4 py-3 shadow w-full mx-8"
        >
          <div class="flex items-center space-x-2">
            <div class="text-2xl">{{ currentCard.flag }}</div>
            <div>
              <div class="font-semibold text-[15px]">
                {{ currentCard.name }}
              </div>
              <div class="text-xs text-gray-500">1{{ currentCard.symbol }}</div>
            </div>
          </div>
          <div class="text-lg font-bold text-gray-800">
            {{ currentCard.value.toLocaleString() }}₩
          </div>
        </div>

        <button
          @click="nextCard"
          class="absolute right-0 p-2 text-xl text-gray-400"
        >
          →
        </button>
      </div>

      <!-- 페이지네이션 -->
      <div class="flex justify-center items-center space-x-1 mb-6">
        <div
          v-for="(rate, index) in exchangeStore.rates"
          :key="index"
          :class="[
            'w-2 h-2 rounded-full',
            index === currentIndex ? 'bg-yellow-400' : 'bg-gray-300',
          ]"
        ></div>
      </div>

      <!-- 내 여행 리스트 -->
      <h2 class="text-base font-bold mt-10 mb-4">내 여행 리스트</h2>
      <div class="flex flex-col items-center text-center space-y-3">
        <img
          src="@/assets/icons/character.png"
          alt="여행 없음 캐릭터"
          class="w-32 h-32"
        />
        <p class="text-gray-500 text-sm">여행 계획이 없어요!</p>
        <button
          class="bg-yellow-400 text-white font-bold px-6 py-2 rounded-full"
        >
          여행 추가
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useExchangeStore } from '@/stores/exchangeStore';

const router = useRouter();
const exchangeStore = useExchangeStore();

onMounted(async () => {
  if (exchangeStore.rates.length === 0) {
    await exchangeStore.fetchRates();
  }
});

const currentIndex = ref(0);

const currentCard = computed(() =>
  exchangeStore.rates.length > 0
    ? exchangeStore.rates[currentIndex.value]
    : null
);

function prevCard() {
  if (currentIndex.value > 0) currentIndex.value--;
}
function nextCard() {
  if (currentIndex.value < exchangeStore.rates.length - 1) currentIndex.value++;
}
function goToDetails() {
  router.push('/exchangeDetail');
}
</script>

<style scoped>
/* 필요 시 커스텀 스타일 추가 */
</style>
