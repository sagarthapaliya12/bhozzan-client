import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./ui/uiSlice";
import authReducer from "../screens/Public/authSlice";
import redirectReducer from "./ui/redirectSlice";

export const store = configureStore({
  reducer: {
    uiSlice: uiReducer,
    authSlice: authReducer,
    redirectSlice: redirectReducer,
  },
});
