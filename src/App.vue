<script setup lang="ts">
import {onMounted, ref} from 'vue'
import {VueDatePicker} from '@vuepic/vue-datepicker';
import {API} from './services/api.ts';
import DailyCountryData from './components/DailyCountryData.vue';

const dateRange = ref({
  minDate: null,
  maxDate: null,
});
const dates = ref([]);

// Get the available date range when the component is mounted
onMounted(() => {
  API.dateRange('daily_country').then(data => {
    // Set the date range for the date picker
    dateRange.value = { minDate: data.startDate, maxDate: data.endDate }
    let startDate = new Date(data.endDate);
    startDate.setMonth(startDate.getMonth() - 3);
    dates.value = [startDate, data.endDate];
  });
});
</script>

<template>
  <h1>Fuel prices</h1>
  <div>
    <VueDatePicker v-model="dates" range multi-calendars :min-date="dateRange.minDate" :max-date="dateRange.maxDate"
                   :time-config="{enableTimePicker: false}" :formats="{ input: 'MMM dd yyyy' }"/>
  </div>
  <DailyCountryData :dates="dates"/>
</template>

<style scoped>

</style>
