<template>
  <div class="p-4">
    <!-- 헤더 -->
    <div class="flex items-center mb-4">
      <button class="text-xl mr-2">&larr;</button>
      <h1 class="text-2xl font-bold relative">
        Profile
        <span
          class="absolute bottom-0 left-0 w-14 h-1 bg-yellow-400 rounded"
        ></span>
      </h1>
    </div>

    <!-- 프로필 이미지 -->
    <div class="flex justify-center my-4">
      <img
        src="../assets/icons/character.png"
        alt="Profile"
        class="w-24 h-24 rounded-full bg-gray-200"
      />
    </div>
  </div>
</template>

<script setup>
// 현재는 특별한 JS 없음
</script>
