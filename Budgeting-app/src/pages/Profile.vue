<template>
  <div class="min-h-screen bg-white p-4 flex flex-col gap-6 text-sm">
    <!-- 상단 헤더 -->
    <div class="flex items-center">
      <button class="text-xl mr-2">&larr;</button>
      <h1 class="text-2xl font-bold relative inline-block">
        Profile
        <span
          class="absolute bottom-0 left-0 w-14 h-1 bg-yellow-400 w-full rounded"
        ></span>
      </h1>
    </div>

    <!-- 프로필 이미지 -->
    <ProfileImage />

    <!-- 사용자 정보 카드 -->
    <InfoCard title="사용자 정보">
      <hr class="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700" />
      <div class="flex justify-between mb-1">
        <span class="text-gray-600">이름</span>
        <span>가나다라마바사</span>
      </div>
      <div class="flex justify-between">
        <span class="text-gray-600">이메일</span>
        <span class="text-gray-800">abcdefg1234@gmail.com</span>
      </div>
    </InfoCard>

    <!-- 그룹 정보 카드 -->
    <InfoCard title="그룹 정보">
      <hr class="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700" />
      <div class="flex justify-between mb-1">
        <span>고등학교 친구들이랑 도쿄</span>
        <span class="text-sm text-gray-500">Owner</span>
      </div>
      <div class="flex justify-between">
        <span>24년 가족여행</span>
        <span class="text-sm text-gray-500">Guest</span>
      </div>
    </InfoCard>

    <!-- 설정 카드 -->
    <InfoCard title="설정">
      <hr class="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700" />
      <div class="flex justify-between">
        <span>기본 통화</span>
        <span>₩ KRW</span>
      </div>
    </InfoCard>

    <!-- 하단 버튼 -->
    <div class="flex justify-center gap-4 mt-auto">
      <button class="bg-gray-200 text-black px-6 py-2 rounded-full">
        로그아웃
      </button>
      <button
        @click="editProfile"
        class="bg-yellow-400 text-black px-6 py-2 rounded-full"
      >
        수정
      </button>
    </div>
  </div>
</template>

<script setup>
import ProfileImage from '@/components/ProfileImage.vue';
import InfoCard from '@/components/InfoCard.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const editProfile = () => {
  router.push({
    paht: '/profile/edit',
  });
};
</script>
