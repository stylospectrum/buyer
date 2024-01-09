<template>
  <ClientOnly>
    <AuthWrapper title="Password assistance" @buttonSubmit="handleButtonSubmit">
      <template v-slot:description>
        <div className="description">Enter the email address associated with your account.</div>
      </template>

      <template v-slot:form>
        <stylospectrum-form ref="formRef" v-if="renderComponent">
          <stylospectrum-form-item
            style="margin-bottom: 0"
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
            <stylospectrum-input style="width: 100%" allow-clear> </stylospectrum-input>
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
import { AuthApi } from '~/api';
import { User } from '~/model';
import { useUserStore } from '~/stores';

const formRef = ref<IForm>();
const toastRef = ref<IToast>();
const renderComponent = ref(true);
const router = useRouter();
const userStore = useUserStore();
const axios = useAxios();
const authApi = new AuthApi(axios);

async function handleButtonSubmit() {
  const values = await formRef.value!.validateFields();
  if (values) {
    try {
      const response = await authApi.sendOTPToEmail({
        email: values.email,
      });

      if (response.statusCode !== 200) {
        toastRef.value?.show(response.message);
        return;
      }

      if (response.data.sent) {
        userStore.setUser(new User({ email: values.email }));
        router.push('/login/verification');
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
