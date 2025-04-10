<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import axios from 'axios';
import { useUserStore } from '@/stores/userStore';
import { Pie } from 'vue-chartjs';
import { useRouter } from 'vue-router';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  ArcElement,
  CategoryScale,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ChartDataLabels, Title, Tooltip, ArcElement, CategoryScale);

const router = useRouter();

const userStore = useUserStore();

const groupId = ref(null);
const userCurrency = ref('KRW');
const exchangeRates = ref({});
const budgetData = ref([]);
const totalBudget = ref(0);
const travelPeriod = ref({ start: '', end: '' });

const categoryMap = {
  food: '식비',
  transportation: '교통수단',
  accommodation: '숙소',
  shopping: '쇼핑',
  flights: '항공',
  others: '기타',
};

const categoryColors = {
  food: '#ff6b6b',
  transportation: '#ffcc00',
  accommodation: '#ffa94d',
  shopping: '#69db7c',
  flights: '#a5d8ff',
  others: '#b197fc',
};

const validCategories = Object.keys(categoryMap);

const fetchUserCurrency = async () => {
  const res = await axios.get('http://localhost:3000/User');
  const user = res.data.find((u) => u.email === userStore.email);
  if (user) userCurrency.value = user.currency;
};

const fetchExchangeRates = async () => {
  const res = await axios.get(
    `https://open.er-api.com/v6/latest/${userCurrency.value}`
  );
  if (res.data && res.data.rates) {
    exchangeRates.value = res.data.rates;
  }
};

const convertToUserCurrency = (amount, fromCurrency) => {
  if (!exchangeRates.value || fromCurrency === userCurrency.value)
    return amount;
  const rate = exchangeRates.value[fromCurrency];
  return rate ? parseFloat((amount / rate).toFixed(2)) : 0;
};

const userCurrencySymbol = computed(() => {
  const map = { KRW: '₩', USD: '$', JPY: '￥' };
  return map[userCurrency.value] || '';
});

const fetchGroupInfo = async () => {
  const res = await axios.get('http://localhost:3000/Group');
  const group = res.data.find((g) => g.groupUser.includes(userStore.email));
  if (group) {
    groupId.value = parseInt(group.groupId);
    totalBudget.value =
      group.currency && group.currency !== userCurrency.value
        ? convertToUserCurrency(group.budget, group.currency)
        : group.budget;

    const [start, end] = group.travelPeriod.split(' ~ ');
    travelPeriod.value = { start: new Date(start), end: new Date(end) };
  }
};

const loadBudgetData = async () => {
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
};

watch([exchangeRates, groupId], ([rates, gid]) => {
  if (rates && gid !== null) loadBudgetData();
});

const totalUsed = computed(() =>
  budgetData.value.reduce((a, b) => a + b.cost, 0)
);
const remainingBudget = computed(() => totalBudget.value - totalUsed.value);

const sortedCategoryData = computed(() => {
  const totals = {};
  validCategories.forEach((cat) => (totals[cat] = 0));
  budgetData.value.forEach((item) => {
    if (validCategories.includes(item.category)) {
      totals[item.category] += item.cost;
    }
  });
  const total = Object.values(totals).reduce((a, b) => a + b, 0);
  return Object.entries(totals)
    .map(([key, value]) => ({
      key,
      label: categoryMap[key],
      value,
      percentage: total > 0 ? ((value / total) * 100).toFixed(1) : '0.0',
      color: categoryColors[key],
    }))
    .sort((a, b) => b.value - a.value);
});

const chartData = computed(() => ({
  labels: sortedCategoryData.value.map((item) => item.label),
  datasets: [
    {
      data: sortedCategoryData.value.map((item) => item.value),
      backgroundColor: sortedCategoryData.value.map((item) => item.color),
    },
  ],
}));

const chartOptions = {
  plugins: {
    datalabels: {
      color: '#000',
      font: { weight: 'bold', size: 15 },
      anchor: 'center',
      align: 'end',
      offset: 20,
      padding: 2,
      formatter: (value, context) => {
        const total = context.chart.data.datasets[0].data.reduce(
          (a, b) => a + b,
          0
        );
        const percentage = (value / total) * 100;
        if (percentage < 3) return '';
        return context.chart.data.labels[context.dataIndex];
      },
    },
    legend: { display: false },
  },
};

const goToList = () => router.push('/TransactionCheckList');
const goToCalendar = () => router.push('/TransactionCalendar');
const goToAdd = () => router.push('/TransactionAdd');
const goToProfile = () => router.push('/Profile');

onMounted(async () => {
  await fetchUserCurrency();
  await fetchExchangeRates();
  await fetchGroupInfo();
});
</script>

<template>
  <div
    class="w-[393px] h-[852px] mx-auto bg-[#f8f8f8] text-black overflow-x-hidden overflow-y-auto shadow-lg border"
  >
    <!-- 상단 여백 -->
    <div style="height: 44px"></div>

    <header class="flex items-center justify-between p-4 text-xl font-bold">
      <div>
        <span class="border-b-4 border-[#ffcc00] text-2xl">Expenses</span>
      </div>
      <img
        src="/src/assets/icons/character.png"
        alt="icon"
        class="w-9 h-9"
        @click="goToProfile"
      />
    </header>

    <div class="flex justify-around p-2 font-bold">
      <button @click="goToList" class="px-6 py-1">내역</button>
      <button @click="goToCalendar" class="px-6 py-1">달력</button>
      <button class="bg-[#ffcc00] px-6 py-1 rounded-4xl">요약</button>
    </div>

    <!-- 예산 요약 -->
    <div
      class="my-6 mx-4 bg-white p-4 rounded-xl border-1 border-gray-300 text-center"
    >
      <p class="text-lg font-semibold">사용 금액</p>
      <p class="text-xl font-bold">
        {{ userCurrencySymbol }}
        {{ Number(totalUsed.toFixed(2)).toLocaleString() }}
      </p>

      <div class="text-sm text-gray-600 mt-2">
        남은 예산 {{ userCurrencySymbol }}
        {{ Number(remainingBudget.toFixed(2)).toLocaleString() }}
      </div>
    </div>

    <!-- 차트 -->
    <div class="w-60 h-60 mx-auto">
      <Pie :data="chartData" :options="chartOptions" />
    </div>

    <!-- 카테고리 요약 -->
    <div
      class="mt-4 mx-6 text-sm bg-white p-4 rounded-xl border-1 border-gray-300"
    >
      <div
        v-for="(item, index) in sortedCategoryData"
        :key="item.key"
        class="flex justify-between items-center py-1"
      >
        <span class="flex items-center gap-2">
          <span
            class="inline-block w-3 h-3 rounded-full"
            :style="{ backgroundColor: item.color }"
          ></span>
          {{ item.label }}
        </span>
        <span>{{ item.percentage }}%</span>
      </div>
    </div>

    <!-- ADD 버튼 -->
    <div class="text-center mt-6 mb-20">
      <button
        class="bg-[#ffcc00] text-black py-1 px-8 rounded-full font-semibold shadow"
        @click="goToAdd"
      >
        추가
      </button>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
</style>
