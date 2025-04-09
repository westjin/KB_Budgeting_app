import { defineStore } from 'pinia'

export const useTripAddStore = defineStore('tripAdd', {
  state: () => ({
    currentStep: 1, // 현재 단계 (1~6)
    tripData: {
      place: '',
      startDate: '',
      endDate: '',
      companion: '', // '혼자' or '그룹'
      budget: '',
      currency: 'KRW',
      groupName: '',
      invitedEmails: [] // ✅ 이름 통일
    }
  }),
  actions: {
    nextStep() {
      if (this.tripData.companion === 'alone') {
        if (this.currentStep < 6) this.currentStep++
      } else if (this.tripData.companion === 'group') {
        if (this.currentStep < 7) this.currentStep++
      } else {
        this.currentStep++
      }
    },
    prevStep() {
      if (this.currentStep > 1) this.currentStep--
    },
    resetSteps() {
      this.currentStep = 1
      this.tripData = {
        place: '',
        startDate: '',
        endDate: '',
        companion: '',
        budget: '',
        currency: 'KRW',
        groupName: '',
        invitedEmails: [] // ✅ 유지
      }
    },
    addEmail(email) {
      if (!this.tripData.invitedEmails.includes(email)) {
        this.tripData.invitedEmails.push(email)
      }
    },
    removeEmail(email) {
      this.tripData.invitedEmails = this.tripData.invitedEmails.filter(e => e !== email)
    }
  }
})