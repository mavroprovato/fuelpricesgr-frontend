<script setup lang="ts">
import { ref } from 'vue'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Line } from 'vue-chartjs'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const data = ref({
  labels: ['One', 'Two', 'Three', 'Four'],
  datasets: [
    {
      label: 'Dataset 1',
      data: [1, 2, 3, 4],
    },
    {
      label: 'Dataset 2',
      data: [1.2, 2.2, 3.3, 4.4]
    }
  ]
});

const options = {
  responsive: true,
  maintainAspectRatio: false
};

const url = 'http://localhost:8000/api/data/daily/country';
fetch(url)
    .then(response => response.json())
    .then(responseData => {
      console.log(responseData);
    });
</script>

<template>
  <h1>Fuel prices</h1>
  <p><Line :data="data" :options="options" /></p>
</template>

<style scoped></style>
