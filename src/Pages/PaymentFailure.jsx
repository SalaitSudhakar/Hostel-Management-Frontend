import { XCircle, RefreshCw, AlertTriangle } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetBookingData } from "../Features/BookingSlice"; // Adjust according to your slice path
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

      toast.success("Booking cancelled successfully!");
      dispatch(resetBookingData()); // Reset booking data in the Redux store
      navigate("/"); // Navigate to the homepage after cancellation
    } catch (error) {
      console.error("Error canceling booking:", error);
      toast.error("Failed to cancel booking. Please try again later.");
    }
  };

  // Page content if payment data is not available
  if (!booking || !booking.bookingId || booking.paymentStatus) {
    return (
      <div className="min-h-screen flex justify-center flex-col items-center gap-4 text-gray-600 bg-gradient-to-br from-orange-50 to-amber-100">
        <div className="flex gap-2 items-center justify-center">
          <AlertTriangle className="mr-2 text-red-500 h-5" />
          <h2 className="text-lg md:text-xl font-bold text-gray-600">
            No booking data available or already paid.
          </h2>
        </div>
        <div>
          <Link
            to="/"
            className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
          >
            Go back to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    booking && (
      <div className="min-h-screen bg-gradient-to-bl from-orange-50 to-amber-100 flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center border-2 border-orange-700">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Payment Failed
          </h1>
          <p className="text-gray-600 mb-6">
            We are sorry, but there was an issue processing your payment.
          </p>
          <div className="bg-gray-50 rounded p-4 mb-6">
            <p className="text-sm text-gray-600 mb-2">Booking ID:</p>
            <p className="font-semibold text-gray-800 mb-4">
              {booking.bookingId}
            </p>
            <p className="text-sm text-gray-600 mb-2">Room Number:</p>
            <p className="font-semibold text-gray-800 mb-4">
              {booking.roomNumber}
            </p>
            <p className="text-sm text-gray-600 mb-2">Total Amount:</p>
            <p className="font-semibold text-gray-800">{`$${booking.totalPrice}`}</p>
          </div>
          <p className="text-gray-600 mb-8">
            Please try again or cancel your booking if needed.
          </p>
          <div className="space-y-2 md:space-y-4">
            <button
              onClick={handleRetry}
              className="w-full inline-flex items-center justify-center bg-orange-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-orange-700 transition-colors duration-300"
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
    )
  );
}
