import React, { useEffect, useState } from "react";
import api from "../Services/api";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const Profile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [resident, setResident] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchResidentData = async () => {
      
      try {
        
        setLoading(true);
        const response = await api.get(`/resident/profile/${id}`);
        setResident(response.data.data); // Assuming the API sends the resident data under `data`
        dispatch(setResident(response.data.data));
        setLoading(false);
      } catch (err) {
        console.log(err);
        toast.error(err.response.data.message); 
        setLoading(false);
      }
    };

    fetchResidentData();
  }, [id, dispatch]);

  if (loading) {
    return <div className="text-center text-lg mt-4">Loading...</div>;
  }


  return (
    <div className="w-full bg-white py-6 min-h-[450px]">
      <div className="w-[96%] md:w-2/5 mx-auto p-6 border border-orange-600 rounded-md shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-orange-600 text-2xl font-bold mb-4">
            User Profile
          </h2>
          <div>Edit</div>
        </div>
        <div className="space-y-4">
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
              {resident?.room?.number || "Not Booked"}
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
              {resident?.emergencyContact?.phone || "N/A"}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-semibold text-gray-600">Status:</span>
            <span className="text-blue-800">
              {resident?.status?.status || "N/A"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
