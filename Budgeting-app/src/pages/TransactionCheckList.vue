<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

const groupId = ref(route.params.groupId);
console.log('현재 groupId:', groupId.value);

const budgetData = ref([]);

const groupedData = computed(() => {
  const group = {};
  budgetData.value.forEach((item) => {
    if (item.groupId === groupId.value) {
      if (!group[item.usedDate]) group[item.usedDate] = [];
      group[item.usedDate].push(item);
    }
  });

  const sortedGroup = {};
  Object.keys(group)
    .sort((a, b) => new Date(b) - new Date(a))
    .forEach((date) => {
      sortedGroup[date] = group[date];
    });

  return sortedGroup;
});

const fetchBudgetData = async () => {
  const res = await axios.get('/api/GroupBudgetData');
  budgetData.value = res.data;
};

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'short',
  });
};

const getIcon = (category) => {
  const icons = {
    others: '/src/assets/icons/icon_etc.png',
    transportation: '/src/assets/icons/icon_traffic.png',
    food: '/src/assets/icons/icon_food.png',
    flights: '/src/assets/icons/icon_plane.png',
    shopping: '/src/assets/icons/icon_shopping.png',
    accommodation: '/src/assets/icons/icon_accommodation.png',
  };
  return icons[category] || '/src/assets/icons/etc.png';
};

const getCurrencySymbol = (currency) => {
  const map = { KRW: '₩', USD: '$', JPY: '￥' };
  return map[currency] || '';
};

const goToCalendar = () => router.push(`/TransactionCalendar/${groupId.value}`);
const goToSummary = () => router.push(`/TransactionSummary/${groupId.value}`);
const goToAdd = () => router.push(`/transaction/${groupId.value}`);
const goToProfile = () => router.push('/Profile');
const goToDetail = (id) => router.push(`/transactionDetail/${id}`);
const goToHome = () => router.push('/Home');

onMounted(fetchBudgetData);
</script>

<template>
  <div
    class="w-[393px] h-[852px] mx-auto bg-[#f8f8f8] overflow-x-hidden shadow-lg border"
  >
    <div class="h-full overflow-y-auto pt-[44px]">
      <header
        class="flex items-center justify-between p-4 text-xl font-semibold"
      >
        <div class="flex items-center gap-2">
          <img
            src="/src/assets/icons/back-icon.png"
            alt=""
            class="w-[10px] h-[15px] cursor-pointer"
            @click="goToHome"
          />
          <span class="border-b-4 border-[#FFCC00] text-2xl font-bold">
            Expenses
          </span>
        </div>

        <img
          src="/src/assets/icons/profile-icon.png"
          alt="icon"
          class="w-10 h-10"
          @click="goToProfile"
        />
      </header>

      <div class="flex justify-around p-2 mb-2 font-bold">
        <button class="bg-[#ffcc00] px-8 py-1 rounded-4xl">내역</button>
        <button @click="goToCalendar()" class="px-8 py-1">달력</button>
        <button @click="goToSummary" class="px-8 py-1">요약</button>
      </div>

      <div v-for="(group, date) in groupedData" :key="date" class="px-4">
        <h3 class="text-lg font-semibold mb-3">{{ formatDate(date) }}요일</h3>

        <div
          v-for="item in group"
          :key="item.groupBudgetDataId"
          class="bg-white border border-gray-300 rounded-xl px-4 py-3 mb-3 flex justify-between items-center cursor-pointer hover:bg-yellow-50 transition"
          @click="goToDetail(item.id)"
        >
          <div class="flex items-center gap-3">
            <img
              :src="getIcon(item.category)"
              alt="icon"
              class="w-8 h-8 bg-[#ffcc00] rounded-md p-1"
            />
            <div>
              <div class="font-semibold">{{ item.usedAt }}</div>
              <div class="text-xs text-gray-500">{{ item.usedDate }}</div>
            </div>
          </div>
          <div class="font-semibold">
            {{ getCurrencySymbol(item.currency) }}
            {{ item.cost.toLocaleString() }}
          </div>
        </div>
      </div>

      <div class="text-center mt-6 mb-20">
        <button
          class="bg-[#ffcc00] text-black py-1 px-8 rounded-full font-semibold shadow"
          @click="goToAdd"
        >
          추가
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
</style>
