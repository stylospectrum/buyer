<template>
  <ClientOnly>
    <ShellBar @conversationListClick="() => (chatBoxVisible = true)" />
    <ChatBox name="Luna" @close="() => (chatBoxVisible = false)" v-if="chatBoxVisible" />
    <Assistant :chatBoxVisible="chatBoxVisible" @click="() => (chatBoxVisible = true)" />
  </ClientOnly>
</template>

<script setup lang="ts">
import Assistant from '~/components/Assistant.vue';
import ChatBox from '~/components/ChatBox.vue';
import ShellBar from '~/components/ShellBar.vue';

const chatBoxVisible = ref(false);
</script>
