<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

// route.params로부터 데이터 받기 (임시로 하드코딩된 예시)
const transaction = ref({
  usage: route.query.usage || '하이디라오',
  amount: route.query.amount || '110000',
  currency: route.query.currency || 'KRW',
  payMethod: route.query.payMethod || '카드',
  date: route.query.date || '2025-04-12',
  category: route.query.category || '음식',
});

const currencySymbol = {
  KRW: '₩',
  USD: '$',
  JPY: '¥',
};

function deleteTransaction() {
  // 실제로는 store나 API를 통해 삭제 처리
  alert('삭제되었습니다!');
  router.push('/transactionList');
}
</script>

<template>
  <div class="w-[393px] h-[852px] mx-auto bg-white px-6 pt-6 pb-24">
    <!-- 상단 아이콘 및 타이틀 -->
    <div class="flex flex-col items-center mb-6">
      <img
        src="../assets/icons/YSJ_Wallet.png"
        alt="지갑"
        class="w-20 h-20 mb-2"
      />
      <h1 class="text-xl font-bold">거래내역</h1>
    </div>

    <!-- 내용 표시 -->
    <div class="space-y-4">
      <div>
        <label class="text-sm font-medium">사용 내역</label>
        <p class="mt-1 border border-gray-300 rounded px-3 py-2">
          {{ transaction.usage }}
        </p>
      </div>

      <div>
        <label class="text-sm font-medium">금액</label>
        <p class="mt-1 border border-gray-300 rounded px-3 py-2">
          {{ Number(transaction.amount).toLocaleString() }}
        </p>
      </div>

      <div>
        <label class="text-sm font-medium">결제 통화</label>
        <p class="mt-1 border border-gray-300 rounded px-3 py-2">
          {{ currencySymbol[transaction.currency] }} {{ transaction.currency }}
        </p>
      </div>

      <div>
        <label class="text-sm font-medium">결제 수단</label>
        <div class="mt-1 flex space-x-4">
          <label class="flex items-center space-x-1">
            <input
              type="radio"
              disabled
              :checked="transaction.payMethod === '카드'"
            />
            <span>카드</span>
          </label>
          <label class="flex items-center space-x-1">
            <input
              type="radio"
              disabled
              :checked="transaction.payMethod === '현금'"
            />
            <span>현금</span>
          </label>
        </div>
      </div>

      <div>
        <label class="text-sm font-medium">날짜</label>
        <p class="mt-1 border border-gray-300 rounded px-3 py-2">
          {{ transaction.date }}
        </p>
      </div>

      <div>
        <label class="text-sm font-medium">카테고리</label>
        <p class="mt-1 border border-gray-300 rounded px-3 py-2">
          {{ transaction.category }}
        </p>
      </div>
    </div>

    <!-- 삭제 버튼 -->
    <div class="mt-10">
      <button
        @click="deleteTransaction"
        class="w-full py-3 rounded bg-yellow-400 text-white font-bold"
      >
        사용 내역 삭제
      </button>
    </div>
  </div>
</template>

<style scoped></style>
