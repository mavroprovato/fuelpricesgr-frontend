<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {el} from 'date-fns/locale'
import {VueDatePicker} from '@vuepic/vue-datepicker';

import type {DateRange} from '@/App.vue';
import {API} from '@/services/api.ts';

/** Declare the emitted events */
const emit = defineEmits<{
  (e: 'dateRangeChanged', dateRange: DateRange): void
}>();
/** The available dates */
const availableDates = ref<DateRange>([])
/** The selected dates from the date picker **/
let dateRange = ref<DateRange>([]);

/**
 * Called when the component is mounted. Gets the date range for the date picker and sets the default dates to display
 */
onMounted(() => {
  API.dateRange('daily_country').then(data => {
    // Set the date range for the date picker
    if (data.start_date && data.end_date) {
      availableDates.value = [new Date(data.start_date), new Date(data.end_date)];
      let startDate = new Date(data.end_date);
      startDate.setMonth(startDate.getMonth() - 3);
      let endDate = new Date(data.end_date);
      dateRange.value = [startDate, endDate];
      emit('dateRangeChanged', dateRange.value)
    }
  });
});
</script>

<template>
  <div>
    <vue-date-picker v-model="dateRange" @update:model-value="$emit('dateRangeChanged', dateRange)" range
                     multi-calendars :min-date="availableDates[0]" :max-date="availableDates[1]"
                     :time-config="{enableTimePicker: false}" :locale="el" :formats="{ input: 'dd MMMM yyyy' }"/>
  </div>
</template>

<style scoped>

</style>