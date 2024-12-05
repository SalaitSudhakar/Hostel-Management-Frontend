import React, { useMemo, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { toast } from "react-toastify";
import api from "../Services/api";

const Payment = () => {
  const location = useLocation();
  const paymentData = useMemo(() => location.state, [location.state]); // Memoize state
  const navigate = useNavigate();

  const createOrder = useCallback(async () => {
    try {
      const response = await api.post("/payment/create-order", {
        bookingId: paymentData.bookingId,
      });
      const { approvalUrl } = response.data;
      console.log(approvalUrl)
  
      if (approvalUrl) {
        window.location.href = approvalUrl;
      } else {
        throw new Error("Approval URL not found.");
      }
    } catch (error) {
      console.error("Error creating order:", error);
      const message = error.response?.data?.message || "Failed to create the payment order.";
      toast.error(message);
    }
  }, [paymentData.bookingId]);

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
        options={{ "client-id": import.meta.env.REACT_APP_PAYPAL_CLIENT_ID || "AXFy4klbr_5JrtSrjW97c2XMIfnK6-nFPo0V3tsAi3tL-8adQwEz5BwfkOCFoN41ssrrhX84APfEzmew",
          currency: "USD", 
          environment: "sandbox"
         }}
      >
        <PayPalButtons
          style={{ layout: "vertical", color: "blue", shape: "rect" }}
          createOrder={createOrder}
          onApprove={async (data) => {
            try {
              const response = await api.post("/payment/capture-payment", {
                bookingId: paymentData.bookingId,
                orderId: data.orderID,
              });
              const orderData = await response.data;

              console.log("Capture Order Response:", orderData);
              toast.success("Payment successful!");
              navigate("/");
            } catch (error) {
              toast.error("An error occurred while capturing the payment.");
              console.error("Capture Order Error:", error);
            }
          }}
          onError={() => toast.error("An error occurred during payment.")}
        />
      </PayPalScriptProvider>
    </div>
  );
};

export default React.memo(Payment); // Prevent unnecessary re-renders