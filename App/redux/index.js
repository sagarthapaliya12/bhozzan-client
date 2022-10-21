import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./ui/uiSlice";
import authReducer from "../screens/Public/authSlice";
import restaurantReducer from "../screens/Restaurant/restaurantSlice";
import redirectReducer from "./ui/redirectSlice";

export const store = configureStore({
  reducer: {
    authSlice: authReducer,
    uiSlice: uiReducer,
    restaurantSlice: restaurantReducer,
    redirectSlice: redirectReducer,
  },
});
