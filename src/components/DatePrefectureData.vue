<script setup lang="ts">
import {ref, watch} from "vue";
import moment from 'moment';
import {API} from "@/services/api.ts";
import {Constants} from "@/services/constants.ts";
import {Formatter} from "@/services/formatter.ts";

const props = defineProps(['date']);

const fuelTypes = ref();
const prefectureData = ref();

watch(props, async () => {
  const [startDate, endDate] = [props.date, props.date];
  API.dailyPrefectureData(startDate, endDate).then(data => {
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
});
</script>

<template>
  <h2>Δεδομένα ανά νομό</h2>
  <h3>Δεδομένα για {{ moment(date).format('D MMM YYYY') }}</h3>
  <table>
    <thead>
    <tr>
      <th scope="col">Νομός</th>
      <th v-for="fuelType in fuelTypes">{{ Constants.fuelTypeDescription(fuelType) }}</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="data in prefectureData">
      <td>{{ Constants.prefectureDescription(data.name) }}</td>
      <td v-for="fuelType in fuelTypes">
        {{ Formatter.currency(data[fuelType]) }}
      </td>
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