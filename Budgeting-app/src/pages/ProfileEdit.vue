<template>
  <div class="min-h-screen p-4 flex flex-col gap-6 text-sm">
    <!-- 상단 헤더 -->
    <div class="flex items-center">
      <img
        src="/src/assets/icons/back-icon.png"
        alt=""
        class="w-[10px] h-[15px] cursor-pointer mr-[10px]"
        @click="router.back()"
      />
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
        <p class="w-3/4 text-sm text-gray-800">{{ form.email }}</p>
      </div>
    </InfoCard>

    <!-- 그룹 정보 카드 -->
    <InfoCard title="그룹 정보">
      <hr class="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700" />
      <div
        v-for="group in groups"
        :key="group.groupId"
        class="flex justify-between items-center mb-1"
      >
        <div class="flex flex-col">
          <span>{{ group.groupName }}</span>
          <span class="text-xs text-gray-500">
            {{ group.place }} / {{ group.travelPeriod }}
          </span>
        </div>
        <button
          @click="
            () => {
              console.log(
                '🧨 그룹 탈퇴 버튼 클릭됨:',
                group.id,
                group.groupName
              );
              leaveGroup(group.id);
            }
          "
          class="text-sm text-red-500 font-semibold"
        >
          ❌
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
      <button
        class="bg-gray-200 text-black px-6 py-2 rounded-full"
        @click="logout"
      >
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
import { ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/userStore';
import axios from 'axios';
import ProfileImage from '@/components/ProfileImage.vue';
import InfoCard from '@/components/InfoCard.vue';

const router = useRouter();
const userStore = useUserStore();

const form = reactive({
  name: '',
  email: '',
  currency: 'KRW',
});
const groups = ref([]);

// ✅ 컴포넌트 마운트 시 유저 정보 불러오기
onMounted(async () => {
  const authId = localStorage.getItem('auth');
  if (!authId) {
    router.push('/login');
    return;
  }

  // 유저 정보 로딩
  const res = await axios.get('/apiUser', {
    params: { userId: authId },
  });

  if (res.data.length > 0) {
    const user = res.data[0];
    userStore.login(user);

    form.name = user.username;
    form.email = user.email;
    form.currency = user.currency;

    // 그룹 목록 로딩
    const groupRes = await axios.get('/apiGroup');
    groups.value = groupRes.data.filter((group) =>
      group.groupUser.some(
        (email) =>
          email.trim().toLowerCase() === user.email.trim().toLowerCase()
      )
    );
  } else {
    alert('유저를 찾을 수 없습니다.');
    router.push('/login');
  }
});

// 그룹 탈퇴
const leaveGroup = async (groupId) => {
  console.log('📍 leaveGroup 진입:', groupId);

  const group = groups.value.find((g) => g.id === groupId);
  console.log('🔍 찾은 그룹:', group);

  if (!group || !Array.isArray(group.groupUser)) {
    console.warn('❌ 유효하지 않은 그룹 정보:', group);
    return;
  }

  // groupUser에서 유저 이메일 제거
  const updatedUsers = group.groupUser.filter(
    (email) => email !== userStore.user.email
  );
  console.log('🧹 제거 후 유저 목록:', updatedUsers);

  try {
    await axios.patch(`/apiGroup/${group.id}`, {
      groupUser: updatedUsers,
    });

    console.log('탈퇴 대상 그룹:', group);
    console.log('✅ 그룹 탈퇴 처리 완료', group.groupName);

    // 프론트에서도 즉시 반영
    group.groupUser = updatedUsers;
    groups.value = groups.value.filter(
      (g) =>
        Array.isArray(g.groupUser) && g.groupUser.includes(userStore.user.email)
    );
    console.log('🎯 화면 갱신 완료');
  } catch (err) {
    console.error('그룹 탈퇴 실패:', err);
    alert('그룹 탈퇴 중 문제가 발생했습니다.');
  }
};

function goBack() {
  router.back();
}

const logout = () => {
  localStorage.removeItem('auth'); // localStorage 초기화
  userStore.logout(); // Pinia 유저 상태 초기화
  router.push('/login'); // 로그인 페이지로 이동
};

const submit = async () => {
  const authId = localStorage.getItem('auth');
  if (!authId) {
    alert('로그인이 필요합니다.');
    router.push('/login');
    return;
  }

  try {
    // 1️⃣ userId로 유저 검색
    const res = await axios.get('/apiUser', {
      params: { userId: authId },
    });

    if (res.data.length === 0) {
      alert('유저를 찾을 수 없습니다.');
      return;
    }

    const userToUpdate = res.data[0];
    const internalId = userToUpdate.id; // json-server가 생성한 내부 id

    // 2️⃣ 수정할 내용 구성
    const updatedUser = {
      ...userToUpdate,
      username: form.name,
      // email: form.email,
      currency: form.currency,
    };

    // 3️⃣ PATCH 요청
    const patchRes = await axios.patch(`/apiUser/${internalId}`, updatedUser);

    // 4️⃣ Pinia 반영
    userStore.user = patchRes.data;

    alert('프로필이 수정되었습니다.');
    router.push('/profile');
  } catch (err) {
    console.error('프로필 수정 실패:', err);
    alert('수정 중 오류가 발생했습니다.');
  }
};
</script>
