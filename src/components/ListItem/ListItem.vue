<script setup lang="ts">
import { computed, defineComponent } from 'vue';
import { ListItemState } from '@/types';
import { BaseButton } from '@/components/BaseButton';

defineComponent({
  name: 'ListItem',
});

const props = withDefaults(
  defineProps<{
    description: string;
    state?: ListItemState;
  }>(),
  {
    state: 'pending',
  }
);

const listItemClasses = computed(() => {
  return {
    pending: '',
    done: 'line-through',
  }[props.state];
});
</script>

<template>
  <li
    :class="[
      'border border-neutral-300 rounded py-2 px-4 flex flex-row items-center gap-2',
      listItemClasses,
    ]"
    :aria-checked="state === 'done'"
  >
    <base-button>Complete</base-button>
    <div class="w-full">
      {{ description }}
    </div>
    <base-button>Edit</base-button>
    <base-button>Remove</base-button>
  </li>
</template>

<style scoped></style>
