<template>
  <div
    class="wrap"
    :class="{ 'wrap-focused': focused }"
    tabindex="0"
    @focus="handleFocus"
    @blur="handleBlur"
    @click="$emit('click')"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
const focused = ref<boolean>();

const handleFocus = () => {
  focused.value = true;
};

const handleBlur = () => {
  focused.value = false;
};
</script>

<style lang="scss" scoped>
.wrap {
  height: 1.625rem;
  min-width: 2rem;
  font-size: 1rem;
  text-align: center;
  position: relative;
  border-radius: 0.5rem;
  margin: 0 0 0 0.5rem;
  cursor: pointer;
  vertical-align: top;
  border: none;
  background-color: transparent;
  position: relative;
  color: #eaecee;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;

  &:hover {
    background: #1d232a;
    box-shadow: inset 0 0 0 0.0625rem rgba(169, 180, 190, 0.25);
  }

  &-focused::before {
    border: 0.125rem solid #9ad3ff;
    border-radius: 0.375rem;
    inset: 0.0625rem;
    box-sizing: border-box;
    content: '';
    position: absolute;
  }
}
</style>
