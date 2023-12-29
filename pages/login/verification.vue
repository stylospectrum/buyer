<template>
  <ClientOnly>
    <AuthWrapper title="Verification required" @buttonSubmit="handleButtonSubmit">
      <template v-slot:description>
        <div className="description">
          To continue, complete this verification step. We have sent OTP to the email
          {{ credentialStore.email }}. Please enter it below.
        </div>
      </template>

      <template v-slot:form>
        <stylospectrum-form ref="formRef" v-if="renderComponent">
          <stylospectrum-form-item
            style="margin-bottom: 0"
            label="Enter OTP"
            name="otp"
            :rules="[{ required: true, message: 'Enter your otp' }]"
          >
            <stylospectrum-input style="width: 100%" allow-clear> </stylospectrum-input>
          </stylospectrum-form-item>
        </stylospectrum-form>

        <stylospectrum-message-strip v-if="infoVisible" style="margin-top: 1rem">
          A new code has been sent to your email.
        </stylospectrum-message-strip>
      </template>

      <template v-slot:bottom>
        <stylospectrum-button type="Tertiary" class="button" @click="handleResend">
          Resend OTP
        </stylospectrum-button>
      </template>
    </AuthWrapper>
    <stylospectrum-toast ref="toastRef"></stylospectrum-toast>
  </ClientOnly>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import '@stylospectrum/ui/dist/form';
import '@stylospectrum/ui/dist/form/form-item';
import '@stylospectrum/ui/dist/input';
import '@stylospectrum/ui/dist/toast';
import '@stylospectrum/ui/dist/message-strip';

import { type IForm, type IToast } from '@stylospectrum/ui/dist/types';

import AuthWrapper from '../components/AuthWrapper.vue';
import type { SendOtpToEmailResponse, VerifyOtpResponse } from '~/interface';
import { useCredentialStore } from '~/stores';

const formRef = ref<IForm>();
const toastRef = ref<IToast>();
const renderComponent = ref(true);
const infoVisible = ref(false);
const credentialStore = useCredentialStore();

const router = useRouter();

async function handleButtonSubmit() {
  const values = await formRef.value!.validateFields();
  if (values) {
    try {
      const response = await $fetch<VerifyOtpResponse>('/api/verify-otp', {
        method: 'post',
        body: {
          email: credentialStore.email,
          code: values.otp,
        },
      });

      if (response.valid) {
        router.push('/login/new-password');
      } else {
        toastRef.value?.show('Invalid OTP. Please check your code and try again');
      }
    } catch (err) {
      console.log(err);
    }
  }
}

async function handleResend() {
  const response = await $fetch<SendOtpToEmailResponse>('/api/send-otp-to-email', {
    method: 'post',
    body: {
      email: credentialStore.email,
    },
  });
  infoVisible.value = response.sent;
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
.description {
  margin-bottom: 1rem;
  color: #eaecee;
  font-weight: 400;
  font-size: 0.875rem;
  font-family: $font-family;
}

.button {
  height: 2.25rem;
  margin-top: -1rem;
}
</style>
