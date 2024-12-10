import React from "react";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const RevenueBarChart = ({ data }) => {
 
  // Check if the data is available
  if (!data) {
    return <p>No revenue data available.</p>;
  }

  const chartData = [
    { name: 'Rent', value: data.totalRent },
    { name: 'Maintenance', value: data.totalMaintenanceCharge },
    { name: 'Tax', value: data.totalTax },
    { name: 'Total Revenue', value: data.totalRevenue },
  ];

  const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#FF9F40']; // Customize your colors for each bar

  return (
    <ResponsiveContainer height={300} className={"mx-auto my-3"}>
      <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        
        <Bar dataKey="value">
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default RevenueBarChart;
