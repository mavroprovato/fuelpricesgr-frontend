<script setup lang="ts">
import {onMounted, ref, watch} from 'vue'
import {Line} from 'vue-chartjs'
import {
  CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip, TimeScale, Colors
} from 'chart.js'
import 'chartjs-adapter-date-fns';

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

const props = defineProps(['type', 'dateRange', 'prefecture']);

const chartOptions: any = ref({
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    mode: 'index',
    intersect: false,
  },
  scales: {
    x: {
      type: 'time',
      grid: {
        display: false
      },
      time: {
        unit: 'day'
      },
      ticks: {
        callback: function(value: Date) {
          return Formatter.date(value, false);
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

function getChartData(data: Array<DailyCountryData | DailyPrefectureData>): ChartData {
  // Get the data per fuel type
  const labels: Date[] = [];
  const dataPerFuelType: Map<string, any[]> = new Map();
  for (const dateData of data) {
    labels.unshift(dateData.date);
    for (const fuelType of Constants.fuelTypes()) {
      const fuelTypeData = dateData.data.find((e: CountryData | PrefectureData) => e.fuel_type === fuelType);
      const perFuelTypeData = dataPerFuelType.get(fuelType) || [];
      let rowData = null;
      if (fuelTypeData) {
        rowData = { data_file: dateData.data_file, price: fuelTypeData.price };
      }
      perFuelTypeData.unshift(rowData);
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

function loadData() {
  const [startDate, endDate] = props.dateRange;
  if (!startDate || !endDate) {
    return;
  }
  if (props.type == 'country') {
    API.dailyCountryData(startDate, endDate).then(data => {
      chartData.value = getChartData(data);
    });
  } else if (props.type == 'prefecture') {
    API.dailyPrefectureData(props.prefecture, startDate, endDate).then(data => {
      chartData.value = getChartData(data);
    });
  }
}

onMounted(() => {
  loadData();
});

watch(props, async () => {
  loadData();
});
</script>

<template>
  <h2>Ημερήσια δεδομένα <span v-if="type=='prefecture'">για νομό {{ Constants.prefectureDescription(prefecture) }}</span></h2>
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