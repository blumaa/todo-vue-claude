<script setup lang="ts">
import { computed } from 'vue';
import { BaseCard } from '@/components/BaseCard';
import { useTodoListStore } from '@/stores/useTodoListStore';
import { ListItem } from '@/components/ListItem';
import { FilterButtons } from '@/components/Filter';

const store = useTodoListStore();

const hasItems = computed(() => {
  return !!store.pendingItems.length;
});
</script>

<template>
  <base-card>
    <filter-buttons />
    
    <div v-if="!hasItems">No pending Items</div>

    <ul v-else class="flex flex-col gap-3">
      <list-item 
        v-for="item in store.pendingItems" 
        :id="item.id"
        :key="item.id"
        :description="item.description" 
        :state="item.state"
      />
    </ul>
  </base-card>
</template>

<style scoped></style>
