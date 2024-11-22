import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleSidebar } from "../Features/SidebarSlice";
import "../Css/Sidebar.css";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";
import "../App.css"

const Sidebar = () => {
  const isSidebarOpen = useSelector((state) => state.sidebar.isOpen);
  const dispatch = useDispatch();

   // Retrieve resident data from Redux store
   const resident = useSelector((state) => state.resident); 
  
   const residentId = resident.id;  // Access the residentId from the store
   
  
  const isAuthenticated = !!localStorage.getItem("token");
  const role = localStorage.getItem("role") || "";


  /* Handle closing the sidebar when clicking outside the sidebar */
  const handleCloseSidebar = (e) => {
    if (e.target.classList.contains("sidebar-overlay")) {
      dispatch(toggleSidebar());
    }
  };

  return (
    // sidebar overlay
    <div
      className={`sidebar-overlay ${
        isSidebarOpen ? "open" : ""
      }  fixed top-0 left-0 w-full h-full bg-transparent transform -translate-x-full duration-500 ease-in-out z-50 overflow-hidden`}
      onClick={handleCloseSidebar}
    >
      {/* sidebar content */}
      <div
        className="sidebar fixed left-0 top-0 w-4/5 md:w-4/12 h-full bg-blue-50 border-2 border-l-0 border-b-0 border-orange-600 ease-in-out duration-500 p-4"
        onClick={handleCloseSidebar}
      >
        {/* sidebar close button */}
        <button
          className="absolute top-3 right-4 text-2xl font-bold p-2"
          onClick={() => dispatch(toggleSidebar())}
        >
          {/* close icon */}
          <IoClose className="text-red-600 hover:text-white hover:bg-red-600 rounded-full transition-all duration-200 ease-in-out" />
        </button>
        {/* side bar list items */}
        <ul className="flex flex-col text-sm md:text-base gap-4 m-6 md:mt-14 md:mx-5 mt-12">
          <li>
            <Link to="/">Home</Link>
          </li>
          {isAuthenticated && role === "resident" && (
            <>
              <li>
              <Link to={`/resident/profile/${residentId}`}>View Profile</Link>
              </li>
              <li>
                <Link to={`/resident/maintenance-request/{residentId}`}>Maintenance Request</Link>
              </li>
            </>
          )}
          {isAuthenticated && role === "admin"  && (
            <>
              <li>
                <Link to="/admin">Dashboard</Link>
              </li>
              <li>
                <Link to="/admin/add-rooms">Rooms</Link>
              </li>
             {/*  <li>
                <Link to="/admin/residents">Residents</Link>
              </li> */}
              <li>
                <Link to="/admin/revenue-expense">Add Revenue & Expense</Link>
              </li>
              <li>
                <Link to="/admin/reports">Reports</Link>
              </li>
            </>
          )}
          {isAuthenticated && role === "staff"  && (
            <>
              <li>
                <Link to="/staff/requests">Maintenance Request</Link>
              </li>
            </>
          )}
          
        </ul>

      </div>
    </div>
  );
};

export default Sidebar;
