// /stores/groupStore.js
import { defineStore } from 'pinia';

export const useGroupStore = defineStore('group', {
  state: () => ({
    groups: [],
  }),
  actions: {
    async fetchGroups() {
      try {
        const res = await fetch('http://localhost:3000/Group');
        if (!res.ok) throw new Error('불러오기 실패');
        this.groups = await res.json();
      } catch (err) {
        console.error('❌ 그룹 불러오기 실패:', err);
      }
    },
  },
});
