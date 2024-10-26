<script setup>
   import { useCityAutocomplete } from '@/composables/useCityAutocomplete';
   import Button from '@/components/Button.vue';
   import { computed, ref } from 'vue';

   const emit = defineEmits(['selected']);

   const { isLoading, suggestions, search } = useCityAutocomplete();

   const isOpen = ref(false);

   const isShowSuggestions = computed(
      () => search.value && search.value?.length >= 3,
   );

   const handleSelect = (id) => {
      emit('selected', id);
      isOpen.value = false;
      search.value = '';
   };
</script>

<template>
   <div class="autocomplete">
      <input
         type="text"
         v-model="search"
         @focus="isOpen = true"
         :placeholder="$t('Autocomplete.placeholder')"
      />

      <div v-if="isOpen && isShowSuggestions" class="autocomplete-details">
         <ul v-if="suggestions.length > 0" class="list">
            <li v-for="city in suggestions" :key="city.id">
               <Button @click="handleSelect(city.id)" class="list-btn"
                  >{{ city.sys.country }}, {{ city.name }} ({{
                     city.weather?.at(0)?.description
                  }})
               </Button>
            </li>
         </ul>
         <p v-else-if="!isLoading">{{ $t('noResults') }}</p>
         <div v-else>{{ $t('loading') }}</div>
      </div>
   </div>
</template>

<style scoped>
   .autocomplete {
      width: 100%;
      position: relative;
   }

   .autocomplete input {
      width: 100%;
      padding: 0.5rem;
      border-radius: 0.5rem;
      background: transparent;
      font-size: 1.2rem;
      background-color: var(--surface);
   }

   .autocomplete-details {
      position: absolute;
      padding: 0.5rem;
      top: calc(100% + 10px);
      left: 0;
      width: 100%;

      background-color: var(--surface);
      border: 1px solid var(--main-color);
      border-radius: 0.5rem;
      z-index: 1;
   }

   .list {
      margin: 0;
      padding: 0;
      list-style-type: none;
      max-height: 300px;
      text-align: left;
   }

   .list li {
      margin-bottom: 0.3rem;
   }

   .list li:last-child {
      margin-bottom: 0;
   }

   .list-btn {
      font-size: 1.1rem;
   }
</style>
