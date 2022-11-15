import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./ui/uiSlice";
import authReducer from "../screens/Public/authSlice";
import customerReducer from "../screens/Customer/customerSlice";
import restaurantReducer from "../screens/Restaurant/restaurantSlice";
import redirectReducer from "./ui/redirectSlice";
import orderReducer from "../screens/Restaurant/orderSlice";

export const store = configureStore({
  reducer: {
    authSlice: authReducer,
    uiSlice: uiReducer,
    customerSlice: customerReducer,
    restaurantSlice: restaurantReducer,
    redirectSlice: redirectReducer,
    orderSlice: orderReducer,
  },
});
