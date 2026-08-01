<script setup lang="ts">

import DailyChart from '@/components/DailyChart.vue';
import PrefectureTable from '@/components/PrefectureTable.vue';
import type {DateRange} from "@/App.vue";

defineProps<{
  dateRange: DateRange
}>();

</script>

<template>
  <div>
    <daily-chart :dateRange="dateRange" type="country" />
  </div>
  <div>
    <prefecture-table :date="dateRange[1]" />
  </div>
</template>
