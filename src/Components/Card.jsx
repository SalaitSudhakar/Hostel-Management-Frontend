import React from "react";
import { Star, Bed } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation as SwiperNavigation, Pagination } from "swiper/modules";
import { Link, useNavigate } from "react-router-dom"; // Import Link for routing

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export const Card = ({
  id,
  key,
  images,
  roomNumber,
  roomType,
  price,
  bedsAvailable,
  discount,
  rating,
}) => {
  // Calculate discounted price
  const discountedPrice = price - price * (discount / 100);
  const navigate = useNavigate();

  // Determine rating color
  const getRatingColor = () => {
    if (rating >= 8) return "text-green-600";
    if (rating >= 5) return "text-yellow-600";
    return "text-red-600";
  };

  const handleBookNowClick = () => {
    // Handle book now button click logic here
    navigate(`/reserve-room/${roomNumber}`, {
      state: {
        roomId: id,
        roomNumber: roomNumber,
        price: discountedPrice,
      },
    });
  };

  return (
    <div
      key={key}
      className="relative bg-white pb-3 shadow-lg rounded-xl overflow-hidden hover:scale-105 transition-all duraion-200 ease-in-out hover:shadow-xl mb-3 border border-orange-500"
    >
      {/* Image Carousel Section */}
      <div className="relative h-48 overflow-hidden group">
        <Swiper
          modules={[SwiperNavigation, Pagination]} // Include both Navigation and Pagination
          spaceBetween={50}
          slidesPerView={1}
          pagination={{
            clickable: true, // Enable clickable dots
            dynamicBullets: true, // Optional for dynamic dots
          }}
          navigation={true} // Enable Swiper navigation controls
          className="relative"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <Link to={`/room/${roomNumber}`}>
                <img
                  src={image}
                  alt={`Room ${roomNumber} - Image ${index + 1}`}
                  className="w-full h-full object-contain"
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Discount Badge */}
        {discount > 0 && (
          <div className="absolute top-3 right-3 bg-orange-600 text-white px-3 py-1.5 rounded-full text-xs font-bold z-10 shadow-md">
            {discount}% OFF
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-4 space-y-4">
        {/* Room Header */}
        <div className="flex justify-between items-center border-b border-orange-600 pb-3">
          <div>
            <h3 className="text-xl font-bold text-orange-800">
              Room {roomNumber}
            </h3>
            <p className="text-amber-950 text-sm">{roomType}</p>
          </div>

          {/* Rating */}
          <div className={`flex items-center ${getRatingColor()}`}>
            <Star className="w-5 h-5 mr-1" fill="currentColor" />
            <span className="font-semibold">{rating.toFixed(1)}</span>
          </div>
        </div>

        {/* Room Details */}
        <div className="flex justify-between items-center md:flex-col md:items-start md:gap-3 space-y-3 flex-wrap">
          <div className="flex justify-between items-center text-gray-700">
            {/* Beds Available */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Bed className="w-5 h-5 mr-2 " />
                <span className="text-sm md:text-base font-medium text-amber-800">
                  {" "}
                  Beds Available:{" "}
                </span>
              </div>
              <div className="pl-2 text-amber-950">
                <span>{bedsAvailable}</span>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="flex items-center justify-between flex-wrap">
            <div className="pr-2">
              <span className="md:text-lg font-medium text-amber-800">
                Price:{" "}
              </span>
            </div>
            <div className="flex items-center flex-nowrap">
              {discount > 0 ? (
                <div>
                  <span className="line-through text-sm md:text-base text-amber-400 mr-2">
                    ₹{price.toFixed(2)}
                  </span>
                  <span className="text-sm md:text-base font-bold p-1 text-amber-700 bg-orange-100">
                    ₹{discountedPrice.toFixed(2)}
                  </span>
                </div>
              ) : (
                <span className="font-bold text-gray-800">
                  ₹{price.toFixed(2)}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Book Button */}
      <div className="flex justify-center items-center my-4 mx-6">
        <button
          onClick={handleBookNowClick}
          className="w-4/6 md:w-full bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-500 hover:scale-95 transition-all duration-200 ease-in-out"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default Card;
