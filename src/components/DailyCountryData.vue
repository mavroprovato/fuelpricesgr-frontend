<script setup lang="ts">
import {ref, watch} from 'vue'
import {Line} from 'vue-chartjs'
import {
  CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip, TimeScale, Colors
} from 'chart.js'

import {API} from "@/services/api.ts";

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale, Colors);

const props = defineProps(['selectedDates'])

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

interface CartData {
  labels: Date[];
  datasets: any[];
}

const chartData = ref<CartData>({
  labels: [],
  datasets: []
});

watch(props, async () => {
  const [startDate, endDate] = props.selectedDates;
  API.dailyCountryData(startDate, endDate).then(data => {
    const datasets: any = Array.from(data.data, function ([fuelType, data]) {
      return {
        label: fuelType, data: data.map(e => { return e?.price })
      };
    });

    chartData.value = {labels: data.dates, datasets: datasets}
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