import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ClipLoader } from "react-spinners";
import api from "../Services/api";

const CreateRoom = () => {
  // States to store form input values
  const [roomNumber, setRoomNumber] = useState("");
  const [roomType, setRoomType] = useState("");
  const [price, setPrice] = useState("");
  const [capacity, setCapacity] = useState("");
  const [amenities, setAmenities] = useState("");
  const [roomDescription, setRoomDescription] = useState("");
  const [discount, setDiscount] = useState("");

  const [images, setImages] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");


  console.log(
    roomNumber,
    roomType,
    price,
    capacity,
    amenities,
    roomDescription,
    discount,
    images
  );

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
      !discount 
      
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
   

    /* Handle images */
    if (images) {
      console.log(images);
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
    <div className="container pt-24 mb-12 md:mb-20 mt-5 flex flex-col items-center">
      <div className="w-[96%] md:w-6/12 lg:w-4/12 p-3 md:p-4 flex flex-col items-center border border-gray-400 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">
          Create a New Room
        </h2>
        {errorMessage && (
          <div className="w-full bg-red-100 p-3 mb-4 text-red-600 rounded">
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
            <label htmlFor="roomNumber" className="block my-2 font-medium">
              Room Number
            </label>
            <input
              type="text"
              name="roomNumber"
              id="roomNumber"
              value={roomNumber}
              onChange={(e) => setRoomNumber(e.target.value)}
              required
              className="w-full border border-green-400 rounded-md p-2 focus:outline-blue-600"
            />
          </div>

          {/* Room Type */}
          <div className="mb-4">
            <label htmlFor="roomType" className="block my-2 font-medium">
              Room Type
            </label>
            <select
              id="roomType"
              name="roomType"
              value={roomType}
              onChange={(e) => setRoomType(e.target.value)}
              required
              className="w-full border border-green-400 rounded-md p-2 focus:outline-blue-600"
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
            <label htmlFor="price" className="block my-2 font-medium">
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
              className="w-full border border-green-400 rounded-md p-2 focus:outline-blue-600"
            />
          </div>

          {/* Capacity */}
          <div className="mb-4">
            <label htmlFor="capacity" className="block my-2 font-medium">
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
              className="w-full border border-green-400 rounded-md p-2 focus:outline-blue-600"
            />
          </div>

          {/* Amenities */}
          <div className="mb-4">
            <label htmlFor="amenities" className="block my-2 font-medium">
              Amenities (Comma separated)
            </label>
            <input
              type="text"
              name="amenities"
              id="amenities"
              value={amenities}
              onChange={(e) => setAmenities(e.target.value)}
              required
              className="w-full border border-green-400 rounded-md p-2 focus:outline-blue-600"
            />
          </div>

          {/* Room Description */}
          <div className="mb-4">
            <label htmlFor="roomDescription" className="block my-2 font-medium">
              Room Description
            </label>
            <textarea
              id="roomDescription"
              name="roomDescription"
              value={roomDescription}
              onChange={(e) => setRoomDescription(e.target.value)}
              required
              rows="4"
              className="w-full border border-green-400 rounded-md p-2 focus:outline-blue-600"
            />
          </div>

          {/* Discount */}
          <div className="mb-4">
            <label htmlFor="discount" className="block my-2 font-medium">
              Discount (%)
            </label>
            <input
              type="number"
              name="discount"
              id="discount"
              value={discount}
              min="0"
              onChange={(e) => setDiscount(e.target.value)}
              className="w-full border border-green-400 rounded-md p-2 focus:outline-blue-600"
            />
          </div>
         

          {/* Image Upload */}
          <div className="mb-4">
            <label htmlFor="images" className="block my-2 font-medium">
              Room Images
            </label>
            <input
              type="file"
              name="images"
              id="images"
              onChange={handleImageChange}
              multiple
              className="w-full border border-green-400 rounded-md p-2 focus:outline-blue-600"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full my-4 font-medium ${
              isSubmitting
                ? "bg-orange-400 cursor-not-allowed"
                : "bg-orange-600"
            } text-white p-2 rounded-md transition-transform transform hover:scale-95 ${
              !isSubmitting && "hover:bg-orange-500"
            } duration-100 ease-in-out`}
          >
            Create {isSubmitting && <ClipLoader size={15} color="#fff" />}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateRoom;
