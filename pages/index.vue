<template>
  <ClientOnly>
    <ShellBar />
    <ChatBox ref="chatBoxRef" />
    <Assistant
      v-if="isAuth"
      @click="() => chatBoxRef.open({ name: 'Luna', conversationId: 'luna' })"
    />
  </ClientOnly>
</template>

<script setup lang="ts">
import { UserApi } from '~/api';
import Assistant from '~/components/Assistant.vue';
import ChatBox from '~/components/ChatBox.vue';
import ShellBar from '~/components/ShellBar.vue';

const authStore = useAuthStore();
const isAuth = process.client && (storage.getToken() || authStore.accessToken);

const chatBoxRef = ref();
const userStore = useUserStore();
const axios = useAxios();
const userApi = new UserApi(axios);

onMounted(async () => {
  const tokens = storage.getToken();

  if (tokens) {
    const response = await userApi.getUser();
    userStore.setUser(response);
  }
});
</script>
