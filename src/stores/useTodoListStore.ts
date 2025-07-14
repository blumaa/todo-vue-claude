import { reactive, computed } from 'vue';
import { defineStore } from 'pinia';
import { ListItem, ListItemState } from '@/types';

export const useTodoListStore = defineStore('TodoList', () => {
  const list: ListItem[] = reactive([]);

  const pendingItems = computed(() => list.filter(item => item.state === 'pending'));
  const completedItems = computed(() => list.filter(item => item.state === 'done'));

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
