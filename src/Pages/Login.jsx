import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../Services/api";
import PasswordInstructions from "../Components/PasswordInstructions";
import { ClipLoader } from "react-spinners";

const Login = () => {
  // States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("resident"); // Default role is Resident
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const naviagate = useNavigate();

  // validate payload
  const validatePayload = (payload) => {
    const { email, password, role } = payload;
    if (!email) return "Email is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return "Enter a valid email address.";
    if (!password) return "Password is required.";
    if (!role) return "Role is required.";
    return null; // No errors
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const payload = { email, password, role };

    // form validation
    const validationError = validatePayload(payload);
    if (validationError) {
      setLoading(false);
      setError(validationError);
      toast.error(validationError);
      return;
    }
    try {
      // API call
      const response = await api.post("/auth/login", payload);

      // Store token and role
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);

      console.log(response.data);

      toast.success(response.data.message);

      // Reset form
      setEmail("");
      setPassword("");
      setRole("resident");
      setError(null);

      // Redirect to home page
      naviagate("/");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  return (
    // login
    <div className="container  mb-12 md:mb-20 mt-5 flex flex-col items-center">
      <div className="w-[96%] md:w-6/12 lg:w-4/12 p-3 md:p-4 flex flex-col items-center border border-gray-400 rounded-lg shadow-lg">
        <h3 className="mt-6 mb-2 font-bold text-2xl text-orange-600">Log In</h3>
        <p className="text-gray-400 mb-6 text-center">
          Log into your account to access all the features
        </p>

        {/* error */}
        {error && (
          <div className="w-full bg-red-100 p-3 mb-4 text-red-600 rounded">
            {error}
          </div>
        )}

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

        {/* login form */}
        <form onSubmit={handleSubmit} className="w-full pb-3">
          {/* Email field */}
          <div className="mb-6 relative">
            <label htmlFor="email" className="block my-2 font-medium">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-2 border-blue-600 p-1 px-2 rounded-sm focus:outline-orange-600 focus:shadow-md transition-transform transform  hover:border-gray-600 hover:bg-gray-100 duration-300 ease-in-out"
            />

            <MdEmail size={"25px"} className="absolute right-[2%] top-[58%]" />
          </div>

          {/* Password field */}
          <div className="mb-6 relative">
            <label htmlFor="password" className="block my-2 font-medium">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-2 border-blue-600 p-1 px-2 rounded-sm focus:outline-orange-600 focus:shadow-md transition-transform transform  hover:border-gray-600 hover:bg-gray-100 duration-300 ease-in-out"
            />

            {/* Show/hide password */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <FaEyeSlash
                  size={"25px"}
                  className="absolute right-[2%] top-[58%]"
                />
              ) : (
                <FaEye
                  size={"25px"}
                  className="absolute right-[2%] top-[58%]"
                />
              )}
            </button>
          </div>

          {/* Forgot password link */}
          <div className="text-end me-4">
            <Link
              to={"/forgot-password"}
              className="text-orange-600 underline hover:text-orange-400"
            >
              Forgot Password
            </Link>
          </div>

          {/* Password instructions */}
          {password.length > 0 && <PasswordInstructions />}

          {/* Login button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full my-4 font-medium ${
              loading ? "bg-orange-400 cursor-not-allowed" : "bg-orange-600"
            } text-white p-2 rounded-md transition-transform transform hover:scale-95 ${
              !loading ? "hover:bg-orange-500" : ""
            } duration-100 ease-in-out`}
          >
            Login {loading && <ClipLoader size={15} color="#fff" />}
          </button>

          {/* Don't have an account link */}
          <div className="mt-3 text-center">
            Don't Have an Account?{" "}
            <Link
              to={"/register"}
              className="font-medium text-orange-600 hover:text-orange-400"
            >
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
