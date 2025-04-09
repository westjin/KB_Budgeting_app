<template>
  <div
    class="min-h-screen flex flex-col justify-between items-center bg-white px-6 pt-6 pb-4"
  >
    <!-- 뒤로가기 -->
    <div class="self-start">
      <button @click="$router.push({ name: 'login' })" class="text-2xl">
        &larr;
      </button>
    </div>

    <!-- 로고 & 제목 -->
    <div class="flex flex-col items-center">
      <img
        src="@/assets/icons/signuplogo.png"
        alt="logo"
        class="w-32 h-32 object-contain mb-4"
      />
      <h1 class="text-2xl font-bold">Sign up</h1>
    </div>

    <!-- 입력 폼 -->
    <div class="w-full flex flex-col gap-3">
      <input
        v-model="form.name"
        type="text"
        placeholder="이름을 입력하세요"
        class="w-full border border-gray-300 rounded-xl px-4 py-3 placeholder-gray-400"
      />
      <input
        v-model="form.email"
        type="email"
        placeholder="이메일 주소를 입력하세요"
        class="w-full border border-gray-300 rounded-xl px-4 py-3 placeholder-gray-400"
      />
      <input
        v-model="form.password"
        type="password"
        placeholder="비밀번호를 입력하세요"
        class="w-full border border-gray-300 rounded-xl px-4 py-3 placeholder-gray-400"
      />
      <div class="relative">
        <input
          v-model="form.passwordConfirm"
          type="password"
          placeholder="비밀번호를 확인해주세요"
          class="w-full border border-gray-300 rounded-xl px-4 py-3 placeholder-gray-400"
        />
        <!-- 체크 아이콘 -->
        <div
          v-if="form.passwordConfirm && isPasswordMatch"
          class="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-yellow-300 flex items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-4 h-4 text-white"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414L8.414 15l-4.707-4.707a1 1 0 111.414-1.414L8.414 12.586l7.293-7.293a1 1 0 011.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
      </div>

      <!-- 에러 메시지 -->
      <p
        v-if="form.passwordConfirm && !isPasswordMatch"
        class="text-xs text-red-500 ml-1"
      >
        비밀번호가 일치하지 않습니다
      </p>
    </div>

    <!-- 가입 버튼 -->
    <div class="w-full mt-4">
      <button
        class="w-full bg-yellow-300 hover:bg-yellow-400 text-black font-semibold py-3 rounded-full"
        @click="submit"
      >
        Sign up
      </button>
    </div>

    <!-- 하단 문구 -->
    <div class="text-xs text-gray-400 mt-4">KB IT’s Your LIfe 6th</div>
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';

const router = useRouter();
const userStore = useUserStore();

const form = reactive({
  email: '',
  password: '',
  passwordConfirm: '',
  name: '',
});

const isPasswordMatch = computed(() => {
  return (
    form.password &&
    form.passwordConfirm &&
    form.password === form.passwordConfirm
  );
});

async function submit() {
  if (!isPasswordMatch.value) {
    alert('비밀번호가 일치하지 않습니다!');
    return;
  }

  try {
    const newUser = {
      userId: Date.now().toString(),
      email: form.email.trim(),
      username: form.name.trim(),
      password: form.password,
      currency: 'KRW',
    };

    const res = await axios.post('http://localhost:3000/User', newUser);

    // userStore.login(res.data); // 회원가입 후 자동 로그인
    alert('회원가입 및 로그인 성공!');
    router.push('/login'); // 로그인 후 로그인 이동
  } catch (err) {
    alert('회원가입 중 문제가 발생했습니다.');
    console.error('회원가입 에러:', err);
  }
}
</script>

<style lang="scss" scoped></style>
