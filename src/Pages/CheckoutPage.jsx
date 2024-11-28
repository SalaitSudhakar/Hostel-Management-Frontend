import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import api from "../Services/api"; // Adjust the import path as needed

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [roomDetails, setRoomDetails] = useState(null);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [guests, setGuests] = useState({
    adults: 1,
    children: 0,
    infantsUnder2: 0,
  });
  const [totalNights, setTotalNights] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [dateError, setDateError] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const { roomNumber } = useParams();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        // Fetch user details
        const userResponse = await api.get("/resident/profile");
        setUserData(userResponse.data.data);

        if (!roomNumber) {
          throw new Error("No room details provided");
        }

        // Fetch room details
        const roomResponse = await api.get(`/room/${roomNumber}`);
        setRoomDetails({
          ...roomResponse.data.data,
          roomNumber,
          basePrice: roomResponse.data.data.price,
        });
      } catch (error) {
        console.error("Error fetching details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [navigate, roomNumber]);

  useEffect(() => {
    if (checkInDate && checkOutDate && roomDetails) {
      const nights = Math.ceil(
        (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24)
      );
      setTotalNights(nights);

      const basePrice = roomDetails.basePrice || 50;
      setTotalPrice(basePrice * nights);
    }
  }, [checkInDate, checkOutDate, roomDetails]);

  const validateDates = () => {
    if (!checkInDate || !checkOutDate) {
      setDateError("Both check-in and check-out dates are required.");
      return false;
    }
    const today = new Date();
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);

    if (checkIn < today.setHours(0, 0, 0, 0)) {
      setDateError("Check-in date must be today or later.");
      return false;
    }

    if (checkOut <= checkIn) {
      setDateError("Check-out date must be after the check-in date.");
      return false;
    }

    setDateError("");
    return true;
  };

  const handleBookingSuccess = async (orderID) => {
    if (!validateDates()) return;

    try {
      const bookingData = {
        roomId: roomDetails._id,
        checkInDate: checkInDate.toISOString(),
        checkOutDate: checkOutDate.toISOString(),
        guests: guests,
        paymentId: orderID,
      };

      const response = await api.post("/booking/create", bookingData);
      if (response.data) {
        navigate("/booking-confirmation", {
          state: {
            bookingDetails: response.data,
            totalPrice: totalPrice,
          },
        });
        setPaymentSuccess(true);
      } else {
        alert("Booking failed");
      }
    } catch (error) {
      console.error("Booking error:", error);
      alert(
        error.response?.data?.message ||
          "An error occurred while creating the booking"
      );
    }
  };

  const handleGuestChange = (type, value) => {
    setGuests((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
        <div className="w-24 h-24 border-[8px] border-t-orange-600 border-r-orange-600 border-b-orange-300 border-l-orange-300 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!userData || !roomDetails) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="error-message">
          Unable to load booking details. Please try again.
        </div>
      </div>
    );
  }

  const paypalClientId = import.meta.env.VITE_PAYPAL_CLIENT_ID; // Access the environment variable

  return (
    <div className="max-w-3xl mx-auto p-5">
      <div className="card">
        <h2 className="text-center bg-orange-500 text-white p-4">
          Complete Your Booking
        </h2>
        <div className="card-content">
          <div className="mb-5">
            <h4>{roomDetails.roomType}</h4>
            <p>Room Number: {roomDetails.roomNumber}</p>
            <p>Base Price: ₹{roomDetails.basePrice} per night</p>
          </div>

          <div className="mb-5">
            <input
              type="text"
              placeholder="Name"
              value={userData.name}
              readOnly
              className="w-full p-2 mb-2"
            />
            <input
              type="email"
              placeholder="Email"
              value={userData.email}
              readOnly
              className="w-full p-2"
            />
          </div>

          <div className="flex mb-5">
            <div className="flex-1 mr-2">
              <input
                type="date"
                value={
                  checkInDate ? checkInDate.toISOString().split("T")[0] : ""
                }
                onChange={(e) => setCheckInDate(new Date(e.target.value))}
                min={new Date().toISOString().split("T")[0]}
                className="w-full p-2"
              />
            </div>
            <div className="flex-1">
              <input
                type="date"
                value={
                  checkOutDate ? checkOutDate.toISOString().split("T")[0] : ""
                }
                onChange={(e) => setCheckOutDate(new Date(e.target.value))}
                min={
                  checkInDate
                    ? new Date(checkInDate.getTime() + 24 * 60 * 60 * 1000)
                        .toISOString()
                        .split("T")[0]
                    : ""
                }
                className="w-full p-2"
              />
            </div>
          </div>

          <div className="mb-5">
            <h5>Number of Guests</h5>
            <div className="flex">
              {Object.keys(guests).map((type) => (
                <div key={type} className="flex-1 mr-2">
                  <select
                    value={guests[type]}
                    onChange={(e) =>
                      handleGuestChange(type, Number(e.target.value))
                    }
                    className="w-full p-2"
                  >
                    {[...Array(5)].map((_, i) => (
                      <option key={i} value={i}>
                        {i}
                      </option>
                    ))}
                  </select>
                  <label>{type.charAt(0).toUpperCase() + type.slice(1)}</label>
                </div>
              ))}
            </div>
          </div>

          {dateError && <div className="text-red-500">{dateError}</div>}

          <div className="mt-5">
            <PayPalScriptProvider options={{ "client-id": paypalClientId }}>
              <PayPalButtons
                style={{
                  layout: "vertical",
                  color: "blue",
                  shape: "rect",
                  label: "pay",
                }}
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [
                      {
                        amount: {
                          value: totalPrice, // Use your total price here
                        },
                      },
                    ],
                  });
                }}
                onApprove={async (data, actions) => {
                  const order = await actions.order.capture();
                  console.log("Order Approved:", order);
                  handleBookingSuccess(order.id); // Process order after successful payment
                }}
                onError={(err) => {
                  console.error("PayPal Error:", err); // Log any errors
                }}
              />
            </PayPalScriptProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
