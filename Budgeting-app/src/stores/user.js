import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    isLoggedIn: false,
    user: null,
  }),
  actions: {
    login(user) {
      this.isLoggedIn = true;
      this.user = user;
    },
    logout() {
      this.isLoggedIn = false;
      this.user = null;
    },
  },
});
