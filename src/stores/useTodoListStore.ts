import { reactive, computed } from 'vue';
import { defineStore } from 'pinia';
import { ListItem, ListItemState } from '@/types';
import { useFilterStore } from './useFilterStore';

export const useTodoListStore = defineStore('TodoList', () => {
  const list: ListItem[] = reactive([]);

  const extractCategory = (description: string): string | null => {
    const match = description.match(/^\[([^\]]+)\]/);
    return match ? match[1] : null;
  };

  const filterByCategory = (items: ListItem[], selectedCategory: string | null): ListItem[] => {
    if (!selectedCategory) return items;
    return items.filter(item => {
      const category = extractCategory(item.description);
      return category === selectedCategory;
    });
  };

  const pendingItems = computed(() => {
    const filterStore = useFilterStore();
    const pending = list.filter(item => item.state === 'pending');
    return filterByCategory(pending, filterStore.selectedCategory);
  });
  
  const completedItems = computed(() => {
    const filterStore = useFilterStore();
    const completed = list.filter(item => item.state === 'done');
    return filterByCategory(completed, filterStore.selectedCategory);
  });

  const addItem = (description: string) => {
    const newItem: ListItem = {
      id: Date.now().toString(),
      description,
      state: 'pending'
    };
    list.push(newItem);
  };

  const toggleComplete = (id: string) => {
    const item = list.find(item => item.id === id);
    if (item) {
      item.state = item.state === 'pending' ? 'done' : 'pending';
    }
  };

  const removeItem = (id: string) => {
    const index = list.findIndex(item => item.id === id);
    if (index !== -1) {
      list.splice(index, 1);
    }
  };

  const editItem = (id: string, newDescription: string) => {
    const item = list.find(item => item.id === id);
    if (item) {
      item.description = newDescription;
    }
  };

  return {
    list,
    pendingItems,
    completedItems,
    addItem,
    toggleComplete,
    removeItem,
    editItem
  };
});
