import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    email: 'test@naver.com',
  }),
  actions: {
    setEmail(newEmail) {
      this.email = newEmail;
    },
  },
});
