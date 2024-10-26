<script setup>
   import Spinner from '@/assets/icons/spinner.svg';
   import { Line } from 'vue-chartjs';
   import {
      Chart as ChartJS,
      Title,
      Tooltip,
      PointElement,
      LineElement,
      scales,
   } from 'chart.js';
   import { useCityInfo } from '@/composables/useCityInfo';
   import { computed, watch } from 'vue';

   ChartJS.register(Title, Tooltip, LineElement, scales, PointElement);

   const props = defineProps({
      cityId: { type: Number },
      isFiveDays: { type: Boolean, default: false },
   });

   const { forecast, isLoading, refetch } = useCityInfo({
      isFiveDays: props.isFiveDays,
      id: props.cityId,
   });

   const labels = computed(() => {
      if (!forecast.value) return [];

      return forecast.value.map((el) => el.dt_txt);
   });

   const data = computed(() => {
      if (!forecast.value) return [];

      return forecast.value.map((el) => el.main.temp);
   });

   watch([() => props.isFiveDays, () => props.cityId], () => {
      refetch({ isFiveDays: props.isFiveDays, id: props.cityId });
   });
</script>

<template>
   <div class="chart">
      <Line
         v-if="cityId && !isLoading"
         :data="{
            labels: labels,
            datasets: [{ data: data }],
         }"
         :options="{ responsive: true }"
      />
      <Spinner v-else width="100" />
   </div>
</template>

<style scoped>
   .chart {
      margin-top: 1rem;
      width: 100%;
      display: inline-flex;
      justify-content: center;
   }
</style>
