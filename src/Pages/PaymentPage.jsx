import React, { useCallback, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux"; // Import Redux hooks
import api from "../Services/api";
import { setPaymentStatus } from "../Features/BookingSlice";
import { FaCheckCircle } from "react-icons/fa";
import { AlertTriangle } from "lucide-react";

const Payment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Accessing payment data from the booking slice in Redux
  const paymentData = useSelector((state) => state.booking);
  const paymentStatus = useSelector((state) => state.booking.paymentStatus);

  const OnCreateOrder = useCallback(async () => {
    try {
      const response = await api.post("/payment/create-order", {
        bookingId: paymentData.bookingId,
      });
      const { orderId } = response.data;

      if (!orderId) throw new Error("Order ID not found.");
      return orderId;
    } catch (error) {
      console.error("Error creating order:", error);
      const message =
        error.response?.data?.message || "Failed to create the payment order.";
      toast.error(message);
    }
  }, [paymentData.bookingId]);

  const OnApproveOrder = async (data) => {
    try {
      const { orderID } = data;
      if (!orderID) throw new Error("Invalid order ID from Paypal!");

      const response = await api.get(
        `/payment/capture-payment/${orderID}?bookingId=${paymentData.bookingId}`,
        {
          "content-Type": "application/json",
        }
      );
      const captureData = await response.data;

      toast.success("Payment successful!");
      dispatch(setPaymentStatus(true));
      localStorage.setItem("residentStatus", "active");
      window.location.href = "/payment-success";
    } catch (error) {
      toast.error("An error occurred while capturing the payment.");
      console.error("Capture Order Error:", error);
      navigate("/payment-failure");
    }
  };

  const OnError = (error) => {
    console.error("Error while processing payment:", error.message || error);
    alert("An error occurred during the payment process. Please try again.");
  };

  // Page content if payment data is not available
  if (!paymentData || !paymentData.bookingId) {
    return (
      <div className="min-h-screen flex justify-center flex-col items-center gap-4 text-gray-600 bg-gradient-to-br from-orange-50 to-amber-100">
        <div className="flex gap-2 items-center justify-center">
          <AlertTriangle className="mr-2 text-red-500 h-5" />
          <h2 className="text-lg md:text-xl font-bold text-gray-600">
            No booking data available.
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

  return paymentStatus ? (
    <div className="min-h-screen flex justify-center flex-col items-center gap-4 text-gray-600 bg-gradient-to-br from-orange-50 to-amber-100">
      <div className="flex gap-2 items-center justify-center">
        <FaCheckCircle className="mr-2 text-green-500 h-5" />
        <h2 className="text-lg md:text-2xl font-bold">
          You already have paid for a room
        </h2>
      </div>
      <div>
        <Link
          to="/"
          className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
        >
          Go to home
        </Link>
      </div>
    </div>
  ) : (
    <div className="max-w-lg mx-auto my-10 bg-white p-8 rounded-lg shadow-lg border-2 border-orange-700">
      <h1 className="text-3xl font-bold text-center mb-6">Payment</h1>
      <div className="mb-4">
        <label className="block text-gray-700">Room Number</label>
        <p>{paymentData.roomNumber}</p>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Booking ID</label>
        <p>{paymentData.bookingId}</p>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Total Price</label>
        <p>${paymentData.totalPrice}</p>
      </div>
      <PayPalScriptProvider
        options={{
          "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID,
          currency: "USD",
          environment: "sandbox",
        }}
      >
        <PayPalButtons
          style={{ layout: "vertical", color: "blue", shape: "rect" }}
          createOrder={OnCreateOrder}
          onApprove={OnApproveOrder}
          onError={OnError}
        />
      </PayPalScriptProvider>
    </div>
  );
};

export default React.memo(Payment); // Prevent unnecessary re-renders
