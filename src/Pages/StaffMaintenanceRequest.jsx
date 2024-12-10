import React, { useState, useEffect } from "react";
import { Wrench, CheckCircle, RefreshCw } from "lucide-react";
import api from "../Services/api";
import { toast } from "react-toastify";

const StaffMaintenanceRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await api.get("/maintenance-request/get-requests/staff");
      setRequests(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch requests", error);
      setLoading(false);
    }
  };

  const handleResolveRequest = async (requestId) => {
    try {
      const response = await api.patch(
        `/maintenance-request/resolve/${requestId}`
      );
      if (response.status === 200) {
        // Update the request status locally
        setRequests((prevRequests) =>
          prevRequests.map((request) =>
            request._id === requestId
              ? { ...request, status: "Resolved" }
              : request
          )
        );

        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to resolve request");
      console.error("Failed to resolve request", error);
    }
  };

  const getStatusIcon = (status) => {
    const iconProps = { size: 20, className: "mr-2" };
    switch (status) {
      case "Resolved":
        return <CheckCircle {...iconProps} color="#16a34a" />;
      case "In Progress":
        return <RefreshCw {...iconProps} color="#eab308" />;
      default:
        return <Wrench {...iconProps} color="#ea580c" />;
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
    <div className="bg-white shadow-lg rounded-xl p-6">
      <div className="bg-orange-600 text-white px-6 py-4 flex items-center mb-4">
        <Wrench size={28} className="mr-3" />
        <h2 className="text-xl font-bold">Maintenance Requests</h2>
      </div>

      {requests.length === 0 ? (
        <div className="text-center py-6 text-gray-500">
          No maintenance requests
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left min-w-[1200px]">
            <thead className="bg-orange-50 text-xs text-orange-700 uppercase sticky top-0">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Room Number</th>
                <th className="px-4 py-3">Request Title</th>
                <th className="px-4 py-3">Request Description</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request) => (
                <tr
                  key={request._id}
                  className="border-b hover:bg-orange-50 transition-colors"
                >
                  <td className="px-4 py-3">
                    {request.resident?.name || "Unknown"}
                  </td>
                  <td className="px-4 py-3">
                    {request.resident?.email || "N/A"}
                  </td>
                  <td className="px-4 py-3">
                    {request.room?.roomNumber || "N/A"}
                  </td>
                  <td className="px-4 py-3">
                    {request.issueTitle || "Untitled Request"}
                  </td>
                  <td className="px-4 py-3">{request.issueDescription}</td>
                  <td className="px-4 py-3 flex items-center">
                    {getStatusIcon(request.status)}
                    {request.status}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleResolveRequest(request._id)}
                      className="bg-orange-600 text-white px-3 py-1 rounded hover:bg-orange-700 transition-colors"
                      disabled={request.status === "Resolved"}
                    >
                      Resolve
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default StaffMaintenanceRequests;
