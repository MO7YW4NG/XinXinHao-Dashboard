<template>
  <div class="dashboard">
    <h1>Game Stats Dashboard</h1>
    <div class="stats-cards">
      <div class="card" v-for="(stat, index) in stats" :key="index">
        <h3>{{ stat.title }}</h3>
        <p>{{ stat.value }}</p>
      </div>
    </div>
    <div class="chart-container">
      <LineChart class="chart" :chartData="lineChartData" />
      <BarChart class="chart" :chartData="barChartData" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import LineChart from './LineChart.vue'
import BarChart from './BarChart.vue'
import type { ChartData } from 'chart.js'

interface Stat {
  title: string
  value: number
}

export default defineComponent({
  name: 'Dashboard',
  components: {
    LineChart,
    BarChart
  },
  data() {
    return {
      stats: [
        { title: 'Total Players', value: 1024 },
        { title: 'Games Played', value: 5678 },
        { title: 'Active Players', value: 321 }
      ] as Stat[],
      lineChartData: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: 'Games Played',
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5',
            data: [40, 39, 10, 40, 39, 80, 40],
            fill: false
          }
        ]
      } as ChartData<'line'>,
      barChartData: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: 'Type Played',
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5',
            data: [40, 39, 10, 40, 39, 80, 40]
          }
        ]
      } as ChartData<'bar'>
    }
  }
})
</script>

<style scoped>
.dashboard {
  margin: 0 auto;
  width: 50%;
  padding: 20px;
}

.stats-cards {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
}

.card {
  color: black;
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  width: 30%;
}

.chart-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: fit-content;
}

.chart {
  height: 16rem;
}
</style>
