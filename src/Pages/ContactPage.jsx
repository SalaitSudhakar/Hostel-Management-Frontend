import React, { useEffect, useState } from "react";
import { MapPin, Mail, Phone, Send } from "lucide-react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Reset form after submission
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  return (
    <div className="min-h-screen  bg-gradient-to-tr from-orange-50 to-amber-100 py-12  sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
        {/* Contact Information Section */}
        <div className="bg-white shadow-lg rounded-lg p-8 ">
          <h2 className="text-3xl font-bold text-orange-600 mb-6">Contact Us</h2>

          <div className="space-y-6">
            <div className="flex items-center">
              <MapPin className="text-orange-500 mr-4 w-10 h-10" />
              <div>
                <h3 className="font-semibold text-gray-900">Our Location</h3>
                <p className="text-gray-600">
                  No. 42, Besant Nagar, Near Elliot's Beach, Chennai, Tamil Nadu
                  600090, India
                </p>
              </div>
            </div>

            <div className="flex items-center">
              <Phone className="text-orange-500 mr-4 w-10 h-10" />
              <div>
                <h3 className="font-semibold text-gray-900">Phone</h3>
                <p className="text-gray-600">+91 98765 43210</p>
                <p className="text-gray-600">+91 44 2345 6789</p>
              </div>
            </div>

            <div className="flex items-center">
              <Mail className="text-orange-500 mr-4 w-10 h-10" />
              <div>
                <h3 className="font-semibold text-gray-900">Email</h3>
                <p className="text-gray-600">contact@hostelhaven.com</p>
                <p className="text-gray-600">support@hostelhaven.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-3xl font-bold text-orange-600 mb-6">
            Send Us a Message
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-gray-700 font-medium mb-2"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your Full Name"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-gray-700 font-medium mb-2"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="+91 98765 43210"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-gray-700 font-medium mb-2"
              >
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Write your message here..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-orange-600 text-white py-3 rounded-md hover:bg-orange-700 hover:scale-95 transition-all duration-300 flex items-center justify-center"
            >
              <Send className="mr-2" /> Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
