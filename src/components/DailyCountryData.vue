<script setup lang="ts">
import {ref, watch} from 'vue'
import {Line} from 'vue-chartjs'
import moment from 'moment';
import {
  CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip, TimeScale, Colors
} from 'chart.js'
import 'chartjs-adapter-moment';

import {API, type CountryData, type DailyCountryData} from "@/services/api.ts";
import {Constants} from "@/services/constants.ts";
import {Formatter} from "@/services/formatter.ts";

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale, Colors);

const props = defineProps(['selectedDates']);

function tooltip_title(data: any): string {
  return moment(data[0].label).format('D MMM YYYY');
}

const chartOptions: any = ref({
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    mode: 'index',
    intersect: false,
  },
  locale: 'el-GR',
  scales: {
    x: {
      type: 'time',
      grid: {
        display: false
      },
      time: {
        unit: 'day',
        displayFormats: {
          day: 'D MMM YYYY'
        }
      }
    },
    y: {
      ticks: {
        callback: function(value: number) {
          return Formatter.currency(value);
        }
      }
    }
  },
  plugins: {
    legend: {
      position: 'top'
    },
    tooltip: {
      callbacks: {
        title: tooltip_title
      }
    }
  }
});

interface ChartData {
  labels: Date[];
  datasets: any[];
}

const chartData = ref<ChartData>({
  labels: [],
  datasets: []
});

function getChartData(data: Array<DailyCountryData>): ChartData {
  // Get the data per fuel type
  const labels: Date[] = [];
  const dataPerFuelType: Map<string, (any | null)[]> = new Map();
  for (const dateData of data) {
    labels.unshift(dateData.date);
    for (const fuelType of Constants.fuelTypes()) {
      const fuelTypeData = dateData.data.find((e: CountryData) => e.fuel_type === fuelType);
      const perFuelTypeData = dataPerFuelType.get(fuelType) || [];
      if (fuelTypeData) {
        perFuelTypeData.unshift({
          dataFile: dateData.data_file, price: fuelTypeData.price, numberOfStations: fuelTypeData.number_of_stations
        });
      } else {
        perFuelTypeData.unshift(null);
      }
      dataPerFuelType.set(fuelType, perFuelTypeData);
    }
  }

  // Remove fuel type data if they are empty
  dataPerFuelType.forEach((value, key) => {
    if (value.filter(function (el) { return el;}).length == 0) {
      dataPerFuelType.delete(key);
    }
  });

  return {
    labels: labels,
    datasets: Array.from(dataPerFuelType, function ([fuelType, data]) {
      return {
        label: Constants.fuelTypeDescription(fuelType),
        data: data.map(e => { return e?.price })
      };
    })
  };
}

watch(props, async () => {
  const [startDate, endDate] = props.selectedDates;
  if (!startDate || !endDate) {
    return;
  }
  API.dailyCountryData(startDate, endDate).then(data => {
    chartData.value = getChartData(data);
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
  height: 400px;
  width: 100%;
}
</style>