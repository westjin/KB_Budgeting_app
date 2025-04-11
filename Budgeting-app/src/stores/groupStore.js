// /stores/groupStore.js
import { defineStore } from 'pinia';
import axios from 'axios';
import { useUserStore } from './userStore';

export const useGroupStore = defineStore('group', {
  state: () => ({
    groups: [],
  }),
  actions: {
    async fetchGroups(email) {
      if (!email) {
        console.warn('⚠️ fetchGroups: 이메일이 없습니다');
        return;
      }

      try {
        const res = await axios.get('/apiGroup');

        if (!res?.data || !Array.isArray(res.data)) {
          console.error('❌ Group 응답 이상:', res);
          return;
        }

        this.groups = res.data.filter(
          (group) =>
            Array.isArray(group.groupUser) && group.groupUser.includes(email)
        );
      } catch (err) {
        console.error('❌ 그룹 불러오기 실패:', err);
      }
    },
  },
});
