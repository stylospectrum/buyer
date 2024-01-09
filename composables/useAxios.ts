import Axios, { type InternalAxiosRequestConfig } from 'axios';

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  const tokens = storage.getToken();
  if (tokens) {
    config.headers.authorization = `Bearer ${tokens.accessToken}`;
  }
  config.headers!.Accept = 'application/json';
  return config;
}

export const useAxios = () => {
  const config = useRuntimeConfig();

  const axios = Axios.create({
    baseURL: config.public.apiUrl,
  });

  axios.interceptors.request.use(authRequestInterceptor);
  axios.interceptors.response.use(
    (response) => {
      return response.data;
    },
    (error) => {
      return Promise.resolve(error?.response?.data);
    },
  );

  return axios;
};
