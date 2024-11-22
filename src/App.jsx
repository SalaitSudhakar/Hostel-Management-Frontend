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
import { ProtectedRoutes } from "./Components/ProtectedRoutes";
import CreateMaintenanceRequest from "./Pages/CreateMaintenanceRequest";
import MaintenanceRequests from "./Pages/MaintenanceRequests";

const App = () => {
  return (
    <div>
      <ToastContainer />
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
          {/* Protected Profile Route */}
          <Route
            path="/resident/profile/:id"
            element={
              <ProtectedRoutes adminOnly={true}>
                <Profile />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/maintenance-request/create"
            element={
              <ProtectedRoutes adminOnly={true}>
                <CreateMaintenanceRequest />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/maintenance-requests"
            element={
              <ProtectedRoutes adminOnly={true}>
                <MaintenanceRequests />
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
