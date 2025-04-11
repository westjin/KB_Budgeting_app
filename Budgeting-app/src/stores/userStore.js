import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';

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

    // 🔥 로그인 유지용 로컬스토리지 기반 복원
    async restoreUserFromLocalStorage() {
      const authId = localStorage.getItem('auth');
      if (!authId) return;

      try {
        const res = await axios.get('/api/User', {
          params: { userId: authId },
        });

        if (res.data.length > 0) {
          this.user = res.data[0];
          console.log('✅ 유저 복원 완료:', this.user);
        } else {
          console.warn('❌ 유저를 찾을 수 없음');
        }
      } catch (err) {
        console.error('❌ 유저 복원 중 오류:', err);
      }
    },
  },
});
