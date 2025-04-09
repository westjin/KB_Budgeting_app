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
        type="email"
        placeholder="Email address"
        class="w-full border border-gray-300 rounded-xl px-4 py-3 placeholder-gray-400 focus:outline-none"
      />
      <input
        type="password"
        placeholder="Password"
        class="w-full border border-gray-300 rounded-xl px-4 py-3 placeholder-gray-400 focus:outline-none"
      />
      <p class="text-sm text-center text-gray-400">비밀번호를 잊으셨나요?</p>
    </div>

    <!-- 로그인 버튼 -->
    <div class="w-full">
      <button
        class="w-full bg-yellow-300 hover:bg-yellow-400 text-black font-semibold py-3 rounded-full mt-4"
      >
        Login
      </button>
      <p class="text-center mt-2 text-sm text-gray-600">
        계정이 없으신가요?
        <a href="#" class="text-blue-600 font-medium">회원가입</a>
      </p>
    </div>

    <!-- 푸터 -->
    <div class="text-center text-xs text-gray-400 mt-4">
      KB IT’s Your LIfe 6th
    </div>
  </div>
</template>
