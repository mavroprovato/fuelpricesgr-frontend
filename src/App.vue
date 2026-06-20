<script setup lang="ts">
import '@vuepic/vue-datepicker/dist/main.css'

import { ref } from 'vue'
import { VueDatePicker } from '@vuepic/vue-datepicker';

import DailyCountryDataChart from "@/components/DailyCountryDataChart.vue";

const dates = ref();
</script>

<template>
  <h1>Fuel prices</h1>
  <div>
    <VueDatePicker v-model="dates" range multi-calendars :time-config="{ enableTimePicker: false }"></VueDatePicker>
  </div>
  <DailyCountryDataChart/>
</template>

<style scoped>

</style>
