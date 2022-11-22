import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import AppRoutes from "./App/navigation";
import { Provider } from "react-redux";
import { store } from "./App/redux";

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <AppRoutes />
      </PaperProvider>
    </Provider>
  );
}
