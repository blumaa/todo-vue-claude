<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { BaseCard } from '@/components/BaseCard';
import { BaseButton } from '@/components/BaseButton';
import { useTodoListStore } from '@/stores/useTodoListStore';
import { useNotificationStore } from '@/stores/useNotificationStore';

const route = useRoute();
const router = useRouter();
const { list, editItem } = useTodoListStore();
const { showNotification } = useNotificationStore();

const itemId = route.params.id as string;
const todoName = ref('');
const todoCategory = ref('');
const originalDescription = ref('');

const PENDING_ROUTE = '/list-pending';

onMounted(() => {
  const item = list.find(item => item.id === itemId);
  if (item) {
    const description = item.description;
    const categoryMatch = description.match(/^\[([^\]]+)\]\s*(.+)$/);
    if (categoryMatch) {
      todoCategory.value = categoryMatch[1];
      todoName.value = categoryMatch[2];
    } else {
      todoName.value = description;
    }
    originalDescription.value = description;
  } else {
    router.push(PENDING_ROUTE);
  }
});

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
  editItem(itemId, description);
  showNotification('Todo edited');
  router.push(PENDING_ROUTE);
};

const onCancel = () => {
  router.push(PENDING_ROUTE);
};
</script>

<template>
  <base-card class="col-start-5 col-span-4 row-start-2 row-span-10">
    <h2 class="text-xl font-bold mb-4">Edit Item</h2>
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
      <div class="flex gap-2">
        <base-button type="submit">Update</base-button>
        <base-button type="button" @click="onCancel">Cancel</base-button>
      </div>
    </form>
  </base-card>
</template>

<style scoped></style>