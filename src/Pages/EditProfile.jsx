import React, { useState, useEffect } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "./../Services/api";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaUserFriends,
  FaAddressBook,
  FaExclamationTriangle
} from "react-icons/fa";

const EditProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [emergencyContactName, setEmergencyContactName] = useState("");
  const [emergencyContactPhoneNumber, setEmergencyContactPhoneNumber] = useState("");
  const [emergencyContactRelationship, setEmergencyContactRelationship] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchProfile = async () => {
      try {
        const response = await api.get("/resident/profile");
        const data = response.data.data;

        setName(data.name || "");
        setEmail(data.email || "");
        setPhoneNumber(data.phoneNumber || "");
        setEmergencyContactName(data.emergencyContact?.name || "");
        setEmergencyContactPhoneNumber(data.emergencyContact?.phoneNumber || "");
        setEmergencyContactRelationship(data.emergencyContact?.relationship || "");
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

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
  
  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
        <div className="w-24 h-24 border-[8px] border-t-orange-600 border-r-orange-600 border-b-orange-300 border-l-orange-300 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="container pt-24 mb-12 md:mb-20 mt-5 flex flex-col items-center bg-gray-50">
      <div className="w-[96%] md:w-6/12 lg:w-4/12 p-6 flex flex-col items-center border border-orange-200 rounded-xl shadow-2xl bg-white">
        <h2 className="text-3xl font-bold text-center mb-6 text-orange-600 flex items-center">
          <FaAddressBook className="mr-3 text-orange-500" />
          Edit Profile
        </h2>
        {errorMessage && (
          <div className="w-full bg-red-50 p-4 mb-6 text-red-700 rounded-lg border border-red-200 flex items-center">
            <FaExclamationTriangle className="mr-3 text-red-500 text-xl" />
            {errorMessage}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="w-full pb-3 space-y-4">
          {/* Name */}
          <div>
            <label htmlFor="name" className=" mb-2 font-medium flex items-center">
              <FaUser className="mr-2 text-orange-500" />
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full border border-orange-300 rounded-lg p-3 focus:ring-2 focus:ring-orange-300 transition-all duration-300"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className=" mb-2 font-medium flex items-center">
              <FaEnvelope className="mr-2 text-orange-500" />
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full border border-orange-300 rounded-lg p-3 focus:ring-2 focus:ring-orange-300 transition-all duration-300"
              required
            />
          </div>

          {/* Phone Number */}
          <div>
            <label htmlFor="phoneNumber" className=" mb-2 font-medium flex items-center">
              <FaPhone className="mr-2 text-orange-500" />
              Phone Number
            </label>
            <PhoneInput
              international
              defaultCountry="IN"
              value={phoneNumber}
              onChange={setPhoneNumber}
              placeholder="Enter your phone number"
              className="w-full border border-orange-300 rounded-lg p-3 focus:ring-2 focus:ring-orange-300 transition-all duration-300"
            />
          </div>

          {/* Emergency Contact */}
          <h3 className="text-xl font-semibold mb-3 flex items-center">
            <FaUserFriends className="mr-2 text-orange-500" />
            Emergency Contact
          </h3>
          <div>
            <label
              htmlFor="emergencyContactName"
              className=" mb-2 font-medium flex items-center"
            >
              <FaUser className="mr-2 text-orange-500" />
              Name
            </label>
            <input
              type="text"
              id="emergencyContactName"
              value={emergencyContactName}
              onChange={(e) => setEmergencyContactName(e.target.value)}
              placeholder="Emergency contact name"
              className="w-full border border-orange-300 rounded-lg p-3 focus:ring-2 focus:ring-orange-300 transition-all duration-300"
            />
          </div>
          <div>
            <label
              htmlFor="emergencyContactPhone"
              className="blck mb-2 font-medium flex items-center"
            >
              <FaPhone className="mr-2 text-orange-500" />
              Phone Number
            </label>
            <PhoneInput
              international
              defaultCountry="IN"
              value={emergencyContactPhoneNumber}
              onChange={setEmergencyContactPhoneNumber}
              placeholder="Emergency contact phone number"
              className="w-full border border-orange-300 rounded-lg p-3 focus:ring-2 focus:ring-orange-300 transition-all duration-300"
            />
          </div>
          <div>
            <label htmlFor="relationship" className=" mb-2 font-medium flex items-center">
              <FaUserFriends className="mr-2 text-orange-500" />
              Relationship
            </label>
            <input
              type="text"
              id="relationship"
              value={emergencyContactRelationship}
              onChange={(e) => setEmergencyContactRelationship(e.target.value)}
              placeholder="Relationship (e.g., Friend, Parent)"
              className="w-full border border-orange-300 rounded-lg p-3 focus:ring-2 focus:ring-orange-300 transition-all duration-300"
            />
          </div>

          {/* Address */}
          <div>
            <label htmlFor="address" className=" mb-2 font-medium flex items-center">
              <FaMapMarkerAlt className="mr-2 text-orange-500" />
              Address
            </label>
            <textarea
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your address"
              className="w-full border border-orange-300 rounded-lg p-3 focus:ring-2 focus:ring-orange-300 transition-all duration-300"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full mt-6 py-3 text-white rounded-lg transition-all duration-300 flex items-center justify-center ${
              isSubmitting
                ? "bg-orange-400 cursor-not-allowed"
                : "bg-orange-600 hover:bg-orange-500 hover:shadow-lg"
            }`}
          >
            {isSubmitting ? (
              <ClipLoader size={20} color="#fff" />
            ) : (
              "Save Changes"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;