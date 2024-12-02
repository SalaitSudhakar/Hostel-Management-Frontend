import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { toast } from "react-toastify";

const Payment = () => {
  const location = useLocation();
  const paymentData = location.state;

  const navigate = useNavigate();

  if (!paymentData) {
    return <div>No payment data available.</div>;
  }

  return (
    <div className="max-w-lg mx-auto my-10 bg-white p-8 rounded-lg shadow-lg">
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
        options={{ "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID }}
      >
        <PayPalButtons
          style={{ layout: "vertical", color: "blue", shape: "rect" }}
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [{ amount: { value: paymentData.totalPrice } }],
            });
          }}
          onApprove={(data, actions) => {
            return actions.order.capture().then((details) => {
              toast.success("Payment successful!");
              navigate("/")
            });
          }}
          onError={() => toast.error("An error occurred during payment.")}
        />
      </PayPalScriptProvider>
    </div>
  );
};

export default Payment;
