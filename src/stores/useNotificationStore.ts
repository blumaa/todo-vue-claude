import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useNotificationStore = defineStore('Notification', () => {
  const message = ref('');
  const visible = ref(false);
  let timeoutId: number | null = null;

  const showNotification = (text: string) => {
    // Clear any existing timeout
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    
    message.value = text;
    visible.value = true;
    
    // Hide after 3 seconds
    timeoutId = setTimeout(() => {
      visible.value = false;
      message.value = '';
    }, 3000);
  };

  const hideNotification = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
    visible.value = false;
    message.value = '';
  };

  return {
    message,
    visible,
    showNotification,
    hideNotification
  };
});