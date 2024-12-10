import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../Services/api";
import PasswordInstructions from "../Components/PasswordInstructions";
import { ClipLoader } from "react-spinners";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { id, resetToken } = useParams();

  const validatePassword = (password) =>
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&/])[A-Za-z\d@$!%*?&/]{8,}$/.test(
      password
    );

  const checkPasswordMatch = () => {
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      setError("Passwords do not match");
      setPasswordMismatch(true);
      return false;
    }
    setPasswordMismatch(false);
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

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

    try {
      const response = await api.post(
        `/auth/reset-password/${id}/${resetToken}`,
        { password }
      );
      toast.success(response.data.message);
      setPassword("");
      setConfirmPassword("");
      setError(null);
      navigate("/login");
      setLoading(false);
    } catch (error) {
      console.error(error);
      toast.error(
        error?.response?.data?.message ||
          "An error occurred. Please try again later."
      );
      setError(
        error?.response?.data?.message ||
          "An error occurred. Please try again later."
      );
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen pt-24 bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-sm bg-white rounded-lg shadow-xl p-4 md:p-6">
        <div className="text-center mb-6">
          <h3 className="text-2xl  text-orange-600 mb-2 font-bold ">
            Reset Your Password
          </h3>
          <p className="text-gray-500 text-sm">
            Both passwords should match and meet security requirements.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4 text-center">
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 mb-5">
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-4 py-2 border-2 rounded-lg transition-all duration-300 ease-in-out ${
                  passwordMismatch
                    ? "border-red-500 focus:ring-red-300"
                    : "border-orange-200 focus:ring-orange-400 "
                } focus:outline-none focus:ring-2`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-orange-600 transition-colors"
              >
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </button>
            </div>
          </div>

          <div>
            <label
              htmlFor="confirm-password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Confirm Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="confirm-password"
              placeholder="Confirm your Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`w-full px-4 py-2 border-2 rounded-lg transition-all duration-300 ease-in-out ${
                passwordMismatch
                  ? "border-red-500 focus:ring-red-300"
                  : "border-gray-300 focus:border-orange-500 focus:ring-orange-300"
              } focus:outline-none focus:ring-2`}
            />
          </div>

          {password.length > 0 && <PasswordInstructions />}

          <button
            type="submit"
            className="w-full py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors duration-300 flex items-center justify-center space-x-2 disabled:opacity-50"
            disabled={loading}
          >
            <span>Update Password</span>
            {loading && <ClipLoader size={20} color="white" />}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
