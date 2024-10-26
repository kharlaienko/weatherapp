import { ref, watch } from 'vue';

export function useDebouncedRef(initialValue, delay = 300) {
   const debouncedValue = ref(initialValue);
   const tempValue = ref(initialValue);
   let timeout;

   watch(tempValue, (newValue) => {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => { debouncedValue.value = newValue; }, delay);
   });

   return {
      value: tempValue,
      debouncedValue,
   };
}
