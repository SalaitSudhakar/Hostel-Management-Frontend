// bookingSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  roomId: '',
  roomNumber: '',
  bookingId: '',
  checkInDate: '',
  checkOutDate: '',
  totalPrice: 0,
  paymentStatus: false,
  guests: { adults: 1, children: 0, infantsUnder2: 0 },
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    setBookingData: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetBookingData: () => {
      return initialState;
    },
    setPaymentStatus: (state, action) => {
      state.paymentStatus = action.payload;
    },
  },
});

export const { setBookingData, resetBookingData, setPaymentStatus } = bookingSlice.actions;
export default bookingSlice.reducer;
