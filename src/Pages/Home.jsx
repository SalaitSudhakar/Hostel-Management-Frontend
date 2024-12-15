import React, { useState, useEffect, useRef } from "react";
import { X, ArrowRight } from "lucide-react";
import AppDownloadSection from "../Components/AppDownloadSection";
import Testimonial from "../Components/Testimonial";
import Typewriter from "typewriter-effect";
import PopularFacilities from "../Components/PopularFacilities";
import CardContainer from "../Components/CardContainer";
import { Card } from "../Components/Card";
import { toast } from "react-toastify";
import api from "../Services/api";

const Home = () => {
  const [availableRooms, setAvailableRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  // Refs
  const exploreRoomsRef = useRef(null);

  // Scroll to section function
  const scrollToSection = () => {
    exploreRoomsRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  // Filter state
  const [selectedRoomTypes, setSelectedRoomTypes] = useState({
    single: false,
    double: false,
    triple: false,
    quad: false,
  });

  const [selectedPriceRanges, setSelectedPriceRanges] = useState({
    under2000: false,
    above2000: false,
  });

  // Fetch rooms
  useEffect(() => {
    const fetchRooms = async () => {
      window.scrollTo(0, 0);
      try {
        const response = await api.get("/room/available-rooms");
        setAvailableRooms(response.data.data);
        setFilteredRooms(response.data.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message || "An error occurred");
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  // Filter rooms logic
  useEffect(() => {
    let result = availableRooms;

    // Filter by room type
    const selectedTypes = Object.keys(selectedRoomTypes).filter(
      (type) => selectedRoomTypes[type]
    );
    if (selectedTypes.length > 0) {
      result = result.filter((room) =>
        selectedTypes.includes(room.roomType.toLowerCase())
      );
    }

    // Filter by price
    if (selectedPriceRanges.under2000 && !selectedPriceRanges.above2000) {
      result = result.filter((room) => room.price <= 2000);
    } else if (
      selectedPriceRanges.above2000 &&
      !selectedPriceRanges.under2000
    ) {
      result = result.filter((room) => room.price > 2000);
    } else if (selectedPriceRanges.under2000 && selectedPriceRanges.above2000) {
      // If both are selected, no price filtering
      result = result;
    }

    setFilteredRooms(result);
  }, [selectedRoomTypes, selectedPriceRanges, availableRooms]);

  // Handle room type filter change
  const handleRoomTypeChange = (type) => {
    setSelectedRoomTypes((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  // Handle price range filter change
  const handlePriceRangeChange = (range) => {
    setSelectedPriceRanges((prev) => ({
      ...prev,
      [range]: !prev[range],
    }));
  };

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
        <div className="w-24 h-24 border-[8px] border-t-orange-600 border-r-orange-600 border-b-orange-300 border-l-orange-300 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    // Intro
    <>
      <div className="overflow-hidden relative pt-24 md:pt-16 lg:pt-8 min-h-screen flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="hostel.jpg"
            alt="HM Hostel Building"
            className="w-full h-full object-cover opacity-70"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-indigo-900/60"></div>
        </div>

        {/* Content Container */}
        <div className="container flex flex-col items-center justify-center  md:-mt-8 mx-auto px-4 relative z-10 ">
          <div className="max-w-2xl text-white space-y-6">
            {/* Welcoming Headline */}
            <div className="space-y-3">
              <h1 className="text-3xl md:text-5xl font-bold leading-tight">
                <Typewriter
                  onInit={(typewriter) => {
                    typewriter
                      .typeString("Welcome to HM Hostel")
                      .pauseFor(5000) // Optional pause after typing
                      .start(); // Ensures typing finishes and does not erase
                  }}
                  options={{
                    autoStart: true,
                    loop: false, // Ensures the effect runs only once
                    delay: 80, // Typing speed
                  }}
                />
              </h1>
              <h2 className="tex-lg md:text-2xl text-white/90">
                Your Home Away from Home
              </h2>
            </div>

            {/* Descriptive Paragraph */}
            <p className="text-sm md:text-lg text-white/80 leading-relaxed">
              Experience comfort, community, and convenience at HM Hostel. We
              offer modern accommodations, vibrant common areas, and a welcoming
              atmosphere that makes every traveler feel like they belong.
            </p>

            {/* Features Highlights */}
            <div className="flex space-x-4 text-xs md:text-sm">
              <div className="bg-white/10 px-2 md:px-4 py-2 rounded-full">
                24/7 Security
              </div>
              <div className="bg-white/10 px-2 md:px-4 py-2 rounded-full">
                Free Wi-Fi
              </div>
              <div className="bg-white/10 px-2 md:px-4 py-2 rounded-full">
                Central Location
              </div>
            </div>

            {/* Call to Action Buttons */}
            <div className="flex space-x-4 md:pt-6">
              <button
                onClick={scrollToSection}
                className="bg-orange-600 hover:bg-orange-500 text-white 
              px-2 py-2 md:px-6 md:py-3 rounded-lg flex items-center space-x-2 
              transition duration-300 ease-in-out transform hover:scale-105"
              >
                <span>Explore Rooms</span>
                <span className="inline-block animate-moveArrow">
                  <ArrowRight size={20} />
                </span>
              </button>

              <button
                onClick={scrollToSection}
                className="border border-white/50 hover:bg-white/10 
              text-white px-2 py-2md:px-6 md:py-3 rounded-lg 
              transition duration-300 ease-in-out transform hover:scale-105 z-15"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Wave Decoration */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            className="w-full text-white"
          >
            <path
              fill="currentColor"
              fillOpacity="1"
              d="M0,192L48,208C96,224,192,256,288,266.7C384,277,480,267,576,250.7C672,235,768,213,864,202.7C960,192,1056,192,1152,197.3C1248,203,1344,213,1392,218.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320L192,320L96,320L0,320Z"
            ></path>
          </svg>
        </div>
      </div>

      {/* Popular facilities */}
      <PopularFacilities />

      {/* Rooms Section */}
      <section
        ref={exploreRoomsRef}
        id="exploreRooms"
        className="exploreRooms py-12 bg-gradient-to-b from-blue-100 to-indigo-200 relative  overflow-hidden"
      >
        <div className="container mx-auto px-4">
          {/* Header Section */}
          <div className="text-center  mb-10">
            <h2 className="text-3xl font-bold  mb-4">
              Available Rooms
            </h2>
            <p className=" max-w-2xl mx-auto ">
              Discover our comfortable and affordable rooms tailored to meet
              your needs. From budget-friendly options to premium
              accommodations, we have something for everyone.
            </p>
          </div>

          {/* Rooms and Filters Container */}
          <div className="relative flex flex-col md:flex-row min-h-[600px]">
            <div className="md:w-64 lg:w-72 bg-white/20 backdrop-blur-md rounded-lg shadow-lg p-4 border border-white/30">
              <h3 className="text-xl font-bold mb-4 md:text-lg">Filters</h3>

              {/* Room Type Filters */}
              <div className="mb-4">
                <h4 className="font-semibold mb-2 text-sm">Room Type</h4>
                {Object.keys(selectedRoomTypes).map((type) => (
                  <div key={type} className="flex items-center mb-2 text-gray-600">
                    <input
                      type="checkbox"
                      id={type}
                      checked={selectedRoomTypes[type]}
                      onChange={() => handleRoomTypeChange(type)}
                      className="mr-2 h-4 w-4 accent-orange-600"
                    />
                    <label htmlFor={type} className="capitalize text-sm text-gray-900">
                      {type}
                    </label>
                  </div>
                ))}
              </div>

              {/* Price Range Filters */}
              <div>
                <h4 className="font-semibold mb-2 text-sm">Price</h4>
                {Object.keys(selectedPriceRanges).map((range) => (
                  <div key={range} className="flex items-center mb-2 ">
                    <input
                      type="checkbox"
                      id={range}
                      checked={selectedPriceRanges[range]}
                      onChange={() => handlePriceRangeChange(range)}
                      className="mr-2 h-4 w-4 accent-orange-600"
                    />
                    <label htmlFor={range} className="text-sm text-zinc-200">
                      {range === "under2000" ? "Under ₹2000" : "Above ₹2000"}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Rooms Container */}
            <div className="flex-1 md:pl-4 lg:pl-6">
              {filteredRooms.length === 0 ? (
                <div className="text-center text-gray-600 py-12">
                  No rooms match your current filters
                </div>
              ) : (
                <CardContainer>
                  {filteredRooms.map((room) => (
                    <Card
                      key={room._id}
                      id={room._id}
                      roomNumber={room.roomNumber}
                      roomType={room.roomType}
                      price={room.price}
                      bedsAvailable={room.bedRemaining}
                      discount={room.discount || 0}
                      rating={
                        room.rating ||
                        Number((Math.random() * 5 + 5).toFixed(1))
                      }
                      images={room.images || ["/api/placeholder/400/300"]}
                    />
                  ))}
                </CardContainer>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <Testimonial />
      {/* App Download Section */}
      <AppDownloadSection />
    </>
  );
};

export default Home;
