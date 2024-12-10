import React from "react";

const About = () => {
  return (
    <div className="relative bg-gradient-to-b from-[#0a192f] to-[#020c1b] text-white py-16 overflow-hidden">
      {/* Wavy Background Effect */}
      <div className="absolute inset-0 opacity-20">
        <svg
          className="absolute top-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#1e40af"
            fillOpacity="0.3"
            d="M0,160L48,176C96,192,192,224,288,224C384,224,480,192,576,170.7C672,149,768,139,864,144C960,149,1056,171,1152,192C1248,213,1344,235,1392,245.3L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320L192,320L96,320L0,320Z"
          ></path>
        </svg>
        <svg
          className="absolute top-1/4 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#1e40af"
            fillOpacity="0.2"
            d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,229.3C672,224,768,192,864,170.7C960,149,1056,139,1152,154.7C1248,171,1344,213,1392,234.7L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320L192,320L96,320L0,320Z"
          ></path>
        </svg>
      </div>

      {/* Content Container */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-blue-300">
            About HM Hostel
          </h2>

          <div className="space-y-6 text-lg leading-relaxed">
            <p>
              HM Hostel is more than just a place to stay – we're a home away
              from home for travelers, students, and professionals seeking
              comfort, community, and convenience.
            </p>

            <p>
              Founded in 2015, our mission is to provide affordable, safe, and
              welcoming accommodation that meets the diverse needs of modern
              travelers. Located in the heart of the city, we offer easy access
              to public transportation, local attractions, and essential
              amenities.
            </p>

            <p>
              We pride ourselves on creating a vibrant, inclusive environment
              where guests from all walks of life can connect, share
              experiences, and create lasting memories. Our dedicated staff is
              committed to ensuring your stay is comfortable, secure, and
              enjoyable.
            </p>

            <p>
              Whether you're a solo backpacker, a student, or a business
              traveler, HM Hostel offers clean, modern facilities, 24/7
              security, and a range of services designed to make your stay
              seamless and memorable.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
