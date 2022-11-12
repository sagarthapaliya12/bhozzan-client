import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import AppRoutes from "./App/navigation";
import { Provider } from "react-redux";
import { store } from './App/redux'
import QrGenerator from './App/components/Customer/HomeScreen/QrGenerator';

export default function App() {
  return (
    <QrGenerator/>
    // <Provider store={store}>
    //   <PaperProvider>
    //     <AppRoutes />
    //   </PaperProvider>
    // </Provider>
  );
}
