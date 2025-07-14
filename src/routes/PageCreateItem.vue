<script setup lang="ts">
import { ref } from 'vue';
import { BaseCard } from '@/components/BaseCard';
import { BaseButton } from '@/components/BaseButton';
import { useTodoListStore } from '@/stores/useTodoListStore';
import { useNotificationStore } from '@/stores/useNotificationStore';

const store = useTodoListStore();
const { showNotification } = useNotificationStore();

const todoName = ref('');
const todoCategory = ref('');

const onSubmit = (e: Event) => {
  e.preventDefault();
  
  if (!todoName.value.trim()) {
    showNotification('Please enter a todo name', 'error');
    return;
  }
  if (!todoCategory.value) {
    showNotification('Please select a category', 'error');
    return;
  }
  
  const description = `[${todoCategory.value}] ${todoName.value.trim()}`;
  store.addItem(description);
  showNotification('Todo created');
  todoName.value = '';
  todoCategory.value = '';
};
</script>

<template>
  <base-card class="col-start-5 col-span-4 row-start-2 row-span-10">
    <form class="flex flex-col gap-4" @submit="onSubmit">
      <div class="flex flex-col">
        <label for="todo-name"> Name </label>
        <input 
          id="todo-name"
          v-model="todoName"
          class="border border-neutral-300 hover:border-neutral-500 rounded p-2" 
        />
      </div>
      <div class="flex flex-col">
        <label for="todo-category"> Category </label>
        <select
          id="todo-category"
          v-model="todoCategory"
          class="border border-neutral-300 hover:border-neutral-500 rounded p-2"
        >
          <option value="">Select a category</option>
          <option value="Health">Health</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
        </select>
      </div>
      <base-button type="submit"> Submit </base-button>
    </form>
  </base-card>
</template>

<style scoped></style>
