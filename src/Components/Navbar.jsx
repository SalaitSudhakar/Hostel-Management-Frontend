import React, { useEffect } from "react";
import { Menu } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toggleSidebar } from "../Features/SidebarSlice";
import { useDispatch } from "react-redux";
import Tooltip from "@mui/material/Tooltip";
import { Home, LogOut, User, LogIn } from "lucide-react";
import { jwtDecode } from "jwt-decode";
import { resetBookingData } from "../Features/BookingSlice";
import { resetResidentDetails } from "../Features/ResidenSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const checkTokenValidity = () => {
    const token = localStorage.getItem("token");
    if (!token) return false;

    
    try {
      const { exp } = jwtDecode(token); // Decode the token
      const currentTime = Math.floor(Date.now() / 1000); // Get current time in seconds
      return exp > currentTime; // Check if token is still valid
    } catch (error) {
      console.error("Invalid token:", error);
      return false;
    }
  };

  const isAuthenticated = checkTokenValidity();
  const isAdmin = localStorage.getItem("userRole") === "admin";


  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("residentStatus");
    localStorage.removeItem('__paypal_storage__')
    dispatch(resetBookingData());
    dispatch(resetResidentDetails())
    navigate("/");
  };

  useEffect(() => {
    if (!isAuthenticated) {
      localStorage.removeItem("token");
      localStorage.removeItem("userRole");
      localStorage.removeItem("residentStatus");
    }
  }, [isAuthenticated, navigate]);

  const navLinks = [
    {
      label: "Home",
      path: "/",
      icon: <Home className="w-4 h-4 mr-2" />,
      show: true,
    },
    {
      label: "Admin",
      path: "/admin",
      icon: <User className="w-4 h-4 mr-2" />,
      show: isAdmin,
    },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center">
            <Tooltip title="Home Page" arrow>
              <Link
                to="/"
                className="flex items-center text-lg md:text-2xl font-bold text-orange-600 hover:text-orange-700 transition-colors"
              >
                HM Hostel
              </Link>
            </Tooltip>
          </div>

          {/* Navigation Links */}
          <div className="flex gap-5">
            <div className="flex items-center space-x-6">
              <div className="hidden md:flex">
                {navLinks.map(
                  (link) =>
                    link.show && (
                      <Link
                        key={link.path}
                        to={link.path}
                        className="flex items-center text-gray-700 hover:text-orange-600 transition-colors font-medium"
                      >
                        {link.icon}
                        {link.label}
                      </Link>
                    )
                )}
              </div>

              {/* Authentication Links */}
              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className="flex items-center text-red-600 hover:text-red-700 transition-colors font-medium"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center text-gray-700 hover:text-orange-600 transition-colors font-medium"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Login
                </Link>
              )}
            </div>

            {/* Mobile Sidebar Toggle */}
            <div className="flex items-center">
              <Tooltip title="Open Sidebar" arrow>
                <button
                  onClick={() => dispatch(toggleSidebar())}
                  className=" text-gray-600 hover:text-orange-600 transition-colors p-2 rounded-full hover:bg-orange-50"
                >
                  <Menu className="w-6 h-6" />
                </button>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
