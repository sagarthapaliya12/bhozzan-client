import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import AppRoutes from "./App/navigation";

export default function App() {
  return (
    <PaperProvider>
      <AppRoutes />
    </PaperProvider>
  );
}
