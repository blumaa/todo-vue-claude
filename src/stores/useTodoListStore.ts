import { reactive } from 'vue';
import { defineStore } from 'pinia';
import { ListItem } from '@/types';

export const useTodoListStore = defineStore('TodoList', () => {
  const list: ListItem[] = reactive([]);

  return {
    list
  };
});
