import { ref, watch } from "vue";
import { useDebouncedRef } from "./useDebounceRef";
import weatherApi from "@/api/weatherApi";

export function useCityAutocomplete() {
   const { value, debouncedValue } = useDebouncedRef('');

   const suggestions = ref([]);

   const isLoading = ref(false);

   const findCity = () => {
      isLoading.value = true;

      weatherApi.get(`/find?q=${debouncedValue.value}`).then((res) => {
         suggestions.value = res.data.list
      }).finally(() => isLoading.value = false)

   };

   watch(debouncedValue, (newVal, oldVal) => {
      if (newVal && newVal.length > 2 && newVal !== oldVal) {
         findCity();
      }
   });

   return {
      isLoading,
      search: value,
      suggestions
   }
}