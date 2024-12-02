import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const RevenueBarChart = ({ data }) => {
  if (!data || data.length === 0) {
    return <p>No revenue data available to display the chart.</p>;
  }

  const categories = data.map(item => item.category);
  const amounts = data.map(item => item.amount);

  const chartData = {
    labels: categories,
    datasets: [
      {
        label: 'Revenue',
        data: amounts,
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF9F40', '#4BC0C0'],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Revenue by Category',
      },
    },
  };

  return (
    <div className="chart">
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default RevenueBarChart;
