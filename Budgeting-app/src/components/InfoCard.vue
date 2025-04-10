<template>
  <div class="bg-gray-50 rounded-xl p-4 shadow-sm border">
    <h1 class="text-xl font-semibold mb-2">{{ title }}</h1>
    <slot></slot>
  </div>
</template>

<script setup>
defineProps({
  title: String,
});
</script>
