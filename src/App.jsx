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
import EditProfile from "./Pages/EditProfile"
import { ProtectedRoutes } from "./Components/ProtectedRoutes";
import CreateMaintenanceRequest from "./Pages/CreateMaintenanceRequest";
import CreateRoom from "./Pages/CreateRoom";

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
            path="/resident/profile"
            element={
              <ProtectedRoutes residentOnly={true}>
                <Profile />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/resident/create-request/:residentId"
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
