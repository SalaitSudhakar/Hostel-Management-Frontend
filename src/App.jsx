import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import ResetPassword from "./Pages/ResetPassword";
import ForgotPassword from "./Pages/ForgotPassword";
import NotFound from "./Pages/NotFound";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Sidebar from "./Components/sidebar";
import { ToastContainer } from "react-toastify";


const App = () => {

 
  return (
    <div>
      <ToastContainer />
      <BrowserRouter>
        <>
          <Navbar />
        </>
        <>
          <Sidebar className="md:hidden"/>
        </>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/reset-password/:id/:resetToken"
            element={<ResetPassword />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>

        
        <>
          <Footer />
        </>
      </BrowserRouter>
    </div>
  );
};

export default App;
