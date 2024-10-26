<script setup>
   import { ref, watch } from 'vue';
   import Button from './Button.vue';
   import WeatherCard from './WeatherCard.vue';
   import WeatherForecast from './WeatherForecast.vue';
   import { useFavorites } from '@/composables/useFavorite';
   import { MAX_BLOCKS } from '@/consts/global';
   import Modal from './Modal.vue';

   const emit = defineEmits(['delete']);

   const props = defineProps({
      itemsIds: { type: Array, required: true, default: [] },
      hideDelete: { type: Boolean, default: false },
   });

   const { items: favorites, toggleFavorite } = useFavorites();

   const isOpenDelete = ref(false);
   const isOpenFavoriteLimit = ref(false);
   const itemToDelete = ref(null);

   const handleFavorite = (id) => {
      if (
         !favorites.value.includes(id) &&
         favorites.value?.length - 1 >= MAX_BLOCKS
      ) {
         isOpenFavoriteLimit.value = true;
         return;
      }
      toggleFavorite(id);
   };

   const handleDelete = (id) => {
      itemToDelete.value = id;
      isOpenDelete.value = true;
   };

   const selectedId = defineModel('selectedId');

   const isFiveDays = ref(false);

   watch(isOpenDelete, () => {
      if (!isOpenDelete) {
         itemToDelete.value = null;
      }
   });
</script>

<template>
   <div>
      <div v-if="itemsIds?.length" class="card-box">
         <div class="mode">
            <Button
               @click="isFiveDays = false"
               :active="isFiveDays === false"
               >{{ $t('day') }}</Button
            >
            <Button @click="isFiveDays = true" :active="isFiveDays === true">{{
               $t('5days')
            }}</Button>
         </div>
         <div class="card-list">
            <WeatherCard
               @selected="selectedId = $event"
               v-for="id in itemsIds"
               @click=""
               :key="id"
               :id="id"
               :active="selectedId === id"
               :is-favorite="favorites?.includes(id)"
               :is-five-days="isFiveDays"
               @favorite="handleFavorite"
               @delete="handleDelete"
               :hide-delete="hideDelete"
            />
         </div>

         <WeatherForecast
            v-if="selectedId"
            :city-id="selectedId"
            :is-five-days="isFiveDays"
         />
      </div>

      <Modal v-model="isOpenDelete">
         <div>
            <p>{{ $t('deleteMessage') }}</p>

            <div class="actions">
               <Button
                  @click="
                     emit('delete', itemToDelete);
                     isOpenDelete = false;
                  "
                  >{{ $t('delete') }}</Button
               >
               <Button @click="isOpenDelete = false">{{ $t('cancel') }}</Button>
            </div>
         </div>
      </Modal>

      <Modal v-model="isOpenFavoriteLimit">
         <div>
            <p>{{ $t('favLimit') }}</p>

            <div class="actions">
               <Button @click="isOpenDelete = false">{{ $t('close') }}</Button>
            </div>
         </div>
      </Modal>
   </div>
</template>

<style scoped>
   .card-box {
      border: 1px solid var(--main-color);
      border-radius: 0.5rem;
      padding: 1rem;
      margin-top: 1rem;
   }

   .mode {
      width: fit-content;
      margin-left: auto;
      display: flex;
   }

   .mode > button {
      font-size: 1.1rem;
   }

   .card-list {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      justify-content: center;
      gap: 0.5rem;
      margin-top: 0.5rem;
   }

   .actions {
      display: flex;
      justify-content: space-between;
      align-items: center;
   }
</style>
