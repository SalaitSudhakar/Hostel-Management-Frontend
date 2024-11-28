import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const OccupancyChart = ({ data }) => {
  // Check if the data is available and has the necessary properties
  if (!data || !data.occupancyRate || data.occupancyRate.length === 0) {
    return <p>No occupancy data available.</p>; // Fallback message when data is not available
  }

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data.occupancyRate}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="occupancyRate" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default OccupancyChart;
