<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const transaction = ref(null);
const currencySymbol = {
  KRW: '₩',
  USD: '$',
  JPY: '¥',
};

// category 영문 → 한글 매핑 객체
const categoryMap = {
  food: '식비',
  transportation: '교통수단',
  accommodation: '숙소',
  shopping: '쇼핑',
  flights: '항공',
  others: '기타',
};

// 한글로 변환된 카테고리 반환
const translatedCategory = computed(() => {
  return categoryMap[transaction.value?.category] || '기타';
});

// 데이터 불러오기
onMounted(async () => {
  const id = route.params.id;
  const res = await fetch(`http://localhost:3000/GroupBudgetData/${id}`);
  if (res.ok) {
    transaction.value = await res.json();
  } else {
    alert('거래 내역을 불러오는 데 실패했습니다.');
    router.back();
  }
});

// 삭제 기능
async function deleteTransaction() {
  const id = route.params.id;
  const res = await fetch(`http://localhost:3000/GroupBudgetData/${id}`, {
    method: 'DELETE',
  });
  if (res.ok) {
    alert('삭제되었습니다!');
    router.back();
  } else {
    alert('삭제에 실패했습니다.');
  }
}
</script>

<template>
  <div
    v-if="transaction"
    class="w-[393px] h-[852px] mx-auto bg-white px-6 pt-6 pb-24"
  >
    <!-- 상단 -->
    <div class="header-container mb-8">
      <img
        src="@/assets/icons/back-icon.png"
        alt="뒤로가기"
        class="back-icon"
        @click="router.back()"
      />
      <div class="header-content">
        <img
          src="@/assets/icons/YSJ_Wallet.png"
          alt="지갑"
          class="w-20 h-20 mb-3"
        />
        <h1 class="text-xl font-bold">거래내역</h1>
      </div>
    </div>

    <!-- 내용 -->
    <div class="space-y-5">
      <div>
        <label class="text-sm font-medium">사용 내역</label>
        <input
          disabled
          type="text"
          :value="transaction.usedAt"
          class="w-full border border-gray-300 rounded px-3 py-2 mt-1"
        />
      </div>

      <div>
        <label class="text-sm font-medium">금액</label>
        <input
          disabled
          type="text"
          :value="Number(transaction.cost).toLocaleString()"
          class="w-full border border-gray-300 rounded px-3 py-2 mt-1"
        />
      </div>

      <div>
        <label class="text-sm font-medium">결제 통화</label>
        <input
          disabled
          type="text"
          :value="
            currencySymbol[transaction.currency] + ' ' + transaction.currency
          "
          class="w-full border border-gray-300 rounded px-3 py-2 mt-1"
        />
      </div>

      <div>
        <label class="text-sm font-medium">결제 수단</label>
        <div class="mt-1 flex space-x-4">
          <label class="flex items-center space-x-1">
            <input
              type="radio"
              disabled
              :checked="transaction.결제수단 === 'card'"
            />
            <span>카드</span>
          </label>
          <label class="flex items-center space-x-1">
            <input
              type="radio"
              disabled
              :checked="transaction.결제수단 === 'cash'"
            />
            <span>현금</span>
          </label>
        </div>
      </div>

      <div>
        <label class="text-sm font-medium">날짜</label>
        <input
          disabled
          type="text"
          :value="transaction.usedDate"
          class="w-full border border-gray-300 rounded px-3 py-2 mt-1"
        />
      </div>

      <div>
        <label class="text-sm font-medium">카테고리</label>
        <input
          disabled
          type="text"
          :value="translatedCategory"
          class="w-full border border-gray-300 rounded px-3 py-2 mt-1"
        />
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

<style scoped>
.back-icon {
  position: absolute;
  left: 16px;
  top: 24px;
  width: 10px;
  height: 15px;
  cursor: pointer;
}

.header-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.header-content {
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
