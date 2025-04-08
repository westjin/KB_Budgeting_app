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
      invitedEmails: [] // 그룹일 경우 초대한 이메일 리스트
    }
  }),
  actions: {
    nextStep() {
      if (this.tripData.companion === '혼자') {
        // 혼자인 경우는 4단계까지만 있음
        if (this.currentStep < 4) {
          this.currentStep++
        }
      } else if (this.tripData.companion === '그룹') {
        // 그룹이면 6단계까지 있음
        if (this.currentStep < 6) {
          this.currentStep++
        }
      } else {
        // 아직 동행 여부 선택 전 (1~3단계)
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
      this.tripData = {
        place: '',
        startDate: '',
        endDate: '',
        companion: '',
        budget: '',
        currency: 'KRW',
        groupName: '',
        invitedEmails: []
      }
    }
  }
})