<template>
  <ClientOnly>
    <AuthWrapper @buttonSubmit="handleButtonSubmit" @buttonKeyDown="handleButtonKeyDown">
      <template #form>
        <stylospectrum-form v-if="renderComponent" ref="formRef">
          <stylospectrum-form-item
            label="Email"
            name="email"
            :rules="[
              { required: true, message: 'Enter your email' },
              {
                pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                message: 'Wrong or Invalid email address. Please correct and try again',
              },
            ]"
          >
            <stylospectrum-input class="box-form-input" allow-clear @keydown="handleEmailKeyDown">
            </stylospectrum-input>
          </stylospectrum-form-item>

          <stylospectrum-form-item
            label="Password"
            name="password"
            :rules="[{ required: true, message: 'Enter your password' }]"
          >
            <template #suffix-label>
              <stylospectrum-link
                ref="forgotPassRef"
                @keydown="handleForgotPassKeyDown"
                @click="() => router.push('/login/password-assistance')"
              >
                Forgot your password?
              </stylospectrum-link>
            </template>
            <stylospectrum-input ref="passRef" class="box-form-input" type="Password" allow-clear>
            </stylospectrum-input>
          </stylospectrum-form-item>

          <stylospectrum-form-item name="keep-me-signed-in" style="margin-bottom: 0">
            <stylospectrum-checkbox text="Keep me signed in" style="margin-left: -0.25rem">
            </stylospectrum-checkbox>
          </stylospectrum-form-item>
        </stylospectrum-form>
      </template>

      <template #bottom>
        <div class="box-text">
          <span> Do you not have an account?</span>
          <stylospectrum-link ref="createAnAccRef" @click="() => router.push('/registration')">
            Create an account!
          </stylospectrum-link>
        </div>
      </template>
    </AuthWrapper>
    <stylospectrum-toast ref="toastRef"></stylospectrum-toast>
  </ClientOnly>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import '@stylospectrum/ui/dist/button';
import '@stylospectrum/ui/dist/form';
import '@stylospectrum/ui/dist/form/form-item';
import '@stylospectrum/ui/dist/input';
import '@stylospectrum/ui/dist/checkbox';
import '@stylospectrum/ui/dist/link';
import '@stylospectrum/ui/dist/toast';

import { type IForm, type IInput, type ILink, type IToast } from '@stylospectrum/ui/dist/types';
import { isTabNext } from '@stylospectrum/ui/dist/utils/Keys';

import { AuthApi } from '~/api';
import AuthWrapper from '~/components/AuthWrapper.vue';
import storage from '~/utils/storage';

const formRef = ref<IForm>();
const passRef = ref<IInput>();
const forgotPassRef = ref<ILink>();
const createAnAccRef = ref<ILink>();
const toastRef = ref<IToast>();
const renderComponent = ref(true);
const authStore = useAuthStore();
const router = useRouter();
const axios = useAxios();
const authApi = new AuthApi(axios);

async function handleButtonSubmit() {
  const values = (await formRef.value!.validateFields()) as Record<string, string>;
  if (values) {
    try {
      const response = await authApi.signIn({
        email: values.email,
        password: values.password,
      });

      if (response.statusCode !== 200) {
        toastRef.value?.show(response.message);
        return;
      }

      if (values['keep-me-signed-in']) {
        storage.setToken({
          accessToken: response.data.accessToken,
          refreshToken: response.data.refreshToken,
        });
      } else {
        authStore.setAccessToken(response.data.accessToken);
      }

      router.push('/');
    } catch (err) {
      console.log(err);
    }
  }
}

const forceRerender = async () => {
  renderComponent.value = false;
  await nextTick();
  renderComponent.value = true;
};

onMounted(() => {
  forceRerender();
});

const handleEmailKeyDown = (e: KeyboardEvent) => {
  if (isTabNext(e as any)) {
    requestAnimationFrame(() => {
      passRef.value?.shadowRoot?.querySelector('input')?.focus();
    });
  }
};

const handleForgotPassKeyDown = (e: KeyboardEvent) => {
  if (isTabNext(e as any)) {
    requestAnimationFrame(() => {
      createAnAccRef.value?.shadowRoot?.querySelector('a')?.focus();
    });
  }
};

const handleButtonKeyDown = (e: KeyboardEvent) => {
  if (isTabNext(e as any)) {
    requestAnimationFrame(() => {
      forgotPassRef.value?.shadowRoot?.querySelector('a')?.focus();
    });
  }
};
</script>

<style lang="scss" scoped>
.box {
  &-form-input {
    width: 100%;
  }

  &-text {
    display: inline-flex;
    gap: 0.3125rem;
    justify-content: center;
    text-align: center;

    & > span {
      color: #eaecee;
      font-weight: 400;
      font-size: 0.875rem;
      font-family: $font-family;
    }
  }
}
</style>
~/api/auth
