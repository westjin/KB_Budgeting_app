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
    <div v-if="loading" class="text-center text-gray-500">불러오는 중...</div>
    <div v-else-if="error" class="text-center text-red-500">{{ error }}</div>

    <!-- 환율 목록 -->
    <div v-else class="space-y-4">
      <div
        v-for="(rate, index) in exchangeRates"
        :key="index"
        class="border rounded-xl px-4 py-3 flex justify-between items-center shadow-sm"
      >
        <div class="flex items-center space-x-3">
          <span class="text-2xl">{{ rate.flag }}</span>
          <div>
            <p class="font-semibold">{{ rate.name }}</p>
            <p class="text-xs text-gray-500">
              {{ rate.baseUnit }}{{ rate.symbol }}
            </p>
          </div>
        </div>
        <p class="text-base font-bold">
          {{
            rate.value.toLocaleString(undefined, { maximumFractionDigits: 3 })
          }}₩
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();
const exchangeRates = ref([]);
const loading = ref(true);
const error = ref(null);

// 🔑 CurrencyFreaks API Key
const API_KEY = 'f5e4204e10914c9bad64b9a1560238b8';

// 통화 정보 (기본 통화는 USD 기준)
const currencyInfo = {
  USD: { name: 'US Dollar', symbol: '$', flag: '🇺🇸', baseUnit: 1 },
  JPY: { name: 'Japanese Yen', symbol: '¥', flag: '🇯🇵', baseUnit: 100 },
  EUR: { name: 'Euro', symbol: '€', flag: '🇪🇺', baseUnit: 1 },
};

async function fetchExchangeRates() {
  try {
    const response = await axios.get(
      `https://api.currencyfreaks.com/latest?apikey=${API_KEY}&symbols=KRW,JPY,EUR`
    );

    const data = response.data.rates;
    const usdToKrw = parseFloat(data.KRW);
    const usdToJpy = parseFloat(data.JPY);
    const usdToEur = parseFloat(data.EUR);

    exchangeRates.value = [
      {
        country: 'USD',
        name: currencyInfo.USD.name,
        symbol: currencyInfo.USD.symbol,
        flag: currencyInfo.USD.flag,
        baseUnit: 1,
        value: usdToKrw,
      },
      {
        country: 'JPY',
        name: currencyInfo.JPY.name,
        symbol: currencyInfo.JPY.symbol,
        flag: currencyInfo.JPY.flag,
        baseUnit: 100,
        value: (usdToKrw / usdToJpy) * 100,
      },
      {
        country: 'EUR',
        name: currencyInfo.EUR.name,
        symbol: currencyInfo.EUR.symbol,
        flag: currencyInfo.EUR.flag,
        baseUnit: 1,
        value: usdToKrw / usdToEur,
      },
    ];
  } catch (err) {
    error.value = '환율 정보를 불러오는 데 실패했습니다.';
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  fetchExchangeRates();
});
</script>

<style scoped>
/* 필요시 커스텀 스타일 작성 */
</style>
