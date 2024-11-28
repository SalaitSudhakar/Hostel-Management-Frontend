import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const RevenueChart = ({ data }) => {
  // Check if data and data.revenue are available
  if (!data || !data.revenue || data.revenue.length === 0) {
    return <p>No revenue data available.</p>; // Fallback message when data is not available
  }

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data.revenue}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="totalRevenue" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default RevenueChart;
