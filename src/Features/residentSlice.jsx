// src/store/residentSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 id: null,
};

const residentSlice = createSlice({
  name: 'resident',
  initialState,
  reducers: {
    setResident: (state, action) => {
    
      const  id  = action.payload;
      console.log(id)
      state.id = id;
    },
    logoutResident: (state) => {
      state.residentId = null;
      }
    },
  });

export const { setResident, logoutResident } = residentSlice.actions;
export default residentSlice.reducer;
