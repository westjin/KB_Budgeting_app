<template>
  <div class="w-[393px] h-[852px] mx-auto bg-white px-6 pt-6 pb-24">
    <!-- 상단 헤더 -->
    <div class="flex items-center space-x-3 mb-6">
      <img
        src="@/assets/icons/back-icon.png"
        alt="뒤로가기"
        class="w-[10px] h-[15px] cursor-pointer"
        @click="router.back()"
      />
      <h1 class="text-lg font-bold">환율 상세보기</h1>
    </div>

    <!-- 로딩 / 에러 처리 -->
    <div v-if="store.rates.length === 0" class="text-center text-gray-500">
      불러오는 중...
      <pre>{{ store.rates }}</pre>
    </div>

    <!-- 환율 목록 -->
    <div v-else class="space-y-4">
      <div
        v-for="(rate, index) in store.rates"
        :key="index"
        class="border rounded-xl px-4 py-3 flex justify-between items-center shadow-sm"
      >
        <div class="flex items-center space-x-3">
          <span class="text-2xl">{{ rate.flag }}</span>
          <div>
            <p class="font-semibold">{{ rate.name }}</p>
            <p class="text-xs text-gray-500">1{{ rate.symbol }}</p>
          </div>
        </div>
        <p class="text-base font-bold">
          {{
            '₩ ' +
            rate.value.toLocaleString(undefined, {
              maximumFractionDigits: 2,
            })
          }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useExchangeStore } from '@/stores/exchangeStore';

const router = useRouter();
const store = useExchangeStore();

const CACHE_DURATION = 1000 * 60 * 60; // 1시간

onMounted(async () => {
  const now = Date.now();
  const lastFetched = localStorage.getItem('exchangeFetchedAt');

  if (
    store.rates.length > 0 &&
    lastFetched &&
    now - new Date(lastFetched).getTime() < CACHE_DURATION
  ) {
    return;
  }

  const cached = localStorage.getItem('exchangeRates');
  if (
    cached &&
    lastFetched &&
    now - new Date(lastFetched).getTime() < CACHE_DURATION
  ) {
    store.rates = JSON.parse(cached);
  } else {
    await store.fetchRates();
  }
});
</script>

<style scoped>
/* 필요 시 커스텀 스타일 작성 */
</style>
