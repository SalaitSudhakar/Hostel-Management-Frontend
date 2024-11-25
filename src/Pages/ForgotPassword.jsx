import React, { useState } from "react";
import { MdEmail } from "react-icons/md";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../Services/api";
import { CircleLoader, ClipLoader, DotLoader } from "react-spinners";

const ForgotPassword = () => {
  // States
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("resident"); // Default role is Resident
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
 
  // Validate Payload data
  const validatePayload = (email, role) => {
    if (!email) return "Email is required.";
    if (!role) return "Role is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return "Enter a valid email address.";
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setIsSuccess(false);

    // validate payload
    const validationError = validatePayload(email, role);
    if (validationError) {
      setLoading(false);
      setError(validationError);
      toast.error(validationError);
      return;
    }

    try {
      // Request and Response
      const response = await api.post("/auth/forgot-password", { email, role });
      toast.success(response.data.message);

      /* empty form fields */
      setEmail("");
      setRole("resident");
      setError(null);
      setIsSuccess(true);

      setLoading(false);
      // Redirect to login page
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error(
        error.response?.data?.message || "An error occurred, please try again."
      );
    }
  };

  return (
    // Forgot Password
    <div className="container  mb-12 md:mb-20 mt-5 flex flex-col items-center">
      <div className="w-[96%] md:w-6/12 lg:w-4/12 p-3 md:p-4 flex flex-col items-center border border-gray-400 rounded-lg shadow-lg">
      <h3 className="mt-6 mb-2 font-bold text-2xl text-orange-600">
        Reset Password
      </h3>
      <p className="text-gray-400 mb-6 text-center ">
        Email will be sent to your email address
        <br /> with password reset link
      </p>

      {/* Error */}
      {error && (
        <div className="w-4/5 md:w-5/12 lg:w-3/12  bg-red-100 p-3 mb-4 text-red-600 rounded">
          {error}
        </div>
      )}

      {isSuccess ? (
        <div className= "min-h-60 w-full">
          <div className="w-full p-4 flex justify-center items-center rounded-md text-center mb-4">
           <p className="w-3/5 md:w-1/3 p-2 leading-loose tracking-wide bg-green-100  text-green-800"> A password reset email has been sent to your email address. Please
            check your inbox to proceed.</p>
          </div>
        </div>
      ) : (
        <>
          {/* Role Selection Buttons */}
          <div className="flex justify-center space-x-4 mb-6">
            <button
              onClick={() => setRole("resident")}
              className={`py-2 px-4 rounded-sm  ${
                role === "resident"
                  ? "bg-orange-600 text-white shadow-md scale-105"
                  : "bg-gray-300  text-gray-600 hover:bg-orange-500 hover:text-white hover:shadow-lg hover:scale-105"
              }`}
            >
              Resident
            </button>
            <button
              onClick={() => setRole("staff")}
              className={`py-2 px-4 rounded-sm ${
                role === "staff"
                  ? "bg-orange-600 text-white shadow-md scale-105"
                  : "bg-gray-300  text-gray-600 hover:bg-orange-500 hover:text-white hover:shadow-lg hover:scale-105"
              }`}
            >
              Staff
            </button>
            <button
              onClick={() => setRole("admin")}
              className={`py-2 px-4 rounded-sm ${
                role === "admin"
                  ? "bg-orange-600 text-white shadow-md scale-105"
                  : "bg-gray-300  text-gray-600 hover:bg-orange-500 hover:text-white hover:shadow-lg hover:scale-105"
              }`}
            >
              Admin
            </button>
          </div>
          {/* Form  */}
          <form onSubmit={handleSubmit} className="w-full pb-3">
            {/* Email */}
            <div className="mb-6 relative">
              <label htmlFor="email" className="block my-2 font-medium">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter Your Email ID"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border-2 border-blue-600 p-1 px-2 rounded-sm focus:outline-orange-600 focus:shadow-md transition-transform transform  hover:border-gray-600 hover:bg-gray-100 duration-300 ease-in-out"
              />

              <MdEmail
                size={"25px"}
                className="absolute right-[2%] top-[58%]"
              />
            </div>

            {/* Send Email Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full my-4 font-medium ${
                loading ? "bg-orange-400 cursor-not-allowed" : "bg-orange-600"
              } text-white p-2 pr-2rounded-md transition-transform transform hover:scale-95 ${
                !loading ? "hover:bg-orange-500" : ""
              } duration-100 ease-in-out`}
            >
              Send {loading && <ClipLoader size={15} color="#fff" />}
            </button>
          </form>
        </>
      )}
    </div>
    </div>
  );
};

export default ForgotPassword;
