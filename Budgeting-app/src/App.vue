<script setup>
import { RouterView } from 'vue-router';
import BottomNav from '@/components/BottomNav.vue';
import HomePage from './pages/Homepage.vue';
import Profile from './pages/Profile.vue';
import TransactionAdd from './pages/TransactionAdd.vue';
</script>

<template>
   <RouterView />
   <Profile />
</template>
