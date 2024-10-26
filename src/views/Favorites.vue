<script setup>
   import WeatherList from '@/components/WeatherList.vue';
   import { useFavorites } from '@/composables/useFavorite';
   import { ref } from 'vue';

   const { items: favorites } = useFavorites();

   const selectedId = ref(null);
</script>

<template>
   <div>
      <WeatherList
         v-if="favorites && favorites.length > 0"
         :items-ids="favorites"
         v-model:selectedId="selectedId"
         :hide-delete="true"
      />
      <div v-else>
         <h2 class="empty-text">{{ $t('nofavorites') }}</h2>
      </div>
   </div>
</template>

<style scoped>
   .empty-text {
      text-align: center;
   }
</style>
