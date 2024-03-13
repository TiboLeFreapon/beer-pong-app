import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  plugins: {
    title: {
      display: true,
      text: 'Chart.js Bar Chart - Stacked',
    },
  },
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
    yAxes: [{
        ticks: {
            beginAtZero: true
        }
    }],
    xAxes: [{
        // Change here
        barPercentage: 1.5
    }]
  },
};

const labels = ['January'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: [10 - 8],
      backgroundColor: 'rgb(255, 99, 132)',
    },
    {
      label: 'Dataset 3',
      data: [8],
      backgroundColor: 'rgb(53, 162, 235)',
    },
  ],
};

export function SingleBar() {
  return <Bar options={options} data={data} />;
}
