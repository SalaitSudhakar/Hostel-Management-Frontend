import React from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentSuccess = () => {
  const navigate = useNavigate();

  const goToHomePage = () => {
    navigate("/");  // Redirect to home page after successful payment
  };

  return (
    <div className="max-w-lg mx-auto my-10 bg-white p-8 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-6">Payment Successful!</h1>
      <p className="text-center text-lg mb-4">
        Your payment was successfully processed. Thank you for your purchase.
      </p>
      <button
        onClick={goToHomePage}
        className="w-full bg-blue-500 text-white p-3 rounded-lg"
      >
        Go to Home
      </button>
    </div>
  );
};

export default PaymentSuccess;
