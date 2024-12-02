import React, { useState, useEffect } from "react";
// import RevenueChart from "../Components/RevenueChart";
//import OccupancyChart from "../Components/OccupancyChart";
 
import api from "../Services/api";
import ExpenseBarChart from './../Components/ExpenseBarChart';

const AdminDashboard = () => {
  //const [revenueData, setRevenueData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);
  //const [occupancyData, setOccupancyData] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {

    const fetchData = async () => {
      try {
        // Fetch Revenue Data by category
        // const revenueResponse = await api.get("/revenue/category");
        // setRevenueData(revenueResponse.data);

        // Fetch Expense Data by category
        const expenseResponse = await api.get("/expense/expense-by-category?startDate=2024-11-01&endDate=2024-11-30");
        setExpenseData(expenseResponse.data.data);

        // // Fetch Occupancy Data
        // const occupancyResponse = await api.get(
        //   "/api/room/occupancy-rate?startDate=2024-01-01&endDate=2024-12-31" },
       
        // );
        // setOccupancyData(occupancyResponse.data);

      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Set loading to false once data fetching is complete
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
        <div className="w-24 h-24 border-[8px] border-t-orange-600 border-r-orange-600 border-b-orange-300 border-l-orange-300 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto md:w-3/5 lg:2/5">
      <h1>Admin Dashboard</h1>

      <div className="chart-container">
        {/* Revenue Chart */}
        {/* <div className="chart">
          <h2>Revenue</h2>
          {revenueData && <RevenueChart data={revenueData} />}
        </div> */}

    

        {/* Room Occupancy Rate Chart */}
       {/*  <div className="chart">
          <h2>Room Occupancy Rate</h2>
          {occupancyData && <OccupancyChart data={occupancyData} />}
        </div>
 */}
       
        {/* Pie Chart for Expense by Category */}
        {expenseData && <ExpenseBarChart data={expenseData} />}
      </div>
    </div>
  );
};

export default AdminDashboard;
