import { onMounted, ref, toValue, watch, watchEffect } from "vue";
import weatherApi from "@/api/weatherApi";

export function useCityInfo(args) {

   const city = ref(null);
   const forecast = ref(null);
   const temp = ref('')
   const isLoading = ref(false);

   const getByFiveDays = (id) => {
      isLoading.value = true;

      weatherApi.get(`/forecast/?id=${id}&units=metric`).then((res) => {
         city.value = res.data.city
         const avg = (res.data.list.reduce((sum, el) => {
            return sum + el.main.temp
         }, 0) / res.data.list.length).toFixed(0)

         const avg_max = (res.data.list.reduce((sum, el) => {
            return sum + el.main.temp_max
         }, 0) / res.data.list.length).toFixed(0)

         const avg_min = (res.data.list.reduce((sum, el) => {
            return sum + el.main.temp_min
         }, 0) / res.data.list.length).toFixed(0)

         forecast.value = res.data.list

         temp.value = { temp: avg, temp_min: avg_min, temp_max: avg_max }
      }).finally(() => isLoading.value = false)
   };

   const getByDay = (id) => {
      isLoading.value = true;

      Promise.all([weatherApi.get(`/weather/?id=${id}&units=metric`), weatherApi.get(`/forecast/?id=${id}&units=metric&cnt=8`)]).then(([resWeather, resForecast]) => {
         temp.value = { temp: Math.round(resWeather.data.main.temp), temp_min: Math.round(resWeather.data.main.temp_min), temp_max: Math.round(resWeather.data.main.temp_max) }
         city.value = resForecast.data.city
         forecast.value = resForecast.data.list
      }).finally(() => isLoading.value = false)


   };


   const fetch = ({ isFiveDays, id }) => {
      if (isFiveDays) {
         getByFiveDays(id);
      } else {
         getByDay(id);
      }
   }

   onMounted(() => {
      fetch(args);
   })

   return {
      isLoading,
      city,
      forecast,
      temp,
      refetch: fetch
   }
}