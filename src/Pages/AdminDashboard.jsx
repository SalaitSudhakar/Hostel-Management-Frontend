import React, { useState, useEffect, useRef } from "react";
import {
  ChartBar,
  Download,
  Calendar,
  TrendingUp,
  CreditCard,
} from "lucide-react";
import api from "../Services/api";
import ExpenseBarChart from "../Components/ExpenseBarChart";

import RevenueBarChart from "./../Components/RevenueBarChart";
import { toast } from 'react-toastify';

const AdminDashboard = () => {
  const [expenseData, setExpenseData] = useState([]);
  const [revenueData, setRevenueData] = useState([]);

  const [loading, setLoading] = useState(true);

  const [expenseStartDate, setExpenseStartDate] = useState("");
  const [expenseEndDate, setExpenseEndDate] = useState("");

  const [revenueStartDate, setRevenueStartDate] = useState("");
  const [revenueEndDate, setRevenueEndDate] = useState("");

  const isInitialLoad = useRef(true);

  useEffect(() => {
    if (isInitialLoad.current) {
      const now = new Date();

      // Get the first day of the current month
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
        .toISOString()
        .split("T")[0];

      // Get the last day of the current month
      const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0)
        .toISOString()
        .split("T")[0];


      // Setting the values for the dates
      setExpenseStartDate(startOfMonth);
      setExpenseEndDate(endOfMonth);
      setRevenueStartDate(startOfMonth);
      setRevenueEndDate(endOfMonth);

      // Mark the initial load as complete
      isInitialLoad.current = false;
    }
  }, []);

  useEffect(() => {
    const fetchExpenseData = async () => {
      setLoading(true);
      try {
        const response = await api.get(
          `/expense/category?startDate=${expenseStartDate}&endDate=${expenseEndDate}`
        );
        setExpenseData(response.data.data);
      } catch (error) {
        toast.error("Error fetching expense data:", error);
      } finally {
        setLoading(false);
      }
    };
    const fetchRevenueData = async () => {
      setLoading(true);
      try {
        const response = await api.get(
          `/revenue/category?startDate=${revenueStartDate}&endDate=${revenueEndDate}`
        );
        setRevenueData(response.data.data || []);
      } catch (error) {
        toast.error("Error fetching revenue data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (!isInitialLoad.current) {
      fetchExpenseData();
      fetchRevenueData();
    }
  }, [expenseStartDate, expenseEndDate, revenueStartDate, revenueEndDate]);

  // Function to handle downloading the report
  const handleDownloadReport = async (reportType, startDate, endDate) => {
    try {
      // Triggering API call to fetch the report as a blob
      const response = await api.get(`/download-report/${reportType}`, {
        params: { startDate, endDate },
        responseType: "blob", // Ensuring that the response is in binary format (PDF)
      });

      // Verifying if the response is valid
      if (response.data) {
        const blob = new Blob([response.data], { type: "application/pdf" }); // Creating a blob for the PDF
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob); // Generating URL for the blob
        link.download = `${reportType}-report.pdf`; // Setting the file name dynamically
        link.click(); // Triggering the download
      } else {
        toast.error(
          `Failed to download ${reportType} report. No data received.`
        );
      }
    } catch (error) {
      toast.error(`Error downloading ${reportType} report:`, error);
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
    <div className=" mx-auto p-6 bg-orange-50 min-h-screen">
      <h1 className="text-2xl md:text-4xl font-bold text-center mb-10 text-orange-600 flex items-center justify-center gap-4">
        <ChartBar className="w-10 h-10 text-orange-600" />
        Admin Dashboard
      </h1>

      {/* Expense Section */}
      <div className="w-fullmd:w-[80%] lg:w-[70%] xl:w-[60%] max-w-md mb-12 mx-auto bg-white shadow-lg rounded-xl overflow-hidden border border-orange-100">
        <div className="bg-orange-100 p-4 flex items-center gap-4">
          <CreditCard className="w-6 h-6 text-orange-600" />
          <h2 className="text-lg md:text-2xl font-semibold text-orange-700">
            Expense by Category
          </h2>
        </div>
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex flex-col flex-1">
              <label className="mb-2 text-sm font-medium text-orange-700 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Start Date:
              </label>
              <input
                type="date"
                value={expenseStartDate}
                onChange={(e) => setExpenseStartDate(e.target.value)}
                className="p-2 border border-orange-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            <div className="flex flex-col flex-1">
              <label className="mb-2 text-sm font-medium text-orange-700 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                End Date:
              </label>
              <input
                type="date"
                value={expenseEndDate}
                onChange={(e) => setExpenseEndDate(e.target.value)}
                className="p-2 border border-orange-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="w-full bg-orange-50 md:p-6 shadow-inner rounded-md">
            {expenseData && <ExpenseBarChart data={expenseData} />}
          </div>
          <button
            onClick={() =>
              handleDownloadReport("expense", expenseStartDate, expenseEndDate)
            }
            className="text-sm md:text-base mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 bg-orange-600 text-white font-medium rounded-md hover:bg-orange-700 transition-colors"
          >
            <Download className="w-5 h-5" />
            Download Expense Report
          </button>
        </div>
      </div>

      {/* Revenue Section */}
      <div className=" w-full md:w-[80%] lg:w-[70%] xl:w-[60%] mx-auto max-w-md mb-12 bg-white shadow-lg rounded-xl overflow-hidden border border-orange-100">
        <div className="bg-orange-100 p-4 flex items-center gap-4">
          <TrendingUp className="w-6 h-6 text-orange-600" />
          <h2 className="text-lg md:text-2xl font-semibold text-orange-700">
            Revenue by Category
          </h2>
        </div>
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex flex-col flex-1">
              <label className="mb-2 text-sm font-medium text-orange-700 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Start Date:
              </label>
              <input
                type="date"
                value={revenueStartDate}
                onChange={(e) => setRevenueStartDate(e.target.value)}
                className="p-2 border border-orange-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            <div className="flex flex-col flex-1">
              <label className="mb-2 text-sm font-medium text-orange-700 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                End Date:
              </label>
              <input
                type="date"
                value={revenueEndDate}
                onChange={(e) => setRevenueEndDate(e.target.value)}
                className="p-2 border border-orange-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="bg-orange-50 md:p-6 shadow-inner rounded-md">
            {revenueData && <RevenueBarChart data={revenueData} />}
          </div>
          <button
            onClick={() =>
              handleDownloadReport("revenue", revenueStartDate, revenueEndDate)
            }
            className="text-sm md:text-base mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 bg-orange-600 text-white font-medium rounded-md hover:bg-orange-700 transition-colors"
          >
            <Download className="w-5 h-5" />
            Download Revenue Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
