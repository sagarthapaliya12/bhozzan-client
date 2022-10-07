import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import navigationTheme from "./App/navigation/navigationTheme";
import { Provider as PaperProvider } from "react-native-paper";

import CustomerTab from "./App/components/Customer/CustomerTab";
import RestaurantTab from "./App/components/Restaurant/RestaurantTab";
import PublicNavigator from "./App/navigation/PublicNavigator";
import Dashboard from "./App/screens/SuperAdmin/Dashboard";

const auth = {
  user: { id: "6019e133h3e3sj72837283", name: "Jack Blah Blah Blah", role: "restaurant" },
};

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer theme={navigationTheme}>
        {!auth.user && <PublicNavigator />}
        {auth.user?.role === "customer" && <CustomerTab />}
        {auth.user?.role === "restaurant" && <RestaurantTab />}
        {auth.user?.role === "superAdmin" && <Dashboard />}
      </NavigationContainer>
    </PaperProvider>
  );
}
