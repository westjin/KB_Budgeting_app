<script setup>
import { ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute(); // 현재 route 정보
const groupId = route.params.groupId || ''; // 여기서 groupId 받아옴
const showSuccess = ref(false);

const usage = ref('');
const amount = ref('');
const currency = ref('KRW');
const payMethod = ref('');
const date = ref('');
const category = ref('음식');

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

const formattedAmount = computed(() => {
  const raw = amount.value.replace(/[^\d]/g, '');
  return raw.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
});

function onAmountInput(e) {
  amount.value = e.target.value.replace(/[^\d]/g, '');
}

async function saveTransaction() {
  const numericAmount = Number(amount.value.replace(/,/g, ''));

  const newTransaction = {
    groupId: groupId, // ✅ 여기에 groupId 포함
    usedAt: usage.value,
    cost: numericAmount,
    currency: currency.value,
    결제수단: payMethod.value,
    usedDate: date.value,
    category: category.value,
  };

  const res = await fetch('http://localhost:3000/GroupBudgetData', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newTransaction),
  });

  if (res.ok) {
    showSuccess.value = true;

    usage.value = '';
    amount.value = '';
    currency.value = 'KRW';
    payMethod.value = '';
    date.value = '';
    category.value = '음식';

    setTimeout(() => {
      showSuccess.value = false;
      router.push(`/TransactionCheckList/${groupId}`); // ✅ 저장 후 해당 그룹으로 이동
    }, 1500);
  } else {
    alert('저장 실패! 😢');
  }
}
</script>

<template>
  <div
    class="flex flex-col w-[393px] h-[852px] mx-auto bg-[#F8F8F8] px-6 pt-6 pb-24"
  >
    <!-- 상단 헤더 -->
    <div class="header-container">
      <img
        src="../assets/icons/back-icon.png"
        alt="뒤로가기"
        class="back-icon"
        @click="router.back()"
      />

      <!-- 지갑 아이콘과 타이틀 묶음 (아래로 내림) -->
      <div class="header-content">
        <img
          src="../assets/icons/YSJ_Wallet.png"
          alt="지갑"
          class="w-20 h-20 mb-2"
        />
        <h1 class="text-xl font-bold">거래내역 추가</h1>
      </div>
    </div>

    <!-- 입력 폼 -->
    <form class="space-y-4 mt-4">
      <div>
        <label class="block text-sm font-medium">사용 내역</label>
        <input
          v-model="usage"
          type="text"
          class="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>

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

      <div>
        <label class="block text-sm font-medium mb-1">결제 수단</label>
        <div class="flex space-x-4">
          <label class="flex items-center space-x-1">
            <input type="radio" v-model="payMethod" value="card" />
            <span>카드</span>
          </label>
          <label class="flex items-center space-x-1">
            <input type="radio" v-model="payMethod" value="cash" />
            <span>현금</span>
          </label>
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium">날짜</label>
        <input
          type="date"
          v-model="date"
          class="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>

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

    <!-- 추가 버튼 -->
    <div class="mt-8">
      <button
        @click.prevent="saveTransaction"
        class="w-full py-3 rounded bg-yellow-400 text-white font-bold"
      >
        사용 내역 추가
      </button>
    </div>

    <!-- 저장 완료 메시지 -->
    <div
      v-if="showSuccess"
      class="mt-4 text-center text-green-600 font-semibold bg-green-100 py-2 rounded transition-all duration-300"
    >
      사용 내역이 저장되었습니다!
    </div>
  </div>
</template>

<style scoped>
.header-container {
  position: relative;
  background-color: #f8f8f8;
  z-index: 10;
  padding-bottom: 12px;
}

.back-icon {
  position: absolute;
  left: 16px;
  top: 24px;
  width: 10px;
  height: 15px;
  cursor: pointer;
}

/* 👇 이 부분 추가 */
.header-content {
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
