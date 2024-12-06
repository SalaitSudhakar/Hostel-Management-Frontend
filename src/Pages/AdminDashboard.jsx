import React, { useState, useEffect, useRef } from "react";
import api from "../Services/api";
import ExpenseBarChart from "../Components/ExpenseBarChart";

const AdminDashboard = () => {
  const [expenseData, setExpenseData] = useState([]);
  /* const [revenueData, setRevenueData] = useState([]);
  const [occupancyData, setOccupancyData] = useState([]); */
  const [loading, setLoading] = useState(true);

  const [expenseStartDate, setExpenseStartDate] = useState("");
  const [expenseEndDate, setExpenseEndDate] = useState("");

  const [revenueStartDate, setRevenueStartDate] = useState("");
  const [revenueEndDate, setRevenueEndDate] = useState("");

  const [occupancyStartDate, setOccupancyStartDate] = useState("");
  const [occupancyEndDate, setOccupancyEndDate] = useState("");

  const isInitialLoad = useRef(true);

  useEffect(() => {
    if (isInitialLoad.current) {
      const now = new Date();
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
        .toISOString()
        .split("T")[0];
      const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0)
        .toISOString()
        .split("T")[0];

        console.log(startOfMonth, endOfMonth);

      setExpenseStartDate(startOfMonth);
      setExpenseEndDate(endOfMonth);
      setRevenueStartDate(startOfMonth);
      setRevenueEndDate(endOfMonth);
      setOccupancyStartDate(startOfMonth);
      setOccupancyEndDate(endOfMonth);
      isInitialLoad.current = false;
    }
  }, []);

  useEffect(() => {
    const fetchExpenseData = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/expense/expense-by-category`, {
          params: {
            startDate: expenseStartDate,
            endDate: expenseEndDate,
          },
        });
        setExpenseData(response.data.data);
      } catch (error) {
        console.error("Error fetching expense data:", error);
      } finally {
        setLoading(false);
      }
    };
    /* const fetchRevenueData = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/revenue/revenue-by-category`, {
          params: {
            startDate: revenueStartDate,
            endDate: revenueEndDate,
          },
        });
        setRevenueData(response.data.data);
      } catch (error) {
        console.error("Error fetching revenue data:", error);
      } finally {
        setLoading(false);
      }
    };
    const fetchOccupancyData = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/room-occupancy/date-range`, {
          params: {
            startDate: occupancyStartDate,
            endDate: occupancyEndDate,
          },
        });
        setOccupancyData(response.data.data);
      } catch (error) {
        console.error("Error fetching occupancy data:", error);
      } finally {
        setLoading(false);
      }
    };
 */
    if (!isInitialLoad.current) {
      fetchExpenseData();
    /*   fetchRevenueData();
      fetchOccupancyData(); */
    }
  }, [expenseStartDate, expenseEndDate, revenueStartDate, revenueEndDate, occupancyStartDate, occupancyEndDate]);

  const handleDownloadReport = async (reportType, startDate, endDate) => {
    try {
      const response = await api.get(`/download-report/${reportType}`, {
        params: { startDate, endDate },
        responseType: "blob",
      });

      const blob = new Blob([response.data], { type: "application/pdf" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `${reportType}-report.pdf`;
      link.click();
    } catch (error) {
      console.error(`Error downloading ${reportType} report:`, error);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-100 z-50">
        <div className="w-16 h-16 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Admin Dashboard</h1>

      {/* Expense Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Expense by Category</h2>
        <div className="flex gap-4 mb-6">
          <div className="flex flex-col">
            <label className="mb-2 text-sm font-medium text-gray-700">Start Date:</label>
            <input
              type="date"
              value={expenseStartDate}
              onChange={(e) => setExpenseStartDate(e.target.value)}
              className="p-2 border rounded-md"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2 text-sm font-medium text-gray-700">End Date:</label>
            <input
              type="date"
              value={expenseEndDate}
              onChange={(e) => setExpenseEndDate(e.target.value)}
              className="p-2 border rounded-md"
            />
          </div>
        </div>
        <div className="bg-white p-6 shadow-md rounded-md">
          {expenseData && <ExpenseBarChart data={expenseData} />}
        </div>
        <button
          onClick={() => handleDownloadReport("expense", expenseStartDate, expenseEndDate)}
          className="mt-4 px-4 py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600"
        >
          Download Expense Report
        </button>
      </div>

      {/* Revenue Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Revenue by Category</h2>
        <div className="flex gap-4 mb-6">
          <div className="flex flex-col">
            <label className="mb-2 text-sm font-medium text-gray-700">Start Date:</label>
            <input
              type="date"
              value={revenueStartDate}
              onChange={(e) => setRevenueStartDate(e.target.value)}
              className="p-2 border rounded-md"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2 text-sm font-medium text-gray-700">End Date:</label>
            <input
              type="date"
              value={revenueEndDate}
              onChange={(e) => setRevenueEndDate(e.target.value)}
              className="p-2 border rounded-md"
            />
          </div>
        </div>
        <div className="bg-white p-6 shadow-md rounded-md">
          {/* Uncomment when RevenueChart component is available */}
          {/* <RevenueChart data={revenueData} /> */}
        </div>
        <button
          onClick={() => handleDownloadReport("revenue", revenueStartDate, revenueEndDate)}
          className="mt-4 px-4 py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600"
        >
          Download Revenue Report
        </button>
      </div>

      {/* Room Occupancy Section */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Room Occupancy Rate</h2>
        <div className="flex gap-4 mb-6">
          <div className="flex flex-col">
            <label className="mb-2 text-sm font-medium text-gray-700">Start Date:</label>
            <input
              type="date"
              value={occupancyStartDate}
              onChange={(e) => setOccupancyStartDate(e.target.value)}
              className="p-2 border rounded-md"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2 text-sm font-medium text-gray-700">End Date:</label>
            <input
              type="date"
              value={occupancyEndDate}
              onChange={(e) => setOccupancyEndDate(e.target.value)}
              className="p-2 border rounded-md"
            />
          </div>
        </div>
        <div className="bg-white p-6 shadow-md rounded-md">
          {/* Uncomment when OccupancyChart component is available */}
          {/* <OccupancyChart data={occupancyData} /> */}
        </div>
        <button
          onClick={() => handleDownloadReport("room-occupancy", occupancyStartDate, occupancyEndDate)}
          className="mt-4 px-4 py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600"
        >
          Download Room Occupancy Report
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
