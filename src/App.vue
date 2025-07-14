<script setup lang="ts">
import { TheHeader } from '@/components/TheHeader';
import { NotificationPopup } from '@/components/Notification';
import { useNotificationStore } from '@/stores/useNotificationStore';

const notificationStore = useNotificationStore();
</script>

<template>
  <div class="w-screen h-screen grid grid-cols-12 grid-rows-12 gap-3 bg-neutral-100">
    <div class="col-span-full row-start-1 flex items-center justify-center bg-blue-600 text-white">
      <h1 class="text-2xl font-bold">Aaron's Amazing Todo List</h1>
    </div>
    <the-header />
    <router-view></router-view>
    <notification-popup 
      :message="notificationStore.message" 
      :visible="notificationStore.visible" 
      :type="notificationStore.type"
    />
  </div>
</template>

<style scoped></style>
