<template>
  <div class="container">
    <div class="right"></div>
    <div class="center">
      <ShellSearchField />
    </div>
    <div class="left">
      <div class="spacer"></div>

      <ConversationList v-if="isAuth" @click="$emit('conversationListClick')">
        <template v-slot:opener>
          <ShellButton>
            <stylospectrum-icon name="discussion"></stylospectrum-icon>
          </ShellButton>
        </template>
      </ConversationList>

      <ShellButton v-if="isAuth">
        <stylospectrum-icon name="bell"></stylospectrum-icon>
      </ShellButton>

      <ShellButton>
        <stylospectrum-icon name="cart"></stylospectrum-icon>
      </ShellButton>

      <stylospectrum-popover v-if="isAuth" ref="popoverRef" horizontalAlign="Right">
        <stylospectrum-avatar
          slot="opener"
          initials="FJ"
          interactive="true"
          style="width: 2rem; height: 2rem; margin-left: 0.5rem"
          @click="() => popoverRef?.show()"
        >
        </stylospectrum-avatar>

        <div style="width: 198px">
          <stylospectrum-list-item icon="account"> My account </stylospectrum-list-item>
          <stylospectrum-list-item icon="log" @click="handleLogout">
            Logout
          </stylospectrum-list-item>
        </div>
      </stylospectrum-popover>

      <stylospectrum-popover ref="popoverRef" horizontalAlign="Right" v-else>
        <ShellButton slot="opener" @click="() => popoverRef?.show()">
          <stylospectrum-icon name="account"></stylospectrum-icon>
        </ShellButton>

        <div style="padding: 1rem">
          <stylospectrum-button style="width: 100%" @click="() => router.push('/login')">
            Sign in
          </stylospectrum-button>
          <div style="margin-top: 0.5rem">
            <span>New customer? </span>
            <stylospectrum-link @click="() => router.push('/registration')">
              Start here
            </stylospectrum-link>
          </div>
        </div>
      </stylospectrum-popover>
    </div>
  </div>
</template>

<script setup lang="ts">
import '@stylospectrum/ui/dist/avatar';
import '@stylospectrum/ui/dist/button';
import '@stylospectrum/ui/dist/icon';
import '@stylospectrum/ui/dist/icon/data/account';
import '@stylospectrum/ui/dist/icon/data/bell';
import '@stylospectrum/ui/dist/icon/data/cart';
import '@stylospectrum/ui/dist/icon/data/discussion';
import '@stylospectrum/ui/dist/icon/data/log';
import '@stylospectrum/ui/dist/link';
import '@stylospectrum/ui/dist/list/list-item';
import '@stylospectrum/ui/dist/popover';

import type { IPopover } from '@stylospectrum/ui/dist/types';

import ConversationList from '~/components/ConversationList.vue';
import ShellButton from '~/components/ShellButton.vue';
import ShellSearchField from '~/components/ShellSearchField.vue';
import storage from '~/utils/storage';

const popoverRef = ref<IPopover>();
const router = useRouter();
const authStore = useAuthStore();

const isAuth = process.client && (storage.getToken() || authStore.isAuth);

const handleLogout = () => {
  authStore.setIsAuth(false);
  storage.clearToken();
  window.location.assign(window.location.origin as unknown as string);
};

onMounted(() => {
  if (!isAuth) {
    const timeoutId = setTimeout(() => {
      popoverRef.value?.show();
      clearTimeout(timeoutId);
    }, 1000);
  }
});
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  width: 100%;
  height: 2.75rem;
  padding: 0.25rem 3rem;
  display: flex;
  box-sizing: border-box;
  border: 1px solid #1d232a;
  background: #1d232a;
  box-shadow:
    0 2px 2px 0 rgba(0, 0, 0, 0.8),
    0 -1px 0 0 rgba(255, 255, 255, 0.2) inset;

  .right {
    width: 50%;
    padding-right: calc(17.5rem + 0.5rem);
  }

  .center {
    overflow: hidden;
    outline: none;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    margin: 0;
  }

  .left {
    flex-grow: 1;
    flex-shrink: 1;
    width: 50%;
    padding-left: calc(17.5rem + 0.5rem);
    margin-right: 0;
    margin-left: 0;
    display: inline-flex;
    vertical-align: top;
    box-sizing: border-box;
    align-items: center;
    min-width: 1px;
    max-width: 100%;
    height: 100%;
  }

  .spacer {
    margin: 0 !important;
    padding: 0 !important;
    border: 0 !important;
    height: 1px;
    -webkit-box-flex: 1;
    flex: auto;
  }
}
</style>
