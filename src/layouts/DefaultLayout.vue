<script setup>
   import Header from '../components/Header.vue';
</script>

<template>
   <div class="layout">
      <Header />
      <main class="main">
         <div class="content">
            <slot></slot>
         </div>
      </main>
   </div>
</template>

<style scoped>
   .main {
      margin-top: 1rem;
   }

   .layout {
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: max-content 1fr;
      height: 100%;
   }

   .content {
      height: 100%;
      width: 100%;
   }
</style>
