// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "../Features/SidebarSlice";  // Assuming SidebarSlice is another reducer

export const Store = configureStore({
  reducer: {
    sidebar: sidebarReducer,    // Handles the sidebar state (if you have one)

  },
});
