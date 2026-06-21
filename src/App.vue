<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { VueDatePicker } from '@vuepic/vue-datepicker';
import { API } from "@/services/api.ts";
import DailyCountryDataChart from "@/components/DailyCountryDataChart.vue";

import '@vuepic/vue-datepicker/dist/main.css'

const dates = ref();
const minDate = ref();
const maxDate = ref();

onMounted(() => {
  API.dateRange('daily_country').then(data => {
    const startDate = new Date(Date.parse(data.end_date));
    startDate.setMonth(startDate.getMonth() - 3);
    dates.value = [startDate.toISOString(), data.end_date]
    minDate.value = data.start_date;
    maxDate.value = data.end_date;
  });
});

const timeConfig = {
  enableTimePicker: false
}
</script>

<template>
  <h1>Fuel prices</h1>
  <div>
    <VueDatePicker v-model="dates" range multi-calendars :min-date="minDate" :max-date="maxDate"
                   :time-config="timeConfig" :formats="{ input: 'MMM dd yyyy' }"/>
  </div>
  <DailyCountryDataChart v-model="dates" />
</template>

<style scoped>

</style>
