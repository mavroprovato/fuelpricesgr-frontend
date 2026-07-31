<script setup lang="ts">
import {ref} from 'vue';
import {RouterView} from 'vue-router'
import DateRange from '@/components/DateRange.vue';

/** The selected dates from the date picker **/
const dateRange = ref<[Date, Date] | []>([]);

/**
 * Called when the date range selection has changed.
 *
 * @param selectedDateRange The selected date range.
 */
function dateRangeChanged(selectedDateRange: [Date, Date] | []) {
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
    <DateRange @date-range-changed="dateRangeChanged"/>
    <RouterView :dateRange="dateRange"/>
  </main>
</template>

<style scoped>

</style>
