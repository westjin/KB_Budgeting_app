<!-- src/pages/TransactionAdd.vue -->
<template>
  <div class="flex flex-col min-h-screen bg-white px-6 pt-6 pb-24">
    <!-- 상단 아이콘 -->
    <div class="flex justify-center mb-4">
      <img src="../assets/icons/YSJ_Wallet.png" alt="지갑" class="w-20 h-20" />
    </div>
    <h1 class="text-center text-xl font-bold mb-6">거래내역 추가</h1>

    <!-- 입력 폼 -->
    <form class="space-y-4">
      <div>
        <label class="block text-sm font-medium">사용 내역</label>
        <input
          type="text"
          class="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>
      <div>
        <label class="block text-sm font-medium">금액</label>
        <input
          type="number"
          class="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>
      <div>
        <label class="block text-sm font-medium">결제 통화</label>
        <input
          type="text"
          class="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>

      <div>
        <label class="block text-sm font-medium mb-1">결제 수단</label>
        <div class="flex space-x-4">
          <label class="flex items-center space-x-1">
            <input type="radio" name="pay" />
            <span>카드</span>
          </label>
          <label class="flex items-center space-x-1">
            <input type="radio" name="pay" />
            <span>현금</span>
          </label>
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium">날짜</label>
        <input
          type="date"
          class="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>

      <div>
        <label class="block text-sm font-medium">카테고리</label>
        <select class="w-full border border-gray-300 rounded px-3 py-2">
          <option>음식</option>
          <option>교통</option>
          <option>숙소</option>
        </select>
      </div>
    </form>

    <!-- 버튼 -->
    <div class="mt-8">
      <button class="w-full py-3 rounded bg-yellow-400 text-white font-bold">
        사용 내역 추가
      </button>
    </div>
  </div>
</template>
