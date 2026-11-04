<script setup lang="ts">
import {computed, ref} from 'vue';
import {RouterView} from 'vue-router'
import DatePicker from '@/components/DatePicker.vue';

/** The date range type */
export type DateRange = [Date, Date] | [];

/** The selected dates from the date picker **/
const dateRange = ref<DateRange>([]);

/** The day clicked on the chart. Unset means the table shows the end of the range */
const selectedDate = ref<Date | undefined>();

/** The day shown in the table */
const tableDate = computed(() => selectedDate.value ?? dateRange.value[1]);

/**
 * Called when the date range selection has changed.
 *
 * @param selectedDateRange The selected date range.
 */
function dateRangeChanged(selectedDateRange: DateRange) {
  dateRange.value = selectedDateRange;
  selectedDate.value = undefined;
}

/**
 * Called when a day is clicked on the chart.
 *
 * @param date The clicked day.
 */
function dateSelected(date: Date) {
  selectedDate.value = date;
}
</script>

<template>
  <header>
    <router-link to="/" title="Αρχική σελίδα" class="site-brand">
      <img src="/android-chrome-192x192.png" alt="" width="36" height="36"/>
      <h1>Τιμές Καυσίμων</h1>
    </router-link>
    <date-picker @date-range-changed="dateRangeChanged"/>
  </header>
  <main>
    <router-view :dateRange="dateRange" :tableDate="tableDate" @dateSelected="dateSelected"/>
  </main>
  <footer>©Copyright 2021-2026 by <a href="https://www.mavroprovato.net">Kostas Kokkoros</a></footer>
</template>
