import { XCircle, RefreshCw, LifeBuoy } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setBookingData } from "../Features/BookingSlice";  // Adjust according to your slice path
import { toast } from "react-toastify";
import api from "../Services/api";

export default function PaymentResult() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get booking data from Redux store
  const booking = useSelector((state) => state.booking);

  // Function to handle retry (redirect to the payment page)
  const handleRetry = () => {
    navigate("/payment");
  };

  // Function to handle cancel booking (cancel based on bookingId)
  const handleCancelBooking = async () => {
    try {
      const response = await api.patch(`/booking/cancel/${booking.bookingId}`);
      if (response.status === 200) {
        toast.success("Booking cancelled successfully!");
        dispatch(setBookingData({}));  // Reset booking data in the Redux store
        navigate("/");  // Navigate to the homepage after cancellation
      }
    } catch (error) {
      console.error("Error canceling booking:", error);
      toast.error("Failed to cancel booking. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Payment Failed
        </h1>
        <p className="text-gray-600 mb-6">
          We are sorry, but there was an issue processing your payment.
        </p>
        <div className="bg-gray-50 rounded p-4 mb-6">
          <p className="text-sm text-gray-600 mb-2">Booking ID:</p>
          <p className="font-semibold text-gray-800 mb-4">{booking.bookingId}</p>
          <p className="text-sm text-gray-600 mb-2">Room Number:</p>
          <p className="font-semibold text-gray-800 mb-4">{booking.roomNumber}</p>
          <p className="text-sm text-gray-600 mb-2">Total Amount:</p>
          <p className="font-semibold text-gray-800">{`$${booking.totalPrice}`}</p>
        </div>
        <p className="text-gray-600 mb-8">
          Please try again or cancel your booking if needed.
        </p>
        <div className="flex flex-col md:block space-y-4 gap-4 ">
          <button
            onClick={handleRetry}
            className="w-full inline-flex items-center justify-center bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors duration-300"
          >
            <RefreshCw className="w-5 h-5 mr-2" />
            Try Again
          </button>
          <button
            onClick={handleCancelBooking}
            className="w-full inline-flex items-center justify-center bg-red-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-red-700 transition-colors duration-300"
          >
            <XCircle className="w-5 h-5 mr-2" />
            Cancel Booking
          </button>
         
        </div>
      </div>
    </div>
  );
}
