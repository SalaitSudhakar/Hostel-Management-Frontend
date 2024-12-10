import React, { useEffect, useState } from "react";
import { MdEmail } from "react-icons/md";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../Services/api";
import { ClipLoader } from "react-spinners";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("resident"); 
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validatePayload = (email, role) => {
    if (!email) return "Email is required.";
    if (!role) return "Role is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return "Enter a valid email address.";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setIsSuccess(false);

    const validationError = validatePayload(email, role);
    if (validationError) {
      setLoading(false);
      setError(validationError);
      toast.error(validationError);
      return;
    }

    try {
      const response = await api.post("/auth/forgot-password", { email, role });
      toast.success(response.data.message);
      setEmail("");
      setRole("resident");
      setError(null);
      setIsSuccess(true);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(
        error.response?.data?.message || "An error occurred, please try again."
      );
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="min-h-screen pt-12 bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center px-4 px-4 md:py-8">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl overflow-hidden">
        <div className="p-4 md:p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-orange-600 mb-3">
              Reset Password
            </h2>
            <p className="text-gray-500">
              Enter your email to receive a password reset link
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-6 text-center">
              {error}
            </div>
          )}

          {/* Success Message */}
          {isSuccess && (
            <div className="bg-green-100 text-green-600 p-3 rounded-lg mb-6 text-center">
              A password reset email has been sent to your email address.
            </div>
          )}

          {!isSuccess && (
            <>
              {/* Role Selection */}
              <div className="flex justify-center space-x-3 md:space-x-4 mb-8">
                {["resident", "staff", "admin"].map((userRole) => (
                  <button
                    key={userRole}
                    onClick={() => setRole(userRole)}
                    className={`capitalize text-sm md:text-base py-2 px-3 md:px-4 rounded-lg transition-all duration-300 ${
                      role === userRole
                        ? "bg-orange-600 text-white shadow-md scale-105"
                        : "bg-gray-200 text-gray-700 hover:bg-orange-100 hover:text-orange-600"
                    }`}
                  >
                    {userRole}
                  </button>
                ))}
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Input */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full pl-10 pr-4 py-2 border-2 border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent transition duration-300"
                    />
                    <MdEmail
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-400"
                      size={20}
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-3 rounded-lg text-white font-semibold transition-all duration-300 ${
                    loading
                      ? "bg-orange-400 cursor-not-allowed"
                      : "bg-orange-600 hover:bg-orange-700 hover:scale-[0.98]"
                  }`}
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <ClipLoader size={20} color="#fff" />
                      <span className="ml-2">Submitting...</span>
                    </div>
                  ) : (
                    "Send Reset Link"
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
