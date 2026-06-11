<script setup lang="ts">
import {ref} from 'vue'
import {CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip} from 'chart.js'
import {Line} from 'vue-chartjs'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

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
  },
  plugins: {
    legend: {
      position: 'right'
    }
  }
};

const dailyCountryUrl = `${import.meta.env.VITE_API_BASE}data/daily/country`;
fetch(dailyCountryUrl)
    .then(response => response.json())
    .then(responseData => {
      const result: any = {};
      for (const fuelType of Object.keys(fuelTypes)) {
        result[fuelType] = [];
      }
      for (const fuelData of responseData) {
        for (const [fuelType, fuelTypeValue] of Object.entries(result)) {
          fuelTypeValue.unshift(fuelData.data.find((e) => e['fuel_type'] === fuelType)?.price);
        }
      }
      const labels = responseData.map(item => item.date).reverse();
      const datasets = Object.entries(result).map(function ([fuelType, data]) {
        return {
          label: fuelTypes[fuelType].description,
          data: data,
          backgroundColor: fuelTypes[fuelType].color,
          borderColor: fuelTypes[fuelType].color
        };
      })
      chartData.value = {labels: labels, datasets: datasets}
    });

</script>

<template>
  <h1>Fuel prices</h1>
  <div style="height:600px;">
    <Line :data="chartData" :options="chartOptions"/>
  </div>
</template>

<style scoped></style>
