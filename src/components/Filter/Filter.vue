<script setup lang="ts">
import { defineComponent } from 'vue';
import { BaseButton } from '@/components/BaseButton';
import { useFilterStore } from '@/stores/useFilterStore';

defineComponent({
  name: 'FilterButtons',
});

const filterStore = useFilterStore();

const categories = ['Health', 'Work', 'Personal'];

const handleCategoryFilter = (category: string) => {
  filterStore.setCategory(category);
};

const handleClearFilter = () => {
  filterStore.clearFilter();
};
</script>

<template>
  <div class="flex gap-2 mb-4">
    <base-button 
      :class="{ 'bg-blue-500 text-white': filterStore.selectedCategory === null }"
      @click="handleClearFilter"
    >
      All
    </base-button>
    <base-button 
      v-for="category in categories" 
      :key="category"
      :class="{ 'bg-blue-500 text-white': filterStore.selectedCategory === category }"
      @click="handleCategoryFilter(category)"
    >
      {{ category }}
    </base-button>
  </div>
</template>

<style scoped></style>
