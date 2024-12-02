import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const OccupancyBarChart = ({ data }) => {
  // Check if the data is available and has the necessary properties
  if (!data || !data.occupancyRate || data.occupancyRate.length === 0) {
    return <p>No occupancy data available.</p>; // Fallback message when data is not available
  }

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data.occupancyRate}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="occupancyRate" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default OccupancyBarChart;
