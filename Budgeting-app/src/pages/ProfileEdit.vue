<template>
  <div class="min-h-screen bg-white p-4 flex flex-col gap-6 text-sm">
    <!-- 상단 헤더 -->
    <div class="flex items-center">
      <button class="text-xl mr-2">&larr;</button>
      <h1 class="text-2xl font-bold relative inline-block">
        Profile
        <span
          class="absolute bottom-0 left-0 h-1 bg-yellow-400 w-full rounded"
        ></span>
      </h1>
    </div>

    <!-- 프로필 이미지 -->
    <ProfileImage />

    <!-- 사용자 정보 수정 카드 -->
    <InfoCard title="사용자 정보">
      <hr class="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700" />
      <div class="flex justify-between items-center mb-2">
        <label class="text-gray-600 w-1/4">이름</label>
        <input
          v-model="form.name"
          class="border px-2 py-1 rounded w-3/4"
          type="text"
        />
      </div>
      <div class="flex justify-between items-center">
        <label class="text-gray-600 w-1/4">이메일</label>
        <input
          v-model="form.email"
          class="border px-2 py-1 rounded w-3/4"
          type="email"
        />
      </div>
    </InfoCard>

    <!-- 그룹 정보 카드 -->
    <InfoCard title="그룹 정보">
      <hr class="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700" />
      <div
        v-for="(group, index) in form.groups"
        :key="index"
        class="flex justify-between items-center mb-1"
      >
        <span>{{ group.name }}</span>
        <button class="text-blue-600 text-sm" @click="removeGroup(index)">
          Delete
        </button>
      </div>
    </InfoCard>

    <!-- 설정 카드 -->
    <InfoCard title="설정">
      <hr class="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700" />
      <div class="flex justify-between items-center">
        <span>기본 통화</span>
        <select
          v-model="form.currency"
          class="border px-2 py-1 rounded bg-white"
        >
          <option value="KRW">₩ KRW</option>
          <option value="USD">$ USD</option>
          <option value="JPY">¥ JPY</option>
        </select>
      </div>
    </InfoCard>

    <!-- 하단 버튼 -->
    <div class="flex justify-center gap-4 mt-auto">
      <button class="bg-gray-200 text-black px-6 py-2 rounded-full">
        로그아웃
      </button>
      <button
        class="bg-yellow-400 text-black px-6 py-2 rounded-full"
        @click="submit"
      >
        완료
      </button>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import ProfileImage from '@/components/ProfileImage.vue';
import InfoCard from '@/components/InfoCard.vue';

const form = reactive({
  name: '가나다라마바사',
  email: 'abcdefg1234@gmail.com',
  groups: [{ name: '고등학교 친구들이랑 도쿄' }, { name: '24년 가족여행' }],
  currency: 'KRW',
});

function removeGroup(index) {
  form.groups.splice(index, 1);
}

function submit() {
  console.log('수정 완료:', form);
  // ✅ 여기에 API 호출 또는 라우터 이동 처리 가능
}
</script>
