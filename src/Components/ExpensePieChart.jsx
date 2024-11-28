import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, ArcElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, ArcElement, Title, Tooltip, Legend);

const ExpensePieChart = ({ data }) => {
  // Check if the data is available and has the necessary properties
  if (!data || data.length === 0) {
    return <p>No expense data available.</p>; // Fallback message when data is not available
  }

  const categories = data.map(item => item.category);
  const amounts = data.map(item => item.amount);

  const chartData = {
    labels: categories,
    datasets: [
      {
        data: amounts,
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF9F40', '#4BC0C0'], // Add more colors as needed
      },
    ],
  };

  return (
    <div className="chart">
      <h2>Expenses by Category</h2>
      <Pie data={chartData} />
    </div>
  );
};

export default ExpensePieChart;
