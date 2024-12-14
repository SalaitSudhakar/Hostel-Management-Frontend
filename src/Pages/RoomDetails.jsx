import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { 
  ShieldCheck, 
  Bed, 
  CheckCircle2, 
  DollarSign, 
  Users 
} from "lucide-react";
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
      <div className="fixed inset-0 flex items-center justify-center bg-white/90 z-50">
        <div className="w-24 h-24 border-[8px] border-t-orange-600 border-r-orange-600 border-b-orange-300 border-l-orange-300 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Room not found
  if (!room) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Room Not Found</h2>
          <p className="text-gray-600">The room you're looking for doesn't exist.</p>
        </div>
      </div>
    );
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

  return (
    <div className="bg-gradient-to-br from-orange-50 to-amber-100 min-h-screen py-12">
      <div className="max-w-7xl w-[96%] mx-auto md:px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="md:max-w-6xl mx-auto"
        >
          {/* Image Gallery */}
          <div className="grid md:grid-cols-2 gap-8 bg-white rounded-2xl shadow-xl p-6">
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

              <div className="flex space-x-2 justify-center items-center">
                {room.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => handleImageChange(index)}
                    className={`w-20 h-16 rounded-lg overflow-hidden transition-all duration-300 ${
                      currentImage === index
                        ? "ring-4 ring-orange-500 scale-105"
                        : "opacity-60 hover:opacity-100 hover:scale-105"
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
              className="space-y-6"
            >
              <div className="flex justify-between items-center border-b pb-4 border-orange-100">
                <h1 className="text-3xl font-bold text-orange-900">
                  Room {room.roomNumber} 
                  <span className="text-xl text-gray-600 ml-2">
                    {room.roomType}
                  </span>
                </h1>
              </div>

              <p className="text-gray-700 leading-relaxed">
                {room.roomDescription}
              </p>

              <div className="flex items-center space-x-4">
                <div className="text-2xl font-bold text-orange-800">
                  {room.discount > 0 ? (
                    <div className="flex items-center">
                      <span className="line-through text-gray-400 mr-3 text-base">
                        ₹{room.price}
                      </span>
                      <span className="text-green-600">₹{discountedPrice}</span>
                      <span className="ml-2 bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
                        {room.discount}% OFF
                      </span>
                    </div>
                  ) : (
                    <span>₹{room.price}</span>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center text-gray-700">
                  <CheckCircle2 className="mr-2 text-orange-600" />
                  <strong className="pr-2">Status: </strong>{" "}
                  {room.isAvailable ? "Available" : "Not Available"}
                </div>
                <div className="flex items-center text-gray-700">
                  <Users className="mr-2 text-orange-600" />
                  <strong className="pr-2">Capacity:</strong> {room.capacity}
                </div>
                <div className="flex items-center text-gray-700">
                  <Bed className="mr-2 text-orange-600" />
                  <strong className="pr-2">Beds Remaining:</strong> {room.bedRemaining}
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleBookNow}
                disabled={!room.isAvailable}
                className={`w-full px-6 py-3 rounded-lg text-xl font-semibold transition-all duration-300 ${
                  room.isAvailable 
                    ? "bg-orange-600 text-white hover:bg-orange-700 active:bg-orange-800" 
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                {room.isAvailable ? "Reserve Now" : "Not Available"}
              </motion.button>
            </motion.div>
          </div>

          {/* Amenities Section */}
          <section className="mt-12">
            <AmenityCard />
          </section>

          {/* Room Rules Section */}
          <section className="mt-12 bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center mb-6">
              <ShieldCheck className="mr-3 text-orange-600" size={32} />
              <h2 className="text-2xl font-bold text-gray-800">Room Rules</h2>
            </div>
            <ul className="space-y-3 text-gray-700">
              {roomRules.map((rule, index) => (
                <li 
                  key={index} 
                  className="flex items-center border-b border-gray-100 pb-2 last:border-b-0"
                >
                  <CheckCircle2 className="mr-3 text-orange-500" size={20} />
                  {rule}
                </li>
              ))}
            </ul>
          </section>

          {/* FAQs Section */}
          <section className="mt-12">
            <HostelFAQ />
          </section>
        </motion.div>
      </div>
    </div>
  );
};

export default RoomDetails;