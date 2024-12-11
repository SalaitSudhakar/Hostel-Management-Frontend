import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../Services/api";
import PasswordInstructions from "../Components/PasswordInstructions";
import { ClipLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { setBookingData } from "../Features/BookingSlice";
import { setResidentDetails } from "../Features/ResidenSlice";

const Login = () => {
  // States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("resident");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // State to track if the profile has already been fetched
  const [bookingFetched, setBookingFetched] = useState(false);

  // validate payload
  const validatePayload = (payload) => {
    const { email, password, role } = payload;
    if (!email) return "Email is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return "Enter a valid email address.";
    if (!password) return "Password is required.";
    if (!role) return "Role is required.";
    return null;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
      // API call to login
      const response = await api.post("/auth/login", payload);

      if (response.data && response.data.token && response.data.role) {
        // Store token and role
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);
        localStorage.setItem("residentStatus", response.data.residentStatus);

        const residentName = response.data.name;
        const residentEmail = response.data.email;

        // Dispatch the resident details to Redux store
        dispatch(
          setResidentDetails({ name: residentName, email: residentEmail })
        );

        // Fetch booking data if user is a resident and not already fetched
        if (response.data.role === "resident" && !bookingFetched) {
          const bookingResponse = await api.get("/resident/get-booking", {
            headers: { Authorization: `Bearer ${response.data.token}` },
          });

          if (
            bookingResponse.data &&
            bookingResponse.data.data &&
            bookingResponse.data.data.length > 0
          ) {
            // Filter bookings just in case any cancelled ones pass through
            const activeBookings = bookingResponse.data.data.filter(
              (booking) => booking.bookingStatus !== "cancelled"
            );

            if (activeBookings.length > 0) {
              const bookingData = activeBookings[0]; //  take the first active booking

              // Extract only the required fields
              const bookingPayload = {
                roomId: bookingData.room._id,
                roomNumber: bookingData.room.roomNumber,
                bookingId: bookingData._id,
                checkInDate: bookingData.checkInDate,
                checkOutDate: bookingData.checkOutDate,
                totalPrice: bookingData.priceBreakdown.totalPrice,
                paymentStatus: bookingData.payment.status,
                guests: bookingData.guests || {
                  adults: 1,
                  children: 0,
                  infantsUnder2: 0,
                },
              };

              // Dispatch only the required booking data to Redux store
              dispatch(setBookingData(bookingPayload));
              setBookingFetched(true); // Mark booking data as fetched
            } else {
              console.log("No active bookings found.");
            }
          } else {
            console.log("No bookings found.");
          }
        }

        toast.success(response.data.message);

        // Redirect to home page
        navigate("/");

        // Reset form
        setEmail("");
        setPassword("");
        setRole("resident");
        setError(null);
      } else {
        toast.error("Invalid response data.");
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Login failed.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center px-2 md:px-4 py-8">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl overflow-hidden">
        <div className="px-4 py-6 md:p-8">
          {/* Login Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-orange-600 mb-3">
              Welcome Back
            </h2>
            <p className="text-gray-500">Log in to access your account</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-6 text-center">
              {error}
            </div>
          )}

          {/* Role Selection */}
          <div className="flex justify-center space-x-3 md:space-x-4 mb-8">
            {["resident", "staff", "admin"].map((userRole) => (
              <button
                key={userRole}
                onClick={() => setRole(userRole)}
                className={`text-sm md:text-base capitalize py-2 px-4 rounded-lg transition-all duration-300 ${
                  role === userRole
                    ? "bg-orange-600 text-white shadow-md scale-105"
                    : "bg-gray-200 text-gray-700 hover:bg-orange-100 hover:text-orange-600"
                }`}
              >
                {userRole}
              </button>
            ))}
          </div>

          {/* Login Form */}
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

            {/* Password Input */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-12 py-2 border-2 border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent transition duration-300"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-orange-400 hover:text-orange-600"
                >
                  {showPassword ? (
                    <FaEyeSlash size={20} />
                  ) : (
                    <FaEye size={20} />
                  )}
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <Link
                to="/forgot-password"
                className="text-sm text-orange-600 hover:text-orange-800 transition duration-300"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Password Instructions */}
            {password.length > 0 && <PasswordInstructions />}

            {/* Login Button */}
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
                  <span className="ml-2">Logging in...</span>
                </div>
              ) : (
                "Log In"
              )}
            </button>

            {/* Register Link */}
            <p className="text-center text-gray-600 mt-4">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-orange-600 hover:text-orange-800 font-semibold"
              >
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
