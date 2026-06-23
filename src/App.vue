<script setup lang="ts">
import {onMounted, ref} from 'vue'
import {VueDatePicker} from '@vuepic/vue-datepicker';
import {API} from './services/api.ts';
import type {DateRange} from './services/api.ts';
import DailyCountryData from './components/DailyCountryData.vue';

/** The date range for the date picker */
const dateRange = ref<DateRange>({
  startDate: null,
  endDate: null
});
/** The selected dates from the date picker **/
const selectedDates = ref<[Date, Date] | []>([]);

/** Called when the component is mounted. Gets the date range for the date picker and the default dates to display */
onMounted(() => {
  API.dateRange('daily_country').then(data => {
    // Set the date range for the date picker
    dateRange.value = { startDate: data.startDate, endDate: data.endDate }
    if (data.startDate && data.endDate) {
      let startDate = new Date(data.endDate);
      startDate.setMonth(startDate.getMonth() - 3);
      selectedDates.value = [startDate, data.endDate];
    }
  });
});
</script>

<template>
  <h1>Fuel prices</h1>
  <div>
    <VueDatePicker v-model="selectedDates" range multi-calendars :min-date="dateRange.startDate || ''"
                   :max-date="dateRange.endDate || ''" :time-config="{enableTimePicker: false}"
                   :formats="{ input: 'MMM dd yyyy' }"/>
  </div>
  <DailyCountryData :selectedDates="selectedDates"/>
</template>

<style scoped>

</style>
