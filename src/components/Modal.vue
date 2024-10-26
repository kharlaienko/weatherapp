<script setup>
   import { ref } from 'vue';

   const isOpen = defineModel(false);
</script>

<template>
   <div v-if="isOpen" class="modal-overlay" @click="isOpen = false">
      <div class="modal-content" @click.stop>
         <slot></slot>
      </div>
   </div>
</template>

<style scoped>
   .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
   }

   .modal-content {
      background-color: #fff;
      padding: 20px;
      border-radius: 8px;
      position: relative;
      max-width: 500px;
      width: 90%;
      text-align: center;
   }
</style>
