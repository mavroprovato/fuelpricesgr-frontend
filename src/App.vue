<script setup lang="ts">
import {onMounted, ref} from 'vue'
import {VueDatePicker} from '@vuepic/vue-datepicker';
import {API} from './services/api.ts';
import type {DateRange} from './services/api.ts';
import DailyCountryData from './components/DailyCountryData.vue';
import DailyPrefectureData from './components/DatePrefectureData.vue';
import { el } from "date-fns/locale"

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
  <h1>Τιμές Καυσίμων</h1>
  <div>
    <VueDatePicker v-model="selectedDates" range multi-calendars :min-date="dateRange.startDate || ''"
                   :max-date="dateRange.endDate || ''" :time-config="{enableTimePicker: false}"
                   :locale="el" :formats="{ input: 'dd MMM yyyy' }"/>
  </div>
  <div>
    <DailyCountryData :selectedDates="selectedDates" />
  </div>
  <div>
    <DailyPrefectureData :date="selectedDates[1]" />
  </div>
</template>

<style scoped>

</style>
