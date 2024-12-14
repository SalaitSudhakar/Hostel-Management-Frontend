import React, { useState } from "react";
import { 
  Mail, 
  Phone, 
  MapPin 
} from "lucide-react";
import { 
  FaFacebook, 
  FaInstagram, 
  FaTwitter, 
  FaYoutube 
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { Tooltip } from "@mui/material";

const Footer = () => {
  const [email, setEmail] = useState("");
  const currentYear = new Date().getFullYear();

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    
    setEmail("");
    alert("Thank you for subscribing!");
  };

  const socialLinks = [
    { 
      Icon: FaFacebook, 
      href: "https://facebook.com/hmhostel", 
      label: "Facebook" 
    },
    { 
      Icon: FaInstagram, 
      href: "https://instagram.com/hmhostel", 
      label: "Instagram" 
    },
    { 
      Icon: FaTwitter, 
      href: "https://twitter.com/hmhostel", 
      label: "Twitter" 
    },
    { 
      Icon: FaYoutube, 
      href: "https://youtube.com/hmhostel", 
      label: "YouTube" 
    }
  ];

  const quickLinks = [
    { 
      title: "Contact Us", 
      href: "/contact" 
    },
    { 
      title: "Terms of Service", 
      href: "/terms-and-conditions" 
    },
    { 
      title: "Privacy Policy", 
      href: "/privacy-policy" 
    }
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-950 text-white py-12 px-4 md:px-12">
      <div className="w-full md:max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        {/* Brand Section */}
        <div className="space-y-4">
          <Tooltip title="Home Page" arrow>
            <Link to="/" className="inline-block">
              <h2 className="text-2xl font-bold text-orange-500 hover:text-orange-400 transition-colors">
                HM Hostel
              </h2>
            </Link>
          </Tooltip>
          <p className="text-gray-300 text-sm">
            Experience comfort, convenience, and care in every stay.
          </p>
          
          {/* Contact Info */}
          <div className="space-y-2 text-gray-400">
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4 text-orange-500" />
              <span>contact@hmhostel.com</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4 text-orange-500" />
              <span>+91 123 456 7890</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-orange-500" />
              <span>123 Hostel Street, City, Country</span>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <div className="space-y-2">
            {quickLinks.map((link) => (
              <Link 
                key={link.title} 
                to={link.href} 
                className="block text-gray-300 hover:text-orange-500 transition-colors"
              >
                {link.title}
              </Link>
            ))}
          </div>
        </div>

        {/* Social and Newsletter */}
        <div className="space-y-6">
          {/* Social Media Icons */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Connect With Us
            </h3>
            <div className="flex space-x-4">
              {socialLinks.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-gray-400 hover:text-orange-500 transition-colors"
                >
                  <Icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Stay Updated
            </h3>
            <form 
              onSubmit={handleEmailSubmit} 
              className="flex md:flex-col rounded-lg md:rounded-none overflow-hidden shadow-lg"
            >
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-grow p-2 md:p-3 bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 text-white px-2 md:px-4 md:py-2 md:mt-2 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-12 pt-6 border-t border-gray-800 text-center">
        <p className="text-gray-500 text-sm">
          Copyright © {currentYear} HM Hostel. 
          All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;