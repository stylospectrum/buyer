<template>
  <div class="container" v-if="visible">
    <div class="header">
      <div class="header-inner">
        <div class="avatar">
          <stylospectrum-avatar initials="FJ" style="width: 2rem; height: 2rem">
          </stylospectrum-avatar>
        </div>
        <span class="text">{{ metadata.name }}</span>
      </div>
      <stylospectrum-button type="Tertiary" icon="decline" @click="handleClose">
      </stylospectrum-button>
    </div>

    <div class="content"></div>
    <div class="footer">
      <ChatBoxInput @enter="(value) => handleEnter(value)" />
    </div>
  </div>
</template>

<script setup lang="ts">
import '@stylospectrum/ui/dist/avatar';
import '@stylospectrum/ui/dist/button';
import '@stylospectrum/ui/dist/icon/data/decline';

import { io, type Socket } from 'socket.io-client';

import ChatBoxInput from './ChatBoxInput.vue';
import storage from '~/utils/storage';

interface Metadata {
  name?: string;
  conversationId?: string;
}

const visible = ref(false);
const metadata = ref<Metadata>({});

const config = useRuntimeConfig();
const socket = ref<Socket>();
const userStore = useUserStore();

const handleEnter = (message: string) => {
  socket.value?.emit('chat', {
    message,
    conversationId: metadata.value.conversationId,
    buyerId: userStore.id,
    role: 'Buyer',
  });
};

const handleOpen = (args: Metadata) => {
  if (visible.value) {
    return;
  }
  const url = config.public.apiUrl.replace('http://', '');
  const tokens = storage.getToken();

  visible.value = true;
  metadata.value = args;

  socket.value = io(`ws://${url}`, {
    path: '/chat/socket.io',
    extraHeaders: { Authorization: `Bearer ${tokens.accessToken}` },
  });
  socket.value.connect();

  socket.value?.on('chat', (arg) => {
    console.log(arg);
  });
};

const handleClose = () => {
  visible.value = false;
  socket.value?.disconnect();
};

defineExpose({
  open: handleOpen,
  close: handleClose,
});
</script>

<style scoped lang="scss">
.container {
  position: absolute;
  right: 3rem;
  bottom: 0;
  display: flex;
  width: 27rem;
  flex-direction: column;
  align-items: flex-start;
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
  border: 1px solid rgba(85, 107, 130, 0.1);
  background: #1d232a;
  box-shadow:
    0 10px 30px 0 rgba(0, 0, 0, 0.6),
    0 0 0 1px rgba(255, 255, 255, 0.35);

  .header {
    display: flex;
    width: 25rem;
    height: 2.25rem;
    align-items: center;
    gap: 0.25rem;
    padding: 0.125rem 1rem;
    border-radius: 0.5rem 0.5rem 0 0;
    background: #1d232a;
    box-shadow:
      0 2px 2px 0 rgba(0, 0, 0, 0.2),
      0 -1px 0 0 #2e3742 inset;

    &-inner {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      flex: 1 0 0;
    }
  }

  .avatar {
    position: relative;
  }

  .text {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    flex: 1 0 0;
    overflow: hidden;
    color: #eaecee;
    text-overflow: ellipsis;
    font-family: 72;
    font-size: 1rem;
    font-weight: 700;
  }

  .content {
    display: flex;
    height: 31.25rem;
    align-items: flex-start;
    align-self: stretch;
  }

  .footer {
    display: flex;
    box-sizing: border-box;
    width: 100%;
    padding: 1rem;
    border-top: 1px solid #2e3742;
    background: #1d232a;
  }
}
</style>
