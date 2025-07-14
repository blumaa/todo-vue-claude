<script setup lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { ListItemState } from '@/types';
import { BaseButton } from '@/components/BaseButton';
import { useTodoListStore } from '@/stores/useTodoListStore';
import { useNotificationStore } from '@/stores/useNotificationStore';

defineComponent({
  name: 'ListItem',
});

const props = withDefaults(
  defineProps<{
    id: string;
    description: string;
    state?: ListItemState;
  }>(),
  {
    state: 'pending',
  }
);

const router = useRouter();
const { toggleComplete, removeItem } = useTodoListStore();
const { showNotification } = useNotificationStore();

const handleToggleComplete = () => {
  toggleComplete(props.id);
  const message = props.state === 'pending' ? 'Todo completed' : 'Todo not complete';
  showNotification(message);
};

const handleRemove = () => {
  removeItem(props.id);
  showNotification('Todo removed');
};

const handleEdit = () => {
  router.push(`/edit/${props.id}`);
};
</script>

<template>
  <li
    class="border border-neutral-300 rounded py-2 px-4 flex flex-row items-center gap-2"
    :aria-checked="props.state === 'done'"
  >
    <base-button @click="handleToggleComplete">
      {{ props.state === 'pending' ? 'Complete' : 'Not Complete' }}
    </base-button>
    
    <div class="w-full">
      <span :class="{ 'line-through': props.state === 'done' }">{{ description }}</span>
    </div>
    
    <base-button @click="handleEdit">Edit</base-button>
    <base-button @click="handleRemove">Remove</base-button>
  </li>
</template>

<style scoped></style>
