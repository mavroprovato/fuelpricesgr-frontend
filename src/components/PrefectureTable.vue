<script setup lang="ts">
import {onMounted, ref, watch} from 'vue';

import {API} from '@/services/api.ts';
import {Constants} from '@/services/constants.ts';
import {Formatter} from '@/services/formatter.ts';

const props = defineProps<{
  date?: Date
}>();

const fuelTypes = ref();
const prefectureData = ref();

function loadData() {
  if (!props.date) {
    return;
  }

  API.dailyPrefectureData(undefined, props.date, props.date).then(data => {
    const dataPerPrefecture = new Map();
    const availableFuelTypes = new Set<string>();
    for (const row of data[0]?.data || []) {
      availableFuelTypes.add(row.fuel_type);
      const perPrefectureData = dataPerPrefecture.get(row.prefecture) || [];
      perPrefectureData.unshift({
        fuelType: row.fuel_type, price: row.price
      });
      dataPerPrefecture.set(row.prefecture, perPrefectureData);
    }
    fuelTypes.value = availableFuelTypes;

    const tableData = [];
    for (const prefecture of Constants.prefectures()) {
      const rowData: any = {name: prefecture};
      for (const fuelType of availableFuelTypes) {
        rowData[fuelType] = dataPerPrefecture.get(prefecture).find((e: any) => e.fuelType === fuelType)?.price
      }
      tableData.push(rowData)
    }
    prefectureData.value = tableData;
  });
}

onMounted(() => {
  loadData();
});

watch(props, async () => {
  loadData();
});
</script>

<template>
  <h2>Δεδομένα ανά νομό</h2>
  <h3>Δεδομένα για <time :datetime="Formatter.isoDate(date)">{{ Formatter.date(date) }}</time></h3>
  <table>
    <thead>
    <tr>
      <th scope="col">Νομός</th>
      <th v-for="fuelType in fuelTypes">{{ Constants.fuelTypeDescription(fuelType) }}</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="data in prefectureData">
      <td>
        <router-link :to="{ name: 'prefecture', params: { prefecture: data.name } }">
          {{ Constants.prefectureDescription(data.name) }}
        </router-link>
      </td>
      <td v-for="fuelType in fuelTypes">{{ Formatter.currency(data[fuelType]) }}</td>
    </tr>
    </tbody>
  </table>
</template>

<style scoped>
table {
  width: 100%;
}

th {
  text-align: left;
}
</style>