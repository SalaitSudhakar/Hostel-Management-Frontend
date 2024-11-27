import React, { useEffect, useState } from "react";
import api from "../Services/api";
import { toast } from "react-toastify";

const MaintenanceRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch maintenance requests from backend
  useEffect(() => {
    const fetchRequests = async () => {
      window.scrollTo(0, 0);

      try {
        const response = await api.get("/maintenance-requests/get");
        setRequests(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setError("Failed to load maintenance requests");
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  // Function to resolve a maintenance request
  const resolveRequest = async (id) => {
    try {
      const response = await api.post("/maintenance-requests/resolve", {
        requestId: id,
      });

      if (response.status === 200) {
        toast.success("Request resolved successfully!");
        // Refresh the list
        setRequests((prevRequests) =>
          prevRequests.map((request) =>
            request._id === id ? { ...request, status: "Resolved" } : request
          )
        );
      }
    } catch (error) {
      console.error("Error resolving request:", error);
      toast.error(error.response.data.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return requests.length > 0 ? (
    <div className="p-6 pt-24">
      <h1 className="text-3xl font-semibold text-orange-600 text-center mb-6">
        Maintenance Requests
      </h1>

      {/* Card Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {requests.map((request) => (
          <div
            key={request._id}
            className="bg-white p-4 shadow-lg rounded-lg border border-gray-200"
          >
            <h2 className="text-xl font-semibold text-orange-600">
              {request.resident.name}
            </h2>
            <p className="text-gray-600">Room: {request.room.roomNumber}</p>
            <p className="text-gray-600 mt-2">
              <strong>Issue Description:</strong> {request.issueDescription}
            </p>
            <p className="text-gray-600 mt-2">
              <strong>Priority:</strong> {request.priority}
            </p>
            <p className="text-gray-600 mt-2">
              <strong>Status:</strong> {request.status}
            </p>

            {/* Resolve Button */}
            {request.status !== "Resolved" && (
              <button
                className="mt-4 bg-orange-600 text-white py-2 px-4 rounded hover:bg-orange-500 w-full"
                onClick={() => resolveRequest(request._id)}
              >
                Resolve
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div className="w-screen h-[380px] md:h-[500px] lg:h-[700px] flex justify-center items-center">
      <p>No requests added</p>
    </div>
  );
};

export default MaintenanceRequests;
