<template>
  <div
    class="min-h-screen flex flex-col items-center justify-between px-6 pt-6 pb-4 bg-white"
  >
    <!-- 뒤로가기 -->
    <div class="self-start">
      <!-- <button class="text-2xl">&larr;</button> -->
    </div>

    <!-- 로고 + 타이틀 -->
    <div class="flex flex-col items-center">
      <img
        src="@/assets/icons/loginlogo.png"
        alt="logo"
        class="w-40 h-40 mb-4"
      />
      <h1 class="text-2xl font-bold">TripLog</h1>
      <p class="text-center mt-2 text-gray-700">
        여행의 <span class="text-green-600 font-medium">설렘</span>은 그대로,<br />
        <span class="text-green-600 font-medium">지출</span>은 계획대로
      </p>
    </div>

    <!-- 로그인 폼 -->
    <div class="w-full flex flex-col gap-3">
      <input
        v-model="email"
        type="email"
        placeholder="Email address"
        class="w-full border border-gray-300 rounded-xl px-4 py-3 placeholder-gray-400 focus:outline-none"
      />
      <input
        v-model="password"
        type="password"
        placeholder="Password"
        class="w-full border border-gray-300 rounded-xl px-4 py-3 placeholder-gray-400 focus:outline-none"
      />
      <p class="text-sm text-center text-gray-400">비밀번호를 잊으셨나요?</p>
    </div>

    <!-- 로그인 버튼 -->
    <div class="w-full">
      <button
        @click="login"
        class="w-full bg-yellow-300 hover:bg-yellow-400 text-black font-semibold py-3 rounded-full mt-4"
      >
        Login
      </button>
      <p class="text-center mt-2 text-sm text-gray-600">
        계정이 없으신가요?
        <router-link to="/signup" class="text-blue-600 font-medium"
          >회원가입</router-link
        >
      </p>
    </div>

    <!-- 푸터 -->
    <div class="text-center text-xs text-gray-400 mt-4">
      KB IT’s Your LIfe 6th
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';

const email = ref('');
const password = ref('');
const error = ref('');
const router = useRouter();
const userStore = useUserStore();

async function login() {
  const trimmedEmail = email.value.trim();
  const trimmedPassword = password.value.trim();

  if (!trimmedEmail || !trimmedPassword) {
    error.value = '이메일과 비밀번호를 모두 입력해주세요.';
    return;
  }

  try {
    const res = await axios.get('http://localhost:3000/User', {
      params: {
        email: trimmedEmail,
        password: trimmedPassword,
      },
    });

    const matchedUser = res.data.find(
      (user) => user.email === trimmedEmail && user.password === trimmedPassword
    );

    console.log('서버 응답:', res.data);
    console.log('입력값:', trimmedEmail, trimmedPassword);

    if (matchedUser) {
      userStore.login(matchedUser);
      alert('로그인 성공');
      console.log('✅ 로그인 성공:', matchedUser);
      router.push('/'); // 로그인 성공시 홈 화면으로 이동
    } else {
      alert('로그인 실패');
      error.value = '이메일 또는 비밀번호가 틀렸습니다.';
      console.warn('❌ 로그인 실패:', res.data);
    }
  } catch (err) {
    error.value = '로그인 중 오류 발생';
    console.error(err);
  }
}
</script>
