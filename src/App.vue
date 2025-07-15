<script setup lang="ts">
import { TheHeader } from '@/components/TheHeader';
import { NotificationPopup } from '@/components/Notification';
import { useNotificationStore } from '@/stores/useNotificationStore';

const notificationStore = useNotificationStore();
</script>

<template>
  <div class="w-screen h-screen flex flex-col gap-3 bg-neutral-100">
    <div class="flex items-center justify-center bg-blue-600 text-white py-4">
      <h1 class="text-2xl font-bold">Aaron's Amazing Todo List</h1>
    </div>
    <div class="flex-1 flex flex-col gap-3 px-3 pb-3">
      <the-header />
      <div class="flex-1 flex justify-center">
        <router-view></router-view>
      </div>
    </div>
    <notification-popup 
      :message="notificationStore.message" 
      :visible="notificationStore.visible" 
      :type="notificationStore.type"
    />
  </div>
</template>

<style scoped></style>
