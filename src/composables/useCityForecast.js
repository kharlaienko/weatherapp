import { onMounted, ref } from "vue";
import weatherApi from "@/api/weatherApi";

export function useCityInfo({ isFiveDays = false, id }) {
   const data = ref(null);

   const isLoading = ref(false);

   const findCity = () => {
      isLoading.value = true;

      weatherApi.get(`/${isFiveDays ? 'forecast' : 'weather'}?id=${id}&units=metric`).then((res) => {
         data.value = res.data
      }).finally(() => isLoading.value = false)

   };

   onMounted(() => {
      findCity();
   })

   return {
      isLoading,
      data
   }
}