<script setup lang="ts">
import { defineComponent } from 'vue';

defineComponent({
  name: 'BaseCard',
});

interface Props {
  variant?: 'default' | 'header' | 'custom';
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
});

const cardClasses = {
  default:
    'w-full max-w-lg mx-auto border border-neutral-300 rounded bg-white py-2 px-4 sm:max-w-md md:max-w-lg lg:max-w-xl',
  header: 'w-full border border-neutral-300 rounded bg-white py-2 px-4',
  custom: 'border border-neutral-300 rounded bg-white py-2 px-4',
};
</script>

<template>
  <div :class="cardClasses[props.variant]">
    <slot />
  </div>
</template>

<style scoped></style>
