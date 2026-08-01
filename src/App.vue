<script setup lang="ts">
import {ref} from 'vue';
import {RouterView} from 'vue-router'
import DatePicker from '@/components/DatePicker.vue';

/** The date range type */
export type DateRange = [Date, Date] | [];

/** The selected dates from the date picker **/
const dateRange = ref<DateRange>([]);

/**
 * Called when the date range selection has changed.
 *
 * @param selectedDateRange The selected date range.
 */
function dateRangeChanged(selectedDateRange: DateRange) {
  dateRange.value = selectedDateRange;
}
</script>

<template>
  <nav>
    <h1>
      <RouterLink to="/">Τιμές Καυσίμων</RouterLink>
    </h1>
  </nav>
  <main>
    <DatePicker @date-range-changed="dateRangeChanged"/>
    <router-view :dateRange="dateRange"/>
  </main>
</template>

<style scoped>

</style>
