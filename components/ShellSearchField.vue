<template>
  <div class="wrap" :class="{ 'wrap-focused': focused }">
    <input
      placeholder="Search for products, brands and shops"
      ref="inputNode"
      @input="handleChange"
      @focus="handleFocus"
      @blur="handleBlur"
    />

    <div class="clear-icon" v-if="value" @click="handleClear">
      <stylospectrum-icon name="decline"></stylospectrum-icon>
    </div>

    <div class="search-icon" :class="{ 'search-icon-active': value }" @click="handleSearch">
      <stylospectrum-icon name="search"></stylospectrum-icon>
    </div>
  </div>
</template>

<script setup lang="ts">
import '@stylospectrum/ui/dist/icon';
import '@stylospectrum/ui/dist/icon/data/search';
import '@stylospectrum/ui/dist/icon/data/decline';

const value = ref();
const focused = ref<boolean>();
const inputNode = ref<HTMLInputElement>();

const handleChange = (e: Event) => {
  value.value = (e.target as HTMLInputElement).value;
};

const handleClear = () => {
  inputNode.value!.value = '';
  value.value = '';
};

const handleSearch = () => {
  if (!value.value) {
    inputNode.value?.focus();
  }
};

const handleFocus = () => {
  focused.value = true;
};

const handleBlur = () => {
  focused.value = false;
};
</script>

<style lang="scss" scoped>
.wrap {
  display: flex;
  width: 35rem;
  height: 2.125rem;
  padding: 0.25rem 0.25rem 0.25rem 0.875rem;
  align-items: center;
  gap: 0.25rem;
  flex-shrink: 0;
  box-sizing: border-box;
  border-radius: 1.125rem;
  position: relative;
  background: #12171c;
  box-shadow: inset 0 0 0 0.0625rem rgba(169, 180, 190, 0.25);
  border: none;
  background: 0 100% / 100% 0.0625rem no-repeat linear-gradient(0deg, #a9b4be, #a9b4be) border-box;

  &:hover {
    background: 0 100% / 100% 0.0625rem no-repeat linear-gradient(0deg, #4db1ff, #4db1ff) border-box;
    background-color: #1d232a;
    box-shadow: inset 0 0 0 0.0625rem rgba(77, 177, 255, 0.3);
  }

  &-focused::before {
    border: 0.125rem solid #4db1ff;
    border-radius: 1.125rem;
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2;
    pointer-events: none;
  }

  input {
    -webkit-appearance: none;
    box-sizing: border-box;
    width: 100%;
    background: transparent;
    border: none;
    outline: none;
    padding: 0;
    margin: 0;
    text-indent: 0.125rem;
    vertical-align: top;
    text-overflow: ellipsis;
    flex: 1;
    font-family: '72', '72full', Arial, Helvetica, sans-serif;
    color: #fff;
    font-size: 0.875rem;
    height: 1rem;

    &::placeholder {
      color: #8396a8;
    }
  }

  .clear-icon {
    text-align: center;
    width: 1.75rem;
    height: 1.75rem;
    line-height: 1.75rem;
    font-size: 1rem;
    text-align: center;
    margin-right: 0.25rem;
    padding: 0;
    border-radius: 1.125rem;
    cursor: pointer;
    color: #fff;

    &:hover {
      background: #1d232a;
      box-shadow: inset 0 0 0 0.0625rem rgba(169, 180, 190, 0.25);
      color: #eaecee;
    }

    &:active {
      background: #1d232a;
      box-shadow: inset 0 0 0 0.0625rem rgba(77, 177, 255, 0.3);
      color: #4db1ff;
    }
  }

  .search-icon {
    height: 1.75rem;
    min-width: 1.75rem;
    line-height: 1.75rem;
    border-radius: 1.125rem;
    font-size: 1rem;
    color: #fff;
    margin-right: 0.25rem;
    text-align: center;
    cursor: pointer;

    &-active {
      background-color: #0070f2;
    }

    &:hover {
      background: #1d232a;
      box-shadow: inset 0 0 0 0.0625rem rgba(169, 180, 190, 0.25);
    }
  }
}
</style>
