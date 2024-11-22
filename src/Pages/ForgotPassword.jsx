import axios from "axios";
import React, { useState } from "react";
import { MdEmail } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../Services/api";

const ForgotPassword = () => {
  // States
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Validate Payload data
  const validatePayload = (email) => {
    if (!email) return "Email is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return "Enter a valid email address.";
  };


  // Handle form submission
  const handleSubmit = async (e) => {

      // validate payload
      const validationError = validatePayload(email);
      if (validationError) {
        setError(validationError);
        toast.error(validationError);
        return;
      }

    try {
      e.preventDefault();

      // Request and Response
      const response = await api.post("/auth/forgot-password", { email});
      toast.success(response.data.message);

      // Redirect to login page
      navigate("/login");

      /* empty form fields */
      setEmail("");
      setError(null);
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message || "An error occurred, please try again."
      );
    }
  };

  return (
    // Forgot Password
    <div className="container flex flex-col items-center mb-12 md:mb-20 lg:min-h-96">
      <h3 className="mt-6 mb-2 font-bold text-2xl text-orange-600">
       Reset Password
      </h3>
      <p className="text-gray-400 mb-6 text-center ">
        Email will be sent to your email address
        <br /> with password reset link
      </p>

      {/* Error */}
      {error && (
        <div className="w-4/5 md:w-5/12 lg:w-3/12  bg-red-100 p-3 mb-4 text-red-600 rounded">{error}</div>
      )}

      {/* Form  */}
      <form onSubmit={handleSubmit} className=" w-4/5 md:w-5/12 lg:w-3/12">

      {/* Email */}
        <div className="mb-6 relative">
        <label htmlFor="email" className="block my-2 font-medium">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter Your Email ID"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border-2 border-blue-600 p-1 px-2 rounded-sm focus:outline-orange-600 focus:shadow-md"
          />
         
          <MdEmail size={"25px"} className="absolute right-[2%] top-[58%]" />
        </div>

        {/* Send Email Button */}
        <button
          type="submit"
          className="w-full my-4 font-medium bg-orange-600 text-white p-2 rounded-md  transition-transform transform hover:scale-95 hover:bg-orange-500 duration-100"
        >
          Send Email
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
