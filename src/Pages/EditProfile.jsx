import React, { useState, useEffect } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css"; // Import PhoneInput styles
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "./../Services/api"; // Assume `api` is your Axios instance
import { BeatLoader, ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  // State variables for individual form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [emergencyContactName, setEmergencyContactName] = useState("");
  const [emergencyContactPhoneNumber, setEmergencyContactPhoneNumber] =
    useState("");
  const [emergencyContactRelationship, setEmergencyContactRelationship] =
    useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true); // Loading state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // Error message

  // Fetch profile data from the backend when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchProfile = async () => {
      try {
        const response = await api.get("/resident/profile");
        const data = response.data.data;

        // Populate individual state variables with fetched data
        setName(data.name || "");
        setEmail(data.email || "");
        setPhoneNumber(data.phoneNumber || "");
        setEmergencyContactName(data.emergencyContact?.name || "");
        setEmergencyContactPhoneNumber(
          data.emergencyContact?.phoneNumber || ""
        );
        setEmergencyContactRelationship(
          data.emergencyContact?.relationship || ""
        );
        setAddress(data.address || "");

        setLoading(false);
      } catch (error) {
        console.error("Error fetching profile data:", error);
        setErrorMessage("Failed to fetch profile data.");
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    // Prepare the form data for submission
    const formData = {
      name,
      email,
      phoneNumber,
      emergencyContact: {
        name: emergencyContactName,
        phoneNumber: emergencyContactPhoneNumber,
        relationship: emergencyContactRelationship,
      },
      address,
    };

    try {
      await api.put("/resident/profile/edit", formData);
      toast.success("Profile updated successfully!");

      // Clar form fields;
      setName("");
      setEmail("");
      setPhoneNumber("");
      setEmergencyContactName("");
      setEmergencyContactPhoneNumber("");
      setEmergencyContactRelationship("");
      setAddress("");

      navigate("/resident/profile");
    } catch (error) {
      console.error("Error updating profile:", error);
      setErrorMessage("Failed to update profile. Please try again.");
      toast.error("Failed to update profile.");
    }
    setIsSubmitting(false);
  };

  // Show loader while data is being fetched
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <BeatLoader color="#9CA3AF" size={15} />
      </div>
    );
  }

  

  return (
    <div className="container pt-24  mb-12 md:mb-20 mt-5 flex flex-col items-center">
      <div className="w-[96%] md:w-6/12 lg:w-4/12 p-3 md:p-4 flex flex-col items-center border border-gray-400 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Edit Profile</h2>
        {errorMessage && (
          <div className="w-full bg-red-100 p-3 mb-4 text-red-600 rounded">{errorMessage}</div>
        )}
        
        <form onSubmit={handleSubmit} className="w-full pb-3">
          {/* Name */}
          <div className="mb-4">
            <label htmlFor="name" className="block my-2 font-medium">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full border border-green-400 rounded-md p-2 focus:outline-blue-600"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block my-2 font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full border border-green-400  rounded-md p-2 focus:outline-blue-600"
            />
          </div>

          {/* Phone Number */}
          <div className="mb-4">
            <label htmlFor="phoneNumber" className="block font-medium my-2">
              Phone Number
            </label>
            <PhoneInput
              international
              defaultCountry="IN"
              value={phoneNumber}
              onChange={setPhoneNumber}
              placeholder="Enter your phone number"
              className="w-full border border-green-400  rounded-md p-2 focus:outline-blue-600"
            />
          </div>

          {/* Emergency Contact */}
          <h3 className="text-xl font-semibold mb-3">Emergency Contact</h3>
          <div className="mb-4">
            <label
              htmlFor="emergencyContactName"
              className="block font-medium my-2"
            >
              Name
            </label>
            <input
              type="text"
              id="emergencyContactName"
              value={emergencyContactName}
              onChange={(e) => setEmergencyContactName(e.target.value)}
              placeholder="Emergency contact name"
              className="w-full border border-green-400  rounded-md p-2 focus:outline-blue-600"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="emergencyContactPhone"
              className="block font-medium my-2"
            >
              Phone Number
            </label>
            <PhoneInput
              international
              defaultCountry="IN"
              value={emergencyContactPhoneNumber}
              onChange={setEmergencyContactPhoneNumber}
              placeholder="Emergency contact phone number"
              className="w-full border border-green-400  rounded-md p-2 focus:outline-blue-600"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="relationship" className="block font-medium my-2">
              Relationship
            </label>
            <input
              type="text"
              id="relationship"
              value={emergencyContactRelationship}
              onChange={(e) => setEmergencyContactRelationship(e.target.value)}
              placeholder="Relationship (e.g., Friend, Parent)"
              className="w-full border border-green-400  rounded-md p-2 focus:outline-blue-600"
            />
          </div>

          {/* Address */}
          <div className="mb-4">
            <label htmlFor="address" className="block font-medium my-2">
              Address
            </label>
            <textarea
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your address"
              className="w-full border border-green-400  rounded-md p-2 focus:outline-blue-600"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full my-4 font-medium ${
              isSubmitting
                ? "bg-orange-400 cursor-not-allowed"
                : "bg-orange-600"
            } text-white p-2 rounded-md transition-transform transform hover:scale-95 ${
              !isSubmitting && "hover:bg-orange-500"
            } duration-100 ease-in-out`}
          >
            Save Changes {isSubmitting && <ClipLoader size={15} color="#fff" />}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
