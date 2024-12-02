import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { toast } from "react-toastify";
import AmenityCard from "../Components/AmenityCard";
import HostelFAQ from "../Components/HostelFAQ";
import api from "../Services/api";

const RoomDetails = () => {
  const { roomNumber } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState(0);

  // Room Rules
  const roomRules = [
    "No smoking inside the rooms",
    "Quiet hours between 10:00 PM and 7:00 AM",
    "Valid ID required at check-in",
    "No outside food in common areas",
    "Respect other guests' privacy",
  ];

  // Fetch room details
  useEffect(() => {
    const fetchRoomDetails = async () => {
      window.scrollTo(0, 0);
      try {
        const response = await api.get(`/room/${roomNumber}`);
        setRoom(response.data.data);
      } catch (error) {
        console.error("Error fetching room details:", error);
        toast.error("Failed to fetch room details");
      } finally {
        setLoading(false);
      }
    };

    fetchRoomDetails();
  }, [roomNumber]);

  // Loading Spinner
  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
        <div className="w-24 h-24 border-[8px] border-t-orange-600 border-r-orange-600 border-b-orange-300 border-l-orange-300 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Room not found
  if (!room) {
    return <div className="text-center text-xl mt-20">Room not found</div>;
  }

  const discountedPrice = room.price - room.price * (room.discount / 100);

  const handleImageChange = (index) => {
    setCurrentImage(index);
  };

  const handleBookNow = () => {
    navigate(`/reserve-room/${roomNumber}`, {
      state: {
        roomId: room._id,
        roomNumber: room.roomNumber,
        price: discountedPrice,
      },
    });
  };

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
        <div className="w-24 h-24 border-[8px] border-t-orange-600 border-r-orange-600 border-b-orange-300 border-l-orange-300 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className=" mx-auto py-8"
      >
        {/* Image Gallery */}
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="space-y-4"
          >
            <motion.img
              key={currentImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              src={room.images[currentImage]}
              alt={`Room ${room.roomNumber}`}
              className="w-full h-96 object-cover rounded-xl shadow-lg"
            />

            <div className=" w-4/5 mx-auto  flex space-x-2 justify-center items-center">
              {room.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => handleImageChange(index)}
                  className={`w-20 h-16 rounded-lg overflow-hidden transition-all duration-300 ${
                    currentImage === index
                      ? "ring-4 ring-orange-500"
                      : "opacity-60 hover:opacity-100"
                  }`}
                >
                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Room Details */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
            className="w-[96%] space-y-6 mx-auto"
          >
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold text-gray-800">
                Room {room.roomNumber} - {room.roomType}
              </h1>
            </div>

            <p className="text-gray-600">{room.roomDescription}</p>

            <div className="text-xl font-semibold text-gray-700">
              {room.discount > 0 ? (
                <div>
                  <span className="line-through text-gray-400 mr-2">
                    ₹{room.price}
                  </span>
                  <span className="text-green-600">₹{discountedPrice}</span>
                </div>
              ) : (
                <span>₹{room.price}</span>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="text-gray-600">
                <strong>Status:</strong>{" "}
                {room.isAvailable ? "Available" : "Not Available"}
              </div>
              <div className="text-gray-600">
                <strong>Capacity:</strong> {room.capacity}
              </div>
              <div className="text-gray-600">
                <strong>Beds Remaining:</strong> {room.bedRemaining}
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleBookNow}
              className="w-full bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-500 transition-all duration-300 text-xl font-semibold"
            >
              Reserve Now
            </motion.button>
          </motion.div>
        </div>

        {/* Amenities Section */}
        <section className="mt-12">
          <AmenityCard />
        </section>

        {/* Room Rules Section */}
        <section className="mt-12 pt-4 bg-gray-100 -mx-16 px-20">
          <h2 className=" text-2xl font-bold mb-6 text-gray-800">Room Rules</h2>
          <div className=" p-6 rounded-lg">
            <ul className="list-disc list-inside text-gray-700">
              {roomRules.map((rule, index) => (
                <li key={index} className="mb-2">
                  {rule}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* FAQs Section */}
        <section className="mt-12">
          <HostelFAQ />
        </section>
      </motion.div>
      
    </div>
  );
};

export default RoomDetails;
