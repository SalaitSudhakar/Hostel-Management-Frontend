import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ClipLoader } from "react-spinners";
import api from "../Services/api";

// Lucide Icons
import { 
  DoorOpen, 
  BedDouble, 
  DollarSign, 
  Users, 
  ListChecks, 
  FileText, 
  Percent, 
  Star, 
  ImagePlus, 
  PlusCircle, 
  AlertTriangle
} from "lucide-react";



const CreateRoom = () => {
  // States to store form input values
  const [roomNumber, setRoomNumber] = useState("");
  const [roomType, setRoomType] = useState("");
  const [price, setPrice] = useState("");
  const [capacity, setCapacity] = useState("");
  const [amenities, setAmenities] = useState("");
  const [roomDescription, setRoomDescription] = useState("");
  const [discount, setDiscount] = useState("");
  const [stars, setStars] = useState("");

  const [images, setImages] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Handle image file change (uploads to the form)
  const handleImageChange = (e) => {
    setImages(e.target.files);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    if (
      !roomNumber ||
      !roomType ||
      !price ||
      !capacity ||
      !amenities ||
      !roomDescription ||
      !discount ||
      !stars
      
      ) {
      console.log(errorMessage);
      toast.error("All fields are required");
      setIsSubmitting(false);
      return;
    }

    if (
      isNaN(parseInt(price)) ||
      isNaN(parseInt(capacity)) ||
      isNaN(parseInt(discount))
    ) {
      toast.error("Price, capacity, and discount must be valid numbers");
      setIsSubmitting(false);
      return;
    }

    const formData = new FormData();
    formData.append("roomNumber", roomNumber);
    formData.append("roomType", roomType);
    formData.append("price", parseInt(price));
    formData.append("capacity", parseInt(capacity));
    formData.append("amenities", amenities);
    formData.append("roomDescription", roomDescription);
    formData.append("discount", parseInt(discount));
    formData.append("stars", parseInt(stars))
   

    /* Handle images */
    if (images) {
    
      for (let i = 0; i < images.length; i++) {
        formData.append("images", images[i]);
      }
    } else {
      console.log("Image files needed");
      toast.error("Image file needed");
    }

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Authorization token is missing or invalid");
      setIsSubmitting(false);
      return;
    }

    try {
      // POST request to create the room
      const response = await api.post("/room/create", formData, {
        headers: {
          Authorization: `Bearer ${token}`, // Important for file uploads
        },
      });

      toast.success("Room created successfully!");

      // Reset form after successful submission
      setRoomNumber("");
      setRoomType("");
      setPrice("");
      setCapacity("");
      setAmenities("");
      setRoomDescription("");
      setDiscount("");
      setStars("")
     
      setImages(null);
    
    } catch (error) {
      console.log(error);
      setErrorMessage(error?.response?.data?.message || "Error creating room");
      toast.error("Error creating room: " + error.response.data.message);
    }
    setIsSubmitting(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full pt-20 mb-12 md:mb-20 flex flex-col items-center bg-orange-50">
      <div className="max-w-md mx-auto w-[96%] md:w-6/12 lg:w-4/12 p-6 flex flex-col items-center border-2 border-orange-600 rounded-2xl shadow-2xl bg-white">
        <div className="flex items-center justify-center mb-6">
          <PlusCircle className="w-10 h-10 text-orange-700 mr-3" />
          <h2 className="text-3xl font-bold text-orange-700">
            Create a New Room
          </h2>
        </div>

        <hr className="border-2 border-dashed border-orange-200 w-2/5 my-3 mb-5"/>

        {errorMessage && (
          <div className="w-full bg-red-100 p-3 mb-4 text-red-600 rounded-lg flex items-center">
            <AlertTriangle className="mr-2 text-red-600" />
            {errorMessage}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="w-full pb-3"
        >
          {/* Room Number */}
          <div className="mb-4">
            <label htmlFor="roomNumber" className="flex items-center my-2 font-medium text-orange-800">
              <DoorOpen className="mr-2 text-orange-600" />
              Room Number
            </label>
            <input
              type="text"
              name="roomNumber"
              id="roomNumber"
              value={roomNumber}
              onChange={(e) => setRoomNumber(e.target.value)}
              required
              className="w-full border-2 border-orange-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-300"
            />
          </div>

          {/* Room Type */}
          <div className="mb-4">
            <label htmlFor="roomType" className="flex items-center my-2 font-medium text-orange-800">
              <BedDouble className="mr-2 text-orange-600" />
              Room Type
            </label>
            <select
              id="roomType"
              name="roomType"
              value={roomType}
              onChange={(e) => setRoomType(e.target.value)}
              required
              className="w-full border-2 border-orange-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-300"
            >
              <option value="">Select Room Type</option>
              <option value="Single">Single</option>
              <option value="Double">Double</option>
              <option value="Triple">Triple</option>
              <option value="Quad">Quad</option>
            </select>
          </div>

          {/* Price */}
          <div className="mb-4">
            <label htmlFor="price" className="flex items-center my-2 font-medium text-orange-800">
              <DollarSign className="mr-2 text-orange-600" />
              Price
            </label>
            <input
              type="number"
              name="price"
              id="price"
              min={1}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className="w-full border-2 border-orange-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-300"
            />
          </div>

          {/* Capacity */}
          <div className="mb-4">
            <label htmlFor="capacity" className="flex items-center my-2 font-medium text-orange-800">
              <Users className="mr-2 text-orange-600" />
              Capacity
            </label>
            <input
              type="number"
              name="capacity"
              id="capacity"
              min={1}
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              required
              className="w-full border-2 border-orange-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-300"
            />
          </div>

          {/* Amenities */}
          <div className="mb-4">
            <label htmlFor="amenities" className="flex items-center my-2 font-medium text-orange-800">
              <ListChecks className="mr-2 text-orange-600" />
              Amenities (Comma separated)
            </label>
            <input
              type="text"
              name="amenities"
              id="amenities"
              value={amenities}
              onChange={(e) => setAmenities(e.target.value)}
              required
              className="w-full border-2 border-orange-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-300"
            />
          </div>

          {/* Room Description */}
          <div className="mb-4">
            <label htmlFor="roomDescription" className="flex items-center my-2 font-medium text-orange-800">
              <FileText className="mr-2 text-orange-600" />
              Room Description
            </label>
            <textarea
              id="roomDescription"
              name="roomDescription"
              value={roomDescription}
              onChange={(e) => setRoomDescription(e.target.value)}
              required
              rows="4"
              className="w-full border-2 border-orange-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-300"
            />
          </div>

          {/* Discount */}
          <div className="mb-4">
            <label htmlFor="discount" className="flex items-center my-2 font-medium text-orange-800">
              <Percent className="mr-2 text-orange-600" />
              Discount (%)
            </label>
            <input
              type="number"
              name="discount"
              id="discount"
              value={discount}
              min="0"
              onChange={(e) => setDiscount(e.target.value)}
              className="w-full border-2 border-orange-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-300"
            />
          </div>

          {/* Stars */}
          <div className="mb-4">
            <label htmlFor="stars" className="flex items-center my-2 font-medium text-orange-800">
              <Star className="mr-2 text-orange-600" />
              Stars /10
            </label>
            <input
              type="number"
              name="stars"
              id="stars"
              value={stars}
              min="0"
              onChange={(e) => setStars(e.target.value)}
              className="w-full border-2 border-orange-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-300"
            />
          </div>

          {/* Image Upload */}
          <div className="mb-4">
            <label htmlFor="images" className="flex items-center my-2 font-medium text-orange-800">
              <ImagePlus className="mr-2 text-orange-600" />
              Room Images
            </label>
            <input
              type="file"
              name="images"
              id="images"
              onChange={handleImageChange}
              multiple
              className="w-full border-2 border-orange-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-300"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full mt-6 py-3 font-bold ${
              isSubmitting
                ? "bg-orange-400 cursor-not-allowed"
                : "bg-orange-600 hover:bg-orange-700"
            } text-white rounded-lg transition-all duration-300 ease-in-out transform ${
              !isSubmitting && "hover:scale-105"
            } flex items-center justify-center space-x-2`}
          >
            {isSubmitting ? (
              <>
                <ClipLoader size={20} color="#fff" />
                <span>Creating...</span>
              </>
            ) : (
              "Create Room"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateRoom;