<script setup lang="ts">
import { BaseCard } from '@/components/BaseCard';
import { BaseButton } from '@/components/BaseButton';

const onSubmit = () => {};
</script>

<template>
  <base-card class="col-start-5 col-span-4 row-start-2 row-span-10">
    <form class="flex flex-col gap-4" @submit="onSubmit">
      <div class="flex flex-col">
        <label for="todo-name"> Name </label>
        <input class="border border-neutral-300 hover:border-neutral-500 rounded" id="todo-name" />
      </div>
      <div class="flex flex-col">
        <label for="todo-category"> Category </label>
        <select
          class="border border-neutral-300 hover:border-neutral-500 rounded"
          id="todo-category"
        >
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
