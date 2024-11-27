import React from "react";
import { Quote } from "lucide-react";

const Testimonial = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      position: "Student",
      image: "/api/placeholder/100/100",
      quote:
        "This hostel has been a home away from home. The facilities are top-notch and the staff is incredibly friendly!",
      rating: 5,
    },
    {
      name: "Michael Chen",
      position: "Backpacker",
      image: "/api/placeholder/100/100",
      quote:
        "Perfect location, clean rooms, and great common areas. I've met so many amazing people here.",
      rating: 4,
    },
    {
      name: "Emma Rodriguez",
      position: "Exchange Student",
      image: "/api/placeholder/100/100",
      quote:
        "Affordable, secure, and comfortable. Everything a student could ask for in accommodation.",
      rating: 5,
    },
  ];

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <span
        key={index}
        className={`text-xl ${
          index < rating ? "text-yellow-500" : "text-gray-300"
        }`}
      >
        ★
      </span>
    ));
  };

  return (
    <section className=" py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            What Our Guests Say
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Hear from students and travelers who have experienced our hostel's
            unique atmosphere and exceptional service.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg p-6 transform transition duration-300 hover:scale-105"
            >
              <div className="flex items-start mb-4">
                <Quote className="text-orange-600 mr-3 w-10 h-10" />
                <p className="text-gray-700 italic flex-grow">
                  "{testimonial.quote}"
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900">
                  {testimonial.name}
                </h3>
                <p className="text-gray-600 text-sm">{testimonial.position}</p>
                <div className="mt-1">{renderStars(testimonial.rating)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
