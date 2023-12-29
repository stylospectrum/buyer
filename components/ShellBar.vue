<template>
  <div class="container">
    <div class="right"></div>
    <div class="center">
      <slot name="search"></slot>
    </div>
    <div class="left">
      <div class="spacer"></div>
      <slot name="left"></slot>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.container {
  position: relative;
  width: 100%;
  height: 2.75rem;
  padding: 0.25rem 3rem;
  display: flex;
  box-sizing: border-box;
  border: 1px solid #1d232a;
  background: #1d232a;
  box-shadow:
    0px 2px 2px 0px rgba(0, 0, 0, 0.8),
    0px -1px 0px 0px rgba(255, 255, 255, 0.2) inset;

  .right {
    width: 50%;
    padding-right: calc(17.5rem + 0.5rem);
  }

  .center {
    overflow: hidden;
    outline: none;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    margin: 0;
  }

  .left {
    flex-grow: 1;
    flex-shrink: 1;
    width: 50%;
    padding-left: calc(17.5rem + 0.5rem);
    margin-right: 0;
    margin-left: 0;
    display: inline-flex;
    vertical-align: top;
    box-sizing: border-box;
    align-items: center;
    min-width: 1px;
    max-width: 100%;
    height: 100%;
  }

  .spacer {
    margin: 0 !important;
    padding: 0 !important;
    border: 0 !important;
    height: 1px;
    -webkit-box-flex: 1;
    flex: auto;
  }
}
</style>
