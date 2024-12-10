import React, { useEffect, useState } from "react";
import api from "../Services/api";
import { MdModeEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";

const Profile = () => {
  const [resident, setResident] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserProfile = async () => {
    try {
      const response = await api.get("/resident/profile");
      setResident(response.data.data);
      setLoading(false);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to fetch data");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile(); // Fetch profile when the component mounts
    localStorage.setItem("residentStatus", resident?.status || "Non Resident");
  }, [resident]);

  // If error occurs, display error message
  if (error) {
    return (
      <div className="w-full min-h-screen ">
        <div className=" flex justify-center items-center text-red-500 p-5 rounded-md">
          <p>{typeof error === "string" ? error : error.message}</p>
        </div>
      </div>
    );
  }

  /* Page Loading container */
  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
        <div className="w-24 h-24 border-[8px] border-t-orange-600 border-r-orange-600 border-b-orange-300 border-l-orange-300 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="w-full pt-8  bg-white py-6 min-h-[450px]">
      <div className="w-[96%] md:w-2/5 mx-auto p-6 border border-gray-400 rounded-md shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-orange-600 text-lg md:text-xl font-bold mb-4 ">
            Profile
          </h2>

          <Tooltip title="Edit" arrow>
            <Link
              to="/resident/profile/edit"
              className=" bg-gray-200 p-1 rounded-full border border-gray-800 hover:bg-orange-600 hover:text-white hover:border-white"
            >
              <MdModeEdit size={18} />
            </Link>
          </Tooltip>
        </div>
        <div className="space-y-4 text-sm md:text-base">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-gray-600">Name:</span>
            <span className="text-blue-800">{resident?.name || "N/A"}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-semibold text-gray-600">Email:</span>
            <span className="text-blue-800">{resident?.email || "N/A"}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-semibold text-gray-600">Phone Number:</span>
            <span className="text-blue-800">
              {resident?.phoneNumber || "N/A"}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-semibold text-gray-600">Room Number:</span>
            <span className="text-blue-800">
              {resident?.room?.roomNumber || "Not Booked"}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-semibold text-gray-600">
              Resident Status:
            </span>
            <span className="text-blue-800">
              {resident?.status || "Non Resident"}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-semibold text-gray-600">
              Emergency Contact Name:
            </span>
            <span className="text-blue-800">
              {resident?.emergencyContact?.name || "N/A"}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-semibold text-gray-600">
              Emergency Contact Phone:
            </span>
            <span className="text-blue-800">
              {resident?.emergencyContact?.phoneNumber || "N/A"}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-semibold text-gray-600">Relationship:</span>
            <span className="text-blue-800">
              {resident?.emergencyContact?.relationship || "N/A"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
