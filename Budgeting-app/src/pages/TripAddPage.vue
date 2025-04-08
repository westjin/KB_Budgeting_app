<template>
    <div class="trip-add-page">
        <!-- 스텝별 컴포넌트 -->
        <TripAddPage1Component v-if="store.currentStep === 1" />
        <TripAddPage2Component v-else-if="store.currentStep === 2" />
        <!-- <TripAddStep3Companion v-else-if="store.currentStep === 3" />
        <TripAddStep4Budget v-else-if="store.currentStep === 4" /> -->
    </div>
</template>

<script setup>
import TripAddPage1Component from '@/components/TripAddPage1Component.vue';
import TripAddPage2Component from '@/components/TripAddPage2Component.vue';


import { useTripAddStore } from '@/stores/tripAddStore'
const store = useTripAddStore()

</script>

<style scoped>
.trip-add-page {
  margin-top: 30px; /* 필요 시 조절 */
}
</style>