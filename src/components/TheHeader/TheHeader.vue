<script setup lang="ts">
import { defineComponent } from 'vue';
import { BaseCard } from '@/components/BaseCard';

defineComponent({
  name: 'TheHeader',
});
</script>

<template>
  <base-card class="col-span-full grid auto-flow-col items-center">
    <h3>Page Name</h3>
    <div class="grid auto-flow-col gap-2 justify-end">
      <button>Create</button>
      <button>Pending</button>
      <button>Done</button>
    </div>
  </base-card>
</template>

<style scoped></style>
