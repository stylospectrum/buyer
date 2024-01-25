<template>
  <div ref="opener" @click="() => popoverRef?.showAt(opener!)">
    <slot name="opener"></slot>
  </div>

  <stylospectrum-popover hide-footer header-text="Chat" ref="popoverRef">
    <stylospectrum-input
      style="width: 100%"
      placeholder="Search"
      slot="sub-header"
      allow-clear
      show-search
    >
    </stylospectrum-input>

    <div class="list">
      <ConversationItem
        v-for="(item, idx) in mockData"
        :key="idx"
        :title="item.title"
        :date="item.date"
        :lastMessage="item.lastMessage"
        @click="handleClick"
        @delete="() => console.log('delete')"
      />
    </div>
  </stylospectrum-popover>
</template>

<script setup lang="ts">
import '@stylospectrum/ui/dist/popover';
import '@stylospectrum/ui/dist/input';

import type { IPopover } from '@stylospectrum/ui/dist/types';

import ConversationItem from './ConversationItem.vue';

const emit = defineEmits(['click']);
const popoverRef = ref<IPopover>();
const opener = ref<HTMLElement>();

const handleClick = () => {
  emit('click');
  popoverRef.value?.hide();
};

const mockData = [
  {
    title: 'Trendy Threads',
    date: '15/08/2023',
    lastMessage: 'Hey! We just got in some new summer dresses. Check them out!',
  },
  {
    title: 'Chic Couture',
    date: '14/08/2023',
    lastMessage: 'Sale Alert: 30% off on all blazers and jackets!',
  },
  {
    title: 'Urban Styles',
    date: '15/08/2023',
    lastMessage: 'Your order #567890 has been shipped. It should arrive by Friday!',
  },
  {
    title: 'Vintage Vibes',
    date: '25/06/2022',
    lastMessage: "Looking for something unique? We've restocked our collection of vintage hats!",
  },
  {
    title: 'Vintage Vibes',
    date: '25/06/2022',
    lastMessage: "Looking for something unique? We've restocked our collection of vintage hats!",
  },
  {
    title: 'Vintage Vibes',
    date: '25/06/2022',
    lastMessage: "Looking for something unique? We've restocked our collection of vintage hats!",
  },
  {
    title: 'Vintage Vibes',
    date: '25/06/2022',
    lastMessage: "Looking for something unique? We've restocked our collection of vintage hats!",
  },
];
</script>

<style lang="scss" scoped>
.list {
  max-height: 324px;
}
</style>
