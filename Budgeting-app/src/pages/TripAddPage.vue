<template>
    <div class="trip-add-page">
        <TripAddPage1Component v-if="store.currentStep === 1" />
        <TripAddPage2Component v-else-if="store.currentStep === 2" />
        <TripAddPage3Component v-else-if="store.currentStep === 3" />
        <TripGroupNameComponent v-else-if="store.currentStep === 4 && store.tripData.companion === 'group'" />
        <TripGroupInviteComponent v-else-if="store.currentStep === 5 && store.tripData.companion === 'group'" />
        <TripAddPage4Component v-else-if="(store.currentStep === 4 && store.tripData.companion === 'alone') || store.currentStep === 6" />
    </div>
</template>

<script setup>
import { useTripAddStore } from '@/stores/tripAddStore';

import TripAddPage1Component from '@/components/TripAddPage1Component.vue';
import TripAddPage2Component from '@/components/TripAddPage2Component.vue';
import TripAddPage3Component from '@/components/TripAddPage3Component.vue';
import TripAddPage4Component from '@/components/TripAddPage4Component.vue';
import TripGroupNameComponent from '@/components/TripGroupNameComponent.vue';
import TripGroupInviteComponent from '@/components/TripGroupInviteComponent.vue';

const store = useTripAddStore();
</script>

<style scoped>
.trip-add-page {
  margin-top: 30px; /* 필요 시 조절 */
}
</style>