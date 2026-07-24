<script setup lang="ts">
import {onMounted, ref} from 'vue'
import {RouterView} from 'vue-router'

import {el} from 'date-fns/locale'
import {VueDatePicker} from '@vuepic/vue-datepicker';

import {API} from '@/services/api.ts';

/** The available dates */
const availableDates = ref<[Date, Date] | []>([])

/** The selected dates from the date picker **/
const dateRange = ref<[Date, Date] | []>([]);

/**
 * Called when the component is mounted. Gets the date range for the date picker and sets the default dates to display
 */
onMounted(() => {
  API.dateRange('daily_country').then(data => {
    // Set the date range for the date picker
    if (data.startDate && data.endDate) {
      availableDates.value = [data.startDate, data.endDate];
      let startDate = new Date(data.endDate);
      startDate.setMonth(startDate.getMonth() - 3);
      dateRange.value = [startDate, data.endDate];
    }
  });
});
</script>

<template>
  <main>
    <h1><RouterLink to="/">Τιμές Καυσίμων</RouterLink></h1>
    <div>
      <VueDatePicker v-model="dateRange" range multi-calendars :min-date="availableDates[0]"
                     :max-date="availableDates[1]" :time-config="{enableTimePicker: false}"
                     :locale="el" :formats="{ input: 'dd MMMM yyyy' }"/>
    </div>
    <RouterView :dateRange="dateRange" />
  </main>
</template>

<style scoped>

</style>
