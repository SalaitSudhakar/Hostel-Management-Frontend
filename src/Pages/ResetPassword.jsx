import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../Services/api";
import PasswordInstructions from "../Components/PasswordInstructions";
import { ClipLoader } from "react-spinners";

const ResetPassword = () => {
  // States
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordMismatch, setPasswordMismatch] = useState(false); // Flag for password mismatch
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Navigate hook
  const navigate = useNavigate();

  // Get data from params
  const { id, resetToken } = useParams();

  // validate password
  const validatePassword = (password) =>
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&/])[A-Za-z\d@$!%*?&/]{8,}$/.test(
      password
    );

  // Check for password Match of both password fields
  const checkPasswordMatch = () => {
    // Check password match
    if (password !== confirmPassword) {
      // handle password mismatch
      toast.error("Passwords do not match");
      setError("Passwords do not match");
      setPasswordMismatch(true); // Set mismatch flag to true
      return false;
    }
    // password match
    setPasswordMismatch(false); // Set mismatch flag to false if passwords match
    return true;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when submission starts

    // Validate password and check match
    if (!validatePassword(password)) {
      toast.error(
        "Password must be at least 8 characters long, contain at least one number, one letter, and one special character"
      );
      setError(
        "Password must be at least 8 characters long, contain at least one number, one letter, and one special character"
      );
      setLoading(false);
      return;
    }

    if (!checkPasswordMatch()) {
      setLoading(false);
      return;
    }

    // Handle password reset request
    try {
      const response = await api.post(
        `/auth/reset-password/${id}/${resetToken}`,
        { password }
      );
      toast.success(response.data.message);

      // Reset form and error state
      setPassword("");
      setConfirmPassword("");
      setError(null);
      navigate("/login"); // Redirect to login page
      setLoading(false); // Stop loading after the request is successful
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.message ||
          "An error occurred. Please try again later."
      );
      setError(
        error?.response?.data?.message ||
          "An error occurred. Please try again later."
      );
      setLoading(false); // Ensure loading is stopped in case of an error
    }
  };

  return (
    <div className="container  mb-12 md:mb-20 mt-5 flex flex-col items-center">
      <div className="w-[96%] md:w-6/12 lg:w-4/12 p-3 md:p-4 flex flex-col items-center border border-gray-400 rounded-lg shadow-lg">
        <h3 className="mt-6 mb-2 font-bold text-2xl text-orange-600">
          Update Password
        </h3>
        <p className="text-gray-400 mb-6 text-center">
          Both Passwords should be matched
        </p>
        {/* Error */}
        {error && (
          <div className="w-full bg-red-100 p-3 mb-4 text-red-600 rounded">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full pb-3">
          {/* Password */}
          <div className="mb-6 relative">
            <label htmlFor="password" className="block my-2 font-medium">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              placeholder="Enter Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full border-2 ${
                passwordMismatch ? "border-red-600" : "border-blue-600"
              } p-1 px-2 rounded-sm focus:outline-orange-600 focus:shadow-md transition-transform transform  hover:border-gray-600 hover:bg-gray-100 duration-300 ease-in-out`}
            />
            {/* Toggle password visibility */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-[2%] top-[58%]"
            >
              {showPassword ? (
                <FaEyeSlash size={"25px"} />
              ) : (
                <FaEye size={"25px"} />
              )}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="mb-6 relative">
            <label
              htmlFor="confirm-password"
              className="block my-2 font-medium"
            >
              Confirm Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="confirm-password"
              id="confirm-password"
              placeholder="Enter your Password again"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`w-full border-2 ${
                passwordMismatch ? "border-red-600" : "border-blue-600"
              } p-1 px-2 rounded-sm focus:outline-orange-600 focus:shadow-md transition-transform transform  hover:border-gray-600 hover:bg-gray-100 duration-300 ease-in-out`}
            />
          </div>

          {/* Password instructions */}
          {password.length > 0 && <PasswordInstructions />}

          {/* Update Password button */}
          <button
            type="submit"
            className="w-full my-4 font-medium bg-orange-600 text-white p-2 rounded-md transition-transform transform hover:scale-95 hover:bg-orange-500 duration-100"
            disabled={loading}
          >
            Update Password {loading && <ClipLoader size={15} color="white" />}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
