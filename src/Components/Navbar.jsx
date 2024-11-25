import React from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import { toggleSidebar } from "../Features/SidebarSlice";
import { useDispatch } from "react-redux";
import { logoutResident } from "../Features/residentSlice";
import Tooltip from "@mui/material/Tooltip";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("token");
  const isAdmin = localStorage.getItem("userRole") === "admin";
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    dispatch(logoutResident());
    navigate("/");
  };

  return (
    <nav className="w-full bg-white py-4 border-b-2 ">
      <div className="w-[90%] mx-auto flex justify-between items-center">
        <h2 className=" text-orange-600 text-xl">
          <Tooltip title="Home Page Link" arrow>
            <Link to={"/"} className=" font-bold hover:no-underline">
              HM Hostel
            </Link>
          </Tooltip>
        </h2>

        <ul className="flex gap-6  items-center justify-center">
          <li className="hidden md:block hover:text-orange-600 font-semibold">
            <Link to="/">Home</Link>
          </li>
          {isAdmin && (
            <>
              <li>
                <Link to="/admin">Admin</Link>
              </li>
            </>
          )}
          {isAuthenticated ? (
            <li>
              <button
                onClick={handleLogout}
                className="font-semibold  transition-all duration-200 delay-75 ease-in-out text-red-600 hover:bg-red-500 hover:text-white py-1 px-2 rounded-md"
              >
                LogOut
              </button>
            </li>
          ) : (
            <li>
              <Link to={"/login"} className="font-semibold">
                Login
              </Link>
            </li>
          )}

          <li>
            <Tooltip title="open sidebar">
              <button
                className="hover:text-orange-600 hover:bg-white  mt-2 p-2 border rounded-full bg-orange-600 text-white"
                onClick={() => dispatch(toggleSidebar())}
              >
                <RxHamburgerMenu className="w-4 h-4" />
              </button>
            </Tooltip>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
