<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { Pie } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
} from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

const router = useRouter();

const email = ref('test@naver.com');
const groupId = ref(null);
const userCurrency = ref('KRW');
const exchangeRates = ref({});
const budgetData = ref([]);
const travelPeriod = ref({ start: '', end: '' });

const validCategories = [
  'food',
  'transport',
  'accommodation',
  'shopping',
  'traffic',
  'etc',
];

const fetchUserCurrency = async () => {
  try {
    const res = await axios.get('http://localhost:3000/User');
    const user = res.data.find((u) => u.email === email.value);
    if (user) userCurrency.value = user.currency;
  } catch (err) {
    console.error('유저 통화 정보 불러오기 실패:', err);
  }
};

const fetchExchangeRates = async () => {
  try {
    const res = await axios.get(
      `https://open.er-api.com/v6/latest/${userCurrency.value}`
    );
    if (res.data && res.data.rates) {
      exchangeRates.value = res.data.rates;
    } else {
      console.error('환율 정보가 응답에 없습니다:', res.data);
    }
  } catch (error) {
    console.error('환율 데이터 로딩 실패:', error);
  }
};

const convertToUserCurrency = (amount, fromCurrency) => {
  if (
    !exchangeRates.value ||
    !fromCurrency ||
    fromCurrency === userCurrency.value
  )
    return amount;

  const fromRate = exchangeRates.value[fromCurrency];
  if (!fromRate) {
    console.warn('환율 없음:', fromCurrency);
    return 0;
  }

  return Math.round(amount / fromRate);
};

const fetchGroupId = async () => {
  try {
    const res = await axios.get('http://localhost:3000/Group');
    const group = res.data.find((g) => g.groupUser.includes(email.value));
    if (group) {
      groupId.value = parseInt(group.groupId);
      const [start, end] = group.travelPeriod.split(' ~ ');
      travelPeriod.value = { start: new Date(start), end: new Date(end) };
    }
  } catch (err) {
    console.error('그룹 정보 로딩 실패:', err);
  }
};

const loadBudgetData = async () => {
  try {
    const res = await axios.get('http://localhost:3000/GroupBudgetData');
    const filtered = res.data.filter((item) => {
      const usedDate = new Date(item.usedDate);
      return (
        parseInt(item.groupId) === groupId.value &&
        !isNaN(usedDate) &&
        usedDate >= travelPeriod.value.start &&
        usedDate <= travelPeriod.value.end
      );
    });

    budgetData.value = filtered.map((item) => ({
      ...item,
      cost: convertToUserCurrency(item.cost, item.currency),
    }));
  } catch (err) {
    console.error('예산 데이터 로딩 실패:', err);
  }
};

watch([exchangeRates, groupId], ([rates, gid]) => {
  if (rates && gid !== null && Object.keys(rates).length) loadBudgetData();
});

const categoryTotals = computed(() => {
  const totals = {};
  validCategories.forEach((cat) => (totals[cat] = 0));
  budgetData.value.forEach((item) => {
    if (validCategories.includes(item.category)) {
      totals[item.category] += item.cost;
    }
  });
  return totals;
});

const chartData = computed(() => {
  const labels = Object.keys(categoryTotals.value);
  const data = Object.values(categoryTotals.value);
  const total = data.reduce((a, b) => a + b, 0);
  return {
    labels,
    datasets: [
      {
        data,
        backgroundColor: [
          '#ff6b6b',
          '#ffcc00',
          '#ffa94d',
          '#69db7c',
          '#a5d8ff',
          '#b197fc',
        ],
      },
    ],
    percentages: labels.map((_, i) => ((data[i] / total) * 100).toFixed(1)),
  };
});

onMounted(async () => {
  await fetchUserCurrency();
  await fetchExchangeRates();
  await fetchGroupId();
});

// Navigation
const goToCalendar = () => router.push('/TransactionCalendar');
const goToSummary = () => router.push('/TransactionSummary');
const goToList = () => router.push('/TransactionCheckList');
const goToAdd = () => router.push('/TransactionAdd.vue');
</script>

<template>
  <div
    class="w-[393px] h-[852px] mx-auto bg-[#f8f8f8] font-[Inter] text-black overflow-x-hidden"
  >
    <header class="flex items-center justify-between p-4 text-xl font-bold">
      <div><span class="border-b-4 border-[#ffcc00]">Expenses</span></div>
      <img src="/src/assets/icons/character.png" alt="icon" class="w-9 h-9" />
    </header>

    <div class="flex justify-around p-2 font-bold">
      <button @click="goToList" class="px-6 py-1">내역</button>
      <button @click="goToCalendar" class="px-6 py-1">달력</button>
      <button @click="goToSummary" class="bg-[#ffcc00] px-6 py-1 rounded-4xl">
        요약
      </button>
    </div>

    <div class="my-6 mx-4 bg-white p-4 rounded-xl shadow text-center">
      <p class="text-lg font-semibold">Total Expenses</p>
      <p class="text-xl font-bold">
        {{ userCurrency }}
        {{ budgetData.reduce((a, b) => a + b.cost, 0).toLocaleString() }}
      </p>
    </div>

    <div class="px-4">
      <Pie :data="chartData" />
    </div>

    <div class="mt-4 mx-6 text-sm">
      <div
        v-for="(label, index) in chartData.labels"
        :key="label"
        class="flex justify-between items-center py-1 border-b border-gray-200"
      >
        <span>{{ label }}</span>
        <span>{{ chartData.percentages[index] }}%</span>
      </div>
    </div>

    <div class="text-center mt-6 mb-20">
      <button
        class="bg-[#ffcc00] text-black py-1 px-8 rounded-full font-semibold shadow"
        @click="goToAdd"
      >
        ADD
      </button>
    </div>

    <nav
      class="fixed bottom-0 w-[393px] h-16 bg-white border-t border-gray-300 flex justify-around items-center"
    >
      <div class="flex flex-col items-center text-xs text-gray-700">
        <i class="fas fa-home text-lg mb-1"></i>
        <span>홈</span>
      </div>
      <div class="flex flex-col items-center text-xs text-gray-700">
        <i class="fas fa-plus-circle text-lg mb-1"></i>
        <span>내역 추가</span>
      </div>
      <div class="flex flex-col items-center text-xs text-gray-700">
        <i class="fas fa-list text-lg mb-1"></i>
        <span>내역 보기</span>
      </div>
      <div class="flex flex-col items-center text-xs text-gray-700">
        <i class="fas fa-user text-lg mb-1"></i>
        <span>마이페이지</span>
      </div>
    </nav>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
</style>
