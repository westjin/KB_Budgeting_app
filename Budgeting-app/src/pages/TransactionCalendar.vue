<template>
  <div
    class="w-[393px] h-[852px] mx-auto bg-[#f8f8f8] font-[Inter] text-black overflow-x-hidden"
  >
    <header class="flex items-center justify-between p-4 text-xl font-bold">
      <div>
        <span class="border-b-4 border-[#ffcc00]">Expenses</span>
      </div>
      <img src="/src/assets/icons/character.png" alt="icon" class="w-9 h-9" />
    </header>

    <div class="flex justify-around p-2 mb-2 font-bold">
      <button @click="goToList" class="px-8 py-1">내역</button>
      <button class="bg-[#ffcc00] px-8 py-1 rounded-4xl">달력</button>
      <button @click="goToSummary" class="px-8 py-1">요약</button>
    </div>

    <!-- 월 이동 버튼 -->
    <div class="flex justify-between items-center px-6 mt-4">
      <button @click="changeMonth(-1)">‹</button>
      <div class="text-lg font-semibold">{{ year }}년 {{ month + 1 }}월</div>
      <button @click="changeMonth(1)">›</button>
    </div>

    <!-- 캘린더 표시 -->
    <div class="bg-white m-4 p-4 rounded-xl shadow">
      <div class="grid grid-cols-7 gap-2 text-center text-sm">
        <div v-for="(day, idx) in days" :key="idx" class="text-gray-500">
          {{ day }}
        </div>
        <div
          v-for="(date, index) in calendarDates"
          :key="index"
          @click="selectDate(date.date)"
          :class="[
            'cursor-pointer py-2 rounded-full',
            date.hasExpense ? 'bg-[#ffcc00]' : '',
            selectedDate === date.date ? 'ring-2 ring-black' : '',
          ]"
        >
          {{ date.displayDate }}
        </div>
      </div>
    </div>

    <!-- 선택된 날짜 지출 표시 -->
    <div
      v-if="selectedData.length"
      class="bg-white mx-4 mb-6 p-4 rounded-xl shadow"
    >
      <div class="text-md font-semibold mb-2">
        {{ formatDate(selectedDate) }}
      </div>
      <div
        v-for="item in selectedData"
        :key="item.groupBudgetDataId"
        class="flex justify-between text-sm mb-1"
      >
        <span>{{ item.usedAt }}</span>
        <span
          >{{ getCurrencySymbol(item.currency) }}
          {{ item.cost.toLocaleString() }}</span
        >
      </div>
    </div>

    <div class="text-center mb-20">
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
      <h1>네비게이션바</h1>
    </nav>
  </div>
</template>

<script>
import axios from 'axios';
import { ref, reactive, computed, onMounted } from 'vue';

export default {
  setup() {
    // 임시!!
    const email = ref('test@naver.com');
    const groupId = ref(null);
    const budgetData = ref([]);
    const selectedDate = ref(null);

    const today = new Date();
    const year = ref(today.getFullYear());
    const month = ref(today.getMonth());
    const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

    const groupedData = computed(() => {
      const group = {};
      budgetData.value.forEach((item) => {
        if (item.groupId === groupId.value) {
          if (!group[item.usedDate]) group[item.usedDate] = [];
          group[item.usedDate].push(item);
        }
      });
      return group;
    });

    const calendarDates = computed(() => {
      const firstDay = new Date(year.value, month.value, 1);
      const daysInMonth = new Date(year.value, month.value + 1, 0).getDate();
      const startDay = firstDay.getDay();
      const dates = [];

      for (let i = 0; i < startDay; i++)
        dates.push({ date: '', displayDate: '', hasExpense: false });

      for (let i = 1; i <= daysInMonth; i++) {
        const date = new Date(year.value, month.value, i);
        date.setHours(date.getHours() + 9); // 날짜 보정
        const dateStr = date.toISOString().split('T')[0];
        dates.push({
          date: dateStr,
          displayDate: i,
          hasExpense: !!groupedData.value[dateStr],
        });
      }
      return dates;
    });

    const selectedData = computed(
      () => groupedData.value[selectedDate.value] || []
    );

    const fetchGroupId = async () => {
      try {
        const res = await axios.get('http://localhost:3000/Group');
        const group = res.data.find((g) => g.groupUser.includes(email.value));
        if (group) {
          groupId.value = parseInt(group.groupId);
          await fetchBudgetData();
        }
      } catch (err) {
        console.error('그룹 ID 가져오기 실패:', err);
      }
    };

    const fetchBudgetData = async () => {
      try {
        const res = await axios.get('http://localhost:3000/GroupBudgetData');
        budgetData.value = res.data.filter(
          (item) => item.groupId == groupId.value
        );
      } catch (error) {
        console.error('데이터를 불러오는 데 실패했습니다:', error);
      }
    };

    const formatDate = (dateStr) => {
      const date = new Date(dateStr);
      const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
      };
      return date.toLocaleDateString('ko-KR', options);
    };

    const getCurrencySymbol = (currency) => {
      const map = { KRW: '₩', USD: '$', JPY: '￥' };
      return map[currency] || '';
    };

    const goToList = () => {
      window.location.href = '/TransactionCheckList';
    };
    const goToSummary = () => {
      window.location.href = '/TransactionSummary';
    };
    const goToAdd = () => {
      window.location.href = '/TransactionAdd.vue';
    };

    const changeMonth = (offset) => {
      const newDate = new Date(year.value, month.value + offset);
      year.value = newDate.getFullYear();
      month.value = newDate.getMonth();
    };

    const selectDate = (date) => {
      if (date) selectedDate.value = date;
    };

    onMounted(() => {
      fetchGroupId();
    });

    return {
      email,
      groupId,
      budgetData,
      selectedDate,
      year,
      month,
      days,
      groupedData,
      calendarDates,
      selectedData,
      formatDate,
      getCurrencySymbol,
      goToList,
      goToSummary,
      goToAdd,
      changeMonth,
      selectDate,
    };
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
</style>
