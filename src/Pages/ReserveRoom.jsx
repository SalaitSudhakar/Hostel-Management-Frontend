import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../Services/api";
import { useDispatch, useSelector } from "react-redux";
import { resetBookingData, setBookingData } from "../Features/BookingSlice";
import {
  Calendar,
  Users,
  User,
  Baby,
  Hotel,
  MapPin,
  AlertTriangle,
  CreditCard,
  XCircle,
} from "lucide-react";

const ReserveRoom = () => {
  const [formData, setFormData] = useState({
    roomId: "",
    checkInDate: "",
    checkOutDate: "",
    guests: { adults: 1, children: 0, infantsUnder2: 0 },
  });
  const [error, setError] = useState("");
  const [roomNum, setRoomNum] = useState("");
  const navigate = useNavigate();
  const { roomNumber } = useParams();
  const location = useLocation();
  const roomId = location.state?.roomId || "";

  const today = new Date();
  const todayFormatted = today.toISOString().split("T")[0];

  // Redux hooks
  const dispatch = useDispatch();
  const bookingData = useSelector((state) => state.booking);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
    if (roomId && roomNumber) {
      setFormData((prevData) => ({ ...prevData, roomId }));
      setRoomNum(roomNumber);
    }
    // Prefill form if booking data is available in Redux
    if (bookingData && bookingData.roomId) {
      setFormData({
        roomId: bookingData.roomId,
        checkInDate: bookingData.checkInDate,
        checkOutDate: bookingData.checkOutDate,
        guests: bookingData.guests || {
          adults: 1,
          children: 0,
          infantsUnder2: 0,
        },
      });
      setRoomNum(bookingData.roomNumber);
    }
  }, [navigate, token, roomId, roomNumber, bookingData]);

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

      // Store the booking data in Redux
      dispatch(
        setBookingData({
          roomId: formData.roomId,
          roomNumber: roomNum,
          bookingId: booking.id,
          checkInDate: formData.checkInDate,
          checkOutDate: formData.checkOutDate,
          totalPrice: booking.totalPrice,
          paymentStatus: false,
        })
      );

      navigate("/payment");
    } catch (error) {
      toast.error("An error occurred while making the reservation.");
      setError(error.response?.data?.message || "An unknown error occurred.");
    }
  };

  const id = bookingData.bookingId;
  // Cancel Booking
  const handleCancelBooking = async () => {
    try {
      const response = await api.patch(`/booking/cancel/${id}`);
      if (bookingData.paymentStatus) {
        try {
          const refundResponse = await api.post(
            `/payment/refunt-payment`,
            bookingData.bookingId
          );
        } catch (error) {
          console.log(error);
        }
      }
      toast.success("Booking cancelled successfully.");
      dispatch(resetBookingData());
      navigate("/");
    } catch (err) {
      toast.error("Failed to cancel booking. Try again later.");
      console.log(err);
    }
  };

  // Pay Now
  const handlePayNow = () => {
    navigate("/payment");
  };

  return (
    <div className="max-w-xl mx-auto my-10 bg-white p-8 rounded-2xl shadow-2xl">
      <h1 className="text-xl md:text-3xl font-bold text-center mb-8 text-orange-600 flex items-center justify-center gap-3">
        <Hotel className="w-8 h-8 md:w-10 md:h-10" />{" "}
        {bookingData.bookingId ? "Your Booking Details" : "Reserve Your Room"}
      </h1>

      {bookingData.bookingId ? (
        // Display Redux Data
        <div className="space-y-6">
          <div className="text-gray-600 text-center -mt-4 text-sm">
            You have already booked a room. Below are the details
          </div>
          <div className="flex items-center gap-3  md:gap-4 bg-orange-50 p-2 md:p-4 rounded-lg">
            <MapPin className="text-orange-600 w-4 h-4 md:w-6 md:h-6" />
            <div>
              <p className="text-gray-700 text-sm">Room ID</p>
              <p className="text-base md:text-lg font-semibold text-orange-800">
                {bookingData.roomId}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 md:gap-4 bg-orange-50 p-4 rounded-lg">
            <Hotel className="text-orange-600 w-4 h-4 md:w-6 md:h-6" />
            <div>
              <p className="text-gray-700 text-sm">Room Number</p>
              <p className="text-base md:text-lg font-semibold text-orange-800">
                {bookingData.roomNumber}
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Calendar className="text-orange-600 w-6 h-6" />
              <p className="text-gray-700">
                Check-in Date:{" "}
                <span className="font-semibold text-orange-800">
                  {bookingData.checkInDate}
                </span>
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Calendar className="text-orange-600 w-6 h-6" />
              <p className="text-gray-700">
                Check-out Date:{" "}
                <span className="font-semibold text-orange-800">
                  {bookingData.checkOutDate}
                </span>
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Users className="text-orange-600 w-6 h-6" />
              <p className="text-gray-700">
                Guests: {bookingData.guests.adults} Adults,{" "}
                {bookingData.guests.children} Children,
                {bookingData.guests.infantsUnder2} Infants
              </p>
            </div>
            <div className="flex items-center gap-4">
              <CreditCard className="text-orange-600 w-6 h-6" />
              <p className="text-gray-700">
                Total Price:{" "}
                <span className="font-semibold text-orange-800">
                  ${bookingData.totalPrice}
                </span>
              </p>
            </div>
          </div>

          {/* Only show "Pay Now" if paymentStatus is false */}

          {!bookingData.paymentStatus && (
            <div className="flex flex-col md:flex-row gap-4 justify-between mt-6">
              <button
                onClick={handleCancelBooking}
                className="flex items-center gap-2 px-4 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700"
              >
                <XCircle className="w-5 h-5" /> Cancel Booking
              </button>
              <button
                onClick={handlePayNow}
                className="flex items-center gap-2 px-4 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700"
              >
                <CreditCard className="w-5 h-5" /> Pay Now
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center gap-4 bg-orange-50 p-2 md:p-4 rounded-lg">
            <MapPin className="text-orange-600 w-4 h-4 md:w-6 md:h-6" />
            <div>
              <label className="block text-gray-700 text-xs md:text-sm">
                Room ID
              </label>
              <p className="text-base md:text-lg font-semibold text-orange-800">
                {formData.roomId}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-orange-50 p-3 md:p-4 rounded-lg">
            <Hotel className="text-orange-600 w-6 h-6" />
            <div>
              <label className="block text-gray-700  text-xs md:text-sm">
                Room Number
              </label>
              <p className="text-lg font-semibold text-orange-800">{roomNum}</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="relative">
              <label className=" text-gray-700 mb-2 flex items-center gap-2  text-sm md:text-base">
                <Calendar className="text-orange-600 w-5 h-5" /> Check-in Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  name="checkInDate"
                  value={formData.checkInDate}
                  onChange={handleInputChange}
                  min={todayFormatted}
                  className="w-full p-3 pl-10 border rounded-lg focus:ring-2 focus:ring-orange-300"
                  required
                />
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            <div className="relative">
              <label className=" text-gray-700 mb-2 flex items-center gap-2 text-sm md:text-base">
                <Calendar className="text-orange-600 w-5 h-5" /> Check-out Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  name="checkOutDate"
                  value={formData.checkOutDate}
                  onChange={handleInputChange}
                  min={formData.checkInDate || todayFormatted}
                  className="w-full p-3 pl-10 border rounded-lg focus:ring-2 focus:ring-orange-300"
                  required
                />
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <User className="text-orange-600 w-6 h-6" />
              <div className="flex-grow">
                <label className="block text-gray-700 mb-2 text-sm md:text-base">
                  Adults
                </label>
                <input
                  type="number"
                  name="adults"
                  value={formData.guests.adults}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-300"
                  min="1"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Users className="text-orange-600 w-6 h-6" />
              <div className="flex-grow">
                <label className="block text-gray-700 mb-2 text-sm md:text-base">
                  Children
                </label>
                <input
                  type="number"
                  name="children"
                  value={formData.guests.children}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-300"
                  min="0"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Baby className="text-orange-600 w-6 h-6" />
              <div className="flex-grow">
                <label className="block text-gray-700 mb-2 text-sm md:text-base">
                  Infants (Under 2)
                </label>
                <input
                  type="number"
                  name="infantsUnder2"
                  value={formData.guests.infantsUnder2}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-300"
                  min="0"
                />
              </div>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-300 text-red-600 p-4 rounded-lg flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-red-500" />
              {error}
            </div>
          )}

          <button
            onClick={handleReserve}
            className="w-full py-4 mt-4 bg-orange-600 text-white font-semibold rounded-lg 
          transition-all duration-300 ease-in-out 
          hover:bg-orange-700 hover:shadow-lg 
          active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-orange-300"
          >
            Reserve Room
          </button>
        </div>
      )}
    </div>
  );
};

export default ReserveRoom;
