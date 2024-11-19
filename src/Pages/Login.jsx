import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../Services/api";

const Login = () => {
  // States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  // validate payload
  const validatePayload = (payload) => {
    const { email, password } = payload;
    if (!email) return "Email is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return "Enter a valid email address.";
    if (!password) return "Password is required.";
    return null; // No errors
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const payload = { email, password };

      // form validation
      const validationError = validatePayload(payload);
      if (validationError) {
        setError(validationError);
        toast.error(validationError);
        return;
      }

      // API call
      const response = await api.post("/auth/login", payload);

      // Store token and role
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("token", response.data.token);
      toast.success(response.data.message);

      // Redirect to home page
      window.location.href = "/";

      // Reset form
      setEmail("");
      setPassword("");
      setError(null);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    // login
    <div className="container flex flex-col items-center mb-12 md:mb-20">
      <h3 className="mt-6 mb-2 font-bold text-lg text-orange-600">Log In</h3>
      <p className="text-gray-400 mb-6 text-center">
        Log into your account to access all the features
      </p>

      {/* error */}
      {error && (
        <div className="w-4/5 md:w-5/12 lg:w-3/12 bg-red-100 p-3 mb-4 text-red-600 rounded">
          {error}
        </div>
      )}

      {/* login form */}
      <form onSubmit={handleSubmit} className="w-4/5 md:w-5/12 lg:w-3/12">

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
            className="w-full border-2 border-blue-600 p-1 px-2 rounded-sm focus:outline-orange-600 focus:shadow-md"
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
            className="w-full border-2 border-blue-600 p-1 px-2 rounded-sm focus:outline-orange-600 focus:shadow-md"
          />

          {/* Show/hide password */}
          <button type="button" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? (
              <FaEyeSlash
                size={"25px"}
                className="absolute right-[2%] top-[58%]"
              />
            ) : (
              <FaEye size={"25px"} className="absolute right-[2%] top-[58%]" />
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

        {/* Login button */}
        <button
          type="submit"
          className="w-full my-4 font-medium bg-orange-600 text-white p-2 rounded-md  transition-transform transform hover:scale-95 hover:bg-orange-500 duration-100"
        >
          Login
        </button>
      </form>

      <div className="mt-3">
        Don't Have an Account?{" "}
        <Link
          to={"/register"}
          className="font-medium text-orange-600 hover:text-orange-400"
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default Login;
