import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useFilterStore = defineStore('Filter', () => {
  const selectedCategory = ref<string | null>(null);

  const setCategory = (category: string) => {
    selectedCategory.value = category;
  };

  const clearFilter = () => {
    selectedCategory.value = null;
  };

  return {
    selectedCategory,
    setCategory,
    clearFilter
  };
});