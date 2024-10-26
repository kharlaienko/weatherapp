<script setup>
   const props = defineProps({ active: { type: Boolean, default: false } });
</script>

<template>
   <div class="card" :class="{ active: active }">
      <slot></slot>
   </div>
</template>

<style scoped>
   .card {
      background-color: var(--surface);
      border: 1px solid var(--main-color);
      border-radius: 0.5rem;
      padding: 0.5rem;
      transition: all 0.3s;
   }

   .card.active,
   .card:hover {
      box-shadow: 1px -1px 9px -1px rgba(0, 0, 0, 0.72) inset;
   }
</style>
