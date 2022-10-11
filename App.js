import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import AppRoutes from "./App/navigation";
import { Provider } from "react-redux";
import { store } from './App/redux'
import RestaurantSignup from "./App/screens/Restaurant/RestaurantSignup";

export default function App() {
  return (
    // <RestaurantSignup/>
    <Provider store={store}>
      <PaperProvider>
        <AppRoutes />
      </PaperProvider>
    </Provider>
  );
}
