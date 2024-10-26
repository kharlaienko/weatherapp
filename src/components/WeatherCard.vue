<script setup>
   import { useCityInfo } from '@/composables/useCityInfo';
   import Card from './Card.vue';
   import Spinner from '@/assets/icons/spinner.svg';
   import { watch } from 'vue';
   import Button from './Button.vue';
   import Favorite from '@/assets/icons/favorite.svg';
   import Delete from '@/assets/icons/delete.svg';

   const emit = defineEmits(['selected', 'favorite', 'delete']);

   const props = defineProps({
      id: { required: true },
      active: { type: Boolean },
      isFiveDays: { type: Boolean, default: false },
      isFavorite: { type: Boolean, default: false },
      hideDelete: { type: Boolean, default: false },
   });

   const { city, temp, isLoading, refetch } = useCityInfo({
      isFiveDays: props.isFiveDays,
      id: props.id,
   });

   watch([() => props.isFiveDays, () => props.id], () => {
      refetch({ isFiveDays: props.isFiveDays, id: props.id });
   });
</script>

<template>
   <Card :active="active" class="weather-card" @click="emit('selected', id)">
      <template v-if="!isLoading && city">
         <div class="actions">
            <Button @click.stop="emit('favorite', id)"
               ><Favorite :class="{ filled: isFavorite }" width="20"
            /></Button>

            <Button v-if="!hideDelete" @click.stop="emit('delete', id)"
               ><Delete width="20"
            /></Button>
         </div>
         <p class="city-title">{{ city.country }}, {{ city.name }}</p>

         <p>
            {{ $t('now') }}: <b>{{ temp.temp }}</b>
         </p>

         <p>
            {{ $t('minTemp') }}: <b>{{ temp.temp_min }}</b>
         </p>
         <p>
            {{ $t('maxTemp') }}: <b>{{ temp.temp_max }}</b>
         </p>
      </template>
      <Spinner v-else width="80" />
   </Card>
</template>

<style scoped>
   .weather-card {
      max-width: 250px;
      width: 100%;
      text-align: center;
   }

   .city-title {
      margin-top: 0;
      font-size: 1.2rem;
   }

   .filled {
      fill: red;
   }

   .actions {
      display: flex;
      justify-content: end;
      align-items: center;
   }

   .actions button {
      width: fit-content;
   }
</style>
