<template>
  <div class="min-h-screen bg-white p-4 flex flex-col gap-6 text-sm">
    <!-- 상단 헤더 -->
    <div class="flex items-center">
      <button @click="router.back()" class="text-xl mr-2">&larr;</button>
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
        <span>{{ userStore.user?.username }}</span>
      </div>
      <div class="flex justify-between">
        <span class="text-gray-600">이메일</span>
        <span>{{ userStore.user?.email }}</span>
      </div>
    </InfoCard>

    <!-- 그룹 정보 카드 -->
    <InfoCard title="그룹 정보">
      <hr class="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700" />
      <div
        v-for="group in groups"
        :key="group.groupId"
        class="flex justify-between mb-1"
      >
        <div class="flex flex-col">
          <span class="font-medium">{{ group.groupName }}</span>
          <span class="text-xs text-gray-500">
            {{ group.place }} / {{ group.travelPeriod }}
          </span>
        </div>
        <span class="text-sm text-gray-500">
          {{ group.groupUser[0] === userStore.user.email ? 'Owner' : 'Guest' }}
        </span>
      </div>
    </InfoCard>

    <!-- 설정 카드 -->
    <InfoCard title="설정">
      <hr class="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700" />
      <div class="flex justify-between">
        <span>기본 통화</span>
        <span>{{ userStore.user?.currency }}</span>
      </div>
    </InfoCard>

    <!-- 하단 버튼 -->
    <div class="flex justify-center gap-4 mt-auto">
      <button
        class="bg-gray-200 text-black px-6 py-2 rounded-full"
        @click="logout"
      >
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
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
import axios from 'axios';
import ProfileImage from '@/components/ProfileImage.vue';
import InfoCard from '@/components/InfoCard.vue';

const router = useRouter();
const userStore = useUserStore();
const groups = ref([]);

const fetchUserAndGroups = async () => {
  const authId = localStorage.getItem('auth');
  if (!authId) {
    router.push('/login');
    return;
  }

  // 유저 로딩
  const res = await axios.get('http://localhost:3000/User', {
    params: { userId: authId },
  });

  if (res.data.length > 0) {
    userStore.login(res.data[0]);

    console.log('✅ 현재 유저 이메일:', userStore.user.email); // 여기만 사용 가능

    // 그룹 연동
    const groupRes = await axios.get('http://localhost:3000/Group');
    groups.value = groupRes.data.filter(
      (group) =>
        Array.isArray(group.groupUser) &&
        group.groupUser.some(
          (email) =>
            email.trim().toLowerCase() ===
            userStore.user.email.trim().toLowerCase()
        )
    );
  } else {
    alert('유저를 찾을 수 없습니다.');
    router.push('/login');
  }
};

onMounted(fetchUserAndGroups);

const editProfile = () => {
  router.push('/profile/edit');
};

const logout = () => {
  localStorage.removeItem('auth');
  userStore.logout();
  router.push('/login');
};
</script>
