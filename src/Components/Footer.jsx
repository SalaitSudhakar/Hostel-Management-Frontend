import React from "react";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="relative flex flex-col justify-center items-center gap-4 bg-gray-950 text-white p-3 md:p-5">
    
      <div className="flex flex-col md:flex-row items-center justify-center gap-4">
        <h6 className=" text-sm md:text-lg md:font-semibold uppercase">
          Follow us on ➡️⬇️:-{" "}
        </h6>
        <div className="flex flex-wrap gap-3  md:py-4">
          <Link>
            <FaFacebook className="w-5 h-5 md:w-8 md:h-8 hover:text-orange-600" />
          </Link>
          <Link>
            <FaInstagram className="w-5 h-5 md:w-8 md:h-8 hover:text-orange-600 " />
          </Link>
          <Link>
            <FaXTwitter className="w-5 h-5 md:w-8 md:h-8 hover:text-orange-600" />
          </Link>
          <Link>
            <FaYoutube className="w-5 h-5 md:w-8 md:h-8 hover:text-orange-600" />
          </Link>
        </div>
      </div>
      <hr className="md:hidden text-gray-800  border-dashed w-1/4" />
      <div className="footer-content text-center text-xs md:text-sm p-1 md:p-2">
        <p className="text-gray-500 py-1 md:py-2">All rights reserved.</p>
        <p className="text-gray-500">
          Copyright &copy;{currentYear} -{" "}
          <Link to={"/"} className="text-orange-600  hover:text-orange-400">
            HM Hostel
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
