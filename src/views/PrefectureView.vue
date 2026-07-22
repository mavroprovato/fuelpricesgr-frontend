<script setup lang="ts">
import DailyPrefectureChart from "@/components/DailyPrefectureChart.vue";

defineProps(['dateRange']);
</script>

<template>
  <div>
    <DailyPrefectureChart :dateRange="dateRange"/>
  </div>
</template>
