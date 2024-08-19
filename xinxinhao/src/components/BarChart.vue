<template>
  <div>
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import { Bar } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  type ChartData,
  type ChartOptions,
} from 'chart.js';

// 註冊必要的 Chart.js 組件
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default defineComponent({
  name: 'BarChart',
  components: {
    Bar
  },
  props: {
    chartData: {
      type: Object as PropType<ChartData<'bar'>>,
      required: true
    },
    chartOptions: {
      type: Object as PropType<ChartOptions<'bar'>>,
      default: () => ({
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
            labels: {
              font: {
                size: 14,
              },
            },
          },
          title: {
            display: true,
            position: 'bottom',
            text: 'Bar Chart Example',
            font: {
              size: 18,
            },
          },
        },
        // scales: {
        //   x: {
        //     title: {
        //       display: true,
        //       text: 'Categories',
        //       font: {
        //         size: 16,
        //       },
        //     },
        //   },
        //   y: {
        //     beginAtZero: true,
        //     title: {
        //       display: true,
        //       text: 'Values',
        //       font: {
        //         size: 16,
        //       },
        //     },
        //   },
        // },
      }),
    }
  }
});
</script>