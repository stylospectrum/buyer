<template>
  <div
    class="container"
    @mouseover="handleMouseOver"
    @mouseleave="handleMouseLeave"
    @click="(e) => $emit('click', e)"
  >
    <stylospectrum-avatar initials="FJ"></stylospectrum-avatar>
    <div class="text-container">
      <div class="top">
        <div class="title">
          {{ title }}
        </div>

        <div class="date">
          {{ date }}
        </div>
      </div>

      <div class="bottom">
        <div class="last-message">
          {{ lastMessage }}
        </div>

        <stylospectrum-popover
          ref="popoverRef"
          horizontal-align="Right"
          offset-x="16"
          v-if="hover || popoverRef?.opened"
        >
          <div
            slot="opener"
            style="width: 1rem; height: 1rem"
            @click="
              (e: MouseEvent) => {
                e.stopPropagation();
                popoverRef?.show();
              }
            "
          >
            <stylospectrum-icon class="icon icon-arrow" name="navigation-down-arrow">
            </stylospectrum-icon>
          </div>

          <div style="width: 175px">
            <stylospectrum-list-item icon="delete" @click="handleDelete">
              Delete
            </stylospectrum-list-item>
          </div>
        </stylospectrum-popover>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import '@stylospectrum/ui/dist/avatar';
import '@stylospectrum/ui/dist/icon';
import '@stylospectrum/ui/dist/icon/data/delete';
import '@stylospectrum/ui/dist/icon/data/navigation-down-arrow';

import type { IPopover } from '@stylospectrum/ui/dist/types';

interface ConversationItemProps {
  title: string;
  date: string;
  lastMessage: string;
}

const emit = defineEmits(['delete', 'click']);
const props = defineProps<ConversationItemProps>();
const { title, date, lastMessage } = props;

const hover = ref(false);
const popoverRef = ref<IPopover>();

const handleMouseOver = () => {
  hover.value = true;
};

const handleMouseLeave = () => {
  hover.value = false;
};

const handleDelete = (e: MouseEvent) => {
  e.stopPropagation();
  emit('delete');
  popoverRef.value?.hide();
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  width: 18.75rem;
  padding: 1rem 0.375rem 1rem 1rem;
  align-items: center;
  gap: 0.75rem;
  border-bottom: 1px solid #2e3742;
  background: #1d232a;
  box-sizing: border-box;
  cursor: pointer;

  &:hover {
    background: #232b33;
  }
}

.text-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  flex: 1 0 0;

  .top,
  .bottom {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    align-self: stretch;
  }

  .title {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    flex: 1 0 0;
    overflow: hidden;
    color: #eaecee;
    text-overflow: ellipsis;

    font-family: $font-family;
    font-size: 1rem;
    font-weight: 400;
  }

  .date {
    color: #8396a8;
    font-family: $font-family;
    font-size: 0.75rem;
    font-weight: 400;
  }

  .last-message {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    flex: 1 0 0;
    overflow: hidden;
    color: #8396a8;
    text-overflow: ellipsis;
    font-family: $font-family;
    font-size: 0.875rem;
    font-weight: 400;
  }

  .icon {
    font-size: 1rem;

    &-arrow {
      color: #4db1ff;
      cursor: pointer;
    }
  }
}
</style>
