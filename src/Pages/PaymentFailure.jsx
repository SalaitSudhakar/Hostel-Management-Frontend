import React from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentFailure = () => {
  const navigate = useNavigate();

  const goToHomePage = () => {
    navigate("/");  // Redirect to home page 
  };

  return (
    <div className="max-w-lg mx-auto my-10 bg-white p-8 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-6 text-red-500">OOPS! Payment Failed</h1>
      <p className="text-center text-lg mb-4">
        Your payment Failed.
      </p>
      <button
        onClick={goToHomePage}
        className="w-full bg-orange-600 text-white p-3 rounded-lg"
      >
        Go to Home
      </button>
    </div>
  );
};

export default PaymentFailure;
