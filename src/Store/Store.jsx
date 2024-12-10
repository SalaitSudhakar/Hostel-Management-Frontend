import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import bookingReducer from "../Features/BookingSlice";
import residentReducer from "../Features/ResidenSlice";
import sidebarReducer from "../Features/SidebarSlice";
import { createPersistedReducer } from "./persistConfig";

// Persisted reducers
const persistedBookingReducer = createPersistedReducer(
  "booking",
  bookingReducer
);
const persistedResidentReducer = createPersistedReducer(
  "resident",
  residentReducer
);

const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    booking: persistedBookingReducer,
    resident: persistedResidentReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore redux-persist actions
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor };
