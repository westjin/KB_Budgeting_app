<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const exchangeRates = ref([
  { country: 'US', name: 'US Dollar', value: 1466.74, symbol: '$', flag: '🇺🇸' },
  {
    country: 'JP',
    name: 'Japanese Yen',
    value: 10.23,
    symbol: '¥',
    flag: '🇯🇵',
  },
  { country: 'EU', name: 'Euro', value: 1578.34, symbol: '€', flag: '🇪🇺' },
]);

const currentSlide = ref(0);
const hasTravelPlans = ref(false);

function nextSlide() {
  currentSlide.value = (currentSlide.value + 1) % exchangeRates.value.length;
}

function prevSlide() {
  currentSlide.value =
    (currentSlide.value - 1 + exchangeRates.value.length) %
    exchangeRates.value.length;
}
</script>

<template>
  <div class="w-[393px] h-[852px] mx-auto bg-white px-6 pt-10 pb-24">
    <!-- 상단 헤더 -->
    <div class="flex justify-between items-center mb-4">
      <div class="flex items-center space-x-2">
        <img src="@/assets/icons/airplane.png" alt="로고" class="w-6 h-6" />
        <span class="text-lg font-bold text-yellow-600">TripLog</span>
      </div>
      <img src="@/assets/icons/profile-icon.png" alt="프로필" class="w-8 h-8" />
    </div>

    <hr class="mb-4 border-gray-300" />

    <!-- 환율 보기 -->
    <div>
      <h2 class="text-base font-bold mb-2">환율 한눈에 보기</h2>

      <div class="relative">
        <div
          class="border border-blue-400 rounded-xl px-4 py-3 flex justify-between items-center"
        >
          <!-- 왼쪽 화살표 -->
          <button @click="prevSlide" class="text-gray-500">
            <img
              src="@/assets/icons/arrow-left.svg"
              alt="prev"
              class="w-5 h-5"
            />
          </button>

          <!-- 중앙 환율 정보 -->
          <div class="flex items-center space-x-3">
            <span class="text-3xl">{{ exchangeRates[currentSlide].flag }}</span>
            <div class="flex flex-col justify-center leading-none">
              <p class="font-semibold text-base">
                {{ exchangeRates[currentSlide].name }}
              </p>
              <p class="text-xs text-gray-500">
                1{{ exchangeRates[currentSlide].symbol }}
              </p>
            </div>
          </div>

          <!-- 오른쪽 환율 + 화살표 -->
          <div class="flex items-center space-x-2">
            <p class="text-lg font-bold">
              {{ exchangeRates[currentSlide].value.toLocaleString() }}₩
            </p>
            <button @click="nextSlide" class="text-gray-500">
              <img
                src="@/assets/icons/arrow-right.svg"
                alt="next"
                class="w-5 h-5"
              />
            </button>
          </div>
        </div>

        <!-- 상세보기 버튼 -->
        <div
          class="absolute -top-4 right-0 text-sm text-blue-500 cursor-pointer"
          @click="router.push('/exchangeDetail')"
        >
          상세보기
        </div>
      </div>

      <!-- 슬라이드 인디케이터 -->
      <div class="flex justify-center mt-2 space-x-1">
        <span
          v-for="(rate, index) in exchangeRates"
          :key="index"
          class="w-2 h-2 rounded-full"
          :class="currentSlide === index ? 'bg-yellow-500' : 'bg-gray-300'"
        ></span>
      </div>
    </div>

    <!-- 여행 리스트 -->
    <div class="mt-6">
      <h2 class="text-base font-bold mb-2">내 여행 리스트</h2>

      <div
        v-if="!hasTravelPlans"
        class="flex flex-col items-center text-center"
      >
        <img
          src="@/assets/icons/character.png"
          alt="캐릭터"
          class="w-36 h-36 mb-3"
        />
        <p class="text-sm text-gray-600 mb-4">여행 계획이 없어요!</p>
        <button
          class="bg-yellow-400 text-white px-6 py-2 rounded-full font-semibold"
          @click="router.push('/createTrip')"
        >
          여행 추가
        </button>
      </div>

      <div v-else>
        <!-- 여행 목록 있을 때 화면 구현 -->
      </div>
    </div>
  </div>
</template>

<style scoped></style>
