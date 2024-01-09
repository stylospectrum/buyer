import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    accessToken: '',
  }),
  actions: {
    async setAccessToken(accessToken: string) {
      this.accessToken = accessToken;
    },
  },
});
