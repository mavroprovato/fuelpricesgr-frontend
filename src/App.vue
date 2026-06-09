<script setup lang="ts">
import {ref} from 'vue'
import {CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip} from 'chart.js'
import {Line} from 'vue-chartjs'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

let fuelTypes = ref([]);

const chartData = ref({
  labels: [],
  datasets: []
});

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  pointStyle: false,
  spanGaps: true,
  scales: {
    x: {
      grid: {
        display: false
      }
    },
  }
};

const fuelTypesUrl = 'http://localhost:8000/api/fuelTypes';
fetch(fuelTypesUrl)
    .then(response => response.json())
    .then(responseData => {
      fuelTypes.value = responseData
    })
    .then(function () {
      const dailyCountryUrl = 'http://localhost:8000/api/data/daily/country';
      fetch(dailyCountryUrl)
          .then(response => response.json())
          .then(responseData => {
            const result = {};
            for (const fuelType of fuelTypes.value) {
              result[fuelType.name] = [];
            }
            for (const fuelData of responseData) {
              for (const [fuelType, fuelTypeValue] of Object.entries(result)) {
                fuelTypeValue.unshift(fuelData.data.find((e) => e['fuel_type'] === fuelType)?.price);
              }
            }
            const labels = responseData.map(item => item.date).reverse();
            const datasets = Object.entries(result).map(([fuelType, data]) => ({label: fuelType, data: data}))
            chartData.value = {labels: labels, datasets: datasets}
          });
    });
</script>

<template>
  <h1>Fuel prices</h1>
  <div style="height:600px;">
    <Line :data="chartData" :options="chartOptions"/>
  </div>
</template>

<style scoped></style>
