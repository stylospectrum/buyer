import { defineStore } from 'pinia';

export const useCredentialStore = defineStore('credential', {
  state: () => ({
    email: '',
    password: '',
  }),
  actions: {
    async setCredential(email: string, password?: string) {
      this.email = email;
      this.password = password || '';
    },
  },
});
