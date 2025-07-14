<script setup lang="ts">
import { computed } from 'vue';
import { BaseCard } from '@/components/BaseCard';
import { useTodoListStore } from '@/stores/useTodoListStore';
import { ListItem } from '@/components/ListItem';
import { Filter } from '@/components/Filter';

const store = useTodoListStore();

const hasItems = computed(() => {
  return !!store.pendingItems.length;
});
</script>

<template>
  <base-card class="col-start-5 col-span-4 row-start-2 row-span-10">
    <Filter />
    
    <div v-if="!hasItems">No pending Items</div>

    <ul v-else class="flex flex-col gap-3">
      <list-item 
        v-for="item in store.pendingItems" 
        :key="item.id"
        :id="item.id"
        :description="item.description" 
        :state="item.state"
      />
    </ul>
  </base-card>
</template>

<style scoped></style>
