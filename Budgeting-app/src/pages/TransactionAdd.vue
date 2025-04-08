<script setup>
import { ref, computed } from 'vue';

const showSuccess = ref(false);

// 입력값 상태
const usage = ref('');
const amount = ref('');
const currency = ref('KRW');
const payMethod = ref('');
const date = ref('');
const category = ref('음식');

// 통화 심볼 계산
const currencySymbol = computed(() => {
  switch (currency.value) {
    case 'KRW':
      return '₩';
    case 'USD':
      return '$';
    case 'JPY':
      return '¥';
    default:
      return '';
  }
});

// 표시용: 3자리마다 콤마
const formattedAmount = computed(() => {
  const raw = amount.value.replace(/[^\d]/g, '');
  return raw.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
});

// 입력 시 숫자만 반영
function onAmountInput(e) {
  amount.value = e.target.value.replace(/[^\d]/g, '');
}

// 저장
async function saveTransaction() {
  const numericAmount = Number(amount.value.replace(/,/g, ''));

  const newTransaction = {
    usage: usage.value,
    amount: numericAmount,
    currency: currency.value,
    payMethod: payMethod.value,
    date: date.value,
    category: category.value,
  };

  const res = await fetch('http://localhost:3000/transactions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newTransaction),
  });

  if (res.ok) {
    showSuccess.value = true;

    // 입력 초기화
    usage.value = '';
    amount.value = '';
    currency.value = 'KRW';
    payMethod.value = '';
    date.value = '';
    category.value = '음식';

    setTimeout(() => {
      showSuccess.value = false;
    }, 2000);
  } else {
    alert('저장 실패! 😢');
  }
}
</script>

<template>
  <div
    class="flex flex-col w-[393px] h-[852px] mx-auto bg-white px-6 pt-6 pb-24"
  >
    <!-- 상단 아이콘 -->
    <div class="flex justify-center mb-4">
      <img src="../assets/icons/YSJ_Wallet.png" alt="지갑" class="w-20 h-20" />
    </div>
    <h1 class="text-center text-xl font-bold mb-6">거래내역 추가</h1>

    <form class="space-y-4">
      <!-- 사용 내역 -->
      <div>
        <label class="block text-sm font-medium">사용 내역</label>
        <input
          v-model="usage"
          type="text"
          class="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>

      <!-- 금액 -->
      <div>
        <label class="block text-sm font-medium">금액</label>
        <div class="relative">
          <span
            class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm"
          >
            {{ currencySymbol }}
          </span>
          <input
            type="text"
            :value="formattedAmount"
            @input="onAmountInput"
            class="w-full border border-gray-300 rounded pl-8 pr-3 py-2"
            placeholder="0"
          />
        </div>
      </div>

      <!-- 결제 통화 -->
      <div>
        <label class="block text-sm font-medium">결제 통화</label>
        <select
          v-model="currency"
          class="w-full border border-gray-300 rounded px-3 py-2"
        >
          <option value="KRW">₩ 원화</option>
          <option value="USD">$ 달러</option>
          <option value="JPY">¥ 엔화</option>
        </select>
      </div>

      <!-- 결제 수단 -->
      <div>
        <label class="block text-sm font-medium mb-1">결제 수단</label>
        <div class="flex space-x-4">
          <label class="flex items-center space-x-1">
            <input type="radio" v-model="payMethod" value="카드" />
            <span>카드</span>
          </label>
          <label class="flex items-center space-x-1">
            <input type="radio" v-model="payMethod" value="현금" />
            <span>현금</span>
          </label>
        </div>
      </div>

      <!-- 날짜 -->
      <div>
        <label class="block text-sm font-medium">날짜</label>
        <input
          type="date"
          v-model="date"
          class="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>

      <!-- 카테고리 -->
      <div>
        <label class="block text-sm font-medium">카테고리</label>
        <select
          v-model="category"
          class="w-full border border-gray-300 rounded px-3 py-2"
        >
          <option>음식</option>
          <option>교통수단</option>
          <option>숙소</option>
          <option>쇼핑</option>
          <option>항공</option>
          <option>기타</option>
        </select>
      </div>
    </form>

    <!-- 버튼 -->
    <div class="mt-8">
      <button
        class="w-full py-3 rounded bg-yellow-400 text-white font-bold"
        @click.prevent="saveTransaction"
      >
        사용 내역 추가
      </button>
    </div>

    <div
      v-if="showSuccess"
      class="mt-4 text-center text-green-600 font-semibold bg-green-100 py-2 rounded transition-all duration-300"
    >
      사용 내역이 저장되었습니다!
    </div>
  </div>
</template>

<style scoped></style>
