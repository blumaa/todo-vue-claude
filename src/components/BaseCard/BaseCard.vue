<script setup lang="ts">
import { defineComponent } from 'vue';

defineComponent({
name: 'BaseCard'
})
</script>

<template>
  <div class="border border-neutral-300 rounded bg-white py-2 px-4">
    <slot />
  </div>
</template>

<style scoped>

</style>
