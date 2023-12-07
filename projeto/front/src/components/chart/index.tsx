import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Top 5 artilheiros',
    },
  },
};

export function BarChart({ data }) {
  const chartData = {
    labels: data.map((item) => item.nome_jogador),
    datasets: [
      {
        label: 'Gols marcados',
        data: data.map((item) => item.count),
        backgroundColor: 'rgba(99, 255, 216, 0.5)',
      },
    ],
  };

  return <Bar options={options} data={chartData} />;
}
