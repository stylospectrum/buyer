import type { SignInResponse } from '~/interface';

const storagePrefix = 'stylospectrum_buyer_';

const storage = {
  getToken: (): SignInResponse => {
    return JSON.parse(window.localStorage.getItem(`${storagePrefix}token`) as string);
  },
  setToken: (token: SignInResponse) => {
    window.localStorage.setItem(`${storagePrefix}token`, JSON.stringify(token));
  },
  clearToken: () => {
    window.localStorage.removeItem(`${storagePrefix}token`);
  },
};

export default storage;
