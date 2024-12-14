import React, { useState, useEffect } from 'react';
import { Wrench } from 'lucide-react';
import api from '../Services/api';
import { toast } from 'react-toastify';

const AssignStaff = () => {
  const [requests, setRequests] = useState([]);
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStaff, setSelectedStaff] = useState({}); // Manage dropdown states

  useEffect(() => {
    fetchRequests();
    fetchAvailableStaff();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await api.get('/maintenance-request/pending');
      setRequests(response.data.data);
    } catch (error) {
      toast.error('Failed to fetch requests', error);
      
    }
  };

  const fetchAvailableStaff = async () => {
    try {
      const response = await api.get('/staff/available');
      setStaff(response.data.data);
    } catch (error) {
      toast.error('Failed to fetch available staff', error);
      
    } finally {
      setLoading(false);
    }
  };

  const handleSelectChange = (requestId, staffId) => {
    setSelectedStaff((prev) => ({
      ...prev,
      [requestId]: staffId,
    }));
  };

  const handleAssignStaff = async (requestId) => {
    const staffId = selectedStaff[requestId];
    if (!staffId) {
      toast.warning('Please select a staff member before assigning.');
      return;
    }

    try {
      const response = await api.patch(`/maintenance-request/assign-staff/${requestId}`, { staffId });
      toast.success(response.data.message);
      fetchRequests();
      fetchAvailableStaff();
    } catch (error) {
      toast.error('Error assigning staff to request.', error);
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
      <div className="bg-orange-100  px-6 py-4 flex items-center mb-4">
        <Wrench size={28} className="mr-3" />
        <h2 className="text-xl font-bold text-orange-700">Assign Staff to Maintenance Requests</h2>
      </div>

      {requests.length === 0 ? (
        <div className="text-center py-6 text-gray-500">
          No pending maintenance requests
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left min-w-[1200px]">
            <thead className="bg-orange-50 text-xs text-orange-700 uppercase sticky top-0">
              <tr>
                <th className="px-4 py-3">Resident Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Room Number</th>
                <th className="px-4 py-3">Request Title</th>
                <th className="px-4 py-3">Request Description</th>
                <th className="px-4 py-3">Available Staff</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request) => (
                <tr
                  key={request._id}
                  className="border-b hover:bg-orange-50 transition-colors"
                >
                  <td className="px-4 py-3">{request.resident?.name || 'Unknown'}</td>
                  <td className="px-4 py-3">{request.resident?.email || 'N/A'}</td>
                  <td className="px-4 py-3">{request.room?.roomNumber || 'N/A'}</td>
                  <td className="px-4 py-3">{request.issueTitle || 'Untitled Request'}</td>
                  <td className="px-4 py-3">{request.issueDescription}</td>
                  <td className="px-4 py-3">
                    <select
                      className="border rounded px-2 py-1 w-full"
                      onChange={(e) => handleSelectChange(request._id, e.target.value)}
                      value={selectedStaff[request._id] || ''}
                    >
                      <option value="" disabled>
                        Select Staff
                      </option>
                      {staff.map((s) => (
                        <option key={s._id} value={s._id}>
                          {s.name} ({s.email})
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      className="bg-orange-600 text-white px-3 py-1 rounded hover:bg-orange-700 transition-colors"
                      onClick={() => handleAssignStaff(request._id)}
                      disabled={!staff.length || !selectedStaff[request._id]}
                    >
                      Assign
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

export default AssignStaff;
