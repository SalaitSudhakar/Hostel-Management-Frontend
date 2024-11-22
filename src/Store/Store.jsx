// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "../Features/SidebarSlice";  // Assuming SidebarSlice is another reducer
import residentReducer from "../Features/residentSlice";  // Path to residentSlice

export const Store = configureStore({
  reducer: {
    sidebar: sidebarReducer,    // Handles the sidebar state (if you have one)
    resident: residentReducer,  // Handles the resident data
  },
});
