<script setup lang="ts">
import { ref } from 'vue'
import {
  CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip, TimeScale
} from 'chart.js'
import { Line } from 'vue-chartjs'
import 'chartjs-adapter-moment';

import { API } from './api.ts'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale);

const fuelTypes: any = {
  'UNLEADED_95': {
    description: 'Αμόλυβδη 95',
    color: '#003d5c'
  },
  'UNLEADED_100': {
    description: 'Αμόλυβδη 100',
    color: '#464c89'
  },
  'SUPER': {
    description: 'Super',
    color: '#954e9b'
  },
  'DIESEL': {
    description: 'Diesel',
    color: '#dd4d88'
  },
  'DIESEL_HEATING': {
    description: 'Diesel Θέρμανσης',
    color: '#ff6b59'
  },
  'GAS': {
    description: 'Υγραέριο',
    color: '#ffa600'
  }
};

const chartData = ref({
  labels: [],
  datasets: []
});

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  pointStyle: false,
  spanGaps: true,
  scales: {
    x: {
      type: 'time',
      grid: {
        display: false
      }
    },
  },
  plugins: {
    title: {
      text: 'Daily Country Data',
      display: true
    },
    legend: {
      position: 'right'
    }
  }
});

API.dailyCountryData().then(data => {
  const dates: Date[] = [];
  const fuelTypePrices: Map<string, (string | undefined)[]> = new Map();
  for (const fuelData of data) {
    dates.unshift(fuelData.date);
    for (const fuelType of Object.keys(fuelTypes)) {
      const price = fuelData.data.find((e) => e.fuel_type === fuelType)?.price;
      const data = fuelTypePrices.get(fuelType) || [];
      data.unshift(price)
      fuelTypePrices.set(fuelType, data);
    }
  }
  const datasets = Object.keys(fuelTypes).map(function (fuelType: string) {
    return {
      label: fuelTypes[fuelType].description,
      data: fuelTypePrices.get(fuelType),
      backgroundColor: fuelTypes[fuelType].color,
      borderColor: fuelTypes[fuelType].color
    };
  });
  chartData.value = {labels: dates, datasets: datasets}
});

</script>

<template>
  <h1>Fuel prices</h1>
  <div class="chart">
    <Line :data="chartData" :options="chartOptions"/>
  </div>
</template>

<style scoped>
  .chart {
    height: 600px;
    width: 80%;
  }
</style>
