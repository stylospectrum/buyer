import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuth: false,
  }),
  actions: {
    async setIsAuth(isAuth: boolean) {
      this.isAuth = isAuth;
    },
  },
});
