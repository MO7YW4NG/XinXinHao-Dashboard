<template>
  <div class="dashboard">
    <h1>行行好-後台數據儀表板</h1>
    <div class="charts">
      <div class="chart">
        <h2>玩家答題表現 (依主題)</h2>
        <canvas ref="topicPerformanceChart"></canvas>
      </div>
      <div class="chart">
        <h2>玩家年齡分布</h2>
        <canvas ref="demographicChart"></canvas>
      </div>
      <div class="chart">
        <h2>常見錯誤 (依類別)</h2>
        <canvas ref="commonMistakesChart"></canvas>
      </div>
      <div class="chart">
        <h2>平均答題速度</h2>
        <canvas ref="timePerQuestionChart"></canvas>
      </div>
      <div class="chart">
        <h2>題目完成率 (依主題)</h2>
        <canvas ref="completionRateChart"></canvas>
      </div>
      <div class="chart">
        <h2>具挑戰性之主題</h2>
        <canvas ref="challengingTopicsChart"></canvas>
      </div>
      <div class="chart">
        <h2>各遊戲模式總遊玩次數</h2>
        <canvas ref="modeFreqChart"></canvas>
      </div>
      <div class="chart">
        <h2>學習時長對及格率之影響</h2>
        <canvas ref="hoursPassCorrelationChart"></canvas>
      </div>
      <div class="chart">
        <h2>玩家答題表現 (依區域)</h2>
        <canvas ref="regionalComparisonChart"></canvas>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import Chart from 'chart.js/auto';

interface GameData {
  topicPerformance: { [key: string]: number };
  ageDistribution: { [key: string]: number };
  timePerQuestion: { [key: string]: number };
  completionRates: { [key: string]: number };
  challengingTopics: { [key: string]: number };
  modeFreq: { [key: string]: number };
}
interface PolicyData {
  passRates: { [key: string]: number };
  learningDuration: { [key: string]: number };
  commonMistakes: { [key: string]: number };
  theoryPerformance: { [key: string]: number };
  demographics: { [key: string]: number };
  hoursPassCorrelation: { hours: number[]; passRate: number[] };
  regionalComparison: { [key: string]: number };
}

export default defineComponent({
  name: 'CarLearnerQuizDashboard',
  setup() {
    const topicPerformanceChart = ref<HTMLCanvasElement | null>(null);
    const timePerQuestionChart = ref<HTMLCanvasElement | null>(null);
    const completionRateChart = ref<HTMLCanvasElement | null>(null);
    const challengingTopicsChart = ref<HTMLCanvasElement | null>(null);
    const modeFreqChart = ref<HTMLCanvasElement | null>(null);

    const commonMistakesChart = ref<HTMLCanvasElement | null>(null);
    const demographicChart = ref<HTMLCanvasElement | null>(null);
    const hoursPassCorrelationChart = ref<HTMLCanvasElement | null>(null);
    const regionalComparisonChart = ref<HTMLCanvasElement | null>(null);

    const fetchGameData = (): GameData => {
      // Simulated data fetch
      return {
        topicPerformance: {
          '道路標誌': 85,
          '交通規則': 78,
          '車輛操作': 92,
          '安全流程': 88,
          '停車操作': 75
        },
        timePerQuestion: { '道路標誌':20, '交通規則': 25,'車輛操作': 18, '安全流程': 30, '停車操作':22},
        completionRates: {
          '道路標誌': 98,
          '交通規則': 70,
          '車輛操作': 72,
          '安全流程': 89,
          '停車操作': 80
        },
        challengingTopics: {
          '道路標誌': 15,
          '交通規則': 25,
          '車輛操作': 10,
          '安全流程': 20,
          '停車操作': 30
        },
        modeFreq: {
          '隨機對戰': 231,
          '情景模式': 150,
          '考試模式': 207,
        },
      };
    };
    const fetchPolicyData = (): PolicyData => {
      // Simulated data fetch
      return {
        commonMistakes: {
          '路邊停車': 25,
          '變換車道': 30,
          '車速掌握': 20,
          '交通燈號': 15,
          '道路觀察': 10
        },
        theoryPerformance: {
          'Road Signs': 85,
          'Traffic Rules': 78,
          'Hazard Perception': 72,
          'Vehicle Safety': 88,
          'Eco-Driving': 70
        },
        demographics: {
          '18-24': 70,
          '25-34': 20,
          '35-44': 5,
          '45+': 5
        },
        hoursPassCorrelation: {
          hours: [20, 30, 40, 50, 60, 70, 80],
          passRate: [60, 70, 75, 80, 85, 88, 90]
        },
        regionalComparison: {
          '北部': 82,
          '中部': 78,
          '南部': 75,
          '東部': 85
        },
      };
    };

    Chart.defaults.color = '#CBF7ED';

    const createTopicPerformanceChart = (data: { [key: string]: number }) => {
      if (topicPerformanceChart.value) {
        new Chart(topicPerformanceChart.value, {
          type: 'radar',
          data: {
            labels: Object.keys(data),
            datasets: [{
              label: '及格率 (%)',
              data: Object.values(data),
              fill: true,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgb(75, 192, 192)',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgb(75, 192, 192)'
            }]
          },
          options: {
            responsive: true,
            scales: {
              r: {
                angleLines: {
                  display: false,
                },
                ticks: {
                  backdropColor: 'transparent',
                },
                suggestedMin: 0,
                suggestedMax: 100
              }
            }
          }
        });
      }
    };

    const createTimePerQuestionChart = (data: {[key: string]: number }) => {
      if (timePerQuestionChart.value) {
        new Chart(timePerQuestionChart.value, {
          type: 'bar',
          data: {
            labels: Object.keys(data),
            datasets: [{
              label: '時間 (秒)',
              data: Object.values(data),
              backgroundColor: 'rgba(153, 102, 255, 0.6)'
            }]
          },
          options: {
            responsive: true,
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: '秒'
                }
              }
            }
          }
        });
      }
    };
    const createCompletionRateChart = (data: { [key: string]: number }) => {
      if (completionRateChart.value) {
        new Chart(completionRateChart.value, {
          type: 'bar',
          data: {
            labels: Object.keys(data),
            datasets: [{
              label: '完成率 (%)',
              data: Object.values(data),
              backgroundColor: 'rgba(75, 192, 192, 0.6)'
            }]
          },
          options: {
            responsive: true,
            scales: {
              y: {
                beginAtZero: true,
                max: 100
              }
            }
          }
        });
      }
    };

    const createChallengingTopicsChart = (data: { [key: string]: number }) => {
      if (challengingTopicsChart.value) {
        new Chart(challengingTopicsChart.value, {

          type: 'bar',
          data: {
            labels: Object.keys(data),
            datasets: [{
              label: '困難指數',
              data: Object.values(data),
              backgroundColor: 'rgba(255, 99, 132, 0.6)'
            }]
          },
          options: {
            indexAxis: 'y',
            responsive: true,
            scales: {
              x: {
                beginAtZero: true
              }
            }
          }
        });
      }
    };

    const createModeFreqChart = (data: { [key: string]: number }) => {
      if (modeFreqChart.value) {
        new Chart(modeFreqChart.value, {
          type: 'bar',
          data: {
            labels: Object.keys(data),
            datasets: [{
              label: '次數',
              data: Object.values(data),
              backgroundColor: 'rgba(54, 162, 235, 0.6)'
            }]
          },
          options: {
            indexAxis: 'y',
            responsive: true,
            scales: {
              x: {
                beginAtZero: true
              }
            }
          }
        });
      }
    };

    const createCommonMistakesChart = (data: { [key: string]: number }) => {
      if (commonMistakesChart.value) {
        new Chart(commonMistakesChart.value, {
          type: 'pie',
          data: {
            labels: Object.keys(data),
            datasets: [{
              data: Object.values(data),
              backgroundColor: [
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(153, 102, 255, 0.6)'
              ]
            }]
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: 'right',
              },
              title: {
                display: true,
                text: '失誤率 (%)'
              }
            }
          }
        });
      }
    };

    const createDemographicChart = (data: { [key: string]: number }) => {
      if (demographicChart.value) {
        new Chart(demographicChart.value, {
          type: 'doughnut',
          data: {
            labels: Object.keys(data),
            datasets: [{
              data: Object.values(data),
              backgroundColor: [
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)'
              ]
            }]
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: 'right',
              },
              title: {
                display: true,
                text: '年齡占比 (%)'
              }
            }
          }
        });
      }
    };

    const createHoursPassCorrelationChart = (data: { hours: number[]; passRate: number[] }) => {
      if (hoursPassCorrelationChart.value) {
        new Chart(hoursPassCorrelationChart.value, {
          type: 'scatter',
          data: {
            datasets: [{
              label: '及格率 vs 學習時長',
              data: data.hours.map((hour, index) => ({ x: hour, y: data.passRate[index] })),
              backgroundColor: 'rgba(75, 192, 192, 0.6)'
            }]
          },
          options: {
            responsive: true,
            scales: {
              x: {
                title: {
                  display: true,
                  text: '學習時長 (分)'
                }
              },
              y: {
                title: {
                  display: true,
                  text: '及格率 (%)'
                },
                beginAtZero: true,
                max: 100
              }
            }
          }
        });
      }
    };

    const createRegionalComparisonChart = (data: { [key: string]: number }) => {
      if (regionalComparisonChart.value) {
        new Chart(regionalComparisonChart.value, {
          type: 'bar',
          data: {
            labels: Object.keys(data),
            datasets: [{
              label: '及格率 (%)',
              data: Object.values(data),
              backgroundColor: 'rgba(153, 102, 255, 0.6)'
            }]
          },
          options: {
            responsive: true,
            scales: {
              y: {
                beginAtZero: true,
                max: 100
              }
            }
          }
        });
      }
    };
    onMounted(() => {
      const gameData = fetchGameData();
      createTopicPerformanceChart(gameData.topicPerformance);
      createTimePerQuestionChart(gameData.timePerQuestion);
      createCompletionRateChart(gameData.completionRates);
      createChallengingTopicsChart(gameData.challengingTopics);
      createModeFreqChart(gameData.modeFreq);

      const policyData = fetchPolicyData();
      createCommonMistakesChart(policyData.commonMistakes);
      createDemographicChart(policyData.demographics);
      createHoursPassCorrelationChart(policyData.hoursPassCorrelation);
      createRegionalComparisonChart(policyData.regionalComparison);
    });

    return {
      topicPerformanceChart,
      timePerQuestionChart,
      completionRateChart,
      challengingTopicsChart,
      modeFreqChart,

      commonMistakesChart,

      demographicChart,
      hoursPassCorrelationChart,
      regionalComparisonChart,
    };
  },
});
</script>

<style scoped>
.dashboard {
  max-width: 1800px;
  margin: 0 auto;
  padding: 20px;
  min-height: 100vh;
}

.charts {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.chart {
  background-color: rgba(64, 110, 142, 0.2);
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  color: #CBF7ED;
  margin-bottom: 30px;
  font-size: 2.5em;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

h2 {
  color: #8EA8C3;
  margin-bottom: 10px;
  font-size: 1.2em;
}

@media (max-width: 1400px) {
  .charts {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 900px) {
  .charts {
    grid-template-columns: 1fr;
  }
}
</style>