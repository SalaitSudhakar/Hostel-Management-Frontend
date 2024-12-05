import React, { useState, useEffect } from "react";
import api from "../Services/api";
import ExpenseBarChart from './../Components/ExpenseBarChart';

// Commented-out sections for future use
// import RevenueChart from "../Components/RevenueChart";
// import OccupancyChart from "../Components/OccupancyChart";

const AdminDashboard = () => {
  // State for expense, revenue, and room occupancy data
  const [expenseData, setExpenseData] = useState([]);
  //const [revenueData, setRevenueData] = useState([]);  // State for revenue data
  //const [occupancyData, setOccupancyData] = useState([]);  // State for room occupancy data

  // Loading state
  const [loading, setLoading] = useState(true); 

  // Separate date states for each section
  const [expenseStartDate, setExpenseStartDate] = useState("");
  const [expenseEndDate, setExpenseEndDate] = useState("");

  const [revenueStartDate, setRevenueStartDate] = useState("");
  const [revenueEndDate, setRevenueEndDate] = useState("");

  const [occupancyStartDate, setOccupancyStartDate] = useState("");
  const [occupancyEndDate, setOccupancyEndDate] = useState("");

  useEffect(() => {
    // Set current month start and end dates dynamically for each section
    const setCurrentMonthDates = () => {
      const now = new Date();
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

      setExpenseStartDate(startOfMonth.toISOString().split('T')[0]);
      setExpenseEndDate(endOfMonth.toISOString().split('T')[0]);

      setRevenueStartDate(startOfMonth.toISOString().split('T')[0]);
      setRevenueEndDate(endOfMonth.toISOString().split('T')[0]);

      setOccupancyStartDate(startOfMonth.toISOString().split('T')[0]);
      setOccupancyEndDate(endOfMonth.toISOString().split('T')[0]);
    };

    setCurrentMonthDates(); // Set the default dates on component load

    const fetchData = async () => {
      try {
        // Fetch Expense Data by category
        console.log(`/expense/expense-by-category?startDate=${expenseStartDate}&endDate=${expenseEndDate}`)
        const expenseResponse = await api.get(`/expense/expense-by-category?startDate=${expenseStartDate}&endDate=${expenseEndDate}`);
        setExpenseData(expenseResponse.data.data);

        // Fetch Revenue Data by category
        // Uncomment when Revenue API is ready
        // const revenueResponse = await api.get(`/revenue/category?startDate=${revenueStartDate}&endDate=${revenueEndDate}`);
        // setRevenueData(revenueResponse.data);

        // Fetch Room Occupancy Rate
        // Uncomment when Room Occupancy API is ready
        // const occupancyResponse = await api.get(`/api/room/occupancy-rate?startDate=${occupancyStartDate}&endDate=${occupancyEndDate}`);
        // setOccupancyData(occupancyResponse.data);

      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Set loading to false once data fetching is complete
      }
    };

    fetchData();
  }, [
    expenseStartDate, expenseEndDate,
    revenueStartDate, revenueEndDate,
    occupancyStartDate, occupancyEndDate
  ]); // Dependency array for fetching data when dates change

  const handleDownloadReport = async (reportType, startDate, endDate) => {
    try {
      const response = await api.get(`/api/download-report/${reportType}`, {
        params: { startDate, endDate },
        responseType: 'blob',
      });

      const blob = new Blob([response.data], { type: 'application/pdf' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `${reportType}-report.pdf`; // Dynamic filename
      link.click();
    } catch (error) {
      console.error("Error downloading the report:", error);
    }
  };

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

      {/* Expense Section */}
      <div className="chart-section">
        <h2>Expense by Category</h2>
        <div className="date-filters">
          <label>Start Date:</label>
          <input
            type="date"
            value={expenseStartDate}
            onChange={(e) => setExpenseStartDate(e.target.value)}
          />
          <label>End Date:</label>
          <input
            type="date"
            value={expenseEndDate}
            onChange={(e) => setExpenseEndDate(e.target.value)}
          />
        </div>
        <div className="chart">
          {expenseData && <ExpenseBarChart data={expenseData} />}
        </div>
        <button onClick={() => handleDownloadReport('expense', expenseStartDate, expenseEndDate)}>
          Download Expense Report
        </button>
      </div>

      {/* Revenue Section */}
      <div className="chart-section">
        <h2>Revenue by Category</h2>
        <div className="date-filters">
          <label>Start Date:</label>
          <input
            type="date"
            value={revenueStartDate}
            onChange={(e) => setRevenueStartDate(e.target.value)}
          />
          <label>End Date:</label>
          <input
            type="date"
            value={revenueEndDate}
            onChange={(e) => setRevenueEndDate(e.target.value)}
          />
        </div>
        <div className="chart">
          {/* Uncomment this when Revenue data is available */}
          {/* {revenueData && <RevenueChart data={revenueData} />} */}
        </div>
        <button onClick={() => handleDownloadReport('revenue', revenueStartDate, revenueEndDate)}>
          Download Revenue Report
        </button>
      </div>

      {/* Room Occupancy Section */}
      <div className="chart-section">
        <h2>Room Occupancy Rate</h2>
        <div className="date-filters">
          <label>Start Date:</label>
          <input
            type="date"
            value={occupancyStartDate}
            onChange={(e) => setOccupancyStartDate(e.target.value)}
          />
          <label>End Date:</label>
          <input
            type="date"
            value={occupancyEndDate}
            onChange={(e) => setOccupancyEndDate(e.target.value)}
          />
        </div>
        <div className="chart">
          {/* Uncomment this when Occupancy data is available */}
          {/* {occupancyData && <OccupancyChart data={occupancyData} />} */}
        </div>
        <button onClick={() => handleDownloadReport('room-occupancy', occupancyStartDate, occupancyEndDate)}>
          Download Room Occupancy Report
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
