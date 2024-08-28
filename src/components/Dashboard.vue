<template>
  <div class="dashboard">
    <h1>Car Learner Quiz Game Dashboard</h1>
    <div class="charts">
      <div class="chart">
        <h2>Quiz Performance by Topic</h2>
        <canvas ref="topicPerformanceChart"></canvas>
      </div>
      <div class="chart">
        <h2>Age Distribution of Players</h2>
        <canvas ref="ageDistributionChart"></canvas>
      </div>
      <div class="chart">
        <h2>AI Content Usage</h2>
        <canvas ref="aiContentUsageChart"></canvas>
      </div>
      <div class="chart">
        <h2>Average Time per Question</h2>
        <canvas ref="timePerQuestionChart"></canvas>
      </div>
      <div class="chart">
        <h2>Quiz Completion Rates</h2>
        <canvas ref="completionRateChart"></canvas>
      </div>
      <div class="chart">
        <h2>Most Challenging Topics</h2>
        <canvas ref="challengingTopicsChart"></canvas>
      </div>
      <div class="chart">
        <h2>Player Improvement Over Time</h2>
        <canvas ref="playerImprovementChart"></canvas>
      </div>
      <div class="chart">
        <h2>AI Content Feedback</h2>
        <canvas ref="aiContentFeedbackChart"></canvas>
      </div>
      <div class="chart">
        <h2>Pass Rates by Learning Method</h2>
        <canvas ref="passRatesChart"></canvas>
      </div>
      <div class="chart">
        <h2>Average Learning Duration</h2>
        <canvas ref="learningDurationChart"></canvas>
      </div>
      <div class="chart">
        <h2>Most Common Mistakes in Practical Tests</h2>
        <canvas ref="commonMistakesChart"></canvas>
      </div>
      <div class="chart">
        <h2>Theory Test Performance by Topic</h2>
        <canvas ref="theoryPerformanceChart"></canvas>
      </div>
      <div class="chart">
        <h2>Accident Rates for New Drivers</h2>
        <canvas ref="accidentRatesChart"></canvas>
      </div>
      <div class="chart">
        <h2>Demographic Distribution of Learners</h2>
        <canvas ref="demographicChart"></canvas>
      </div>
      <div class="chart">
        <h2>Correlation: Learning Hours vs. Pass Rate</h2>
        <canvas ref="hoursPassCorrelationChart"></canvas>
      </div>
      <div class="chart">
        <h2>Regional Performance Comparison</h2>
        <canvas ref="regionalComparisonChart"></canvas>
      </div>
      <div class="chart">
        <h2>Eco-Driving Awareness Scores</h2>
        <canvas ref="ecoDrivingChart"></canvas>
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
  timePerQuestion: number[];
  aiContentUsage: { [key: string]: number };
  completionRates: { [key: string]: number };
  challengingTopics: { [key: string]: number };
  playerImprovement: { [key: string]: number[] };
  aiContentFeedback: { [key: string]: number };
}
interface PolicyData {
  passRates: { [key: string]: number };
  learningDuration: { [key: string]: number };
  commonMistakes: { [key: string]: number };
  theoryPerformance: { [key: string]: number };
  accidentRates: { [key: string]: number };
  demographics: { [key: string]: number };
  hoursPassCorrelation: { hours: number[]; passRate: number[] };
  regionalComparison: { [key: string]: number };
  ecoDrivingScores: { [key: string]: number };
}

export default defineComponent({
  name: 'CarLearnerQuizDashboard',
  setup() {
    const topicPerformanceChart = ref<HTMLCanvasElement | null>(null);
    const ageDistributionChart = ref<HTMLCanvasElement | null>(null);
    const timePerQuestionChart = ref<HTMLCanvasElement | null>(null);
    const aiContentUsageChart = ref<HTMLCanvasElement | null>(null);
    const completionRateChart = ref<HTMLCanvasElement | null>(null);
    const challengingTopicsChart = ref<HTMLCanvasElement | null>(null);
    const playerImprovementChart = ref<HTMLCanvasElement | null>(null);
    const aiContentFeedbackChart = ref<HTMLCanvasElement | null>(null);

    const passRatesChart = ref<HTMLCanvasElement | null>(null);
    const learningDurationChart = ref<HTMLCanvasElement | null>(null);
    const commonMistakesChart = ref<HTMLCanvasElement | null>(null);
    const theoryPerformanceChart = ref<HTMLCanvasElement | null>(null);
    const accidentRatesChart = ref<HTMLCanvasElement | null>(null);
    const demographicChart = ref<HTMLCanvasElement | null>(null);
    const hoursPassCorrelationChart = ref<HTMLCanvasElement | null>(null);
    const regionalComparisonChart = ref<HTMLCanvasElement | null>(null);
    const ecoDrivingChart = ref<HTMLCanvasElement | null>(null);

    const fetchGameData = (): GameData => {
      // Simulated data fetch
      return {
        topicPerformance: {
          'Road Signs': 85,
          'Traffic Rules': 78,
          'Vehicle Operation': 92,
          'Safety Procedures': 88,
          'Parking Techniques': 75
        },
        ageDistribution: {
          '18-19': 30,
          '20-21': 40,
          '22-24': 30
        },
        timePerQuestion: [20, 25, 18, 30, 22, 28, 15, 35, 24, 19],
        aiContentUsage: {
          'Storylines': 95,
          'Quizzes': 100,
          'Sound Effects': 80,
          'Voiceovers': 90,
          'Images': 85,
          'Videos': 75
        },
        completionRates: {
          'Beginner': 95,
          'Intermediate': 85,
          'Advanced': 70
        },
        challengingTopics: {
          'Road Signs': 15,
          'Traffic Rules': 25,
          'Vehicle Operation': 10,
          'Safety Procedures': 20,
          'Parking Techniques': 30
        },
        playerImprovement: {
          'Week 1': [60, 65, 70, 75, 80],
          'Week 2': [65, 70, 75, 80, 85],
          'Week 3': [70, 75, 80, 85, 90],
          'Week 4': [75, 80, 85, 90, 95]
        },
        aiContentFeedback: {
          'Very Helpful': 60,
          'Somewhat Helpful': 30,
          'Not Helpful': 10
        },
      };
    };
    const fetchPolicyData = (): PolicyData => {
      // Simulated data fetch
      return {
        passRates: {
          'Traditional': 75,
          'Online + Practical': 82,
          'Intensive Course': 78,
          'VR Simulation': 85
        },
        learningDuration: {
          'Traditional': 6,
          'Online + Practical': 5,
          'Intensive Course': 2,
          'VR Simulation': 4
        },
        commonMistakes: {
          'Parallel Parking': 30,
          'Merging': 25,
          'Speed Control': 20,
          'Signaling': 15,
          'Observation': 10
        },
        theoryPerformance: {
          'Road Signs': 85,
          'Traffic Rules': 78,
          'Hazard Perception': 72,
          'Vehicle Safety': 88,
          'Eco-Driving': 70
        },
        accidentRates: {
          '0-6 months': 8,
          '6-12 months': 6,
          '12-18 months': 4,
          '18-24 months': 3
        },
        demographics: {
          '18-24': 40,
          '25-34': 30,
          '35-44': 15,
          '45+': 15
        },
        hoursPassCorrelation: {
          hours: [20, 30, 40, 50, 60, 70, 80],
          passRate: [60, 70, 75, 80, 85, 88, 90]
        },
        regionalComparison: {
          'North': 82,
          'South': 78,
          'East': 80,
          'West': 75,
          'Central': 85
        },
        ecoDrivingScores: {
          'Fuel Efficiency': 75,
          'Smooth Acceleration': 70,
          'Proper Gear Usage': 65,
          'Anticipation': 80,
          'Idle Reduction': 85
        }
      };
    };
    const createTopicPerformanceChart = (data: { [key: string]: number }) => {
      if (topicPerformanceChart.value) {
        new Chart(topicPerformanceChart.value, {
          type: 'radar',
          data: {
            labels: Object.keys(data),
            datasets: [{
              label: 'Performance (%)',
              data: Object.values(data),
              fill: true,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgb(75, 192, 192)',
              pointBackgroundColor: 'rgb(75, 192, 192)',
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
                  display: false
                },
                suggestedMin: 0,
                suggestedMax: 100
              }
            }
          }
        });
      }
    };

    const createAgeDistributionChart = (data: { [key: string]: number }) => {
      if (ageDistributionChart.value) {
        new Chart(ageDistributionChart.value, {
          type: 'pie',
          data: {
            labels: Object.keys(data),
            datasets: [{
              data: Object.values(data),
              backgroundColor: [
                'rgba(255, 99, 132, 0.8)',
                'rgba(54, 162, 235, 0.8)',
                'rgba(255, 206, 86, 0.8)'
              ]
            }]
          },
          options: {
            radius: '50%',
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'Age Distribution (%)'
              }
            }
          }
        });
      }
    };

    const createTimePerQuestionChart = (data: number[]) => {
      if (timePerQuestionChart.value) {
        new Chart(timePerQuestionChart.value, {
          type: 'bar',
          data: {
            labels: data.map((_, index) => `Q${index + 1}`),
            datasets: [{
              label: 'Time (seconds)',
              data: data,
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
                  text: 'Seconds'
                }
              }
            }
          }
        });
      }
    };

    const createAIContentUsageChart = (data: { [key: string]: number }) => {
      if (aiContentUsageChart.value) {
        new Chart(aiContentUsageChart.value, {
          type: 'doughnut',
          data: {
            labels: Object.keys(data),
            datasets: [{
              data: Object.values(data),
              backgroundColor: [
                'rgba(255, 99, 132, 0.8)',
                'rgba(54, 162, 235, 0.8)',
                'rgba(255, 206, 86, 0.8)',
                'rgba(75, 192, 192, 0.8)',
                'rgba(153, 102, 255, 0.8)',
                'rgba(255, 159, 64, 0.8)'
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
                text: 'AI Content Usage (%)'
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
              label: 'Completion Rate (%)',
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
              label: 'Difficulty Score',
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

    const createPlayerImprovementChart = (data: { [key: string]: number[] }) => {
      if (playerImprovementChart.value) {
        new Chart(playerImprovementChart.value, {
          type: 'line',
          data: {
            labels: Object.keys(data),
            datasets: Object.entries(data).map(([week, scores], index) => ({
              label: week,
              data: scores,
              borderColor: `hsl(${index * 60}, 70%, 50%)`,
              tension: 0.1
            }))
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

    const createAIContentFeedbackChart = (data: { [key: string]: number }) => {
      if (aiContentFeedbackChart.value) {
        new Chart(aiContentFeedbackChart.value, {
          type: 'pie',
          data: {
            labels: Object.keys(data),
            datasets: [{
              data: Object.values(data),
              backgroundColor: [
                'rgba(75, 192, 192, 0.8)',
                'rgba(255, 206, 86, 0.8)',
                'rgba(255, 99, 132, 0.8)'
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
                text: 'AI Content Feedback'
              }
            }
          }
        });
      }
    };
    const createPassRatesChart = (data: { [key: string]: number }) => {
      if (passRatesChart.value) {
        new Chart(passRatesChart.value, {
          type: 'bar',
          data: {
            labels: Object.keys(data),
            datasets: [{
              label: 'Pass Rate (%)',
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

    const createLearningDurationChart = (data: { [key: string]: number }) => {
      if (learningDurationChart.value) {
        new Chart(learningDurationChart.value, {
          type: 'bar',
          data: {
            labels: Object.keys(data),
            datasets: [{
              label: 'Average Duration (months)',
              data: Object.values(data),
              backgroundColor: 'rgba(255, 159, 64, 0.6)'
            }]
          },
          options: {
            responsive: true,
            scales: {
              y: {
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
                text: 'Percentage of Errors'
              }
            }
          }
        });
      }
    };

    const createTheoryPerformanceChart = (data: { [key: string]: number }) => {
      if (theoryPerformanceChart.value) {
        new Chart(theoryPerformanceChart.value, {
          type: 'radar',
          data: {
            labels: Object.keys(data),
            datasets: [{
              label: 'Performance (%)',
              data: Object.values(data),
              fill: true,
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              borderColor: 'rgb(54, 162, 235)',
              pointBackgroundColor: 'rgb(54, 162, 235)',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgb(54, 162, 235)'
            }]
          },
          options: {
            responsive: true,
            scales: {
              r: {
                angleLines: {
                  display: false
                },
                suggestedMin: 0,
                suggestedMax: 100
              }
            }
          }
        });
      }
    };

    const createAccidentRatesChart = (data: { [key: string]: number }) => {
      if (accidentRatesChart.value) {
        new Chart(accidentRatesChart.value, {
          type: 'line',
          data: {
            labels: Object.keys(data),
            datasets: [{
              label: 'Accident Rate (%)',
              data: Object.values(data),
              borderColor: 'rgb(255, 99, 132)',
              tension: 0.1
            }]
          },
          options: {
            responsive: true,
            scales: {
              y: {
                beginAtZero: true
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
                text: 'Age Distribution (%)'
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
              label: 'Pass Rate vs Learning Hours',
              data: data.hours.map((hour, index) => ({x: hour, y: data.passRate[index]})),
              backgroundColor: 'rgba(75, 192, 192, 0.6)'
            }]
          },
          options: {
            responsive: true,
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Learning Hours'
                }
              },
              y: {
                title: {
                  display: true,
                  text: 'Pass Rate (%)'
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
              label: 'Pass Rate (%)',
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

    const createEcoDrivingChart = (data: { [key: string]: number }) => {
      if (ecoDrivingChart.value) {
        new Chart(ecoDrivingChart.value, {
          type: 'radar',
          data: {
            labels: Object.keys(data),
            datasets: [{
              label: 'Eco-Driving Score',
              data: Object.values(data),
              fill: true,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgb(75, 192, 192)',
              pointBackgroundColor: 'rgb(75, 192, 192)',
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
                  display: false
                },
                suggestedMin: 0,
                suggestedMax: 100
              }
            }
          }
        });
      }
    };
    onMounted(() => {
      const gameData = fetchGameData();
      createTopicPerformanceChart(gameData.topicPerformance);
      createAgeDistributionChart(gameData.ageDistribution);
      createTimePerQuestionChart(gameData.timePerQuestion);
      createAIContentUsageChart(gameData.aiContentUsage);
      createCompletionRateChart(gameData.completionRates);
      createChallengingTopicsChart(gameData.challengingTopics);
      createPlayerImprovementChart(gameData.playerImprovement);
      createAIContentFeedbackChart(gameData.aiContentFeedback);

      const policyData = fetchPolicyData();
      createPassRatesChart(policyData.passRates);
      createLearningDurationChart(policyData.learningDuration);
      createCommonMistakesChart(policyData.commonMistakes);
      createTheoryPerformanceChart(policyData.theoryPerformance);
      createAccidentRatesChart(policyData.accidentRates);
      createDemographicChart(policyData.demographics);
      createHoursPassCorrelationChart(policyData.hoursPassCorrelation);
      createRegionalComparisonChart(policyData.regionalComparison);
      createEcoDrivingChart(policyData.ecoDrivingScores); 
    });

    return {
      topicPerformanceChart,
      ageDistributionChart,
      timePerQuestionChart,
      aiContentUsageChart,
      completionRateChart,
      challengingTopicsChart,
      playerImprovementChart,
      aiContentFeedbackChart,

      passRatesChart,
      learningDurationChart,
      commonMistakesChart,
      theoryPerformanceChart,
      accidentRatesChart,
      demographicChart,
      hoursPassCorrelationChart,
      regionalComparisonChart,
      ecoDrivingChart,  
    };
  },
});
</script>

<style scoped>
.dashboard {
  font-family: Arial, sans-serif;
  max-width: 1800px;
  margin: 0 auto;
  padding: 20px;
}

.charts {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.chart {
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

h1 {
  text-align: center;
  color: white;
  margin-bottom: 30px;
}

h2 {
  color: #555;
  margin-bottom: 10px;
  font-size: 1.2em;
}

@media (max-width: 1440px) {
  .charts {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .charts {
    grid-template-columns: 1fr;
  }
}
</style>