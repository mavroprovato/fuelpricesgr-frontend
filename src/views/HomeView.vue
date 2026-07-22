<script setup lang="ts">
import DailyCountryData from '@/components/DailyCountryData.vue';
import DailyPrefectureData from '@/components/DatePrefectureData.vue';

defineProps(['dateRange']);

</script>

<template>
  <div>
    <DailyCountryData :dateRange="dateRange" />
  </div>
  <div>
    <DailyPrefectureData :date="dateRange[1]" />
  </div>
</template>
