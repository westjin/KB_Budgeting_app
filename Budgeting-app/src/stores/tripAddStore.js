import { defineStore } from 'pinia'

export const useTripAddStore = defineStore('tripAdd', {
  state: () => ({
    currentStep: 1, // 현재 단계 (1~4)
    tripData: {
      place: '',
      startDate: '',
      endDate: '',
      companion: '', // 'solo' or 'group'
      budget: '',
      currency: 'KRW',
    }
  }),
  actions: {
    nextStep() {
      if (this.currentStep < 4) {
        this.currentStep++
      }
    },
    prevStep() {
      if (this.currentStep > 1) {
        this.currentStep--
      }
    },
    resetSteps() {
      this.currentStep = 1
    },
    // updateTripData(field: keyof typeof this.tripData, value: any) {
    //   this.tripData[field] = value
    // }
  }
})