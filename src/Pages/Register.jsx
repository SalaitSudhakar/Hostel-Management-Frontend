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

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [role, setRole] = useState("resident"); // Set default role to Resident
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Validate name (only letters and spaces)
  const validateName = (name) => /^[A-Za-z\s]+$/.test(name);

  // Validate email using regular expression
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Validate password (at least 8 characters, one number, one letter, one special character)
  const validatePassword = (password) =>
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&/])[A-Za-z\d@$!%*?&/]{8,}$/.test(password);


  // Validate phone number (using react-phone-number-input's own format validation)
  const validatePhoneNumber = (phoneNumber) =>
    phoneNumber && phoneNumber.length > 0;

  // Handle form submission with validation
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = { name, email, password, phoneNumber, role };
    
    // Validation checks
    if (!validateName(name)) {
      toast.error("Name must contain only letters and spaces");
      setError("Name must contain only letters and spaces");
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Invalid email format");
      setError("Invalid email format");
      return;
    }

    if (!validatePhoneNumber(phoneNumber)) {
      toast.error("Please enter a valid phone number");
      setError("Please enter a valid phone number");
      return;
    }

    console.log(password, "hello")

    if (!validatePassword(password)) {
      toast.error(
        "Password must be at least 8 characters long, contain at least one number, one letter, and one special character"
      );
      setError("Password must be at least 8 characters long, contain at least one number, one letter, and one special character");
      return;
    }

    console.log("success")
    // Check if role is selected
    if (!role) {
      toast.error("Please select a role");
      setError("Please select a role");
      return;
    }

    // http request
    try {
      // Make API request and handle respone
      const response = await api.post("/auth/register", payload);
      toast.success(response.data.message);
      navigate("/login");

      // Clear form fields
      setEmail("");
      setName("");
      setPassword("");
      setPhoneNumber("");
      setRole("Resident");
      setError(null)

      // handle Api response error
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "An error occurred");
    }

  
  };

  return (
    // register forms
    <div className="container flex flex-col items-center mb-12 md:mb-20">
      <h3 className="mt-6 mb-2 font-bold text-2xl text-orange-600">
        Create Account
      </h3>

      <p className="text-gray-400 mb-6 text-center">
        Create an account to access all the features
      </p>
      {/* error message */}
      {error && (
        <div className="w-4/5 md:w-5/12 lg:w-3/12 bg-red-100 p-3 mb-4 text-red-600 rounded">{error}</div>
      )}

      {/* form fields */}
      <form onSubmit={handleSubmit} className="w-4/5 md:w-5/12 lg:w-3/12">
      {/* name field */}
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
            className="w-full border-2 border-blue-600 p-1 px-2 rounded-sm focus:outline-orange-600 focus:shadow-md"
          />
          <FaUser size={"20px"} className="absolute right-[2%] top-[58%]" />
        </div>

        {/* email field */}
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
            className="w-full border-2 border-blue-600 p-1 px-2 rounded-sm focus:outline-orange-600 focus:shadow-md"
          />
          <MdEmail size={"25px"} className="absolute right-[2%] top-[58%]" />
        </div>

        {/* phone field */}
        <div className="mb-6 relative">
          <label htmlFor="phone" className="block my-2 font-medium">
            Phone
          </label>
          {/* Phone Country code with phoneInput package */}
          <PhoneInput
            international
            defaultCountry="IN" // Set default country to India (IN)
            value={phoneNumber}
            onChange={setPhoneNumber}
            placeholder="Enter your phone number"
            required
            className="w-full h-full border-2 border-blue-600 p-1 px-2 rounded-sm focus:outline-orange-600 focus:shadow-md"
          />
        </div>

        {/* role field */}
        <div className="mb-6 relative">
          <label htmlFor="role" className="block my-2 font-medium">
            Role
          </label>
          <select
            name="role"
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
            className="w-full border-2 border-blue-600 p-1 px-2 rounded-sm focus:outline-orange-600 focus:shadow-md"
          >
            <option value="resident">Resident</option>
            <option value="staff">Staff</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {/* password field */}
        <div className="mb-6 relative">
          <label htmlFor="password" className="block my-2 font-medium">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
            placeholder="Enter Your Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border-2 border-blue-600 p-1 px-2 rounded-sm focus:outline-orange-600 focus:shadow-md"
          />

          {/* show password button inside password field */}
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


       {/* Password instructions */}
       { password.length > 0 &&
        <PasswordInstructions /> 
        }


       {/* button */}
        <div>
          <button
            type="submit"
            className="w-full my-4 font-medium bg-orange-600 text-white p-2 rounded-md  transition-transform transform hover:scale-95 hover:bg-orange-500 duration-100"
          >
            Register
          </button>
        </div>
      </form>

      <div className="mt-3">
        Already have an account?{" "}
        <Link
          to={"/login"}
          className="font-medium text-orange-600 hover:text-orange-400"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default Register;
