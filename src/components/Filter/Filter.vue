<script setup lang="ts">
import { defineComponent } from 'vue';
import { BaseButton } from '@/components/BaseButton';
import { useFilterStore } from '@/stores/useFilterStore';

defineComponent({
  name: 'Filter',
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
    <BaseButton 
      @click="handleClearFilter"
      :class="{ 'bg-blue-500 text-white': filterStore.selectedCategory === null }"
    >
      All
    </BaseButton>
    <BaseButton 
      v-for="category in categories" 
      :key="category"
      @click="handleCategoryFilter(category)"
      :class="{ 'bg-blue-500 text-white': filterStore.selectedCategory === category }"
    >
      {{ category }}
    </BaseButton>
  </div>
</template>

<style scoped></style>