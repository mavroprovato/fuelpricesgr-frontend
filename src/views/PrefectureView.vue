<script setup lang="ts">

import type {DateRange} from '@/App.vue';
import DailyChart from '@/components/DailyChart.vue';

// The view properties
defineProps<{
  dateRange: DateRange | [],
  prefecture: string
}>();

</script>

<template>
  <div>
    <daily-chart :dateRange="dateRange" :prefecture="prefecture" type="prefecture"/>
  </div>
</template>
