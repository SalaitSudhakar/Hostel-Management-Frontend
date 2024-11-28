import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const ExpenseChart = ({ data }) => {
  // Check if the data and data.expenses are available
  if (!data || !data.expenses || data.expenses.length === 0) {
    return <p>No expense data available.</p>; // Fallback message when data is not available
  }

  const colors = ["#ff7300", "#387908", "#5c6bc0"]; // Customize your colors
  
  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie data={data.expenses} dataKey="totalAmount" nameKey="_id" outerRadius={150} fill="#8884d8" label>
          {data.expenses.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default ExpenseChart;
