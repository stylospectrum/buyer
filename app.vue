<template>
  <div>
    <stylospectrum-form ref="formRef">
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
        <stylospectrum-input></stylospectrum-input>
      </stylospectrum-form-item>

      <stylospectrum-form-item
        label="Password"
        name="password"
        :rules="[{ required: true, message: 'Enter your password' }]"
      >
        <stylospectrum-input type="Password"></stylospectrum-input>
      </stylospectrum-form-item>

      <stylospectrum-form-item name="keep-me-signed-in">
        <stylospectrum-checkbox text="Keep me signed in"> </stylospectrum-checkbox>
      </stylospectrum-form-item>

      <stylospectrum-button @click="handleClick"> Submit </stylospectrum-button>
    </stylospectrum-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import '@stylospectrum/ui/dist/button';
import '@stylospectrum/ui/dist/form';
import '@stylospectrum/ui/dist/form/form-item';
import '@stylospectrum/ui/dist/input';
import '@stylospectrum/ui/dist/checkbox';

const formRef = ref();

async function handleClick() {
  console.log(await formRef.value.validateFields());
}
</script>

<style lang="scss">
@import url(./app.scss);
</style>
