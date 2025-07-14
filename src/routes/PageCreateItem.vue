<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { BaseCard } from '@/components/BaseCard';
import { BaseButton } from '@/components/BaseButton';
import { useTodoListStore } from '@/stores/useTodoListStore';
import { useNotificationStore } from '@/stores/useNotificationStore';

const router = useRouter();
const store = useTodoListStore();
const { showNotification } = useNotificationStore();

const todoName = ref('');
const todoCategory = ref('');

const onSubmit = (e: Event) => {
  e.preventDefault();
  if (todoName.value.trim()) {
    const description = todoCategory.value 
      ? `[${todoCategory.value}] ${todoName.value.trim()}`
      : todoName.value.trim();
    store.addItem(description);
    showNotification('Todo created');
    todoName.value = '';
    todoCategory.value = '';
  }
};
</script>

<template>
  <base-card class="col-start-5 col-span-4 row-start-2 row-span-10">
    <form class="flex flex-col gap-4" @submit="onSubmit">
      <div class="flex flex-col">
        <label for="todo-name"> Name </label>
        <input 
          v-model="todoName"
          class="border border-neutral-300 hover:border-neutral-500 rounded p-2" 
          id="todo-name" 
          required
        />
      </div>
      <div class="flex flex-col">
        <label for="todo-category"> Category </label>
        <select
          v-model="todoCategory"
          class="border border-neutral-300 hover:border-neutral-500 rounded p-2"
          id="todo-category"
        >
          <option value="">Select a category</option>
          <option value="Health">Health</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
        </select>
      </div>
      <BaseButton type="submit"> Submit </BaseButton>
    </form>
  </base-card>
</template>

<style scoped></style>
