<script setup lang="ts">
import { TheHeader } from '@/components/TheHeader';
</script>

<template>
  <div class="w-screen h-screen grid cols-12 rows-12 gap-3 bg-neutral-100">
    <TheHeader />
    <router-view></router-view>
  </div>
</template>

<style scoped></style>
