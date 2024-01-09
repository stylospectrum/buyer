import { defineStore } from 'pinia';

import type { User } from '~/model';

export const useUserStore = defineStore('user', {
  state: () => ({
    id: '',
    name: '',
    email: '',
    password: '',
  }),
  actions: {
    async setUser(user: User) {
      this.id = user.id || '';
      this.name = user.name || '';
      this.email = user.email;
      this.password = user.password || '';
    },
  },
});
