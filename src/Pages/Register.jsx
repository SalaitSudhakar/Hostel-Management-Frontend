import React, { useEffect, useState } from "react";
import { FaEye, FaUser, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdEmail } from "react-icons/md";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import api from "./../Services/api";
import PasswordInstructions from "../Components/PasswordInstructions";
import { ClipLoader } from "react-spinners";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [role, setRole] = useState("resident");
  const [emergencyContactName, setEmergencyContactName] = useState("");
  const [emergencyContactPhone, setEmergencyContactPhone] = useState("");
  const [relationship, setRelationship] = useState("");
  const [address, setAddress] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Validation functions (same as previous implementation)
  const validateName = (name) => /^[A-Za-z0-9\s]+$/.test(name);
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password) =>
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&/])[A-Za-z\d@$!%*?&/]{8,}$/.test(
      password
    );
  const validatePhoneNumber = (phoneNumber) =>
    phoneNumber && phoneNumber.length > 0;

  const handleSubmit = async (e) => {
    // Same implementation as previous component
    e.preventDefault();
    setLoading(true);

    // Validation checks (same as before)
    if (!validateName(name)) {
      toast.error("Name must contain only letters and spaces");
      setError("Name must contain only letters and spaces");
      setLoading(false);
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Invalid email format");
      setError("Invalid email format");
      setLoading(false);
      return;
    }

    if (!validatePhoneNumber(phoneNumber)) {
      toast.error("Please enter a valid phone number");
      setError("Please enter a valid phone number");
      setLoading(false);
      return;
    }

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

    // Validate emergency contact for residents
    if (
      role === "resident" &&
      (!emergencyContactPhone ||
        emergencyContactPhone.length < 10 ||
        !relationship)
    ) {
      toast.error("Emergency contact phone must be at least 10 digits");
      setError("Emergency contact phone must be at least 10 digits");
      setLoading(false);
      return;
    }

    // Validate address for residents
    if (role === "resident" && !address) {
      toast.error("Address is required for residents");
      setError("Address is required for residents");
      setLoading(false);
      return;
    }

    if (!role) {
      toast.error("Please select a role");
      setError("Please select a role");
      setLoading(false);
      return;
    }

    const emergencyContact = {
      name: emergencyContactName,
      phoneNumber: emergencyContactPhone,
      relationship: relationship,
    };

    const payload = {
      name,
      email,
      password,
      phoneNumber,
      role,
      emergencyContact,
      address,
    };

    try {
      const response = await api.post("/auth/register", payload);
      toast.success(response.data.message);
      setLoading(false);

      // Clear form fields
      setEmail("");
      setName("");
      setPassword("");
      setPhoneNumber("");
      setRole("resident");
      setEmergencyContactName("");
      setEmergencyContactPhone("");
      setRelationship("");
      setAddress("");
      setError(null);
      navigate("/login");
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen w-full pt-24 bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center md:px-4 py-8">
      <div className=" w-[96%] md:w-full max-w-md bg-white shadow-2xl rounded-2xl overflow-hidden transform transition-all duration-300 hover:scale-[1.02]">
        <div className="p-4 md:p-8 space-y-6">
          {/* Header */}
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-orange-600 mb-3">
              Create Account
            </h2>
            <p className="text-gray-500">
              Join our community - it's quick and easy!
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg mb-4">
              <p className="font-bold">Error:</p>
              <p>{error}</p>
            </div>
          )}

          {/* Role Selection */}
          <div className="flex justify-center space-x-4 mb-6">
            {["resident", "staff", "admin"].map((userRole) => (
              <button
                key={userRole}
                onClick={() => setRole(userRole)}
                className={`capitalize py-2 px-4 rounded-lg transition-all duration-300 ${
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
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Input */}
            <div className="relative">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Enter your full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border-2 border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent transition duration-300"
                />
                <FaUser
                  size={20}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-400"
                />
              </div>
            </div>

            {/* Email Input */}
            <div className="relative">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter your email id"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border-2 border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent transition duration-300"
                />
                <MdEmail
                  size={20}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-400"
                />
              </div>
            </div>

            {/* Phone Input */}
            <div className="relative">
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Phone
              </label>
              <PhoneInput
                international
                defaultCountry="IN"
                value={phoneNumber}
                onChange={setPhoneNumber}
                placeholder="Enter your phone number"
                required
                className="w-full border-2 border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-400"
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-3 pr-10 py-2 border-2 border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent transition duration-300"
                />
                <div
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FaEye size={20} />
                  ) : (
                    <FaEyeSlash size={20} />
                  )}
                </div>
              </div>
            </div>

            {/* Password Instructions */}
            {password.length > 0 && <PasswordInstructions />}

            {/* Resident Additional Fields */}
            {role === "resident" && (
              <div className="space-y-4 mt-6">
                {/* Emergency Contact Section */}
                <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                  <h4 className="text-lg font-semibold text-orange-600 mb-4">
                    Emergency Contact
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Contact Name
                      </label>
                      <input
                        type="text"
                        placeholder="Emergency contact name"
                        value={emergencyContactName}
                        onChange={(e) =>
                          setEmergencyContactName(e.target.value)
                        }
                        className="w-full px-4 py-2 border-2 border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-400"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Contact Phone
                      </label>
                      <PhoneInput
                        international
                        defaultCountry="IN"
                        value={emergencyContactPhone}
                        onChange={setEmergencyContactPhone}
                        placeholder="Emergency contact phone"
                        className="w-full border-2 border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-400"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Relationship
                      </label>
                      <input
                        type="text"
                        placeholder="Relationship"
                        value={relationship}
                        onChange={(e) => setRelationship(e.target.value)}
                        className="w-full px-4 py-2 border-2 border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-400"
                      />
                    </div>
                  </div>
                </div>

                {/* Address Section */}
                <div>
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Address
                  </label>
                  <textarea
                    name="address"
                    id="address"
                    placeholder="Enter your address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-4 py-2 border-2 border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-400"
                  />
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full mt-6 py-3 ${
                loading ? "bg-orange-400 cursor-not-allowed" : "bg-orange-600"
              } text-white rounded-lg hover:opacity-90 transition-all duration-300 flex items-center justify-center space-x-2`}
            >
              <span>Register</span>
              {loading && <ClipLoader size={15} color="#fff" />}
            </button>

            {/* Login Link */}
            <p className="text-center text-sm text-gray-600 mt-4">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-orange-600 hover:text-orange-400 font-semibold"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
