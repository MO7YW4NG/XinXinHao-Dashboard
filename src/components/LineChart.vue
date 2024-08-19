<template>
  <div>
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import { Line } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  type ChartData,
  type ChartOptions
} from 'chart.js';

// 註冊必要的 Chart.js 組件
ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, LinearScale, CategoryScale);

export default defineComponent({
  name: 'LineChart',
  components: {
    Line
  },
  props: {
    chartData: {
      type: Object as PropType<ChartData<'line'>>,
      required: true
    },
    chartOptions: {
      type: Object as PropType<ChartOptions<'line'>>,
      default: () => ({
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            position: 'bottom',
            text: 'Bar Chart Example',
            font: {
              size: 18,
            },
          },
        }
      })
    }
  }
});
</script>