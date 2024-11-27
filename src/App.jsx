import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import ResetPassword from "./Pages/ResetPassword";
import ForgotPassword from "./Pages/ForgotPassword";
import NotFound from "./Pages/NotFound";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Sidebar from "./Components/Sidebar";
import { ToastContainer } from "react-toastify";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import EditProfile from "./Pages/EditProfile";
import { ProtectedRoutes } from "./Components/ProtectedRoutes";
import CreateMaintenanceRequest from "./Pages/CreateMaintenanceRequest";
import CreateRoom from "./Pages/CreateRoom";
import RoomDetails from "./Pages/RoomDetails";
import ContactPage from "./Pages/ContactPage";
import TermsAndConditions from "./Pages/TermsAndConditions";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import CheckoutPage from "./Pages/CheckoutPage";

const App = () => {
  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        className="!p-0 !m-0"
        toastClassName="relative flex p-4 rounded-lg mb-2 shadow-md border-l-4 
          transition-all duration-300 ease-in-out
          data-[type=success]:bg-green-50 data-[type=success]:border-green-500
          data-[type=error]:bg-red-50 data-[type=error]:border-red-500
          data-[type=info]:bg-blue-50 data-[type=info]:border-blue-500
          data-[type=warning]:bg-yellow-50 data-[type=warning]:border-yellow-500"
        bodyClassName="text-sm font-medium text-gray-800 ml-3"
        progressClassName="!bg-primary"
        closeButtonClassName="!text-gray-500 hover:!text-gray-700 focus:!outline-none absolute top-2 right-2"
      />
      <BrowserRouter>
        <>
          <Navbar />
        </>
        <>
          <Sidebar className="md:hidden" />
        </>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/reset-password/:id/:resetToken"
            element={<ResetPassword />}
          />
          <Route path="/" element={<Home />} />
          <Route path="/room/:roomNumber" element={<RoomDetails />} />
          <Route path="/contact" element={<ContactPage />} />
         <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          {/* Protected Profile Route */}
          <Route
            path="/resident/profile"
            element={
              <ProtectedRoutes residentOnly={true}>
                <Profile />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/resident/maintenance/create"
            element={
              <ProtectedRoutes residentOnly={true}>
                <CreateMaintenanceRequest />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/resident/profile/edit"
            element={
              <ProtectedRoutes residentOnly={true}>
                <EditProfile />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/checkout/:roomNumber"
            element={
              <ProtectedRoutes residentOnly={true}>
                <CheckoutPage />
              </ProtectedRoutes>
            }
           />
          {/* Staff Part */}
          {/* Admin Part */}
          <Route
            path="/admin/room/create"
            element={
              <ProtectedRoutes adminOnly={true}>
                <CreateRoom />
              </ProtectedRoutes>
            }
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
