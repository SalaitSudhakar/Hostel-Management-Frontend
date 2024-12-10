import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleSidebar } from "../Features/SidebarSlice";
import { Link, useNavigate } from "react-router-dom";  // Import useNavigate
import { IoClose } from "react-icons/io5";
import { FaHome, FaUserAlt, FaTools, FaCog } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { CornerRightUp, UserPlus } from "lucide-react";
import "../Css/Sidebar.css"

const Sidebar = () => {
  const isSidebarOpen = useSelector((state) => state.sidebar.isOpen);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Get the navigate function from React Router

  const isAuthenticated = !!localStorage.getItem("token");
  const role = localStorage.getItem("role") || "";
  const residentStatus = localStorage.getItem("residentStatus") || "";

  // Handle closing the sidebar when clicking outside the sidebar
  const handleCloseSidebar = (e) => {
    if (e.target.classList.contains("sidebar-overlay")) {
      dispatch(toggleSidebar());
    }
  };

  // Handle closing the sidebar after navigation
  const handleLinkClick = (to) => {
    dispatch(toggleSidebar()); // Close the sidebar
    navigate(to); // Navigate to the clicked link
  };

  return (
    <div
      className={`sidebar-overlay ${isSidebarOpen ? "open" : ""} fixed top-0 left-0 w-full h-full bg-transparent transform -translate-x-full duration-500 ease-in-out z-50 overflow-hidden`}
      onClick={handleCloseSidebar}
    >
      <div className="sidebar fixed left-0 top-0 w-3/5 md:w-4/12 lg:w-3/12  h-full  bg-white  border-2 border-l-0 border-b-0 border-orange-600 ease-in-out duration-500">
        <button
          className="absolute top-3 right-4 text-2xl font-bold p-2"
          onClick={() => dispatch(toggleSidebar())}
        >
          <IoClose size={35} className="hover:text-red-600  hover:bg-red-50 p-1 hover:border-red-600 rounded-full transition-all duration-200 ease-in-out" />
        </button>

        <ul className="flex flex-col gap-4 m-6 md:mt-14 md:mx-5 mt-16">
          <li>
            <Link
              to="/"
              className="hover:text-orange-600 transition-all duration-150 ease-in-out flex gap-2"
              onClick={() => handleLinkClick("/")}
            >
              <FaHome size={20} /> Home
            </Link>
          </li>
          {isAuthenticated && role === "resident" && (
            <>
              <li>
                <Link
                  to={`/resident/profile`}
                  className="hover:text-orange-600 transition-all duration-150 ease-in-out flex gap-2"
                  onClick={() => handleLinkClick("/resident/profile")}
                >
                  <FaUserAlt size={20} />
                  View Profile
                </Link>
              </li>

              {residentStatus === "active" && (
                <li>
                  <Link
                    to={`/resident/maintenance/create`}
                    className="hover:text-orange-600 transition-all duration-150 ease-in-out flex gap-2"
                    onClick={() => handleLinkClick("/resident/maintenance/create")}
                  >
                    <FaTools size={20} />
                    Maintenance Request
                  </Link>
                </li>
              )}
            </>
          )}
          {isAuthenticated && role === "admin" && (
            <>
              <li>
                <Link
                  to="/admin"
                  className="hover:text-orange-600 transition-all duration-150 ease-in-out flex gap-2"
                  onClick={() => handleLinkClick("/admin")}
                >
                  <MdDashboard size={20} /> Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/room/create"
                  className="hover:text-orange-600 transition-all duration-150 ease-in-out flex gap-2"
                  onClick={() => handleLinkClick("/admin/room/create")}
                >
                  <CornerRightUp size={20} /> Create Room
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/add-expense"
                  className="hover:text-orange-600 transition-all duration-150 ease-in-out flex gap-2"
                  onClick={() => handleLinkClick("/admin/add-expense")}
                >
                  <FaCog size={20} />
                  Add Expense
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/maintenance/assign-staff"
                  className="hover:text-orange-600 transition-all duration-150 ease-in-out flex gap-2"
                  onClick={() => handleLinkClick("/admin/maintenance/assign-staff")}
                >
                  <UserPlus size={20} />
                  Assign Staff
                </Link>
              </li>
            </>
          )}
          {isAuthenticated && role === "staff" && (
            <li>
              <Link
                to="/staff/maintenance"
                className="hover:text-orange-600 transition-all duration-150 ease-in-out flex gap-2"
                onClick={() => handleLinkClick("/staff/maintenance")}
              >
                <FaTools size={20} /> Maintenance Request
              </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
