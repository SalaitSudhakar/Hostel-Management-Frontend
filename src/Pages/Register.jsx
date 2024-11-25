import React, { useState } from "react";
import { FaEye, FaUser } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../index.css";
import { MdEmail } from "react-icons/md";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css"; // Import styles for the PhoneInput component
import api from "./../Services/api";
import PasswordInstructions from "../Components/PasswordInstructions";
import { ClipLoader } from "react-spinners";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [role, setRole] = useState("resident"); // Default role is Resident
  const [emergencyContactName, setEmergencyContactName] = useState(""); // State for emergency contact name
  const [emergencyContactPhone, setEmergencyContactPhone] = useState(""); // State for emergency contact phone number
  const [relationship, setRelationship] = useState(""); // State for emergency contact phone number
  const [address, setAddress] = useState(""); // State for address
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Validate name (only letters and spaces)
  const validateName = (name) => /^[A-Za-z0-9\s]+$/.test(name);

  // Validate email using regular expression
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Validate password (at least 8 characters, one number, one letter, one special character)
  const validatePassword = (password) =>
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&/])[A-Za-z\d@$!%*?&/]{8,}$/.test(
      password
    );

  // Validate phone number (using react-phone-number-input's own format validation)
  const validatePhoneNumber = (phoneNumber) =>
    phoneNumber && phoneNumber.length > 0;

  // Handle form submission with validation
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validation checks (this matches backend validation logic)
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

    // Validate emergency contact (check if it's a number and at least 10 digits long)
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

    // Validate address (check if it's not empty)
    if (role === "resident" && !address) {
      toast.error("Address is required for residents");
      setError("Address is required for residents");
      setLoading(false);
      return;
    }

    // Check if role is selected
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

    // Prepare the data to send to the backend
    const payload = {
      name,
      email,
      password,
      phoneNumber,
      role,
      emergencyContact,
      address,
    };

    // Send the request to the backend
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
      setEmergencyContactName(""); // Clear emergency contact name
      setEmergencyContactPhone(""); // Clear emergency contact phone
      setRelationship("");
      setAddress(""); // Clear address field
      setError(null);
      navigate("/login");
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="container  mb-12 md:mb-20 mt-5 flex flex-col items-center">
      <div className="w-[96%] md:w-6/12 lg:w-4/12 p-3 md:p-4 flex flex-col items-center border border-gray-400 rounded-lg shadow-lg">
      <h3 className="mt-6 mb-2 font-bold text-2xl text-orange-600">
        Create Account
      </h3>
      <p className="text-gray-400 mb-6 text-center">
        Create an account to access all the features
      </p>

      {/* Error message */}
      {error && (
        <div className="w-full bg-red-100 p-3 mb-4 text-red-600 rounded">
          {error}
        </div>
      )}

      {/* Role Selection Buttons */}
      <div className="flex justify-center space-x-4 mb-6">
        <button
          onClick={() => setRole("resident")}
          className={`py-2 px-4 rounded-sm transform transition-all duration-300 ease-in-out ${
            role === "resident"
              ? "bg-orange-600 text-white shadow-md scale-105"
              : "bg-gray-300  text-gray-600 hover:bg-orange-500 hover:text-white hover:shadow-lg hover:scale-105"
          }`}
        >
          Resident
        </button>
        <button
          onClick={() => setRole("staff")}
          className={`py-2 px-4 rounded-sm transform transition-all duration-300 ease-in-out ${
            role === "staff"
              ? "bg-orange-600 text-white shadow-md scale-105"
              : "bg-gray-300 text-gray-600 hover:bg-orange-500 hover:text-white hover:shadow-lg hover:scale-105"
          }`}
        >
          Staff
        </button>
        <button
          onClick={() => setRole("admin")}
          className={`py-2 px-4 rounded-sm transform transition-all duration-300 ease-in-out ${
            role === "admin"
              ? "bg-orange-600 text-white shadow-md scale-105"
              : "bg-gray-300  text-gray-600 hover:bg-orange-500 hover:text-white hover:shadow-lg hover:scale-105"
          }`}
        >
          Admin
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="w-full pb-3">
        {/* Name field */}
        <div className="mb-6 relative">
          <label htmlFor="name" className="block my-2 font-medium">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Enter your full Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border-2 border-blue-600 p-1 px-2 rounded-sm focus:outline-orange-600 focus:shadow-md transition-transform transform  hover:border-gray-600 hover:bg-gray-100 duration-300 ease-in-out"
          />
          <FaUser size={"20px"} className="absolute right-[2%] top-[58%]" />
        </div>

        {/* Email field */}
        <div className="mb-6 relative">
          <label htmlFor="email" className="block my-2 font-medium">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email id"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border-2 border-blue-600 p-1 px-2 rounded-sm focus:outline-orange-600 focus:shadow-md transition-transform transform  hover:border-gray-600 hover:bg-gray-100 duration-300 ease-in-out"
          />
          <MdEmail size={"25px"} className="absolute right-[2%] top-[58%]" />
        </div>

        {/* Phone field */}
        <div className="mb-6 relative">
          <label htmlFor="phone" className="block my-2 font-medium">
            Phone
          </label>
          <PhoneInput
            international
            defaultCountry="IN" // Set default country to India (IN)
            value={phoneNumber}
            onChange={setPhoneNumber}
            placeholder="Enter your phone number"
            required
            className="w-full h-full border-2 border-blue-600 p-1 px-2 rounded-sm focus:outline-orange-600 focus:shadow-md transition-transform transform  hover:border-gray-600 hover:bg-gray-100 duration-300 ease-in-out"
          />
        </div>

        {/* Emergency Contact & Address fields (only visible if role is "resident") */}
        {role === "resident" && (
          <>
            {/* Emergency Contact Section */}
            <div className="my-8 ">
              <h4 className="font-medium text-lg mb-2">Emergency Contact</h4>
              <label
                htmlFor="emergencyContactName"
                className="block my-2 font-medium text-gray-600"
              >
                Name
              </label>
              <input
                type="text"
                name="emergencyContactName"
                id="emergencyContactName"
                placeholder="contact name"
                value={emergencyContactName}
                onChange={(e) => setEmergencyContactName(e.target.value)}
                required
                className="w-full border-2 border-blue-600 p-1 px-2 rounded-sm focus:outline-orange-600 focus:shadow-md transition-transform transform  hover:border-gray-600 hover:bg-gray-100 duration-300 ease-in-out"
              />

              <label
                htmlFor="emergencyContactPhone"
                className="block my-2 font-medium text-gray-600"
              >
                Phone Number
              </label>
              <PhoneInput
                international
                defaultCountry="IN"
                value={emergencyContactPhone}
                onChange={setEmergencyContactPhone}
                placeholder="contact phone number"
                required
                className="w-full h-full border-2 border-blue-600 p-1 px-2 rounded-sm focus:outline-orange-600 focus:shadow-md transition-transform transform  hover:border-gray-600 hover:bg-gray-100 duration-300 ease-in-out"
              />

              <label
                htmlFor="emergencyRelation"
                className="block my-2 font-medium text-gray-600"
              >
                Relation
              </label>
              <input
                type="text"
                name="emergencyRelation"
                id="emergencyRelation"
                placeholder="Relation"
                value={relationship}
                onChange={(e) => setRelationship(e.target.value)}
                required
                className="w-full border-2 border-blue-600 p-1 px-2 rounded-sm focus:outline-orange-600 focus:shadow-md transition-transform transform  hover:border-gray-600 hover:bg-gray-100 duration-300 ease-in-out"
              />
            </div>

            {/* Address Section */}
            <div className="mb-6">
              <label htmlFor="address" className="block my-2 font-medium">
                Address
              </label>
              <textarea
                name="address"
                id="address"
                placeholder="Enter your address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                className="w-full border-2 border-blue-600 p-1 px-2 rounded-sm focus:outline-orange-600 focus:shadow-md transition-transform transform  hover:border-gray-600 hover:bg-gray-100 duration-300 ease-in-out"
              />
            </div>
          </>
        )}

        {/* Password field */}
        <div className="mb-6 relative">
          <label htmlFor="password" className="block my-2 font-medium">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
            placeholder="Enter your password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border-2 border-blue-600 p-1 px-2 rounded-sm focus:outline-orange-600 focus:shadow-md transition-transform transform  hover:border-gray-600  hover:bg-gray-100 duration-300 ease-in-out"
          />
          <div
            className="absolute right-[2%] top-[58%] cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <FaEye size={"20px"} className="absolute right-[2%] top-[58%]" />
            ) : (
              <FaEyeSlash
                size={"20px"}
                className="absolute right-[2%] top-[58%]"
              />
            )}
          </div>
        </div>

        {/* Password instructions */}
        {password.length > 0 && <PasswordInstructions />}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full my-4 font-medium ${
            loading ? "bg-orange-400 cursor-not-allowed" : "bg-orange-600"
          } text-white p-2 rounded-md transition-transform transform hover:scale-95 ${
            !loading && "hover:bg-orange-500"
          } duration-100 ease-in-out`}
        >
          Register {loading && <ClipLoader size={15} color="#fff" />}
        </button>

        {/* Existing Account Link */}
        <p className="text-gray-500 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-orange-600 hover:text-orange-400">
            Login
          </Link>
        </p>
      </form>
      </div>
    </div>
  );
};

export default Register;
