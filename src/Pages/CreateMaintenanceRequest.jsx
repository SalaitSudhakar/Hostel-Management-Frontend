import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { FaExclamationCircle, FaCheckCircle, FaWrench, FaTags, FaHome, FaClipboardList } from "react-icons/fa";
import api from "../Services/api";

const CreateMaintenanceRequest = () => {
  const [issueTitle, setIssueTitle] = useState("");
  const [issueDescription, setIssueDescription] = useState("");
  const [priority, setPriority] = useState("low");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Directly use useSelector to access roomNumber from the Redux store
  const roomNumber = useSelector((state) => state.booking.roomNumber);

  // Throw an error if roomNumber is not available
  if (!roomNumber) {
    throw new Error("Room number not found.");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const requestData = {
      issueTitle,
      issueDescription,
      priority: priority.toLowerCase(),
      roomNumber: roomNumber,
    };

    try {
      const response = await api.post("/maintenance-request/create", requestData);
      toast.success(
        <div className="flex items-center">
          <FaCheckCircle className="mr-2 text-green-500" />
          {response.data.message}
        </div>
      );
      setLoading(false);

      // Clear the form fields
      setIssueTitle("");
      setIssueDescription("");
      setPriority("low");
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong");
      toast.error(
        <div className="flex items-center">
          <FaExclamationCircle className="mr-2 text-red-500" />
          {error.response?.data?.message}
        </div>
      );
      setLoading(false);
      console.error(error);
    }
  };

  return (
    <div className="w-full pt-24 pb-12 flex flex-col items-center bg-gradient-to-br from-orange-50 to-orange-100">
      <div className="w-[96%] md:w-6/12 lg:w-4/12 p-6 border border-orange-200 rounded-xl shadow-2xl bg-white">
        <h2 className="text-3xl font-bold mb-8 text-center text-orange-600 flex items-center justify-center">
          <FaWrench className="mr-3 text-orange-500" />
          Create Maintenance Request
        </h2>
        {error && (
          <div className="bg-red-50 p-4 text-red-700 rounded-lg mb-6 flex items-center border border-red-200">
            <FaExclamationCircle className="mr-3 text-red-500 text-xl" />
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="issueTitle" className="text-sm font-medium text-gray-700 mb-2 flex items-center">
              <FaClipboardList className="mr-2 text-orange-500" />
              Issue Title
            </label>
            <input
              type="text"
              id="issueTitle"
              className="w-full p-3 mt-1 border border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-300 transition-all duration-300"
              value={issueTitle}
              onChange={(e) => setIssueTitle(e.target.value)}
              required
              placeholder="Enter issue title"
            />
          </div>
          <div>
            <label htmlFor="issueDescription" className="text-sm font-medium text-gray-700 mb-2 flex items-center">
              <FaWrench className="mr-2 text-orange-500" />
              Issue Description
            </label>
            <textarea
              id="issueDescription"
              className="w-full p-3 mt-1 border border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-300 transition-all duration-300"
              rows="4"
              value={issueDescription}
              onChange={(e) => setIssueDescription(e.target.value)}
              required
              placeholder="Describe the maintenance issue in detail"
            />
          </div>
          <div>
            <label htmlFor="priority" className="text-sm font-medium text-gray-700 mb-2 flex items-center">
              <FaTags className="mr-2 text-orange-500" />
              Priority
            </label>
            <select
              id="priority"
              className="w-full p-3 mt-1 border border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-300 transition-all duration-300"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              required
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div>
            <label htmlFor="roomNumber" className="text-sm font-medium text-gray-700 mb-2 flex items-center">
              <FaHome className="mr-2 text-orange-500" />
              Room Number (read only)
            </label>
            <input
              type="text"
              id="roomNumber"
              className="w-full p-3 mt-1 border border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-300 transition-all duration-300"
              value={roomNumber}
              readOnly
              required
              placeholder="Enter room number"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full mt-6 py-3 text-white rounded-lg transition-all duration-300 flex items-center justify-center ${
              loading
                ? "bg-orange-400 cursor-not-allowed"
                : "bg-orange-600 hover:bg-orange-500 hover:shadow-lg"
            }`}
          >
            {loading ? (
              <ClipLoader size={20} color="#fff" />
            ) : (
              <>
                <FaWrench className="mr-2" />
                Create Maintenance Request
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateMaintenanceRequest;
