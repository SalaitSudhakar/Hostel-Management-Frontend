import React from "react";
import { motion } from "motion/react";
import {
  Bed,
  Wifi,
  Tv,
  Wind,
  Snowflake,
  Sun,
  RefrigeratorIcon,
  Lamp,
  CupSoda,
  Utensils,
  ShowerHead,
  Lock,
} from "lucide-react";

const Card = ({ icon: Icon, title, description }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-4"
  >
    <Icon className="text-orange-600 w-12 h-12" />
    <div>
      <h3 className="font-semibold text-gray-800">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  </motion.div>
);

const AmenityCard = () => {
  const amenities = [
    {
      icon: Bed,
      title: "Comfortable Beds",
      description: "Ergonomic beds with premium mattresses for a restful sleep",
    },
    {
      icon: Wifi,
      title: "High-Speed Internet",
      description: "Free unlimited Wi-Fi with high-speed connectivity",
    },
    {
      icon: Tv,
      title: "Entertainment System",
      description: "LED TVs with multiple entertainment channels",
    },
    {
      icon: Wind,
      title: "Air Conditioning",
      description: "Individual temperature control in each room",
    },
    {
      icon: RefrigeratorIcon,
      title: "Mini Refrigerator",
      description: "Personal mini-fridge in every room",
    },
    {
      icon: Utensils,
      title: "Communal Kitchen",
      description: "Fully equipped shared kitchen for guests",
    },
    {
      icon: ShowerHead,
      title: "Hot Water",
      description: "24/7 hot water availability with powerful showers",
    },
    {
      icon: Lock,
      title: "Personal Lockers",
      description: "Secure personal lockers for each guest",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <h1 className="text-3xl font-bold text-center mb-10 text-gray-800">
        Hostel Amenities
      </h1>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              delayChildren: 0.2,
              staggerChildren: 0.1,
            },
          },
        }}
        className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {amenities.map((amenity, index) => (
          <motion.div
            key={index}
            variants={{
              hidden: { y: 20, opacity: 0 },
              visible: {
                y: 0,
                opacity: 1,
              },
            }}
          >
            <Card
              icon={amenity.icon}
              title={amenity.title}
              description={amenity.description}
            />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default AmenityCard;
