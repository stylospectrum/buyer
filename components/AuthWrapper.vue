<template>
  <div class="container">
    <div class="wrapper">
      <div class="intro">
        <div class="intro-text">{{ introTitle }}</div>
        <div class="intro-image">
          <img :src="img.src" :height="img.height" :width="img.width" alt="Illustration" />
        </div>
      </div>

      <div class="box">
        <div class="box-form">
          <div class="box-form-title">{{ title }}</div>
          <slot name="form"></slot>
        </div>

        <stylospectrum-button
          @click="$emit('buttonSubmit')"
          @keydown="(e) => $emit('buttonKeyDown', e)"
          class="box-button"
        >
          {{ buttonText }}
        </stylospectrum-button>

        <slot name="bottom"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import '@stylospectrum/ui/dist/button';

interface AuthWrapperProps {
  introTitle?: string;
  title?: string;
  buttonText?: string;
  img?: {
    src: string;
    width: string;
    height: string;
  };
}

const props = defineProps<AuthWrapperProps>();

const {
  introTitle = 'Explore, try on, and buy your favorite clothes!',
  title = 'Sign in',
  buttonText = 'Continue',
  img = {
    src: 'img/login.png',
    width: '400px',
    height: '398.55px',
  },
} = props;
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
}

.wrapper {
  display: flex;
  gap: 12.5rem;
  align-items: center;
}

.intro {
  display: flex;
  flex-direction: column;
  gap: 2rem;

  &-text {
    width: 29.75rem;
    color: #fff;
    font-weight: 700;
    font-size: 2rem;
    font-family: $font-family;
    text-align: center;
  }
}

.box {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  box-sizing: border-box;
  width: 27.75rem;
  padding: 2.75rem;
  background: #1d232a;
  border-radius: 0.75rem;
  box-shadow:
    0 20px 80px 0 rgba(0, 0, 0, 0.6),
    0 0 0 1px rgba(255, 255, 255, 0.35);

  &-form {
    &-title {
      margin-bottom: 1rem;
      color: #eaecee;
      font-weight: 900;
      font-size: 1.5rem;
      font-family: $font-family;
    }
  }

  &-button {
    height: 2.25rem;
  }
}
</style>
