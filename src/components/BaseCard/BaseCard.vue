<script setup lang="ts">
import { defineComponent } from 'vue';

defineComponent({
  name: 'BaseCard',
});

const cardClasses = {
  default:
    'col-start-5 col-span-4 row-start-3 row-span-9 border border-neutral-300 rounded bg-white py-2 px-4',
  header: 'col-span-full row-start-2 border border-neutral-300 rounded bg-white py-2 px-4',
  custom: 'border border-neutral-300 rounded bg-white py-2 px-4',
};
</script>

<template>
  <div :class="cardClasses[variant]">
    <slot />
  </div>
</template>

<style scoped></style>
