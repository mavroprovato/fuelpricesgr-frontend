<script setup lang="ts">
import DailyCountryData from '../components/DailyCountryData.vue';
import DailyPrefectureData from '../components/DatePrefectureData.vue';

defineProps(['selectedDates']);

</script>

<template>
  <div>
    <DailyCountryData :selectedDates="selectedDates" />
  </div>
  <div>
    <DailyPrefectureData :date="selectedDates[1]" />
  </div>
</template>
