<script setup>
   const props = defineProps({ active: { type: Boolean, default: false } });
</script>

<template>
   <button :class="{ active, active }">
      <slot></slot>
   </button>
</template>

<style scoped>
   button {
      background-color: transparent;
      border: unset;
      width: 100%;
      border: 1px solid transparent;
      transition: all 0.3s;
      padding: 0.3em;
      border-radius: 0.5rem;
   }

   button:hover,
   button.active {
      border: 1px solid var(--main-color);
      filter: invert(0.3);
   }
</style>
