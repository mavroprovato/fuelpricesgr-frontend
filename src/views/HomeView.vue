<script setup lang="ts">

import DailyChart from '@/components/DailyChart.vue';
import PrefectureTable from '@/components/PrefectureTable.vue';
import type {DateRange} from "@/App.vue";

defineProps<{
  dateRange: DateRange,
  tableDate?: Date
}>();

defineEmits<{
  dateSelected: [date: Date]
}>();

</script>

<template>
  <div>
    <daily-chart :dateRange="dateRange" type="country" @date-selected="$emit('dateSelected', $event)" />
  </div>
  <div>
    <prefecture-table :date="tableDate" />
  </div>
</template>
