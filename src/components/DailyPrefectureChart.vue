<script setup lang="ts">

import {ref, watch} from 'vue'
import {useRoute} from "vue-router";
import {Line} from 'vue-chartjs'
import moment from 'moment';
import {
  CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip, TimeScale, Colors
} from 'chart.js'

import 'chartjs-adapter-moment';
import {
  API,
  type CountryData,
  type DailyCountryData,
  type DailyPrefectureData,
  type PrefectureData
} from "@/services/api.ts";
import {Constants} from "@/services/constants.ts";
import {Formatter} from "@/services/formatter.ts";

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale, Colors);
const route = useRoute();

const props = defineProps(['dateRange']);

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
        callback: function (value: number) {
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
        title: function (data: any): string {
          return moment(new Date(data[0].label)).format('D MMM YYYY');
        },
        label: function(data: any): string {
          return `${data.dataset.label}: ${Formatter.currency(data.raw)}`;
        }
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

function getChartData (data: Array<DailyPrefectureData>): ChartData {
  // Get the data per fuel type
  const labels: Date[] = [];
  const dataPerFuelType: Map<string, (any | null)[]> = new Map();
  for (const dateData of data) {
    labels.unshift(dateData.date);
    for (const fuelType of Constants.fuelTypes()) {
      const fuelTypeData = dateData.data.find((e: PrefectureData) => e.fuel_type === fuelType);
      const perFuelTypeData = dataPerFuelType.get(fuelType) || [];
      if (fuelTypeData) {
        perFuelTypeData.unshift({
          dataFile: dateData.data_file, price: fuelTypeData.price
        });
      } else {
        perFuelTypeData.unshift(null);
      }
      dataPerFuelType.set(fuelType, perFuelTypeData);
    }
  }
  // Remove fuel type data if they are empty
  dataPerFuelType.forEach((value, key) => {
    if (value.filter(function (el) {
      return el;
    }).length == 0) {
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

watch([props, route], async () => {
  const [startDate, endDate] = props.dateRange;
  const prefecture = route.params.prefecture;
  if (!startDate || !endDate || !prefecture || Array.isArray(prefecture)) {
    return;
  }
  API.dailyPrefectureData(prefecture, startDate, endDate).then(data => {
    chartData.value = getChartData(data);
  });
});
</script>

<template>
  <h2>Ημερήσια δεδομένα για {{ Constants.prefectureDescription($route.params.prefecture) }}</h2>
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