import React from "react";
import { Wifi, Utensils, Shirt, Armchair, ShowerHead } from "lucide-react";

const PopularFacilities = () => {
  const specialities = [
    {
      icon: Wifi,
      title: "Free Wi-Fi",
      description: "High-speed internet throughout the premises",
    },
    {
      icon: Utensils,
      title: "Meal Service",
      description: "Complimentary breakfast and café options",
    },
    {
      icon: Shirt,
      title: "Laundry Facility",
      description: "Self-service and assisted washing available",
    },
    {
      icon: Armchair,
      title: "Common Lounge",
      description: "Relaxation area with comfortable seating",
    },
    {
      icon: ShowerHead,
      title: "Clean Restrooms",
      description: "Regularly sanitized and well-maintained facilities",
    },
  ];

  return (
    <div className="w-4/5 container mx-auto px-4 py-8 mb-6">
      <h1 className="text-center text-2xl md:text-4xl mb-5 md:mb-8 font-bold text-orange-600">
        Popular Specialities
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
        {specialities.map((speciality, index) => {
          const Icon = speciality.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg p-3 py-4 text-center transform transition-all hover:scale-105 hover:shadow-xl"
            >
              <div className="mb-4 flex justify-center">
                <Icon size={24} className="text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">
                {speciality.title}
              </h3>
              <p className="text-sm text-gray-600">{speciality.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PopularFacilities;
