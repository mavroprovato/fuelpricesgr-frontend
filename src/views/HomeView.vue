<script setup lang="ts">
import DailyCountryChart from '@/components/DailyCountryChart.vue';
import PrefectureTable from '@/components/PrefectureTable.vue';

defineProps(['dateRange']);

</script>

<template>
  <div>
    <DailyCountryChart :dateRange="dateRange" />
  </div>
  <div>
    <PrefectureTable :date="dateRange[1]" />
  </div>
</template>
