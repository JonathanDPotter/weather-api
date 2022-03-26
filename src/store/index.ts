import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
// reducers
import locationReducer from "./slices/locationSlice";
import authReducer from "./slices/authSlice"

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    location: locationReducer,
    auth: authReducer,
  },
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
