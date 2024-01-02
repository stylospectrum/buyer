<template>
  <div class="wrapper">
    <textarea :style="style" @input="handleInput" @keydown="handleKeyDown"></textarea>
  </div>
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue';
import { isEnter } from '@stylospectrum/ui/dist/utils/Keys';

import calculateTextareaHeight from '~/utils/calculateTextareaHeight';

const style = ref<CSSProperties>();
const emit = defineEmits(['enter']);

const handleInput = (e: Event) => {
  const node = e.target as HTMLTextAreaElement;
  style.value = calculateTextareaHeight(node);
};

const handleKeyDown = (e: KeyboardEvent) => {
  if (isEnter(e)) {
    e.preventDefault();
    emit('enter', (e.target as HTMLTextAreaElement).value);
  }
};
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  border-radius: 0.5rem;
  background-color: #242e38;
  box-sizing: border-box;

  textarea {
    height: 2.25rem;
    padding: 0.62rem 0.84rem;
    box-sizing: border-box;
    width: 100%;
    text-overflow: ellipsis;
    background: transparent;
    border: none;
    outline: none;
    appearance: none;
    color: #fff;
    font-size: 0.875rem;
    font-weight: 400;
    font-family: $font-family;
    overflow: hidden;
    resize: none;
  }
}
</style>
