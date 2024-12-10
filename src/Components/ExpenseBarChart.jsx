import React from "react";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const ExpenseBarChart = ({ data }) => {
  // Check if the data is available
  if (!data || data.length === 0) {
    return <p>No expense data available.</p>; // Fallback message when data is not available
  }

  const colors = ["#ff7300", "#387908", "#5c6bc0", "#cf6a87", "#36c963", "#7aa3e5"]; // Customize your colors

  return (
    <ResponsiveContainer  height={300} className={"mx-auto my-3"}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="_id" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="totalAmount" fill="#8884d8">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ExpenseBarChart;
