import React, { useState, useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import AppDownloadSection from "../Components/AppDownloadSection";
import Testimonial from "../Components/Testimonial";
import Typewriter from "typewriter-effect";
import PopularFacilities from "../Components/PopularFacilities";
import CardContainer from "../Components/CardContainer";
import { Card } from "../Components/Card";
import { toast } from "react-toastify";
import api from "../Services/api";
import { ClipLoader } from "react-spinners";

const Home = () => {
  const [availableRooms, setAvailableRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      window.scrollTo(0, 0);
      try {
        const response = await api.get("/room/available-rooms");
        setAvailableRooms(response.data.data); // Assuming response data contains room information
        setLoading(false);
      
        
      } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message || "An error occurred");
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);


  const exploreRoomsRef = useRef(null);

  const scrollToSection = () => {
    // Scroll to the specific section
    exploreRoomsRef.current?.scrollIntoView({
      behavior: "smooth",
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
    // Intro
    <>
      <div className="overflow-hidden relative pt-24 md:pt-16 lg:pt-8 min-h-screen flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="../../Public/hostel.jpg"
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

      {/* ROOMS */}
      <section ref={exploreRoomsRef} id="exploreRooms" className="exploreRooms py-12 bg-gradient-to-tr from-blue-100/50 to-teal-100/50 relative overflow-hidden">
        {/* Polygon Background */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            className="absolute top-0 left-0"
          >
            <defs>
              <pattern
                id="polygonPattern"
                patternUnits="userSpaceOnUse"
                width="100"
                height="100"
              >
                <polygon
                  points="50,0 100,50 50,100 0,50"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  className="text-blue-200/30"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#polygonPattern)" />
          </svg>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Available Rooms
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our comfortable and affordable rooms tailored to meet
              your needs. From budget-friendly options to premium
              accommodations, we have something for everyone.
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <ClipLoader size={50} color="#FF6B00" />
            </div>
          ) : availableRooms.length === 0 ? (
            <div className="text-center text-gray-600 py-12">
              No rooms available at the moment
            </div>
          ) : (
            <CardContainer>
              
              {availableRooms.map((room) => (
               
                <Card

                  key={room._id}
                  id={room._id}
                  roomNumber={room.roomNumber}
                  roomType={room.roomType}
                  price={room.price}
                  bedsAvailable={room.bedRemaining}
                  discount={room.discount || 0}
                  rating={room.rating ||  Number((Math.random() * 5 + 5).toFixed(1))}
                images={room.images || ["/api/placeholder/400/300"]}
                />
                
              ))}
            </CardContainer>
          )}
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
