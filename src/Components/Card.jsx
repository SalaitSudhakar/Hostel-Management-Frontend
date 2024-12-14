import React from "react";
import { Star, Bed } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation as SwiperNavigation, Pagination } from "swiper/modules";
import { Link, useNavigate } from "react-router-dom";

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

  // Determine rating color and text
  const getRatingColor = () => {
    if (rating >= 8) return { color: "text-green-600", text: "Excellent" };
    if (rating >= 5) return { color: "text-yellow-600", text: "Good" };
    return { color: "text-red-600", text: "Average" };
  };

  const handleBookNowClick = () => {
    navigate(`/reserve-room/${roomNumber}`, {
      state: {
        roomId: id,
        roomNumber: roomNumber,
        price: discountedPrice,
      },
    });
  };

  const ratingInfo = getRatingColor();

  return (
    <div
      key={key}
      className="w-full bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 ease-in-out transform hover:-translate-y-2 hover:shadow-xl border border-transparent hover:border-orange-500"
    >
      {/* Image Carousel Section */}
      <div className="relative h-48 md:h-56 bg-gray-100 overflow-hidden">
        <Swiper
          modules={[SwiperNavigation, Pagination]}
          spaceBetween={50}
          slidesPerView={1}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          navigation={true}
          className="h-full"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index} className="flex items-center justify-center">
              <Link to={`/room/${roomNumber}`} className="w-full h-full">
                <img
                  src={image}
                  alt={`Room ${roomNumber} - Image ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Discount Badge */}
        {discount > 0 && (
          <div className="absolute top-3 right-3 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold z-10 shadow-md">
            {discount}% OFF
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-4 space-y-4">
        {/* Room Header */}
        <div className="flex justify-between items-center pb-3 border-b border-orange-200">
          <div>
            <h3 className="text-xl font-bold text-orange-900">
              Room {roomNumber}
            </h3>
            <p className="text-amber-800 text-sm font-medium">{roomType}</p>
          </div>

          {/* Rating */}
          <div className={`flex items-center ${ratingInfo.color}`}>
            <Star className="w-5 h-5 mr-1" fill="currentColor" />
            <div className="flex flex-col items-end">
              <span className="font-bold text-base">{rating.toFixed(1)}</span>
              <span className="text-xs font-medium">{ratingInfo.text}</span>
            </div>
          </div>
        </div>

        {/* Room Details */}
        <div className="grid grid-cols-2 gap-2">
          {/* Beds Available */}
          <div className="flex items-center text-gray-700">
            <Bed className="w-5 h-5 mr-2 text-orange-600" />
            <div>
              <span className="text-xs font-medium text-amber-900">
                Beds
              </span>
              <p className="font-bold text-amber-950 text-sm">{bedsAvailable}</p>
            </div>
          </div>

          {/* Pricing */}
          <div className="flex flex-col items-end">
            <div className="flex items-center">
              {discount > 0 ? (
                <div className="flex flex-col items-end">
                  <span className="line-through text-xs text-gray-400 mr-2">
                    ₹{price.toFixed(2)}
                  </span>
                  <span className="text-base font-bold text-orange-700 bg-orange-100 px-1.5 py-0.5 rounded">
                    ₹{discountedPrice.toFixed(2)}
                  </span>
                </div>
              ) : (
                <span className="text-base font-bold text-gray-800">
                  ₹{price.toFixed(2)}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Book Button */}
      <div className="p-4 pt-0">
        <button
          onClick={handleBookNowClick}
          className="w-full bg-orange-600 text-white py-2.5 rounded-lg hover:bg-orange-700 transition-colors duration-300 ease-in-out transform active:scale-95 shadow-md hover:shadow-lg text-sm"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default Card;