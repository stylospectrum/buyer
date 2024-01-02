<template>
  <div class="container">
    <div class="header">
      <div class="header-inner">
        <div class="avatar">
          <stylospectrum-avatar initials="FJ" style="width: 2rem; height: 2rem">
          </stylospectrum-avatar>
        </div>
        <span class="text">{{ name }}</span>
      </div>
      <stylospectrum-button type="Tertiary" icon="decline" @click="$emit('close')">
      </stylospectrum-button>
    </div>

    <div class="content"></div>
    <div class="footer">
      <ChatBoxInput @enter="(value) => console.log(value)" />
    </div>
  </div>
</template>

<script setup lang="ts">
import '@stylospectrum/ui/dist/avatar';
import '@stylospectrum/ui/dist/button';
import '@stylospectrum/ui/dist/icon/data/decline';

import ChatBoxInput from './ChatBoxInput.vue';

interface ChatBoxProps {
  name: string;
}

const props = defineProps<ChatBoxProps>();
const { name } = props;
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
