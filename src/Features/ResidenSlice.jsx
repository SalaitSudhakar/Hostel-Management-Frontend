import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  email: ''
};

const residentSlice = createSlice({
  name: 'resident',
  initialState,
  reducers: {
    setResidentDetails: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
    },

    resetResidentDetails: (state) => {
      state.name = '';
      state.email = '';
    }
  }
});

export const { setResidentDetails, resetResidentDetails } = residentSlice.actions;
export default residentSlice.reducer;
