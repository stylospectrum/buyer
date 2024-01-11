// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => tag.includes('stylospectrum'),
    },
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/scss/main.scss" as *;',
        },
      },
    },
  },
  runtimeConfig: {
    public: {
      apiUrl: process.env.NUXT_API_URL,
    },
  },

  modules: ['@pinia/nuxt'],
});
