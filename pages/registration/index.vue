<template>
  <ClientOnly>
    <AuthWrapper
      title="Create account"
      introTitle="Be a buyer"
      buttonText="Verify email"
      :img="{ src: '/img/registration.png', width: '400px', height: '392.44px' }"
      @buttonSubmit="handleButtonSubmit"
    >
      <template v-slot:form>
        <stylospectrum-form ref="formRef" v-if="renderComponent">
          <stylospectrum-form-item
            label="Name"
            name="name"
            :rules="[{ required: true, message: 'Enter your name' }]"
          >
            <stylospectrum-input class="box-form-input" allow-clear> </stylospectrum-input>
          </stylospectrum-form-item>

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
            <stylospectrum-input class="box-form-input" allow-clear> </stylospectrum-input>
          </stylospectrum-form-item>

          <stylospectrum-form-item
            label="Password"
            name="password"
            :rules="[{ required: true, message: 'Enter your password' }]"
          >
            <stylospectrum-input class="box-form-input" type="Password" allow-clear>
            </stylospectrum-input>
          </stylospectrum-form-item>
        </stylospectrum-form>
      </template>

      <template v-slot:bottom>
        <div class="box-text">
          <span> Already have an account?</span>
          <stylospectrum-link @click="() => router.push('/login')">Sign in!</stylospectrum-link>
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
import '@stylospectrum/ui/dist/link';
import '@stylospectrum/ui/dist/toast';

import { type IForm, type IToast } from '@stylospectrum/ui/dist/types';

import AuthWrapper from '../components/AuthWrapper.vue';
import type { SendOtpToEmailResponse, SignUpResponse } from '~/interface';

const formRef = ref<IForm>();
const toastRef = ref<IToast>();
const renderComponent = ref(true);
const credentialStore = useCredentialStore();

const router = useRouter();

async function handleButtonSubmit() {
  const values = await formRef.value!.validateFields();
  if (values) {
    try {
      let response: any = await $fetch<SignUpResponse>('/api/registration', {
        method: 'post',
        body: {
          name: values.name,
          email: values.email,
          password: values.password,
        },
      });

      if (response.message) {
        toastRef.value?.show(response.message);
        return;
      }

      response = await $fetch<SendOtpToEmailResponse>('/api/send-otp-to-email', {
        method: 'post',
        body: {
          email: values.email,
          isRegistration: true,
        },
      });

      if (response.sent) {
        credentialStore.setCredential(values.email, values.password);
        router.push('/registration/verification');
      }
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
