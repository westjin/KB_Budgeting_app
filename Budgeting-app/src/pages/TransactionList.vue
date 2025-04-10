<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const transactionList = ref([
  {
    usage: '마라탕',
    amount: 9000,
    currency: 'KRW',
    payMethod: '현금',
    date: '2025-04-08',
    category: '음식',
  },
  {
    usage: '택시',
    amount: 12000,
    currency: 'KRW',
    payMethod: '카드',
    date: '2025-04-08',
    category: '교통',
  },
  {
    usage: '에어비앤비',
    amount: 56000,
    currency: 'USD',
    payMethod: '카드',
    date: '2025-04-07',
    category: '숙소',
  },
]);

const categoryIcons = {
  음식: '/icons/food.png',
  교통: '/icons/car.png',
  숙소: '/icons/hotel.png',
  쇼핑: '/icons/shopping.png',
};

function deleteTransaction(date, idx) {
  transactionList.value = transactionList.value.filter(
    (tx, i) => !(tx.date === date && i === idx)
  );
}

const groupedTransactions = computed(() => {
  const groups = {};
  for (const tx of transactionList.value) {
    if (!groups[tx.date]) {
      groups[tx.date] = [];
    }
    groups[tx.date].push(tx);
  }
  return Object.keys(groups)
    .sort((a, b) => b.localeCompare(a))
    .map((date) => ({ date, items: groups[date] }));
});

function formatDate(dateStr) {
  const date = new Date(dateStr);
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'short',
  };
  return date.toLocaleDateString('ko-KR', options);
}
</script>

<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4 flex items-center">
      <!-- <img src="/icons/clipboard.png" alt="icon" class="w-6 h-6 mr-2" /> -->
      거래 내역
    </h1>

    <div v-for="group in groupedTransactions" :key="group.date" class="mb-6">
      <h2 class="text-lg font-bold text-gray-800 mb-3">
        {{ formatDate(group.date) }}
      </h2>

      <div
        v-for="(tx, idx) in group.items"
        :key="idx"
        class="bg-gray-50 flex justify-between items-center rounded-lg px-4 py-3 mb-2 shadow-sm border"
      >
        <div class="flex items-center space-x-3">
          <img :src="categoryIcons[tx.category]" alt="icon" class="w-7 h-7" />
          <div>
            <div class="font-semibold text-sm">
              {{ tx.usage }}
              <span class="text-gray-500 text-xs">({{ tx.category }})</span>
            </div>
            <div class="text-xs text-gray-500">{{ tx.payMethod }}</div>
          </div>
        </div>
        <div class="text-right">
          <div class="font-bold text-base">
            {{
              tx.currency === 'KRW' ? '₩' : tx.currency === 'USD' ? '$' : '¥'
            }}
            {{ tx.amount.toLocaleString() }}
          </div>
          <button
            @click="deleteTransaction(tx.date, idx)"
            class="text-red-400 text-xs mt-1 hover:underline"
          >
            삭제
          </button>
        </div>
      </div>
    </div>

    <div class="text-center mt-8">
      <button
        @click="router.push('/transaction')"
        class="bg-yellow-400 hover:bg-yellow-500 text-white px-6 py-3 rounded-lg font-bold text-sm"
      >
        + 거래 추가하러 가기
      </button>
    </div>
  </div>
</template>

<style scoped>
/* 아이콘 폴더: public/icons/ 에 PNG 아이콘 넣어주세요 */
</style>
