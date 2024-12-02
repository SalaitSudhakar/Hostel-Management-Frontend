import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../Services/api";

const ReserveRoom = () => {
  const [formData, setFormData] = useState({
    roomId: "",
    checkInDate: "",
    checkOutDate: "",
    guests: { adults: 1, children: 0, infantsUnder2: 0},
  });
  const [error, setError] = useState("");
  const [roomNum, setRoomNum] = useState("");
  const navigate = useNavigate();
  const { roomNumber } = useParams();
  const location = useLocation();
  const roomId = location.state?.roomId || "";

  const today = new Date();
  const todayFormatted = today.toISOString().split("T")[0];

  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token){
      navigate("/login")
    }
    if (roomId && roomNumber) {
      setFormData((prevData) => ({ ...prevData, roomId }));
      setRoomNum(roomNumber);
    }
  }, [navigate, token, roomId, roomNumber]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name in formData.guests) {
      setFormData((prevData) => ({
        ...prevData,
        guests: { ...prevData.guests, [name]: parseInt(value) || 0 },
      }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleReserve = async () => {
    setError("");

    const formatDate = (date) => {
      const d = new Date(date);
      if (isNaN(d.getTime())) {
        setError("Invalid date format. Please check the dates.");
        return "";
      }
      d.setHours(14, 0, 0, 0);
      return d.toISOString();
    };

    const checkInDateFormatted = formatDate(formData.checkInDate);
    const checkOutDateFormatted = formatDate(formData.checkOutDate);

    if (!checkInDateFormatted || !checkOutDateFormatted) return;

    const bookingData = {
      roomId: formData.roomId,
      checkInDate: checkInDateFormatted,
      checkOutDate: checkOutDateFormatted,
      guests: formData.guests,
    };

    try {
      const response = await api.post("booking/create", bookingData);
      const booking = response.data.booking;

      toast.success("Room reserved successfully!");
      navigate("/payment", {
        state: {
          roomId: formData.roomId,
          roomNumber: roomNum,
          bookingId: booking.id,
          checkInDate: formData.checkInDate,
          checkOutDate: formData.checkOutDate,
          totalPrice: booking.totalPrice,
        },
      });
    } catch (error) {
      toast.error("An error occurred while making the reservation.");
      setError(error.response.data.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto my-10 bg-white p-8 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-6">Reserve Your Room</h1>
      <div className="mb-4">
        <label className="block text-gray-700">Room ID</label>
        <p className="text-lg font-semibold">{formData.roomId}</p>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Room Number</label>
        <p className="text-lg font-semibold">{roomNum}</p>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Check-in Date</label>
        <input
          type="date"
          name="checkInDate"
          value={formData.checkInDate}
          onChange={handleInputChange}
          min={todayFormatted}
          className="w-full p-3 border rounded-lg"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Check-out Date</label>
        <input
          type="date"
          name="checkOutDate"
          value={formData.checkOutDate}
          onChange={handleInputChange}
          min={formData.checkInDate || todayFormatted}
          className="w-full p-3 border rounded-lg"
          required
        />
      </div>

      {/* Guests Fields */}
      <div className="mb-4">
        <label className="block text-gray-700">Adults</label>
        <input
          type="number"
          name="adults"
          value={formData.guests.adults}
          onChange={handleInputChange}
          className="w-full p-3 border rounded-lg"
          min="1"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Children</label>
        <input
          type="number"
          name="children"
          value={formData.guests.children}
          onChange={handleInputChange}
          className="w-full p-3 border rounded-lg"
          min="0"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Infants (Under 2)</label>
        <input
          type="number"
          name="infantsUnder2"
          value={formData.guests.infantsUnder2}
          onChange={handleInputChange}
          className="w-full p-3 border rounded-lg"
          min="0"
        />
      </div>
     
      {error && <div className="text-red-600 mb-4">{error}</div>}
      <button
        onClick={handleReserve}
        className="w-full py-3 mt-4 bg-orange-600 text-white font-semibold rounded-lg transition-none hover:scale-95 hover:bg-orange-500"
      >
        Reserve Room
      </button>
    </div>
  );
};

export default ReserveRoom;
