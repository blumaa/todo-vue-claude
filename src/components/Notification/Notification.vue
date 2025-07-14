<script setup lang="ts">
import { defineComponent } from 'vue';

defineComponent({
  name: 'Notification',
});

const props = withDefaults(
  defineProps<{
    message: string;
    visible: boolean;
    type?: 'success' | 'error';
  }>(),
  {
    type: 'success',
  }
);
</script>

<template>
  <div 
    v-if="visible"
    :class="[
      'fixed top-3 left-1/2 transform -translate-x-1/2 z-50 text-white px-4 py-2 rounded shadow-lg transition-all duration-300 ease-in-out',
      {
        'bg-green-500': props.type === 'success',
        'bg-red-500': props.type === 'error'
      }
    ]"
    style="animation: slideDown 0.3s ease-out;"
  >
    {{ message }}
  </div>
</template>

<style scoped>
@keyframes slideDown {
  from {
    transform: translateX(-50%) translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(-50%) translateY(0);
    opacity: 1;
  }
}
</style>