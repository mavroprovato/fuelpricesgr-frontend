<script setup lang="ts">
import {ref, watch} from 'vue'
import {Line} from 'vue-chartjs'
import {
  CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip, TimeScale
} from 'chart.js'

import {API} from "@/services/api.ts";

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale);

const props = defineProps(['selectedDates'])

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

const chartData = ref({
  labels: [],
  datasets: []
});

watch(props, async () => {
  const [startDate, endDate] = props.selectedDates;
  API.dailyCountryData(startDate, endDate).then(data => {
    const labels: string[] = [];
    const fuelTypePrices: Map<string, (string | undefined)[]> = new Map();
    for (const fuelData of data) {
      labels.unshift(fuelData.date);
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

    chartData.value = {labels: labels, datasets: datasets}
  });
});
</script>

<template>
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