<script setup>
   import weatherApi from '@/api/weatherApi';
   import Button from '@/components/Button.vue';
   import CityAutocomplete from '@/components/CityAutocomplete.vue';
   import Modal from '@/components/Modal.vue';
   import WeatherList from '@/components/WeatherList.vue';
   import { getUserCity } from '@/plugins/defineUserCity';
   import { onMounted, ref } from 'vue';

   const citiesIds = ref([]);

   const selectedId = ref(null);

   const isMaxLimitOpen = ref(false);
   const isExistOpen = ref(false);

   const defineDefaultUsersCity = async () => {
      const userCity = await getUserCity();

      const res = await weatherApi.get(`find?q=${userCity}`);

      const defaultCityId = res.data.list.at(0)?.id;

      if (defaultCityId) {
         citiesIds.value.push(defaultCityId);
         selectedId.value = defaultCityId;
      }
   };

   const addCityId = (id) => {
      if (citiesIds.value.length - 1 >= 5) {
         isMaxLimitOpen.value = true;
         return;
      }

      if (citiesIds.value.includes(id)) {
         isExistOpen.value = true;
         return;
      }

      citiesIds.value.push(id);
   };

   const removeCityId = (id) => {
      const index = citiesIds.value.findIndex((el) => el === id);

      if (index !== -1) {
         citiesIds.value.splice(index, 1);
         return;
      }

      citiesIds.value.push(id);
   };

   onMounted(() => {
      defineDefaultUsersCity();
   });
</script>

<template>
   <div>
      <div class="city-search">
         <h1>
            {{ $t('Main.findCity') }}
         </h1>
         <CityAutocomplete @selected="addCityId" />
      </div>
      <WeatherList
         :items-ids="citiesIds"
         v-model:selectedId="selectedId"
         @delete="removeCityId"
      />
      <Modal v-model="isMaxLimitOpen">
         <div>
            <p>{{ $t('maxBlocks') }}</p>

            <div class="actions">
               <Button @click="isMaxLimitOpen = false">{{
                  $t('close')
               }}</Button>
            </div>
         </div>
      </Modal>

      <Modal v-model="isExistOpen">
         <div>
            <p>{{ $t('existMessage') }}</p>

            <div class="actions">
               <Button @click="isExistOpen = false">{{ $t('close') }}</Button>
            </div>
         </div>
      </Modal>
   </div>
</template>

<style scoped>
   .city-search {
      text-align: center;
      max-width: 600px;
      margin-inline: auto;
   }
</style>
