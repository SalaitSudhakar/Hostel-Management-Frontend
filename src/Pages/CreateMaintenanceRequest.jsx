import { useEffect, useState } from 'react';
import api from '../Services/api';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';

const CreateMaintenanceRequest = () => {
  const [issueTitle, setIssueTitle] = useState('');
  const [issueDescription, setIssueDescription] = useState('');
  const [priority, setPriority] = useState('Low');
  const [error, setError] = useState(null);
  const [room, setRoom] = useState('');
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)

    const requestData = {
      issueDescription,
      priority,
      status,
      room,
    };

    try {
      const response = await api.post('/maintenance-request/create', requestData);
      toast.success(response.data.message);
      setLoading(false);

      // Clear the form fields
      setIssueDescription('');
      setPriority('Low');
      setRoom('');
     
    } catch (error) {
      toast.error(error.response.data.message);
      setError(error.response.data.message);
      setLoading(false)
      console.error(error);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container pt-24  mb-12 md:mb-20 mt-5 flex flex-col items-center">
     <div className="w-[96%] md:w-6/12 lg:w-4/12 p-3 md:p-4 flex flex-col items-center border border-gray-400 rounded-lg shadow-lg">
      <h2 className="text-xl text-center md:text-2xl font-semibold my-6 mb-8 text-orange-600">Create Maintenance Request</h2>
      {/* error message */}
      {error && (
        <div className="w-4/5 md:w-5/12 lg:w-3/12 bg-red-100 p-3 mb-4 text-red-600 rounded">{error}</div>
      )}
      <form onSubmit={handleSubmit} className="w-full pb-3"> 
      <div className="mb-4">
          <label htmlFor="issueTitle" className="block text-xs md:text-sm font-medium text-gray-700">Issue Title</label>
          <input
            type="text"
            id="issuTitle"
            className="w-full p-2 mt-1 border border-gray-500 rounded-lg"
         
            value={issueTitle}
            onChange={(e) => setIssueTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="issueDescription" className="block text-sm font-medium text-gray-700">Issue Description</label>
          <textarea
            id="issueDescription"
            className="w-full p-2 mt-1 border border-gray-500 rounded-lg"
            rows="4"
            value={issueDescription}
            onChange={(e) => setIssueDescription(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="priority" className="block text-sm font-medium text-gray-700">Priority</label>
          <select
            id="priority"
            className="w-full p-2 mt-1 border border-gray-500 rounded-lg"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            required
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="room" className="block text-sm font-medium text-gray-700">Room</label>
          <input
            id="room"
            className="w-full p-2 mt-1 border border-gray-500 rounded-lg"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            required
          >
          </input>
        </div>

        <button
              type="submit"
              disabled={loading}
              className={`w-full my-4 font-medium ${
                loading ? "bg-orange-400 cursor-not-allowed" : "bg-orange-600"
              } text-white p-2 pr-2rounded-md transition-transform transform hover:scale-95 ${
                !loading ? "hover:bg-orange-500" : ""
              } duration-100 ease-in-out`}
            >
              Create {loading && <ClipLoader size={15} color="#fff" />}
            </button>
        
        </form>
        </div>
    </div>
  );
};

export default CreateMaintenanceRequest;
