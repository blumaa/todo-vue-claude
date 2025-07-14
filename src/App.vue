<script setup lang="ts">
import { TheHeader } from '@/components/TheHeader';
import { Notification } from '@/components/Notification';
import { useNotificationStore } from '@/stores/useNotificationStore';

const notificationStore = useNotificationStore();
</script>

<template>
  <div class="w-screen h-screen grid grid-cols-12 grid-rows-12 gap-3 bg-neutral-100">
    <TheHeader />
    <router-view></router-view>
    <Notification 
      :message="notificationStore.message" 
      :visible="notificationStore.visible" 
    />
  </div>
</template>

<style scoped></style>
