<template>
  <ClientOnly>
    <AuthWrapper
      title="Create new password"
      buttonText="Save changes and Sign-In"
      @buttonSubmit="handleButtonSubmit"
    >
      <template v-slot:description>
        <div className="description">We will ask for this password whenever you Sign-In.</div>
      </template>

      <template v-slot:form>
        <stylospectrum-form ref="formRef" v-if="renderComponent">
          <stylospectrum-form-item
            style="margin-bottom: 0"
            label="New password"
            name="password"
            :rules="[{ required: true, message: 'Enter new password' }]"
          >
            <stylospectrum-input style="width: 100%" allow-clear type="Password">
            </stylospectrum-input>
          </stylospectrum-form-item>
        </stylospectrum-form>
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

import { type IForm, type IToast } from '@stylospectrum/ui/dist/types';

import AuthWrapper from '../components/AuthWrapper.vue';
import type { SignInResponse, UpdatePasswordResponse } from '~/interface';
import { useCredentialStore } from '~/stores';

const formRef = ref<IForm>();
const toastRef = ref<IToast>();
const renderComponent = ref(true);

const router = useRouter();
const authStore = useAuthStore();
const credentialStore = useCredentialStore();

async function handleButtonSubmit() {
  const values = await formRef.value!.validateFields();

  if (values) {
    try {
      let response: any = await $fetch<UpdatePasswordResponse>('/api/update-password', {
        method: 'post',
        body: {
          password: values.password,
          email: credentialStore.email,
        },
      });

      if (response.ok) {
        response = await $fetch<SignInResponse>('/api/login', {
          method: 'post',
          body: {
            password: values.password,
            email: credentialStore.email,
          },
        });

        if (response.message) {
          toastRef.value?.show(response.message);
          return;
        }
        authStore.setIsAuth(true);
        router.push('/');
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
.description {
  margin-bottom: 1rem;
  color: #eaecee;
  font-weight: 400;
  font-size: 0.875rem;
  font-family: $font-family;
}
</style>
