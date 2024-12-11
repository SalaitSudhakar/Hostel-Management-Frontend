import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaHome, FaCreditCard, FaUser, FaBuilding } from "react-icons/fa";
import { AlertTriangle, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  const paymentData = useSelector((state) => state.booking);
  // Get details from Redux store
  const roomNumber = useSelector((state) => state.booking.roomNumber);
  const bookingId = useSelector((state) => state.booking.bookingId);
  const totalPrice = useSelector((state) => state.booking.totalPrice);
  const email = useSelector((state) => state.resident.email);
  const name = useSelector((state) => state.resident.name);

  const goToHomePage = () => {
    navigate("/"); // Redirect to home page after successful payment
  };

  // Page content if payment data is not available
  if (!paymentData || !paymentData.bookingId ) {
    return (
      <div className="min-h-screen flex justify-center flex-col items-center gap-4 text-gray-600 bg-gradient-to-br from-orange-50 to-amber-100">
        <div className="flex gap-2 items-center justify-center">
          <AlertTriangle className="mr-2 text-red-500 h-5" />
          <h2 className="text-lg md:text-xl font-bold text-gray-600">
            No room is booked yet.
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
    paymentData && (
      <div className="max-w-lg mx-auto my-10 bg-white p-8 rounded-lg shadow-lg border-2 border-orange-700">
        <CheckCircle color="green" size={100} className="mx-auto my-5" />
        <h1 className="text-3xl text-green-700 font-bold text-center mb-6">
          Payment Successful!
        </h1>
        <p className="text-center text-gray-600 text-lg mb-4">
          Your payment was successfully processed. Thank you for your purchase.
        </p>

        <div className="space-y-4 mb-6">
          <div className="flex items-center">
            <FaBuilding className="mr-2 text-orange-500" />
            <span className="text-sm font-medium">Room: {roomNumber}</span>
          </div>
          <div className="flex items-center">
            <FaCreditCard className="mr-2 text-orange-500" />
            <span className="text-sm font-medium">Booking ID: {bookingId}</span>
          </div>
          <div className="flex items-center">
            <FaCreditCard className="mr-2 text-orange-500" />
            <span className="text-sm font-medium">
              Total Price: ₹{totalPrice}
            </span>
          </div>
          <div className="flex items-center">
            <FaUser className="mr-2 text-orange-500" />
            <span className="text-sm font-medium">Name: {name}</span>
          </div>
          <div className="flex items-center">
            <FaUser className="mr-2 text-orange-500" />
            <span className="text-sm font-medium">Email: {email}</span>
          </div>
        </div>

        <button
          onClick={goToHomePage}
          className="w-full bg-orange-500 text-white p-3 rounded-lg flex items-center justify-center"
        >
          <FaHome className="mr-2" />
          Go Home
        </button>
      </div>
    )
  );
};

export default PaymentSuccess;
