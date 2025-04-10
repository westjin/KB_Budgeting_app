<template>
  <div class="w-[393px] h-[852px] mx-auto bg-white px-4 pt-8 pb-24">
    <!-- 상단 로고 및 프로필 -->
    <div class="flex justify-between items-center mb-6">
      <div class="text-xl font-bold text-[#D4A016] flex items-center space-x-1">
        <img src="@/assets/icons/airplane.png" alt="로고" class="w-5 h-5" />
        <span>TripLog</span>
      </div>
      <img
        src="@/assets/icons/profile-icon.png"
        alt="프로필"
        class="w-8 h-8 rounded-full cursor-pointer"
        @click="goToProfile"
      />
    </div>

    <!-- 환율 -->
    <div class="mt-8">
      <div
        v-if="exchangeStore.rates.length === 0"
        class="text-center text-gray-500"
      >
        환율 정보를 불러오는 중...
      </div>
      <div v-else class="flex justify-between items-center mb-3">
        <span class="text-base font-semibold text-gray-800"
          >환율 한눈에 보기</span
        >
        <span class="text-sm text-blue-500 cursor-pointer" @click="goToDetails">
          상세보기
        </span>
      </div>

      <div class="relative flex items-center justify-center mb-4">
        <button
          @click="prevCard"
          class="absolute left-0 p-2 text-xl text-gray-400"
        >
          ←
        </button>

        <div
          v-if="currentCard"
          class="flex justify-between items-center border border-gray-300 rounded-xl px-4 py-3 shadow w-full mx-8"
        >
          <div class="flex items-center space-x-2">
            <div class="text-2xl">{{ currentCard.flag }}</div>
            <div>
              <div class="font-semibold text-[15px]">
                {{ currentCard.name }}
              </div>
              <div class="text-xs text-gray-500">1{{ currentCard.symbol }}</div>
            </div>
          </div>
          <div class="text-lg font-bold text-gray-800">
            {{ '₩ ' + currentCard.value.toLocaleString() }}
          </div>
        </div>

        <button
          @click="nextCard"
          class="absolute right-0 p-2 text-xl text-gray-400"
        >
          →
        </button>
      </div>

      <div class="flex justify-center items-center space-x-1 mb-6">
        <div
          v-for="(rate, index) in exchangeStore.rates"
          :key="index"
          :class="[
            'w-2 h-2 rounded-full',
            index === currentIndex ? 'bg-yellow-400' : 'bg-gray-300',
          ]"
        ></div>
      </div>

      <!-- 여행 리스트 -->
      <h2 class="text-base font-bold mt-10 mb-4">내 여행 리스트</h2>

      <div v-if="groupStore.groups.length > 0" class="space-y-3 min-h-[350px]">
        <div
          v-for="group in pagedGroups"
          :key="group.groupId"
          class="flex items-center justify-between bg-yellow-100 rounded-xl px-4 py-3 shadow"
        >
          <div class="flex items-center space-x-3">
            <span class="text-2xl">{{ getFlagEmoji(group.place) }}</span>
            <div class="text-left">
              <div class="font-bold text-sm">
                {{ countryNameMap[group.place] || group.place }}
              </div>
              <div class="text-xs text-gray-500">{{ group.travelPeriod }}</div>
            </div>
          </div>
          <span
            class="text-lg text-gray-400 cursor-pointer"
            @click="goToGroupDetail(group.id)"
          >
            ➔
          </span>
        </div>
      </div>

      <div
        v-else
        class="flex flex-col items-center text-center space-y-3 min-h-[350px]"
      >
        <img
          src="@/assets/icons/character.png"
          alt="여행 없음 캐릭터"
          class="w-32 h-32"
        />
        <p class="text-gray-500 text-sm">여행 계획이 없어요!</p>
      </div>

      <!-- 숫자 페이지네이션 -->
      <div
        v-if="totalPages > 1"
        class="flex justify-center items-center gap-2 mt-4 mb-10"
      >
        <button
          v-for="page in totalPages"
          :key="page"
          @click="currentPage = page"
          :class="[
            'w-8 h-8 rounded-md text-sm font-medium border transition',
            currentPage === page
              ? 'bg-yellow-400 text-white border-yellow-400'
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100',
          ]"
        >
          {{ page }}
        </button>
      </div>

      <!-- 여행 추가 버튼 -->
      <div class="flex justify-center mt-6">
        <button
          class="bg-yellow-400 text-white font-bold px-6 py-2 rounded-full"
          @click="goToAddTrip"
        >
          여행 추가
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useExchangeStore } from '@/stores/exchangeStore';
import { useGroupStore } from '@/stores/groupStore';
import { getFlagEmoji, countryNameMap } from '@/utils/countryUtils';

const router = useRouter();
const exchangeStore = useExchangeStore();
const groupStore = useGroupStore();

const currentIndex = ref(0);

const currentCard = computed(() =>
  exchangeStore.rates.length > 0
    ? exchangeStore.rates[currentIndex.value]
    : null
);

const currentPage = ref(1);
const itemsPerPage = 5;

const totalPages = computed(() =>
  Math.ceil(groupStore.groups.length / itemsPerPage)
);

const pagedGroups = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return groupStore.groups.slice(start, end);
});

function prevCard() {
  if (currentIndex.value > 0) currentIndex.value--;
}
function nextCard() {
  if (currentIndex.value < exchangeStore.rates.length - 1) currentIndex.value++;
}
function goToDetails() {
  router.push('/exchangeDetail');
}
function goToAddTrip() {
  router.push('/trip/add');
}
function goToProfile() {
  router.push('/profile');
}
function goToGroupDetail(id) {
  router.push(`/TransactionCheckList/${id}`);
}

onMounted(async () => {
  await exchangeStore.fetchRates();
  // if (groupStore.groups.length === 0) {
  //   await groupStore.fetchGroups();
  // }
  await groupStore.fetchGroups();
});
</script>

<style scoped>
/* 필요 시 추가 스타일 */
</style>
