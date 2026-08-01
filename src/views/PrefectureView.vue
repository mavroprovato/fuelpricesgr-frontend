<script setup lang="ts">
import {computed} from 'vue';
import {useRoute} from 'vue-router';

import type {DateRange} from '@/App.vue';
import DailyChart from '@/components/DailyChart.vue';

const route = useRoute();
const prefecture = computed<string>(() => {
  return String(route.params.prefecture);
});

defineProps<{
  dateRange: DateRange | []
}>();

</script>

<template>
  <div>
    <DailyChart :dateRange="dateRange" :prefecture="prefecture" type="prefecture"/>
  </div>
</template>
