<script setup lang="ts">

import DailyChart from '@/components/DailyChart.vue';
import PrefectureTable from '@/components/PrefectureTable.vue';

defineProps<{
  dateRange: [Date, Date] | []
}>();

</script>

<template>
  <div>
    <DailyChart :dateRange="dateRange" type="country" />
  </div>
  <div>
    <PrefectureTable :date="dateRange[1]" />
  </div>
</template>
