<script setup lang="ts">
import {ref} from "vue";
import {useRoute} from "vue-router";

import DailyChart from "@/components/DailyChart.vue";

const route = useRoute();
const prefecture = ref(route.params.prefecture)

defineProps(['dateRange']);

</script>

<template>
  <div>
    <DailyChart :dateRange="dateRange" :prefecture="prefecture" type="prefecture"/>
  </div>
</template>
