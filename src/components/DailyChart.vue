<script setup lang="ts">
import {computed, onMounted, onUnmounted, ref, watch} from 'vue'
import {Line} from 'vue-chartjs'
import {
  CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip, TimeScale, Colors
} from 'chart.js'
import 'chartjs-adapter-date-fns';
import {el} from 'date-fns/locale';

import type {DateRange} from '@/App.vue';
import {
  API, type CountryData, type DailyCountryData, type DailyPrefectureData, type PrefectureData
} from '@/services/api.ts';
import {Constants} from '@/services/constants.ts';
import {Formatter} from '@/services/formatter.ts';

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale, Colors);

const props = defineProps<{
  type: string
  dateRange: DateRange,
  prefecture?: string
}>();

/** Reads the chart colors from the --chart-* tokens defined in style.css */
function readChartColors() {
  const styles = getComputedStyle(document.documentElement);
  const color = (name: string) => styles.getPropertyValue(name).trim();
  return {
    text: color('--chart-text'),
    grid: color('--chart-grid'),
    tooltipBg: color('--chart-tooltip-bg'),
    tooltipText: color('--chart-tooltip-text'),
  };
}

/** Chart colors for the current color scheme */
const chartColors = ref(readChartColors());

const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
const onSchemeChange = () => {
  // Reading computed styles forces the browser to apply the new scheme first
  chartColors.value = readChartColors();
};

const chartOptions = computed<any>(() => {
const colors = chartColors.value;
return {
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    mode: 'index',
    intersect: false,
  },
  elements: {
    point: {
      radius: 0,
    },
    line: {
      tension: 0.35,
    },
  },
  scales: {
    x: {
      type: 'time',
      grid: {
        display: false
      },
      border: {
        color: colors.grid
      },
      ticks: {
        color: colors.text
      },
      time: {
        unit: 'day',
        displayFormats: {
          day: 'd MMMM'
        },
        tooltipFormat: 'do MMMM'
      },
      adapters: {
        date: {
          locale: el
        }
      }
    },
    y: {
      grid: {
        color: colors.grid
      },
      border: {
        color: colors.grid
      },
      ticks: {
        color: colors.text,
        callback: function (value: number) {
          return Formatter.currency(value);
        }
      }
    }
  },
  plugins: {
    legend: {
      position: 'top',
      labels: {
        color: colors.text
      }
    },
    tooltip: {
      backgroundColor: colors.tooltipBg,
      titleColor: colors.tooltipText,
      bodyColor: colors.tooltipText,
      borderColor: colors.grid,
      borderWidth: 1,
      callbacks: {
        label: function(data: any): string {
          return `${data.dataset.label}: ${Formatter.currency(data.raw)}`;
        }
      }
    }
  }
};
});

onMounted(() => {
  darkQuery.addEventListener('change', onSchemeChange);
});

onUnmounted(() => {
  darkQuery.removeEventListener('change', onSchemeChange);
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
    labels.unshift(new Date(dateData.date));
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
  <h2>Ημερήσια δεδομένα
    <span v-if="type=='prefecture'">για νομό {{ Constants.prefectureDescription(prefecture) }}</span>
  </h2>
  <div class="chart">
    <Line :data="chartData" :options="chartOptions"/>
  </div>
</template>

<style scoped>
.chart {
  height: 400px;
  width: 100%;
}

@media (max-width: 640px) {
  .chart {
    height: 280px;
  }
}
</style>