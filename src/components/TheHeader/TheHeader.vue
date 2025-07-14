<script setup lang="ts">
import { defineComponent, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { BaseCard } from '@/components/BaseCard';
import { BaseButton } from '@/components/BaseButton';

defineComponent({
  name: 'TheHeader',
});

const router = useRouter();
const route = useRoute();

const pageTitle = computed(() => {
  const routePath = route.path;
  if (routePath === '/list-pending') return 'Pending Items';
  if (routePath === '/list-done') return 'Completed Items';
  if (routePath === '/create') return 'Create New Item';
  if (routePath.startsWith('/edit/')) return 'Edit Item';
  return 'Todo List';
});

const navigateToCreate = () => router.push('/create');
const navigateToPending = () => router.push('/list-pending');
const navigateToDone = () => router.push('/list-done');
</script>

<template>
  <base-card class="col-span-full grid auto-flow-col items-center">
    <h3 class="text-lg font-semibold">{{ pageTitle }}</h3>
    <div class="grid auto-flow-col gap-2 justify-end">
      <base-button 
        :class="{ 'bg-blue-500 text-white': route.path === '/create' }"
        @click="navigateToCreate"
      >
        Create
      </base-button>
      <base-button 
        :class="{ 'bg-blue-500 text-white': route.path === '/list-pending' }"
        @click="navigateToPending"
      >
        Pending
      </base-button>
      <base-button 
        :class="{ 'bg-blue-500 text-white': route.path === '/list-done' }"
        @click="navigateToDone"
      >
        Done
      </base-button>
    </div>
  </base-card>
</template>

<style scoped></style>
