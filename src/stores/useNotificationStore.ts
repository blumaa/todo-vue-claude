import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useNotificationStore = defineStore('Notification', () => {
  const message = ref('');
  const visible = ref(false);
  const type = ref<'success' | 'error'>('success');
  let timeoutId: number | null = null;

  const showNotification = (text: string, notificationType: 'success' | 'error' = 'success') => {
    // Clear any existing timeout
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    
    message.value = text;
    type.value = notificationType;
    visible.value = true;
    
    // Hide after 3 seconds
    timeoutId = setTimeout(() => {
      visible.value = false;
      message.value = '';
      type.value = 'success';
    }, 3000);
  };

  const hideNotification = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
    visible.value = false;
    message.value = '';
    type.value = 'success';
  };

  return {
    message,
    visible,
    type,
    showNotification,
    hideNotification
  };
});