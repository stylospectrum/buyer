<template>
  <ClientOnly>
    <ShellBar>
      <template v-slot:search>
        <ShellSearchField />
      </template>

      <template v-slot:left>
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
      </template>
    </ShellBar>
  </ClientOnly>
</template>

<script setup lang="ts">
import '@stylospectrum/ui/dist/icon';
import '@stylospectrum/ui/dist/button';
import '@stylospectrum/ui/dist/link';
import '@stylospectrum/ui/dist/avatar';
import '@stylospectrum/ui/dist/popover';
import '@stylospectrum/ui/dist/list/list-item';
import '@stylospectrum/ui/dist/icon/data/account';
import '@stylospectrum/ui/dist/icon/data/cart';
import '@stylospectrum/ui/dist/icon/data/log';

import type { IPopover } from '@stylospectrum/ui/dist/types';

import ShellBar from '~/components/ShellBar.vue';
import ShellButton from '~/components/ShellButton.vue';
import ShellSearchField from '~/components/ShellSearchField.vue';
import storage from '~/utils/storage';

const popoverRef = ref<IPopover>();
const authStore = useAuthStore();
const router = useRouter();
const isAuth = process.client && (storage.getToken() || authStore.isAuth);

onMounted(() => {
  if (!isAuth) {
    const timeoutId = setTimeout(() => {
      popoverRef.value?.show();
      clearTimeout(timeoutId);
    }, 1000);
  }
});

const handleLogout = () => {
  authStore.setIsAuth(false);
  storage.clearToken();
  window.location.assign(window.location.origin as unknown as string);
};
</script>
