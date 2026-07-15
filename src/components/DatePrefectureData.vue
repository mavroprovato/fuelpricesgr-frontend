<script setup lang="ts">
import {watch} from "vue";
import {API} from "@/services/api.ts";

const props = defineProps(['date']);

watch(props, async () => {
  const [startDate, endDate] = [props.date, props.date];
  API.dailyPrefectureData(startDate, endDate).then(data => {
    // console.log(data);
  });
});
</script>

<template>
  <p>Date: {{ props.date }}</p>
</template>

<style scoped>

</style>