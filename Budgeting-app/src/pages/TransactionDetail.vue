<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const transaction = ref(null);
const currencySymbol = {
  KRW: '₩',
  USD: '$',
  JPY: '¥',
};

// id 가져와서 API 호출
onMounted(async () => {
  const id = route.params.id;
  const res = await fetch(`http://localhost:3000/transactions/${id}`);
  if (res.ok) {
    transaction.value = await res.json();
  } else {
    alert('거래 내역을 불러오는 데 실패했습니다.');
    router.push('/transactionList');
  }
});

async function deleteTransaction() {
  const id = route.params.id;
  const res = await fetch(`http://localhost:3000/transactions/${id}`, {
    method: 'DELETE',
  });
  if (res.ok) {
    alert('삭제되었습니다!');
    router.push('/transactionList');
  } else {
    alert('삭제에 실패했습니다.');
  }
}
</script>

<template>
  <div
    class="w-[393px] h-[852px] mx-auto bg-white px-6 pt-6 pb-24"
    v-if="transaction"
  >
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
